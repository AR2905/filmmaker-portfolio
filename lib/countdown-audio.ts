// type TickOptions = {
//   /** Pitch of the sharp click layer, in Hz. */
//   pitch?: number
//   /** Louder, heavier hit for the final count. */
//   accent?: boolean
// }

// export type CountdownAudio = {
//   resume: () => Promise<void>
//   tick: (options?: TickOptions) => void
//   boom: () => void
//   startReel: () => void
//   stopReel: () => void
//   dispose: () => void
// }

// const MASTER_LEVEL = 0.5

// function makeNoise(context: AudioContext, seconds: number) {
//   const buffer = context.createBuffer(
//     1,
//     Math.ceil(context.sampleRate * seconds),
//     context.sampleRate,
//   )
//   const data = buffer.getChannelData(0)
//   for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
//   return buffer
// }

// /**
//  * One second of projector texture: constant film hiss plus 24 sprocket
//  * clicks, so looping it reads as a real reel running through a gate.
//  */
// function makeReelLoop(context: AudioContext) {
//   const rate = context.sampleRate
//   const length = rate
//   const buffer = context.createBuffer(1, length, rate)
//   const data = buffer.getChannelData(0)

//   for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * 0.12

//   const frame = Math.floor(rate / 24)
//   for (let start = 0; start < length; start += frame) {
//     for (let j = 0; j < 160 && start + j < length; j++) {
//       const envelope = Math.exp(-j / 22)
//       data[start + j] += (Math.random() * 2 - 1) * envelope * 0.55
//     }
//   }

//   return buffer
// }

// /** Small generated impulse response for a cinematic tail on the impact. */
// function makeImpulse(context: AudioContext, seconds: number, decay: number) {
//   const length = Math.floor(context.sampleRate * seconds)
//   const impulse = context.createBuffer(2, length, context.sampleRate)
//   for (let channel = 0; channel < 2; channel++) {
//     const data = impulse.getChannelData(channel)
//     for (let i = 0; i < length; i++) {
//       data[i] =
//         (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay)
//     }
//   }
//   return impulse
// }

// /**
//  * Procedural cinematic countdown kit. Everything is synthesised with the Web
//  * Audio API, so no audio files are needed. Create it inside a user gesture
//  * (click/keypress) so the browser allows the context to start.
//  */
// export function createCountdownAudio(): CountdownAudio | null {
//   const AudioCtor =
//     window.AudioContext ??
//     (window as typeof window & { webkitAudioContext?: typeof AudioContext })
//       .webkitAudioContext

//   if (!AudioCtor) return null

//   const context = new AudioCtor()
//   const master = context.createGain()
//   master.gain.value = MASTER_LEVEL

//   /* Keep stacked sub layers from clipping the destination. */
//   const compressor = context.createDynamicsCompressor()
//   compressor.threshold.value = -18
//   compressor.knee.value = 22
//   compressor.ratio.value = 6
//   compressor.attack.value = 0.003
//   compressor.release.value = 0.25
//   master.connect(compressor)
//   compressor.connect(context.destination)

//   /* Shared wet path for the impact, gives it size without an audio file. */
//   const reverb = context.createConvolver()
//   reverb.buffer = makeImpulse(context, 1.8, 2.4)
//   const reverbSend = context.createGain()
//   reverbSend.gain.value = 0.32
//   const impactBus = context.createGain()
//   impactBus.connect(master)
//   impactBus.connect(reverbSend)
//   reverbSend.connect(reverb)
//   reverb.connect(master)

//   const tickNoise = makeNoise(context, 0.05)
//   const boomNoise = makeNoise(context, 1)
//   const reelLoop = makeReelLoop(context)

//   let reel: { bus: GainNode; nodes: AudioScheduledSourceNode[] } | null = null

//   const now = () => context.currentTime

//   const tick = ({ pitch = 1500, accent = false }: TickOptions = {}) => {
//     if (context.state !== 'running') return
//     const t = now()

