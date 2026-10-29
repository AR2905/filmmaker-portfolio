"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type FilmPlayerProps = {
    src: string;
    poster: string;
    alt: string;
    label: string;
    /** Shown on the poster before the file is fetched. */
    runtime: string;
    sizeMb: number;
};

type Status = "idle" | "loading" | "ready" | "error";

const HEAVY_FILE_THRESHOLD_MB = 50;

function formatDuration(seconds: number): string {
    if (!Number.isFinite(seconds) || seconds <= 0) return "";

    const whole = Math.floor(seconds);
    const minutes = Math.floor(whole / 60);
    const rest = whole % 60;

    return `${minutes}:${String(rest).padStart(2, "0")}`;
}

/**
 * Click-to-load film player.
 *
 * The mp4 is never referenced in the initial HTML. Nothing is fetched until
 * the visitor actually asks to watch, so a 212 MB master does not compete
 * with the page for bandwidth. The button doubles as the poster, which keeps
 * the "not started" state from being a black rectangle.
 */
export default function FilmPlayer({
    src,
    poster,
    alt,
    label,
    runtime,
    sizeMb,
}: FilmPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [active, setActive] = useState(false);
    const [status, setStatus] = useState<Status>("idle");
    const [duration, setDuration] = useState("");

    const heavy = sizeMb >= HEAVY_FILE_THRESHOLD_MB;

    useEffect(() => {
        if (!active) return;

        const node = videoRef.current;

        if (!node) return;

        // Attach the source imperatively rather than through JSX so the load
        // and the play() call happen in the same task as the click, which
        // keeps the user gesture that autoplay requires.
        if (node.getAttribute("src") !== src) {
            node.src = src;
            node.load();
        }

        const attempt = node.play();

        if (attempt) attempt.catch(() => undefined);
    }, [active, src]);

    const handleActivate = useCallback(() => {
        setStatus("loading");
        setActive(true);
    }, []);

    const handleRetry = useCallback(() => {
        setStatus("idle");
        setActive(false);
    }, []);

    return (
        <figure className="group/player relative">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
                {/* Poster — stays mounted underneath as the loading frame. */}
                <Image
                    src={poster}
                    alt={alt}
                    fill
                    priority
                    sizes="100vw"
                    className={`object-cover transition-opacity duration-700 ${
                        active && status === "ready" ? "opacity-0" : "opacity-100"
                    }`}
                />

                {active && (
                    <video
                        ref={videoRef}
                        controls
                        playsInline
                        preload="auto"
                        poster={poster}
                        onLoadedMetadata={(event) =>
                            setDuration(formatDuration(event.currentTarget.duration))
                        }
                        onCanPlay={() => setStatus("ready")}
                        onError={() => setStatus("error")}
                        className={`absolute inset-0 h-full w-full bg-black object-contain transition-opacity duration-500 ${
                            status === "ready" ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        Your browser cannot play this file.{" "}
                        <a href={src} className="underline">
                            Download it instead
                        </a>
                        .
                    </video>
                )}

                {/* Poster scrim + play control. */}
                {status === "idle" && (
                    <button
                        type="button"
                        onClick={handleActivate}
                        aria-label={`Play ${label.toLowerCase()}`}
                        className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-6 text-center"
                    >
                        <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45 transition-colors duration-700 group-hover/player:from-black/90" />

                        <span className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/45 backdrop-blur-[2px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/player:scale-110 group-hover/player:border-white group-hover/player:bg-white sm:h-[92px] sm:w-[92px]">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-5 w-5 translate-x-[2px] fill-white transition-colors duration-500 group-hover/player:fill-black sm:h-6 sm:w-6"
                            >
                                <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.14-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
                            </svg>
                        </span>

                        <span className="relative text-[10px] tracking-[0.28em] text-white/90 sm:text-[11px]">
                            PLAY FILM
                        </span>
                    </button>
                )}

                {/* Buffering */}
                {active && status === "loading" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/55 backdrop-blur-[2px]">
                        <span className="h-px w-40 bg-white/20">
                            <span className="block h-px w-16 animate-pulse bg-white/80" />
                        </span>

                        <span className="text-[10px] tracking-[0.22em] text-white/70">
                            STREAMING · {sizeMb} MB
                        </span>
                    </div>
                )}

                {/* Decode failure */}
                {status === "error" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black/90 px-6 text-center">
                        <p className="max-w-md text-[11px] leading-6 tracking-[0.04em] text-white/70 sm:text-[12px]">
                            THIS BROWSER COULD NOT PLAY THE FILE DIRECTLY. OPEN IT
                            IN A NEW TAB TO WATCH.
                        </p>

                        <span className="flex items-center gap-4">
                            <a
                                href={src}
                                target="_blank"
                                rel="noreferrer"
                                className="border-b border-white/60 pb-1 text-[10px] tracking-[0.2em] text-white"
                            >
                                OPEN VIDEO <em className="not-italic">↗</em>
                            </a>

                            <button
                                type="button"
                                onClick={handleRetry}
                                className="border-b border-white/25 pb-1 text-[10px] tracking-[0.2em] text-white/60"
                            >
                                RETRY
                            </button>
                        </span>
                    </div>
                )}
            </div>

            {/* Caption strip */}
            <figcaption className="flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[10px] tracking-[0.2em] text-white/70">
                    {label}
                </span>

                <span className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[9px] tracking-[0.16em] text-white/35">
                    <span>{duration || runtime}</span>

                    {heavy && (
                        <span className="text-white/35">
                            {sizeMb} MB · BEST ON WI-FI
                        </span>
                    )}

                    <a
                        href={src}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-white/80"
                    >
                        OPEN FILE ↗
                    </a>
                </span>
            </figcaption>
        </figure>
    );
}
