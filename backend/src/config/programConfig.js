'use strict';

/**
 * Programme Configuration
 * Each entry defines the AI persona, benchmarks, Programme Outcomes (POs),
 * and special rules injected into the master prompt for that programme.
 */

// ─── COMMON POs (shared across all programmes) ─────────────────────────────
const COMMON_POS = [
  { id: 'PO1',  domain: 'Business Knowledge & Intelligence',          statement: 'A deep understanding of business concepts, theories, and practices across various domains.' },
  { id: 'PO2',  domain: 'Problem Solving & Reflective Thinking',      statement: 'Capability to analyse complex business problems, apply critical thinking, and propose innovative solutions.' },
  { id: 'PO3',  domain: 'Research Aptitude',                          statement: 'Possess research skills to investigate business issues, conduct empirical studies, and contribute to knowledge.' },
  { id: 'PO4',  domain: 'Data-driven Decision Making',                statement: 'Use data analytics and evidence-based approaches to make informed decisions in organizational contexts.' },
  { id: 'PO5',  domain: 'Cross-functional Skills',                    statement: 'Collaborate effectively across departments, integrating diverse perspectives to achieve organizational goals.' },
  { id: 'PO6',  domain: 'Peer Learning & Teamwork',                   statement: 'Actively engage in team dynamics, learn from peers, and contribute to collective success.' },
  { id: 'PO7',  domain: 'Entrepreneurship & Risk-taking',             statement: 'Exhibit entrepreneurial mindset, identify opportunities, and manage calculated risks.' },
  { id: 'PO8',  domain: 'Global Perspective',                         statement: 'Understand global markets, cultural nuances, and adapt strategies for international business.' },
  { id: 'PO9',  domain: 'Ethical, Social & Environmental Responsibility', statement: 'Uphold ethical standards, consider societal impact, and promote sustainable practices.' },
  { id: 'PO10', domain: 'Project Management & Finance',               statement: 'Demonstrate proficiency in project planning, execution, and financial management.' },
  { id: 'PO11', domain: 'Communication & Corporate Etiquette',        statement: 'Communicate effectively, both verbally and in writing, while adhering to professional norms.' },
  { id: 'PO12', domain: 'Life-long Learning',                         statement: 'Embrace continuous learning, staying updated with industry trends and evolving practices.' },
];

