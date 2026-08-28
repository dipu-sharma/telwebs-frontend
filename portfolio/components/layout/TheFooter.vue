<script setup lang="ts">
import { profile } from '~/data/profile'
import { navItems } from '~/data/navigation'

const year = new Date().getFullYear()

const socials = [
  { label: 'GitHub', href: profile.github, icon: 'git' },
  { label: 'LinkedIn', href: profile.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
]
</script>

<template>
  <footer class="relative border-t border-line/70 py-14">
    <div class="shell">
      <div class="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <div class="max-w-xs">
          <BrandMark />
          <p class="mt-4 text-sm leading-relaxed text-muted">
            {{ profile.tagline }}
          </p>
          <p class="mt-4 flex items-center gap-2 font-mono text-xs text-muted">
            <span class="relative flex h-1.5 w-1.5">
              <span
                class="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-pulse-ring" />
              <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {{ profile.availability }}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 class="eyebrow">Navigate</h2>
          <ul class="mt-4 grid grid-cols-2 gap-x-10 gap-y-2.5">
            <li v-for="item in navItems" :key="item.href">
              <a :href="item.href" class="text-sm text-muted transition-colors duration-300 hover:text-ink">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 class="eyebrow">Elsewhere</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="s in socials" :key="s.label">
              <a :href="s.href" :target="s.href.startsWith('mailto:') ? undefined : '_blank'"
                :rel="s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
                class="group inline-flex items-center gap-2.5 text-sm text-muted transition-colors duration-300 hover:text-ink">
                <AppIcon :name="s.icon" :size="16" />
                {{ s.label }}
                <AppIcon name="arrowRight" :size="13"
                  class="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="rule my-10" />

      <div
        class="flex flex-col-reverse items-end justify-end gap-4 font-mono text-xs text-muted sm:flex-row sm:items-center">
        <p>© {{ year }} {{ profile.name }}. All rights reserved.</p>

      </div>
    </div>
  </footer>
</template>
