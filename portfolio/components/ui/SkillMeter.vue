<script setup lang="ts">
/**
 * Segmented proficiency meter. Reads as a terminal gauge rather than a
 * generic progress bar — five discrete blocks, filled ones carry the
 * violet→amber gradient.
 */
const props = withDefaults(
  defineProps<{
    level: number
    max?: number
    label?: string
  }>(),
  { max: 5, label: '' },
)

const segments = computed(() =>
  Array.from({ length: props.max }, (_, i) => i < props.level),
)
</script>

<template>
  <span
    class="inline-flex items-center gap-[3px]"
    role="img"
    :aria-label="label ? `${label}: ${level} of ${max}` : `${level} of ${max}`"
  >
    <span
      v-for="(filled, i) in segments"
      :key="i"
      class="h-[3px] w-[7px] rounded-full transition-colors duration-300"
      :class="filled ? '' : 'bg-ink/15'"
      :style="
        filled
          ? {
              background:
                'linear-gradient(90deg, rgb(var(--c-violet)), rgb(var(--c-amber)))',
            }
          : undefined
      "
    />
  </span>
</template>
