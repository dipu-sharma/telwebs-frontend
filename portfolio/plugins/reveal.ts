/**
 * `v-reveal` — scroll-triggered reveal built on a single shared
 * IntersectionObserver.
 *
 * Usage:  <div class="reveal" v-reveal>            … default timing
 *         <div class="reveal" v-reveal="120">      … 120ms stagger delay
 *
 * The `reveal` class ships in the server-rendered HTML so there is no
 * flash of positioned content on hydration. `app.vue` carries a <noscript>
 * rule that neutralises it when JavaScript is unavailable.
 *
 * Registered universally (not `.client`) so SSR can resolve the directive;
 * the hooks themselves only ever fire in the browser.
 */
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null
  let prefersReducedMotion = false

  if (import.meta.client) {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const getObserver = (): IntersectionObserver | null => {
    if (!import.meta.client || prefersReducedMotion) return null
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            entry.target.classList.add('reveal-in')
            observer?.unobserve(entry.target)
          }
        },
        {
          // Fire slightly before the element is fully in view
          rootMargin: '0px 0px -10% 0px',
          threshold: 0.06,
        },
      )
    }
    return observer
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      const delay = Number(binding.value)
      if (Number.isFinite(delay) && delay > 0) {
        el.style.setProperty('--reveal-delay', `${delay}ms`)
      }

      // No animation wanted, or element already in view on first paint
      if (prefersReducedMotion) {
        el.classList.add('reveal-in')
        return
      }

      getObserver()?.observe(el)
    },

    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
