<script setup lang="ts">
import { profile } from '~/data/profile'
import { navItems } from '~/data/navigation'

const sectionIds = navItems.map((i) => i.href.replace('#', ''))
const active = useActiveSection(sectionIds)

const scrolled = ref(false)
const open = ref(false)
let frame = 0

const onScroll = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 32
  })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  document.body.style.removeProperty('overflow')
})

// Lock the page behind the mobile sheet
watch(open, (isOpen) => {
  if (!import.meta.client) return
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

const close = () => (open.value = false)

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <div class="border-b transition-all duration-500 ease-smooth" :class="scrolled
      ? 'border-line/80 bg-bg/70 backdrop-blur-xl backdrop-saturate-150'
      : 'border-transparent bg-transparent'
      ">
      <nav class="shell flex h-[4.5rem] items-center justify-between gap-4" aria-label="Main">
        <BrandMark />

        <!-- Desktop: floating pill -->
        <div class="hidden lg:block">
          <ul class="glass flex items-center gap-1 rounded-pill p-1.5">
            <li v-for="item in navItems" :key="item.href">
              <a :href="item.href"
                class="relative inline-flex items-center rounded-pill px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-300"
                :class="active === item.href.replace('#', '')
                  ? 'text-ink'
                  : 'text-muted hover:text-ink'
                  " :aria-current="active === item.href.replace('#', '') ? 'true' : undefined">
                <span v-if="active === item.href.replace('#', '')" class="absolute inset-0 rounded-pill" :style="{
                  background:
                    'linear-gradient(100deg, rgb(var(--c-violet) / 0.22), rgb(var(--c-amber) / 0.16))',
                  border: '1px solid rgb(var(--c-violet) / 0.4)',
                }" aria-hidden="true" />
                <span class="relative">{{ item.label }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="flex items-center gap-2">
          <ThemeToggle />

          <a :href="profile.resumePath" download class="btn btn-ghost btn-sm hidden sm:inline-flex">
            <AppIcon name="download" :size="15" />
            Resume
          </a>

          <a href="#contact" class="btn btn-primary btn-sm hidden lg:inline-flex">
            Let's talk
          </a>

          <!-- Mobile trigger -->
          <button type="button" class="btn btn-ghost btn-sm h-9 w-9 !px-0 lg:hidden" :aria-expanded="open"
            aria-controls="mobile-nav" aria-label="Open menu" @click="open = !open">
            <AppIcon :name="open ? 'close' : 'menu'" :size="18" />
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile sheet -->
    <Transition enter-active-class="transition duration-400 ease-smooth" enter-from-class="opacity-0"
      leave-active-class="transition duration-250 ease-smooth" leave-to-class="opacity-0">
      <div v-if="open" id="mobile-nav"
        class="fixed inset-0 top-[4.5rem] z-40 overflow-y-auto bg-bg/95 backdrop-blur-xl lg:hidden">
        <div class="shell flex min-h-full flex-col py-8">
          <ul class="space-y-1">
            <li v-for="(item, i) in navItems" :key="item.href">
              <a :href="item.href"
                class="flex items-baseline justify-between gap-4 rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-ink/5"
                :style="{ animationDelay: `${i * 45}ms` }" @click="close">
                <span class="font-display text-2xl font-semibold tracking-tight">
                  {{ item.label }}
                </span>
                <span class="font-mono text-[0.6875rem] text-muted">
                  {{ item.short }}
                </span>
              </a>
            </li>
          </ul>

          <div class="rule my-8" />

          <div class="flex flex-wrap items-center gap-3">
            <a :href="profile.resumePath" download class="btn btn-primary btn-sm">
              <AppIcon name="download" :size="15" />
              Download Resume
            </a>
            <a :href="profile.github" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
              <AppIcon name="git" :size="15" />
              GitHub
            </a>
            <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
              <AppIcon name="linkedin" :size="15" />
              LinkedIn
            </a>
          </div>

          <p class="mt-8 font-mono text-xs text-muted">
            {{ profile.email }}
          </p>
        </div>
      </div>
    </Transition>
  </header>
</template>