const PROGRAMS = {

  // ─── POSTGRADUATE ──────────────────────────────────────────────────────────

  MBA: {
    id: 'MBA',
    label: 'MBA — Master of Business Administration',
    level: 'PG',
    group: 'Postgraduate',
    persona: 'senior academic curriculum designer specialising in MBA programmes at globally top-ranked business schools (Harvard Business School, Wharton, MIT Sloan, INSEAD, IIM Ahmedabad, ISB Hyderabad)',
    benchmarks: 'Harvard Business School, Wharton (University of Pennsylvania), MIT Sloan, INSEAD, IIM Ahmedabad, ISB Hyderabad',
    bloomsEmphasis: 'Apply (L3), Analyze (L4), Evaluate (L5), and Create (L6)',
    teachingMethodology: 'Lectures, Software Labs, Industry Guest Lectures, Group Projects',
    extraRules: '',
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[relevant PSO for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this subject]' },
    ],
  },

  // ─── UG COMMERCE ───────────────────────────────────────────────────────────

  BCOM: {
    id: 'BCOM',
    label: 'BCom (General / Hons.) — Bachelor of Commerce',
    level: 'UG',
    group: 'UG Commerce',
    persona: 'senior academic curriculum designer specialising in undergraduate Commerce programmes at top Indian universities (SRCC Delhi University, Christ University Bangalore, Symbiosis College of Arts and Commerce Pune, Loyola College Chennai, St. Xavier\'s College Mumbai)',
    benchmarks: 'SRCC (Delhi University), Christ University Bangalore, Symbiosis College Pune, Loyola College Chennai, St. Xavier\'s College Mumbai, UGC model curriculum for Commerce',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Tutorials, Practical/Lab Sessions, Group Assignments',
    extraRules: `- Align content with UGC (University Grants Commission) guidelines for undergraduate Commerce programmes
- Ensure foundational concepts are explained before advanced application
- Reference relevant Indian regulations where applicable (Companies Act, Income Tax Act, GST, Indian Contract Act)
- Language and depth must be appropriate for undergraduate students`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[relevant PSO for this commerce subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this commerce subject]' },
    ],
  },

  BCOM_ACCA: {
    id: 'BCOM_ACCA',
    label: 'BCom (Hons) with ACCA — Bachelor of Commerce (Hons) with ACCA',
    level: 'UG',
    group: 'UG Commerce',
    persona: 'senior academic curriculum designer specialising in ACCA-integrated undergraduate Commerce programmes, with deep knowledge of the ACCA qualification structure (Applied Knowledge, Applied Skills, Strategic Professional) and top ACCA-registered institutions in India',
    benchmarks: 'ACCA Global Qualification Curriculum, ICAI guidelines, Christ University Bangalore (ACCA), Symbiosis College Pune, SRCC Delhi, Kaplan ACCA, BPP ACCA learning materials',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Tutorials, ACCA Practice Sessions, Case Exercises, Group Assignments',
    extraRules: `- Align course content with the relevant ACCA paper(s) from: Applied Knowledge (BT, MA, FA), Applied Skills (LW, PM, TX, FR, AA, FM), or Strategic Professional (SBL, SBR, AFM, APM, ATX, AAA) levels
- Clearly map topics to ACCA syllabus learning outcomes where applicable
- Maintain alignment with both university curriculum requirements and ACCA examination standards
- Reference Indian financial regulations (Companies Act, Income Tax Act, GST, SEBI) alongside international standards (IFRS, ISA) as appropriate
- Language and depth must be appropriate for undergraduate students
- EXAM ALIGNMENT (MANDATORY): For each Course Outcome (CO), explicitly identify the ACCA paper and the specific learning outcome (e.g., "FA Paper — LO B3: Prepare a trial balance") it maps to. This mapping is required for ACCA accreditation.`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[ACCA paper-specific outcome for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this ACCA-integrated commerce subject]' },
    ],
  },

  BCOM_CMA: {
    id: 'BCOM_CMA',
    label: 'BCom (Hons) with CMA — Bachelor of Commerce (Hons) with CMA',
    level: 'UG',
    group: 'UG Commerce',
    persona: 'senior academic curriculum designer specialising in CMA-integrated undergraduate Commerce programmes, with deep knowledge of the ICMAI (Institute of Cost Accountants of India) CMA qualification structure',
    benchmarks: 'ICMAI CMA Qualification Curriculum, SRCC Delhi University, Christ University Bangalore, Symbiosis College Pune, UGC model Commerce curriculum',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Tutorials, Cost Accounting Practicals, Group Assignments',
    extraRules: `- Align course content with the relevant ICMAI CMA Foundation or Intermediate paper(s) as applicable
- Map topics to CMA syllabus learning outcomes where relevant
- Emphasise cost accounting, management accounting, and strategic financial management as per CMA competency framework
- Reference Indian cost accounting standards (CAS), Companies Act, and relevant ICMAI guidelines
- Language and depth must be appropriate for undergraduate students
- EXAM ALIGNMENT (MANDATORY): For each Course Outcome (CO), explicitly identify the ICMAI CMA paper and the specific syllabus module (e.g., "CMA Intermediate Paper 8 — Module 3: Marginal Costing") it maps to. This mapping is required for ICMAI accreditation.`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[CMA paper-specific outcome for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this CMA-integrated commerce subject]' },
    ],
  },

  BCOM_CFA: {
    id: 'BCOM_CFA',
    label: 'BCom (Hons) with CFA — Bachelor of Commerce (Hons) with CFA',
    level: 'UG',
    group: 'UG Commerce',
    persona: 'senior academic curriculum designer specialising in CFA-integrated undergraduate Commerce programmes, with deep knowledge of the CFA Institute qualification structure (CFA Level I, II, III) and top finance-oriented institutions',
    benchmarks: 'CFA Institute Curriculum, SRCC Delhi University, Christ University Bangalore, Symbiosis College Pune, Narsee Monjee (NMIMS), SP Jain, UGC model Commerce curriculum',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Tutorials, Financial Modelling Labs, Bloomberg Terminal Sessions, Group Assignments',
    extraRules: `- Align course content with CFA Institute's Candidate Body of Knowledge (CBOK) across relevant topic areas
- Map topics to CFA Level I/II learning outcome statements (LOS) where applicable
- Emphasise ethics and professional standards as per CFA Institute's Code and Standards
- Cover key CFA domains: Ethical & Professional Standards, Quantitative Methods, Economics, Financial Reporting & Analysis, Corporate Finance, Equity, Fixed Income, Derivatives, Alternative Investments, Portfolio Management
- Reference global financial markets, instruments, and regulatory frameworks alongside Indian context (SEBI, RBI, NSE/BSE)
- Language and depth must be appropriate for undergraduate students
- EXAM ALIGNMENT (MANDATORY): For each Course Outcome (CO), explicitly identify the CFA topic area and specific LOS it maps to. This mapping supports CFA Institute University Affiliation Programme requirements.`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[CFA topic area-specific outcome for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this CFA-integrated commerce subject]' },
    ],
  },

  BCOM_CA: {
    id: 'BCOM_CA',
    label: 'BCom (Hons.) with CA — Bachelor of Commerce (Hons.) in Finance and Accounting (CA Embedded)',
    level: 'UG',
    group: 'UG Commerce',
    persona: 'senior academic curriculum designer specialising in CA-embedded undergraduate Commerce programmes, with deep knowledge of the ICAI (Institute of Chartered Accountants of India) CA qualification structure (Foundation, Intermediate, Final)',
    benchmarks: 'ICAI CA Curriculum, SRCC Delhi University, Christ University Bangalore, Symbiosis College Pune, Loyola College Chennai, UGC model Commerce curriculum',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Tutorials, Accounting Practicals, Audit Simulations, Group Assignments',
    extraRules: `- Align course content with the relevant ICAI CA Foundation or Intermediate paper(s) as applicable
- Map topics to ICAI CA syllabus learning outcomes where relevant
- Emphasise accounting standards (Ind AS / IFRS), auditing standards (SA), taxation (direct & indirect), and corporate law as per CA competency framework
- Reference Indian accounting regulations (Companies Act, Income Tax Act, GST Act), ICAI pronouncements, and relevant SEBI/RBI guidelines
- Language and depth must be appropriate for undergraduate students
- EXAM ALIGNMENT (MANDATORY): For each Course Outcome (CO), explicitly identify the ICAI CA paper and the specific syllabus module (e.g., "CA Intermediate Paper 1 — Accounting Standards") it maps to. This mapping is required for ICAI accreditation alignment.`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[CA paper-specific outcome for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this CA-embedded commerce subject]' },
    ],
  },

  BBA: {
    id: 'BBA',
    label: 'BBA (General / Honors) — Bachelor of Business Administration',
    level: 'UG',
    group: 'UG Commerce',
    persona: 'senior academic curriculum designer specialising in undergraduate Business Administration programmes at top Indian institutions (Christ University Bangalore, Symbiosis International University, Amity University, IIM Indore IPM, NMIMS Mumbai)',
    benchmarks: 'Christ University Bangalore, Symbiosis International University Pune, Amity University, IIM Indore (IPM), NMIMS Mumbai, UGC model curriculum for BBA',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Tutorials, Business Simulations, Group Projects, Industry Visits',
    extraRules: `- Align content with UGC guidelines for undergraduate Business Administration programmes
- Ensure foundational business management concepts are clearly introduced before advanced application
- Include practical industry-oriented content appropriate for undergraduate students
- Reference relevant Indian business environment, regulations, and examples`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[relevant PSO for this BBA subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this BBA subject]' },
    ],
  },

  BBA_ANALYTICS: {
    id: 'BBA_ANALYTICS',
    label: 'BBA (Hons) in Business Analytics — Bachelor of Business Administration (Hons) in Business Analytics',
    level: 'UG',
    group: 'UG Commerce',
    persona: 'senior academic curriculum designer specialising in undergraduate Business Analytics programmes at top Indian institutions (Christ University Bangalore, NMIMS Mumbai, Symbiosis International University, Great Lakes Institute of Management)',
    benchmarks: 'Christ University Bangalore, NMIMS Mumbai, Symbiosis International University Pune, Great Lakes Institute of Management, IIT-based analytics curricula, UGC model curriculum',
    bloomsEmphasis: 'Understand (L2), Apply (L3), Analyze (L4), and introductory Evaluate (L5)',
    teachingMethodology: 'Lectures, Software Labs (Python/R/Excel/Tableau/Power BI), Group Projects, Industry Datasets',
    extraRules: `- Integrate analytics and data tools practically throughout the curriculum
- Balance business management foundations with analytics and technology competencies
- Ensure lab components use industry-standard tools (Python, R, Excel, Tableau, Power BI, SQL)
- Content must be appropriate for undergraduate students with no prior advanced analytics background
- Align with UGC guidelines while incorporating current industry analytics practices`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[relevant analytics-specific PSO for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this BBA Analytics subject]' },
    ],
  },

  BBA_SPORTS: {
    id: 'BBA_SPORTS',
    label: 'BBA in Sports Management — Bachelor of Business Administration in Sports Management',
    level: 'UG',
    group: 'UG Commerce',
    persona: 'senior academic curriculum designer specialising in undergraduate Sports Management programmes at top institutions (IISWBM Kolkata, MIT-WPU Pune, Symbiosis School of Sports Sciences, SPJIMR, Loughborough University, University of Michigan)',
    benchmarks: 'MIT-WPU Pune, Symbiosis School of Sports Sciences, IISWBM Kolkata, Loughborough University, University of Michigan School of Kinesiology, UGC guidelines',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Tutorials, Sports Industry Simulations, Field Visits, Group Projects, Internships',
    extraRules: `- Align content with UGC guidelines for undergraduate Business Administration programmes
- Integrate sports industry-specific business concepts: sports marketing, event management, athlete management, sports law, sports analytics
- Include practical exposure to sports organizations, leagues (IPL, ISL, PKL), federations, and sports tech startups
- Reference Indian sports ecosystem (SAI, BCCI, IOA, Khelo India) alongside global standards (IOC, FIFA, NBA, EPL)
- Incorporate sports analytics tools and data-driven decision making in sports
- Language and depth must be appropriate for undergraduate students`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[relevant PSO for this sports management subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this BBA Sports Management subject]' },
    ],
  },

  // ─── UG LAW ─────────────────────────────────────────────────────────────────

  BA_LLB: {
    id: 'BA_LLB',
    label: 'BA LLB — Bachelor of Arts & Bachelor of Laws',
    level: 'UG',
    group: 'UG Law',
    persona: 'senior legal academic curriculum designer specialising in five-year integrated BA LLB programmes at National Law Universities (NLSIU Bangalore, NLU Delhi, NALSAR Hyderabad, NLU Jodhpur, Symbiosis Law School Pune)',
    benchmarks: 'NLSIU Bangalore, NLU Delhi, NALSAR Hyderabad, NLU Jodhpur, Symbiosis Law School Pune, Bar Council of India (BCI) prescribed curriculum',
    bloomsEmphasis: 'Understand (L2), Apply (L3), Analyze (L4), and Evaluate (L5)',
    teachingMethodology: 'Lectures, Moot Court, Legal Research, Tutorials, Seminar Presentations',
    extraRules: `- Align course content strictly with the Bar Council of India (BCI) prescribed curriculum requirements
- Include relevant constitutional, statutory, and case law references throughout
- Emphasise legal reasoning, statutory interpretation, and analytical skills
- Include Moot Court, Legal Research, or Clinic activities where appropriate to the subject
- No case studies in the MBA/business sense — instead use legal case analyses and judicial precedents
- Language and analytical depth must be appropriate for law students
- LANDMARK CASES (MANDATORY): Each unit must list 5–10 specific landmark judgments (Supreme Court / High Court / relevant international courts) directly relevant to that unit's topics. Format: Case Name (Year) — Court — one-line significance. This is required for BCI accreditation and law programme quality standards.`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[subject-specific legal competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BA LLB subject]' },
    ],
  },

  BBA_LLB: {
    id: 'BBA_LLB',
    label: 'BBA LLB — Bachelor of Business Administration & Bachelor of Laws',
    level: 'UG',
    group: 'UG Law',
    persona: 'senior legal and business academic curriculum designer specialising in five-year integrated BBA LLB programmes (Symbiosis Law School Pune, NMIMS School of Law, Christ University, O.P. Jindal Global Law School)',
    benchmarks: 'Symbiosis Law School Pune, NMIMS School of Law Mumbai, Christ University Bangalore, O.P. Jindal Global Law School, Bar Council of India (BCI) prescribed curriculum',
    bloomsEmphasis: 'Understand (L2), Apply (L3), Analyze (L4), and Evaluate (L5)',
    teachingMethodology: 'Lectures, Moot Court, Business-Legal Simulations, Legal Research, Tutorials, Seminar Presentations',
    extraRules: `- Align course content with Bar Council of India (BCI) prescribed curriculum requirements
- Integrate business administration and legal perspectives where the subject spans both domains
- Emphasise corporate law, business regulations, and commercial legal frameworks where applicable
- Include relevant Supreme Court and High Court judgments, statutory provisions, and regulatory frameworks
- For business law subjects: reference Companies Act, SEBI regulations, competition law, IPR, and commercial contracts
- No case studies in the MBA/business sense — instead use legal case analyses, regulatory scenarios, and judicial precedents
- Language and depth must be appropriate for law students with a business administration background
- LANDMARK CASES (MANDATORY): Each unit must list 5–10 specific landmark judgments (Supreme Court / High Court / relevant tribunals / international courts) directly relevant to that unit's topics. Format: Case Name (Year) — Court — one-line significance. This is required for BCI accreditation and law programme quality standards.`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[subject-specific legal/business competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BBA LLB subject]' },
    ],
  },

  // ─── UG SCIENCE / SOCIAL SCIENCE ────────────────────────────────────────────

  BSC_PSYCHOLOGY: {
    id: 'BSC_PSYCHOLOGY',
    label: 'BSc Psychology (General / Honors) — Bachelor of Science in Psychology',
    level: 'UG',
    group: 'UG Science / Social Science',
    persona: 'senior academic curriculum designer specialising in undergraduate Psychology programmes at top Indian universities (Delhi University, Christ University Bangalore, Fergusson College Pune, FLAME University, Presidency University Kolkata)',
    benchmarks: 'Delhi University, Christ University Bangalore, Fergusson College Pune, FLAME University, Presidency University Kolkata, APA (American Psychological Association) guidelines for undergraduate Psychology, UGC model curriculum',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Tutorials, Lab Practicals, Research Projects, Seminar Presentations',
    extraRules: `- Align content with UGC guidelines and APA recommendations for undergraduate Psychology programmes
- Include relevant empirical research studies, psychological theories, and evidence-based approaches
- Integrate research methodology and psychological assessment skills throughout the curriculum
- Reference both classical foundational theories and current contemporary research
- Lab components should include psychological experiments, assessments, and observational methods
- Language, terminology, and conceptual depth must be appropriate for undergraduate Psychology students`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[subject-specific psychology competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BSc Psychology subject]' },
    ],
  },

  BSC_ECONOMICS: {
    id: 'BSC_ECONOMICS',
    label: 'BSc Economics — Bachelor of Science in Economics',
    level: 'UG',
    group: 'UG Science / Social Science',
    persona: 'senior academic curriculum designer specialising in undergraduate Economics programmes at top Indian universities (Delhi School of Economics, St. Xavier\'s College Mumbai, Presidency University Kolkata, Ashoka University, Fergusson College Pune)',
    benchmarks: 'Delhi School of Economics (DSE), St. Xavier\'s College Mumbai, Presidency University Kolkata, Ashoka University, Fergusson College Pune, UGC model curriculum for Economics',
    bloomsEmphasis: 'Understand (L2), Apply (L3), Analyze (L4), and introductory Evaluate (L5)',
    teachingMethodology: 'Lectures, Tutorials, Quantitative Problem Sets, Data Analysis Labs, Seminar Presentations',
    extraRules: `- Align content with UGC guidelines for undergraduate Economics programmes
- Balance theoretical economic models with empirical evidence and real-world applications
- Integrate quantitative methods, econometrics, and data analysis where appropriate
- Reference Indian economic policy, RBI, SEBI, Union Budget, and Planning Commission/NITI Aayog data
- Include both classical economic theory and contemporary economic research
- Mathematical rigor must be appropriate for BSc-level students`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[subject-specific economics competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BSc Economics subject]' },
    ],
  },

  BSC_JMC: {
    id: 'BSC_JMC',
    label: 'BSc JMC (Hons) — Bachelor of Science in Journalism & Mass Communication (Honors)',
    level: 'UG',
    group: 'UG Science / Social Science',
    persona: 'senior academic curriculum designer specialising in undergraduate Journalism and Mass Communication programmes at top Indian universities (IIMC Delhi, Symbiosis Institute of Media and Communication, AJK MCRC Jamia Millia Islamia, Xavier Institute of Communications Mumbai, Asian College of Journalism Chennai)',
    benchmarks: 'IIMC (Indian Institute of Mass Communication) Delhi, Symbiosis Institute of Media and Communication Pune, AJK MCRC Jamia Millia Islamia, Xavier Institute of Communications Mumbai, Asian College of Journalism Chennai, UGC model curriculum for Journalism & Mass Communication',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Media Labs, Newsroom Simulations, Field Reporting, Production Workshops, Seminar Presentations',
    extraRules: `- Align content with UGC guidelines for undergraduate Journalism & Mass Communication programmes
- Integrate practical media production skills (print, broadcast, digital, social media) throughout the curriculum
- Include media law, ethics, and regulatory frameworks (Press Council of India, TRAI, IT Act, Cable Television Networks Act)
- Balance theoretical media studies with hands-on journalism practice and production
- Cover convergence journalism, digital media, data journalism, and AI tools in media
- Reference both Indian media landscape (PCI, NBA, BARC, ASCI) and global journalism standards
- Lab components should include news writing, video production, audio production, digital content creation, and social media management
- Language and depth must be appropriate for undergraduate students`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[subject-specific journalism/media competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BSc JMC subject]' },
    ],
  },

  // ─── UG HOSPITALITY ─────────────────────────────────────────────────────────

  BHEM: {
    id: 'BHEM',
    label: 'BBA-HEM — Bachelor of Business Administration in Hospitality & Event Management',
    level: 'UG',
    group: 'UG Hospitality',
    persona: 'senior academic curriculum designer specialising in undergraduate Hotel and Event Management programmes at top hospitality institutions (IHM Mumbai, IHM Delhi, Welcomgroup Graduate School of Hotel Administration, WGSHA Manipal, Ecole Hôtelière de Lausanne, Les Roches)',
    benchmarks: 'IHM Mumbai, IHM Delhi, WGSHA Manipal University, Ecole Hôtelière de Lausanne, Les Roches, NCHMCT (National Council for Hotel Management and Catering Technology) model curriculum',
    bloomsEmphasis: 'Remember (L1), Understand (L2), Apply (L3), and Analyze (L4)',
    teachingMethodology: 'Lectures, Kitchen/Front Office/Event Practicals, Industry Internships, Group Projects, Demonstrations',
    extraRules: `- Align content with NCHMCT (National Council for Hotel Management and Catering Technology) curriculum standards
- Include both theoretical hospitality management concepts and hands-on practical components
- Integrate event management, food & beverage, front office, housekeeping, and hospitality operations as relevant to the subject
- Reference international hospitality standards, certifications (FSSAI, ISO, HACCP), and industry practices
- Practical lab/kitchen/front office components must be clearly specified for applicable subjects
- Language and depth must be appropriate for undergraduate hospitality management students`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[subject-specific hospitality management outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BHEM subject]' },
    ],
  },

  // ─── POSTGRADUATE ──────────────────────────────────────────────────────────

  MSC_PSYCHOLOGY: {
    id: 'MSC_PSYCHOLOGY',
    label: 'MSc Psychology — Master of Science in Psychology',
    level: 'PG',
    group: 'Postgraduate',
    persona: 'senior academic curriculum designer specialising in postgraduate Psychology programmes at top Indian and global universities (Delhi University, Christ University Bangalore, NIMHANS Bangalore, Tata Institute of Social Sciences Mumbai, University of Mumbai, APA-accredited programmes)',
    benchmarks: 'Delhi University, Christ University Bangalore, NIMHANS Bangalore, TISS Mumbai, Jamia Millia Islamia, APA (American Psychological Association) guidelines for graduate Psychology, UGC model curriculum for MSc Psychology',
    bloomsEmphasis: 'Apply (L3), Analyze (L4), Evaluate (L5), and Create (L6)',
    teachingMethodology: 'Lectures, Research Seminars, Lab Practicals, Clinical Fieldwork, Dissertation Supervision, Case Conferences',
    extraRules: `- Align content with UGC guidelines and APA recommendations for graduate-level Psychology programmes
- Include advanced research methodology, psychometrics, and evidence-based clinical/applied approaches
- Emphasise independent research capability, dissertation preparation, and scholarly writing
- Reference current peer-reviewed research, meta-analyses, and systematic reviews
- Lab and fieldwork components should include advanced psychological assessment, intervention design, and supervised clinical practice
- Integrate both classical psychological theories and cutting-edge contemporary research (neuroscience, digital mental health, AI in psychology)
- Depth and rigour must be appropriate for postgraduate students preparing for clinical practice, research careers, or doctoral studies`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[subject-specific psychology competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this MSc Psychology subject]' },
    ],
  },

  LLM: {
    id: 'LLM',
    label: 'LLM — Master of Laws',
    level: 'PG',
    group: 'Postgraduate',
    persona: 'senior legal academic curriculum designer specialising in postgraduate law programmes at top National Law Universities and global institutions (NLSIU Bangalore, NLU Delhi, NALSAR Hyderabad, Harvard Law School, Oxford University, Cambridge University)',
    benchmarks: 'NLSIU Bangalore, NLU Delhi, NALSAR Hyderabad, NLU Jodhpur, Harvard Law School, Oxford University Faculty of Law, Bar Council of India (BCI) standards for LLM programmes',
    bloomsEmphasis: 'Apply (L3), Analyze (L4), Evaluate (L5), and Create (L6)',
    teachingMethodology: 'Lectures, Research Seminars, Moot Court, Legal Research & Writing, Dissertation Supervision, Case Analysis',
    extraRules: `- Align course content with Bar Council of India (BCI) and UGC standards for postgraduate law programmes
- Emphasise advanced legal reasoning, critical analysis of legislation and jurisprudence, and independent research
- Include comparative and international law perspectives throughout
- Reference landmark Supreme Court, High Court, and international court judgments extensively
- Include advanced research methodology, legal writing, and dissertation preparation skills
- Students should engage with primary legal sources: statutes, case reporters, law commission reports, and international treaties
- Depth and analytical rigour must be appropriate for postgraduate law students preparing for legal practice, academia, or policy roles
- LANDMARK CASES (MANDATORY): Each unit must list 5–10 specific landmark judgments (Supreme Court / High Court / International Courts / Tribunals) directly relevant to that unit's topics. Format: Case Name (Year) — Court — one-line significance. This is required for BCI accreditation and law programme quality standards.`,
    pos: COMMON_POS,
    psos: [
      { id: 'PSO1', statement: '[subject-specific legal competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this LLM subject]' },
    ],
  },

};

