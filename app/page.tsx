'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const works = [
  { number: '01', title: 'SAWAAN\nKA MAAH', slug: 'sawaan-ka-maah', image: '/images/sawaan-rain.png', tag: 'A poem of distance' },
  { number: '02', title: 'CHHAVI', slug: 'chhavi', image: '/images/hero-film.png', tag: 'An experiment in stillness' },
  { number: '03', title: 'KHO GAYE\nTUM KAHAN', slug: 'kho-gaye-tum-kahan', image: '/images/hero-film.png', tag: 'A story about memory' },
  { number: '04', title: 'SHAAM JO\nBAAKI THI', slug: 'shaam-jo-baaki-thi', image: '/images/sawaan-rain.png', tag: 'Two lonely souls' },
]
function ShowReel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      videoRef.current?.play().catch(() => { });
    }, 800);

    return () => clearTimeout(timer);
  }, [isPlaying]);

  const closeVideo = () => {
    videoRef.current?.pause();

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }

    setIsPlaying(false);
  };

  return (
    <section className="showreel relative overflow-hidden">
      {/* Background */}
      <div className="showreel-image" />

      {/* Content */}
      <div className="showreel-overlay">
        <h2>
          SHOW REEL
          <br />
        </h2>

        <div className="mb-6 mt-6 flex items-center gap-4">
          <span className="h-px w-10 bg-white/50" />

          <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-white/80 sm:text-xs md:text-sm">
            A GLIMPSE OF MY SHORT FILMS
          </p>

          <span className="h-px w-10 bg-white/50" />
        </div>

        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group flex items-center gap-3"
        >
          <span>PLAY REEL</span>

          <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
            ↗
          </span>
        </button>
      </div>

      {/* Video */}
      {isPlaying && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in sm:p-8">
          <div className="relative w-full max-w-5xl scale-95 opacity-0 animate-video-in">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeVideo}
              aria-label="Close video"
              className="absolute right-3 top-3 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/80 text-2xl leading-none text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black"
            >
              ×
            </button>

            {/* Video */}
            <video
              ref={videoRef}
              src="/reel.mp4"
              controls
              playsInline
              preload="metadata"
              className="max-h-[85vh] w-full object-contain"
            />
          </div>
        </div>
      )}

      <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                    }

                    to {
                        opacity: 1;
                    }
                }

                @keyframes video-in {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }

                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 800ms ease-out forwards;
                }

                .animate-video-in {
                    animation: video-in 800ms ease-out 100ms forwards;
                }
            `}</style>
    </section>
  );
}
// function ShowReel() {
//     const [isPlaying, setIsPlaying] = useState(false);
//     const videoRef = useRef(null);

//     useEffect(() => {
//         if (!isPlaying) return;

//         const timer = setTimeout(() => {
//             videoRef.current?.play();
//         }, 700);

//         return () => clearTimeout(timer);
//     }, [isPlaying]);

//     return (
//         <section className="showreel relative overflow-hidden">
//             <div className="showreel-image" />

//             <div className="showreel-overlay">
//                 <h2>
//                     SHOW REEL
//                     <br />
//                 </h2>

//                 <div className="mb-6 mt-6 flex items-center gap-4">
//                     <span className="h-px w-10 bg-white/50" />

//                     <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-white/80 sm:text-xs md:text-sm">
//                         A GLIMPSE OF MY SHORT FILMS
//                     </p>

//                     <span className="h-px w-10 bg-white/50" />
//                 </div>

//                 <button
//                     onClick={() => setIsPlaying(true)}
//                     className="group flex items-center gap-3"
//                 >
//                     PLAY REEL
//                     <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
//                         ↗
//                     </span>
//                 </button>
//             </div>

//             {isPlaying && (
//                 <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/90 p-6 animate-[fadeIn_700ms_ease-out_forwards]">
//                     <div className="relative w-full max-w-5xl opacity-0 scale-[0.96] animate-[videoReveal_700ms_ease-out_100ms_forwards]">
//                         <button
//                             onClick={() => {
//                                 videoRef.current?.pause();
//                                 setIsPlaying(false);
//                             }}
//                             className="absolute -right-2 -top-12 z-30 text-2xl text-white opacity-70 transition-opacity hover:opacity-100"
//                         >
//                             ✕
//                         </button>

//                         <video
//                             ref={videoRef}
//                             src="/reel.mp4"
//                             controls
//                             playsInline
//                             className="max-h-[80vh] w-full object-contain"
//                         />
//                     </div>
//                 </div>
//             )}

//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from {
//                         opacity: 0;
//                     }
//                     to {
//                         opacity: 1;
//                     }
//                 }

//                 @keyframes videoReveal {
//                     from {
//                         opacity: 0;
//                         transform: scale(0.96);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: scale(1);
//                     }
//                 }
//             `}</style>
//         </section>
//     );
// }

