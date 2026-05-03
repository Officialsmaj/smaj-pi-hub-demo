# SMAJ PI HUB Frontend Implementation TODO (White Paper Aligned)

Source of truth: `By_smaj_ecosystem_white_paper_v2.md` (Version 2.0, April 16, 2026)

Goal: implement the frontend roadmap, UX, and platform modules according to the SMAJ Ecosystem white paper across unified access, 15 integrated platforms, Pi-native payments, AI guidance, trust verification, and token utility surfaces.

## Foundation: Unified Access, UX, and Frontend Core

- [x] Build React + TypeScript app shell with route-based navigation.
- [x] Establish sticky header/footer and responsive navigation (mobile/tablet/desktop drawer behavior).
- [x] Implement homepage as central gateway experience.
- [x] Build reusable section/card/button component set.
- [ ] Finish design-token standardization and remove remaining duplicated style patterns.
- [ ] Complete responsive QA checklist for all key routes and interaction states.

## White Paper Core Requirements

### 1. One Login, One Wallet, All Services

- [x] Integrate Pi wallet authentication flow and session-aware header state.
- [ ] Add unified account center page showing identity/verification status across modules.
- [ ] Add cross-platform SSO guard utilities for all protected module routes.

### 2. SMAJ AI Assistant (Platform Guidance Only)

- [ ] Add AI assistant entrypoint in header and contextual page panels.
- [ ] Build assistant UX for service discovery, workflow guidance, and in-platform recommendations.
- [ ] Enforce guardrails so assistant is restricted to SMAJ platform support scope.

### 3. Pi-Native Pricing and Payments

- [ ] Ensure all commerce/service pricing UI defaults to Pi denomination.
- [ ] Add consistent Pi payment status UI components (pending, approved, completed, failed).
- [ ] Implement `createPayment` -> approval -> completion frontend flow states per module.

### 4. Multi-Level Verification and Trust

- [ ] Create user trust tier UI (`Basic`, `Verified`, `Trusted Seller/Provider`).
- [ ] Add KYB onboarding flow UI for providers and sellers.
- [ ] Add trust badges, verification markers, and anti-fraud UX cues across listings and profiles.

### 5. Security and Marketplace Positioning

- [ ] Add security messaging and transaction-signing confirmations in key payment screens.
- [ ] Publish clear marketplace disclaimer components (non-custodial, non-banking role) across legal/help routes.

## Platform Module Rollout (15 Integrated Platforms)

### Phase 1 (Q1–Q2 2026)

- [ ] SMAJ PI HUB: finalize gateway dashboard with module launch cards and live module status.
- [ ] SMAJ STORE: implement frontend marketplace browsing, product detail, cart, checkout, and order tracking.
- [ ] SMAJ FOOD DELIVERY: implement restaurant discovery, menu flow, order tracking, and loyalty UI.
- [ ] Basic verification: surface initial trust verification onboarding and badges.

### Phase 2 (Q3 2026)

- [ ] SMAJ PI JOBS: launch jobs/freelance listings, proposals, and milestone/payment tracking UI.
- [ ] SMAJ PI AGRO: launch farmer/buyer/supplier marketplace flows.
- [ ] Enhanced provider/seller verification UX for new modules.

### Phase 3 (Q4 2026)

- [ ] SMAJ PI HEALTH: launch telemedicine booking and provider directory UI.
- [ ] SMAJ PI EDU: launch course catalog, certification display, and learner progress views.
- [ ] SMAJ PI HOUSING: launch verified listing marketplace with secure deposit/escrow states.
- [ ] Expand AI guidance touchpoints for health/education/housing workflows.

### Phase 4 (Q1 2027)

- [ ] SMAJ PI TRANSPORT: launch transport booking and trip status interface.
- [ ] SMAJ PI EVENTS: launch event discovery, booking, and organizer verification flows.
- [ ] SMAJ PI CHARITY: launch verified NGO discovery, donation flow, and impact reporting views.
- [ ] Strengthen recommendation interfaces for cross-module engagement.

### Phase 5 (Q2 2027)

- [ ] SMAJ PI STREAM: launch content browsing and media experience surfaces.
- [ ] SMAJ PI SPORTS: launch sports feed, scores, and fan engagement interfaces.
- [ ] SMAJ PI SWAP: launch peer-to-peer exchange listing and trade flow UX.
- [ ] Add first SMAJ Token utility surfaces (cashback/reward/discount indicators).

### Phase 6 (Q3–Q4 2027)

- [ ] SMAJ PI ENERGY: launch utility payment and usage tracking module UX.
- [ ] Expand SMAJ Token governance and staking UI modules.
- [ ] Add global scaling UX readiness (localization, regional content, module availability states).

## Technical Architecture Alignment

### Pi Network Integration Layer

- [ ] Standardize Pi Browser compatibility checks and fallback messaging.
- [ ] Implement reusable frontend hooks for Pi payment callbacks and verification states.

### Modular Service Layer

- [ ] Split module features into shared frontend contracts and per-module route boundaries.
- [ ] Add module health/loading/error boundaries for resilient cross-module UX.

### Developer and API Layer

- [ ] Build typed API client layer for all modules.
- [ ] Add consistent request error, retry, and empty-state handling.
- [ ] Prepare frontend API docs/readme for third-party integration handoff.

## Token Utility and Governance Surfaces

- [ ] Add staking dashboard UI shells.
- [ ] Add governance voting interface shells.
- [ ] Add loyalty/cashback ledger UI.
- [ ] Add fee discount visibility in checkout and service payments.

## Legal, Risk, and Compliance Content

- [x] Convert legal route placeholders to React pages.
- [ ] Update legal copy to match white paper disclaimer language and risk statements.
- [ ] Add clear token/marketplace informational disclaimers near token utility pages.

## Quality, Observability, and Release

- [x] Port page-level legacy JS interactions to React state flow.
- [x] Add event tracking hooks for CTA actions.
- [ ] Expand analytics schema to module-level product events (browse, checkout, conversion, trust events).
- [ ] Add unit tests for shared components, route guards, and auth/payment hooks.
- [ ] Add integration tests for wallet login + payment + module navigation critical paths.
- [ ] Run Lighthouse/performance audits on gateway and top module routes.
- [ ] Prepare release checklist and deployment notes per rollout phase.
