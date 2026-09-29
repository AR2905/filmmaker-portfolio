/**
 * Single source of truth for every short film on the site.
 *
 * `number`, `title`, `slug`, `image` and `tag` are the exact fields the
 * homepage works grid already renders, so importing this list there is a
 * no-op visually. The rest of the fields are consumed by /work/[slug].
 *
 * NOTE FOR SHRAVANI: the copy, runtime, year and credit values below are
 * written to be believable and on-theme, but they are placeholders until you
 * replace them with the real facts for each film. Video byte sizes are real
 * (read off disk) so the player can warn about heavy files honestly.
 */

export type WorkCredit = {
    label: string;
    value: string;
};

export type WorkStill = {
    src: string;
    alt: string;
    /** Layout hint for the stills grid. */
    ratio: "wide" | "tall" | "square";
};

export type Work = {
    number: string;
    /** Newline separated — the grid splits this into lines. */
    title: string;
    slug: string;
    image: string;
    tag: string;

    kind: string;
    year: string;
    /** m:ss — edit to match the real cut. */
    runtime: string;
    format: string;
    roles: string[];

    logline: string;
    body: string[];
    quote: string;

    credits: WorkCredit[];

    /**
     * `null` means the film has no mastered file yet — the page renders an
     * "in production" state instead of a dead player. Drop the mp4 into
     * /public and fill this in to switch it on.
     */
    video: {
        src: string;
        sizeMb: number;
        label: string;
    } | null;

    stills: WorkStill[];
};

const REEL_STILLS: WorkStill[] = [
    {
        src: "/images/sawaan-rain.png",
        alt: "Rain falling through a dark frame",
        ratio: "wide",
    },
    {
        src: "/images/hero-film.png",
        alt: "A still held on screen, mid shot",
        ratio: "tall",
    },
    {
        src: "/images/flamingos.png",
        alt: "A quiet horizon at the end of the day",
        ratio: "square",
    },
];

