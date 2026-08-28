<script setup lang="ts">
const { theme, toggle, init } = useTheme()

onMounted(init)

const label = computed(() =>
  theme.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
)
</script>

<template>
  <button
    type="button"
    class="btn btn-ghost btn-sm relative h-9 w-9 !px-0"
    :aria-label="label"
    :title="label"
    @click="toggle"
  >
    <Transition
      enter-active-class="transition duration-300 ease-smooth"
      enter-from-class="opacity-0 rotate-90 scale-50"
      leave-active-class="transition duration-200 ease-smooth absolute"
      leave-to-class="opacity-0 -rotate-90 scale-50"
      mode="out-in"
    >
      <AppIcon v-if="theme === 'dark'" key="moon" name="moon" :size="17" />
      <AppIcon v-else key="sun" name="sun" :size="17" />
    </Transition>
  </button>
</template>
