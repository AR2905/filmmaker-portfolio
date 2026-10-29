'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createCountdownAudio, type CountdownAudio } from '@/lib/countdown-audio'
import '@/app/film-intro.css'

const LEADERS = ['3', '2', '1']
/* One second per count — the rhythm of a real academy leader. The last number
   then holds for 1.75s before the picture cuts in. */
const LEADER_STEP = 1000
const LEADER_AT = 900
const LEADER_END = 4650

const SCREEN_DUR = 14000
const EXIT_AT = LEADER_END + SCREEN_DUR
const EXIT_DUR = 950
const TITLE_AT = 8.6
const CREDITS_AT = 13.4
const INTRO_AUDIO = '/intro.mp3'
const INTRO_AUDIO_LEVEL = 0.75
const SILENT_UNLOCK =
  'data:audio/wav;base64,UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA=='
const TITLE = ['SHRAVANI', 'PUJAR']
const CREDITS = [
  // 'A FILM BY SHRAVANI PUJAR',
  'DIRECTION · CINEMATOGRAPHY · EDITING',
]
const UNMOUNT_AT = EXIT_AT + EXIT_DUR
/* Music fades out smoothly, finishing right as the intro unmounts. */
const FADE_OUT_DUR = 3000
const FADE_OUT_AT = UNMOUNT_AT - FADE_OUT_DUR

