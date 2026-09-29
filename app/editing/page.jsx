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

            <section className="relative px-6 pb-20 pt-6 sm:px-10 lg:px-16 lg:pb-24">

                <Link
                    href="/#photography"
                    className="group mb-10 inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-black/50 transition-colors hover:text-black sm:mb-14"
                >
                    <span className="transition-transform duration-500 group-hover:-translate-x-1">
                        ←
                    </span>

                    BACK TO PHOTOGRAPHY
                </Link>


                <div className="grid items-end gap-10 lg:grid-cols-12">

                    {/* TITLE */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 35,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.9,
                            ease,
                        }}
                        className="lg:col-span-5"
                    >

                        <p className="mb-5 text-[10px] tracking-[0.2em] text-black/35">
                            04 — EDITING
                        </p>

                        <h1 className="text-[clamp(58px,9vw,135px)] font-medium leading-[0.76] tracking-[-0.08em]">
                            Edited
                            <br />
                            <span className="font-normal italic">
                                worlds.
                            </span>
                        </h1>

                        <div className="mt-8 flex items-end justify-between gap-6">

                            <p className="max-w-sm text-sm leading-6 text-black/45">
                                Colour, contrast, atmosphere and transformation
                                shaped through visual experimentation.
                            </p>

                            <span className="shrink-0 text-[9px] tracking-[0.18em] text-black/30">
                                08 IMAGES
                            </span>

                        </div>

                    </motion.div>


                    {/* IMAGE PREVIEW */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 40,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 1,
                            delay: 0.15,
                            ease,
                        }}
                        className="lg:col-span-7"
                    >

                        <div className="grid grid-cols-12 items-end gap-3">

                            {/* LARGE */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.96,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 1.1,
                                    delay: 0.2,
                                    ease,
                                }}
                                className="group relative col-span-7 overflow-hidden"
                            >

                                <div className="relative aspect-[4/5] overflow-hidden bg-black">

                                    <Image
                                        src="/images/editing/01.jpg"
                                        alt="Editing work 01"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 60vw, 40vw"
                                        className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                                    <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.16em] text-white">
                                        EDIT — 01
                                    </span>

                                </div>

                            </motion.div>


                            {/* TOP */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 25,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.9,
                                    delay: 0.35,
                                    ease,
                                }}
                                className="group col-span-5 mb-14 overflow-hidden"
                            >

                                <div className="relative aspect-[4/5] overflow-hidden bg-black">

                                    <Image
                                        src="/images/editing/02.jpg"
                                        alt="Editing work 02"
                                        fill
                                        sizes="30vw"
                                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                                    />

                                </div>

                            </motion.div>


                            {/* BOTTOM */}

                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 25,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    duration: 0.9,
                                    delay: 0.5,
                                    ease,
                                }}
                                className="group col-span-5 -mt-10 overflow-hidden"
                            >

                                <div className="relative aspect-[16/10] overflow-hidden bg-black">

                                    <Image
                                        src="/images/editing/03.jpg"
                                        alt="Editing work 03"
                                        fill
                                        sizes="30vw"
                                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                                    />

                                </div>

                            </motion.div>

                        </div>

                    </motion.div>

                </div>


                {/* MOBILE PREVIEW */}

                <div className="mt-10 grid grid-cols-2 gap-3 lg:hidden">

                    <div className="group relative overflow-hidden">

                        <div className="relative aspect-[4/5] overflow-hidden bg-black">

                            <Image
                                src="/images/editing/01.jpg"
                                alt="Editing work 01"
                                fill
                                sizes="50vw"
                                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                            />

                        </div>

                    </div>

                    <div className="group relative mt-8 overflow-hidden">

                        <div className="relative aspect-[4/5] overflow-hidden bg-black">

                            <Image
                                src="/images/editing/02.jpg"
                                alt="Editing work 02"
                                fill
                                sizes="50vw"
                                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                GALLERY
            ========================================= */}

            <section className="px-6 pb-28 sm:px-10 lg:px-16">

                <div className="border-t border-black/10 pt-5">

                    <div className="mb-10 flex items-start justify-between gap-5">

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


                    {/* GRID */}

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

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                        <span className="absolute bottom-5 left-5 text-[9px] tracking-[0.16em] text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                                            EDIT {String(index + 1).padStart(2, "0")}
                                        </span>

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


            {/* FOOTER */}

            <section className="border-t border-black/10 px-6 py-14 sm:px-10 lg:px-16">

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