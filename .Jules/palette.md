## 2025-05-15 - [Decorative Animations and Information Density]
**Learning:** Decorative terminal animations, while visually engaging, can be disruptive for screen reader users as they may attempt to read every typed character or line. Additionally, long lists of static FAQ cards increase cognitive load and vertical scroll fatigue on marketing pages.
**Action:** Always mark purely decorative animations with `aria-hidden="true"` to ensure a cleaner accessibility tree. Use interactive patterns like Accordions (e.g., Radix UI) for FAQ sections to allow users to progressively disclose information, improving both accessibility and UX focus.

## 2025-05-16 - [Keyboard Navigation and Mobile Menu ARIA]
**Learning:** "Skip to content" links are the first line of defense for keyboard accessibility, preventing repetitive navigation bypass fatigue. Custom mobile menus often lack standard dialog behaviors (like Escape key closing) and necessary ARIA state signaling.
**Action:** Implement "Skip to content" links as the first focusable element in the layout. Ensure mobile menus use `aria-expanded`, `aria-controls`, and `aria-modal="true"`, and always bind the `Escape` key to close the menu for a standard user experience.

## 2025-05-20 - [Required Field Indicators and Screen Reader Noise]
**Learning:** Using an asterisk (`*`) to denote required fields is common but can create auditory clutter for screen reader users if every label announces "star" or "asterisk". Additionally, without a global instruction, the meaning of the symbol might not be clear to all users.
**Action:** Always include a global instructional text (e.g., "Fields marked with * are required") before the form. Hide individual decorative asterisks from screen readers using `aria-hidden="true"` when the input itself already carries the `required` attribute, ensuring a concise and meaningful announcement.
