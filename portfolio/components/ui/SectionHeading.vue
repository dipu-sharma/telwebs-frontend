<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    lead?: string
    /** Centre the block — used by the stats and contact sections */
    center?: boolean
  }>(),
  { lead: '', center: false },
)
</script>

<template>
  <header
    class="reveal max-w-2xl"
    :class="center ? 'mx-auto text-center' : ''"
    v-reveal
  >
    <p class="eyebrow flex items-center gap-3" :class="center ? 'justify-center' : ''">
      <span
        class="inline-block h-px w-8"
        :style="{ background: 'linear-gradient(90deg, rgb(var(--c-violet)), rgb(var(--c-amber)))' }"
      />
      {{ eyebrow }}
    </p>

    <h2 class="mt-4 text-display-lg">
      <slot name="title">{{ title }}</slot>
    </h2>

    <p v-if="lead" class="mt-4 text-base leading-relaxed text-muted sm:text-lg">
      {{ lead }}
    </p>

    <slot />
  </header>
</template>
