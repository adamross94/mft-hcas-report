# Medway 5% Fringe HCAS — Evidence Pack & Verification Tracker

## Maintenance checklist (keep this README “alive”)
- Convert every report statement into an **atomic claim** with an **ID**, **owner**, and **status**.
- Capture **evidence artefacts** per claim (datasets, screenshots, FOI replies, SQL extracts) and link them in the tracker.
- Refresh time-series on a repeatable cadence (monthly/quarterly) using the **Sources & Methods** checklists.
- Mark uncertainty explicitly (**Needs Clarification** / **Disputed**) with a named owner and next action.
- Maintain an audit trail: **what changed, why, and when** (Last Reviewed + commits).

---

## Purpose

This repository supports a structured, evidence-led case that **Medway NHS Foundation Trust** should be considered for inclusion in the **5% “fringe” High Cost Area Supplement (HCAS)**.

This README is both:
- Project documentation (how the report is built, where data comes from, how it should be refreshed), and
- A working verification tracker to **prove or correct every claim** made in the report.

**Verification window:** **01 Jan 2020 → 31 Dec 2025** (unless a claim is “snapshot-only”).

---

## Scope & what “verification” means

A claim is **Verified** only when:
- The metric is reproducible with defined inputs (period, geography, definition),
- The supporting evidence artefact is stored (or linked), and
- The tracker row contains enough notes that a second person could re-run it.

Claims that are editorial framings (e.g., “this supports the case”) are still tracked, but should reference the underlying verified claims they depend on.

---

## How the report is built

- **Frontend:** React (Vite) + Tailwind CSS
- **Charts:** Chart.js
- **Animation:** AOS (used elsewhere; the header should remain predictable)
- **Data approach:** constants + local datasets; outputs rendered as cards/tables for non-technical audiences

### Suggested repo structure for evidence (auditable)
```text
/evidence
  /C01
    /public
    /internal
    /foi
  /C02
  ...
/foi
  /templates
  /sent
  /received
/src
  /components
  /data
```

---

## Status values (use only these)

- **Pending** — not started  
- **In Progress** — evidence being collected/processed  
- **Verified** — claim reproduced + artefacts stored  
- **Disputed** — credible sources conflict; resolution action required  
- **Needs Clarification** — wording/definition unclear; cannot verify as written  

---

## Tracker schema (field definitions)

| Field | Meaning |
|---|---|
| ID | Unique claim identifier (C01+) |
| Report Section | Where it appears (Section 1–12 and/or component/page) |
| Claim/Statement | Atomic, testable statement (split composites) |
| Time Period | Data coverage (“n/a” if not time-bound) |
| Data Source/Method | Dataset(s), method, definitions, refresh notes |
| Responsible Person | Named owner (single accountable person) |
| Status | Pending / In Progress / Verified / Disputed / Needs Clarification |
| Verification Notes | Links to evidence artefacts + assumptions/caveats |
| FOI Required | Yes/No |
| Expected Response Date | If FOI-dependent |
| Last Reviewed | YYYY-MM-DD |

**Assignment rule:** every row must have a named owner (no blanks).  
**FOI rule:** FOI-dependent rows must include an expected response date and a request log in `/foi/sent`.

---

## Claims tracker index
- Section 1 — Executive Summary (C01–C14, C86–C88)
- Section 2 — Key Indicators (C15–C20, C89–C92)
- Section 3 — What 5% HCAS unlocks (C21–C29, C93–C95)
- Section 4 — Briefing (C30–C36, C96–C97)
- Section 5 — Cost-of-Living detail (C37–C53, C98–C106)
- Section 6 — Evidence at a glance (C54–C60, C107–C112)
- Section 7 — London adjacency & catchment (C61–C65, C113–C115)
- Section 8 — Workforce impact (C66–C72, C116–C118)
- Section 9 — Policy route map (C73–C78, C119–C122)
- Section 10 — Expected outcomes (C79–C82, C123–C125)
- Section 11 — Action plan (C83–C84, C126–C131)
- Section 12 — Sources & Methods (C85, C132–C139)
- Historical disadvantage model (HD01–HD06)

---

# Claims tracker tables

> **Notes**
> - IDs are **append-only**: do not renumber when edits occur; add new IDs for new claims.
> - If a claim is revised in the report, update the tracker row text and notes, and record the change in the audit log.

---