//     /* Deep body: a short sub thump that makes the count feel physical. */
//     const sub = context.createOscillator()
//     const subGain = context.createGain()
//     sub.type = 'sine'
//     sub.frequency.setValueAtTime(130, t)
//     sub.frequency.exponentialRampToValueAtTime(46, t + 0.12)
//     subGain.gain.setValueAtTime(0.0001, t)
//     subGain.gain.exponentialRampToValueAtTime(accent ? 0.7 : 0.45, t + 0.006)
//     subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.26)
//     sub.connect(subGain).connect(impactBus)
//     sub.start(t)
//     sub.stop(t + 0.3)
//     sub.onended = () => {
//       sub.disconnect()
//       subGain.disconnect()
//     }

//     /* Sharp click: fast falling square burst, the "tick" itself. */
//     const click = context.createOscillator()
//     const clickGain = context.createGain()
//     click.type = 'square'
//     click.frequency.setValueAtTime(pitch, t)
//     click.frequency.exponentialRampToValueAtTime(pitch * 0.55, t + 0.028)
//     clickGain.gain.setValueAtTime(0.0001, t)
//     clickGain.gain.exponentialRampToValueAtTime(accent ? 0.4 : 0.26, t + 0.003)
//     clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06)
//     click.connect(clickGain).connect(master)
//     click.start(t)
//     click.stop(t + 0.07)
//     click.onended = () => {
//       click.disconnect()
//       clickGain.disconnect()
//     }

//     /* High-passed noise adds the mechanical edge of a film gate. */
//     const noise = context.createBufferSource()
//     const noiseGain = context.createGain()
//     const highpass = context.createBiquadFilter()
//     noise.buffer = tickNoise
//     highpass.type = 'highpass'
//     highpass.frequency.value = 3000
//     noiseGain.gain.setValueAtTime(accent ? 0.2 : 0.13, t)
//     noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03)
//     noise.connect(highpass).connect(noiseGain).connect(master)
//     noise.start(t)
//     noise.stop(t + 0.04)
//     noise.onended = () => {
//       noise.disconnect()
//       highpass.disconnect()
//       noiseGain.disconnect()
//     }
//   }

//   const boom = () => {
//     if (context.state !== 'running') return
//     const t = now()

//     /* Primary sub drop: the weight of the impact. */
//     const sub = context.createOscillator()
//     const subGain = context.createGain()
//     sub.type = 'sine'
//     sub.frequency.setValueAtTime(160, t)
//     sub.frequency.exponentialRampToValueAtTime(34, t + 0.9)
//     subGain.gain.setValueAtTime(0.0001, t)
//     subGain.gain.exponentialRampToValueAtTime(0.95, t + 0.02)
//     subGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.7)
//     sub.connect(subGain).connect(impactBus)
//     sub.start(t)
//     sub.stop(t + 1.8)
//     sub.onended = () => {
//       sub.disconnect()
//       subGain.disconnect()
//     }

//     /* Detuned second sub widens the hit on small speakers. */
//     const wide = context.createOscillator()
//     const wideGain = context.createGain()
//     wide.type = 'sine'
//     wide.frequency.setValueAtTime(95, t)
//     wide.frequency.exponentialRampToValueAtTime(42, t + 0.7)
//     wideGain.gain.setValueAtTime(0.0001, t)
//     wideGain.gain.exponentialRampToValueAtTime(0.45, t + 0.015)
//     wideGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.1)
//     wide.connect(wideGain).connect(impactBus)
//     wide.start(t)
//     wide.stop(t + 1.2)
//     wide.onended = () => {
//       wide.disconnect()
//       wideGain.disconnect()
//     }

//     /* Low-passed noise: the physical thud of the frame landing. */
//     const thud = context.createBufferSource()
//     const thudGain = context.createGain()
//     const lowpass = context.createBiquadFilter()
//     thud.buffer = boomNoise
//     lowpass.type = 'lowpass'
//     lowpass.frequency.setValueAtTime(1400, t)
//     lowpass.frequency.exponentialRampToValueAtTime(90, t + 0.7)
//     thudGain.gain.setValueAtTime(0.0001, t)
//     thudGain.gain.exponentialRampToValueAtTime(0.5, t + 0.012)
//     thudGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.9)
//     thud.connect(lowpass).connect(thudGain).connect(impactBus)
//     thud.start(t)
//     thud.stop(t + 0.95)
//     thud.onended = () => {
//       thud.disconnect()
//       lowpass.disconnect()
//       thudGain.disconnect()
//     }

