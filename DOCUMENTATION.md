# Syllabus Enhancement Tool — PES University

## Overview

An AI-powered web application that evaluates and improves university syllabi across 11 academic programmes. Faculty upload an existing syllabus (PDF/DOCX), select their programme, and the tool uses Claude AI to benchmark, restructure, and enhance the syllabus against global standards.

**Live URL:** `syllabusfomc-production.up.railway.app`

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 7, Tailwind CSS 4, Axios |
| Backend | Node.js, Express 4 |
| AI | Claude Opus 4.6 (Anthropic API) |
| File Parsing | Mammoth (DOCX), PDF-Parse (PDF) |
| Document Export | docx library (Word generation) |
| Deployment | Railway |

---

## Features

- **11 programme support** — MBA, BCom, BCom ACCA, BCom CMA, BBA, BBA Analytics, BA LLB, BBA LLB, BSc Psychology, BSc Economics, BHEM
- **AI-driven evaluation** — Benchmarks against top global and Indian institutions
- **Color-coded output** — YELLOW (updated content), GREEN (AI tools added), RED (content to remove)
- **12-section structured output** — Standardized syllabus format
- **DOCX export** — Professionally formatted Word document with PES branding
- **Copy to clipboard** — Plain text export
- **5-step progress indicator** — Real-time feedback during generation
- **File naming** — Downloaded file is named after the course/subject title

---

## Supported Programmes

### Postgraduate
| Programme | QS Subject | Benchmarked Against |
|-----------|-----------|-------------------|
| MBA | Business & Management Studies | Harvard, Wharton, MIT Sloan, INSEAD, IIMs, ISB |
| MSc Psychology | Psychology | Oxford (MSc), Cambridge (MPhil), UCL (MSc), Amsterdam (MSc), Melbourne, Edinburgh, UBC, King's College London, NIMHANS, TISS |
| LLM | Law & Legal Studies | NLSIU, NLU Delhi, NALSAR, NLU Jodhpur, DU Law Faculty, WBNUJS, BCI |

### UG Commerce & Management
| Programme | QS Subject | Benchmarked Against |
|-----------|-----------|-------------------|
| BCom | Accounting & Finance | Melbourne (BCom), Sydney (BCom), UNSW (BCom), Toronto Rotman (BCom), McGill (BCom), Monash (BCom), Auckland (BCom) |
| BCom ACCA | Accounting & Finance | ACCA Global, Melbourne (BCom), Sydney (BCom), UNSW (BCom), Toronto (BCom), McGill (BCom), Oxford Brookes |
| BCom CMA | Accounting & Finance | ICMAI, IMA (USA), Melbourne (BCom), Sydney (BCom), UNSW (BCom), Toronto (BCom), Monash (BCom) |
| BCom CFA | Accounting & Finance | CFA Institute, UNSW (BCom-CFA), Toronto (BCom-CFA), McGill (BCom-CFA), Melbourne (BCom), Monash (BCom-CFA) |
| BCom CA | Accounting & Finance | ICAI, Melbourne (BCom-CA ANZ), Sydney (BCom-CA ANZ), UNSW (BCom), Toronto (BCom-CPA), Cape Town (BCom-SAICA) |
| BBA | Business & Management Studies | NUS (BBA), HKUST (BBA), HKU (BBA), CUHK (BBA), Michigan Ross (BBA), UT Austin McCombs (BBA), SMU Singapore (BBA) |
| BBA Analytics | Data Science & AI | NUS (BSc Business Analytics), Michigan Ross (BBA-Analytics), UT Austin McCombs (BBA-MIS), HKUST (BBA-IS) |
| BBA Sports | Sports-related Subjects | Loughborough (BSc Sport Mgmt), Deakin (B. Sport Mgmt), Michigan (BSc Sport Mgmt), Ohio State (BS Sport Industry) |

### UG Law
| Programme | QS Subject | Benchmarked Against |
|-----------|-----------|-------------------|
| BA LLB | Law & Legal Studies | NLSIU Bangalore, NLU Delhi, NALSAR Hyderabad, WBNUJS Kolkata, NLU Jodhpur, GNLU Gandhinagar, BCI |
| BBA LLB | Law & Legal Studies | Symbiosis Law School, NMIMS School of Law, O.P. Jindal Global Law School, NLSIU, NLU Delhi, BCI |
| LLB | Law & Legal Studies | Faculty of Law DU, Government Law College Mumbai, ILS Law College Pune, NLSIU, NLU Delhi, BCI |

