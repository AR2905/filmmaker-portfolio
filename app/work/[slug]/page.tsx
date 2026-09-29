import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import FilmPlayer from "@/components/film-player";
import Reveal from "@/components/reveal";

import { getAdjacentWorks, getWork, works } from "@/data/works";

export const dynamicParams = false;

const ACCENT = "#a8755f";

export function generateStaticParams() {
    return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const work = getWork(slug);

    if (!work) {
        return { title: "Film not found — Shravani Pujar" };
    }

    const title = work.title.replace(/\n/g, " ");

    return {
        title: `${title} — Shravani Pujar`,
        description: work.logline,
        openGraph: {
            title: `${title} — Shravani Pujar`,
            description: work.logline,
            type: "video.other",
            images: [{ url: work.image }],
        },
    };
}

function FilmHeader() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/75 via-black/25 to-transparent">
            <div className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
                <Link
                    href="/"
                    className="text-[10px] font-medium tracking-[0.18em] transition-opacity duration-300 hover:opacity-50"
                >
                    SHRAVANI PUJAR
                </Link>

                <Link
                    href="/#work"
                    className="group inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-white/60 transition-colors duration-300 hover:text-white"
                >
                    <span className="transition-transform duration-500 group-hover:-translate-x-1">
                        ←
                    </span>
                    BACK TO WORK
                </Link>
            </div>
        </header>
    );
}

/** Shown in place of the player while a film has no mastered file. */
function InProduction({ poster, alt }: { poster: string; alt: string }) {
    return (
        <figure className="relative">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
                <Image
                    src={poster}
                    alt={alt}
                    fill
                    sizes="100vw"
                    className="object-cover opacity-30"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center">
                    <span className="flex items-center gap-3 text-[10px] tracking-[0.28em] text-white/55">
                        <span className="h-px w-6 bg-white/30" />
                        IN PRODUCTION
                        <span className="h-px w-6 bg-white/30" />
                    </span>

                    <p className="max-w-md text-[12px] leading-6 text-white/60 sm:text-[13px]">
                        The finished cut is not published yet. The full film will
                        appear here once the grade and sound pass are locked.
                    </p>

                    <a
                        href="mailto:shravanip.0924@gmail.com?subject=Notify%20me%20when%20the%20film%20is%20released"
                        className="mt-2 border-b border-white/40 pb-1 text-[10px] tracking-[0.2em] text-white/80 transition-colors hover:border-white hover:text-white"
                    >
                        NOTIFY ME <span className="not-italic">↗</span>
                    </a>
                </div>
            </div>

            <figcaption className="flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[10px] tracking-[0.2em] text-white/70">
                    FILM NOT YET RELEASED
                </span>

                <span className="text-[9px] tracking-[0.16em] text-white/35">
                    CONTACT FOR SCREENING
                </span>
            </figcaption>
        </figure>
    );
}

