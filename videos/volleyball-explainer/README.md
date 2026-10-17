# Volleyball explainer (motion graphics)

A ~7½ minute narrated, animated video that explains women's indoor volleyball (FIVB rules):
court, zones, roles (S, OH, MB, OPP, L), scoring, touches, and two scripted rallies
showing who moves where, side-outs, rotation, libero swaps and common faults.

- `index.html` — the whole animation, drawn on a canvas. Open it in a browser to play/scrub it.
- `render.mjs` — renders it to video with headless Chromium (Playwright) + ffmpeg.
- `narrate.py` — voices each caption with Piper TTS and writes `narration.js` (line lengths that pace the timeline).
- `sfx.py` — mixes narration, synthesised whistle/ball sounds and an ambient bed.
- `volleyball-explained.mp4` — the rendered result (1920×1080, 30 fps).

## Re-rendering

```sh
node render.mjs lines && python3 narrate.py <piper-voice.onnx> 12   # voice-over
node render.mjs video silent.mp4 30         # frames -> silent.mp4, also writes sfx.json
python3 sfx.py sfx.json audio.wav
ffmpeg -i silent.mp4 -i audio.wav -c:v copy -c:a aac -b:a 160k -shortest volleyball-explained.mp4
```

`node render.mjs snap 12 40 ...` writes still frames to `snaps/` for quick checks.
