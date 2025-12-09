import type { NotificationSound } from './types';

type NotificationTone = {
  frequency: number;
  duration: number;
  volume?: number;
  gap?: number;
  detune?: number;
  harmonics?: { ratio: number; volume?: number; detune?: number }[];
};

type NotificationSoundPreset = {
  type: OscillatorType;
  tones: NotificationTone[];
  filterFrequency?: number;
  filterQ?: number;
  masterGain?: number;
};

const NOTIFICATION_SOUND_PRESETS: Record<
  NotificationSound,
  NotificationSoundPreset
> = {
  chime: {
    type: 'sine',
    tones: [
      {
        frequency: 620,
        duration: 0.45,
        volume: 0.08,
        harmonics: [
          { ratio: 1.5, volume: 0.24 },
          { ratio: 2, volume: 0.18 },
        ],
      },
      {
        frequency: 830,
        duration: 0.5,
        volume: 0.07,
        gap: 0.1,
        harmonics: [{ ratio: 2, volume: 0.16 }],
      },
    ],
    filterFrequency: 2600,
    filterQ: 0.9,
    masterGain: 0.32,
  },
  bell: {
    type: 'triangle',
    tones: [
      {
        frequency: 520,
        duration: 0.48,
        volume: 0.09,
        harmonics: [
          { ratio: 2, volume: 0.2 },
          { ratio: 2.5, volume: 0.14 },
        ],
      },
      {
        frequency: 660,
        duration: 0.52,
        volume: 0.08,
        gap: 0.12,
        harmonics: [{ ratio: 1.5, volume: 0.22 }],
      },
    ],
    filterFrequency: 2200,
    filterQ: 1,
    masterGain: 0.34,
  },
  digital: {
    type: 'square',
    tones: [
      {
        frequency: 840,
        duration: 0.26,
        volume: 0.07,
        harmonics: [{ ratio: 2, volume: 0.12 }],
      },
      {
        frequency: 1100,
        duration: 0.28,
        volume: 0.06,
        gap: 0.07,
        harmonics: [
          { ratio: 1.26, volume: 0.1 },
          { ratio: 2, volume: 0.08 },
        ],
      },
    ],
    filterFrequency: 2000,
    filterQ: 0.95,
    masterGain: 0.28,
  },
  pulse: {
    type: 'sine',
    tones: [
      {
        frequency: 420,
        duration: 0.32,
        volume: 0.08,
        harmonics: [{ ratio: 2, volume: 0.14 }],
      },
      {
        frequency: 520,
        duration: 0.32,
        volume: 0.07,
        gap: 0.06,
        harmonics: [{ ratio: 1.5, volume: 0.12 }],
      },
      {
        frequency: 380,
        duration: 0.36,
        volume: 0.06,
        gap: 0.05,
        harmonics: [{ ratio: 2, volume: 0.1 }],
      },
    ],
    filterFrequency: 1800,
    filterQ: 1.1,
    masterGain: 0.3,
  },
  spark: {
    type: 'sine',
    tones: [
      {
        frequency: 1040,
        duration: 0.22,
        volume: 0.07,
        harmonics: [
          { ratio: 1.5, volume: 0.16 },
          { ratio: 2, volume: 0.12 },
        ],
      },
      {
        frequency: 1320,
        duration: 0.24,
        volume: 0.06,
        gap: 0.05,
        harmonics: [{ ratio: 2, volume: 0.12 }],
      },
      {
        frequency: 1680,
        duration: 0.26,
        volume: 0.05,
        gap: 0.05,
        harmonics: [{ ratio: 2.2, volume: 0.09 }],
      },
    ],
    filterFrequency: 3000,
    filterQ: 1,
    masterGain: 0.3,
  },
};

export function playApplause() {
  if (typeof window === 'undefined') {
    return;
  }
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) {
    return;
  }
  if (!applauseContext || applauseContext.state === 'closed') {
    applauseContext = new AudioCtx();
  }
  const ctx = applauseContext;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {
      /* noop */
    });
  }
  const buffer = createApplauseBuffer(ctx);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1800;
  filter.Q.value = 0.9;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.06);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
  const panner = 'createStereoPanner' in ctx ? ctx.createStereoPanner() : null;
  source.connect(filter);
  filter.connect(panner ?? gain);
  if (panner) {
    panner.pan.value = 0;
    panner.connect(gain);
  }
  gain.connect(ctx.destination);
  source.start();
  source.stop(ctx.currentTime + 1.9);
}

let applauseContext: AudioContext | null = null;

export function playReminderSound() {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const AudioContextConstructor =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextConstructor) {
      return;
    }
    const ctx = new AudioContextConstructor();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'triangle';
    oscillator.connect(gain);
    gain.connect(ctx.destination);

    const start = ctx.currentTime;
    const tones = [
      { frequency: 587.33, duration: 0.18 },
      { frequency: 698.46, duration: 0.18 },
      { frequency: 880, duration: 0.24 },
    ];

    let current = start;
    tones.forEach(({ frequency, duration }) => {
      oscillator.frequency.setValueAtTime(frequency, current);
      current += duration;
    });

    const fadeInEnd = start + 0.05;
    const fadeOutStart = Math.max(start, current - 0.15);

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.12, fadeInEnd);
    gain.gain.setValueAtTime(0.12, fadeOutStart);
    gain.gain.linearRampToValueAtTime(0, current);

    oscillator.start(start);
    oscillator.stop(current);
    oscillator.onended = () => {
      try {
        ctx.close();
      } catch {
        // ignore
      }
    };
  } catch {
    // ignore
  }
}

