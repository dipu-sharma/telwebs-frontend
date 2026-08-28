export type ThemeName = 'dark' | 'light'

const STORAGE_KEY = 'dks-theme'

/**
 * Dark/light mode. Dark is the default.
 *
 * The initial class is applied by a tiny inline script in `nuxt.config.ts`
 * before first paint, so there is no flash of the wrong theme. This
 * composable keeps Vue's state in sync with what that script decided.
 */
export function useTheme() {
  const theme = useState<ThemeName>('theme', () => 'dark')

  const apply = (next: ThemeName) => {
    if (!import.meta.client) return
    const root = document.documentElement
    root.classList.toggle('light', next === 'light')
    root.style.colorScheme = next
  }

  const set = (next: ThemeName) => {
    theme.value = next
    apply(next)
    if (!import.meta.client) return
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Private browsing / storage disabled — theme just won't persist.
    }
  }

  const toggle = () => set(theme.value === 'dark' ? 'light' : 'dark')

  /** Read whatever the pre-paint script settled on. */
  const init = () => {
    if (!import.meta.client) return
    theme.value = document.documentElement.classList.contains('light') ? 'light' : 'dark'
  }

  return { theme, set, toggle, init }
}
