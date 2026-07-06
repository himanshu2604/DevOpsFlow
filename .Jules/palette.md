## 2025-06-22 - [Dynamic Feedback for Helper Actions]
**Learning:** For "hidden-until-hover" UI elements like a Copy-to-Clipboard button, using only `opacity-0 group-hover:opacity-100` makes the feature inaccessible to keyboard users and screen readers. Additionally, static ARIA labels on such buttons fail to communicate the success state of the action.

**Action:** Always pair `group-hover:opacity-100` with `focus-visible:opacity-100` to ensure keyboard accessibility. Use dynamic ARIA labels (e.g., `isCopied ? "Email copied" : "Copy email"`) and sync them with Tooltip content to provide consistent visual and screen-reader feedback.

## 2025-07-04 - [Contextual ARIA for Repeated Action Patterns]
**Learning:** In sections with repeating cards (like Services or Pricing), generic CTA labels like "Get Started" are confusing for screen reader users as they lack context about *which* service they are starting. Similarly, currency symbols and "save" badges are often read as fragmented text rather than cohesive pricing information.

**Action:** Use unique `aria-label` attributes on repetitive buttons to include the specific item name (e.g., `aria-label="Get started with CI/CD Setup"`). For pricing, use `sr-only` spans to provide a natural language description (e.g., "Starting at $2,500 per month") and hide decorative symbols to ensure a clear reading flow.

## 2025-07-11 - [Accessible Data Visualizations and Semantic Groups]
**Learning:** Symbolic data (e.g., "45 min → 4 min") is often read literally by screen readers as "45 min right arrow 4 min", which misses the intent of "improvement" or "reduction". Additionally, lists of tags/technologies are more useful when semantically grouped and labeled.

**Action:** Provide natural language alternatives for symbolic metrics using `sr-only` spans (e.g., "45 minutes reduced to 4 minutes") while hiding the visual representation from screen readers. Use `role="group"` and `aria-label` to provide context for collections of related items like tech stacks.
