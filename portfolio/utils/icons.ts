/**
 * Hand-drawn 24×24 icon primitives.
 *
 * Kept local rather than pulling an icon package: it removes a dependency,
 * keeps the bundle tiny, and every glyph is authored at the same optical
 * weight (1.6px stroke, round joins) so the set feels coherent.
 */
export type IconPart =
  | { t: 'path'; d: string }
  | { t: 'circle'; cx: number; cy: number; r: number }
  | { t: 'rect'; x: number; y: number; w: number; h: number; rx: number }
  | { t: 'line'; x1: number; y1: number; x2: number; y2: number }

export const icons: Record<string, IconPart[]> = {
  // ── Structure / abstract ────────────────────────────────────────────
  layers: [
    { t: 'path', d: 'M12 3 3 7.5l9 4.5 9-4.5L12 3Z' },
    { t: 'path', d: 'M3 12l9 4.5 9-4.5' },
    { t: 'path', d: 'M3 16.5 12 21l9-4.5' },
  ],
  sparkles: [
    { t: 'path', d: 'M11 3.5l1.5 4.2 4.2 1.5-4.2 1.5L11 15l-1.5-4.3L5.3 9.2l4.2-1.5L11 3.5Z' },
    { t: 'path', d: 'M18 14.5l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z' },
  ],
  grid: [
    { t: 'rect', x: 3, y: 3, w: 7, h: 7, rx: 1.5 },
    { t: 'rect', x: 14, y: 3, w: 7, h: 7, rx: 1.5 },
    { t: 'rect', x: 3, y: 14, w: 7, h: 7, rx: 1.5 },
    { t: 'rect', x: 14, y: 14, w: 7, h: 7, rx: 1.5 },
  ],
  workflow: [
    { t: 'rect', x: 3, y: 3, w: 6.5, h: 6.5, rx: 1.5 },
    { t: 'rect', x: 14.5, y: 14.5, w: 6.5, h: 6.5, rx: 1.5 },
    { t: 'path', d: 'M6.25 9.5v5.25a3 3 0 0 0 3 3h5.25' },
  ],
  trending: [
    { t: 'path', d: 'M3 17l6-6 4 4 8-8' },
    { t: 'path', d: 'M15 7h6v6' },
  ],
  gauge: [
    { t: 'path', d: 'M4 18a8 8 0 1 1 16 0' },
    { t: 'line', x1: 12, y1: 18, x2: 16.5, y2: 10.5 },
    { t: 'circle', cx: 12, cy: 18, r: 1.4 },
  ],

  // ── Infrastructure ──────────────────────────────────────────────────
  server: [
    { t: 'rect', x: 2.5, y: 3.5, w: 19, h: 7, rx: 2 },
    { t: 'rect', x: 2.5, y: 13.5, w: 19, h: 7, rx: 2 },
    { t: 'circle', cx: 6.5, cy: 7, r: 0.6 },
    { t: 'circle', cx: 6.5, cy: 17, r: 0.6 },
  ],
  database: [
    { t: 'path', d: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Z' },
    { t: 'path', d: 'M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6' },
    { t: 'path', d: 'M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6' },
  ],
  cloud: [
    { t: 'path', d: 'M7 18h9.5a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.7-1.2A4 4 0 0 0 7 18Z' },
  ],
  terminal: [
    { t: 'rect', x: 2.5, y: 4, w: 19, h: 16, rx: 2.5 },
    { t: 'path', d: 'm6.5 10 2.5 2.5-2.5 2.5' },
    { t: 'line', x1: 12, y1: 15, x2: 17.5, y2: 15 },
  ],
  window: [
    { t: 'rect', x: 2.5, y: 4, w: 19, h: 16, rx: 2.5 },
    { t: 'line', x1: 2.5, y1: 9, x2: 21.5, y2: 9 },
    { t: 'circle', cx: 6.2, cy: 6.5, r: 0.55 },
    { t: 'circle', cx: 8.8, cy: 6.5, r: 0.55 },
  ],
  bolt: [{ t: 'path', d: 'M13 2 4.5 13.5H11l-1 8.5L18.5 10H12l1-8Z' }],
  wrench: [
    { t: 'line', x1: 4, y1: 6, x2: 20, y2: 6 },
    { t: 'circle', cx: 9, cy: 6, r: 2 },
    { t: 'line', x1: 4, y1: 12, x2: 20, y2: 12 },
    { t: 'circle', cx: 15, cy: 12, r: 2 },
    { t: 'line', x1: 4, y1: 18, x2: 20, y2: 18 },
    { t: 'circle', cx: 8, cy: 18, r: 2 },
  ],
  plug: [
    { t: 'path', d: 'M9 3v6M15 3v6' },
    { t: 'path', d: 'M6 9h12v3a6 6 0 0 1-12 0V9Z' },
    { t: 'line', x1: 12, y1: 18, x2: 12, y2: 21 },
  ],
  shield: [
    { t: 'path', d: 'M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z' },
    { t: 'path', d: 'm9 12 2 2 4-4' },
  ],
  lock: [
    { t: 'rect', x: 4, y: 10, w: 16, h: 11, rx: 2.5 },
    { t: 'path', d: 'M8 10V7.5a4 4 0 0 1 8 0V10' },
  ],
  bot: [
    { t: 'rect', x: 4, y: 8, w: 16, h: 12, rx: 3 },
    { t: 'circle', cx: 9.2, cy: 14, r: 1.2 },
    { t: 'circle', cx: 14.8, cy: 14, r: 1.2 },
    { t: 'path', d: 'M12 4.5V8' },
    { t: 'circle', cx: 12, cy: 3.2, r: 1.2 },
    { t: 'path', d: 'M4 13H2M20 13h2' },
  ],

  // ── Project glyphs ──────────────────────────────────────────────────
  documentSearch: [
    { t: 'path', d: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4' },
    { t: 'path', d: 'M14 3l5 5v3' },
    { t: 'path', d: 'M13.5 3v5.5H19' },
    { t: 'circle', cx: 16, cy: 16.5, r: 3 },
    { t: 'line', x1: 18.3, y1: 18.8, x2: 20.5, y2: 21 },
  ],
  card: [
    { t: 'rect', x: 2.5, y: 5, w: 19, h: 14, rx: 2.5 },
    { t: 'line', x1: 2.5, y1: 10, x2: 21.5, y2: 10 },
    { t: 'line', x1: 6, y1: 14.5, x2: 10, y2: 14.5 },
  ],
  building: [
    { t: 'rect', x: 4, y: 3, w: 16, h: 18, rx: 1.5 },
    { t: 'path', d: 'M8.5 7h2.5M13 7h2.5M8.5 11h2.5M13 11h2.5M8.5 15h2.5M13 15h2.5' },
    { t: 'path', d: 'M10 21v-2.5h4V21' },
  ],
  chart: [
    { t: 'line', x1: 3.5, y1: 20, x2: 20.5, y2: 20 },
    { t: 'path', d: 'M6.5 20v-5M11 20v-9M15.5 20v-6M20 20v-11' },
  ],
  file: [
    { t: 'path', d: 'M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6Z' },
    { t: 'path', d: 'M12.5 3v6.5H19' },
    { t: 'path', d: 'M9 13.5h5M9 17h3.5' },
  ],
  box: [
    { t: 'path', d: 'M21 8 12 3 3 8v8l9 5 9-5V8Z' },
    { t: 'path', d: 'M3 8l9 5 9-5' },
    { t: 'line', x1: 12, y1: 13, x2: 12, y2: 21 },
  ],
  chat: [
    { t: 'path', d: 'M20 15a3 3 0 0 1-3 3H8.5L4 21V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v9Z' },
    { t: 'path', d: 'M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01' },
  ],
  gavel: [
    { t: 'path', d: 'M14 3.5l6.5 6.5-3 3L11 6.5l3-3Z' },
    { t: 'path', d: 'M11.5 7.5 4 15l3 3 7.5-7.5' },
    { t: 'line', x1: 3, y1: 21, x2: 13, y2: 21 },
  ],
  warehouse: [
    { t: 'path', d: 'M3 21V10l9-5 9 5v11' },
    { t: 'path', d: 'M8 21v-7h8v7' },
    { t: 'line', x1: 2.5, y1: 21, x2: 21.5, y2: 21 },
  ],
  link: [
    { t: 'path', d: 'M10.5 13.5a4.5 4.5 0 0 0 6.4 0l2-2a4.5 4.5 0 0 0-6.4-6.4l-1 1' },
    { t: 'path', d: 'M13.5 10.5a4.5 4.5 0 0 0-6.4 0l-2 2a4.5 4.5 0 0 0 6.4 6.4l1-1' },
  ],
  dna: [
    { t: 'path', d: 'M8 3c0 4 8 5 8 9s-8 5-8 9' },
    { t: 'path', d: 'M16 3c0 4-8 5-8 9s8 5 8 9' },
    { t: 'path', d: 'M9.2 7h5.6M10.4 11h3.2M9.2 15h5.6' },
  ],
  pill: [
    { t: 'path', d: 'M10.5 3.5 3.5 10.5a5 5 0 0 0 7 7l7-7a5 5 0 0 0-7-7Z' },
    { t: 'path', d: 'm7 7 7 7' },
  ],
  folder: [
    { t: 'path', d: 'M3 7a2 2 0 0 1 2-2h3.8l2 2.5H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z' },
  ],
  briefcase: [
    { t: 'rect', x: 3, y: 7, w: 18, h: 13, rx: 2.5 },
    { t: 'path', d: 'M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7' },
    { t: 'line', x1: 3, y1: 12, x2: 21, y2: 12 },
  ],
  graduation: [
    { t: 'path', d: 'M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z' },
    { t: 'path', d: 'M6.5 11v4.3c0 1.5 2.5 2.7 5.5 2.7s5.5-1.2 5.5-2.7V11' },
  ],
  award: [
    { t: 'circle', cx: 12, cy: 9, r: 5 },
    { t: 'path', d: 'M9 13.4 7.5 21l4.5-2.6L16.5 21 15 13.4' },
  ],
  users: [
    { t: 'circle', cx: 9.5, cy: 8, r: 3.2 },
    { t: 'path', d: 'M3.5 20c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6' },
    { t: 'path', d: 'M16 5.3a3.2 3.2 0 0 1 0 5.4' },
    { t: 'path', d: 'M18 14.9c1.9.8 2.9 2.6 2.9 5.1' },
  ],

  // ── Social / actions ────────────────────────────────────────────────
  git: [
    { t: 'circle', cx: 6, cy: 5, r: 2.2 },
    { t: 'circle', cx: 6, cy: 19, r: 2.2 },
    { t: 'circle', cx: 18, cy: 8.5, r: 2.2 },
    { t: 'path', d: 'M6 7.2v9.6' },
    { t: 'path', d: 'M18 10.7c0 3.2-3.4 3.6-6.6 4.6' },
  ],
  linkedin: [
    { t: 'rect', x: 3, y: 3, w: 18, h: 18, rx: 3 },
    { t: 'line', x1: 7.6, y1: 10.5, x2: 7.6, y2: 16.5 },
    { t: 'circle', cx: 7.6, cy: 7.7, r: 1 },
    { t: 'path', d: 'M11.6 16.5v-6' },
    { t: 'path', d: 'M11.6 13.2c0-1.6 1.1-2.7 2.6-2.7s2.7 1.1 2.7 2.7v3.3' },
  ],
  mail: [
    { t: 'rect', x: 2.5, y: 5, w: 19, h: 14, rx: 2.5 },
    { t: 'path', d: 'm3.5 7.5 8.5 5.5 8.5-5.5' },
  ],
  phone: [
    { t: 'path', d: 'M6 3h3l2 5-2.5 1.6a11 11 0 0 0 5.4 5.4L15.5 12.5l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z' },
  ],
  mapPin: [
    { t: 'path', d: 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z' },
    { t: 'circle', cx: 12, cy: 10, r: 2.5 },
  ],
  download: [
    { t: 'path', d: 'M12 3.5v11.5' },
    { t: 'path', d: 'm7.5 10.5 4.5 4.5 4.5-4.5' },
    { t: 'path', d: 'M5 20h14' },
  ],
  send: [
    { t: 'path', d: 'M21 3 3 10.5l7 3 3 7L21 3Z' },
    { t: 'path', d: 'M10 13.5 21 3' },
  ],
  arrowUp: [
    { t: 'path', d: 'M12 20V5' },
    { t: 'path', d: 'm6 11 6-6 6 6' },
  ],
  arrowRight: [
    { t: 'path', d: 'M4 12h15' },
    { t: 'path', d: 'm13 6 6 6-6 6' },
  ],
  external: [
    { t: 'path', d: 'M14 4h6v6' },
    { t: 'path', d: 'M20 4 11.5 12.5' },
    { t: 'path', d: 'M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4' },
  ],
  sun: [
    { t: 'circle', cx: 12, cy: 12, r: 4 },
    { t: 'path', d: 'M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6' },
  ],
  moon: [
    { t: 'path', d: 'M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z' },
  ],
  menu: [{ t: 'path', d: 'M4 7h16M4 12h16M4 17h16' }],
  close: [{ t: 'path', d: 'M6 6l12 12M18 6 6 18' }],
  check: [{ t: 'path', d: 'm5 13 4 4 10-10' }],
  alert: [
    { t: 'circle', cx: 12, cy: 12, r: 9 },
    { t: 'path', d: 'M12 7.5V13' },
    { t: 'path', d: 'M12 16.3h.01' },
  ],
  star: [
    { t: 'path', d: 'm12 3.5 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L12 3.5Z' },
  ],
  code: [
    { t: 'path', d: 'm8 8-4 4 4 4' },
    { t: 'path', d: 'm16 8 4 4-4 4' },
    { t: 'path', d: 'M13.5 6l-3 12' },
  ],
  copy: [
    { t: 'rect', x: 9, y: 9, w: 11, h: 11, rx: 2 },
    { t: 'path', d: 'M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3' },
  ],
}

export const hasIcon = (name: string): boolean => name in icons
