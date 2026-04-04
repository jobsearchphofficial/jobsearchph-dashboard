# Job Search PH — Dashboard Project Context
> Drop this file into every Claude Code session. It contains everything needed to continue development without re-explaining history.

---

## What This Is
A **single-file recruitment management dashboard** (`index.html`) for **Job Search PH**, a blue-collar job placement agency in Bacolod City, Philippines. Specializes in household workers: Yaya, Kasambahay, All-around helpers. DOLE-compliant, no-placement-no-fee model with 30-day replacement guarantee.

**Hosted on:** GitHub Pages  
**URL:** `https://jobsearchphofficial.github.io/jobsearchph-dashboard`  
**File:** Single `index.html` — no build process, no npm, no frameworks. Open in browser = works.

---

## Tech Stack
- **Vanilla JS + HTML/CSS** — zero dependencies
- **Fonts:** Plus Jakarta Sans + JetBrains Mono (Google Fonts)
- **Data source:** Google Sheets published as CSV (read-only)
- **Storage:** `localStorage` only — all edits live in the browser
- **AI:** Anthropic API (`claude-sonnet-4-6`) for AI Matcher tab
- **Theme:** Light white theme, accent color `#1755ed`

---

## Google Sheets Data Sources

```js
const SHEET_CANDIDATES   = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxIFw8KDwhsz4Xw55Z3-GUb9yoyEBpnhKHovv2YYQEMxBqh0E4fRCDqCvHi3a6MrmWjaN0_e2KnGx2/pub?gid=1026175595&single=true&output=csv";
const SHEET_JOB_REQUESTS = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxIFw8KDwhsz4Xw55Z3-GUb9yoyEBpnhKHovv2YYQEMxBqh0E4fRCDqCvHi3a6MrmWjaN0_e2KnGx2/pub?gid=865983128&single=true&output=csv";
const SHEET_PLACEMENTS   = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSxIFw8KDwhsz4Xw55Z3-GUb9yoyEBpnhKHovv2YYQEMxBqh0E4fRCDqCvHi3a6MrmWjaN0_e2KnGx2/pub?gid=576481838&single=true&output=csv";
```

### Sheet Column Mapping

**Candidates** (Row 1 = "JOB SEEKERS" title, Row 2 = merged header, Row 3 = column headers, data from Row 4):
- A=ID (C001, C002...), B=Timestamp, C=Full Name, D=Facebook Name
- E=Age, F=Contact/Phone, G=Email, H=Job Type, I=Skills
- J=Location, K=Expected Pay, L=Gender, M=Past Jobs
- N=Resume Link, O=Civil Status, P=When can start, Q=Status (Verified/Unverified), R=Internal Notes

**Job Requests** (Row 1 = title, Row 2 = headers, data from Row 3+):
- A=ID (JOO-01...), B=Timestamp, C=Company, D=Contact Person
- E=Contact#, F=Email, G=Address, H=Job Title, I=Position (detailed)
- J=Slots, K=Work Schedule, L-M=Civil Status req, N=Gender Pref
- O=Skills Needed, P=Experience, Q=Rate/Salary, R=Benefits
- S=Tools, T=Other Notes, U=JO Status, V=Workers Filled, W=Fee Rate, X=Fee Amount

**Placements** (Row 1 = headers, data from Row 2+):
- A=Placement ID, B=Job Order ID, C=Candidate ID, D=Candidate Name
- E=Company, F=Response, G=Position, H=Status, I=Date, J=Notes

---

## localStorage Keys (ALL data that persists)

