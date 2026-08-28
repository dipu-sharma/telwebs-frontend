<script setup lang="ts">
useHead({
  noscript: [
    {
      innerHTML: '<style>.reveal{opacity:1 !important;transform:none !important}</style>',
      tagPosition: 'bodyOpen',
    },
  ],
})
</script>

<template>
  <div class="min-h-screen">
    <div class="aurora" aria-hidden="true" />
    <div class="grid-overlay" aria-hidden="true" />
    <CursorGlow />
    <ScrollProgress />

    <TheNav />

    <main id="main">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ExpertiseSection />
      <TestimonialsSection />
    </main>

    <TheFooter />
    <BackToTop />
  </div>
</template>