## Section 1 — Executive Summary

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C01 | 1 | Medway faces housing cost pressures comparable to fringe comparator areas. | 2020–2025 + snapshots | UK House Price Index (UK HPI) local authority series | Adam Ross (BI) | Pending | Add LA series + comparator set; store extracts. | No | - | - |
| C02 | 1 | Medway faces private rent pressures comparable to fringe comparator areas. | 2020–2025 + Jan 2024–Jan 2025 | ONS Private Rental Market Statistics (PRMS) | Adam Ross (BI) | Pending | Confirm metric (median monthly rent) + geography. | No | - | - |
| C03 | 1 | Medway faces Council Tax pressures comparable to fringe comparator areas. | 2020–2025 + 2023/24 | LA Band D schedules + archive PDFs | Adam Ross (BI) | Pending | Record precepts/parish caveats. | No | - | - |
| C04 | 1 | Medway faces travel/commuting costs comparable to fringe comparator areas. | 2020–2025 + 2025 fares | Operator fare tables (Southeastern/c2c) screenshots | Adam Ross (BI) | Pending | Record product type, date checked, route. | No | - | - |
| C05 | 1 | Medway staff do not receive the 5% fringe HCAS. | 2020–2025 | AfC (Agenda for Change) Handbook + payslip/ESR element evidence | Adam Ross (Policy/BI) | Pending | Define “receive” precisely (pay element). | No | - | - |
| C06 | 1 | Absence of 5% HCAS reduces take-home pay relative to fringe trusts. | 2020–2025 | AfC pay modelling examples | Adam Ross (Finance/BI) | Pending | Build band/spine worked examples. | No | - | - |
| C07 | 1 | Pay differential makes fringe and outer-London moves more attractive. | 2020–2025 | Turnover/leaver destination proxy (if held) | Adam Ross (Workforce/BI) | Pending | Define proxy; may require internal data. | Yes (if destination data) | - | - |
| C08 | 1 | Pay pressure risks undoing recent vacancy improvements. | 2020–2025 | ESR vacancy series (definition locked) | Adam Ross (Workforce/BI) | Pending | Must define vacancy metric used. | No | - | - |
| C09 | 1 | A 5% HCAS would bring Medway in line with neighbouring comparators. | 2020–2025 | HCAS mapping across comparator trusts/areas | Adam Ross (Policy/BI) | Pending | Confirm which sites are fringe and rates. | Yes | - | - |
| C10 | 1 | A 5% HCAS would support retention. | 2020–2025 | Retention metrics + scenario framing | Adam Ross (Workforce/BI) | Pending | Avoid causality; define KPIs. | Yes (comparators) | - | - |
| C11 | 1 | A 5% HCAS would help protect core services (rota stability). | 2020–2025 | Fill-rate/escalation/agency proxies | Adam Ross (Ops/Workforce) | Pending | Define metrics and data owners. | Yes | - | - |
| C12 | 1 | Fringe-level living costs without fringe pay squeezes take-home income. | 2020–2025 | Cost + pay combined scenarios | Adam Ross (BI) | Pending | Define comparator thresholds. | No | - | - |
| C13 | 1 | Better retention would lower agency spend. | 2020–2025 | Agency spend baseline + scenario reduction | Adam Ross (Finance/BI) | Pending | Build cautious scenario model. | No | - | - |
| C14 | 1 | Better retention would stabilise services for patients across Medway and the wider system. | 2020–2025 | Service KPIs (cancellations/ED pressures/etc.) | Adam Ross (Ops/BI) | Pending | Tie to measurable indicators. | Yes | - | - |
| C86 | 1 | The ask is to add Medway to the 5% fringe HCAS zone. | n/a | Policy ask (documented) | Adam Ross (Project) | Pending | Ensure consistent wording across sections. | No | - | - |
| C87 | 1 | Inclusion would reduce agency spend and improve service stability (directional claim). | 2020–2025 | Depends on C13–C14 plus scenario outputs | Adam Ross (Finance/BI) | Pending | Must explicitly reference verified drivers. | No | - | - |
| C88 | 1 | Comparator set includes neighbouring fringe geographies (e.g., Dartford/Gravesham/Thurrock). | n/a | Comparator definition page + rationale | Adam Ross (Project) | Pending | Confirm final comparator list and governance. | No | - | - |

---

## Section 2 — Key Indicators

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C15 | 2 | Rent YoY is +13.1% (Jan 2025 vs Jan 2024) for Medway. | Jan 2024–Jan 2025 | ONS PRMS | Adam Ross (BI) | Pending | Reproduce exactly; store extract. | No | - | - |
| C16 | 2 | Fringe comparator rents are ~10–11% YoY over the same period. | Jan 2024–Jan 2025 | ONS PRMS for comparators | Adam Ross (BI) | Pending | Define average method (mean/median). | No | - | - |
| C17 | 2 | Rail season ticket is £6,784 (Gillingham → London; 2025 annual). | 2025 | Southeastern fare page screenshot | Adam Ross (BI) | Pending | Record date checked + product. | No | - | - |
| C18 | 2 | Turnover is ~14% for Medway (definition required). | Most recent 12 months | ESR turnover definition | Adam Ross (Workforce/BI) | Pending | Store definition and SQL/query. | No | - | - |
| C19 | 2 | Nearby fringe trusts have turnover ~10–12% (comparable definition). | Same 12m window | Comparator papers or FOI | Adam Ross (FOI/BI) | Pending | Harmonise definitions across trusts. | Yes | - | - |
| C20 | 2 | Vacancy improved from 34% → 9% through targeted initiatives. | Define window | ESR vacancy series + initiatives evidence | Adam Ross (Workforce/BI) | Pending | Must lock start/end dates. | No | - | - |
| C89 | 2 | These indicators “place Medway alongside fringe comparators”. | n/a | Depends on verified C15–C20 | Adam Ross (BI) | Pending | Be explicit: which indicators, what rule. | No | - | - |
| C90 | 2 | “Vacancy: 34% → 9%” refers to nursing vacancies (not all staff). | Define window | ESR / workforce reports | Adam Ross (Workforce) | Pending | Confirm staff group. | No | - | - |
| C91 | 2 | Rail ticket metric is “2025 standard annual season” (not promo/railcard). | 2025 | Fare capture protocol | Adam Ross (BI) | Pending | Store screenshot + metadata. | No | - | - |
| C92 | 2 | Key indicators are presented in a way that is consistent with the evidence table values. | n/a | UI-to-table reconciliation | Adam Ross (Dev/BI) | Pending | Add reconciliation checklist. | No | - | - |

---

