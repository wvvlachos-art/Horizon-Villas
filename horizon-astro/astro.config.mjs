// @ts-check
import { defineConfig } from 'astro/config';

// Static-first build (CLAUDE_NOTES §2). Output goes to dist/ for Netlify.
// No integrations yet — Lodgify / Sanity / analytics are wired in later.
export default defineConfig({
  site: 'https://horizonvillastinos.com',
  output: 'static',
});