| Key | Type | Description |
|-----|------|-------------|
| `blacklist` | `{}` | `{ candId: { reason, notes, date } }` |
| `manual_placements` | `[]` | Placements added manually (not from sheet) |
| `candidate_notes` | `{}` | `{ "joId_candId": "note text" }` — placement-level notes |
| `jo_status_overrides` | `{}` | `{ joId: 'Active'\|'On Hold'\|'Cancelled'\|'Fulfilled' }` |
| `candidate_ratings` | `{}` | `{ candId: { docs, scores, adjustment, autoVerified } }` |
| `prow_extra_{pid}` | `{}` | Per-placement: response, status, lastContacted, followupDate, followup2Date, interviewDate, contactVia, notes, autoMarkedNoResp |
| `hire_data_{pid}` | `{}` | Hired tab: hireDate, feeAmount, feeStatus, issueReported, issueNote |
| `cand_notes_{candId}` | `[]` | Profile notes: `[{ text, ts }]` — timestamped |
| `jo_fulfill_{joId}` | `{}` | Fulfillment data: remarks, payment, closeOpt, date |
| `jo_delayed_close_{joId}` | ISO date | When delayed close triggers |
| `reminder_done_{YYYY-MM-DD}` | `[]` | Checked reminder keys for that day |
| `fulfilled_popup_{joId}` | sessionStorage | Prevents double popup in same session |

---

## App Structure (4 tabs + modals)

### Tab 1: 📋 Job Orders
- **JO status filter bar:** All / Active / On Hold / Fulfilled / Cancelled
- **Tab per job order** showing ID, position, company, hire progress
- **JO Panel** shows: hiring progress bar (X/Y hired), status chip, status action buttons (Hold/Cancel/Reopen)
- **Candidate rows (`.prow`)** — collapsed by default, expand on click:
  - Collapsed shows: status dot, name, ID, last contacted date, follow-up warning, stale badge, via badge, status pill, 🚫 blacklist btn
  - Expanded shows: Response, Status, Contacted Via, Last Contacted, Follow-up #1, Follow-up #2, Interview Date (only when For Interview/Interviewed), Notes, View Profile btn
- Auto-suggest follow-up = last contacted + 3 days
- Auto-mark No Response after 14 days stale
- Fulfillment popup when hired = slots (remarks, payment, close timing)

### Tab 2: 👥 Candidates
- Filter by: Job Type, Location, Verified/Unverified, Gender, Show/Hide Blacklisted
- Search by name or ID
- Cards show: name, ID, age, gender, job type, location, expected pay, past jobs, skills, rating stars, High Demand tag
- Click card → opens Candidate Profile Modal
- Location normalized (e.g. "bacolod city, neg occ" → "Bacolod City")
- Job type takes first option only

### Tab 3: ✅ Hired
- All candidates with Status = Hired across all job orders
- Filters: by Job Order, Fee Status, Guarantee Status
- Each card: employer, position, hire date (editable), fee amount, fee status (Paid/Pending/Waived)
- 30-day guarantee countdown bar
- ⚠️ Report Issue button → flags for replacement

### Tab 4: 🤖 AI Matcher
- Select job order → Find Best Candidates
- Sends all eligible candidates (not blacklisted, not already in that JO) to Anthropic API
- Returns ranked top 10 with fit level, reason, flags, next step
- Each result has ➕ Add button
- Rating + behavior flags included in prompt

---

## Candidate Profile Modal
Sections (in order):
1. **Hero:** avatar, name, ID, registered date, verified/blacklist badges
2. **Rating & Status:**
   - Score circle (1–10), label (Elite/Good/Average/Avoid), stars
   - Score breakdown table (each factor + / -)
   - Documents grid (6 docs, click to toggle): Brgy Clearance (+0.5), Police Clearance (+1.0), NBI Clearance (+0.5), Valid ID (+0.5), Resume (+0.5), Medical (info only)
   - Docs marked `VERIFIES` auto-set verified status
   - Call Attitude buttons (1–5): Poor(-1.5) → Excellent(+1.0)
   - Behavior flags grid: repliedFast(+1), showedUp(+2), completedJob(+2), lateReply(-1), noShow(-2.5), backedOut(-2)
3. **Personal Info:** age, gender, location, pay, job type, verified status
4. **Experience:** skills, past jobs
5. **Contact:** SMS, Phone, Viber, Facebook Messenger, Gmail (tap to open)
6. **Notes:** timestamped notes list, add/delete

---