## Section 3 — What a 5% HCAS unlocks

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C21 | 3 | 5% uplift reduces pay gap versus fringe areas (worked examples). | 2020–2025 | AfC pay modelling + HCAS rules | Adam Ross (Finance/BI) | Pending | Band/spine examples. | No | - | - |
| C22 | 3 | Transport links (HS1/roads) increase mobility to fringe/outer-London roles. | 2020–2025 | Journey times/costs evidence | Adam Ross (BI) | Needs Clarification | Split travel vs mobility behaviours. | No | - | - |
| C23 | 3 | 5% uplift mitigates risk of vacancy rebound (scenario, not guarantee). | 2020–2025 | Scenario narrative referencing vacancy series | Adam Ross (Workforce/BI) | Pending | Ensure wording is risk-based. | No | - | - |
| C24 | 3 | Retention over agency saves ~£2m/year (scenario). | 2020–2025 | Baseline agency spend + scenario reduction | Adam Ross (Finance/BI) | Pending | Show assumptions; avoid certainty. | No | - | - |
| C25 | 3 | Produce an HCAS dossier and slide pack for Board/ICS/NHSPRB. | n/a | Project action | Adam Ross (Project) | Pending | Define artefacts and owners. | No | - | - |
| C26 | 3 | Comparator set to be agreed: Dartford/Gravesham/Thurrock (core). | n/a | Governance record | Adam Ross (Project) | Pending | Store minutes/decision evidence. | No | - | - |
| C27 | 3 | Secure staff-side and ICS letters of support. | n/a | Letters/minutes | Adam Ross (Project) | Pending | Track stakeholders & dates. | No | - | - |
| C28 | 3 | Submit within the NHSPRB evidence window. | n/a | NHSPRB timeline | Adam Ross (Project) | Needs Clarification | Confirm evidence window + route. | No | - | - |
| C29 | 3 | Implementation details are negotiated through NHS Staff Council processes. | n/a | AfC change governance | Adam Ross (Policy) | Pending | Link authoritative references. | No | - | - |
| C93 | 3 | “Level the field / retain talent / protect services / deliver value” map to measurable outcomes. | n/a | KPI mapping | Adam Ross (BI) | Pending | Add KPI dictionary per outcome. | No | - | - |
| C94 | 3 | Data shown covers house prices to Dec 2024; rents Jan 2024–Jan 2025; 2025 seasons; 2023/24 Council Tax. | As stated | Sources & Methods audit | Adam Ross (BI) | Pending | Must match actual datasets used. | No | - | - |
| C95 | 3 | Comparator alignment is central to submission strategy. | n/a | Strategy statement | Adam Ross (Project) | Pending | Tie to C26 and policy route. | No | - | - |

---

## Section 4 — Briefing

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C30 | 4 | Fringe-level costs without fringe pay create retention/vacancy risk. | 2020–2025 | Composite of cost + workforce claims | Adam Ross (BI) | Pending | Depends on verified C01–C20. | No | - | - |
| C31 | 4 | Medway sits on the London edge. | n/a | Geography/travel evidence | Adam Ross (BI) | Pending | Map/travel time artefact. | No | - | - |
| C32 | 4 | Housing/rent/Council Tax/rail costs mirror comparators. | 2020–2025 | Verified cost claims | Adam Ross (BI) | Pending | Must align periods and methods. | No | - | - |
| C33 | 4 | Staff do not receive 5% HCAS. | 2020–2025 | AfC + payslip/ESR evidence | Adam Ross (Policy/BI) | Pending | Trace to C05. | No | - | - |
| C34 | 4 | Pay lags take-home in neighbouring fringe trusts. | 2020–2025 | Pay modelling | Adam Ross (Finance/BI) | Pending | Worked examples. | No | - | - |
| C35 | 4 | Vacancy gains are fragile and can unwind if pay gap persists (risk statement). | 2020–2025 | Vacancy trend + scenario framing | Adam Ross (Workforce) | Pending | Avoid certainty language. | No | - | - |
| C36 | 4 | HS1/roads make fringe and outer-London moves easy. | 2020–2025 | Transport evidence | Adam Ross (BI) | Pending | Document typical travel times/costs. | No | - | - |
| C96 | 4 | “Rent +13% YoY; rail £6,784; Council Tax ~£2k” accurately summarise the evidence values used. | Snapshots | Reconciliation vs evidence table | Adam Ross (BI) | Pending | Must match exact values and periods. | No | - | - |
| C97 | 4 | The requested intervention is “Introduce 5% HCAS for Medway”. | n/a | Policy ask | Adam Ross (Project) | Pending | Keep wording consistent across all sections. | No | - | - |

---

