"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const editingImages = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
];

const ease = [0.22, 1, 0.36, 1];

export default function EditingPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#eee9e1] text-[#171717]">

            {/* =========================================
          HERO
      ========================================= */}

            <section className="px-6 pb-24 pt-8 sm:px-10 lg:px-16 lg:pb-32">

                <Link
                    href="/#photography"
                    className="group mb-24 inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-black/50 transition-colors hover:text-black sm:mb-32"
                >
                    <span className="transition-transform duration-500 group-hover:-translate-x-1">
                        ←
                    </span>

                    BACK TO PHOTOGRAPHY
                </Link>


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 50,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 1,
                        ease,
                    }}
                >

                    <p className="mb-7 text-[10px] tracking-[0.2em] text-black/35">
                        04 — EDITING
                    </p>

                    <h1 className="max-w-6xl text-[clamp(70px,13vw,190px)] font-medium leading-[0.75] tracking-[-0.08em]">
                        Edited
                        <br />
                        <span className="font-normal italic">
                            worlds.
                        </span>
                    </h1>

                    <div className="mt-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

                        <p className="max-w-md text-sm leading-7 text-black/45">
                            A visual collection shaped through colour,
                            contrast, atmosphere and transformation.
                        </p>

                        <span className="text-[9px] tracking-[0.18em] text-black/30">
                            EDITING — 01
                        </span>

                    </div>

                </motion.div>

            </section>


            {/* =========================================
          EDITING GALLERY
      ========================================= */}

            <section className="px-6 pb-36 sm:px-10 lg:px-16">

                <div className="border-t border-black/10 pt-5">

                    <div className="mb-12 flex items-start justify-between gap-5">

                        <div className="flex gap-5">

                            <span className="pt-1 text-[10px] tracking-[0.15em] text-black/30">
                                01
                            </span>

                            <div>

                                <h2 className="text-[clamp(30px,5vw,68px)] font-medium leading-[0.88] tracking-[-0.055em]">
                                    EDITING
                                </h2>

                                <p className="mt-5 max-w-md text-xs leading-6 text-black/40">
                                    A collection of images transformed through
                                    colour, light and visual experimentation.
                                </p>

                            </div>

                        </div>

                        <span className="text-[9px] tracking-[0.16em] text-black/30">
                            {String(editingImages.length).padStart(2, "0")} IMAGES
                        </span>

                    </div>


                    {/* =====================================
              EDITING GRID
          ===================================== */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">

                        {editingImages.map((image, index) => {

                            const layout =
                                index === 0
                                    ? "lg:col-span-7"
                                    : index === 1
                                        ? "lg:col-span-5"
                                        : index === 2
                                            ? "lg:col-span-5"
                                            : index === 3
                                                ? "lg:col-span-7"
                                                : index === 4
                                                    ? "lg:col-span-7"
                                                    : index === 5
                                                        ? "lg:col-span-5"
                                                        : index === 6
                                                            ? "lg:col-span-5"
                                                            : "lg:col-span-7";

                            return (
                                <motion.div
                                    key={image}
                                    initial={{
                                        opacity: 0,
                                        y: 50,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                        margin: "-80px",
                                    }}
                                    transition={{
                                        duration: 0.9,
                                        delay: (index % 3) * 0.08,
                                        ease,
                                    }}
                                    className={`group relative overflow-hidden ${layout}`}
                                >

                                    <div
                                        className={`
                      relative overflow-hidden bg-black
                      ${index % 3 === 0
                                                ? "aspect-[4/3]"
                                                : "aspect-[4/5]"
                                            }
                    `}
                                    >

                                        <Image
                                            src={`/images/editing/${image}`}
                                            alt={`Editing work ${index + 1}`}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw"
                                            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                                        />

                                        {/* Hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-100" />

                                        {/* Image number */}
                                        <span className="absolute bottom-5 left-5 text-[9px] tracking-[0.16em] text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                                            EDIT {String(index + 1).padStart(2, "0")}
                                        </span>

                                        {/* Arrow */}
                                        <span className="absolute right-5 top-5 flex h-10 w-10 translate-x-2 -translate-y-2 rotate-[-20deg] items-center justify-center rounded-full border border-white/50 text-white opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0 group-hover:opacity-100">
                                            ↗
                                        </span>

                                    </div>

                                </motion.div>
                            );
                        })}

                    </div>

                </div>

            </section>


            {/* Footer */}

            <section className="border-t border-black/10 px-6 py-16 sm:px-10 lg:px-16">

                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

                    <span className="text-[9px] tracking-[0.18em] text-black/30">
                        END OF EDITING
                    </span>

                    <Link
                        href="/#photography"
                        className="group inline-flex items-center gap-3 text-[10px] tracking-[0.16em]"
                    >
                        BACK TO PHOTOGRAPHY

                        <span className="transition-transform duration-500 group-hover:translate-x-1">
                            ↗
                        </span>
                    </Link>

                </div>

            </section>

        </main>
    );
}