// AboutMyself.tsx  (React + TypeScript + Tailwind)
// Dark "About myself" section: script heading, justified text, tilted film
// strips, plus Software Skills / Education / Experience / Language.
//
// Skill icons live in /public/skills/*.svg (copy the `skills` folder there).

import type { FC } from "react";

/* ----------------------------- DATA ----------------------------- */

const STRIP_ONE: string[] = [
    "/profile/1.jpeg",
    "/profile/2.jpeg",
    "/profile/3.jpeg",
    "/profile/4.jpeg",
];

const STRIP_TWO: string[] = [
    "/profile/5.jpeg",
    "/profile/6.jpeg",
    "/profile/7.jpeg",
    "/profile/8.jpeg",
];

interface Skill {
    name: string;
    icon: string; // path inside /public
}

const SKILLS: Skill[] = [
    { name: "After Effects", icon: "images/tech/after-effects.svg" },
    { name: "Illustrator", icon: "images/tech/illustrator.svg" },
    { name: "DaVinci Resolve", icon: "images/tech/davinci-resolve.svg" },
    { name: "Premiere Pro", icon: "images/tech/premiere-pro.svg" },
    { name: "Photoshop", icon: "images/tech/photoshop.svg" },
];

interface Education {
    years: string;
    school: string;
    stream: string;
}

const EDUCATION: Education[] = [
    {
        years: "2019 — 2022",
        school: "SMAN 2 Malang / Multimedia",
        stream: "Natural Science",
    },
];

interface Experience {
    role: string;
    org: string;
    detail: string;
}

const EXPERIENCE: Experience[] = [
    {
        role: "TikTok Content",
        org: "Civil Campaign & Creative Content",
        detail: "Content creation & content revision",
    },
];

interface Language {
    name: string;
    level: number; // 0–100
}

const LANGUAGES: Language[] = [
    { name: "Indonesia", level: 90 },
    { name: "Java", level: 100 },
    { name: "English", level: 70 },
];

/* -------------------------- FILM STRIP -------------------------- */

interface FilmStripProps {
    photos: string[];
    label: string;
    className?: string;
}

const FilmStrip: FC<FilmStripProps> = ({ photos, label, className = "" }) => {
    const holes =
        "w-[22px] shrink-0 bg-repeat-y " +
        "[background-image:linear-gradient(#e9dcc6_0_14px,transparent_14px)] " +
        "[background-size:10px_26px] [background-position:center_6px]";

    return (
        <div
            className={`relative flex w-[170px] shrink-0 bg-[#0b0a09] shadow-[0_20px_60px_rgba(0,0,0,0.6)] sm:w-[210px] ${className}`}
        >
            <div className={holes} aria-hidden />

            <div className="flex flex-1 flex-col gap-2 py-2">
                {photos.map((src, i) => (
                    <div
                        key={`${src}-${i}`}
                        className="aspect-[4/5] w-full overflow-hidden bg-[#1a1612]"
                    >
                        <img
                            src={src}
                            alt=""
                            className="h-full w-full object-cover [filter:sepia(0.9)_contrast(0.95)_brightness(0.85)]"
                        />
                    </div>
                ))}
            </div>

            <div className={holes} aria-hidden />

            <span className="absolute left-[3px] top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[7px] font-bold tracking-widest text-[#e9dcc6]/70">
                {label}
            </span>
        </div>
    );
};

/* ------------------------ SMALL HELPERS ------------------------- */

const BlockTitle: FC<{ children: string }> = ({ children }) => (
    <h4 className="font-hello mb-5 text-xl font-bold text-[#b89a78]">
        {children}
    </h4>
);

/* --------------------------- SECTION ---------------------------- */