## Section 5 — Cost-of-Living detail

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C37 | 5 | Medway UK HPI YoY is +2.5% to Dec 2024. | Dec 2023–Dec 2024 | UK HPI LA series | Adam Ross (BI) | Pending | Compute YoY; store extract. | No | - | - |
| C38 | 5 | Comparator UK HPI YoY to Dec 2024: Thurrock +2.6%, Dartford +3.0%, Gravesham +4.4%. | Dec 2023–Dec 2024 | UK HPI LA series | Adam Ross (BI) | Pending | Confirm rounding. | No | - | - |
| C39 | 5 | Housing inflation trend aligns with fringe areas (inference). | 2020–2025 | Depends on C37–C38 | Adam Ross (BI) | Pending | Keep as inference, not fact claim. | No | - | - |
| C40 | 5 | Medway median monthly rent is £1,165 in Jan 2025. | Jan 2025 | ONS PRMS | Adam Ross (BI) | Pending | Confirm metric definition. | No | - | - |
| C41 | 5 | Medway rent YoY is +13.1% (Jan 2025 vs Jan 2024). | Jan 2024–Jan 2025 | ONS PRMS | Adam Ross (BI) | Pending | Trace to dataset extract. | No | - | - |
| C42 | 5 | Comparator rent YoY: Thurrock +7.8%, Dartford +11.2%, Gravesham +9.1%. | Jan 2024–Jan 2025 | ONS PRMS | Adam Ross (BI) | Pending | Store extract and calculation. | No | - | - |
| C43 | 5 | Faster rent growth erodes take-home competitiveness without 5% HCAS (scenario). | 2020–2025 | Pay + rent scenario | Adam Ross (Finance/BI) | Pending | Show rent share of net pay examples. | No | - | - |
| C44 | 5 | Annual season (Gillingham→London Terminals) is £6,784 (2025). | 2025 | Southeastern fare capture | Adam Ross (BI) | Pending | Screenshot + date checked. | No | - | - |
| C45 | 5 | Dartford/Gravesend annual is ~£6,124; East Tilbury ~£3,724 (2025). | 2025 | Operator fare capture | Adam Ross (BI) | Pending | Confirm exact routes/products. | No | - | - |
| C46 | 5 | High commuting costs reduce take-home competitiveness (scenario). | 2020–2025 | Fare + pay scenarios | Adam Ross (Finance/BI) | Pending | Cost as % of net pay. | No | - | - |
| C47 | 5 | Medway Band D Council Tax is £2,008.56 (2023/24). | 2023/24 | Medway LA schedule | Adam Ross (BI) | Pending | Archive PDF/source. | No | - | - |
| C48 | 5 | Comparator Band D (2023/24): Thurrock £1,898.91; Dartford £2,077.98; Gravesham £2,103.76. | 2023/24 | LA schedules | Adam Ross (BI) | Pending | Archive PDFs. | No | - | - |
| C49 | 5 | Day-to-day expenses in Medway broadly align with national averages (needs definition). | 2020–2025 | ONS cost index proxy (define) | Adam Ross (BI) | Needs Clarification | Specify the metric or remove. | No | - | - |
| C50 | 5 | Band D is a common benchmark for a mid-range home. | n/a | GOV.UK guidance | Adam Ross (BI) | Pending | Link to guidance. | No | - | - |
| C51 | 5 | Overall cost pressures match/exceed fringe comparators (composite). | 2020–2025 | Depends on verified C37–C48 | Adam Ross (BI) | Pending | Must cite underlying verified claims. | No | - | - |
| C52 | 5 | Workforce risks remain elevated (definition required). | 2020–2025 | Turnover/vacancy/agency | Adam Ross (Workforce/BI) | Pending | Define “elevated” and comparators. | No | - | - |
| C53 | 5 | Composite supports inclusion in 5% fringe HCAS (policy inference). | n/a | Policy inference | Adam Ross (Policy/BI) | Needs Clarification | Define policy criteria being met. | Yes | - | - |
| C98 | 5 | “Standardised periods & units; single insight; no duplicate narratives” is achieved in the section. | n/a | Editorial QA | Adam Ross (Project) | Pending | Add a duplication checklist. | No | - | - |
| C99 | 5 | “Gap vs fringe avg: -0.8pp” for housing is correctly calculated. | Dec 2023–Dec 2024 | Calculation audit | Adam Ross (BI) | Pending | Define fringe average formula and rounding. | No | - | - |
| C100 | 5 | “Gap vs fringe avg: +3.7pp” for rent YoY is correctly calculated. | Jan 2024–Jan 2025 | Calculation audit | Adam Ross (BI) | Pending | Define average and pp rounding. | No | - | - |
| C101 | 5 | “Gap vs fringe avg: +£1.46k” for rail is correctly calculated. | 2025 | Calculation audit | Adam Ross (BI) | Pending | Define comparator set and rounding. | No | - | - |
| C102 | 5 | “Medway vs fringe avg: -£17” for Council Tax is correctly calculated. | 2023/24 | Calculation audit | Adam Ross (BI) | Pending | Confirm comparators and averaging method. | No | - | - |
| C103 | 5 | Comparator set for this section is Dartford / Gravesham / Thurrock. | n/a | Comparator definition | Adam Ross (Project) | Pending | Must match the rest of the report. | No | - | - |
| C104 | 5 | “Kent.gov.uk / UK HPI” are valid sources for the housing figures used. | n/a | Source QA | Adam Ross (BI) | Pending | Prefer authoritative UK HPI dataset as primary. | No | - | - |
| C105 | 5 | “Kent Online” is used only as secondary context for fares (not primary truth). | n/a | Source QA | Adam Ross (BI) | Pending | Keep operator pages as primary. | No | - | - |
| C106 | 5 | “Polimapper.co.uk” is used only as secondary context (not primary truth) for rents. | n/a | Source QA | Adam Ross (BI) | Pending | Keep ONS PRMS as primary. | No | - | - |

---

