// Renders index.html to video frames with headless Chromium.
//   node render.mjs snap 12.5 40 ...      -> PNG snapshots at those times
//   node render.mjs video out.mp4 [fps]    -> silent H.264 video (+ sfx.json)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const url = pathToFileURL(join(here, 'index.html')).href + '?render';
const [mode, ...args] = process.argv.slice(2);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined });
async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  return page;
}
const grab = (page, t) => page.evaluate(t => { renderAt(t); return document.getElementById('c').toDataURL('image/jpeg', 0.93); }, t)
  .then(d => Buffer.from(d.split(',')[1], 'base64'));

if (mode === 'snap') {
  const page = await openPage();
  const out = join(here, 'snaps'); mkdirSync(out, { recursive: true });
  for (const t of args.map(Number)) writeFileSync(join(out, `t${t.toFixed(1)}.jpg`), await grab(page, t));
  console.log('duration', await page.evaluate(() => DURATION));
} else if (mode === 'video') {
  const outFile = resolve(args[0] || 'out.mp4'), fps = Number(args[1] || 30), workers = 4;
  const probe = await openPage();
  const duration = await probe.evaluate(() => DURATION);
  writeFileSync(join(here, 'sfx.json'), JSON.stringify(await probe.evaluate(() => SFX)));
  await probe.close();
  const frames = Math.ceil(duration * fps), per = Math.ceil(frames / workers);
  const tmp = join(here, '.parts'); rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp);
  console.log(`${duration.toFixed(1)}s, ${frames} frames`);
  await Promise.all([...Array(workers)].map(async (_, w) => {
    const page = await openPage();
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', String(fps), join(tmp, `p${w}.mp4`)], { stdio: ['pipe', 'inherit', 'inherit'] });
    const done = new Promise(r => ff.on('close', r));
    for (let f = w * per; f < Math.min(frames, (w + 1) * per); f++) {
      const buf = await grab(page, f / fps);
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 300 === 0) console.log(`worker ${w}: frame ${f}`);
    }
    ff.stdin.end(); await done; await page.close();
  }));
  writeFileSync(join(tmp, 'list.txt'), [...Array(workers)].map((_, w) => `file 'p${w}.mp4'`).join('\n'));
  await new Promise(r => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', join(tmp, 'list.txt'), '-c', 'copy', outFile], { stdio: 'inherit' }).on('close', r));
  console.log('wrote', outFile);
}
await browser.close();
