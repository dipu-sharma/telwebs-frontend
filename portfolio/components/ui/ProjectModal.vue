<script setup lang="ts">
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()

const panel = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const open = computed(() => props.project !== null)

const onKeydown = (e: KeyboardEvent) => {
  if (!open.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    emit('close')
    return
  }

  // Keep Tab inside the dialog
  if (e.key === 'Tab' && panel.value) {
    const focusable = panel.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }
}

watch(open, async (isOpen) => {
  if (!import.meta.client) return

  if (isOpen) {
    previouslyFocused = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.body.style.overflow = ''
    previouslyFocused?.focus?.()
  }
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-smooth"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-smooth"
      leave-to-class="opacity-0"
    >
      <div
        v-if="project"
        class="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        @click.self="emit('close')"
      >
        <Transition
          enter-active-class="transition duration-400 ease-smooth"
          enter-from-class="opacity-0 translate-y-6 sm:scale-95"
          appear
        >
          <div
            ref="panel"
            class="glass relative w-full max-w-2xl rounded-t-card sm:rounded-card"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="`modal-title-${project.id}`"
          >
            <button
              ref="closeButton"
              type="button"
              class="btn btn-ghost absolute right-4 top-4 z-10 h-9 w-9 !px-0"
              aria-label="Close project details"
              @click="emit('close')"
            >
              <AppIcon name="close" :size="17" />
            </button>

            <ProjectCover
              :icon="project.icon"
              :accent="project.accent"
              compact
              class="rounded-t-card"
            />

            <div class="max-h-[60vh] overflow-y-auto p-6 sm:max-h-none sm:p-8">
              <p class="eyebrow">{{ project.company }} · {{ project.period }}</p>

              <h3
                :id="`modal-title-${project.id}`"
                class="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                {{ project.name }}
              </h3>

              <p class="mt-4 leading-relaxed text-muted">
                {{ project.description }}
              </p>

              <h4 class="eyebrow mt-8">What I built</h4>
              <ul class="mt-4 space-y-2.5">
                <li
                  v-for="feature in project.features"
                  :key="feature"
                  class="flex gap-3 text-sm leading-relaxed"
                >
                  <AppIcon
                    name="check"
                    :size="15"
                    class="mt-1 shrink-0 text-violet"
                  />
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <h4 class="eyebrow mt-8">Stack</h4>
              <ul class="mt-3 flex flex-wrap gap-2">
                <li v-for="t in project.tech" :key="t" class="tag">{{ t }}</li>
              </ul>

              <div class="mt-8 flex flex-wrap items-center gap-3">
                <a
                  v-if="project.repo"
                  :href="project.repo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-ghost btn-sm"
                >
                  <AppIcon name="git" :size="15" />
                  View code
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn-primary btn-sm"
                >
                  <AppIcon name="external" :size="15" />
                  Live demo
                </a>
                <p
                  v-if="!project.repo && !project.demo"
                  class="flex items-center gap-2 font-mono text-[0.6875rem] text-muted"
                >
                  <AppIcon name="lock" :size="14" />
                  Private client codebase — happy to walk through it on a call
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