/**
 * Build the Programme Outcomes markdown table string for injection into the prompt
 */
function buildPoTableMarkdown(program) {
  const header = '| PO | Domain | Programme Outcome Statement |\n|---|---|---|';
  const rows = program.pos.map(p => `| ${p.id} | ${p.domain} | ${p.statement} |`).join('\n');
  const psoHeader = '\n\nProgramme Specific Outcomes (PSOs):\n\n| PSO | Programme Specific Outcome |\n|---|---|';
  const psoRows = program.psos.map(p => `| ${p.id} | ${p.statement} |`).join('\n');
  return `${header}\n${rows}${psoHeader}\n${psoRows}`;
}

/**
 * Build the CO-PO-PSO matrix header row
 */
function buildCoPoMatrixHeader(program) {
  const poIds = program.pos.map(p => p.id).join(' | ');
  const psoIds = program.psos.map(p => p.id).join(' | ');
  const sep = program.pos.map(() => '').join(' | ');
  const psoSep = program.psos.map(() => '').join(' | ');
  return `| CO | ${poIds} | ${psoIds} |\n|---|${program.pos.map(() => '---').join('|')}|${program.psos.map(() => '---').join('|')}|`;
}

/**
 * Build empty CO rows for the CO-PO-PSO matrix
 */
function buildCoPoMatrixRows(program) {
  const emptyCols = [...program.pos, ...program.psos].map(() => ' ').join(' | ');
  return ['CO1', 'CO2', 'CO3', 'CO4'].map(co => `| ${co} | ${emptyCols} |`).join('\n') +
    `\n| Avg. | ${emptyCols} |`;
}

module.exports = { PROGRAMS, buildPoTableMarkdown, buildCoPoMatrixHeader, buildCoPoMatrixRows };
