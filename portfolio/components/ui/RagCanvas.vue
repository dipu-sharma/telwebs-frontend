<script setup lang="ts">
/**
 * The hero's signature visual: a live agentic RAG pipeline.
 *
 * A query packet travels query → embed → vector store → LLM → response.
 * When it reaches the store, the nearest vectors in the ambient mesh light
 * up and feed their lines into the model — which is, roughly, the thing I
 * actually build. Pointer position nudges the mesh.
 *
 * Zero dependencies. Colours are read from the CSS custom properties so it
 * follows the theme. Falls back to a single static frame when the visitor
 * prefers reduced motion, and pauses entirely when scrolled out of view.
 */

interface Node {
  id: string
  x: number
  y: number
  label: string
  /** Which side the DOM label sits on */
  align: 'left' | 'right'
  pulse: number
}

interface MeshPoint {
  x: number
  y: number
  vx: number
  vy: number
  hot: number
}

interface Packet {
  t: number
  seg: number
}

const wrap = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)

/** Normalised (0–1) so the DOM labels can share the same coordinates. */
const nodes = reactive<Node[]>([
  { id: 'query', x: 0.12, y: 0.14, label: 'query', align: 'right', pulse: 0 },
  { id: 'embed', x: 0.44, y: 0.29, label: 'embed', align: 'right', pulse: 0 },
  { id: 'store', x: 0.22, y: 0.63, label: 'vector store', align: 'right', pulse: 0 },
  { id: 'llm', x: 0.70, y: 0.56, label: 'llm', align: 'left', pulse: 0 },
  { id: 'answer', x: 0.86, y: 0.88, label: 'response', align: 'left', pulse: 0 },
])

let ctx: CanvasRenderingContext2D | null = null
let width = 0
let height = 0
let dpr = 1
let frame = 0
let running = false
let lastTime = 0

let mesh: MeshPoint[] = []
let packets: Packet[] = []
let segLengths: number[] = []
let totalLength = 0

const pointer = { x: -9999, y: -9999, active: false }

// Theme colours, parsed from CSS variables into RGB triples
let cViolet: [number, number, number] = [124, 92, 255]
let cAmber: [number, number, number] = [255, 138, 61]
let cInk: [number, number, number] = [237, 235, 245]

const parseTriple = (raw: string, fallback: [number, number, number]) => {
  const parts = raw.trim().split(/[\s,]+/).map(Number)
  return parts.length === 3 && parts.every((n) => Number.isFinite(n))
    ? (parts as [number, number, number])
    : fallback
}

const readColors = () => {
  if (!import.meta.client) return
  const s = getComputedStyle(document.documentElement)
  cViolet = parseTriple(s.getPropertyValue('--c-violet'), cViolet)
  cAmber = parseTriple(s.getPropertyValue('--c-amber'), cAmber)
  cInk = parseTriple(s.getPropertyValue('--c-ink'), cInk)
}

const rgba = (c: [number, number, number], a: number) =>
  `rgba(${c[0]},${c[1]},${c[2]},${a})`

/** Pixel position of a normalised node. */
const px = (n: { x: number; y: number }) => ({ x: n.x * width, y: n.y * height })

const measurePath = () => {
  segLengths = []
  totalLength = 0
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = px(nodes[i])
    const b = px(nodes[i + 1])
    const len = Math.hypot(b.x - a.x, b.y - a.y)
    segLengths.push(len)
    totalLength += len
  }
}

/** Map 0–1 along the whole path to a point, keeping speed constant. */
const pointAt = (t: number) => {
  let travelled = t * totalLength
  for (let i = 0; i < segLengths.length; i++) {
    if (travelled <= segLengths[i] || i === segLengths.length - 1) {
      const local = segLengths[i] === 0 ? 0 : travelled / segLengths[i]
      const a = px(nodes[i])
      const b = px(nodes[i + 1])
      return {
        x: a.x + (b.x - a.x) * local,
        y: a.y + (b.y - a.y) * local,
        seg: i,
      }
    }
    travelled -= segLengths[i]
  }
  const last = px(nodes[nodes.length - 1])
  return { x: last.x, y: last.y, seg: segLengths.length - 1 }
}

const seedMesh = () => {
  // Density scales with area but stays bounded for cheap frames
  const count = Math.max(26, Math.min(56, Math.round((width * height) / 9000)))
  mesh = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.09,
    vy: (Math.random() - 0.5) * 0.09,
    hot: 0,
  }))
}

