## 2026-06-09 - [Consolidate Framer Motion Scroll Listeners]
**Learning:** Using `window.addEventListener('scroll')` alongside Framer Motion's `useScroll` is redundant and adds unnecessary overhead to the main thread. Framer Motion provides `useMotionValueEvent` which is more performant and integrated into its animation loop.
**Action:** Always check if Framer Motion is already tracking scroll position before adding manual event listeners. Use `useMotionValueEvent(scrollY, "change", (latest) => ...)` to handle state changes based on scroll position.

## 2026-06-10 - [Avoid Layout Thrashing in Mouse Event Handlers]
**Learning:** Calling `getBoundingClientRect()` inside high-frequency events like `onMouseMove` causes "layout thrashing" because it forces the browser to recalculate the layout synchronously to return accurate values.
**Action:** Cache dimensions in a `useRef` during `onMouseEnter` or `onResize`. If the element might change size between mouse moves without re-entering, consider using a `ResizeObserver`. For most interactive cards, caching on entry is sufficient and significantly reduces main-thread work during interaction.
