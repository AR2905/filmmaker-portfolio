"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const wildlifeImages = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
];

const flamingoImages = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
];

const ease = [0.22, 1, 0.36, 1];

export default function WildlifePage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#17140f] text-[#f2ede5]">

            {/* =========================================
                HERO
            ========================================= */}

            <section className="relative px-6 pb-20 pt-6 sm:px-10 lg:px-16 lg:pb-24">

                <Link
                    href="/#photography"
                    className="group mb-10 inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-white/50 transition-colors hover:text-white sm:mb-14"
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

                        <p className="mb-5 text-[10px] tracking-[0.2em] text-white/35">
                            WILDLIFE PHOTOGRAPHY
                        </p>

                        <h1 className="text-[clamp(58px,9vw,135px)] font-medium leading-[0.76] tracking-[-0.075em]">
                            Wild
                            <br />
                            <span className="font-normal italic">
                                instinct.
                            </span>
                        </h1>

                        <div className="mt-8 flex items-end justify-between gap-6">

                            <p className="max-w-sm text-sm leading-6 text-white/40">
                                Quiet encounters, fleeting movement and
                                moments found beyond the frame.
                            </p>

                            <span className="shrink-0 text-[9px] tracking-[0.18em] text-white/25">
                                WILDLIFE · NATURE
                            </span>

                        </div>

                    </motion.div>


                    {/* IMAGE PREVIEW */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 45,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 1.1,
                            delay: 0.15,
                            ease,
                        }}
                        className="lg:col-span-7"
                    >

                        <div className="grid grid-cols-12 items-end gap-3">

                            {/* MAIN */}

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
                                    duration: 1.2,
                                    delay: 0.2,
                                    ease,
                                }}
                                className="group relative col-span-7 overflow-hidden"
                            >

                                <div className="relative aspect-[4/5] overflow-hidden bg-black">

                                    <Image
                                        src="/images/wildlife/main/01.jpg"
                                        alt="Wildlife photography"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 60vw, 40vw"
                                        className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                                    <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.16em] text-white">
                                        01 — WILDLIFE
                                    </span>

                                </div>

                            </motion.div>


                            {/* TOP RIGHT */}

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
                                className="group col-span-5 mb-12 overflow-hidden"
                            >

                                <div className="relative aspect-[4/5] overflow-hidden bg-black">

                                    <Image
                                        src="/images/wildlife/main/02.jpg"
                                        alt="Wildlife photography 02"
                                        fill
                                        sizes="30vw"
                                        className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
                                    />

                                </div>

                            </motion.div>


                            {/* BOTTOM RIGHT */}

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
                                className="group col-span-5 -mt-8 overflow-hidden"
                            >

                                <div className="relative aspect-[16/10] overflow-hidden bg-black">

                                    <Image
                                        src="/images/wildlife/main/03.jpg"
                                        alt="Wildlife photography 03"
                                        fill
                                        sizes="30vw"
                                        className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
                                    />

                                </div>

                            </motion.div>

                        </div>

                    </motion.div>

                </div>


                {/* MOBILE */}

                <div className="mt-10 grid grid-cols-2 gap-3 lg:hidden">

                    <div className="group relative overflow-hidden">

                        <div className="relative aspect-[4/5] overflow-hidden bg-black">

                            <Image
                                src="/images/wildlife/main/01.jpg"
                                alt="Wildlife"
                                fill
                                sizes="50vw"
                                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                            />

                        </div>

                    </div>

                    <div className="group relative mt-8 overflow-hidden">

                        <div className="relative aspect-[4/5] overflow-hidden bg-black">

                            <Image
                                src="/images/wildlife/main/02.jpg"
                                alt="Wildlife"
                                fill
                                sizes="50vw"
                                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                WILDLIFE COLLECTION
            ========================================= */}

            <section className="px-6 pb-28 sm:px-10 lg:px-16">

                <motion.div
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
                        margin: "-100px",
                    }}
                    transition={{
                        duration: 1,
                        ease,
                    }}
                >

                    <div className="mb-10 border-t border-white/15 pt-5">

                        <div className="flex flex-col justify-between gap-5 sm:flex-row">

                            <div className="flex gap-5">

                                <span className="pt-1 text-[10px] tracking-[0.15em] text-white/30">
                                    01
                                </span>

                                <div>

                                    <h2 className="text-[clamp(32px,5vw,70px)] font-medium leading-[0.88] tracking-[-0.055em]">
                                        WILDLIFE
                                        <br />
                                        <span className="font-normal italic">
                                            PHOTOGRAPHY
                                        </span>
                                    </h2>

                                    <p className="mt-6 max-w-md text-xs leading-6 text-white/35">
                                        Observing nature in its quieter moments,
                                        where movement becomes stillness.
                                    </p>

                                </div>

                            </div>

                            <span className="text-[9px] tracking-[0.16em] text-white/25">
                                {String(wildlifeImages.length).padStart(2, "0")} IMAGES
                            </span>

                        </div>

                    </div>


                    {/* MAIN GRID */}

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">

                        {/* LARGE */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                ease,
                            }}
                            className="group relative overflow-hidden lg:col-span-7"
                        >

                            <div className="relative aspect-[4/5] overflow-hidden bg-black">

                                <Image
                                    src="/images/wildlife/main/01.jpg"
                                    alt="Wildlife photography"
                                    fill
                                    sizes="60vw"
                                    className="object-cover transition-transform duration-[1500ms] group-hover:scale-[1.045]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                            </div>

                        </motion.div>


                        {/* SMALL IMAGES */}

                        <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:grid-cols-1">

                            {wildlifeImages.slice(1, 5).map((image, index) => (

                                <motion.div
                                    key={image}
                                    initial={{
                                        opacity: 0,
                                        y: 35,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.06,
                                        ease,
                                    }}
                                    className="group relative overflow-hidden"
                                >

                                    <div className="relative aspect-[4/3] overflow-hidden bg-black lg:aspect-[16/10]">

                                        <Image
                                            src={`/images/wildlife/main/${image}`}
                                            alt={`Wildlife photography ${index + 2}`}
                                            fill
                                            sizes="40vw"
                                            className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                                        />

                                    </div>

                                </motion.div>

                            ))}

                        </div>

                    </div>

                </motion.div>


                {/* =========================================
                    FLAMINGOS
                ========================================= */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 60,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                        margin: "-100px",
                    }}
                    transition={{
                        duration: 1,
                        ease,
                    }}
                    className="mt-28 lg:mt-36"
                >

                    <div className="mb-10 border-t border-white/15 pt-5">

                        <div className="flex flex-col justify-between gap-5 sm:flex-row">

                            <div className="flex gap-5">

                                <span className="pt-1 text-[10px] tracking-[0.15em] text-white/30">
                                    02
                                </span>

                                <div>

                                    <h2 className="text-[clamp(38px,6vw,82px)] font-medium leading-[0.85] tracking-[-0.06em]">
                                        FLAMINGO&apos;S
                                    </h2>

                                    <p className="mt-6 max-w-md text-xs leading-6 text-white/35">
                                        A closer look at colour, reflection and
                                        movement across still water.
                                    </p>

                                </div>

                            </div>

                            <span className="text-[9px] tracking-[0.16em] text-white/25">
                                {String(flamingoImages.length).padStart(2, "0")} IMAGES
                            </span>

                        </div>

                    </div>


                    {/* FLAMINGO GRID */}

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">

                        {flamingoImages.map((image, index) => (

                            <motion.div
                                key={image}
                                initial={{
                                    opacity: 0,
                                    y: 40,
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
                                    delay: index * 0.08,
                                    ease,
                                }}
                                className={`
                                    group relative overflow-hidden
                                    ${index === 0
                                        ? "lg:col-span-7"
                                        : index === 1
                                            ? "lg:col-span-5"
                                            : index === 2
                                                ? "lg:col-span-5"
                                                : "lg:col-span-7"
                                    }
                                `}
                            >

                                <div
                                    className={`
                                        relative overflow-hidden bg-black
                                        ${index === 0 || index === 3
                                            ? "aspect-[16/10]"
                                            : "aspect-[4/5]"
                                        }
                                    `}
                                >

                                    <Image
                                        src={`/images/wildlife/flamingos/${image}`}
                                        alt={`Flamingo photography ${index + 1}`}
                                        fill
                                        sizes="60vw"
                                        className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-100" />

                                    <span className="absolute bottom-5 left-5 text-[9px] tracking-[0.16em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                </motion.section>

            </section>


            {/* FOOTER */}

            <section className="border-t border-white/10 px-6 py-14 sm:px-10 lg:px-16">

                <Link
                    href="/#photography"
                    className="group inline-flex items-center gap-3 text-[10px] tracking-[0.16em] text-white/50 transition-colors hover:text-white"
                >

                    <span className="transition-transform duration-500 group-hover:-translate-x-1">
                        ←
                    </span>

                    BACK TO PHOTOGRAPHY

                </Link>

            </section>

        </main>
    );
}