### UG Science / Social Science
| Programme | QS Subject | Benchmarked Against |
|-----------|-----------|-------------------|
| BSc Psychology | Psychology | Oxford (BA Experimental Psych), Cambridge (BA PBS), UCL (BSc), Toronto (BSc), UBC (BSc), Edinburgh (BSc), Amsterdam (BSc) |
| BSc Economics | Economics & Econometrics | LSE (BSc), Cambridge (BA), UCL (BSc), Toronto (BSc), NUS (BSc), Warwick (BSc), Edinburgh (BSc) |
| BSc JMC | Communication & Media Studies | USC Annenberg (BA), LSE (BSc), Northwestern Medill (BSJ), Amsterdam (BSc), NTU Singapore (BA), Wisconsin-Madison (BSc), QUT (B. Comm) |

### UG Hospitality
| Programme | QS Subject | Benchmarked Against |
|-----------|-----------|-------------------|
| BHEM | Hospitality & Leisure Management | EHL Lausanne (BSc), Cornell (BS), Hong Kong PolyU (BSc), UNLV (BS), Glion (BBA), Les Roches (BBA), Surrey (BSc) |

---

## How It Works

### User Flow

1. **Select Programme** — Choose from 11 academic programmes
2. **Upload Syllabus** — Drag-and-drop or browse for a PDF/DOCX file (max 20 MB)
3. **AI Processing** — The tool:
   - Extracts text from the uploaded file
   - Builds a programme-specific prompt with benchmarks, Bloom's taxonomy, and PO mapping
   - Sends to Claude AI for evaluation and enhancement
   - Generates a formatted DOCX file
4. **Review Output** — View the enhanced syllabus with color-coded highlights
5. **Download** — Copy text or download as a professionally formatted .docx file

### Processing Pipeline

```
Upload (PDF/DOCX)
    ↓
Text Extraction (Mammoth / PDF-Parse)
    ↓
Programme-Specific Prompt Assembly
    ↓
Claude AI Analysis (Opus 4.6, 12k tokens, temp 0.3)
    ↓
Output Rendering (color-coded text)
    ↓
DOCX Generation (branded, formatted)
    ↓
Download
```

---

## AI Enhancement Process

The AI performs the following steps on each syllabus:

### Step 1 — Evaluation
- Compares against programme-specific global benchmarks
- Checks topic coverage, rigor, and relevance

### Step 2 — Content Quality Overhaul
- **DELETE** (RED): Outdated content, obsolete tools, redundant topics
- **UPDATE** (YELLOW): Refined/modernized existing content
- **ADD** (GREEN): AI tools, modern frameworks, industry-relevant topics

### Step 3 — Curriculum Improvement
- Aligns Course Objectives to Bloom's Taxonomy
- Creates Course Outcomes (COs) with action verbs and Bloom's levels
- Maps COs to Programme Outcomes (POs) and PSOs

### Step 4 — Structure Enforcement
- Exactly **4 units** (no more, no less)
- Credit-to-hours mapping (2C=20h, 3C=30h, 4C=40h, 5C=50h)
- No topic overlap across units
- Pedagogically sound sequence (foundational → advanced)

