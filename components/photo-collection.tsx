"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Photograph } from "@/data/galleries";

type PhotoCollectionProps = {
    id: string;
    index: string;
    label: string;
    title: string;
    italic: string;
    description: string;
    photographs: Photograph[];
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PhotoCollection({
    id,
    index,
    label,
    title,
    italic,
    description,
    photographs,
}: PhotoCollectionProps) {
    return (
        <article id={id} className="scroll-mt-24">
            <div className="flex flex-col gap-8 border-t border-black/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[10px] tracking-[0.2em] text-black/45">
                        {index} / {label}
                    </p>

                    <h3 className="mt-5 text-[clamp(46px,8vw,110px)] font-medium leading-[0.8] tracking-[-0.06em]">
                        {title}
                        <br />
                        <span className="font-normal italic">{italic}</span>
                    </h3>
                </div>

                <div className="max-w-sm sm:pb-2">
                    <p className="text-sm leading-7 text-black/50">
                        {description}
                    </p>

                    <span className="mt-5 inline-block text-[9px] tracking-[0.18em] text-black/35">
                        {String(photographs.length).padStart(2, "0")} IMAGES
                    </span>
                </div>
            </div>

            <div className="mt-12 columns-1 gap-3 sm:columns-2 lg:columns-3">
                {photographs.map((photograph, photoIndex) => (
                    <motion.figure
                        key={photograph.src}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{
                            duration: 0.8,
                            delay: (photoIndex % 3) * 0.07,
                            ease,
                        }}
                        className="group relative mb-3 block break-inside-avoid overflow-hidden bg-black"
                    >
                        <Image
                            src={photograph.src}
                            alt={`${label} photograph ${photoIndex + 1}`}
                            width={photograph.width}
                            height={photograph.height}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="h-auto w-full object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.15em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            {String(photoIndex + 1).padStart(2, "0")}
                        </span>
                    </motion.figure>
                ))}
            </div>
        </article>
    );
}