//     /* Short resonant ping gives the impact a metallic "cut". */
//     const ping = context.createOscillator()
//     const pingGain = context.createGain()
//     ping.type = 'triangle'
//     ping.frequency.setValueAtTime(740, t)
//     pingGain.gain.setValueAtTime(0.0001, t)
//     pingGain.gain.exponentialRampToValueAtTime(0.16, t + 0.008)
//     pingGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55)
//     ping.connect(pingGain).connect(impactBus)
//     ping.start(t)
//     ping.stop(t + 0.6)
//     ping.onended = () => {
//       ping.disconnect()
//       pingGain.disconnect()
//     }
//   }

//   const startReel = () => {
//     if (reel) return
//     if (context.state !== 'running') {
//       void context.resume().then(startReel).catch(() => { })
//       return
//     }
//     const t = now()
//     const bus = context.createGain()
//     bus.gain.setValueAtTime(0.0001, t)
//     bus.gain.exponentialRampToValueAtTime(0.55, t + 0.5)
//     bus.connect(master)

//     /* Sprocket clicks + hiss, looped. */
//     const film = context.createBufferSource()
//     film.buffer = reelLoop
//     film.loop = true
//     const filmFilter = context.createBiquadFilter()
//     filmFilter.type = 'highpass'
//     filmFilter.frequency.value = 420
//     const filmGain = context.createGain()
//     filmGain.gain.value = 0.22
//     film.connect(filmFilter).connect(filmGain).connect(bus)

//     /* Low motor hum underneath the clicks. */
//     const motor = context.createOscillator()
//     motor.type = 'sawtooth'
//     motor.frequency.value = 52
//     const motorFilter = context.createBiquadFilter()
//     motorFilter.type = 'lowpass'
//     motorFilter.frequency.value = 150
//     motorFilter.Q.value = 3
//     const motorGain = context.createGain()
//     motorGain.gain.value = 0.09
//     motor.connect(motorFilter).connect(motorGain).connect(bus)

//     film.start(t)
//     motor.start(t)
//     reel = { bus, nodes: [film, motor] }
//   }

//   const stopReel = () => {
//     if (!reel) return
//     const t = now()
//     const { bus, nodes } = reel
//     reel = null
//     bus.gain.cancelScheduledValues(t)
//     bus.gain.setValueAtTime(Math.max(bus.gain.value, 0.0001), t)
//     bus.gain.exponentialRampToValueAtTime(0.0001, t + 0.35)
//     nodes.forEach((node) => {
//       try {
//         node.stop(t + 0.4)
//       } catch {
//         /* Already stopped. */
//       }
//     })
//     window.setTimeout(() => {
//       nodes.forEach((node) => node.disconnect())
//       bus.disconnect()
//     }, 500)
//   }

//   const resume = async () => {
//     if (context.state === 'suspended') {
//       await context.resume().catch(() => { })
//     }
//   }

//   const dispose = () => {
//     stopReel()
//     void context.close().catch(() => { })
//   }

//   return { resume, tick, boom, startReel, stopReel, dispose }
// }


type TickOptions = {
  /** Pitch of the sharp click layer, in Hz. */
  pitch?: number
  /** Louder, heavier hit for the final count. */
  accent?: boolean
}

export type CountdownAudio = {
  resume: () => Promise<void>
  tick: (options?: TickOptions) => void
  boom: () => void
  startReel: () => void
  stopReel: () => void
  dispose: () => void
}

const MASTER_LEVEL = 0.55

/* ------------------------------------------------------------------ */
/* Buffers                                                             */
/* ------------------------------------------------------------------ */

function makeNoise(context: AudioContext, seconds: number) {
  const buffer = context.createBuffer(
    1,
    Math.ceil(context.sampleRate * seconds),
    context.sampleRate,
  )
  const data = buffer.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return buffer
}

/**
 * One second of projector texture: film hiss, 24 sprocket clicks and a few
 * dust pops, so looping it reads as a real reel running through a gate.
 */
