"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
    {
        number: "01",
        title: "HAND STITCHED",
        subtitle: "GARMENT",
        description:
            "Soft light, gentle shadows and delicate details create a quiet study of craft and texture.",
        folder: "hand-stitched",
        images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
        layout: "featured",
    },
    {
        number: "02",
        title: "SOFT GIRL",
        subtitle: "ERA",
        description:
            "Delicate flowers, glowing textures and a calm mood capture the essence of soft femininity.",
        folder: "soft-girl",
        images: ["01.jpg", "02.jpg", "03.jpg"],
        layout: "standard",
    },
    {
        number: "03",
        title: "PRODUCT",
        subtitle: "PHOTOGRAPHY",
        description:
            "Objects become stories through light, composition, shadow and careful observation.",
        folder: "product",
        images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
        layout: "reverse",
    },
    {
        number: "04",
        title: "PARTY THEMED",
        subtitle: "PHOTOSHOOT",
        description:
            "A playful collection built around colour, movement, energy and celebration.",
        folder: "party",
        images: ["01.jpg", "02.jpg", "03.jpg"],
        layout: "standard",
    },
    {
        number: "05",
        title: "NAARI",
        subtitle: "PHOTOSHOOT",
        description:
            "Portraits exploring presence, expression, softness and strength.",
        folder: "naari",
        images: ["01.jpg", "02.jpg", "03.jpg", "04.jpg"],
        layout: "reverse",
    },
    {
        number: "06",
        title: "VINTAGE",
        subtitle: "PHOTOSHOOT",
        description:
            "A nostalgic visual language shaped by timeless portraits and muted atmosphere.",
        folder: "vintage",
        images: ["01.jpg", "02.jpg", "03.jpg"],
        layout: "standard",
    },
];

const ease = [0.22, 1, 0.36, 1];

