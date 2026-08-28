<script setup lang="ts">
const visible = ref(false)
let frame = 0

const check = () => {
  visible.value = window.scrollY > 700
}

const onScroll = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(check)
}

const toTop = () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  check()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-400 ease-smooth"
    enter-from-class="opacity-0 translate-y-3"
    leave-active-class="transition duration-300 ease-smooth"
    leave-to-class="opacity-0 translate-y-3"
  >
    <button
      v-if="visible"
      type="button"
      class="btn btn-ghost fixed bottom-6 right-5 z-40 h-11 w-11 !px-0 sm:bottom-8 sm:right-8"
      aria-label="Back to top"
      title="Back to top"
      @click="toTop"
    >
      <AppIcon name="arrowUp" :size="18" />
    </button>
  </Transition>
</template>