const AboutMyself: FC = () => {
    return (
        <section className="relative overflow-hidden bg-transparent text-[#e9dcc6]">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&family=Josefin+Sans:wght@400;600&family=Poppins:wght@700&display=swap');
        .font-script { font-family: 'Mrs Saint Delafield', cursive; }
        .font-body   { font-family: 'Josefin Sans', sans-serif; }
        .font-hello  { font-family: 'Poppins', sans-serif; }
      `}</style>

            {/* soft warm glow */}
            <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[#b8864b]/10 blur-[120px]" />

            <div className="relative mx-auto px-6 py-16 lg:px-12">
                {/* ================= TOP: TEXT + FILM STRIPS ================= */}
                <div className="grid min-h-[650px] grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                    {/* LEFT */}
                    <div className="max-w-2xl">
                        <h2 className="font-script text-[88px] leading-[0.8] text-[#f3e3c8] sm:text-[120px]">
                            About myself
                        </h2>

                        <h3 className="font-hello mt-4 text-5xl font-bold text-[#b89a78]">
                            Hello!
                        </h3>

                        <div className="font-body mt-8 space-y-5 text-justify text-[15px] leading-[1.6] tracking-wide text-[#d9cbb8]">
                            <p>
                                I&apos;m a Digital Filmmaking student who loves turning simple
                                ideas into stories people can see, feel, and remember.
                            </p>

                            <p>
                                My journey in filmmaking has taken me through direction,
                                cinematography, photography, editing, scriptwriting, and
                                theatre, giving me a chance to understand storytelling from
                                different perspectives. I enjoy being behind the camera,
                                shaping a scene, working with actors, finding the right visual,
                                or simply figuring out how one small moment can say more than a
                                hundred words.
                            </p>

                            <p>
                                For me, filmmaking isn&apos;t just about creating something that
                                looks good, it&apos;s about creating something that makes people
                                pause, feel something, or see an idea differently.
                            </p>

                            <p>
                                I&apos;m constantly learning, experimenting, and looking for
                                opportunities to grow, especially in direction, editing &amp;
                                scriptwriting. I bring curiosity, creativity, and a hands-on
                                approach to every project I work on.
                            </p>

                            <p>
                                I don&apos;t just want to make films. I want to create stories
                                that stay with people &amp; connect with people.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="relative flex justify-center gap-6 sm:gap-10 lg:justify-end">
                        <FilmStrip
                            photos={STRIP_ONE}
                            label="P5 PLUS"
                            className="origin-top -rotate-[4deg] lg:mt-4"
                        />
                        <FilmStrip
                            photos={STRIP_TWO}
                            label="P5 PLUS"
                            className="origin-top rotate-[4deg] lg:-mt-6"
                        />
                    </div>
                </div>

                {/* ================= BOTTOM: DETAILS ================= */}
                <div className="font-body mt-12 grid grid-cols-1 gap-10 border-t border-[#e9dcc6]/15 pt-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-0">
                    {/* Software skills */}
                    <div className="lg:pr-6">
                        <BlockTitle>Software Skills</BlockTitle>
                        <div className="flex flex-wrap gap-x-4 gap-y-5">
                            {SKILLS.map((s) => (
                                <div
                                    key={s.name}
                                    className="flex w-16 flex-col items-center gap-2"
                                >
                                    <img
                                        src={s.icon}
                                        alt={s.name}
                                        className="h-14 w-14 object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.5)]"
                                        loading="lazy"
                                    />
                                    <span className="text-center text-[11px] leading-tight text-[#d9cbb8]/70">
                                        {s.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="lg:border-l lg:border-[#e9dcc6]/15 lg:px-6">
                        <BlockTitle>Education</BlockTitle>
                        <ul className="space-y-5">
                            {EDUCATION.map((e) => (
                                <li key={e.school} className="flex gap-3">
                                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#b89a78]" />
                                    <div>
                                        <p className="text-xs font-semibold tracking-wide text-[#b89a78]">
                                            {e.years}
                                        </p>
                                        <p className="mt-1 text-sm font-semibold leading-5 text-[#f3e3c8]">
                                            {e.school}
                                        </p>
                                        <p className="text-sm leading-5 text-[#d9cbb8]/70">
                                            {e.stream}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Experience */}
                    <div className="lg:border-l lg:border-[#e9dcc6]/15 lg:px-6">
                        <BlockTitle>Experience</BlockTitle>
                        <ul className="space-y-5">
                            {EXPERIENCE.map((x) => (
                                <li key={x.role} className="flex gap-3">
                                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#b89a78]" />
                                    <div>
                                        <p className="text-sm font-semibold leading-5 text-[#f3e3c8]">
                                            {x.role}
                                        </p>
                                        <p className="mt-1 text-sm leading-5 text-[#d9cbb8]/80">
                                            {x.org}
                                        </p>
                                        <p className="text-sm leading-5 text-[#d9cbb8]/60">
                                            {x.detail}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Language / communication */}
                    <div className="lg:border-l lg:border-[#e9dcc6]/15 lg:pl-10">
                        <BlockTitle>Language</BlockTitle>
                        <ul className="space-y-4">
                            {LANGUAGES.map((l) => (
                                <li key={l.name}>
                                    <div className="mb-1.5 flex justify-between text-sm">
                                        <span className="text-[#f3e3c8]">{l.name}</span>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMyself;