const skills = ['DIRECTION', 'CINEMATOGRAPHY', 'PHOTOGRAPHY', 'EDITING', 'SCRIPTWRITING', 'THEATRE']

export default function Page() {
  const [intro, setIntro] = useState(true)
  const [menu, setMenu] = useState(false)
  const [activeSkill, setActiveSkill] = useState('DIRECTION')

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 2100)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main className="portfolio-shell">
      {intro && <div className="intro" aria-label="Entering Shravani Pujar portfolio"><span>SHRAVANI PUJAR</span><small>DIGITAL FILMMAKER</small><i /></div>}

      <header className="site-nav">
        <Link href="#top" className="wordmark">SHRAVANI PUJAR</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="#work">WORK</Link><Link href="#about">ABOUT</Link><Link href="#photography">PHOTOGRAPHY</Link><Link href="#contact">CONTACT</Link>
        </nav>
        <button className="menu-button" onClick={() => setMenu(true)} aria-label="Open menu">MENU <span>↗</span></button>
      </header>

      {menu && <div className="menu-overlay"><button className="close-button" onClick={() => setMenu(false)} aria-label="Close menu">CLOSE <span>×</span></button><div className="menu-links">{['WORK', 'ABOUT', 'PHOTOGRAPHY', 'EDITING', 'CONTACT'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}<em>↗</em></a>)}</div><p>Digital filmmaker / visual artist<br />Ahmedabad, India</p></div>}

      <section id="top" className="hero">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">MEET THE ARTIST</p>

          <h1 className="!font-black text-white text-6xl md:text-8xl leading-none">
            <span>PO</span>
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "2px white",
              }}
            >
              RTFO
            </span>
            <span>LIO</span>
          </h1>

          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-10 bg-white/50" />

            <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.4em] font-medium text-white/80">
              Digital Filmmaker
            </p>

            <span className="h-px w-10 bg-white/50" />
          </div>
          <p className="hero-note">
            Stories for people to see,
            <br />
            feel and remember.
          </p>
        </div>
        {/* <div className="hero-copy"><p className="eyebrow">MEET THE ARTIST</p><h1 className='!font-black'>PORTFOLIO<br /></h1><p className="hero-note">Stories for people to see,<br />feel and remember.</p></div> */}
        <div className="hero-footer"><span>FILMMAKER / DIRECTOR / EDITOR / PHOTOGRAPHER</span><a href="#work">SCROLL TO EXPLORE <b>↓</b></a></div>
        <div className="frame-mark">01 <span>/</span> 07</div>
      </section>

      <section
        id="about"
        className="min-h-screen bg-black px-6 py-16 text-white md:px-10 lg:px-16"
      >
        <div className="mx-auto max-w-7xl">
          {/* Top Navigation / Tabs */}
          <div className="mb-14 flex justify-center">
            <div className="flex items-center gap-8 text-[11px] font-medium tracking-[0.15em] text-gray-500">
              <a
                href="#about"
                className="rounded-full bg-white px-5 py-2 text-black"
              >
                ABOUT
              </a>

              <a
                href="#works"
                className="transition-colors hover:text-white"
              >
                WORKS
              </a>

              <a
                href="#contact"
                className="transition-colors hover:text-white"
              >
                CONTACT
              </a>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid min-h-[650px] grid-cols-1 gap-14 lg:grid-cols-[380px_1fr] lg:gap-20">

            {/* ================= LEFT SIDE ================= */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-2 text-sm font-medium tracking-[0.12em] text-gray-400">
                  HELLO, I AM
                </p>

                <h1 className="text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
                  SHRAVANI PUJAR
                </h1>
              </div>

              {/* Profile Image */}
              <div className="relative mt-10 flex flex-1 items-end justify-center overflow-hidden">
                {/* Blue glow behind person */}
                <div className="absolute bottom-10 left-1/2 h-[420px] w-[280px] -translate-x-1/2 rounded-full bg-blue-600/30 blur-[90px]" />

                <img
                  src="/profile-pic.jpeg"
                  alt="SHRAVANI PUJAR 12S"
                  className="relative z-10 max-h-[500px] w-auto object-contain object-bottom"
                />
              </div>
            </div>

            {/* ================= RIGHT SIDE ================= */}
            <div className="pt-2">

              {/* ABOUT ME */}
              <div>
                <h2 className="mb-5 text-3xl font-bold uppercase tracking-tight">
                  ABOUT ME
                </h2>

                <p className="max-w-3xl text-[13px] leading-[1.65] text-gray-400 sm:text-sm">
                  HI, I&apos;M SHRAVANI PUJAR. I&apos;M A DIGITAL FILMMAKING
                  STUDENT WHO LOVES TURNING SIMPLE IDEAS INTO STORIES THAT PEOPLE
                  CAN SEE, FEEL, AND REMEMBER. MY JOURNEY HAS TAKEN ME THROUGH
                  DIRECTION, CINEMATOGRAPHY, PHOTOGRAPHY, EDITING, SCRIPTWRITING,
                  AND THEATRE — GIVING ME A CHANCE TO UNDERSTAND STORYTELLING FROM
                  DIFFERENT PERSPECTIVES.
                </p>
              </div>

              {/* SOFTWARE SKILLS */}
              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight">
                  SOFTWARE SKILLS
                </h2>

                <div className="flex flex-wrap gap-4">
                  {/* Photoshop */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#0877bd] text-xl font-bold text-white">
                    P
                  </div>

                  {/* Photoshop */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#001e36] text-lg font-bold text-[#31a8ff]">
                    Ps
                  </div>

                  {/* Lightroom */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#071e3d] text-lg font-bold text-[#31a8ff]">
                    Lr
                  </div>

                  {/* CapCut */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-2xl font-black text-black">
                    ⌁
                  </div>

                  {/* Mongo / other software */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white text-2xl">
                    🟢
                  </div>

                  {/* Canva / Premiere style */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-cyan-400 text-xl font-bold">
                    P
                  </div>
                </div>
              </div>

              {/* EDUCATION + EXPERIENCE */}
              <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2">

                {/* Education */}
                <div>
                  <h3 className="mb-4 text-xl font-bold uppercase">
                    EDUCATION
                  </h3>

                  <div className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />

                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        2019 — 2022
                      </p>

                      <p className="mt-1 text-sm font-medium uppercase leading-5 text-white">
                        SMAN 2 MALANG / MULTIMEDIA
                        <br />
                        Natural Science
                      </p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="mb-4 text-xl font-bold uppercase">
                    EXPERIENCE
                  </h3>

                  <div>
                    <p className="text-sm font-semibold uppercase text-white">
                      TIKTOK CONTENT
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-400">
                      Civil Campaign &amp; Creative Content
                    </p>

                    <p className="text-xs leading-5 text-gray-500">
                      Content creation &amp; content revision
                    </p>
                  </div>
                </div>
              </div>

              {/* LANGUAGE */}
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold uppercase">
                  LANGUAGE / COMMUNICATION
                </h3>

                <div className="grid max-w-md grid-cols-2 gap-y-2 text-xs uppercase">
                  <span className="text-gray-300">INDONESIA</span>
                  <span className="text-gray-400">90%</span>

                  <span className="text-gray-300">JAVA</span>
                  <span className="text-gray-400">100%</span>

                  <span className="text-gray-300">ENGLISH</span>
                  <span className="text-gray-400">70%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="about" className="about section-pad"><p className="section-kicker">01 — ABOUT MYSELF</p><div className="about-grid"><h2>Turning simple ideas<br />into stories people can<br /><i>see, feel and remember.</i></h2><div className="about-body"><p>I&apos;m a Digital Filmmaking student who loves turning simple ideas into stories people can see, feel, and remember.</p><p>My journey has taken me through direction, cinematography, photography, editing, scriptwriting, and theatre — giving me a chance to understand storytelling from different perspectives.</p><p>For me, filmmaking isn&apos;t just about creating something that looks good. It&apos;s about creating something that makes people pause, feel something, or see an idea differently.</p><a href="#contact" className="text-link">MORE ABOUT ME <span>↗</span></a></div></div></section> */}

      <ShowReel />
      {/* <section className="showreel"><div className="showreel-image" /><div className="showreel-overlay">
                <h2>SHOW REEL<br /></h2>
                <div className="mb-6 mt-6 flex items-center gap-4">
                    <span className="h-px w-10 bg-white/50" />

                    <p className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.4em] font-medium text-white/80">
                        A GLIMPSE OF MY SHORT FILMS
                    </p>

                    <span className="h-px w-10 bg-white/50" />
                </div>
                <button>PLAY REEL <span>↗</span></button></div>
            </section> */}


      {/* <section id="work" className="works section-pad"><div className="works-head"><p className="section-kicker">03 — SELECTED WORKS</p><p className="muted">A collection of quiet moments,<br />human connection and memory.</p></div><div className="work-list">{works.map((work) => <Link className="work-row" href={`/work/${work.slug}`} key={work.slug}><span className="work-no">{work.number}</span><div className="work-title">{work.title.split('\n').map((line) => <span key={line}>{line}</span>)}<small>{work.tag}</small></div><div className="work-thumb"><img src={work.image} alt="" /></div><span className="arrow">↗</span></Link>)}</div></section> */}

      <section id="work" className="works section-pad">
        {/* Header */}
        <div className="works-head">
          <p className="section-kicker">03 — SELECTED WORKS</p>

          <p className="muted">
            A collection of quiet moments,
            <br />
            human connection and memory.
          </p>
        </div>

        {/* Works Grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-[70px] lg:grid-cols-12 lg:gap-5">
          {works.map((work, index) => (
            <Link
              key={work.slug}
              href={`/work/${work.slug}`}
              className={`
          group relative block overflow-hidden
          ${index === 0 ? "lg:col-span-7" : ""}
          ${index === 1 ? "lg:col-span-5" : ""}
          ${index === 2 ? "lg:col-span-5" : ""}
          ${index === 3 ? "lg:col-span-7" : ""}
          ${index === 4 ? "lg:col-span-7" : ""}
          ${index === 5 ? "lg:col-span-5" : ""}
        `}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black lg:aspect-[16/10]">
                <img
                  src={work.image}
                  alt={work.title.replace(/\n/g, " ")}
                  className="
              absolute inset-0 h-full w-full object-cover
              scale-100
              transition-all duration-1000
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:scale-[1.07]
              group-hover:saturate-[0.85]
            "
                />

                {/* Cinematic Overlay */}
                <div
                  className="
              absolute inset-0
              bg-gradient-to-t
              from-black/80
              via-black/20
              to-black/5
              opacity-0
              transition-opacity duration-700
              group-hover:opacity-100
              max-sm:opacity-60
            "
                />

                {/* Number */}
                <span
                  className="
              absolute left-5 top-5
              text-[10px] tracking-[0.12em]
              text-white/80
              opacity-0
              -translate-y-2
              transition-all duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
              max-sm:opacity-100
              max-sm:translate-y-0
            "
                >
                  {work.number}
                </span>

                {/* Arrow */}
                <span
                  className="
              absolute right-5 top-5
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-white/50
              text-lg text-white
              opacity-0
              translate-x-[-8px]
              translate-y-[8px]
              rotate-[-20deg]
              transition-all duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:translate-x-0
              group-hover:translate-y-0
              group-hover:rotate-0
              group-hover:opacity-100
              group-hover:bg-white/10
              max-sm:h-9
              max-sm:w-9
              max-sm:opacity-100
              max-sm:translate-x-0
              max-sm:translate-y-0
              max-sm:rotate-0
            "
                >
                  ↗
                </span>

                {/* Project Details */}
                <div
                  className="
              absolute bottom-6 left-6 right-6
              translate-y-8
              opacity-0
              transition-all duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
              group-hover:translate-y-0
              group-hover:opacity-100
              max-sm:translate-y-0
              max-sm:opacity-100
            "
                >
                  {/* Tag */}
                  <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-white/70">
                    {work.tag}
                  </p>

                  {/* Title */}
                  <h3
                    className="
                text-[28px]
                font-medium
                leading-[0.95]
                tracking-[-0.04em]
                text-white
                sm:text-[30px]
                lg:text-[clamp(25px,3vw,48px)]
              "
                  >
                    {work.title.split("\n").map((line, i) => (
                      <span
                        key={`${work.slug}-${i}`}
                        className="block"
                      >
                        {line}
                      </span>
                    ))}
                  </h3>

                  {/* View Project */}
                  <span
                    className="
                mt-4
                inline-block
                border-b border-white/60
                pb-1
                text-[9px]
                tracking-[0.18em]
                text-white
              "
                  >
                    VIEW PROJECT
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section id="photography" className="photography section-pad"><div className="works-head"><p className="section-kicker">04 — PHOTOGRAPHY</p><p className="muted">Soft light. Gentle shadows.<br />A world observed with care.</p></div><div className="photo-grid"><figure className="photo-tall"><img src="/images/flamingos.png" alt="Flamingos standing in shallow water" /><figcaption>WILDLIFE PHOTOGRAPHY <span>01 / 03</span></figcaption></figure><div className="photo-list">{['HAND STITCHED GARMENT', 'SOFT GIRL ERA', 'PRODUCT PHOTOGRAPHY', 'PARTY THEMED PHOTOSHOOT', 'NAARI PHOTOSHOOT', 'VINTAGE PHOTOSHOOT'].map((item, index) => <button key={item} onMouseEnter={() => setActiveSkill(item)} className={activeSkill === item ? 'active' : ''}><span>{String(index + 1).padStart(2, '0')}</span>{item}<b>↗</b></button>)}</div></div></section>

      <section id="editing" className="editing"><p className="section-kicker">05 — EDITING</p><h2>THE CUT<br /><i>IS THE STORY.</i></h2><p>Shaping rhythm, silence and movement through the edit.</p></section>

      <section className="skills section-pad"><p className="section-kicker">06 — CREATIVE PRACTICE</p><div className="skills-list">{skills.map((skill, index) => <button key={skill} onMouseEnter={() => setActiveSkill(skill)} className={activeSkill === skill ? 'active' : ''}><span>0{index + 1}</span>{skill}<b>+</b></button>)}</div></section>

      <footer id="contact" className="contact"><p className="section-kicker">07 — GET IN TOUCH</p><h2>LET&apos;S TELL<br /><i>A STORY.</i></h2><a className="contact-link" href="mailto:shravanip.0924@gmail.com">shravanip.0924@gmail.com <span>↗</span></a><a className="phone" href="tel:+917016188878">+91 7016188878</a><div className="footer-bottom"><span>© 2024 SHRAVANI PUJAR</span><span>MADE WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </main>
  )
}