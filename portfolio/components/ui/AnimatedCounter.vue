<script setup lang="ts">
/**
 * Counts up once, when it first scrolls into view. Eased so it decelerates
 * into the final number instead of stopping dead.
 */
const props = withDefaults(
  defineProps<{
    value: number
    suffix?: string
    duration?: number
  }>(),
  { suffix: '', duration: 1600 },
)

const el = ref<HTMLElement | null>(null)
const shown = ref(0)
let frame = 0
let done = false

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

const run = () => {
  if (done) return
  done = true

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = props.value
    return
  }

  const start = performance.now()
  const step = (now: number) => {
    const progress = Math.min((now - start) / props.duration, 1)
    shown.value = Math.round(easeOutCubic(progress) * props.value)
    if (progress < 1) frame = requestAnimationFrame(step)
  }
  frame = requestAnimationFrame(step)
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        run()
        observer?.disconnect()
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(el.value)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  observer?.disconnect()
})
</script>

<template>
  <span ref="el" class="tabular-nums">
    {{ shown }}<span class="accent-text">{{ suffix }}</span>
  </span>
</template>
