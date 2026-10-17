"""Builds the soundtrack: narration (narr/*.wav) + synthesised effects + ambient bed.

usage: python3 sfx.py sfx.json out.wav     (sfx.json is written by render.mjs)
"""
import json
import os
import sys
import wave

import numpy as np

SR = 44100
rng = np.random.default_rng(7)


def env(n, attack=0.002, decay=0.08):
    t = np.arange(n) / SR
    return np.minimum(1, t / attack) * np.exp(-t / decay)


def noise_burst(dur, decay, tone, gain):
    n = int(dur * SR)
    t = np.arange(n) / SR
    noise = rng.standard_normal(n)
    # crude band-limiting: average neighbouring samples
    k = max(1, int(SR / tone / 4))
    noise = np.convolve(noise, np.ones(k) / k, mode="same")
    return gain * noise * env(n, decay=decay)


def thump(dur, freq, decay, gain):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = freq * (1 + 0.6 * np.exp(-t / 0.02))  # quick pitch drop
    return gain * np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, decay=decay)


def whistle(dur=0.75):
    n = int(dur * SR)
    t = np.arange(n) / SR
    trill = 0.55 + 0.45 * np.sign(np.sin(2 * np.pi * 28 * t))
    tone = np.sin(2 * np.pi * 3150 * t) + 0.35 * np.sin(2 * np.pi * 6300 * t)
    shape = np.minimum(1, t / 0.02) * np.minimum(1, (dur - t) / 0.08)
    return 0.22 * tone * trill * shape


def layer(*parts):
    out = np.zeros(max(len(p) for p in parts))
    for p in parts:
        out[: len(p)] += p
    return out


SOUNDS = {
    "hit": lambda: layer(noise_burst(0.12, 0.02, 2500, 0.35), thump(0.15, 180, 0.04, 0.35)),
    "set": lambda: layer(noise_burst(0.08, 0.012, 3500, 0.22), thump(0.1, 260, 0.025, 0.2)),
    "serve": lambda: layer(noise_burst(0.14, 0.025, 2000, 0.5), thump(0.18, 150, 0.05, 0.45)),
    "spike": lambda: layer(noise_burst(0.2, 0.035, 1500, 0.85), thump(0.25, 110, 0.07, 0.7)),
    "block": lambda: layer(noise_burst(0.16, 0.03, 1800, 0.6), thump(0.2, 130, 0.05, 0.55)),
    "floor": lambda: layer(noise_burst(0.2, 0.03, 900, 0.45), thump(0.3, 85, 0.09, 0.7)),
    "whistle": whistle,
}


def ambient(duration):
    """Soft pad: slow chord changes on sine partials, very low in the mix."""
    n = int(duration * SR)
    t = np.arange(n) / SR
    chords = [[220.0, 277.2, 329.6], [196.0, 246.9, 293.7], [174.6, 220.0, 261.6], [196.0, 246.9, 329.6]]
    out = np.zeros(n)
    seg = 8.0
    for i, start in enumerate(np.arange(0, duration, seg)):
        a, b = int(start * SR), min(n, int((start + seg + 2) * SR))
        tt = t[a:b] - start
        w = np.minimum(1, tt / 2) * np.minimum(1, np.maximum(0, (seg + 2 - tt)) / 2)
        for f in chords[i % len(chords)]:
            out[a:b] += w * (np.sin(2 * np.pi * f * t[a:b]) + 0.3 * np.sin(2 * np.pi * f * 2 * t[a:b]))
    fade = np.minimum(1, t / 3) * np.minimum(1, (duration - t) / 3)
    return 0.018 * out * fade


def load_voice(path):
    with wave.open(path) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(float) / 32768
        sr = w.getframerate()
    # resample to SR by linear interpolation
    t = np.arange(int(len(x) * SR / sr)) * sr / SR
    return np.interp(t, np.arange(len(x)), x)


def main():
    data = json.load(open(sys.argv[1]))
    duration = data["duration"]
    n = int(duration * SR)
    fx = ambient(duration)
    for at, kind in data["sfx"]:
        s = SOUNDS[kind]()
        a = int(at * SR)
        b = min(n, a + len(s))
        if a < n:
            fx[a:b] += s[: b - a]
    voice = np.zeros(n)
    here = os.path.dirname(os.path.abspath(sys.argv[1]))
    for at, scene, line in data["narration"]:
        v = load_voice(os.path.join(here, "narr", f"{scene}_{line}.wav"))
        a = int(at * SR)
        b = min(n, a + len(v))
        voice[a:b] += v[: b - a]
    # duck effects/music while the narrator speaks
    level = np.convolve(np.abs(voice), np.ones(4410) / 4410, mode="same")
    duck = 1 - 0.55 * np.clip(level / 0.03, 0, 1)
    mix = fx * duck * 0.8 + voice * 1.6
    mix = np.tanh(mix * 1.1) * 0.85
    pcm = (np.stack([mix, mix], axis=1) * 32767).astype(np.int16)
    with wave.open(sys.argv[2], "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == "__main__":
    main()