## Section 6 — Evidence at a glance

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C54 | 6 | Evidence table contains 6 datapoints: 4 cost + 2 workforce. | n/a | Internal consistency check | Adam Ross (Dev/BI) | Pending | Count rows + categories. | No | - | - |
| C55 | 6 | Periods are aligned across indicators (as stated). | n/a | Methods audit | Adam Ross (BI) | Pending | Confirm each row uses stated period. | No | - | - |
| C56 | 6 | Evidence table is sorted by Domain ascending (as displayed). | n/a | UI check | Adam Ross (Dev) | Pending | Confirm sort logic. | No | - | - |
| C57 | 6 | “vs fringe” gap values are correctly computed. | n/a | Calculation audit | Adam Ross (BI) | Pending | Recompute each gap and store formula. | No | - | - |
| C58 | 6 | Nurse turnover “~14%” uses a defined, consistent method. | n/a | ESR definition audit | Adam Ross (Workforce/BI) | Pending | Document numerator/denominator. | No | - | - |
| C59 | 6 | Comparator turnover 10–12% is evidenced with comparable definitions. | Same 12m window | FOI or published comparator papers | Adam Ross (FOI/BI) | Pending | FOI likely required. | Yes | - | - |
| C60 | 6 | Vacancy 34% → 9% is evidenced (dates and definition stated). | Define window | ESR series | Adam Ross (Workforce) | Pending | Add baseline/end date and staff group. | No | - | - |
| C107 | 6 | Rent row “+13.1% to £1,165” is correct and consistent with the rent card. | Jan 2024–Jan 2025 | ONS PRMS | Adam Ross (BI) | Pending | Reconcile card vs table. | No | - | - |
| C108 | 6 | Rent row “vs fringe: +£5” is correct (if shown). | Jan 2025 | Calculation audit | Adam Ross (BI) | Needs Clarification | Confirm the report’s “vs fringe” unit (pp vs £). | No | - | - |
| C109 | 6 | Rail row “vs fringe: +£660” is correct. | 2025 | Calculation audit | Adam Ross (BI) | Pending | Define comparator(s) used. | No | - | - |
| C110 | 6 | Council Tax row “vs fringe: +£110” is correct. | 2023/24 | Calculation audit | Adam Ross (BI) | Pending | Confirm formula and comparator set. | No | - | - |
| C111 | 6 | House prices row “vs fringe: -0.1%” is correct. | Dec 2023–Dec 2024 | Calculation audit | Adam Ross (BI) | Pending | Confirm pp vs %. | No | - | - |
| C112 | 6 | Evidence rows and labels (“Higher pressure / Steady / Improving”) reflect defined criteria. | n/a | Rules definition | Adam Ross (BI) | Needs Clarification | Add explicit thresholds or remove labels. | No | - | - |

---

## Section 7 — London adjacency & service catchment

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C61 | 7 | Cross-boundary flows along the London–Kent border exist for relevant pathways. | 2020–2025 | Aggregate activity by geography (SUS/HES) | Adam Ross (BI) | Pending | Use aggregates only; ensure IG compliance. | Yes (if external) | - | - |
| C62 | 7 | Fringe trusts treat London borough patients (example: Bexley). | 2020–2025 | Aggregate flows by borough | Adam Ross (BI) | Pending | Evidence as a share of activity. | No | - | - |
| C63 | 7 | Medway participates in regional specialist networks (example cited). | 2020–2025 | Network documentation / Trust/ICS papers | Adam Ross (Policy/BI) | Pending | Capture official reference. | No | - | - |
| C64 | 7 | Medway took part in COVID mutual-aid surgery programmes involving London patients. | 2020–2022 | Trust/ICS documentation | Adam Ross (Policy) | Pending | Locate minutes/comms evidence. | Yes (if internal-only) | - | - |
| C65 | 7 | Medway functions within a fringe-like ecosystem sharing patient flows and workforce markets. | 2020–2025 | Inference from C61–C64 + workforce evidence | Adam Ross (Policy/BI) | Pending | Keep as inference; reference drivers. | No | - | - |
| C113 | 7 | ~18% of elective referrals into Medway come from London boroughs. | Define window | Referral source geography analysis | Adam Ross (BI) | Needs Clarification | Must define “referrals”, period, and data source. | Yes | - | - |
| C114 | 7 | Medway theatre capacity was shared on mutual-aid lists spanning 6+ trusts. | 2020–2022 | Mutual aid list evidence | Adam Ross (Policy/Ops) | Pending | Identify participating trusts and evidence. | Yes | - | - |
| C115 | 7 | “Shared planning footprint” aligns with wider South East/London corridor (not closed local catchment). | 2020–2025 | Planning docs + flow evidence | Adam Ross (Policy/BI) | Pending | Cite planning document(s). | Yes | - | - |

---