function timecode(ms: number) {
  const frames = Math.floor((ms % 1000) / (1000 / 24))
  const seconds = Math.floor(ms / 1000) % 60
  const minutes = Math.floor(ms / 60000) % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`
}

export default function FilmIntro({ onDone }: { onDone: () => void }) {
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(-1)
  const [exiting, setExiting] = useState(false)
  const [needsSound, setNeedsSound] = useState(false)
  const barRef = useRef<HTMLElement>(null)
  const codeRef = useRef<HTMLSpanElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const startedRef = useRef(false)
  const soundingRef = useRef(false)
  const startingRef = useRef(false)
  const primedRef = useRef(false)
  const waitingRef = useRef(true)
  const resumeRef = useRef<() => void>(() => { })
  const fadeRef = useRef(0)

  const countdownRef = useRef<CountdownAudio | null>(null)
  const timers = useRef<number[]>([])
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  const fadeOutAudio = useCallback((duration: number) => {
    const audio = audioRef.current
    if (!audio || audio.paused) return
    cancelAnimationFrame(fadeRef.current)

    const from = audio.volume
    let t0 = 0
    const step = (time: number) => {
      if (!t0) t0 = time
      const p = Math.min(1, (time - t0) / duration)
      /* Equal-power curve: sounds even and natural, no sudden drop at the end. */
      audio.volume = Math.max(0, from * Math.cos((p * Math.PI) / 2))
      if (p < 1) fadeRef.current = requestAnimationFrame(step)
      else audio.pause()
    }
    fadeRef.current = requestAnimationFrame(step)
  }, [])


  const begin = useCallback(() => {
    if (startedRef.current) return
    startedRef.current = true

    /* The countdown kit is created inside this gesture so the AudioContext
       starts unlocked and can fire ticks later from the timeline. */
    const countdown = createCountdownAudio()
    if (countdown) {
      countdownRef.current = countdown
      void countdown.resume().then(() => countdown.startReel())
    }

    /* Must happen inside the click/keypress: iOS and Chrome only allow the
       later timed playback once the page has been unlocked by a gesture. */
    try {
      const unlock = new Audio(SILENT_UNLOCK)
      const played = unlock.play()
      if (played) {
        played
          .then(() => unlock.pause())
          .catch(() => { })
      }
    } catch {
      /* The intro audio's own play attempt and prompt remain as fallbacks. */
    }

    const audio = audioRef.current
    if (audio) {
      audio.muted = true
      const primed = audio.play()
      if (primed) {
        primed
          .then(() => {
            if (soundingRef.current || startingRef.current) return
            audio.pause()
            audio.currentTime = 0
            audio.muted = false
          })
          .catch(() => {
            audio.muted = false
          })
      }
    }

    setStarted(true)
  }, [])

  // const finish = useCallback(() => {
  //   timers.current.forEach(window.clearTimeout)
  //   timers.current = []
  //   waitingRef.current = false
  //   const audio = audioRef.current
  //   if (audio) {
  //     audio.pause()
  //     audio.currentTime = 0
  //   }
  //   setExiting(true)
  //   timers.current.push(
  //     window.setTimeout(() => doneRef.current(), EXIT_DUR),
  //   )
  // }, [])

  const finish = useCallback(() => {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    waitingRef.current = false
    fadeOutAudio(EXIT_DUR) // was: audio.pause(); audio.currentTime = 0
    setExiting(true)
    timers.current.push(
      window.setTimeout(() => doneRef.current(), EXIT_DUR),
    )
  }, [fadeOutAudio])
  /* Preload and lock the page as soon as the intro mounts, while the sound
     prompt is still on screen. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      doneRef.current()
      return
    }

    document.body.style.overflow = 'hidden'
    const audio = audioRef.current
    if (audio) {
      audio.preload = 'auto'
      audio.load()
    }
    return () => {
      document.body.style.overflow = ''
      countdownRef.current?.dispose()
      countdownRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!started) return

    const start = performance.now()
    const at = (fn: () => void, delay: number) =>
      timers.current.push(window.setTimeout(fn, delay))

    /* The leader plays silent. The track starts loading the moment the intro
       mounts — before the 3 / 2 / 1 — so it is buffered by the time the
       numbers clear. It lives in the DOM so mobile browsers honour preload. */
    const audio = audioRef.current
    if (!audio) {
      doneRef.current()
      return
    }
    audio.muted = false
    audio.volume = INTRO_AUDIO_LEVEL

    const finishSound = () => {
      startingRef.current = false
      soundingRef.current = true
      waitingRef.current = false
      setNeedsSound(false)
    }

    const sound = (offset: number) => {
      if (soundingRef.current || startingRef.current || offset >= SCREEN_DUR) return
      startingRef.current = true
      audio.muted = false
      audio.volume = INTRO_AUDIO_LEVEL
      audio.currentTime = Math.min(offset, SCREEN_DUR - 250) / 1000
      const played = audio.play()
      if (!played) {
        startingRef.current = false
        return
      }
      played
        .then(finishSound)
        .catch((error: unknown) => {
          startingRef.current = false
          /* Autoplay policies hold the first attempt back until a gesture.
             Show a prompt so the user can start it instead of silently
             waiting. Anything else (a missing or undecodable file) is not
             worth retrying. */
          if ((error as DOMException)?.name === 'NotAllowedError') {
            setNeedsSound(true)
            return
          }
          waitingRef.current = false
        })
    }

    /* A muted play while the leader is on screen unlocks the element inside
       the gesture, so the timed playback after "1" is not blocked later. */
    const prime = () => {
      if (primedRef.current || soundingRef.current) return
      primedRef.current = true
      audio.muted = true
      const primed = audio.play()
      if (!primed) {
        audio.muted = false
        return
      }
      primed
        .then(() => {
          if (soundingRef.current || startingRef.current) return
          audio.pause()
          audio.currentTime = 0
          audio.muted = false
        })
        .catch(() => {
          audio.muted = false
        })
    }

    const unlock = () => {
      if (soundingRef.current || !waitingRef.current) return
      const elapsed = performance.now() - start
      if (elapsed < LEADER_END) {
        prime()
        return
      }
      sound(elapsed - LEADER_END)
    }

    resumeRef.current = () => {
      if (soundingRef.current) return
      sound(Math.max(0, performance.now() - start - LEADER_END))
    }

    const gestures: Array<keyof WindowEventMap> = ['pointerdown', 'touchstart', 'keydown']
    gestures.forEach((type) => window.addEventListener(type, unlock))

    /* The tick fires in the same callback that swaps the DOM number, so the
       sound and the on-screen count can never drift apart. The last tick is
       brighter and leads into the impact as the numbers clear. */
    LEADERS.forEach((_, i) =>
      at(() => {
        setStep(i)
        countdownRef.current?.tick({
          pitch: i === LEADERS.length - 1 ? 2600 : 2200,
          accent: i === LEADERS.length - 1,
        })
      }, LEADER_AT + i * LEADER_STEP),
    )
    at(() => {
      setStep(-1)
      countdownRef.current?.stopReel()
      // countdownRef.current?.boom()
    }, LEADER_END)
    at(() => sound(0), LEADER_END)
    at(() => fadeOutAudio(FADE_OUT_DUR), FADE_OUT_AT)   // ← new
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
      gestures.forEach((type) => window.removeEventListener(type, unlock))
      cancelAnimationFrame(frame)
      cancelAnimationFrame(fadeRef.current)   // ← new
      startingRef.current = false
      audio.pause()
      audio.currentTime = 0
      audio.volume = INTRO_AUDIO_LEVEL        // ← new
      audio.muted = false
    }
  }, [started])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!started) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          begin()
        }
        return
      }

      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        finish()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [begin, finish, started])

  return (
    <div className={`fi${exiting ? ' fi-out' : ''}`} role="dialog" aria-label="Shravani Pujar — digital filmmaker intro">
      <audio
        ref={audioRef}
        src={INTRO_AUDIO}
        preload="auto"
        playsInline
        aria-hidden="true"
        className="fi-audio"
      />
      <div className="fi-bg" aria-hidden="true" />

      {!started ? (
        <div className="fi-gate">
          <div className="fi-gate-card">
            <svg className="fi-gate-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
              <rect x="2.5" y="14" width="4" height="7" rx="2" />
              <rect x="17.5" y="14" width="4" height="7" rx="2" />
            </svg>
            <p className="fi-gate-kicker">SOUND CHECK</p>
            <h2 className="fi-gate-title">
              USE HEADPHONES<br />
              <i className='text-xl'>FOR BETTER EXPERIENCE</i>
            </h2>
            <p className="fi-gate-note">
              This intro plays with sound.
              <br />
              Turn your volume up before we begin.
            </p>
            <button type="button" className="fi-gate-button" onClick={begin} autoFocus>
              TAP FOR SOUND <b>↗</b>
            </button>
          </div>
        </div>
      ) : (
        <>
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
              <div className="fi-count">
                {step >= 0 && (
                  <span className={`fi-num${step === LEADERS.length - 1 ? ' fi-num-hold' : ''}`} key={step}>
                    {LEADERS[step]}
                  </span>
                )}
              </div>
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
            {/* <p className="fi-pres">SHRAVANI PUJAR PRESENTS</p> */}
            <h1 className="fi-title">
              {TITLE.map((word, w) => (
                <span className={`fi-word${w === 1 ? ' fi-word-alt' : ''}`} key={word}>
                  {Array.from(word).map((char, i) => (
                    <span
                      className="fi-char"
                      key={`${word}-${i}`}
                      style={{ animationDelay: `${(TITLE_AT + w * 0.3 + i * 0.075).toFixed(3)}s` }}
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
                <li key={credit} style={{ animationDelay: `${(CREDITS_AT + i * 0.7).toFixed(2)}s` }}>{credit}</li>
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

          {/* <div className="fi-hud"> */}
          {/* <span className="fi-slate">SHRAVANI PUJAR · 2026 · AHMEDABAD</span> */}
          {/* <button type="button" className="fi-skip" onClick={finish}>SKIP INTRO <b>↗</b></button> */}
          {/* </div> */}

          {needsSound && !exiting && (
            <button type="button" className="fi-sound" onClick={() => resumeRef.current()}>
              TAP FOR SOUND <b>↗</b>
            </button>
          )}

          <div className="fi-progress" aria-hidden="true"><i ref={barRef} /></div>
        </>
      )}
    </div>
  )
}
