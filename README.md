# AI Feedback Triage Dashboard

A product management portfolio prototype that uses AI-assisted feedback triage to turn scattered customer comments into themes, urgency signals, prioritization inputs, and a decision brief.

## Live Demo

[Open the dashboard](https://jesse-cohen-projects.github.io/ai-feedback-triage-dashboard/)

## Overview

Product managers receive feedback from sales calls, support tickets, user interviews, app reviews, and internal stakeholders. The hard part is not collecting feedback; it is turning messy input into a clear product signal.

This prototype demonstrates a lightweight dashboard that helps a PM review feedback, filter by source and urgency, inspect AI-style summaries, compare theme-level signals, and frame the strongest visible theme as a recommended next investigation.

## Target User

B2B SaaS product managers who need to understand customer pain across accounts and communicate prioritization rationale to engineering, design, sales, support, and leadership.

## Product Problem

Customer feedback often arrives as disconnected comments across many systems. Without synthesis, teams can overreact to loud requests, miss repeated patterns, or struggle to explain why one opportunity matters more than another.

This prototype focuses on helping PMs move from raw feedback to an explainable product discussion.

## Core Workflow

1. Review new feedback in the inbox.
2. Filter by source, sentiment, urgency, or theme.
3. Select an item to inspect the customer quote and AI-style summary.
4. Compare impact, confidence, and effort.
5. Review theme-level signals: highest priority, most urgent, and highest count.
6. Use the Decision Brief to frame the next investigation.

## Prototype Scope

This is intentionally non-scalable:

- Static HTML, CSS, and JavaScript.
- Mock customer feedback data.
- No backend.
- No login.
- No external API calls.
- No real AI model connection.

The goal is to demonstrate product thinking, workflow design, and decision framing rather than production engineering.

## Project Status

- Static local prototype.
- Uses mock feedback data.
- No real AI model, API, backend, database, authentication, or customer data.
- Ready for screenshots, demo walkthrough, and public portfolio packaging.

## Demo Features

- Feedback inbox with customer, source, sentiment, urgency, and theme.
- Filter controls for triage.
- Detail panel with customer quote and AI-style summary.
- Simple priority score using `impact x confidence / effort`.
- Top-level theme metrics for highest priority, most urgent, and highest count.
- Decision Brief with recommendation, why now, evidence, open questions, and cross-functional partner.
- Roadmap opportunity cards grouped by theme.

## What This Demonstrates

- Customer feedback synthesis.
- Product discovery and prioritization.
- Explainable AI-assisted workflow design.
- Clear separation between signal, theme, opportunity, and recommendation.
- Cross-functional framing for product, design, and engineering conversations.
- PM judgment around what is real, mocked, validated, or deferred.

## What Is Real Vs Mocked

Real in this prototype:

- Feedback filtering.
- Sidebar views for Inbox, Themes, and Roadmap.
- Theme grouping based on the mock data.
- Priority calculation.
- Decision Brief updates based on the visible filtered feedback.
- Empty states when filters return no matches.

Mocked in this prototype:

- AI theme classification.
- AI summarization.
- Feedback source integrations such as Zendesk, Salesforce, Gong, app reviews, or CSV import.
- Real customer/account data.
- Backend database.
- Authentication and permissions.
- Engineering effort estimation workflow.

## Scoring Model

Priority is calculated as:

```txt
priority = impact x confidence / effort
```

Input ownership:

- Impact: PM-assessed, informed by customer severity, frequency, revenue, user count, and strategic fit.
- Confidence: PM-assessed, based on evidence quality and repeatability.
- Effort: engineering-estimated or engineering-reviewed.

The priority score is a discussion aid, not an automatic roadmap decision.

## Product Rationale

- The core product problem is information overload, not lack of customer feedback.
- The prototype favors explainable prioritization over black-box scoring.
- The data model is intentionally simple so stakeholders can react to the workflow before investing in infrastructure.
- The Decision Brief recommends investigation, not automatic roadmap commitment.
- The next validation step would test whether PMs trust, edit, and act on AI-generated themes.

## What I Would Validate Next

- Do PMs trust the AI-generated theme classifications?
- Would PMs edit, merge, or rename the generated themes?
- Does the Decision Brief help teams move from feedback review to a clear next investigation?
- Which feedback sources create the most reliable product signal?
- Do the priority inputs match how PMs and engineers discuss tradeoffs?
- What usage signals would indicate whether solving a theme improves activation, retention, expansion, or support cost?

## How To Run

1. Download or clone the repository.
2. Open `index.html` in a web browser.

No installation, build step, server, or API key is required.