## Section 8 — Workforce impact

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C66 | 8 | Medway competes in a London-fringe labour market without the fringe uplift. | 2020–2025 | Composite (HCAS mapping + turnover/vacancy evidence) | Adam Ross (Workforce/Policy) | Needs Clarification | Define “labour market” boundary + proof. | Yes | - | - |
| C67 | 8 | Turnover ~14% vs ~10–12% in nearby fringe trusts is accurate and comparable. | Same 12m window | ESR + FOI/comparator reports | Adam Ross (FOI/Workforce) | Pending | Must match definitions. | Yes | - | - |
| C68 | 8 | Vacancy fell from 34% to 9% through targeted recruitment/incentives. | Define window | ESR + initiative timeline | Adam Ross (Workforce) | Pending | Document initiatives and timing. | No | - | - |
| C69 | 8 | Staff can access employers paying 5% (fringe) or 15% (outer London). | 2020–2025 | AfC HCAS rules + employer mapping | Adam Ross (Policy) | Pending | Produce list/map of eligible employers. | No | - | - |
| C70 | 8 | HS1/road links make outer-London options realistic. | 2020–2025 | Travel time evidence | Adam Ross (BI) | Pending | Capture typical times/costs. | No | - | - |
| C71 | 8 | Churn increases agency reliance and rota fragility. | 2020–2025 | Agency/rota metrics | Adam Ross (Ops/Workforce) | Pending | Define indicators and baseline. | Yes | - | - |
| C72 | 8 | 5% HCAS helps lock in vacancy improvements, reduce churn-driven agency spend, and improve rota stability over 12–18 months (scenario). | 12–18 months | Scenario model | Adam Ross (Finance/Workforce) | Pending | Must show assumptions/sensitivity. | No | - | - |
| C116 | 8 | Shortage areas cited (theatres, critical care, emergency care) are materially affected by labour market competition. | 2020–2025 | Vacancy/turnover by area | Adam Ross (Workforce) | Pending | Define scope and evidence. | Yes | - | - |
| C117 | 8 | “Operational risk” is increased by churn (statement tied to measurable outcomes). | 2020–2025 | KPI mapping | Adam Ross (Ops) | Pending | Map to cancellations/fill-rate/escalations. | Yes | - | - |
| C118 | 8 | “Overall signal” wording reflects scenario-based expectations (not causal certainty). | n/a | Editorial QA | Adam Ross (Project) | Pending | Add language guardrails. | No | - | - |

---

## Section 9 — Policy route map

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C73 | 9 | Policy route can be described in 5 steps across local/system/national tiers. | n/a | AfC + NHSPRB process references | Adam Ross (Policy) | Pending | Add authoritative references. | No | - | - |
| C74 | 9 | Step 1 (local case pack) in Week 0–2 is feasible. | n/a | Project plan | Adam Ross (Project) | Pending | Convert to deliverable plan. | No | - | - |
| C75 | 9 | Step 2 (ICS + staff-side backing) in Week 3–6 is feasible. | n/a | Project plan | Adam Ross (Project) | Pending | Add dependencies. | No | - | - |
| C76 | 9 | Step 3 submit within NHSPRB evidence window is feasible. | n/a | NHSPRB timeline | Adam Ross (Project) | Needs Clarification | Confirm evidence window and route. | No | - | - |
| C77 | 9 | Step 4 negotiation via NHS Staff Council is part of AfC change process. | n/a | AfC governance | Adam Ross (Policy) | Pending | Add references. | No | - | - |
| C78 | 9 | Step 5 requires DHSC/HM Treasury sign-off and funding flows. | n/a | Government process | Adam Ross (Policy) | Needs Clarification | Keep high-level; add references. | No | - | - |
| C119 | 9 | “2 in progress” is accurate at time of publication. | n/a | Project status | Adam Ross (Project) | Pending | Must be kept current. | No | - | - |
| C120 | 9 | “Action focus – next 6 weeks” priorities are Step 1 and Step 2. | n/a | Project plan | Adam Ross (Project) | Pending | Add dated milestone plan. | No | - | - |
| C121 | 9 | Leads listed per step are correct (MFT / ICS / NHSPRB / DHSC). | n/a | Governance | Adam Ross (Project) | Pending | Confirm named groups. | No | - | - |
| C122 | 9 | The step descriptions match current policy reality (not a simplified fiction). | n/a | Policy QA | Adam Ross (Policy) | Pending | Validate against references; adjust if needed. | No | - | - |

---

## Section 10 — Expected outcomes

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C79 | 10 | Net vacancy rate could improve by ~3–4 percentage points over 12–18 months with 5% HCAS + controls (scenario). | 12–18 months | Scenario model | Adam Ross (Workforce/BI) | Pending | Must show baseline and sensitivity. | No | - | - |
| C80 | 10 | Reduced churn/fewer gaps could release ~£2m/year from agency spend (scenario). | 12–18 months | Scenario model + baseline spend | Adam Ross (Finance/BI) | Pending | Must show baseline and calculation. | No | - | - |
| C81 | 10 | Pay parity supports fairness/morale (measurable via staff survey). | 2020–2025 | Survey items/pulse | Adam Ross (People Analytics) | Pending | Identify items + baseline. | Yes (if needed) | - | - |
| C82 | 10 | Service stability improves across 4 London-adjacent pathways (examples cited). | 2020–2025 | KPI definitions by pathway | Adam Ross (Ops/BI) | Pending | Define pathways and KPIs. | Yes | - | - |
| C123 | 10 | “Figures are indicative, not actuarial forecasts” is true (editorial safeguard). | n/a | Editorial QA | Adam Ross (Project) | Pending | Keep disclaimer aligned with modelling quality. | No | - | - |
| C124 | 10 | Monitoring plan: monthly ESR vacancy + agency run-rate + fill-rate metrics are available and feasible. | 2020–2025 | Data availability audit | Adam Ross (BI) | Pending | Confirm where each measure lives. | Yes (if external) | - | - |
| C125 | 10 | “Best impact occurs when uplift paired with controls” is a scenario assumption, not a factual claim. | n/a | Editorial QA | Adam Ross (Project) | Pending | Keep as assumption label. | No | - | - |

---

