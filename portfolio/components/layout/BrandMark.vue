<script setup lang="ts">
import { profile } from '~/data/profile'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <a
    href="#top"
    class="group inline-flex items-center gap-2.5 rounded-pill py-1 pr-2"
    :aria-label="`${profile.name} — back to top`"
  >
    <span
      class="grid h-9 w-9 place-items-center rounded-xl font-display text-[0.8125rem] font-bold text-white transition-transform duration-500 ease-smooth group-hover:rotate-[-6deg]"
      :style="{
        background: 'linear-gradient(135deg, rgb(var(--c-violet)), rgb(var(--c-amber)))',
      }"
    >
      {{ profile.initials }}
    </span>

    <span v-if="!compact" class="hidden leading-tight sm:block">
      <span class="block font-display text-sm font-semibold tracking-tight">
        {{ profile.name }}
      </span>
      <span class="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted">
        python · ai engineer
      </span>
    </span>
  </a>
</template>
