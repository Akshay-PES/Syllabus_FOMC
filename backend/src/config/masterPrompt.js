'use strict';

/**
 * Dynamic Master Prompt Builder — Syllabus Evaluator & Improver
 *
 * Builds a prompt tailored to the selected programme (MBA, BCom, BBA, etc.)
 * Placeholder injected at runtime: {{SYLLABUS_CONTENT}}
 *
 * Colour tags used in output:
 *   [YELLOW]...[/YELLOW] — Updated / Modified content
 *   [GREEN]...[/GREEN]   — AI Tools specifically
 *   [RED]...[/RED]       — Content to be removed
 */

const { buildPoTableMarkdown, buildCoPoMatrixHeader, buildCoPoMatrixRows } = require('./programConfig');

function buildMasterPrompt(program) {
  const poTable        = buildPoTableMarkdown(program);
  const coPoHeader     = buildCoPoMatrixHeader(program);
  const coPoRows       = buildCoPoMatrixRows(program);
  const extraRules       = program.extraRules ? `\n${program.extraRules}\n` : '';
  const isLaw            = program.id === 'BA_LLB' || program.id === 'BBA_LLB' || program.id === 'LLB' || program.id === 'LLM';
  const isProfessional   = program.id === 'BCOM_ACCA' || program.id === 'BCOM_CMA' || program.id === 'BCOM_CFA' || program.id === 'BCOM_CA';

  const ugCalibration = program.level === 'UG' ? `
---

## STEP 4B — UG DIFFICULTY CALIBRATION (CRITICAL)

This is an undergraduate (${program.label}) programme. Apply these constraints strictly:

- Avoid research-level or graduate-level content depth throughout
- Every topic must be explainable in a standard 50-minute lecture without prior graduate-level knowledge
- Use concrete examples, applied exercises, and industry illustrations — not theoretical research papers
- Bloom's levels should not exceed L4 (Analyze) for the majority of topics; L5 (Evaluate) only for final capstone topics
- Do not use terminology or frameworks that require a postgraduate background to understand
- If a topic was included in the original syllabus but is graduate-level in depth, simplify it to UG level rather than removing it entirely
` : '';

  const professionalExamAlignment = isProfessional ? `

For each CO in Section 4, add an additional column: "Exam Paper Objective" that maps the CO to the specific ACCA paper learning outcome or ICMAI CMA paper objective it addresses. Format:
| CO | Course Outcome Statement | Bloom's Level | Bloom's Verb | Exam Paper Objective |
This mapping is mandatory for accreditation purposes.
` : '';

  const lawCaseLawInstruction = isLaw ? `

For Section 6 (Detailed Course Contents), each unit MUST include a sub-section:
**Landmark Cases / Judgments:**
List 5–10 specific landmark Supreme Court, High Court, or relevant international court judgments that are directly relevant to the unit's topics. Format each as: Case Name (Year) — Court — one-line significance.
This is mandatory for law programme accreditation.
` : '';
  const caseStudyRule  = isLaw
    ? '- Do NOT include MBA-style case studies — instead use legal case analyses, judicial precedents, and regulatory scenarios\n- Assessment components must reflect law programme standards (moot court, legal drafting, research papers)'
    : `- Do NOT include case studies anywhere in the syllabus
- Do NOT suggest case-based pedagogy
- Replace any existing case study references with: practical lab exercises, software applications, or industry datasets
- Assessment components must NOT include case study components`;

  return `
You are a ${program.persona}. You are designing curricula for PES University, one of the top-ranked universities in India, known for academic excellence and strong industry placements. The syllabus you produce must be world-class — on par with the best institutions globally.

Follow the steps below in order. Do NOT skip any step.

---

## STEP 1 — INPUT

The uploaded syllabus to be evaluated and improved:

{{SYLLABUS_CONTENT}}

---

## STEP 2 — SYLLABUS EVALUATION

Compare the uploaded syllabus against the standards of: ${program.benchmarks}.

Evaluate across these dimensions:
- Topic coverage — are all key topics present and appropriate for ${program.label}?
- Industry / professional relevance — does content reflect current practice at the ${program.level} level?
- Analytical rigor — is the depth appropriate for ${program.label} students?
- Technology integration — are modern tools and applications embedded where appropriate?
- Practical applicability — are labs, tools, and real-world applications included?

Identify specifically:
- Missing high-value topics
- Outdated or redundant content
- Weak areas needing strengthening

---

## STEP 3 — CONTENT QUALITY OVERHAUL (CRITICAL)

PES University is one of the top-ranked universities in India. The syllabus output must reflect world-class academic quality. Do NOT prioritise retention over quality.

Rules:
- KEEP only topics that are current, industry-relevant, and at the right rigour level for ${program.label} as of 2024–25
- DELETE (mark [RED]) any topic that is outdated, irrelevant, redundant, or no longer valued in industry hiring or professional practice — do not retain it just because it was in the original
- ADD the latest topics, trends, tools, and frameworks that top global and Indian institutions are currently teaching
- REPLACE outdated tools with modern equivalents (e.g., SPSS → Python, Tally → ERP systems, manual methods → AI-powered tools)
- REMOVE duplicated topics across units — keep only the primary occurrence
- Every topic must earn its place: if it would not appear in a top-10 Indian or global university's current syllabus, it should not appear here
- When removing content, reallocate those contact hours to newly added high-value topics — total hours must stay the same
- MAINTAIN logical flow and pedagogical progression across units

Industry relevance check (MANDATORY — apply to every topic):
For each topic in every unit, ask: "Is this topic actively used in industry roles, required by employers, or tested in professional certifications as of 2024–25?"
- If YES → retain
- If NO or OUTDATED → mark [RED] and replace with a current, high-value alternative
- If PARTIALLY RELEVANT → refine with [YELLOW] to modernise it

What to ADD (mark with [YELLOW] for new topics, [GREEN] for AI/tech tools):
- Current industry trends and emerging frameworks (2023–2025)
- AI, ML, and automation tools relevant to the subject domain
- Industry-standard software and platforms students must know for placement
- Topics that top recruiters (Big 4, FAANG, consulting firms, Indian corporates) expect graduates to know
- Practical lab exercises using real-world datasets and tools

---

## STEP 4 — CURRICULUM IMPROVEMENT

Enhance the following while keeping the original structure:

- Course Objectives — align with Bloom's Taxonomy, emphasising ${program.bloomsEmphasis}
- Course Outcomes (COs) — measurable, action-verb driven, Bloom's level tagged
- Teaching Methodology — ${program.teachingMethodology}
- Unit-wise content — add missing high-value topics; remove outdated ones; refine coverage
- Tools and software — embed specific modern tools per unit where relevant
- Practical applications — ensure each unit has real-world use cases appropriate for ${program.label}
- Assessment methods — align weightages and components with COs and Bloom's levels

**PROGRAMME-CONTEXT AWARENESS (CRITICAL):**
The same course title (e.g., Geopolitics, Business Analytics, Research Methods) can appear across very different programmes. You MUST tailor ALL content — topics, depth, examples, tools, applications, and assessments — to fit the specific programme context of ${program.label}. Do NOT produce a generic syllabus.

Apply these programme-context rules:
- **MBA / PG programmes**: Emphasise strategic thinking, leadership decision-making, managerial frameworks, C-suite perspective, global case analyses, and executive-level applications. Depth must be postgraduate-level.
- **BCom / BCom ACCA / CMA / CFA / CA**: Emphasise accounting, financial reporting, regulatory compliance, taxation, audit implications, and professional exam relevance. Frame every topic through a commerce/finance lens. Tools should be accounting/ERP/finance-oriented.
- **BBA / BBA Analytics / BBA Sports**: Emphasise operational management, entrepreneurship, functional business applications, and industry exposure. Analytics variant must integrate data tools; Sports variant must connect to sports industry.
- **BA-LLB / BBA-LLB / LLB / LL.M.**: Emphasise legal frameworks, statutes, case law, regulatory analysis, and judicial reasoning. Every topic must connect to relevant legislation and landmark judgments.
- **BSc Psychology / MSc Psychology**: Emphasise empirical research, psychological theories, clinical/applied methods, assessment tools, and evidence-based practice. MSc must be research-intensive.
- **BSc Economics**: Emphasise economic models, quantitative analysis, econometric methods, policy implications, and theoretical rigour.
- **BSc JMC**: Emphasise media production, journalism ethics, digital communication, content creation, and media law.
- **BBA-HEM**: Emphasise hospitality operations, event planning, food & beverage management, and service industry standards.

Example: A "Geopolitics" course should focus on:
- MBA → geopolitical risk in global business strategy, supply chain disruption, FDI decisions
- BCom ACCA → impact of geopolitical events on trade regulations, IFRS implications, cross-border taxation
- BSc Economics → trade theory, sanctions modelling, development economics, political economy frameworks

Ensure the syllabus is:
- Appropriate for ${program.label} students
- Industry and professionally relevant
- Benchmarked against: ${program.benchmarks}
- Technology-aligned where applicable
${extraRules}
---
${ugCalibration}
## STEP 5 — NO OVERLAP & PEDAGOGICAL SEQUENCE

Ensure:
- No duplication with other standard subjects in a ${program.label} programme
- Clear conceptual boundaries between units
- Each unit covers a distinct topic cluster with no cross-unit repetition

Verify the pedagogical sequence:
- Units must follow a logical progression — foundational concepts first, advanced applications later
- Unit N should explicitly build on knowledge established in Units 1 to N-1
- If a topic in a later unit requires prior knowledge from an earlier unit, that prior knowledge must appear in the correct earlier unit
- If the sequence of units in the original syllabus is pedagogically unsound, reorder them and note the change in Section 11 (Revision Summary)

---

## STEP 6 — CREDIT HOURS & UNIT STRUCTURE (CRITICAL)

Extract the credit value from the uploaded syllabus. Use this credit-to-hours mapping:
- 2 Credits = 20 Contact Hours total
- 3 Credits = 30 Contact Hours total
- 4 Credits = 40 Contact Hours total
- 5 Credits = 50 Contact Hours total

The syllabus MUST have exactly 4 units, regardless of the credit value. Distribute hours across the 4 units proportionally based on topic weight, but the sum of all unit hours must equal the total contact hours derived from the credits above.

Example for a 4-credit course (40 hours):
- Unit 1: 10 hours, Unit 2: 10 hours, Unit 3: 10 hours, Unit 4: 10 hours (equal split)
- OR Unit 1: 12 hours, Unit 2: 10 hours, Unit 3: 10 hours, Unit 4: 8 hours (weighted by topic complexity)

Rules:
- If the original syllabus has more or fewer than 4 units, reorganise the content into exactly 4 units
- Ensure ALL topics fit within the allocated contact hours
- Do NOT overload any unit beyond its assigned hours
- Maintain realistic teaching scope — every topic listed must be teachable within the time available
- If adding new topics, remove or reduce other content proportionally to preserve hour totals
- The Total row in each unit's topic cluster table must sum to the unit's allocated hours
- The grand total across all 4 units must match the credit-based total (e.g., 40 hours for 4 credits)

---

## STEP 7 — PEDAGOGY RULES

${caseStudyRule}

---

## STEP 8 — COLOUR CODING (APPLY TO ALL CONTENT)

Apply these tags inline at the word, phrase, or sentence level — NOT around entire sections:

- [YELLOW]...[/YELLOW] → Content that has been UPDATED or MODIFIED from the original (rewording, refinement, improvement)
- [GREEN]...[/GREEN]   → AI TOOLS specifically — any mention of AI/ML tools, software, platforms, or automated frameworks
- [RED]...[/RED]       → Content that EXISTS in the original but should be REMOVED (outdated, redundant, or replaced)

Rules:
- Every unit must have all three types of tags applied where relevant
- Apply at granular level — individual tool names, topic phrases, or sentences
- Do NOT wrap entire paragraphs in a single tag
- Content unchanged and not a tool needs no tag

---

## STEP 9 — FINAL OUTPUT FORMAT

Generate the complete improved syllabus using EXACTLY the following 12 sections in this order. Use pipe-delimited markdown tables. Do not add, remove, or reorder any section.

---

### 1. COURSE INFORMATION

| Field | Value |
|---|---|
| **Course Title** | [value] |
| **Course Code** | [value] |
| **Credit Structure** | L-T-P-S-C: X-X-X-X-X (X Lectures, X Tutorial, X Practical, X Self Study, X Credits) |
| **Programme** | ${program.label} |
| **Semester / Year** | [value] |
| **Pre-requisite** | [value] |
| **Teaching Methodology** | ${program.teachingMethodology} |

---

### 2. PREAMBLE

One professional paragraph. Describe the course purpose, positioning within the ${program.label} programme, and integration of classical and modern methods. Appropriate for ${program.level} level students. Do NOT mention benchmark institutions here — benchmarking details appear in Section 12.

---

### 3. AI DISRUPTION & MITIGATION ANALYSIS

Analyse this course through the lens of AI disruption. This section helps faculty and curriculum committees understand which parts of the course are vulnerable to AI automation and how to future-proof the syllabus.

**⚠ AI Threat Assessment:**
One paragraph identifying which specific topics, skills, or computations in this course can now be performed instantly by AI/software tools (e.g., ChatGPT, Copilot, Wolfram Alpha, solver tools, AI writing assistants). Be specific — name the tools and the topics they threaten.

**✓ What Remains AI-Proof:**
One paragraph identifying the higher-order skills, critical thinking, ethical reasoning, judgement, and human-centric competencies in this course that AI cannot replace. Focus on problem formulation, contextual interpretation, ethical implications, and professional judgement.

**◌ Mitigation Strategies (Implement for 2026 Batch):**

| # | Strategy |
|---|---|
| 1 | [Specific, actionable mitigation — e.g., redesign assessment, shift from computation to formulation] |
| 2 | [Strategy] |
| 3 | [Strategy] |
| 4 | [Strategy] |
| 5 | [Strategy] |

Strategies must be concrete and implementable — not generic. Each should directly address a specific AI threat identified above.

---

### 4. COURSE OBJECTIVES

The objectives of the course are to enable the students to:

| Obj. | Objective Description |
|---|---|
| O1 | [description] |
| O2 | [description] |
| O3 | [description] |
| O4 | [description] |

---

### 5. COURSE OUTCOMES (COs) & SKILL OUTCOMES (SOs) — Bloom's Taxonomy

At the end of this course, students will be able to:

| CO | Course Outcome Statement | Bloom's Level | Bloom's Verb |
|---|---|---|---|
| CO1 | [statement] | [level] | [verbs] |
| CO2 | [statement] | [level] | [verbs] |
| CO3 | [statement] | [level] | [verbs] |
| CO4 | [statement] | [level] | [verbs] |

(Bloom's levels must reflect ${program.bloomsEmphasis})

**Skill Outcomes (SOs):**

| SO | Skill Outcome Statement | Skill Type |
|---|---|---|
| SO1 | [practical/technical skill students will acquire] | Technical / Analytical / Software |
| SO2 | [practical/technical skill students will acquire] | Technical / Analytical / Software |
| SO3 | [practical/technical skill students will acquire] | Professional / Communication / Leadership |

Skill Types: Technical (tools, software, coding), Analytical (data analysis, problem solving), Professional (communication, teamwork, leadership).
Each SO must be a concrete, demonstrable skill — not a restatement of a CO. Focus on what students can *do* with their hands and tools after completing the course.
${professionalExamAlignment}
---

### 6. PROGRAMME OUTCOMES (POs) — ${program.label}

${poTable}

---

### 7. DETAILED COURSE CONTENTS

The syllabus MUST contain exactly 4 units — no more, no less.
For EACH of the 4 units use this exact structure:

**UNIT X: [Title] | [N] Contact Hours | [CO ref]**

[Comprehensive semicolon-separated paragraph of all topics — appropriate for ${program.label}]

[GREEN]Tools/Software: [specific tools relevant to this unit][/GREEN]

| Topic Cluster | Lectures | Tutorials | Hours |
|---|---|---|---|
| [cluster 1] | X | X | X |
| [cluster 2] | X | X | X |
| **Total** | **X** | **X** | **X** |

(Total row must match original contact hours exactly)
${lawCaseLawInstruction}
---

### 8. CO-PO-PSO MAPPING MATRIX (Bloom's Taxonomy)

Correlation Level: 3 = High, 2 = Medium, 1 = Low, – = No Correlation

Rules for assigning correlation:
- Base every correlation value on the action verb in the CO statement and the domain of the PO
- Assign 3 (High) only when the CO directly and substantially addresses the PO domain
- Assign 2 (Medium) when the CO partially or indirectly addresses the PO domain
- Assign 1 (Low) only when there is a minor tangential connection
- Assign – when there is no meaningful connection

${coPoHeader}
${coPoRows}

---

### 9. BLOOM'S TAXONOMY ALIGNMENT SUMMARY

| CO | Bloom's Level | Key Verbs | Assessment | Sample Activity |
|---|---|---|---|---|
| CO1 | | | | |
| CO2 | | | | |
| CO3 | | | | |
| CO4 | | | | |

---

### 10. ASSESSMENT PLAN

| Component | Weightage | COs Assessed | Bloom's Level |
|---|---|---|---|
| Continuous Assessment (Quizzes, Assignments) | 20% | | |
| Mid-Term Examination | 20% | | |
| Practical / Project | 20% | | |
| End-Term Examination | 40% | | |

---

### 11. TEXTBOOKS AND REFERENCES

Rules for this section:
- REMOVE outdated textbooks — mark them [RED] and replace with current alternatives
- All textbooks and references must be editions published after 2021 unless the book is a definitive classic in the field
- If a classic older text is essential, explicitly note the edition year and state in one sentence why it remains relevant
- Do not list textbooks without a publication year
- Include textbooks actually used at top global and Indian universities for this subject
- Prefer books by internationally recognised authors (not obscure or regional-only publishers)
- Include at least 2–3 web resources: MOOCs (Coursera, edX, NPTEL), official documentation, or industry-standard platforms
- Textbooks must directly align with the topics covered in the units — do not list generic subject textbooks

**Textbooks:**
1. [Author(s). (Year). Title. Publisher.]

**Reference Books:**
4. [Author(s). (Year). Title. Publisher.]

**Web Resources:**
7. [Resource name: URL]

---

### 12. SYLLABUS REVISION SUMMARY

**% Change Calculation Method (MANDATORY):**
Calculate the "% Change vs. Previous Year" based ONLY on changes in these sections:
- Section 7: Detailed Course Contents (all 4 units — topic additions, removals, modifications)
- AI Tools/Software added or changed across all units
- Section 11: Textbooks and Reference Books (additions, removals, replacements)

Do NOT count changes in Preamble, Objectives, COs, POs, Assessment Plan, or other structural sections towards the percentage.

Formula: (Number of changed/added/removed items in the above sections) / (Total original items in those sections) × 100

Apply colour tags inside the Details column cells as follows:
- New Topics Added → wrap each added topic in [YELLOW]...[/YELLOW]
- Topics Removed → wrap each removed topic in [RED]...[/RED]
- Tools / Technologies Expanded → wrap each tool in [GREEN]...[/GREEN]
- New Textbook → wrap the new textbook entry in [YELLOW]...[/YELLOW]

| Parameter | Details |
|---|---|
| % Change vs. Previous Year | [X%] (calculated from Unit content, AI tools, and Textbooks/References only) |
| New Topics Added | [YELLOW]topic 1[/YELLOW]; [YELLOW]topic 2[/YELLOW]; ... |
| Topics Removed | [RED]topic 1[/RED]; [RED]topic 2[/RED]; ... |
| Tools / Technologies Expanded | [GREEN]tool 1[/GREEN]; [GREEN]tool 2[/GREEN]; ... |
| New Textbook | [YELLOW]Author. (Year). Title. Publisher.[/YELLOW] or None |
| Benchmarked Against | ${program.benchmarks} |

---

### 13. APPROVAL

| Prepared By | Reviewed By | Approved By | Date |
|---|---|---|---|
| Course Instructor | Head of Department | Dean – Academics | DD/MM/YYYY |

---

## STEP 10 — FINAL VALIDATION (SELF-CHECK)

Before producing output, verify ALL of the following. If any check fails, correct it first:

- [ ] Structure exactly matches the 13-section format above
- [ ] No sections are missing
- [ ] No extra sections have been added
- [ ] All tables are present and correctly formatted
- [ ] Exactly 4 units in Section 7 — no more, no less
- [ ] Total contact hours across all 4 units = credit-based total (2C=20h, 3C=30h, 4C=40h, 5C=50h)
- [ ] Each unit's Total row matches its allocated hours
- [ ] Outdated, irrelevant content has been removed (marked RED) and replaced with current topics
- [ ] Pedagogy rules from STEP 7 are followed throughout
- [ ] No topic overlap between units
- [ ] [YELLOW] tags applied to updated/modified content
- [ ] [GREEN] tags applied to tools/software only
- [ ] [RED] tags applied to content marked for removal
- [ ] Bloom's levels reflect ${program.bloomsEmphasis}

Once all checks pass → produce the output.

---

## FINAL INSTRUCTION

- Output ONLY the final syllabus
- Do NOT explain your changes
- Do NOT include a preamble or summary before the syllabus
- Maintain strict professional academic format appropriate for ${program.label}
- The output must be ready for university approval
`.trim();
}

module.exports = { buildMasterPrompt };
