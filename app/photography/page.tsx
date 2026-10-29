"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const photographs = [
    { src: "/images/photography/1.jpeg", width: 5952, height: 4480 },
    { src: "/images/photography/2.jpg", width: 1600, height: 1204 },
    { src: "/images/photography/3.jpg", width: 1600, height: 1204 },
    { src: "/images/photography/4.jpeg", width: 4016, height: 6016 },
    { src: "/images/photography/5.jpg", width: 1600, height: 1204 },
    { src: "/images/photography/6.jpeg", width: 2046, height: 1368 },
    { src: "/images/photography/7.jpeg", width: 2046, height: 1368 },
    { src: "/images/photography/8.jpg", width: 1066, height: 1600 },
    { src: "/images/photography/9.jpg", width: 1600, height: 1204 },
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function PhotographyPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#f3efe8] text-[#171717]">

            {/* =========================================
          HERO
      ========================================= */}

            <section className="px-6 pb-24 pt-8 sm:px-10 lg:px-16 lg:pb-32">

                <div className="flex justify-between">

                    <p className="mb-7 text-[15px] tracking-[0.2em] text-black font-bold">
                        PHOTOGRAPHY
                    </p>
                    <Link
                        href="/#photography"
                        className="group mb-24 inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-black/55 transition-colors hover:text-black sm:mb-32"
                    >
                        <span className="transition-transform duration-500 group-hover:-translate-x-1">
                            ←
                        </span>

                        BACK TO WORK
                    </Link>


                </div>

                {/* Hero content */}
                <motion.div
                    initial={{ opacity: 0, y: 45 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease }}
                >


                    <h1 className="max-w-6xl text-[clamp(64px,12vw,180px)] font-medium leading-[0.78] tracking-[-0.075em]">
                        Moments
                        <br />
                        <span className="font-normal">observed.</span>
                    </h1>

                    <div className="mt-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

                        <p className="max-w-md text-sm leading-7 text-black/50">
                            A collection of portraits, details, textures and
                            quiet visual stories — captured through light,
                            atmosphere and observation.
                        </p>

                        <span className="text-[9px] tracking-[0.18em] text-black/35">
                            {String(photographs.length).padStart(2, "0")} IMAGES
                        </span>

                    </div>
                </motion.div>
            </section>


            {/* =========================================
          GALLERY
      ========================================= */}

            <section className="px-6 pb-32 sm:px-10 lg:px-16">

                <div className="mb-10 border-t border-black/15 pt-5">

                    <div className="flex items-end justify-between gap-6">


                        <span className="text-[9px] tracking-[0.16em] text-black/35">
                            {String(photographs.length).padStart(2, "0")} IMAGES
                        </span>

                    </div>

                </div>

                <div className="columns-1 gap-3 sm:columns-2 lg:columns-3">

                    {photographs.map((photograph, index) => (

                        <motion.figure
                            key={photograph.src}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{
                                once: true,
                                margin: "-60px",
                            }}
                            transition={{
                                duration: 0.8,
                                delay: (index % 3) * 0.07,
                                ease,
                            }}
                            className="group relative mb-3 block break-inside-avoid overflow-hidden bg-black"
                        >

                            <Image
                                src={photograph.src}
                                alt={`Photography ${index + 1}`}
                                width={photograph.width}
                                height={photograph.height}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="h-auto w-full object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.15em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                        </motion.figure>

                    ))}

                </div>
            </section>


            {/* =========================================
          FOOTER
      ========================================= */}

            <section className="border-t border-black/10 px-6 py-16 sm:px-10 lg:px-16">

                <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-center">

                    <p className="text-[10px] tracking-[0.16em] text-black/35">
                        END OF PHOTOGRAPHY
                    </p>

                    <Link
                        href="/#work"
                        className="group inline-flex items-center gap-3 text-[10px] tracking-[0.16em]"
                    >
                        BACK TO SELECTED WORKS

                        <span className="transition-transform duration-500 group-hover:translate-x-1">
                            ↗
                        </span>
                    </Link>

                </div>

            </section>

        </main>
    );
}
