## 2025-06-22 - [Dynamic Feedback for Helper Actions]
**Learning:** For "hidden-until-hover" UI elements like a Copy-to-Clipboard button, using only `opacity-0 group-hover:opacity-100` makes the feature inaccessible to keyboard users and screen readers. Additionally, static ARIA labels on such buttons fail to communicate the success state of the action.

**Action:** Always pair `group-hover:opacity-100` with `focus-visible:opacity-100` to ensure keyboard accessibility. Use dynamic ARIA labels (e.g., `isCopied ? "Email copied" : "Copy email"`) and sync them with Tooltip content to provide consistent visual and screen-reader feedback.
