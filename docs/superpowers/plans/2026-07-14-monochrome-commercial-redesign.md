# Monochrome Commercial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar uma experiência pública comercial e editorial em preto, cinza e branco, com fotografias originais e o fluxo de agendamento visualmente coerente.

**Architecture:** A página pública será reconstruída como composição server-rendered com seções semânticas e `next/image`; o fluxo existente continuará client-side sem alterar regras. Tokens globais neutros manterão shadcn e dashboard consistentes, enquanto classes específicas da página controlam a direção editorial.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide, Vitest, Playwright.

---

### Task 1: Assets and typography

**Files:**
- Create: `public/images/barber-hero.png`
- Create: `public/images/barber-detail.png`
- Create: `public/images/barber-team.png`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Generate the three monochrome editorial photographs**

Use the image generation workflow with separate prompts for hero action, craft detail, and team portrait. Require no text, logo, or watermark.

- [ ] **Step 2: Copy the generated images into the project**

Run: `mkdir -p public/images` and copy each generated image with the exact names above.

- [ ] **Step 3: Register the display font**

Add `Archivo_Black` from `next/font/google` with variable `--font-display` and attach it to the root `<html>` class list.

- [ ] **Step 4: Verify the font and assets**

Run: `npm run typecheck`

Expected: exit code 0.

### Task 2: Neutral design system

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/brand-mark.tsx`

- [ ] **Step 1: Replace color tokens**

Change primary, accent, chart, sidebar, selection, scrollbar, and body background values to the approved neutral palette.

- [ ] **Step 2: Add editorial utilities**

Add `.font-display`, an uppercase optical display treatment, and subtle image grain/hover utilities with a reduced-motion override.

- [ ] **Step 3: Simplify the brand mark**

Render a neutral black/white monogram that works on both public and application surfaces.

- [ ] **Step 4: Verify static styles**

Run: `npm run lint`

Expected: exit code 0.

### Task 3: Public commercial page

**Files:**
- Modify: `src/app/(public)/barbearia/[slug]/page.tsx`

- [ ] **Step 1: Build navigation and editorial hero**

Create the utility bar, anchored navigation, responsive display headline, photographic hero grid, social proof, and primary booking CTA.

- [ ] **Step 2: Build services and gallery sections**

Render all demo services as bordered price rows and compose generated images into a responsive editorial mosaic.

- [ ] **Step 3: Build trust, team, reviews, and contact sections**

Render business stats, staff cards, monochrome review cards, first-visit promotion, opening hours, address, and final CTA.

- [ ] **Step 4: Add semantic and accessible details**

Use descriptive headings, alt text, external-link attributes, focus-visible styles, and logical section landmarks.

- [ ] **Step 5: Run public flow regression**

Run: `npm run test:e2e -- --grep "public booking"`

Expected: the public page opens and navigation to booking succeeds.

### Task 4: Booking and product surfaces

**Files:**
- Modify: `src/components/booking/booking-wizard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Restyle the booking wizard**

Replace colored success, selection, and security accents with monochrome treatments; preserve step state, buttons, form fields, and payment simulation.

- [ ] **Step 2: Align the product landing page**

Remove purple/lime gradients and present the SaaS demo with black, gray, white, restrained borders, and the new typography.

- [ ] **Step 3: Run unit tests**

Run: `npm test -- --run`

Expected: all existing domain tests pass.

### Task 5: Visual and production verification

**Files:**
- Modify: `scripts/visual_qa.py`

- [ ] **Step 1: Capture desktop and mobile screenshots**

Extend the existing visual script to capture the public page at desktop and mobile widths, then run it against the development server.

- [ ] **Step 2: Inspect screenshots**

Check hierarchy, image crops, overflow, contrast, navigation, and CTA visibility; apply any required CSS corrections.

- [ ] **Step 3: Run the complete verification suite**

Run: `npm test -- --run && npm run typecheck && npm run lint && npm run build && npm run test:e2e`

Expected: every command exits with code 0.

- [ ] **Step 4: Commit the redesign**

Run: `git add docs public src scripts package-lock.json && git commit -m "feat: redesign public barber experience"`

Expected: commit created on `codex/barber-os-mvp`.
