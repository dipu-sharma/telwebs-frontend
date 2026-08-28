<script setup lang="ts">
import { stats } from '~/data/stats'
</script>

<template>
  <section class="relative py-20 sm:py-24">
    <div class="shell">
      <div class="card reveal" v-reveal>
        <div
          class="pointer-events-none absolute inset-0"
          :style="{
            background:
              'radial-gradient(70% 140% at 50% 0%, rgb(var(--c-violet) / 0.1), transparent 65%)',
          }"
          aria-hidden="true"
        />

        <!-- Hairlines come from per-cell borders pulled a pixel outside the
             card, so the internal grid is crisp at every breakpoint. -->
        <dl class="relative -ml-px -mt-px grid grid-cols-2 lg:grid-cols-5">
          <div
            v-for="stat in stats"
            :key="stat.id"
            class="border-l border-t border-line/70 px-5 py-7 text-center last:col-span-2 sm:px-6 lg:last:col-span-1"
          >
            <dd class="font-display text-display-md tabular-nums">
              <AnimatedCounter :value="stat.value" :suffix="stat.suffix" />
            </dd>
            <dt class="mt-2 text-sm font-medium">{{ stat.label }}</dt>
            <p class="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
              {{ stat.note }}
            </p>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
