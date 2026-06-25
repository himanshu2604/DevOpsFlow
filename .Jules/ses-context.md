# .jules/ses-context.md

# SES Operator fills this in during client onboarding. All four agents read this file.

## Client info

client_name: "DevOpsFlow"
tier: "Starter / Growth / Pro"
operator_notes: ""

## Stack

framework: "Next.js 14 / Laravel / Django / etc"
database: "PostgreSQL / MySQL / MongoDB"
deployment: "Vercel / Railway / Render / AWS"
css: "Tailwind / Styled Components / CSS Modules"
test_command: "pnpm test / npm test / pytest"
lint_command: "pnpm lint"
build_command: "pnpm build"

## Health Score weights (must sum to 100)

performance_weight: 30
security_weight: 30
ux_weight: 25
maintainability_weight: 15

## Priority areas this month

# What should agents focus on? (e.g. "dashboard load time, mobile checkout UX")

priorities: "Run a full audit first — no specific priorities set.
Pick the highest impact item in each pillar based on scan results."

## Off-limits files (agents must never touch these)

# e.g. auth/, payments/, src/lib/stripe.ts

off_limits:

- "auth/"
- "payments/"
- ".env\*"

## Completed improvements (agents must not redo these)

# Scribe updates this automatically. Operator can also add entries.

completed: []

## Report format preference

# "technical" = include code details, "executive" = plain English only

report_style: "executive"