## Section 11 — Action plan

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C83 | 11 | Action plan progress values (e.g., 1/3 = 33%) match actual status. | n/a | Project governance | Adam Ross (Project) | Pending | Must be kept current. | No | - | - |
| C84 | 11 | Comparator set agreement is recorded (Board/ICS alignment). | n/a | Minutes/decision record | Adam Ross (Project) | Pending | Store evidence. | No | - | - |
| C126 | 11 | Step 1 “Agree 5% fringe HCAS position” is completed (if shown as completed). | n/a | Governance record | Adam Ross (Project) | Pending | Add date + evidence. | No | - | - |
| C127 | 11 | Step 2 “Lock comparator set and data refresh” is in progress (if shown). | n/a | Delivery plan | Adam Ross (BI) | Pending | Add tasks and deadlines. | No | - | - |
| C128 | 11 | Step 3 “Prepare national case pack” is next up (if shown). | n/a | Delivery plan | Adam Ross (Project) | Pending | Add owners and artefacts. | No | - | - |
| C129 | 11 | Workstreams and owners listed are correct (Workforce & Finance / Comms / HR/MDs). | n/a | Governance | Adam Ross (Project) | Pending | Confirm named leads. | No | - | - |
| C130 | 11 | “Timeline: 2 weeks / 1 week / ongoing” is realistic and current. | n/a | Delivery plan | Adam Ross (Project) | Needs Clarification | Validate dates; adjust to reality. | No | - | - |
| C131 | 11 | Outputs listed (1-page table, 10-page PDF, letters, covering note) are defined and tracked. | n/a | Artefact list | Adam Ross (Project) | Pending | Create `/docs` artefact index. | No | - | - |

---

## Section 12 — Sources & Methods

| ID | Report Section | Claim/Statement | Time Period | Data Source/Method | Responsible Person | Status | Verification Notes | FOI Required | Expected Response Date | Last Reviewed |
|---|---|---|---|---|---|---|---|---|---|---|
| C85 | 12 | Sources & Methods checklists reproduce each metric used in the report. | n/a | Methods QA | Adam Ross (BI) | Pending | Execute each checklist end-to-end. | No | - | - |
| C132 | 12 | “6 sources” inventory is accurate. | n/a | Inventory check | Adam Ross (BI) | Pending | Match to actual linked sources. | No | - | - |
| C133 | 12 | “Cost sources (4)” inventory is accurate (HPI, Rent, Rail, Council Tax). | n/a | Inventory check | Adam Ross (BI) | Pending | Ensure authoritative sources are primary. | No | - | - |
| C134 | 12 | “Workforce sources (1)” inventory is accurate (ESR/board papers). | n/a | Inventory check | Adam Ross (Workforce/BI) | Pending | Confirm what is included. | No | - | - |
| C135 | 12 | “Policy sources (1)” inventory is accurate (AfC/NHSPRB/DHSC). | n/a | Inventory check | Adam Ross (Policy) | Pending | Confirm reference list. | No | - | - |
| C136 | 12 | Housing checklist steps are correct (download series, compute YoY, align period). | n/a | Method validation | Adam Ross (BI) | Pending | Store worked example. | No | - | - |
| C137 | 12 | Rent checklist steps are correct (metric choice, YoY calc, period statement). | n/a | Method validation | Adam Ross (BI) | Pending | Store worked example. | No | - | - |
| C138 | 12 | Rail checklist steps are correct (annual season, fare code/date, HS1 flag). | n/a | Method validation | Adam Ross (BI) | Pending | Store screenshot protocol. | No | - | - |
| C139 | 12 | Council Tax checklist steps are correct (2023/24 Band D, precept note). | n/a | Method validation | Adam Ross (BI) | Pending | Store source PDFs. | No | - | - |

---

# Historical disadvantage model (Jan 2020 → Dec 2025)

## Objective
Quantify how long Medway has been disadvantaged by the absence of **5% fringe HCAS**, without overstating causality.

## Recommended modelling options (run one, or both as sensitivity)
**Option A — Worked pay examples (lowest risk, high clarity)**
- Select representative roles (e.g., AfC Band 5/6/7), typical spine points.
- Compute annual gross difference: **0% vs 5% HCAS**.

**Option B — Workforce-weighted estimate (more powerful, higher assumptions)**
- Use Electronic Staff Record (ESR) headcount/FTE by band (snapshots or annual averages).
- Apply 5% uplift rules (confirm which pay elements are included).
- Present as “indicative allowance foregone”, with clear caveats.

## Historical disadvantage deliverables tracker
| ID | Deliverable | Method | Owner | Status | Notes | Last Reviewed |
|---|---|---|---|---|---|---|
| HD01 | Confirm how HCAS is applied (included pay elements) for modelling. | AfC handbook + payroll element definitions | Adam Ross (Policy/Finance) | Pending | Define “basic pay only” vs broader. | - |
| HD02 | Build Band 5/6/7 worked examples for each year 2020–2025. | Spreadsheet model | Adam Ross (Finance/BI) | Pending | Include spine points and assumptions. | - |
| HD03 | Build ESR workforce-weighted estimate (annual snapshots 2020–2025). | ESR extracts + model | Adam Ross (Workforce/BI) | Pending | Prefer FTE; document definitions. | - |
| HD04 | Create sensitivity ranges (different spine points / band mixes). | Sensitivity analysis | Adam Ross (BI) | Pending | Report ranges not single-point certainty. | - |
| HD05 | Write “what this proves / does not prove” narrative. | Editorial | Adam Ross (Project) | Pending | Avoid causal claims about outcomes. | - |
| HD06 | Add a visual (timeline + cumulative illustrative total). | Chart | Adam Ross (BI) | Pending | Use clear caveat labels. | - |

---

# Sources & Methods (authoritative links)

