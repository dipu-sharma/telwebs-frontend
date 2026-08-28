<script setup lang="ts">
import { projects, projectFilters, type Project } from '~/data/projects'

const activeFilter = ref('all')
const showAll = ref(false)
const selected = ref<Project | null>(null)

const matching = computed(() =>
  activeFilter.value === 'all'
    ? projects
    : projects.filter((p) => p.filters.includes(activeFilter.value)),
)

/** Featured first, so the strongest work is above the fold of the grid. */
const ordered = computed(() => [
  ...matching.value.filter((p) => p.featured),
  ...matching.value.filter((p) => !p.featured),
])

const visible = computed(() =>
  showAll.value ? ordered.value : ordered.value.slice(0, 6),
)

const hidden = computed(() => Math.max(0, ordered.value.length - 6))

/** Only offer filters that would actually return something. */
const availableFilters = computed(() =>
  projectFilters.filter(
    (f) => f.key === 'all' || projects.some((p) => p.filters.includes(f.key)),
  ),
)

const countFor = (key: string) =>
  key === 'all'
    ? projects.length
    : projects.filter((p) => p.filters.includes(key)).length

const setFilter = (key: string) => {
  activeFilter.value = key
  showAll.value = false
}
</script>

<template>
  <section id="projects" class="section">
    <div class="shell">
      <SectionHeading
        eyebrow="Selected work"
        title="Fifteen systems that shipped"
        lead="Client and product work from the last six years — document AI, payment rails, approval engines, high-throughput parsers. These are private codebases, so what you get here is an honest account of what I built rather than a repo link."
      />

      <!-- Filter -->
      <div class="reveal mt-12" v-reveal>
        <div class="flex items-center gap-3">
          <span class="hidden font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted sm:inline">
            filter
          </span>
          <div class="rule hidden flex-1 sm:block" />
        </div>

        <ul class="mt-4 flex flex-wrap gap-2" role="list">
          <li v-for="f in availableFilters" :key="f.key">
            <button
              type="button"
              class="tag"
              :class="activeFilter === f.key && 'tag-active'"
              :aria-pressed="activeFilter === f.key"
              @click="setFilter(f.key)"
            >
              {{ f.label }}
              <span class="ml-1.5 tabular-nums opacity-50">{{ countFor(f.key) }}</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Grid -->
      <TransitionGroup
        tag="div"
        class="relative mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        move-class="transition-transform duration-400 ease-smooth"
        enter-active-class="transition duration-400 ease-smooth"
        enter-from-class="opacity-0 translate-y-3"
        leave-active-class="absolute transition duration-200 ease-smooth"
        leave-to-class="opacity-0 scale-95"
      >
        <article
          v-for="(project, i) in visible"
          :key="project.id"
          class="card card-hover group flex flex-col overflow-hidden text-left"
        >
          <ProjectCover
            :icon="project.icon"
            :accent="project.accent"
            :index="i + 1"
          />

          <div class="flex flex-1 flex-col p-5">
            <p class="eyebrow flex items-center gap-2">
              {{ project.company }}
              <span class="h-1 w-1 rounded-full bg-violet/60" aria-hidden="true" />
              <span class="normal-case tracking-normal">{{ project.period }}</span>
            </p>

            <h3 class="mt-3 font-display text-lg font-semibold tracking-tight">
              {{ project.name }}
            </h3>

            <p class="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
              {{ project.summary }}
            </p>

            <ul class="mt-4 flex flex-wrap gap-1.5">
              <li
                v-for="t in project.tech.slice(0, 4)"
                :key="t"
                class="rounded-pill border border-line px-2 py-0.5 font-mono text-[0.625rem] text-muted"
              >
                {{ t }}
              </li>
              <li
                v-if="project.tech.length > 4"
                class="rounded-pill px-1 py-0.5 font-mono text-[0.625rem] text-muted/70"
              >
                +{{ project.tech.length - 4 }}
              </li>
            </ul>

            <div class="mt-5 flex items-center gap-2 border-t border-line/70 pt-4">
              <button
                type="button"
                class="btn btn-quiet btn-sm -ml-2"
                @click="selected = project"
              >
                Case detail
                <AppIcon
                  name="arrowRight"
                  :size="14"
                  class="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>

              <a
                v-if="project.repo"
                :href="project.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-quiet btn-sm ml-auto"
              >
                <AppIcon name="git" :size="14" />
                GitHub
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-quiet btn-sm"
                :class="!project.repo && 'ml-auto'"
              >
                <AppIcon name="external" :size="14" />
                Demo
              </a>
              <span
                v-if="!project.repo && !project.demo"
                class="ml-auto text-muted/70"
                title="Private client codebase"
              >
                <AppIcon name="lock" :size="14" />
                <span class="sr-only">Private client codebase</span>
              </span>
            </div>
          </div>
        </article>
      </TransitionGroup>

      <p
        v-if="!ordered.length"
        class="mt-10 text-center font-mono text-sm text-muted"
      >
        Nothing under that filter yet.
      </p>

      <div v-if="hidden && !showAll" class="mt-10 flex justify-center">
        <button type="button" class="btn btn-ghost" @click="showAll = true">
          Show {{ hidden }} more
          <AppIcon name="arrowRight" :size="15" class="rotate-90" />
        </button>
      </div>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </section>
</template>
