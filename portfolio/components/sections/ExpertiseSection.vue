<script setup lang="ts">
import { expertiseGroups } from '~/data/expertise'
</script>

<template>
  <section id="expertise" class="section">
    <div class="shell">
      <SectionHeading
        eyebrow="Expertise"
        title="What I actually mean when I say AI engineering"
        lead="Every one of these is a thing I have had to make work under real constraints — private data that cannot leave the estate, documents that resist parsing, and users who will notice immediately when a model makes something up."
      />

      <div class="mt-14 space-y-14">
        <div v-for="group in expertiseGroups" :key="group.id">
          <div class="reveal flex flex-wrap items-baseline gap-x-4 gap-y-2" v-reveal>
            <h3 class="font-display text-xl font-semibold tracking-tight">
              {{ group.title }}
            </h3>
            <span class="font-mono text-[0.6875rem] text-muted">{{ group.caption }}</span>
            <div class="rule ml-auto hidden min-w-24 flex-1 sm:block" />
          </div>

          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="(item, i) in group.items"
              :key="item.id"
              class="card card-hover reveal group relative flex flex-col overflow-hidden p-6"
              :class="item.span === 'wide' && 'lg:col-span-2'"
              v-reveal="(i % 3) * 80"
            >
              <!-- Faint corner wash on the wide cards -->
              <div
                v-if="item.span === 'wide'"
                class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-600 ease-smooth group-hover:opacity-100"
                :style="{
                  background:
                    'radial-gradient(80% 120% at 100% 0%, rgb(var(--c-violet) / 0.1), transparent 60%)',
                }"
                aria-hidden="true"
              />

              <header class="relative flex items-start gap-3.5">
                <span
                  class="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-violet"
                  :style="{ background: 'rgb(var(--c-violet) / 0.12)' }"
                >
                  <AppIcon :name="item.icon" :size="18" />
                </span>
                <span class="min-w-0">
                  <h4 class="font-display text-[0.9375rem] font-semibold leading-snug tracking-tight">
                    {{ item.title }}
                  </h4>
                  <p class="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-amber">
                    {{ item.kicker }}
                  </p>
                </span>
              </header>

              <p
                class="relative mt-4 flex-1 leading-relaxed text-muted"
                :class="item.span === 'wide' ? 'text-sm sm:text-[0.9375rem]' : 'text-sm'"
              >
                {{ item.body }}
              </p>

              <ul class="relative mt-5 flex flex-wrap gap-1.5">
                <li
                  v-for="s in item.stack"
                  :key="s"
                  class="rounded-pill border border-line px-2 py-0.5 font-mono text-[0.625rem] text-muted"
                >
                  {{ s }}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
