'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import '@/app/film-intro.css'

const LEADERS = ['3', '2', '1']
const LEADER_STEP = 1250
const LEADER_AT = 900
const EXIT_AT = 12800
const EXIT_DUR = 950
const UNMOUNT_AT = EXIT_AT + EXIT_DUR
const TITLE_AT = 8
const CREDITS_AT = 10.8
const TITLE = ['SHRAVANI', 'PUJAR']
const CREDITS = [
  'A FILM BY SHRAVANI PUJAR',
  'DIRECTION · CINEMATOGRAPHY · EDITING',
]

function timecode(ms: number) {
  const frames = Math.floor((ms % 1000) / (1000 / 24))
  const seconds = Math.floor(ms / 1000) % 60
  const minutes = Math.floor(ms / 60000) % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`
}

export default function FilmIntro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)
  const [exiting, setExiting] = useState(false)
  const barRef = useRef<HTMLElement>(null)
  const codeRef = useRef<HTMLSpanElement>(null)
  const timers = useRef<number[]>([])
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  const finish = useCallback(() => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    setExiting(true)
    timers.current.push(
      window.setTimeout(() => doneRef.current(), EXIT_DUR),
    )
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doneRef.current()
      return
    }

    document.body.style.overflow = 'hidden'
    const start = performance.now()
    const at = (fn: () => void, delay: number) =>
      timers.current.push(window.setTimeout(fn, delay))

    LEADERS.forEach((_, i) => at(() => setStep(i), LEADER_AT + i * LEADER_STEP))
    at(() => setStep(-1), LEADER_AT + LEADERS.length * LEADER_STEP)
    at(() => setExiting(true), EXIT_AT)
    at(() => doneRef.current(), UNMOUNT_AT)

    let frame = 0
    const tick = () => {
      const elapsed = performance.now() - start
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${Math.min(1, elapsed / UNMOUNT_AT)})`
      }
      if (codeRef.current) codeRef.current.textContent = timecode(elapsed)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)

    return () => {
      timers.current.forEach(window.clearTimeout)
      timers.current = []
      cancelAnimationFrame(frame)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        finish()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [finish])

  return (
    <div className={`fi${exiting ? ' fi-out' : ''}`} role="dialog" aria-label="Shravani Pujar — digital filmmaker intro">
      <div className="fi-bg" aria-hidden="true" />
      <div className="fi-leader" aria-hidden="true">
        <div className="fi-field">
          <div className="fi-sweep" />
          <div className="fi-ring">
            <svg viewBox="0 0 100 100" >
              <circle cx="50" cy="50" r="48" />
              <circle cx="50" cy="50" r="30" />
              <line x1="0" y1="50" x2="100" y2="50" />
              <line x1="50" y1="0" x2="50" y2="100" />
              <line x1="44" y1="50" x2="56" y2="50" />
              <line x1="50" y1="44" x2="50" y2="56" />
            </svg>
          </div>
          <div className="fi-count">{step >= 0 && <span className="fi-num" key={step}>{LEADERS[step]}</span>}</div>
          {['tl', 'tr', 'bl', 'br'].map((corner) => (
            <span key={corner} className={`fi-corner fi-corner-${corner}`}>{step >= 0 ? LEADERS[step] : ''}</span>
          ))}
          <p className="fi-cue">PICTURE START</p>
        </div>
      </div>

      <div className="fi-iris" aria-hidden="true" />

      <div className="fi-frame" aria-hidden="true">
        <div className="fi-shot" />
        <div className="fi-shade" />
        <div className="fi-scratch fi-scratch-a" />
        <div className="fi-scratch fi-scratch-b" />
        <div className="fi-flicker" />
      </div>

      <div className="fi-caption">
        <p className="fi-pres">SHRAVANI PUJAR PRESENTS</p>
        <h1 className="fi-title">
          {TITLE.map((word, w) => (
            <span className={`fi-word${w === 1 ? ' fi-word-alt' : ''}`} key={word}>
              {Array.from(word).map((char, i) => (
                <span
                  className="fi-char"
                  key={`${word}-${i}`}
                  style={{ animationDelay: `${(TITLE_AT + w * 0.28 + i * 0.07).toFixed(2)}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>
        <span className="fi-rule" />
        <p className="fi-sub">DIGITAL FILMMAKER</p>
        <ul className="fi-credits">
          {CREDITS.map((credit, i) => (
            <li key={credit} style={{ animationDelay: `${(CREDITS_AT + i * 0.32).toFixed(2)}s` }}>{credit}</li>
          ))}
        </ul>
      </div>

      <i className="fi-bar fi-bar-top" aria-hidden="true" />
      <i className="fi-bar fi-bar-bottom" aria-hidden="true" />
      <div className="fi-flash" aria-hidden="true" />
      <div className="fi-grain" aria-hidden="true" />
      <div className="fi-vignette" aria-hidden="true" />

      <div className="fi-top-hud" aria-hidden="true">
        <span className="fi-rec">REC</span>
        <span className="fi-timecode" ref={codeRef}>00:00:00:00</span>
      </div>

      <div className="fi-hud">
        <span className="fi-slate">SHRAVANI PUJAR · 2026 · AHMEDABAD</span>
        <button type="button" className="fi-skip" onClick={finish}>SKIP INTRO <b>↗</b></button>
      </div>

      <div className="fi-progress" aria-hidden="true"><i ref={barRef} /></div>
    </div>
  )
}
