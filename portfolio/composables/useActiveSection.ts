/**
 * Tracks which section is currently in the viewport's reading band.
 *
 * The asymmetric rootMargin creates a thin horizontal band across the
 * middle of the screen; whichever section crosses it becomes active. That
 * matches how people perceive "where am I" far better than top-edge
 * detection, which flickers between neighbours while scrolling.
 */
export function useActiveSection(ids: string[]) {
  const active = ref(ids[0] ?? '')
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length) active.value = visible[0].target.id
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