export function playNotificationSound(sound: NotificationSound) {
  if (typeof window === 'undefined') {
    return;
  }
  const preset = NOTIFICATION_SOUND_PRESETS[sound];
  const tones = preset?.tones ?? NOTIFICATION_SOUND_PRESETS.chime.tones;
  if (!tones.length) {
    return;
  }

  try {
    const AudioContextConstructor =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextConstructor) {
      return;
    }

    const ctx = new AudioContextConstructor();
    const start = ctx.currentTime;
    const masterGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.value = preset?.filterFrequency ?? 2400;
    filter.Q.value = preset?.filterQ ?? 0.9;

    masterGain.gain.setValueAtTime(0.0001, start);
    masterGain.gain.exponentialRampToValueAtTime(
      preset?.masterGain ?? 0.3,
      start + 0.05
    );

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    let cursor = start;

    tones.forEach(
      ({
        frequency,
        duration,
        volume = 0.08,
        gap = 0.08,
        detune,
        harmonics,
      }) => {
        const gain = ctx.createGain();
        const attackEnd = cursor + Math.min(0.08, duration * 0.5);
        const releaseStart = cursor + Math.max(0, duration - 0.12);

        gain.gain.setValueAtTime(0.0001, cursor);
        gain.gain.exponentialRampToValueAtTime(volume, attackEnd);
        gain.gain.setValueAtTime(volume, releaseStart);
        gain.gain.exponentialRampToValueAtTime(0.0001, cursor + duration);
        gain.connect(filter);

        const scheduleVoice = (
          baseFrequency: number,
          voiceDetune: number | undefined,
          level: number
        ) => {
          const oscillator = ctx.createOscillator();
          const voiceGain = ctx.createGain();

          oscillator.type = preset?.type ?? 'sine';
          oscillator.frequency.setValueAtTime(baseFrequency, cursor);
          if (voiceDetune) {
            oscillator.detune.setValueAtTime(voiceDetune, cursor);
          }

          voiceGain.gain.setValueAtTime(level, cursor);
          oscillator.connect(voiceGain);
          voiceGain.connect(gain);

          oscillator.start(cursor);
          oscillator.stop(cursor + duration + 0.05);
        };

        scheduleVoice(frequency, detune, 1);

        harmonics?.forEach(harmonic => {
          const harmonicFrequency = frequency * harmonic.ratio;
          const harmonicLevel = Math.min(1, harmonic.volume ?? 0.4);
          scheduleVoice(harmonicFrequency, harmonic.detune, harmonicLevel);
        });

        cursor += duration + gap;
      }
    );

    masterGain.gain.exponentialRampToValueAtTime(0.0001, cursor + 0.25);

    const shutdownDelay = Math.max(0, cursor - ctx.currentTime + 0.35) * 1000;
    window.setTimeout(() => {
      try {
        ctx.close();
      } catch {
        // ignore
      }
    }, shutdownDelay);
  } catch {
    // ignore
  }
}

function createApplauseBuffer(ctx: AudioContext) {
  const duration = 1.9;
  const sampleRate = ctx.sampleRate;
  const totalSamples = Math.floor(sampleRate * duration);
  const buffer = ctx.createBuffer(2, totalSamples, sampleRate);

  for (
    let channelIndex = 0;
    channelIndex < buffer.numberOfChannels;
    channelIndex++
  ) {
    const data = buffer.getChannelData(channelIndex);
    const crowdColor = channelIndex === 0 ? 0.025 : 0.03;
    for (let i = 0; i < totalSamples; i++) {
      const progress = i / totalSamples;
      const fade = Math.pow(1 - progress, 1.3);
      data[i] = (Math.random() * 2 - 1) * crowdColor * fade;
    }

    const clapCount = 48;
    for (let clap = 0; clap < clapCount; clap++) {
      const start = Math.random() * (duration - 0.18);
      const width = 0.08 + Math.random() * 0.12;
      const strength = 0.35 + Math.random() * 0.55;
      const startIndex = Math.floor(start * sampleRate);
      const endIndex = Math.min(
        totalSamples,
        startIndex + Math.floor(width * sampleRate)
      );
      for (let i = startIndex; i < endIndex; i++) {
        const localProgress =
          (i - startIndex) / Math.max(1, endIndex - startIndex);
        const envelope = Math.sin(localProgress * Math.PI) ** 2;
        const jitter = 0.7 + Math.random() * 0.6;
        data[i] += (Math.random() * 2 - 1) * envelope * strength * jitter;
      }
    }

    let max = 0;
    for (let i = 0; i < totalSamples; i++) {
      const abs = Math.abs(data[i]);
      if (abs > max) {
        max = abs;
      }
    }
    if (max > 1) {
      const inv = 1 / max;
      for (let i = 0; i < totalSamples; i++) {
        data[i] *= inv;
      }
    }
  }

  return buffer;
}
