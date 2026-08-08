/**
 * Web Audio API Sound Utility for 心靈拿鐵相談室 (Mindful Latte Counseling Room)
 * Provides soft bell chimes, card flick sounds, and ambient café sound generation.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientSource: AudioBufferSourceNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private ambientVolume = 0.15;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Plays a sweet, soft brass desk bell chime (點餐鈴聲)
   */
  public playBellSound(pitchMultiplier = 1.0) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Fundamentals and harmonics for a brass bell chime
      const freqs = [1046.5, 2093, 3139.5, 4186]; // C6, C7, G7 octave bell tones
      const gains = [0.4, 0.25, 0.12, 0.05];

      freqs.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * pitchMultiplier, now);

        // Bell attack & exponential decay ring
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gains[i], now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 - i * 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.0);
      });
    } catch {
      // Audio context silenced or blocked by browser policy until interaction
    }
  }

  /**
   * Plays a gentle card flip / click chime sound
   */
  public playCardFlipSound() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // Soft high pitch wood-block / card flick sound
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Audio suppressed
    }
  }

  /**
   * Generates a warm, relaxing ambient café noise loop using filtered Web Audio API noise
   */
  private createCafeNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 5; // 5 seconds loop
    const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const output = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        // Pink noise generator (soothing ambient rain/cafe warmth)
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03;
        b6 = white * 0.115926;
      }
    }
    return buffer;
  }

  /**
   * Toggle Ambient Café Sound Loop
   */
  public toggleAmbientCafe(): boolean {
    return false;
  }

  public startAmbientCafe() {}

  public stopAmbientCafe() {}

  public isAmbientOn(): boolean {
    return false;
  }

  public setAmbientVolume(_vol: number) {}
}

export const soundEngine = new SoundEngine();
