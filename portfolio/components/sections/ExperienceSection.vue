<script setup lang="ts">
import { experience } from '~/data/experience'

/** Open the current role by default; the rest expand on demand. */
const open = ref<string[]>([experience[0]?.id].filter(Boolean) as string[])

const isOpen = (id: string) => open.value.includes(id)

const toggle = (id: string) => {
  open.value = isOpen(id)
    ? open.value.filter((x) => x !== id)
    : [...open.value, id]
}
</script>

<template>
  <section id="experience" class="section">
    <div class="shell">
      <SectionHeading
        eyebrow="Experience"
        title="Where the six years went"
        lead="From a first web development role automating sales reports to leading a web team and now building production AI systems. Expand any role to see what it actually involved."
      />

      <ol class="mt-14 space-y-4">
        <li
          v-for="(job, i) in experience"
          :key="job.id"
          class="reveal relative pl-8 sm:pl-12"
          v-reveal="i * 70"
        >
          <!-- Rail -->
          <span
            class="absolute left-[7px] top-6 h-full w-px bg-line sm:left-[11px]"
            :class="i === experience.length - 1 && 'hidden'"
            aria-hidden="true"
          />
          <span
            class="absolute left-0 top-[1.35rem] grid h-3.5 w-3.5 place-items-center rounded-full sm:left-1"
            :class="
              job.current
                ? 'bg-gradient-to-br from-violet to-amber'
                : 'border border-line bg-elevated'
            "
            aria-hidden="true"
          >
            <span
              v-if="job.current"
              class="absolute inset-0 rounded-full bg-violet/60 motion-safe:animate-pulse-ring"
            />
          </span>

          <article class="card overflow-hidden">
            <!-- Header is the toggle -->
            <h3>
              <button
                type="button"
                class="group flex w-full items-start gap-4 p-5 text-left sm:p-6"
                :aria-expanded="isOpen(job.id)"
                :aria-controls="`job-${job.id}`"
                @click="toggle(job.id)"
              >
                <span class="min-w-0 flex-1">
                  <span class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span class="font-display text-lg font-semibold tracking-tight">
                      {{ job.role }}
                    </span>
                    <span
                      v-if="job.current"
                      class="rounded-pill px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-amber"
                      :style="{ background: 'rgb(var(--c-amber) / 0.12)' }"
                    >
                      current
                    </span>
                  </span>

                  <span class="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[0.6875rem] text-muted">
                    <span class="text-violet">{{ job.company }}</span>
                    <span aria-hidden="true">·</span>
                    <span>{{ job.period }}</span>
                    <span aria-hidden="true">·</span>
                    <span>{{ job.duration }}</span>
                  </span>

                  <span class="mt-3 block text-sm leading-relaxed text-muted">
                    {{ job.summary }}
                  </span>
                </span>

                <span
                  class="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-400 ease-smooth group-hover:border-violet/50 group-hover:text-ink"
                  :class="isOpen(job.id) && 'rotate-180'"
                  aria-hidden="true"
                >
                  <AppIcon name="arrowRight" :size="14" class="rotate-90" />
                </span>
              </button>
            </h3>

            <Transition
              enter-active-class="grid transition-[grid-template-rows,opacity] duration-400 ease-smooth"
              enter-from-class="grid-rows-[0fr] opacity-0"
              enter-to-class="grid-rows-[1fr] opacity-100"
              leave-active-class="grid transition-[grid-template-rows,opacity] duration-250 ease-smooth"
              leave-from-class="grid-rows-[1fr] opacity-100"
              leave-to-class="grid-rows-[0fr] opacity-0"
            >
              <div v-show="isOpen(job.id)" :id="`job-${job.id}`">
                <div class="overflow-hidden">
                  <div class="border-t border-line/70 px-5 pb-6 pt-5 sm:px-6">
                    <h4 class="eyebrow">What I did</h4>
                    <ul class="mt-4 space-y-3">
                      <li
                        v-for="r in job.responsibilities"
                        :key="r"
                        class="flex gap-3 text-sm leading-relaxed text-muted"
                      >
                        <span
                          class="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-violet"
                          aria-hidden="true"
                        />
                        <span>{{ r }}</span>
                      </li>
                    </ul>

                    <div
                      class="mt-6 rounded-xl border border-line/80 p-4"
                      :style="{ background: 'rgb(var(--c-amber) / 0.05)' }"
                    >
                      <h4 class="eyebrow flex items-center gap-2 !text-amber">
                        <AppIcon name="star" :size="13" />
                        Highlight
                      </h4>
                      <p class="mt-2.5 text-sm leading-relaxed">
                        {{ job.achievement }}
                      </p>
                    </div>

                    <h4 class="eyebrow mt-6">Stack</h4>
                    <ul class="mt-3 flex flex-wrap gap-1.5">
                      <li
                        v-for="t in job.tech"
                        :key="t"
                        class="rounded-pill border border-line px-2 py-0.5 font-mono text-[0.625rem] text-muted"
                      >
                        {{ t }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Transition>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>