export const works: Work[] = [
    {
        number: "01",
        title: "SAWAAN\nKA MAAH",
        slug: "sawaan-ka-maah",
        image: "/images/sawaan-rain.png",
        tag: "A poem of distance",

        kind: "SHORT FILM",
        year: "2025",
        runtime: "08:40",
        format: "DIGITAL · 16MM GRAIN",
        roles: ["DIRECTION", "CINEMATOGRAPHY", "EDITING"],

        logline:
            "A monsoon month measured in unanswered calls, wet windows, and the distance between two people who will not say it out loud.",

        body: [
            "SAWAAN KA MAAH is a film about waiting. It follows one month of rain in a small house on the edge of the city, and the woman who keeps leaving the window open in case someone walks back through it.",
            "There is very little dialogue. The story is carried by repetition instead — the same chair, the same bus that does not arrive, the same song played one bar too many times. I wanted the monsoon to behave like a character: patient, indifferent, and impossible to argue with.",
            "Almost everything was shot on overcast afternoons. I let the flat grey light do the work and kept the camera mostly still, so the only real movement in the film belongs to the rain and to her.",
        ],

        quote:
            "The rain was never the weather. It was the only honest thing in the house.",

        credits: [
            { label: "DIRECTED BY", value: "SHRAVANI PUJAR" },
            { label: "SHOT ON", value: "SONY A6400 · 35MM & 85MM" },
            { label: "EDITED BY", value: "SHRAVANI PUJAR" },
            { label: "SOUND", value: "PRACTICAL / FIELD RECORDING" },
            { label: "GRADE", value: "LOGIC & DA VINCI RESOLVE" },
            { label: "STATUS", value: "RELEASED" },
        ],

        video: {
            src: "/sawan-ka-maah.mp4",
            sizeMb: 99,
            label: "FULL FILM · 1080P",
        },

        stills: REEL_STILLS,
    },

    {
        number: "02",
        title: "CHHAVI",
        slug: "chhavi",
        image: "/images/hero-film.png",
        tag: "An experiment in stillness",

        kind: "SHORT FILM",
        year: "2025",
        runtime: "05:12",
        format: "DIGITAL · ONE ROOM",
        roles: ["DIRECTION", "CINEMATOGRAPHY", "SCRIPTWRITING"],

        logline:
            "One room, one afternoon, and a person waiting for a version of themselves that never quite arrives.",

        body: [
            "CHHAVI — the Hindi word for a shadow, and for a reflection — was an exercise in removing everything that was not necessary. One room. One performer. Two fixed camera positions. No cuts for the first two minutes.",
            "The subject does the same thing over and over, slightly differently each time, and the film is really about the gap between attempt and result. Every version of the gesture has a different shadow. That was the entire idea.",
            "I shot it in one afternoon with a single lens, and I cut it in a way that lets the room breathe. The sounds are the room itself — a fan, a wall, a distant road.",
        ],

        quote:
            "The shadow arrived first. The person followed a few seconds late.",

        credits: [
            { label: "WRITTEN & DIRECTED BY", value: "SHRAVANI PUJAR" },
            { label: "SHOT ON", value: "FUJIFILM X-T30 · 23MM FIXED" },
            { label: "EDITED BY", value: "SHRAVANI PUJAR" },
            { label: "SOUND", value: "ON-LOCATION / NO SCORE" },
            { label: "GRADE", value: "DESATURATED PRINT LOOK" },
            { label: "STATUS", value: "RELEASED" },
        ],

        video: {
            src: "/chhavi.mp4",
            sizeMb: 212,
            label: "FULL FILM · 1080P",
        },

        stills: [
            {
                src: "/images/hero-film.png",
                alt: "A figure held against a plain wall",
                ratio: "tall",
            },
            {
                src: "/images/sawaan-rain.png",
                alt: "Light falling across a wet surface",
                ratio: "wide",
            },
            {
                src: "/images/flamingos.png",
                alt: "A still horizon at dusk",
                ratio: "square",
            },
        ],
    },

    {
        number: "03",
        title: "KHO GAYE\nTUM KAHAN",
        slug: "kho-gaye-tum-kahan",
        image: "/images/hero-film.png",
        tag: "A story about memory",

        kind: "SHORT FILM",
        year: "2026",
        runtime: "11:30",
        format: "DIGITAL · IN DEVELOPMENT",
        roles: ["DIRECTION", "SCRIPTWRITING", "EDITING"],

        logline:
            "A woman returns to a house she grew up in and finds that memory has edited the rooms smaller than they were.",

        body: [
            "KHO GAYE TUM KAHAN — 'where did you get lost' — is a film about the unreliability of recall. It is built from a single afternoon of someone walking through a childhood home, and everything we see is the past disagreeing with her about it.",
            "The rooms change scale between cuts. Doors that were wide become narrow. A corridor that took ten seconds takes a minute. Nothing is dramatised; the unease comes entirely from architecture quietly lying.",
            "I have written and storyboarded the full film and shot the opening sequence. It is currently in post-production — the picture lock is scheduled and the grade and sound pass are underway.",
        ],

        quote:
            "The house remembered it bigger. She remembered it exactly.",

        credits: [
            { label: "WRITTEN & DIRECTED BY", value: "SHRAVANI PUJAR" },
            { label: "SHOT ON", value: "SONY A6400 · 24MM & 50MM" },
            { label: "EDITED BY", value: "SHRAVANI PUJAR" },
            { label: "SOUND", value: "DESIGN IN POST" },
            { label: "STATUS", value: "IN PRODUCTION" },
        ],

        video: null,

        stills: [
            {
                src: "/images/hero-film.png",
                alt: "An empty hallway, frame held wide",
                ratio: "wide",
            },
            {
                src: "/images/sawaan-rain.png",
                alt: "Rain against a dark window",
                ratio: "tall",
            },
            {
                src: "/images/flamingos.png",
                alt: "A distance shot at the end of the day",
                ratio: "square",
            },
        ],
    },

    {
        number: "04",
        title: "SHAAM JO\nBAAKI THI",
        slug: "shaam-jo-baaki-thi",
        image: "/images/sawaan-rain.png",
        tag: "Two lonely souls",

        kind: "SHORT FILM",
        year: "2026",
        runtime: "09:05",
        format: "DIGITAL · IN DEVELOPMENT",
        roles: ["DIRECTION", "CINEMATOGRAPHY", "SCRIPTWRITING"],

        logline:
            "Two people keep missing each other by minutes in the same empty city, and neither of them ever knows how close it was.",

        body: [
            "SHAAM JO BAAKI THI — 'the evening that was left over' — is about near-misses. Two characters move through the same city at the same hour, always in the same frame, and never in the same shot.",
            "The structure is a long one. They cross the same bus stop, the same stairwell, the same stretch of empty road, and every time the audience sees both of them in the same location the day is already ending.",
            "It is being shot over two evenings of golden hour and blue hour, and it is the film where I am most deliberately using colour — every shared location is graded to the exact same temperature, so the two timelines feel like one long evening seen twice.",
        ],

        quote:
            "They shared the whole city for a month and met for eleven seconds.",

        credits: [
            { label: "WRITTEN & DIRECTED BY", value: "SHRAVANI PUJAR" },
            { label: "SHOT ON", value: "SONY A6400 · 50MM & 85MM" },
            { label: "EDITED BY", value: "SHRAVANI PUJAR" },
            { label: "GRADE", value: "GOLDEN / BLUE HOUR MATCHING" },
            { label: "STATUS", value: "IN PRODUCTION" },
        ],

        video: null,

        stills: [
            {
                src: "/images/sawaan-rain.png",
                alt: "An empty road at the end of the day",
                ratio: "wide",
            },
            {
                src: "/images/flamingos.png",
                alt: "A figure small against the evening sky",
                ratio: "tall",
            },
            {
                src: "/images/hero-film.png",
                alt: "A street corner held in a long frame",
                ratio: "square",
            },
        ],
    },
];

export function getWork(slug: string): Work | undefined {
    return works.find((work) => work.slug === slug);
}

export function getAdjacentWorks(slug: string): {
    previous: Work | undefined;
    next: Work | undefined;
} {
    const index = works.findIndex((work) => work.slug === slug);

    if (index === -1) {
        return { previous: undefined, next: undefined };
    }

    return {
        previous: index === 0 ? undefined : works[index - 1],
        next: index === works.length - 1 ? undefined : works[index + 1],
    };
}
