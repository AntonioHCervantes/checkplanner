export function playTimerFinishedSound() {
  try {
    const AudioContextConstructor =
      window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextConstructor();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = 'triangle';
    oscillator.connect(gain);
    gain.connect(ctx.destination);

    const start = ctx.currentTime;
    const notes = [
      { frequency: 523.25, duration: 0.35 },
      { frequency: 659.25, duration: 0.35 },
      { frequency: 783.99, duration: 0.45 },
    ];

    let current = start;
    notes.forEach(({ frequency, duration }) => {
      oscillator.frequency.setValueAtTime(frequency, current);
      current += duration;
    });

    const fadeInEnd = start + 0.05;
    const fadeOutStart = Math.max(start, current - 0.2);

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.08, fadeInEnd);
    gain.gain.setValueAtTime(0.08, fadeOutStart);
    gain.gain.linearRampToValueAtTime(0, current);

    oscillator.start(start);
    oscillator.stop(current);
    oscillator.onended = () => {
      try {
        ctx.close();
      } catch (error) {
        // ignore
      }
    };
  } catch (error) {
    // ignore
  }
}
