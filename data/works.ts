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
    /** Comma separated for shared credits — rendered one per line when stacked. */
    value: string;
    /** Group credits stack each collaborator on its own line. */
    stacked?: boolean;
};

export type WorkStill = {
    src: string;
    alt: string;
    /** Intrinsic dimensions — keeps the still frame uncropped. */
    width: number;
    height: number;
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
        /** Local file size in MB. Omit for embedded sources like YouTube. */
        sizeMb?: number;
        label: string;
    } | null;

    stills: WorkStill[];
};

const REEL_STILLS: WorkStill[] = [
    {
        src: "/images/sawaan-rain.png",
        alt: "Rain falling through a dark frame",
        width: 1376,
        height: 768,
    },
    {
        src: "/images/hero-film.png",
        alt: "A still held on screen, mid shot",
        width: 1376,
        height: 768,
    },
    {
        src: "/images/flamingos.png",
        alt: "A quiet horizon at the end of the day",
        width: 1376,
        height: 768,
    },
];

export const works: Work[] = [
    {
        number: "01",
        title: "SAWAAN\nKA MAAH",
        slug: "sawaan-ka-maah",
        image: "/images/thumbnail/Sawaan-ka-maah.png",
        tag: "A poem of distance",

        kind: "SHORT FILM",
        year: "2025",
        runtime: "08:40",
        format: "DIGITAL · 16MM GRAIN",
        roles: ["DIRECTION", "CINEMATOGRAPHY", "EDITING"],

        logline:
            "A monsoon month measured in unanswered calls, wet windows, and the distance between two people who will not say it out loud.",

        body: [
            "The film explores the quiet ache of loving someone from a distance.",
            "Separated by borders, two people remain connected through the little things that remind them of each other — the sound of rain, a cup of tea, an empty chair, or a familiar breeze.",
            "As the monsoon unfolds, nature becomes their silent messenger, carrying unspoken emotions, memories, and longing across the distance.",
            "Through subtle moments and poetic imagery, the film captures a love that exists beyond physical presence, reminding us that sometimes, all it takes to feel close to someone is knowing that somewhere, Because sometimes, distance separates two people, but never the little things that keep bringing them back to each other",
        ],

        quote:
            "Across borders and beneath the same sky, some hearts never stop finding their way to each other",

        credits: [
            { label: "DIRECTED BY", value: "SHRAVANI PUJAR" },
            { label: "WRITTEN BY", value: "SHRAVANI PUJAR" },
            { label: "EDITED BY", value: "SHRAVANI PUJAR" },
        ],

        video: {
            src: "https://www.youtube.com/embed/fL-KGyDgo8A?si=TFYeb8nSGK0OmNYx",
            label: "FULL FILM · YOUTUBE",
        },

        stills: [
            {
                src: "/images/works/sawan/2.jpg",
                alt: "Rain falling through a dark frame",
                width: 1600,
                height: 899,
            },
            {
                src: "/images/works/sawan/1.jpg",
                alt: "A still held on screen, mid shot",
                width: 1600,
                height: 899,
            },
            {
                src: "/images/works/sawan/3.jpg",
                alt: "A quiet horizon at the end of the day",
                width: 1600,
                height: 787,
            },
        ]
    },

    {
        number: "02",
        title: "CHHAVI",
        slug: "chhavi",
        image: "/images/thumbnail/Chhavi.png",
        tag: "An experiment in stillness",

        kind: "SHORT FILM",
        year: "2025",
        runtime: "05:12",
        format: "DIGITAL · ONE ROOM",
        roles: ["DIRECTION", "CINEMATOGRAPHY", "SCRIPTWRITING"],

        logline:
            "One room, one afternoon, and a person waiting for a version of themselves that never quite arrives.",

        body: [
            "Chhavi is an experimental exploration of the relationship between stillness and movement, capturing the fleeting moments that often go unnoticed, a glance, a shadow, a passing gesture.",
            "Through abstract visuals, visual rhythms, and fragments of everyday life, the film reflects on the passage of time, the inevitability of change, and the way certain moments continue to live within our memories.",
            "Rather than following a conventional narrative, Film Chhavi creates a visual experience that invites the viewer to observe, feel, and interpret.",
            "At its heart, the film is a reflection on the fleeting nature of life and the beauty of moments that exist only briefly, yet leave a lasting impression.",
        ],

        quote:
            "In a world that never stands still, sometimes the most beautiful things are found in a moment of stillness",

        credits: [
            {
                label: "DIRECTED, WRITTEN & EDITED BY",
                value: "DIVYA BOOB, SIMRAN GAJJAR, URVI THANGOAKAR, TISA PATEL, SHRAVANI PUJAR",
                stacked: true,
            },
        ],
        video: {
            src: "https://www.youtube.com/embed/ephY-MPbJDE?si=l_lrtrnEVZ-a791J",
            label: "FULL FILM · YOUTUBE",
        },

        stills: [
            {
                src: "/images/works/chhavi/4.jpg",
                alt: "A figure held against a plain wall",
                width: 1600,
                height: 907,
            },
            {
                src: "/images/works/chhavi/1.jpg",
                alt: "Light falling across a wet surface",
                width: 1600,
                height: 900,
            },
            {
                src: "/images/works/chhavi/3.jpg",
                alt: "A still horizon at dusk",
                width: 1600,
                height: 903,
            },
            {
                src: "/images/works/chhavi/2.jpg",
                alt: "A still horizon at dusk",
                width: 1600,
                height: 926,
            },
        ],
    },

    {
        number: "03",
        title: "KHO GAYE\nTUM KAHAN",
        slug: "kho-gaye-tum-kahan",
        image: "/images/thumbnail/kho-gaye-tum-kaha.png",
        tag: "A story about memory",

        kind: "SHORT FILM",
        year: "2026",
        runtime: "11:30",
        format: "DIGITAL · IN DEVELOPMENT",
        roles: ["DIRECTION", "SCRIPTWRITING", "EDITING"],

        logline:
            "A woman returns to a house she grew up in and finds that memory has edited the rooms smaller than they were.",

        body: [
            "The film follows Nachiket and Barkha, a couple who share a simple, happy life built on love and companionship.",
            "Their world gradually begins to change when Barkha starts struggling with dementia, causing her to lose pieces of their shared memories.",
            "Through moments of tenderness, confusion, warmth, and pain, Nachiket remains by her side, patiently holding on to the life they have built together.",
            "However, as the story unfolds, the line between memory, imagination, and reality begins to blur.",
            "We are left to question whether Barkha is truly living with Nachiket or whether he is holding on to a life that ended years ago, after an accident took her away.",
            "At its heart, the film explores love, loss, memory, and the fragile ways we hold on to the people we cannot bear to forget.",
        ],

        quote:
            "When memories become fragments and reality becomes a blur, love is the one thing that refuses to disappear",

        credits: [
            { label: "DIRECTED BY", value: "SHRAVANI PUJAR" },
            { label: "WRITTEN BY", value: "SHRAVANI PUJAR" },
            { label: "EDITED BY", value: "SHRAVANI PUJAR" },
        ],

        video: {
            src: "https://www.youtube.com/embed/bewwuYtAark?si=jx9mx9U3C2EPyikd",
            label: "FULL FILM · YOUTUBE",
        },

        stills: [
            {
                src: "/images/works/kho/2.jpg",
                alt: "An empty hallway, frame held wide",
                width: 1600,
                height: 899,
            },
            {
                src: "/images/works/kho/1.jpg",
                alt: "Rain against a dark window",
                width: 1600,
                height: 896,
            },
            {
                src: "/images/works/kho/4.jpg",
                alt: "A distance shot at the end of the day",
                width: 1600,
                height: 899,
            },
            {
                src: "/images/works/kho/3.jpg",
                alt: "An empty hallway, frame held wide",
                width: 1600,
                height: 899,
            },
            {
                src: "/images/works/kho/5.jpg",
                alt: "Rain against a dark window",
                width: 1600,
                height: 899,
            },
            {
                src: "/images/works/kho/6.jpg",
                alt: "A distance shot at the end of the day",
                width: 1600,
                height: 899,
            },
        ],
    },

    {
        number: "04",
        title: "SHAAM JO\nBAAKI THI",
        slug: "shaam-jo-baaki-thi",
        image: "/images/thumbnail/shaam-jo-baki-thi.jpeg",
        tag: "Two lonely souls",

        kind: "SHORT FILM",
        year: "2026",
        runtime: "09:05",
        format: "DIGITAL · IN DEVELOPMENT",
        roles: ["DIRECTION", "CINEMATOGRAPHY", "SCRIPTWRITING"],

        logline:
            "Two people keep missing each other by minutes in the same empty city, and neither of them ever knows how close it was.",

        body: [
            "this film follows Nikhil and Vani, two individuals who, despite their different lives and quiet loneliness, find an unexpected sense of comfort in each other's presence.",
            "Their connection unfolds gradually through everyday conversations, shared routines, familiar silences, and small gestures of warmth.",
            "Set against the streets, monsoon evenings, and familiar corners of Ahmedabad, the city becomes more than just a backdrop, quietly reflecting the emotions and moments that shape their journey.",
            "Through an understated and intimate narrative, the film explores the transient nature of human connections, the beauty of unexpected companionship, and how even a brief presence in someone's life can leave behind something that time cannot easily erase.",
        ],

        quote:
            "Across borders and beneath the same sky, some hearts never stop finding their way to each other ",
        // "Zindagi mein kuch rishte naam nahi maangte, bas kuch pal aur thodi si jagah",

        credits: [
            { label: "DIRECTED BY", value: "SHRAVANI PUJAR" },
            { label: "WRITTEN BY", value: "SHRAVANI PUJAR" },
            { label: "EDITED BY", value: "SHRAVANI PUJAR" },
        ],
        video: null,

        stills: [
            {
                src: "/images/works/shaam/4.jpg",
                alt: "An empty road at the end of the day",
                width: 1179,
                height: 729,
            },
            {
                src: "/images/works/shaam/1.jpg",
                alt: "Rain against a dark window",
                width: 1316,
                height: 728,
            },
            {
                src: "/images/works/shaam/3.jpg",
                alt: "Rain against a dark window",
                width: 402,
                height: 226,
            },
            {
                src: "/images/works/shaam/2.jpg",
                alt: "Rain against a dark window",
                width: 1302,
                height: 727,
            },
            // {
            //     src: "/images/works/kho/6.jpg",
            //     alt: "A distance shot at the end of the day",
            //     ratio: "wide",
            // },
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
