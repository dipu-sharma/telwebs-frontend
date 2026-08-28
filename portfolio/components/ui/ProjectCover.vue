<script setup lang="ts">
/**
 * Generated cover art. These are client codebases with no public
 * screenshots, so rather than grey image placeholders each project gets a
 * deterministic composition: a two-stop mesh gradient tinted by its accent,
 * a technical dot grid, and its glyph. Consistent, and it never 404s.
 */
const props = withDefaults(
  defineProps<{
    icon: string
    accent: 'violet' | 'amber' | 'mixed'
    index?: number
    compact?: boolean
  }>(),
  { index: 0, compact: false },
)

const gradient = computed(() => {
  switch (props.accent) {
    case 'violet':
      return 'radial-gradient(120% 120% at 12% 8%, rgb(var(--c-violet) / 0.42), transparent 58%), radial-gradient(100% 100% at 88% 92%, rgb(var(--c-violet) / 0.2), transparent 60%)'
    case 'amber':
      return 'radial-gradient(120% 120% at 12% 8%, rgb(var(--c-amber) / 0.38), transparent 58%), radial-gradient(100% 100% at 88% 92%, rgb(var(--c-amber) / 0.18), transparent 60%)'
    default:
      return 'radial-gradient(120% 120% at 10% 6%, rgb(var(--c-violet) / 0.42), transparent 56%), radial-gradient(110% 110% at 92% 94%, rgb(var(--c-amber) / 0.34), transparent 58%)'
  }
})
</script>

<template>
  <div
    class="relative overflow-hidden border-b border-line/70 bg-elevated"
    :class="compact ? 'aspect-[16/7]' : 'aspect-[16/9]'"
  >
    <div class="absolute inset-0" :style="{ background: gradient }" />

    <!-- Technical dot grid -->
    <div
      class="absolute inset-0 opacity-[0.5]"
      :style="{
        backgroundImage:
          'radial-gradient(rgb(var(--c-ink) / 0.16) 1px, transparent 1px)',
        backgroundSize: '14px 14px',
      }"
    />

    <!-- Glyph -->
    <div class="absolute inset-0 grid place-items-center">
      <AppIcon
        :name="icon"
        :size="compact ? 44 : 58"
        :stroke="1.1"
        class="text-ink/55 transition-transform duration-700 ease-smooth group-hover:scale-[1.07]"
      />
    </div>

    <span
      v-if="index"
      class="absolute bottom-3 right-3.5 font-mono text-[0.625rem] tabular-nums text-ink/35"
    >
      {{ String(index).padStart(2, '0') }}
    </span>
  </div>
</template>
