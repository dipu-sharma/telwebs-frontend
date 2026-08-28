<script setup lang="ts">
import { testimonials } from '~/data/testimonials'
</script>

<template>
  <section class="section">
    <div class="shell">
      <SectionHeading
        eyebrow="References"
        title="What it's like to work with me"
        lead="Illustrative quotes drawn from the kind of feedback these projects generated — real named references available on request."
      />

      <div class="mt-14 grid gap-5 lg:grid-cols-3">
        <figure
          v-for="(t, i) in testimonials"
          :key="t.id"
          class="card card-hover reveal flex flex-col p-6 sm:p-7"
          v-reveal="i * 90"
        >
          <span
            class="font-display text-5xl leading-none text-violet/35"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote class="mt-2 flex-1">
            <p class="leading-relaxed">{{ t.quote }}</p>
          </blockquote>

          <figcaption class="mt-6 flex items-center gap-3 border-t border-line/70 pt-5">
            <span
              class="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-[0.625rem] font-semibold tracking-wider text-violet"
              :style="{ background: 'rgb(var(--c-violet) / 0.14)' }"
              aria-hidden="true"
            >
              {{ t.initials }}
            </span>
            <span class="min-w-0">
              <span class="block text-sm font-medium">{{ t.author }}</span>
              <span class="mt-0.5 block font-mono text-[0.625rem] text-muted">
                {{ t.role }}
              </span>
            </span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
