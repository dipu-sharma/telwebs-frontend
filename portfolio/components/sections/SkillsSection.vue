<script setup lang="ts">
import { skillCategories } from '~/data/skills'
</script>

<template>
  <section id="skills" class="section relative">
    <div class="shell">
      <SectionHeading
        eyebrow="Stack"
        title="The tools, and how deep the water goes"
        lead="Grouped by what they're for rather than by hype. The meters are an honest self-assessment: five blocks means I've run it in production under load, three means I'm productive and still learning the edges."
      />

      <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(cat, i) in skillCategories"
          :key="cat.id"
          class="card card-hover reveal group flex flex-col p-6"
          v-reveal="(i % 3) * 90"
        >
          <header class="flex items-start justify-between gap-4">
            <span
              class="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-violet transition-colors duration-400"
              :style="{ background: 'rgb(var(--c-violet) / 0.12)' }"
            >
              <AppIcon :name="cat.icon" :size="18" />
            </span>
            <span class="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted">
              {{ cat.caption }}
            </span>
          </header>

          <h3 class="mt-4 font-display text-base font-semibold tracking-tight">
            {{ cat.title }}
          </h3>

          <ul class="mt-5 space-y-2.5">
            <li
              v-for="skill in cat.skills"
              :key="skill.name"
              class="flex items-center justify-between gap-4"
            >
              <span class="text-sm text-muted transition-colors duration-300 group-hover:text-ink">
                {{ skill.name }}
              </span>
              <SkillMeter :level="skill.level" :label="skill.name" />
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
