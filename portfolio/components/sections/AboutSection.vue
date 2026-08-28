<script setup lang="ts">
import { profile } from '~/data/profile'
</script>

<template>
  <section id="about" class="section">
    <div class="shell">
      <SectionHeading
        eyebrow="About"
        title="Six years of shipping the part users never see"
        :lead="profile.about.lead"
      />

      <div class="mt-14 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <!-- Prose -->
        <div class="space-y-5">
          <p
            v-for="(para, i) in profile.about.body"
            :key="i"
            class="reveal leading-relaxed text-muted"
            v-reveal="i * 80"
          >
            {{ para }}
          </p>

          <div class="reveal grid gap-4 pt-4 sm:grid-cols-2" v-reveal="240">
            <div
              v-for="s in profile.about.strengths"
              :key="s.title"
              class="card card-hover p-5"
            >
              <span
                class="grid h-9 w-9 place-items-center rounded-xl text-violet"
                :style="{ background: 'rgb(var(--c-violet) / 0.12)' }"
              >
                <AppIcon :name="s.icon" :size="17" />
              </span>
              <h3 class="mt-3.5 font-display text-[0.9375rem] font-semibold">
                {{ s.title }}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-muted">{{ s.body }}</p>
            </div>
          </div>
        </div>

        <!-- Portrait + credentials -->
        <div class="space-y-6">
          <figure class="reveal card overflow-hidden" v-reveal="120">
            <img
              :src="profile.photoPath"
              :alt="`Portrait of ${profile.name}`"
              width="1052"
              height="1298"
              loading="lazy"
              decoding="async"
              class="aspect-[4/5] w-full object-cover object-top"
            />
            <figcaption
              class="flex items-center justify-between gap-3 border-t border-line/70 px-4 py-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-muted"
            >
              <span>{{ profile.name }}</span>
              <span class="text-violet">{{ profile.location }}</span>
            </figcaption>
          </figure>

          <div class="reveal card p-5" v-reveal="180">
            <h3 class="eyebrow flex items-center gap-2">
              <AppIcon name="graduation" :size="14" />
              Education
            </h3>
            <ul class="mt-4 space-y-4">
              <li v-for="e in profile.education" :key="e.degree">
                <p class="text-sm font-medium leading-snug">{{ e.degree }}</p>
                <p class="mt-1 text-xs leading-relaxed text-muted">
                  {{ e.institution }} · {{ e.location }}
                </p>
                <p class="mt-1 font-mono text-[0.6875rem] text-violet">{{ e.year }}</p>
              </li>
            </ul>
          </div>

          <div class="reveal card p-5" v-reveal="220">
            <h3 class="eyebrow flex items-center gap-2">
              <AppIcon name="award" :size="14" />
              Certifications
            </h3>
            <ul class="mt-4 space-y-3">
              <li
                v-for="c in profile.certifications"
                :key="c.name"
                class="flex items-baseline justify-between gap-4"
              >
                <span class="text-sm leading-snug">{{ c.name }}</span>
                <span class="shrink-0 font-mono text-[0.625rem] text-muted">
                  {{ c.issuer }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