export default function PhotographyPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#f3efe8] text-[#171717]">

            {/* =========================================
          HERO
      ========================================= */}

            <section className="px-6 pb-24 pt-8 sm:px-10 lg:px-16 lg:pb-32">

                {/* Back */}
                <Link
                    href="/#photography"
                    className="group mb-24 inline-flex items-center gap-3 text-[10px] tracking-[0.18em] text-black/55 transition-colors hover:text-black sm:mb-32"
                >
                    <span className="transition-transform duration-500 group-hover:-translate-x-1">
                        ←
                    </span>

                    BACK TO WORK
                </Link>

                {/* Hero content */}
                <motion.div
                    initial={{ opacity: 0, y: 45 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease }}
                >
                    <p className="mb-7 text-[10px] tracking-[0.2em] text-black/40">
                        04 — PHOTOGRAPHY
                    </p>

                    <h1 className="max-w-6xl text-[clamp(64px,12vw,180px)] font-medium leading-[0.78] tracking-[-0.075em]">
                        Moments
                        <br />
                        <span className="font-normal italic">observed.</span>
                    </h1>

                    <div className="mt-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

                        <p className="max-w-md text-sm leading-7 text-black/50">
                            A collection of portraits, details, textures and
                            quiet visual stories — captured through light,
                            atmosphere and observation.
                        </p>

                        <span className="text-[9px] tracking-[0.18em] text-black/35">
                            06 COLLECTIONS
                        </span>

                    </div>
                </motion.div>
            </section>


            {/* =========================================
          COLLECTIONS
      ========================================= */}

            <section className="px-6 pb-32 sm:px-10 lg:px-16">

                <div className="space-y-36">

                    {collections.map((collection, sectionIndex) => (

                        <motion.section
                            key={collection.number}
                            initial={{ opacity: 0, y: 70 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{
                                once: true,
                                margin: "-120px",
                            }}
                            transition={{
                                duration: 1,
                                ease,
                            }}
                        >

                            {/* Section heading */}
                            <div className="mb-10 border-t border-black/15 pt-5">

                                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">

                                    <div className="flex gap-5">

                                        <span className="pt-1 text-[10px] tracking-[0.15em] text-black/35">
                                            {collection.number}
                                        </span>

                                        <div>

                                            <h2 className="text-[clamp(32px,5vw,70px)] font-medium leading-[0.88] tracking-[-0.055em]">
                                                {collection.title}
                                                <br />
                                                <span className="font-normal italic">
                                                    {collection.subtitle}
                                                </span>
                                            </h2>

                                            <p className="mt-6 max-w-md text-xs leading-6 text-black/45">
                                                {collection.description}
                                            </p>

                                        </div>
                                    </div>

                                    <span className="text-[9px] tracking-[0.16em] text-black/35">
                                        {String(collection.images.length).padStart(2, "0")} IMAGES
                                    </span>

                                </div>
                            </div>


                            {/* =====================================
                  FEATURED LAYOUT
              ===================================== */}

                            {collection.layout === "featured" && (
                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">

                                    {/* Large image */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.9, ease }}
                                        className="group relative overflow-hidden lg:col-span-7"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden bg-black lg:aspect-[4/5]">

                                            <Image
                                                src={`/images/photography/${collection.folder}/${collection.images[0]}`}
                                                alt={`${collection.title} ${collection.subtitle}`}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                                            />

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                                            <span className="absolute bottom-5 left-5 text-[9px] tracking-[0.16em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                                01
                                            </span>

                                        </div>
                                    </motion.div>


                                    {/* Smaller images */}
                                    <div className="grid grid-cols-2 gap-3 lg:col-span-5 lg:grid-cols-1">

                                        {collection.images.slice(1).map((image, index) => (

                                            <motion.div
                                                key={image}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: index * 0.08,
                                                    ease,
                                                }}
                                                className="group relative overflow-hidden"
                                            >

                                                <div className="relative aspect-[4/3] overflow-hidden bg-black lg:aspect-[16/10]">

                                                    <Image
                                                        src={`/images/photography/${collection.folder}/${image}`}
                                                        alt={`${collection.title} ${index + 2}`}
                                                        fill
                                                        sizes="(max-width: 1024px) 50vw, 40vw"
                                                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                                                    />

                                                </div>

                                            </motion.div>

                                        ))}

                                    </div>

                                </div>
                            )}


                            {/* =====================================
                  STANDARD LAYOUT
              ===================================== */}

                            {collection.layout === "standard" && (
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                                    {collection.images.map((image, index) => (

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
                                                margin: "-60px",
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                delay: index * 0.07,
                                                ease,
                                            }}
                                            className="group relative overflow-hidden bg-black"
                                        >

                                            <div className="relative aspect-[3/4] overflow-hidden">

                                                <Image
                                                    src={`/images/photography/${collection.folder}/${image}`}
                                                    alt={`${collection.title} ${index + 1}`}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-[1300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                                <span className="absolute bottom-4 left-4 text-[9px] tracking-[0.15em] text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>

                                            </div>

                                        </motion.div>

                                    ))}

                                </div>
                            )}


                            {/* =====================================
                  REVERSE / EDITORIAL LAYOUT
              ===================================== */}

                            {collection.layout === "reverse" && (
                                <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">

                                    {/* Small column */}
                                    <div className="order-2 grid grid-cols-2 gap-3 lg:order-1 lg:col-span-5 lg:grid-cols-1">

                                        {collection.images.slice(1).map((image, index) => (

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
                                                    delay: index * 0.08,
                                                    ease,
                                                }}
                                                className="group relative overflow-hidden"
                                            >

                                                <div className="relative aspect-[4/3] overflow-hidden bg-black lg:aspect-[16/10]">

                                                    <Image
                                                        src={`/images/photography/${collection.folder}/${image}`}
                                                        alt={`${collection.title} ${index + 2}`}
                                                        fill
                                                        sizes="(max-width: 1024px) 50vw, 40vw"
                                                        className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                                                    />

                                                </div>

                                            </motion.div>

                                        ))}

                                    </div>


                                    {/* Large image */}
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
                                        transition={{ duration: 0.9, ease }}
                                        className="order-1 group relative overflow-hidden lg:order-2 lg:col-span-7"
                                    >

                                        <div className="relative aspect-[4/5] overflow-hidden bg-black">

                                            <Image
                                                src={`/images/photography/${collection.folder}/${collection.images[0]}`}
                                                alt={`${collection.title} ${collection.subtitle}`}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                                className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                                            />

                                        </div>

                                    </motion.div>

                                </div>
                            )}

                        </motion.section>

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