export default async function WorkDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const work = getWork(slug);

    if (!work) notFound();

    const { next } = getAdjacentWorks(slug);
    const lines = work.title.split("\n");
    const displayTitle = lines.join(" ");

    const meta = [
        { label: "YEAR", value: work.year },
        { label: "RUNTIME", value: work.runtime },
        { label: "FORMAT", value: work.format },
    ];

    return (
        <main className="min-h-screen overflow-hidden bg-[#0b0a09] text-[#e8e2d7]">
            <FilmHeader />

            {/* =========================================
                HERO
            ========================================= */}

            <section className="relative flex min-h-[100svh] items-end overflow-hidden">
                <Image
                    src={work.image}
                    alt={displayTitle}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_10%,rgba(11,10,9,.35),rgba(11,10,9,.94))]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/45 to-[#0b0a09]/55" />

                <div className="relative z-10 w-full px-6 pb-16 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
                    {/* Index marker */}
                    <div className="mb-8 flex items-center gap-4 text-[10px] tracking-[0.2em] text-white/45">
                        <span style={{ color: ACCENT }}>{work.number}</span>
                        <span className="h-px w-8 bg-white/20" />
                        <span>04 SHORT FILMS</span>
                    </div>

                    <h1 className="font-['Playfair_Display',serif] text-[clamp(56px,13vw,190px)] font-normal leading-[0.78] tracking-[-0.075em] text-white">
                        {lines.map((line, index) => (
                            <span
                                key={line}
                                className={
                                    lines.length > 1 &&
                                    index === lines.length - 1
                                        ? "block italic"
                                        : "block"
                                }
                            >
                                {line}
                            </span>
                        ))}
                    </h1>

                    {/* Logline */}
                    <p
                        className="mt-10 max-w-xl border-l pl-5 text-[13px] leading-7 text-white/70 sm:text-[15px]"
                        style={{ borderColor: ACCENT }}
                    >
                        {work.logline}
                    </p>

                    {/* Meta strip */}
                    <dl className="mt-14 grid max-w-3xl grid-cols-2 border-t border-white/12 sm:grid-cols-3">
                        {meta.map((item) => (
                            <div
                                key={item.label}
                                className="border-b border-white/12 py-5 pr-6 sm:border-b-0"
                            >
                                <dt className="mb-2 text-[9px] tracking-[0.2em] text-white/35">
                                    {item.label}
                                </dt>

                                <dd className="text-[11px] tracking-[0.08em] text-white/85">
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    {/* Roles */}
                    <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                        {work.roles.map((role) => (
                            <li
                                key={role}
                                className="flex items-center gap-2 text-[9px] tracking-[0.2em] text-white/50"
                            >
                                <span
                                    className="h-1 w-1 rounded-full"
                                    style={{ background: ACCENT }}
                                />
                                {role}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="absolute bottom-6 right-6 z-10 hidden text-[9px] tracking-[0.2em] text-white/30 lg:right-16 lg:block">
                    SCROLL ↓
                </div>
            </section>

            {/* =========================================
                THE FILM
            ========================================= */}

            <section className="px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
                <Reveal>
                    <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-6">
                        <div>
                            <p
                                className="mb-3 text-[10px] tracking-[0.24em]"
                                style={{ color: ACCENT }}
                            >
                                {work.kind}
                            </p>

                            <h2 className="font-['Playfair_Display',serif] text-[clamp(34px,5.5vw,74px)] font-normal leading-[0.9] tracking-[-0.06em] text-white">
                                The film
                            </h2>
                        </div>

                        <p className="hidden max-w-xs text-right text-[11px] leading-6 text-white/40 sm:block">
                            {work.tag}. Press play to begin streaming.
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={100}>
                    {work.video ? (
                        <FilmPlayer
                            src={work.video.src}
                            poster={work.image}
                            alt={`${displayTitle} still`}
                            label={work.video.label}
                            runtime={work.runtime}
                            sizeMb={work.video.sizeMb}
                        />
                    ) : (
                        <InProduction poster={work.image} alt={`${displayTitle} still`} />
                    )}
                </Reveal>
            </section>

            {/* =========================================
                ABOUT + CREDITS
            ========================================= */}

            <section className="border-t border-white/10 bg-[#100e0d] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
                <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
                    {/* Body copy */}
                    <div className="lg:col-span-7">
                        <Reveal>
                            <p
                                className="mb-8 text-[10px] tracking-[0.24em]"
                                style={{ color: ACCENT }}
                            >
                                ABOUT THE FILM
                            </p>

                            <div className="space-y-7">
                                {work.body.map((paragraph) => (
                                    <p
                                        key={paragraph.slice(0, 32)}
                                        className="max-w-2xl text-[14px] leading-[1.9] text-white/60 sm:text-[15px]"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Credits */}
                    <div className="lg:col-span-4 lg:col-start-9">
                        <Reveal delay={120}>
                            <p
                                className="mb-8 text-[10px] tracking-[0.24em]"
                                style={{ color: ACCENT }}
                            >
                                CREDITS
                            </p>

                            <dl>
                                {work.credits.map((credit) => (
                                    <div
                                        key={credit.label}
                                        className="flex items-baseline justify-between gap-6 border-b border-white/10 py-4"
                                    >
                                        <dt className="shrink-0 text-[9px] tracking-[0.18em] text-white/35">
                                            {credit.label}
                                        </dt>

                                        <dd className="text-right text-[10px] leading-5 tracking-[0.08em] text-white/80">
                                            {credit.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =========================================
                PULL QUOTE
            ========================================= */}

            <section className="relative overflow-hidden border-t border-white/10 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
                <Image
                    src={work.stills[0].src}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover opacity-[0.14]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-[#0b0a09]/70 to-[#0b0a09]" />

                <Reveal className="relative mx-auto max-w-4xl text-center">
                    <span
                        className="mb-8 block text-[9px] tracking-[0.3em]"
                        style={{ color: ACCENT }}
                    >
                        FROM {displayTitle}
                    </span>

                    <blockquote className="font-['Playfair_Display',serif] text-[clamp(28px,4.6vw,62px)] font-normal italic leading-[1.12] tracking-[-0.04em] text-white">
                        {work.quote}
                    </blockquote>
                </Reveal>
            </section>

            {/* =========================================
                STILLS
            ========================================= */}

            <section className="border-t border-white/10 px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
                <Reveal>
                    <div className="mb-12 flex items-end justify-between gap-6">
                        <div>
                            <p
                                className="mb-3 text-[10px] tracking-[0.24em]"
                                style={{ color: ACCENT }}
                            >
                                STILLS
                            </p>

                            <h2 className="font-['Playfair_Display',serif] text-[clamp(34px,5.5vw,74px)] font-normal leading-[0.9] tracking-[-0.06em] text-white">
                                Frames
                            </h2>
                        </div>

                        <span className="hidden text-[9px] tracking-[0.2em] text-white/30 sm:block">
                            {String(work.stills.length).padStart(2, "0")} IMAGES
                        </span>
                    </div>
                </Reveal>

                <div className="space-y-5">
                    <Reveal>
                        <figure className="group relative overflow-hidden bg-black">
                            <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
                                <Image
                                    src={work.stills[0].src}
                                    alt={work.stills[0].alt}
                                    fill
                                    sizes="100vw"
                                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                                />
                            </div>

                            <figcaption className="flex justify-between pt-3 text-[9px] tracking-[0.16em] text-white/35">
                                <span>FIG. 01</span>
                                <span>{work.stills[0].alt.toUpperCase()}</span>
                            </figcaption>
                        </figure>
                    </Reveal>

                    <div className="grid gap-5 pt-5 sm:grid-cols-2">
                        {work.stills.slice(1).map((still, index) => (
                            <Reveal key={still.src} delay={index * 110}>
                                <figure className="group relative overflow-hidden bg-black">
                                    <div
                                        className={`relative w-full ${
                                            still.ratio === "tall"
                                                ? "aspect-[4/5]"
                                                : "aspect-square"
                                        }`}
                                    >
                                        <Image
                                            src={still.src}
                                            alt={still.alt}
                                            fill
                                            sizes="(max-width: 640px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                                        />
                                    </div>

                                    <figcaption className="flex justify-between gap-4 pt-3 text-[9px] tracking-[0.16em] text-white/35">
                                        <span>
                                            FIG. {String(index + 2).padStart(2, "0")}
                                        </span>
                                        <span className="text-right">
                                            {still.alt.toUpperCase()}
                                        </span>
                                    </figcaption>
                                </figure>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================
                NEXT FILM
            ========================================= */}

            {next && (
                <section className="border-t border-white/10">
                    <Link
                        href={`/work/${next.slug}`}
                        className="group flex flex-col items-start justify-between gap-6 px-6 py-20 transition-colors duration-500 sm:px-10 sm:py-24 lg:flex-row lg:items-end lg:px-16"
                    >
                        <div>
                            <p className="mb-6 text-[10px] tracking-[0.24em] text-white/35">
                                NEXT FILM · {next.number}
                            </p>

                            <h2 className="font-['Playfair_Display',serif] text-[clamp(44px,10vw,150px)] font-normal leading-[0.8] tracking-[-0.075em] text-white/90 transition-colors duration-500 group-hover:text-white">
                                {next.title.replace(/\n/g, " ")}
                            </h2>
                        </div>

                        <span className="flex shrink-0 items-center gap-4 text-[10px] tracking-[0.2em] text-white/50 transition-colors duration-500 group-hover:text-white">
                            WATCH NEXT
                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-lg transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:border-white/70 group-hover:bg-white/10">
                                ↗
                            </span>
                        </span>
                    </Link>
                </section>
            )}

            {/* =========================================
                FOOTER
            ========================================= */}

            <footer className="border-t border-white/10 px-6 py-14 sm:px-10 lg:px-16">
                <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
                    <p className="text-[10px] tracking-[0.18em] text-white/30">
                        END OF FILM · {displayTitle}
                    </p>

                    <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                        <a
                            href="mailto:shravanip.0924@gmail.com"
                            className="text-[10px] tracking-[0.16em] text-white/55 transition-colors hover:text-white"
                        >
                            SHRAVANIP.0924@GMAIL.COM
                        </a>

                        <Link
                            href="/#work"
                            className="group inline-flex items-center gap-3 text-[10px] tracking-[0.16em] text-white/55 transition-colors hover:text-white"
                        >
                            BACK TO SELECTED WORKS
                            <span className="transition-transform duration-500 group-hover:translate-x-1">
                                ↗
                            </span>
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