### Step 5 — Special Programme Rules
- **Law programmes**: Mandatory landmark cases per unit (5-10 judgments)
- **Professional programmes** (ACCA/CMA): Exam paper objective mapping
- **UG programmes**: Difficulty calibration (max Bloom's L4 for most topics)

---

## Output Format (12 Sections)

1. **Course Information** — Title, code, credits, programme, semester
2. **Preamble** — Course purpose and positioning
3. **Course Objectives** — 4 objectives aligned to Bloom's
4. **Course Outcomes & Skill Outcomes** — 4 COs + 3 SOs with Bloom's levels
5. **Programme Outcomes** — PO and PSO tables
6. **Detailed Course Contents** — 4 units with topics, hours, and tools
7. **CO-PO-PSO Mapping Matrix** — Correlation levels (3=High, 2=Medium, 1=Low)
8. **Bloom's Taxonomy Alignment Summary**
9. **Assessment Plan** — Weightages and Bloom's levels
10. **Textbooks & References** — Post-2021 editions + MOOCs
11. **Syllabus Revision Summary** — % change, new/removed topics, tools added
12. **Approval Signatures**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload syllabus file (PDF/DOCX, max 20 MB) |
| POST | `/api/generate` | Generate enhanced syllabus (body: `syllabusFilename`, `syllabusType`, `programId`) |
| GET | `/api/download` | Download generated DOCX (query: `filename`, `downloadName`) |
| GET | `/api/health` | Health check |

---

## Project Structure

```
syllabus/
├── backend/
│   ├── src/
│   │   ├── app.js                    # Express server entry point
│   │   ├── config/
│   │   │   ├── programConfig.js      # 11 programme definitions (POs, benchmarks, rules)
│   │   │   └── masterPrompt.js       # Dynamic prompt builder (400+ lines)
│   │   ├── controllers/
│   │   │   ├── uploadController.js   # File upload handler
│   │   │   └── generateController.js # Main generation workflow
│   │   ├── routes/
│   │   │   ├── upload.js             # POST /api/upload
│   │   │   ├── generate.js           # POST /api/generate
│   │   │   └── download.js           # GET /api/download
│   │   └── services/
│   │       ├── aiService.js          # Claude API integration
│   │       ├── fileParser.js         # PDF/DOCX text extraction
│   │       ├── promptEngine.js       # Prompt assembly
│   │       └── docxExporter.js       # Word document generation (428 lines)
│   ├── uploads/                      # Temporary file storage (auto-cleaned)
│   ├── .env                          # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── main.jsx                  # React entry point
│   │   ├── App.jsx                   # Router
│   │   ├── index.css                 # Tailwind + PES theme
│   │   ├── pages/
│   │   │   └── Home.jsx              # Main page (2-step workflow)
│   │   ├── components/
│   │   │   ├── ProgramSelector.jsx   # Programme selection grid
│   │   │   ├── FileUpload.jsx        # Drag-and-drop upload
│   │   │   ├── OutputViewer.jsx      # Color-coded output display
│   │   │   └── ActionBar.jsx         # Copy + Download buttons
│   │   └── services/
│   │       └── api.js                # Axios API client
│   ├── public/
│   │   └── pes-logo.png              # University logo
│   └── package.json
├── package.json                      # Root (dev + build scripts)
└── .gitignore
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3001) |
| `ANTHROPIC_API_KEY` | Yes | Claude API key from console.anthropic.com |

---

## Local Development

```bash
# Install dependencies
npm install
npm install --prefix backend
npm install --prefix frontend

# Start both frontend + backend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

---

## Deployment (Railway)

1. Push code to GitHub
2. Connect repo to Railway
3. Set environment variable: `ANTHROPIC_API_KEY`
4. Build command: `npm run build`
5. Start command: `npm start`
6. Generate a public domain in Settings → Networking

---

## AI Configuration

| Parameter | Value | Reason |
|-----------|-------|--------|
| Model | `claude-opus-4-6` | Highest quality for complex curriculum analysis |
| Max Tokens | 12,000 | Prevents output truncation on long syllabi |
| Temperature | 0.3 | Consistent, deterministic output |
| Input Limit | 150,000 chars | Syllabus text truncated beyond this |
| Timeout | 180 seconds | Large syllabi may take 60-90 seconds |

---

## DOCX Export Features

- PES University logo (if available)
- Navy-blue title banner with course metadata
- Color legend bar (Yellow, Green, Red)
- Styled section headings with blue borders
- Unit headers with navy background
- Formatted data tables with borders and shading
- Page headers with course name
- Page footers with "Page X of Y"
- Calibri font, 1-inch margins

---

## Security

- File upload validation (MIME type + size limit)
- Path traversal protection on download route
- Auto-cleanup of uploaded and generated files
- `.env` file excluded from git via `.gitignore`
- API key stored as environment variable, not in code

---

## Limitations

- SMTP email is blocked on Railway free tier (port restrictions)
- Railway free tier: 30 days or $5 usage limit
- All users share a single Anthropic API key (billed per generation)
- Generated files are stored temporarily and auto-deleted after download
