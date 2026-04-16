const AudioContext = window.AudioContext || (window as any).webkitAudioContext;

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "square",
  gain = 0.1
) {
  const c = getCtx();
  const osc = c.createOscillator();
  const g = c.createGain();

  osc.type = type;
  osc.frequency.value = freq;

  g.gain.value = gain;
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);

  osc.connect(g).connect(c.destination);

  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

export function playCorrect() {
  [523, 659, 784].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.2), i * 120);
  });
}

export function playWrong() {
  [300, 200].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, "sawtooth"), i * 200);
  });
}

export function playGameOver() {
  [400, 350, 300, 200, 150].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3, "sawtooth"), i * 180);
  });
}

export function playVictory() {
  [523, 659, 784, 1047].forEach((freq, i) => {
    setTimeout(() => playTone(freq, 0.3), i * 150);
  });
}

export function playTimeUp() {
  playTone(180, 0.5, "sawtooth");
}