- UK House Price Index (UK HPI) (ONS / Land Registry): https://www.gov.uk/government/collections/uk-house-price-index-reports  
- ONS housing / Private Rental Market Statistics (PRMS): https://www.ons.gov.uk/peoplepopulationandcommunity/housing  
- Council Tax bands (general guidance): https://www.gov.uk/council-tax-bands  
- Agenda for Change (AfC) Handbook (incl. HCAS rules): https://www.nhsemployers.org/articles/agenda-change-handbook  
- FOI guidance (ICO): https://ico.org.uk/for-organisations/foi/  

**House prices checklist**
1) Download LA series for Medway + comparators  
2) Compute YoY = (t − t−12) / (t−12)  
3) Align to Dec 2024 (snapshot) and build 2020–2025 series  

**Rent checklist**
1) Use ONS PRMS median monthly rent (define geography)  
2) Compute Jan 2025 vs Jan 2024 YoY (snapshot)  
3) Build 2020–2025 series where available, with consistent definitions  

**Rail fares checklist**
1) Quote standard annual season only  
2) Record route/product/date checked + screenshot  
3) Flag HS1 vs classic products explicitly  

**Council Tax checklist**
1) Use Band D schedule per LA per year (2020–2025 where possible; 2023/24 snapshot minimum)  
2) Note parish/precept caveats  

**Workforce checklist**
1) Lock definitions for turnover and vacancy (numerator/denominator)  
2) Ensure comparator metrics match definitions (FOI if needed)  

---

# FOI templates (copy into `/foi/templates/`)

## FOI Template A — Generic (HCAS confirmation + routine KPI outputs)

```text
Subject: FOI request — High Cost Area Supplement (HCAS) / comparator evidence (2020–2025)

Dear FOI Team,

Under the Freedom of Information Act 2000, please provide the following information for the period 1 January 2020 to 31 December 2025 (or the closest held period where exact dates are not possible).

1) High Cost Area Supplement (HCAS)
   a) Please confirm whether any sites within your Trust are eligible for HCAS (Inner London / Outer London / Fringe).
   b) If eligible, please confirm the applicable rate(s) and the site(s) to which they apply.

2) Comparator workforce metrics (high-level)
   Please provide any routinely produced workforce KPI reports/board papers that include turnover and vacancy rates for registered nurses (or nearest equivalent staff group definition used by your Trust).

Preferred format: PDF or Excel/CSV.

If any part of the request exceeds the cost limit, please advise which question(s) drive the burden and provide the subset you can supply within the limit.

Kind regards,
[NAME]
[ROLE]
[ORGANISATION]
[CONTACT EMAIL]
```

## FOI Template B — Workforce metrics (definitions-first)

```text
Subject: FOI request — Nursing turnover, vacancy and agency indicators (definitions included) (2020–2025)

Dear FOI Team,

Under the Freedom of Information Act 2000, please provide the following information for 1 January 2020 to 31 December 2025 (or the closest held period).

Scope: Registered nursing workforce (or closest equivalent group used in your internal reporting).

A) Vacancy
1) Please provide your reported nursing vacancy rate (%) for each quarter (or month if available).
2) Please provide the definition used (numerator/denominator), e.g. vacant posts as a % of funded establishment (FTE) and whether bank/agency posts are included/excluded.

B) Turnover
3) Please provide nursing turnover rate (%) for each quarter (or month if available).
4) Please provide the definition used (e.g. leavers in-period / average headcount) and any exclusions (retirements, internal transfers, fixed-term endings).

C) Agency (if routinely reported)
5) Please provide quarterly nursing agency spend (£) and/or agency hours, if available in routinely produced reports.

Preferred format: Excel/CSV (one row per period).

If you do not hold these metrics in the requested form, please provide the nearest equivalent routinely produced KPI outputs and definitions.

Kind regards,
[NAME]
[ROLE]
[ORGANISATION]
[CONTACT EMAIL]
```

## FOI logging rules
- Save outgoing requests: `/foi/sent/YYYY-MM-DD_<Org>_<Topic>.md`
- Save replies: `/foi/received/YYYY-MM-DD_<Org>_<Topic>/`
- Update tracker row(s): FOI Required = Yes, Expected Response Date = (20 working days + buffer), Status, Notes.

---

# Contribution & update process

## When the report changes
- Add/update tracker rows in the same commit as the text/UI change.
- If one sentence contains multiple assertions, split into multiple claim IDs.
- Link evidence artefacts in **Verification Notes**.

## Evidence naming conventions
- `/evidence/C37/public/UKHPI_Medway_2024-12_extract.csv`
- `/evidence/C44/public/2025-01-15_Southeastern_Gillingham_London_Annual.png`
- `/evidence/C18/internal/ESR_turnover_query.sql`
- `/evidence/C67/foi/2025-02-03_DGT_turnover_vacancy_reply.pdf`

## Error handling (strict)
- Unclear wording → **Needs Clarification** with a rewrite action.
- Conflicting evidence → **Disputed** with both sources recorded and a resolution plan.
- Missing owner/source/date → fix immediately before adding more claims.

---

# Audit log / validation note

After any substantive tracker change, add a short entry here:

- **YYYY-MM-DD:** What changed (IDs added/edited), and why. Validation: confirms table remains consistent OR flags unresolved items.

Example:
- **2025-12-14:** Added C113–C115 for Section 7 numeric claims and clarified “vs fringe” unit ambiguity in C108. Validation: IDs are append-only; no renumbering; outstanding: define “referrals” for C113.