function makeReelLoop(context: AudioContext) {
  const rate = context.sampleRate
  const length = rate
  const buffer = context.createBuffer(1, length, rate)
  const data = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * 0.1

  const frame = Math.floor(rate / 24)
  for (let start = 0; start < length; start += frame) {
    /* Alternate heavier/lighter clicks so the rhythm feels mechanical. */
    const weight = (start / frame) % 2 === 0 ? 0.6 : 0.4
    for (let j = 0; j < 180 && start + j < length; j++) {
      const envelope = Math.exp(-j / 24)
      data[start + j] += (Math.random() * 2 - 1) * envelope * weight
    }
  }

  /* Dust and scratches: rare, tiny crackles. */
  for (let n = 0; n < 7; n++) {
    const at = Math.floor(Math.random() * (length - 80))
    const amp = 0.15 + Math.random() * 0.3
    for (let j = 0; j < 60; j++) {
      data[at + j] += (Math.random() * 2 - 1) * Math.exp(-j / 8) * amp
    }
  }

  return buffer
}

/**
 * Dark, stereo, generated impulse response. The tail gets progressively
 * duller (one-pole low-pass that closes over time) like a big hall or
 * trailer-style impact room.
 */
function makeImpulse(context: AudioContext, seconds: number, decay: number) {
  const length = Math.floor(context.sampleRate * seconds)
  const impulse = context.createBuffer(2, length, context.sampleRate)
  for (let channel = 0; channel < 2; channel++) {
    const data = impulse.getChannelData(channel)
    let lp = 0
    for (let i = 0; i < length; i++) {
      const progress = i / length
      const coeff = 0.55 + progress * 0.42 /* 0.55 -> 0.97 = darker over time */
      lp = lp * coeff + (Math.random() * 2 - 1) * (1 - coeff)
      data[i] = lp * Math.pow(1 - progress, decay) * 3.2
    }
  }
  return impulse
}

/** Soft-clip curve: adds harmonics so deep subs still read on small speakers. */
function makeSaturationCurve(amount: number) {
  const samples = 1024
  const curve = new Float32Array(samples)
  for (let i = 0; i < samples; i++) {
    const x = (i / (samples - 1)) * 2 - 1
    curve[i] = Math.tanh(x * amount) / Math.tanh(amount)
  }
  return curve
}

/**
 * Procedural cinematic countdown kit. Everything is synthesised with the Web
 * Audio API, so no audio files are needed. Create it inside a user gesture
 * (click/keypress) so the browser allows the context to start.
 *
 * - startReel(): projector + dark drone that slowly tightens (tension build)
 * - tick():      deep, physical count hit; `accent` for the last numbers
 * - boom():      trailer-style impact with braam, metal bell and long tail
 */
