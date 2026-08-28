<script setup lang="ts">
/**
 * Soft violet spotlight trailing the pointer. Eased toward the cursor
 * rather than pinned to it, which reads as atmosphere instead of a
 * gimmick. Disabled for touch input and reduced-motion users.
 */
const enabled = ref(false)
const el = ref<HTMLElement | null>(null)

let target = { x: 0, y: 0 }
let current = { x: 0, y: 0 }
let frame = 0
let started = false

const onMove = (e: PointerEvent) => {
  target = { x: e.clientX, y: e.clientY }
  if (!started) {
    started = true
    current = { ...target }
    if (el.value) el.value.style.opacity = '1'
  }
}

const tick = () => {
  current.x += (target.x - current.x) * 0.12
  current.y += (target.y - current.y) * 0.12
  if (el.value) {
    el.value.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`
  }
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  const fine = window.matchMedia('(pointer: fine)').matches
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!fine || reduce) return

  enabled.value = true
  nextTick(() => {
    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('pointermove', onMove)
})
</script>

<template>
  <div
    v-if="enabled"
    ref="el"
    class="cursor-glow"
    style="opacity: 0"
    aria-hidden="true"
  />
</template>
