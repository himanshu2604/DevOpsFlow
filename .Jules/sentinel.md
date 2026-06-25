# Sentinel's Journal - CRITICAL Security Learnings Only

## 2025-05-15 - Journal Created
**Learning:** Initializing the journal to track critical security findings.
**Action:** Document critical vulnerabilities, surprising gaps, or reusable security patterns here.

## 2025-05-15 - CSS Injection via dangerouslySetInnerHTML in Styles
**Vulnerability:** The Chart component used `dangerouslySetInnerHTML` to inject dynamic CSS variables (id, key, color) into a `<style>` block. These inputs were unsanitized, allowing for arbitrary CSS injection.
**Learning:** Using `dangerouslySetInnerHTML` within `<style>` tags is high-risk as it bypasses React's built-in XSS protections. Even if the data source seems "internal", any path that allows user-controlled strings to reach this point can lead to account takeover (via CSS-based data exfiltration) or UI defacement.
**Prevention:** Always sanitize dynamic values used in CSS selectors or properties. Restrict identifiers to alphanumeric characters/dashes and sanitize property values to prevent breaking out of declarations (e.g., removing `;`, `{`, `}`).