export function createCountdownAudio(): CountdownAudio | null {
  const AudioCtor =
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext

  if (!AudioCtor) return null

  const context = new AudioCtor()
  const master = context.createGain()
  master.gain.value = MASTER_LEVEL

  /* Glue + protection against stacked sub layers clipping. */
  const compressor = context.createDynamicsCompressor()
  compressor.threshold.value = -20
  compressor.knee.value = 20
  compressor.ratio.value = 7
  compressor.attack.value = 0.003
  compressor.release.value = 0.28
  master.connect(compressor)
  compressor.connect(context.destination)

  /* Big dark hall for impacts, smaller send for ticks. */
  const reverb = context.createConvolver()
  reverb.buffer = makeImpulse(context, 3.4, 2.1)
  const reverbReturn = context.createGain()
  reverbReturn.gain.value = 1
  reverb.connect(reverbReturn)
  reverbReturn.connect(master)

  const impactBus = context.createGain()
  const impactSend = context.createGain()
  impactSend.gain.value = 0.4
  impactBus.connect(master)
  impactBus.connect(impactSend)
  impactSend.connect(reverb)

  const tickBus = context.createGain()
  const tickSend = context.createGain()
  tickSend.gain.value = 0.14
  tickBus.connect(master)
  tickBus.connect(tickSend)
  tickSend.connect(reverb)

  const saturation = makeSaturationCurve(2.2)

  const tickNoise = makeNoise(context, 0.06)
  const boomNoise = makeNoise(context, 3.5)
  const reelLoop = makeReelLoop(context)

  let reel: { bus: GainNode; nodes: AudioScheduledSourceNode[] } | null = null

  const now = () => context.currentTime

  /** Disconnect nodes when a source finishes, so nothing leaks. */
  const cleanup = (source: AudioScheduledSourceNode, ...nodes: AudioNode[]) => {
    source.onended = () => {
      source.disconnect()
      nodes.forEach((node) => node.disconnect())
    }
  }

  /** Sine/triangle with a pitch glide and an exponential amp envelope. */
  const tone = (opts: {
    type: OscillatorType
    from: number
    to?: number
    glide?: number
    peak: number
    attack: number
    decay: number
    start: number
    out: AudioNode
    shape?: boolean
  }) => {
    const osc = context.createOscillator()
    const gain = context.createGain()
    osc.type = opts.type
    osc.frequency.setValueAtTime(opts.from, opts.start)
    if (opts.to) {
      osc.frequency.exponentialRampToValueAtTime(
        opts.to,
        opts.start + (opts.glide ?? opts.decay),
      )
    }
    gain.gain.setValueAtTime(0.0001, opts.start)
    gain.gain.exponentialRampToValueAtTime(opts.peak, opts.start + opts.attack)
    gain.gain.exponentialRampToValueAtTime(0.0001, opts.start + opts.decay)

    if (opts.shape) {
      const shaper = context.createWaveShaper()
      shaper.curve = saturation
      shaper.oversample = '2x'
      osc.connect(shaper).connect(gain).connect(opts.out)
      cleanup(osc, shaper, gain)
    } else {
      osc.connect(gain).connect(opts.out)
      cleanup(osc, gain)
    }
    osc.start(opts.start)
    osc.stop(opts.start + opts.decay + 0.05)
  }

  /** Filtered noise burst. */
  const burst = (opts: {
    buffer: AudioBuffer
    filter: BiquadFilterType
    freqFrom: number
    freqTo?: number
    sweep?: number
    peak: number
    attack: number
    decay: number
    start: number
    out: AudioNode
    q?: number
  }) => {
    const src = context.createBufferSource()
    const filter = context.createBiquadFilter()
    const gain = context.createGain()
    src.buffer = opts.buffer
    filter.type = opts.filter
    if (opts.q) filter.Q.value = opts.q
    filter.frequency.setValueAtTime(opts.freqFrom, opts.start)
    if (opts.freqTo) {
      filter.frequency.exponentialRampToValueAtTime(
        opts.freqTo,
        opts.start + (opts.sweep ?? opts.decay),
      )
    }
    gain.gain.setValueAtTime(0.0001, opts.start)
    gain.gain.exponentialRampToValueAtTime(opts.peak, opts.start + opts.attack)
    gain.gain.exponentialRampToValueAtTime(0.0001, opts.start + opts.decay)
    src.connect(filter).connect(gain).connect(opts.out)
    cleanup(src, filter, gain)
    src.start(opts.start)
    src.stop(opts.start + opts.decay + 0.05)
  }

  /* ---------------------------------------------------------------- */
  /* TICK                                                              */
  /* ---------------------------------------------------------------- */

  const tick = ({ pitch = 1500, accent = false }: TickOptions = {}) => {
    if (context.state !== 'running') return
    const t = now()

    /* Deep body: sub thump that makes every number feel physical. */
    tone({
      type: 'sine',
      from: accent ? 125 : 105,
      to: 40,
      glide: 0.16,
      peak: accent ? 0.95 : 0.6,
      attack: 0.006,
      decay: accent ? 0.7 : 0.38,
      start: t,
      out: impactBus,
      shape: true,
    })

    /* Mid knock: the "wood and leather" punch of a big drum. */
    tone({
      type: 'triangle',
      from: accent ? 240 : 210,
      to: 95,
      glide: 0.06,
      peak: accent ? 0.38 : 0.26,
      attack: 0.003,
      decay: 0.12,
      start: t,
      out: tickBus,
    })

    /* Sharp click: fast falling square burst, the "tick" itself. */
    const click = context.createOscillator()
    const clickGain = context.createGain()
    const clickFilter = context.createBiquadFilter()
    click.type = 'square'
    click.frequency.setValueAtTime(pitch, t)
    click.frequency.exponentialRampToValueAtTime(pitch * 0.5, t + 0.03)
    clickFilter.type = 'highpass'
    clickFilter.frequency.value = 700
    clickGain.gain.setValueAtTime(0.0001, t)
    clickGain.gain.exponentialRampToValueAtTime(accent ? 0.3 : 0.2, t + 0.002)
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055)
    click.connect(clickFilter).connect(clickGain).connect(tickBus)
    cleanup(click, clickFilter, clickGain)
    click.start(t)
    click.stop(t + 0.07)

    /* High-passed noise adds the mechanical edge of a film gate. */
    burst({
      buffer: tickNoise,
      filter: 'highpass',
      freqFrom: 3200,
      peak: accent ? 0.22 : 0.14,
      attack: 0.001,
      decay: 0.035,
      start: t,
      out: tickBus,
    })

    if (accent) {
      /* Metallic bell ring on heavy counts: inharmonic partials. */
      const base = pitch * 0.32
        ;[1, 2.76, 5.4].forEach((ratio, index) => {
          tone({
            type: 'sine',
            from: base * ratio,
            peak: 0.07 / (index + 1),
            attack: 0.004,
            decay: 1.1 - index * 0.25,
            start: t,
            out: impactBus,
          })
        })
    }
  }

  /* ---------------------------------------------------------------- */
  /* BOOM                                                              */
  /* ---------------------------------------------------------------- */

  const boom = () => {
    if (context.state !== 'running') return
    const t = now()

    /* 1. Primary sub drop: the weight of the impact (long, saturated). */
    tone({
      type: 'sine',
      from: 78,
      to: 26,
      glide: 1.8,
      peak: 1,
      attack: 0.015,
      decay: 3.2,
      start: t,
      out: impactBus,
      shape: true,
    })

    /* 2. Punchy body that falls fast, gives the hit its "kick". */
    tone({
      type: 'sine',
      from: 170,
      to: 46,
      glide: 0.45,
      peak: 0.7,
      attack: 0.008,
      decay: 1.2,
      start: t,
      out: impactBus,
      shape: true,
    })

    /* 3. Braam: detuned saws swept closed, the trailer-horn growl. */
    const braamFilter = context.createBiquadFilter()
    const braamGain = context.createGain()
    braamFilter.type = 'lowpass'
    braamFilter.Q.value = 4
    braamFilter.frequency.setValueAtTime(1100, t)
    braamFilter.frequency.exponentialRampToValueAtTime(110, t + 1.8)
    braamGain.gain.setValueAtTime(0.0001, t)
    braamGain.gain.exponentialRampToValueAtTime(0.32, t + 0.03)
    braamGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.2)
    braamFilter.connect(braamGain).connect(impactBus)
      ;[55, 55.7, 54.3, 82.4].forEach((freq) => {
        const saw = context.createOscillator()
        const sawGain = context.createGain()
        saw.type = 'sawtooth'
        saw.frequency.setValueAtTime(freq, t)
        saw.frequency.exponentialRampToValueAtTime(freq * 0.92, t + 2)
        sawGain.gain.value = 0.25
        saw.connect(sawGain).connect(braamFilter)
        cleanup(saw, sawGain)
        saw.start(t)
        saw.stop(t + 2.3)
      })
    window.setTimeout(() => {
      braamFilter.disconnect()
      braamGain.disconnect()
    }, 2600)

    /* 4. Thud: low-passed noise, the frame slamming into the gate. */
    burst({
      buffer: boomNoise,
      filter: 'lowpass',
      freqFrom: 2200,
      freqTo: 70,
      sweep: 1.1,
      peak: 0.6,
      attack: 0.01,
      decay: 1.3,
      start: t,
      out: impactBus,
    })

    /* 5. Crack: very short bright transient so the hit cuts through. */
    burst({
      buffer: boomNoise,
      filter: 'highpass',
      freqFrom: 1800,
      peak: 0.45,
      attack: 0.001,
      decay: 0.14,
      start: t,
      out: impactBus,
    })
  }

  /* ---------------------------------------------------------------- */
  /* REEL (ambience + slowly tightening drone)                         */
  /* ---------------------------------------------------------------- */

  const startReel = () => {
    if (reel) return
    if (context.state !== 'running') {
      void context.resume().then(startReel).catch(() => { })
      return
    }
    const t = now()
    const bus = context.createGain()
    bus.gain.setValueAtTime(0.0001, t)
    bus.gain.exponentialRampToValueAtTime(0.6, t + 0.6)
    bus.connect(master)

    /* Sprocket clicks + hiss, looped, with slight motor flutter. */
    const film = context.createBufferSource()
    film.buffer = reelLoop
    film.loop = true
    const filmFilter = context.createBiquadFilter()
    filmFilter.type = 'highpass'
    filmFilter.frequency.value = 420
    const filmGain = context.createGain()
    filmGain.gain.value = 0.2
    film.connect(filmFilter).connect(filmGain).connect(bus)

    const flutter = context.createOscillator()
    const flutterDepth = context.createGain()
    flutter.type = 'sine'
    flutter.frequency.value = 0.8
    flutterDepth.gain.value = 0.012
    flutter.connect(flutterDepth).connect(film.playbackRate)

    /* Low motor hum underneath the clicks. */
    const motor = context.createOscillator()
    motor.type = 'sawtooth'
    motor.frequency.value = 50
    const motorFilter = context.createBiquadFilter()
    motorFilter.type = 'lowpass'
    motorFilter.frequency.value = 140
    motorFilter.Q.value = 3
    const motorGain = context.createGain()
    motorGain.gain.value = 0.08
    motor.connect(motorFilter).connect(motorGain).connect(bus)

    /* Dark drone: two detuned saws that slowly open and rise = tension. */
    const droneFilter = context.createBiquadFilter()
    droneFilter.type = 'lowpass'
    droneFilter.Q.value = 2
    droneFilter.frequency.setValueAtTime(90, t)
    droneFilter.frequency.exponentialRampToValueAtTime(420, t + 14)
    const droneGain = context.createGain()
    droneGain.gain.setValueAtTime(0.0001, t)
    droneGain.gain.exponentialRampToValueAtTime(0.1, t + 3)
    droneGain.gain.exponentialRampToValueAtTime(0.2, t + 14)
    droneFilter.connect(droneGain).connect(bus)

    const droneNodes: OscillatorNode[] = []
      ;[36.7, 36.95, 55].forEach((freq, index) => {
        const osc = context.createOscillator()
        const oscGain = context.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(freq, t)
        /* Slow upward drift builds unease. */
        osc.frequency.exponentialRampToValueAtTime(freq * 1.06, t + 14)
        oscGain.gain.value = index === 2 ? 0.12 : 0.3
        osc.connect(oscGain).connect(droneFilter)
        osc.start(t)
        droneNodes.push(osc)
      })

    /* Slow breathing on the drone filter. */
    const breath = context.createOscillator()
    const breathDepth = context.createGain()
    breath.type = 'sine'
    breath.frequency.value = 0.18
    breathDepth.gain.value = 40
    breath.connect(breathDepth).connect(droneFilter.detune)
    breath.start(t)

    film.start(t)
    motor.start(t)
    flutter.start(t)
    reel = {
      bus,
      nodes: [film, motor, flutter, breath, ...droneNodes],
    }
  }

  const stopReel = () => {
    if (!reel) return
    const t = now()
    const { bus, nodes } = reel
    reel = null
    bus.gain.cancelScheduledValues(t)
    bus.gain.setValueAtTime(Math.max(bus.gain.value, 0.0001), t)
    bus.gain.exponentialRampToValueAtTime(0.0001, t + 0.3)
    nodes.forEach((node) => {
      try {
        node.stop(t + 0.35)
      } catch {
        /* Already stopped. */
      }
    })
    window.setTimeout(() => {
      nodes.forEach((node) => node.disconnect())
      bus.disconnect()
    }, 500)
  }

  const resume = async () => {
    if (context.state === 'suspended') {
      await context.resume().catch(() => { })
    }
  }

  const dispose = () => {
    stopReel()
    void context.close().catch(() => { })
  }

  return { resume, tick, boom, startReel, stopReel, dispose }
}