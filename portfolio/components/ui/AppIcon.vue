<script setup lang="ts">
import { icons } from '~/utils/icons'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    stroke?: number
  }>(),
  { size: 20, stroke: 1.6 },
)

// Loosely typed on purpose — keeps the discriminated union out of the template.
const parts = computed<any[]>(() => icons[props.name] ?? [])
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    class="shrink-0"
  >
    <template v-for="(p, i) in parts" :key="i">
      <path v-if="p.t === 'path'" :d="p.d" />
      <circle v-else-if="p.t === 'circle'" :cx="p.cx" :cy="p.cy" :r="p.r" />
      <rect
        v-else-if="p.t === 'rect'"
        :x="p.x"
        :y="p.y"
        :width="p.w"
        :height="p.h"
        :rx="p.rx"
      />
      <line v-else-if="p.t === 'line'" :x1="p.x1" :y1="p.y1" :x2="p.x2" :y2="p.y2" />
    </template>
  </svg>
</template>
