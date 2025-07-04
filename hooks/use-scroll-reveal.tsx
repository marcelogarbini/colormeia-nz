"use client"

import { useEffect, useRef } from "react"

export function useScrollReveal(options = {}) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      },
    )

    element.classList.add("scroll-reveal")
    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [options])

  return elementRef
}