## Rating Formula
```
Base = 5.0
+ Barangay Clearance: +0.5
+ Police Clearance: +1.0
+ NBI Clearance: +0.5
+ Valid ID: +0.5
+ Resume: +0.5
+ Auto-Verified (via any doc): +0.5
+ Call Attitude 5: +1.0 / 4: +0.5 / 3: 0 / 2: -0.5 / 1: -1.5
+ Replied within 24hrs: +1.0
+ Showed up to interview: +2.0
+ Completed a job: +2.0
- Late/no reply 3+ days: -1.0
- No-show: -2.5
- Backed out after accepting: -2.0
Blacklisted → cap at 2.0, tag "Do Not Recommend"
Clamp: 1.0 – 10.0

Labels: 9–10=Elite, 7–8.9=Good, 5–6.9=Average, <5=Avoid
```

Auto-verify triggers: Barangay, Police, NBI, Valid ID, Medical (any 1 = Verified)

---

## Auto-Normalization Rules
**Locations:** Any variation of "bacolod" → "Bacolod City", "talisay" → "Talisay City", etc.
**Job types:** Take first option before comma only
**Dropped statuses:** ineligible, rejected by employer, rejected, cancelled, blacklisted, withdrawn, no show, not qualified, failed interview, backed out → all normalized to "Dropped"

---

## Key Business Rules
- **No placement, no fee** model
- **30-day replacement guarantee** after hire
- DOLE-compliant
- Blacklisted candidates: never shown to AI Matcher, never recommended
- Duplicate warning: if candidate already active in another JO → confirm popup
- High Demand: candidate in 2+ active job orders → 🔥 badge
- Fulfilled JO: when hired = slots → fulfillment popup → can delay close 3/5/7 days or close now

---

## CSS Variables (Light Theme)
```css
--bg: #f0f4ff         /* page background */
--card: #ffffff       /* card background */
--accent: #1755ed     /* primary blue */
--accent2: #1245cc    /* darker blue */
--border: #dde5f5     /* card borders */
--green: #059669      /* success */
--red: #dc2626        /* danger */
--orange: #ea580c     /* warning */
--gold: #f59e0b       /* stars/gold */
--text: #0f172a       /* primary text */
--text2: #334155      /* secondary text */
--text3: #64748b      /* muted text */
```

---

## What's NOT Yet Built (backlog)
1. **Firebase/Supabase sync** — data only in localStorage, lost on cache clear, doesn't sync across devices
2. **Business analytics** — no charts, revenue tracking, conversion rates
3. **Mobile-first redesign** — works on desktop, awkward on phone
4. **Message templates** — pre-written FB Messenger/SMS/Viber scripts
5. **Employer profiles** — no dedicated employer management
6. **Export/PDF** — no Excel export or placement certificates
7. **Browser push notifications** — no phone alerts for follow-up dates
8. **Add candidate manually** from Candidates tab (only possible from Job Order currently)
9. **Rehire Similar Candidate** button
10. **Daily reminders risk flags** — no Unresponsive status yet

---

## Common Gotchas
- **Apostrophes in JS strings** will break everything (e.g. `Gov't` inside single quotes). Always use `Govt` or escape properly.
- **Always run `node -e "new Function(js)"` syntax check** after editing JS.
- File is ~3,600 lines — edit surgically, never rewrite whole sections unless necessary.
- Sheet data is read-only. All edits go to localStorage only.
- `prow_extra_{pid}` is the most important localStorage key — it overrides sheet data for response/status on every placement row.
- Template literals inside template literals need careful escaping.
- The file uses `escAttr()` and `escHtml()` for XSS safety — always use these when rendering user data.

---

## How to Continue Development
1. Open this file + `index.html` in Claude Code
2. Reference this file for context
3. Make surgical edits — find the exact function, replace only what changes
4. After any JS edit: `node -e "const fs=require('fs');const h=fs.readFileSync('index.html','utf8');const js=h.slice(h.indexOf('<script>')+8,h.lastIndexOf('</script>'));try{new Function(js);console.log('OK')}catch(e){console.log('ERROR:',e.message)}"`
5. Test in browser before pushing to GitHub

---
*Last updated: April 2026 — ~3,667 lines, 91 functions*
