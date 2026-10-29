'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import FilmIntro from '@/components/film-intro'
import PhotoCollection from '@/components/photo-collection'
import { photographyPhotographs, wildlifePhotographs } from '@/data/galleries'
import { works } from '@/data/works'
import AboutMyself from './About'

function ShowReel() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
          className="group flex items-center gap-3 "
        >
          <span className='text-[15px]'>PLAY REEL</span>

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
              src="/showreel.mp4"
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

function ScrollProgress() {
  const barRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <i ref={barRef} />
    </div>
  )
}

const skills = ['DIRECTION', 'CINEMATOGRAPHY', 'PHOTOGRAPHY', 'EDITING', 'SCRIPTWRITING', 'THEATRE']

const ENABLE_FILM_INTRO = true
const INTRO_SESSION_KEY = 'sp-film-intro-seen'

function currentDocumentId() {
  const store = window as Window & { __spFilmIntroDoc?: string }
  if (!store.__spFilmIntroDoc) {
    store.__spFilmIntroDoc = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
  return store.__spFilmIntroDoc
}

export default function Page() {
  const [intro, setIntro] = useState(ENABLE_FILM_INTRO)
  const [menu, setMenu] = useState(false)
  const [activeSkill, setActiveSkill] = useState('DIRECTION')

  const endIntro = useCallback(() => {
    setIntro(false)
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, currentDocumentId())
    } catch {
      /* sessionStorage can be unavailable (private mode); the intro still closes. */
    }
  }, [])

  useLayoutEffect(() => {
    if (!ENABLE_FILM_INTRO) {
      setIntro(false)
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIntro(false)
      return
    }

    try {
      /* sessionStorage survives soft navigation (works -> home), while the
         in-page document id is regenerated on reload/new tab. Comparing them
         means the intro plays on the first visit and on every hard reload,
         but never again on client-side navigation back to home. */
      const seen = window.sessionStorage.getItem(INTRO_SESSION_KEY)
      setIntro(seen !== currentDocumentId())
    } catch {
      setIntro(true)
    }
  }, [])

  return (
    <main className="portfolio-shell">
      <ScrollProgress />
      {intro && <FilmIntro onDone={endIntro} />}

      <header className="site-nav">
        <Link href="#top" className="wordmark">SHRAVANI PUJAR</Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="#work">WORK</Link><Link href="#about">ABOUT</Link><Link href="#photography">PHOTOGRAPHY</Link><Link href="#wildlife">WILDLIFE</Link><Link href="#contact">CONTACT</Link>
        </nav>
        <button className="menu-button" onClick={() => setMenu(true)} aria-label="Open menu">MENU <span>↗</span></button>
      </header>

      {menu && <div className="menu-overlay"><button className="close-button" onClick={() => setMenu(false)} aria-label="Close menu">CLOSE <span>×</span></button><div className="menu-links">{['WORK', 'ABOUT', 'PHOTOGRAPHY', 'WILDLIFE', 'EDITING', 'CONTACT'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenu(false)}>{item}<em>↗</em></a>)}</div><p>Digital filmmaker / visual artist<br />Ahmedabad, India</p></div>}

      <section id="top" className={`hero${intro ? '' : ' is-revealed'}`}>
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow !text-[#e8dece] italic font-['Playfair_Display',serif] !font-normal !text-[18px] !tracking-[0.18em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">MEET THE ARTIST</p>

          <h1 className="!font-black text-white text-6xl md:text-8xl leading-none transform scale-80 md:scale-100 origin-left">

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
            Some stories aren't told in words,
            <br />
            but in the moments we choose to capture
          </p>
        </div>
        {/* <div className="hero-copy"><p className="eyebrow">MEET THE ARTIST</p><h1 className='!font-black'>PORTFOLIO<br /></h1><p className="hero-note">Stories for people to see,<br />feel and remember.</p></div> */}
        <div className="hero-footer"><span>FILMMAKER / DIRECTOR / EDITOR / PHOTOGRAPHER</span><a href="#work">SCROLL TO EXPLORE <b>↓</b></a></div>
        {/* <div className="frame-mark">01 <span>/</span> 07</div> */}
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
                href="#work"
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

          <AboutMyself />
        </div>
      </section>

      <ShowReel />


      <section id="work" className="works section-pad">
        {/* Header */}
        <div className="works-head">
          <p className="section-kicker font-bold !text-[0.8rem]">WORKS</p>

          <p className="muted font-[900] !text-[0.8rem]">
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

      <section id="photography" className="photography section-pad">
        {/* Header */}
        <div className="works-head">
          <p className="section-kicker font-[900] !text-[0.8rem]">PHOTOGRAPHY &amp; WILDLIFE</p>

          <p className="muted font-[900] !text-[0.8rem]">
            Soft light. Gentle shadows.
            <br />
            A world observed with care.
          </p>
        </div>

        {/* Photography & Wildlife Galleries */}
        <div className="mt-14 space-y-24 lg:mt-[70px] lg:space-y-32">
          <PhotoCollection
            id="photography-gallery"
            index="01"
            label="PHOTOGRAPHY"
            title="Moments"
            italic="observed"
            description="A collection of portraits, details, textures and quiet visual stories — captured through light, atmosphere and observation."
            photographs={photographyPhotographs}
          />

          <PhotoCollection
            id="wildlife"
            index="02"
            label="WILDLIFE"
            title="Wild"
            italic="instinct"
            description="Quiet encounters, fleeting movement and moments found beyond the frame — a study of nature in its rawest, most honest form."
            photographs={wildlifePhotographs}
          />
        </div>

      </section>
      {/* <section id="editing" className="editing"><p className="section-kicker">05 — EDITING</p><h2>THE CUT<br /><i>IS THE STORY.</i></h2><p>Shaping rhythm, silence and movement through the edit.</p></section> */}

      {/* <section className="skills section-pad"><p className="section-kicker">06 — CREATIVE PRACTICE</p><div className="skills-list">{skills.map((skill, index) => <button key={skill} onMouseEnter={() => setActiveSkill(skill)} className={activeSkill === skill ? 'active' : ''}><span>0{index + 1}</span>{skill}<b>+</b></button>)}</div></section> */}

      <footer id="contact" className="contact"><p className="section-kicker"> GET IN TOUCH</p>
        <h2>LET &apos; S TELL<br /><i>A STORY.</i></h2><a className="contact-link" href="mailto:shravanip.0924@gmail.com">shravanip.0924@gmail.com <span>↗</span></a><a className="phone" href="tel:+917016188878">+91 7016188878</a><div className="footer-bottom"><span>© 2026 SHRAVANI PUJAR</span><span>MADE WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </main>
  )
}