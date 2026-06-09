## 2026-06-09 - [Consolidate Framer Motion Scroll Listeners]
**Learning:** Using `window.addEventListener('scroll')` alongside Framer Motion's `useScroll` is redundant and adds unnecessary overhead to the main thread. Framer Motion provides `useMotionValueEvent` which is more performant and integrated into its animation loop.
**Action:** Always check if Framer Motion is already tracking scroll position before adding manual event listeners. Use `useMotionValueEvent(scrollY, "change", (latest) => ...)` to handle state changes based on scroll position.