const resize = () => {
  if (!canvas.value || !wrap.value) return
  const rect = wrap.value.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return

  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = rect.width
  height = rect.height

  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  canvas.value.style.width = `${width}px`
  canvas.value.style.height = `${height}px`

  ctx = canvas.value.getContext('2d')
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)

  measurePath()
  seedMesh()
}

/** Light up the vectors closest to the store node. */
const triggerRetrieval = () => {
  const store = px(nodes[2])
  const ranked = mesh
    .map((p, i) => ({ i, d: Math.hypot(p.x - store.x, p.y - store.y) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 4)
  for (const { i } of ranked) mesh[i].hot = 1
}

const draw = (dt: number) => {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  // ── Ambient vector mesh ──────────────────────────────────────────────
  for (const p of mesh) {
    p.x += p.vx * dt
    p.y += p.vy * dt

    // Gentle pointer repulsion
    if (pointer.active) {
      const dx = p.x - pointer.x
      const dy = p.y - pointer.y
      const d2 = dx * dx + dy * dy
      if (d2 < 14000 && d2 > 1) {
        const f = (1 - d2 / 14000) * 0.55
        const d = Math.sqrt(d2)
        p.x += (dx / d) * f * dt
        p.y += (dy / d) * f * dt
      }
    }

    // Wrap at the edges
    if (p.x < -10) p.x = width + 10
    if (p.x > width + 10) p.x = -10
    if (p.y < -10) p.y = height + 10
    if (p.y > height + 10) p.y = -10

    if (p.hot > 0) p.hot = Math.max(0, p.hot - dt * 0.0011)
  }

  // Constellation links
  ctx.lineWidth = 1
  for (let i = 0; i < mesh.length; i++) {
    for (let j = i + 1; j < mesh.length; j++) {
      const dx = mesh[i].x - mesh[j].x
      const dy = mesh[i].y - mesh[j].y
      const d2 = dx * dx + dy * dy
      if (d2 > 9600) continue
      const strength = 1 - d2 / 9600
      ctx.strokeStyle = rgba(cInk, strength * 0.09)
      ctx.beginPath()
      ctx.moveTo(mesh[i].x, mesh[i].y)
      ctx.lineTo(mesh[j].x, mesh[j].y)
      ctx.stroke()
    }
  }

  // Vector dots — retrieved ones glow amber and wire into the model
  const llm = px(nodes[3])
  for (const p of mesh) {
    if (p.hot > 0) {
      ctx.strokeStyle = rgba(cAmber, p.hot * 0.5)
      ctx.lineWidth = 1.1
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(llm.x, llm.y)
      ctx.stroke()

      ctx.fillStyle = rgba(cAmber, 0.35 + p.hot * 0.65)
      ctx.beginPath()
      ctx.arc(p.x, p.y, 2.6 + p.hot * 1.6, 0, Math.PI * 2)
      ctx.fill()
    } else {
      ctx.fillStyle = rgba(cInk, 0.26)
      ctx.beginPath()
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // ── Pipeline path ────────────────────────────────────────────────────
  ctx.strokeStyle = rgba(cViolet, 0.28)
  ctx.lineWidth = 1.4
  ctx.setLineDash([5, 6])
  ctx.beginPath()
  const first = px(nodes[0])
  ctx.moveTo(first.x, first.y)
  for (let i = 1; i < nodes.length; i++) {
    const p = px(nodes[i])
    ctx.lineTo(p.x, p.y)
  }
  ctx.stroke()
  ctx.setLineDash([])

  // ── Packets ──────────────────────────────────────────────────────────
  for (const packet of packets) {
    const prevSeg = packet.seg
    packet.t += dt * 0.000085
    if (packet.t > 1) packet.t -= 1

    const pos = pointAt(packet.t)
    packet.seg = pos.seg

    if (pos.seg !== prevSeg) {
      // Arrived at a node — pulse it, and fire retrieval at the store
      const arrived = pos.seg
      if (nodes[arrived]) nodes[arrived].pulse = 1
      if (arrived === 2) triggerRetrieval()
    }

    // Comet trail
    for (let k = 6; k >= 1; k--) {
      const tt = packet.t - k * 0.0055
      if (tt < 0) continue
      const tp = pointAt(tt)
      ctx.fillStyle = rgba(cViolet, 0.055 * (7 - k))
      ctx.beginPath()
      ctx.arc(tp.x, tp.y, 2.1, 0, Math.PI * 2)
      ctx.fill()
    }

    const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 16)
    glow.addColorStop(0, rgba(cViolet, 0.85))
    glow.addColorStop(1, rgba(cViolet, 0))
    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 16, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, 2.6, 0, Math.PI * 2)
    ctx.fill()
  }

  // ── Nodes ────────────────────────────────────────────────────────────
  nodes.forEach((n, i) => {
    const p = px(n)
    const accent = i === 2 || i === 4 ? cAmber : cViolet

    if (n.pulse > 0) {
      n.pulse = Math.max(0, n.pulse - dt * 0.0013)
      ctx!.strokeStyle = rgba(accent, n.pulse * 0.5)
      ctx!.lineWidth = 1.4
      ctx!.beginPath()
      ctx!.arc(p.x, p.y, 11 + (1 - n.pulse) * 26, 0, Math.PI * 2)
      ctx!.stroke()
    }

    // Halo
    const halo = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 26)
    halo.addColorStop(0, rgba(accent, 0.3))
    halo.addColorStop(1, rgba(accent, 0))
    ctx!.fillStyle = halo
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, 26, 0, Math.PI * 2)
    ctx!.fill()

    // Ring + core
    ctx!.strokeStyle = rgba(accent, 0.9)
    ctx!.lineWidth = 1.6
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, 9, 0, Math.PI * 2)
    ctx!.stroke()

    ctx!.fillStyle = rgba(accent, 0.95)
    ctx!.beginPath()
    ctx!.arc(p.x, p.y, 3.4, 0, Math.PI * 2)
    ctx!.fill()
  })
}

