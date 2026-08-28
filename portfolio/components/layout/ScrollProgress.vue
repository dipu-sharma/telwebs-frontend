<script setup lang="ts">
/** Thin gradient bar across the top showing how far down the page you are. */
const progress = ref(0)
let frame = 0

const measure = () => {
  const doc = document.documentElement
  const scrollable = doc.scrollHeight - doc.clientHeight
  progress.value = scrollable > 0 ? Math.min(doc.scrollTop / scrollable, 1) : 0
}

const onScroll = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div
    class="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
    role="progressbar"
    aria-label="Page scroll progress"
    :aria-valuenow="Math.round(progress * 100)"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div
      class="h-full origin-left"
      :style="{
        transform: `scaleX(${progress})`,
        background: 'linear-gradient(90deg, rgb(var(--c-violet)), rgb(var(--c-amber)))',
        boxShadow: '0 0 12px rgb(var(--c-violet) / 0.7)',
      }"
    />
  </div>
</template>
