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

            <section className="px-6 pb-28 pt-8 sm:px-10 lg:px-16 lg:pb-36">

                <Link
                    href="/#photography"
                    className="group mb-24 inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-white/50 transition-colors hover:text-white sm:mb-32"
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

                    <p className="mb-7 text-[10px] tracking-[0.2em] text-white/35">
                        04 — WILDLIFE PHOTOGRAPHY
                    </p>

                    <h1 className="text-[clamp(64px,12vw,180px)] font-medium leading-[0.76] tracking-[-0.075em]">
                        Wild
                        <br />
                        <span className="font-normal italic">
                            instinct.
                        </span>
                    </h1>

                    <div className="mt-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

                        <p className="max-w-md text-sm leading-7 text-white/40">
                            Quiet encounters, fleeting movement and
                            moments found beyond the frame.
                        </p>

                        <span className="text-[9px] tracking-[0.18em] text-white/25">
                            WILDLIFE · NATURE
                        </span>

                    </div>

                </motion.div>

            </section>


            {/* =========================================
          WILDLIFE COLLECTION
      ========================================= */}

            <section className="px-6 pb-36 sm:px-10 lg:px-16">

                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        ease,
                    }}
                >

                    {/* Heading */}

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


                    {/* Featured wildlife image */}

                    <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">

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
                                    src={`/images/wildlife/main/${wildlifeImages[0]}`}
                                    alt="Wildlife photography"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 60vw"
                                    className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                            </div>

                        </motion.div>


                        {/* Remaining images */}

                        <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:grid-cols-1">

                            {wildlifeImages.slice(1).map((image, index) => (

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
                                    viewport={{ once: true }}
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
                                            sizes="(max-width: 1024px) 50vw, 40vw"
                                            className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
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
                        y: 70,
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
                    className="mt-40"
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


                    {/* Flamingo grid */}

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
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
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


            {/* Footer */}

            <section className="border-t border-white/10 px-6 py-16 sm:px-10 lg:px-16">

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