import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function setupRevealOnViewport(
  target: Element | null,
  reveal: () => void,
  options?: { threshold?: number; viewportFactor?: number },
) {
  if (!target) return undefined

  const threshold = options?.threshold ?? 0.2
  const viewportFactor = options?.viewportFactor ?? 0.9
  const hasIntersectionObserver =
    typeof window !== 'undefined' && 'IntersectionObserver' in window

  if (!hasIntersectionObserver) {
    const handleScroll = () => {
      const rect = target.getBoundingClientRect()
      if (rect.top < window.innerHeight * viewportFactor) {
        reveal()
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      })
    },
    { threshold },
  )

  observer.observe(target)

  return () => {
    observer.disconnect()
  }
}
