// https://nuxt.com/docs/api/configuration/nuxt-config
import { profile } from './data/profile'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/main.css'],

  // Flat component names: components/sections/HeroSection.vue -> <HeroSection />
  components: [{ path: '~/components', pathPrefix: false }],

  // Static prerender: `npm run generate` emits plain files for any host.
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },

  runtimeConfig: {
    // Set RESEND_API_KEY in .env to enable real email delivery.
    // Left empty the contact form gracefully falls back to a mail draft.
    resendApiKey: '',
    contactTo: profile.email,
    public: {
      siteUrl: 'https://dipusharma.dev',
      githubUser: profile.githubUser,
    },
  },

  app: {
    // Page + route transitions
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en' },
      title: `${profile.name} — ${profile.shortTitle}`,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: profile.metaDescription },
        { name: 'author', content: profile.name },
        { name: 'theme-color', content: '#08070c' },
        {
          name: 'keywords',
          content:
            'Dipu Kumar Sharma, Python Developer, FastAPI, AI Engineer, Generative AI, Agentic AI, RAG, LangChain, Nuxt, Vue, Django, Backend Engineer',
        },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: profile.name },
        { property: 'og:title', content: `${profile.name} — ${profile.shortTitle}` },
        { property: 'og:description', content: profile.metaDescription },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${profile.name} — ${profile.shortTitle}` },
        { name: 'twitter:description', content: profile.metaDescription },
        { name: 'twitter:image', content: '/og-image.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/dipu.jpg' },
        { rel: 'canonical', href: 'https://dipusharma.dev' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap',
        },
      ],
      script: [
        {
          // Applies the stored theme before first paint so there is no
          // flash of the wrong colour scheme on load.
          innerHTML:
            "(function(){try{var s=localStorage.getItem('dks-theme');var l=s?s==='light':window.matchMedia('(prefers-color-scheme: light)').matches;if(l){document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';}}catch(e){}})();",
          tagPosition: 'head',
        },
      ],
      noscript: [
        {
          // Without JS the reveal directive never fires, so neutralise it.
          innerHTML: '<style>.reveal{opacity:1 !important;transform:none !important}</style>',
          tagPosition: 'bodyOpen',
        },
      ],
    },
  },
})
