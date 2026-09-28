'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const works = [
  { number: '01', title: 'SAWAAN\nKA MAAH', slug: 'sawaan-ka-maah', image: '/images/sawaan-rain.png', tag: 'A poem of distance' },
  { number: '02', title: 'CHHAVI', slug: 'chhavi', image: '/images/hero-film.png', tag: 'An experiment in stillness' },
  { number: '03', title: 'KHO GAYE\nTUM KAHAN', slug: 'kho-gaye-tum-kahan', image: '/images/hero-film.png', tag: 'A story about memory' },
  { number: '04', title: 'SHAAM JO\nBAAKI THI', slug: 'shaam-jo-baaki-thi', image: '/images/sawaan-rain.png', tag: 'Two lonely souls' },
]

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
        <div className="hero-copy"><p className="eyebrow">MEET THE ARTIST</p><h1 className='font-black'>PORTFOLIO<br /></h1><p className="hero-note">Stories for people to see,<br />feel and remember.</p></div>
        <div className="hero-footer"><span>FILMMAKER / DIRECTOR / EDITOR / PHOTOGRAPHER</span><a href="#work">SCROLL TO EXPLORE <b>↓</b></a></div>
        <div className="frame-mark">01 <span>/</span> 07</div>
      </section>

      <section id="about" className="about section-pad"><p className="section-kicker">01 — ABOUT MYSELF</p><div className="about-grid"><h2>Turning simple ideas<br />into stories people can<br /><i>see, feel and remember.</i></h2><div className="about-body"><p>I&apos;m a Digital Filmmaking student who loves turning simple ideas into stories people can see, feel, and remember.</p><p>My journey has taken me through direction, cinematography, photography, editing, scriptwriting, and theatre — giving me a chance to understand storytelling from different perspectives.</p><p>For me, filmmaking isn&apos;t just about creating something that looks good. It&apos;s about creating something that makes people pause, feel something, or see an idea differently.</p><a href="#contact" className="text-link">MORE ABOUT ME <span>↗</span></a></div></div></section>

      <section className="showreel"><div className="showreel-image" /><div className="showreel-overlay"><p className="section-kicker">02 — SHOWREEL</p><h2>A GLIMPSE OF<br /><i>MY SHORT FILMS</i></h2><button>PLAY REEL <span>↗</span></button></div></section>

      <section id="work" className="works section-pad"><div className="works-head"><p className="section-kicker">03 — SELECTED WORKS</p><p className="muted">A collection of quiet moments,<br />human connection and memory.</p></div><div className="work-list">{works.map((work) => <Link className="work-row" href={`/work/${work.slug}`} key={work.slug}><span className="work-no">{work.number}</span><div className="work-title">{work.title.split('\n').map((line) => <span key={line}>{line}</span>)}<small>{work.tag}</small></div><div className="work-thumb"><img src={work.image} alt="" /></div><span className="arrow">↗</span></Link>)}</div></section>

      <section id="photography" className="photography section-pad"><div className="works-head"><p className="section-kicker">04 — PHOTOGRAPHY</p><p className="muted">Soft light. Gentle shadows.<br />A world observed with care.</p></div><div className="photo-grid"><figure className="photo-tall"><img src="/images/flamingos.png" alt="Flamingos standing in shallow water" /><figcaption>WILDLIFE PHOTOGRAPHY <span>01 / 03</span></figcaption></figure><div className="photo-list">{['HAND STITCHED GARMENT', 'SOFT GIRL ERA', 'PRODUCT PHOTOGRAPHY', 'PARTY THEMED PHOTOSHOOT', 'NAARI PHOTOSHOOT', 'VINTAGE PHOTOSHOOT'].map((item, index) => <button key={item} onMouseEnter={() => setActiveSkill(item)} className={activeSkill === item ? 'active' : ''}><span>{String(index + 1).padStart(2, '0')}</span>{item}<b>↗</b></button>)}</div></div></section>

      <section id="editing" className="editing"><p className="section-kicker">05 — EDITING</p><h2>THE CUT<br /><i>IS THE STORY.</i></h2><p>Shaping rhythm, silence and movement through the edit.</p></section>

      <section className="skills section-pad"><p className="section-kicker">06 — CREATIVE PRACTICE</p><div className="skills-list">{skills.map((skill, index) => <button key={skill} onMouseEnter={() => setActiveSkill(skill)} className={activeSkill === skill ? 'active' : ''}><span>0{index + 1}</span>{skill}<b>+</b></button>)}</div></section>

      <footer id="contact" className="contact"><p className="section-kicker">07 — GET IN TOUCH</p><h2>LET&apos;S TELL<br /><i>A STORY.</i></h2><a className="contact-link" href="mailto:shravanip.0924@gmail.com">shravanip.0924@gmail.com <span>↗</span></a><a className="phone" href="tel:+917016188878">+91 7016188878</a><div className="footer-bottom"><span>© 2024 SHRAVANI PUJAR</span><span>MADE WITH CURIOSITY</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </main>
  )
}