const loop = (now: number) => {
  if (!running) return
  const dt = Math.min(now - lastTime, 48)
  lastTime = now
  draw(dt)
  frame = requestAnimationFrame(loop)
}

const start = () => {
  if (running) return
  running = true
  lastTime = performance.now()
  frame = requestAnimationFrame(loop)
}

const stop = () => {
  running = false
  cancelAnimationFrame(frame)
}

const onPointerMove = (e: PointerEvent) => {
  if (!wrap.value) return
  const r = wrap.value.getBoundingClientRect()
  pointer.x = e.clientX - r.left
  pointer.y = e.clientY - r.top
  pointer.active = true
}

const onPointerLeave = () => {
  pointer.active = false
  pointer.x = -9999
  pointer.y = -9999
}

let resizeObserver: ResizeObserver | null = null
let visibilityObserver: IntersectionObserver | null = null
let motionQuery: MediaQueryList | null = null

const { theme } = useTheme()
watch(theme, () => {
  readColors()
  if (!running) draw(16)
})

onMounted(() => {
  readColors()
  resize()

  packets = [{ t: 0, seg: 0 }, { t: 0.42, seg: 1 }, { t: 0.74, seg: 3 }]

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  if (motionQuery.matches) {
    // One static frame, with a retrieval already resolved so it reads clearly
    triggerRetrieval()
    draw(16)
  } else {
    visibilityObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start()
          else stop()
        }
      },
      { threshold: 0.05 },
    )
    if (wrap.value) visibilityObserver.observe(wrap.value)

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop()
      else if (wrap.value) start()
    })
  }

  resizeObserver = new ResizeObserver(() => {
    resize()
    if (!running) draw(16)
  })
  if (wrap.value) resizeObserver.observe(wrap.value)
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  visibilityObserver?.disconnect()
})
</script>

<template>
  <div
    ref="wrap"
    class="relative h-full w-full"
    role="img"
    aria-label="Animated diagram of a retrieval-augmented generation pipeline: a query is embedded, matched against a vector store, and passed with the retrieved context to a language model that returns a grounded response."
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <canvas ref="canvas" class="block h-full w-full" aria-hidden="true" />

    <!-- Real typography for the labels, positioned on the same coordinates -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <span
        v-for="n in nodes"
        :key="n.id"
        class="absolute whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted"
        :style="{
          left: `${n.x * 100}%`,
          top: `${n.y * 100}%`,
          transform:
            n.align === 'right'
              ? 'translate(18px, -50%)'
              : 'translate(calc(-100% - 18px), -50%)',
        }"
      >
        {{ n.label }}
      </span>
    </div>
  </div>
</template>
