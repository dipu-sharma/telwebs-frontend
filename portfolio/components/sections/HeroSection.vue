<script setup lang="ts">
import { profile } from '~/data/profile'
import { skillTicker } from '~/data/skills'
</script>

<template>
  <section id="top" class="relative flex min-h-[100svh] items-center pb-14 pt-28 lg:pb-20 lg:pt-32">
    <div class="shell w-full">
      <div class="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <!-- ── Left: the pitch ───────────────────────────────────────── -->
        <div>
          <p class="glass reveal inline-flex items-center gap-2.5 rounded-pill px-3.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted"
            v-reveal>
            <span class="relative flex h-1.5 w-1.5">
              <span
                class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-pulse-ring" />
              <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {{ profile.availability }}
          </p>

          <h1 class="reveal mt-6 text-display-xl" v-reveal="60">
            <span class="block">Dipu Kumar</span>
            <span class="block gradient-text">Sharma</span>
          </h1>

          <p class="reveal mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[0.8125rem] text-muted"
            v-reveal="140">
            <template v-for="(title, i) in profile.titles" :key="title">
              <span v-if="i > 0" class="text-violet" aria-hidden="true">/</span>
              <span>{{ title }}</span>
            </template>
          </p>

          <p class="reveal mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" v-reveal="200">
            {{ profile.tagline }}
          </p>

          <div class="reveal mt-9 flex flex-wrap items-center gap-3" v-reveal="260">
            <a href="#projects" class="btn btn-primary">
              View projects
              <AppIcon name="arrowRight" :size="16" />
            </a>
            <a :href="profile.resumePath" download class="btn btn-ghost">
              <AppIcon name="download" :size="16" />
              Download Resume
            </a>
            <a href="#contact" class="btn btn-quiet">Contact me</a>
          </div>

          <dl class="reveal mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-xs text-muted"
            v-reveal="320">
            <div class="flex items-center gap-2">
              <dt class="sr-only">Location</dt>
              <AppIcon name="mapPin" :size="14" />
              <dd>{{ profile.location }}</dd>
            </div>
            <div class="flex items-center gap-2">
              <dt class="sr-only">Email</dt>
              <AppIcon name="mail" :size="14" />
              <dd>
                <a :href="`mailto:${profile.email}`" class="transition-colors duration-300 hover:text-ink">
                  {{ profile.email }}
                </a>
              </dd>
            </div>
            <div class="flex items-center gap-2">
              <dt class="sr-only">Experience</dt>
              <AppIcon name="briefcase" :size="14" />
              <dd>6+ years</dd>
            </div>
          </dl>
        </div>

        <!-- ── Right: the signature visual ───────────────────────────── -->
        <div class="reveal" v-reveal="180">
          <div class="card overflow-hidden">
            <div class="flex items-center gap-2 border-b border-line/70 px-4 py-2.5">
              <span class="flex gap-1.5" aria-hidden="true">
                <span class="h-2 w-2 rounded-full bg-ink/20" />
                <span class="h-2 w-2 rounded-full bg-ink/20" />
                <span class="h-2 w-2 rounded-full bg-ink/20" />
              </span>
              <p class="ml-1 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
                rag-pipeline
                <span class="text-violet">· live</span>
              </p>
            </div>

            <div class="h-[22rem] sm:h-[26rem] lg:h-[30rem]">
              <RagCanvas />
            </div>
          </div>
        </div>
      </div>

      <!-- ── Stack ticker ────────────────────────────────────────────── -->
      <div class="reveal mask-x mt-16 lg:mt-20" v-reveal="380">
        <div class="flex w-max motion-safe:animate-marquee">
          <ul v-for="copy in 2" :key="copy" class="flex items-center gap-8 pr-8"
            :aria-hidden="copy === 2 ? 'true' : undefined">
            <li v-for="item in skillTicker" :key="`${copy}-${item}`"
              class="flex items-center gap-8 whitespace-nowrap font-mono text-xs text-muted">
              {{ item }}
              <span class="h-1 w-1 rounded-full bg-violet/50" aria-hidden="true" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
