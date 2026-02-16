
# Samadhan‑AI

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE) [![Build](https://github.com/10anshika/Samadhan-AI/actions/workflows/ci.yml/badge.svg)](https://github.com/10anshika/Samadhan-AI/actions) [![Repo Size](https://img.shields.io/github/repo-size/10anshika/Samadhan-AI)](https://github.com/10anshika/Samadhan-AI)

---

## One-line summary

A polished React + TypeScript frontend that accepts form images and uses Google Gemini (GenAI) to provide intelligent **field guidance** or **structured validation** of filled forms — built with production-minded reliability and developer hygiene.

---

## Live preview

![App preview](./assets/screenshot.png)

> Demo: *replace with deployed URL or GitHub Pages link if available*

---

## Who built this

**Tanmay Kunjir** • **Anshika Mishra**

This repository demonstrates full‑stack integration of computer‑vision input and an LLM (Gemini) for practical form assistance: usable by product teams and demonstrative for technical recruiters.

---

## Table of contents

* [Why this project matters](#why-this-project-matters)
* [Features](#features)
* [Tech stack](#tech-stack)
* [Quick start](#quick-start-developer)
* [Architecture overview](#architecture-overview)
* [Gemini integration notes](#gemini-integration-operational-notes)
* [Tests & CI](#tests-to-include-priority)
* [Security & privacy](#security--privacy)
* [Contributors & contact](#contributors--contact)

---

## Why this project matters

* Connects image input to a generative model to produce **structured, validated outputs** suitable for downstream automation (data entry, audit, corrections).
* Shows production concerns: secret management, runtime schema validation, retries/backoff, file validation/compression, CI and tests.
* Clear technical ownership and design choices that recruiters look for: data flow, failure modes, and developer experience.

---

## Features

* Drag & drop image uploader with preview and client-side validation (file type, max size).
* Client-side image compression to reduce latency and cost.
* Two operational modes:

  * **Field guidance** — human-readable prompts to help correct form entries.
  * **Validation** — machine-friendly JSON with `field -> { value, confidence, suggestion }`.
* Robust model adapter with safe JSON parsing, zod schema validation (recommended), and retry/backoff.
* Developer-friendly: `.env.example`, CI workflow, and unit tests for critical logic.

---

## Tech stack

* Frontend: React + TypeScript + Vite
* Model client: `@google/genai` (Gemini) — adapter in `services/geminiService.ts`
* Runtime validation: `zod` (recommended) or `ajv`
* Testing: Jest + React Testing Library
* CI: GitHub Actions

---

## Quick start (developer)

1. Clone and enter repo

```bash
git clone https://github.com/10anshika/Samadhan-AI.git
cd Samadhan-AI
```

2. Install

```bash
npm ci
```

3. Create `.env.local` from `.env.example` (do not commit)

```env
GEMINI_API_KEY=sk-xxxxxx
VITE_PUBLIC_BASE_URL=http://localhost:5173
GEMINI_MODEL=gemini-3-pro-preview
```

4. Run dev server

```bash
npm run dev
```

5. Build

```bash
npm run build
```

---

## Architecture overview

```
Browser UI (ImageUploader) --> compress/validate --> /api/process (optional proxy)
    --> services/geminiService.ts (adapter to Gemini)
         --> safeJsonParse -> zod validation -> UI: Guidance | Validation
```

Notes:

* Keep `GEMINI_API_KEY` off the client. Use a minimal server or serverless function if you must call Gemini from a frontend flow.

---

## Gemini integration — operational notes

* Use canonical env var `GEMINI_API_KEY`. Replace any `API_KEY` references.
* Avoid direct `JSON.parse` of model text. Use a cleaning step, safe parse, and a zod schema to validate the final object.

**Recommended model output schema (conceptual)**

```ts
const ModelOutputSchema = z.object({
  mode: z.union([z.literal('guidance'), z.literal('validation')]),
  fields: z.record(z.string(), z.object({ value: z.string(), confidence: z.number().min(0).max(1), suggestion: z.string().optional() })),
})
```

**Safe parse pattern**

````ts
function safeJsonParse(text: string) {
  const cleaned = text.replace(/^```(?:json)?
?|
?```$/g, '')
  try { return JSON.parse(cleaned) } catch { throw new Error('Invalid JSON from model') }
}
````

---

## Tests to include (priority)

* Unit tests for `services/geminiService.ts` that mock `@google/genai` and validate retries/parse behavior.
* Snapshot and interaction tests for `ImageUploader` and result components.
* Integration test (mocked) covering both guidance and validation flows.

---

## CI (GitHub Actions) — minimal snippet

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm test --if-present
```

---

## Security & privacy

* Images may contain sensitive data: add an explicit UI and README privacy notice: "Images are sent to a third‑party API for processing." Provide a local-only mode or an optional opt-out.
* Add `.env.local` to `.gitignore`.

---

## Contributors & contact

Built by **Tanmay Kunjir** and **Anshika Mishra**.

GitHub: [https://github.com/10anshika](https://github.com/10anshika)

---

## Suggested next steps (for polish)

* Add an animated hero GIF showing the upload → result flow in `assets/` and reference it in this README.
* Host a small demo (GitHub Pages / Vercel) and link it in the top section.
* Add screenshots for both **guidance** and **validation** result states.
* Add a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` to improve project maturity.

---

## License

MIT — see `LICENSE`.
