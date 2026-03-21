'use strict';

/**
 * Programme Configuration
 * Each entry defines the AI persona, benchmarks, Programme Outcomes (POs),
 * and special rules injected into the master prompt for that programme.
 */

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
    pos: [
      { id: 'PO1',  domain: 'Knowledge',           statement: 'Apply knowledge of management theories and practices to solve business problems.' },
      { id: 'PO2',  domain: 'Critical Thinking',   statement: 'Foster analytical and critical thinking abilities for data-based decision making.' },
      { id: 'PO3',  domain: 'Communication',        statement: 'Develop communication competence for effective business interactions.' },
      { id: 'PO4',  domain: 'Problem Solving',      statement: 'Ability to understand, analyze, and develop solutions for complex business situations.' },
      { id: 'PO5',  domain: 'Ethics',               statement: 'Understand, analyze, and communicate global, economic, legal, and ethical aspects of business.' },
      { id: 'PO6',  domain: 'Leadership',           statement: 'Develop value-based leadership ability.' },
      { id: 'PO7',  domain: 'Teamwork',             statement: 'Ability to lead themselves and others in the achievement of organizational goals.' },
      { id: 'PO8',  domain: 'Innovation',           statement: 'Foster innovative thinking and entrepreneurial mindset.' },
      { id: 'PO9',  domain: 'Global Perspective',   statement: 'Understand and analyze global business environments and cross-cultural management.' },
      { id: 'PO10', domain: 'Digital Literacy',     statement: 'Leverage technology and analytics tools for strategic decision-making.' },
      { id: 'PO11', domain: 'Lifelong Learning',    statement: 'Recognize the need for continuous learning and professional development.' },
      { id: 'PO12', domain: 'Sustainability',       statement: 'Understand principles of sustainable and socially responsible business practices.' },
    ],
    psos: [
      { id: 'PSO1', statement: '[relevant PSO for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this subject]' },
    ],
  },

  // ─── UG COMMERCE ───────────────────────────────────────────────────────────

  BCOM: {
    id: 'BCOM',
    label: 'BCom — Bachelor of Commerce',
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
    pos: [
      { id: 'PO1',  domain: 'Disciplinary Knowledge',          statement: 'Disciplinary knowledge' },
      { id: 'PO2',  domain: 'Effective Communication',         statement: 'Effective communication' },
      { id: 'PO3',  domain: 'Reflective Thinking',             statement: 'Reflective thinking' },
      { id: 'PO4',  domain: 'Scientific Reasoning',            statement: 'Scientific reasoning' },
      { id: 'PO5',  domain: 'Innovative Problem Solving',      statement: 'Innovative problem solving' },
      { id: 'PO6',  domain: 'Research Related Thinking',       statement: 'Research related thinking' },
      { id: 'PO7',  domain: 'Data Driven Decision Making',     statement: 'Data driven decision making' },
      { id: 'PO8',  domain: 'Global Perspective',              statement: 'Global perspective' },
      { id: 'PO9',  domain: 'Ethical Attitude',                statement: 'Ethical attitude' },
      { id: 'PO10', domain: 'Social Sensitivity',              statement: 'Social sensitivity' },
      { id: 'PO11', domain: 'Self-oriented Lifelong Learning', statement: 'Self-oriented lifelong learning' },
      { id: 'PO12', domain: 'Leadership Excellence',           statement: 'Leadership excellence' },
    ],
    psos: [
      { id: 'PSO1', statement: '[relevant PSO for this commerce subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this commerce subject]' },
    ],
  },

  BCOM_ACCA: {
    id: 'BCOM_ACCA',
    label: 'BCom ACCA — Bachelor of Commerce with ACCA',
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
    pos: [
      { id: 'PO1', domain: 'Disciplinary Knowledge', statement: 'Apply integrated knowledge of commerce and ACCA qualification competencies to professional accounting scenarios.' },
      { id: 'PO2', domain: 'Critical Thinking',       statement: 'Analyze and evaluate financial and business decisions using professional accounting frameworks.' },
      { id: 'PO3', domain: 'Communication',            statement: 'Communicate financial information and professional advice effectively.' },
      { id: 'PO4', domain: 'Problem Solving',          statement: 'Apply professional accounting, taxation, and audit knowledge to solve complex business problems.' },
      { id: 'PO5', domain: 'Ethics & Professionalism', statement: 'Demonstrate ACCA\'s professional ethics and values in accounting practice.' },
      { id: 'PO6', domain: 'Global Standards',         statement: 'Apply international financial reporting and auditing standards (IFRS, ISA) in practice.' },
      { id: 'PO7', domain: 'Technology Use',           statement: 'Use accounting and financial software tools aligned with professional practice.' },
      { id: 'PO8', domain: 'Lifelong Learning',        statement: 'Commit to continuing professional development aligned with ACCA\'s CPD requirements.' },
    ],
    psos: [
      { id: 'PSO1', statement: '[ACCA paper-specific outcome for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this ACCA-integrated commerce subject]' },
    ],
  },

  BCOM_CMA: {
    id: 'BCOM_CMA',
    label: 'BCom CMA — Bachelor of Commerce with CMA',
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
    pos: [
      { id: 'PO1', domain: 'Disciplinary Knowledge', statement: 'Apply integrated knowledge of commerce and CMA competencies to cost and management accounting scenarios.' },
      { id: 'PO2', domain: 'Critical Thinking',       statement: 'Analyze cost data and evaluate business financial decisions.' },
      { id: 'PO3', domain: 'Communication',            statement: 'Communicate cost and financial reports effectively in professional contexts.' },
      { id: 'PO4', domain: 'Problem Solving',          statement: 'Apply cost accounting and management accounting knowledge to solve business problems.' },
      { id: 'PO5', domain: 'Ethics & Professionalism', statement: 'Demonstrate ICMAI\'s professional ethics in cost and management accounting practice.' },
      { id: 'PO6', domain: 'Compliance',               statement: 'Apply Indian cost accounting standards and regulatory requirements.' },
      { id: 'PO7', domain: 'Technology Use',           statement: 'Use ERP and cost accounting software tools in professional practice.' },
      { id: 'PO8', domain: 'Lifelong Learning',        statement: 'Commit to continuous professional development aligned with CMA qualification progression.' },
    ],
    psos: [
      { id: 'PSO1', statement: '[CMA paper-specific outcome for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this CMA-integrated commerce subject]' },
    ],
  },

  BBA: {
    id: 'BBA',
    label: 'BBA — Bachelor of Business Administration',
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
    pos: [
      { id: 'PO1', domain: 'Business Knowledge',    statement: 'Apply foundational knowledge of business administration and management to organisational scenarios.' },
      { id: 'PO2', domain: 'Critical Thinking',      statement: 'Analyse business problems and evaluate alternative solutions using management frameworks.' },
      { id: 'PO3', domain: 'Communication',           statement: 'Communicate effectively in business contexts, both verbally and in writing.' },
      { id: 'PO4', domain: 'Problem Solving',         statement: 'Identify, analyse, and solve business problems across functional areas.' },
      { id: 'PO5', domain: 'Ethics',                  statement: 'Apply ethical principles and social responsibility in business decision-making.' },
      { id: 'PO6', domain: 'Teamwork & Leadership',   statement: 'Work effectively in teams and demonstrate leadership in business settings.' },
      { id: 'PO7', domain: 'Technology Use',          statement: 'Leverage relevant business and technology tools for organisational effectiveness.' },
      { id: 'PO8', domain: 'Entrepreneurship',        statement: 'Demonstrate entrepreneurial thinking and the ability to identify business opportunities.' },
      { id: 'PO9', domain: 'Global Awareness',        statement: 'Understand global business environments and cross-cultural management.' },
      { id: 'PO10', domain: 'Lifelong Learning',      statement: 'Engage in continuous learning and professional development.' },
    ],
    psos: [
      { id: 'PSO1', statement: '[relevant PSO for this BBA subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this BBA subject]' },
    ],
  },

  BBA_ANALYTICS: {
    id: 'BBA_ANALYTICS',
    label: 'BBA Analytics — Bachelor of Business Administration (Analytics)',
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
    pos: [
      { id: 'PO1', domain: 'Business & Analytics Knowledge', statement: 'Apply integrated knowledge of business administration and data analytics to organisational decision-making.' },
      { id: 'PO2', domain: 'Critical Thinking',               statement: 'Analyse data and evaluate business insights using analytical and statistical frameworks.' },
      { id: 'PO3', domain: 'Communication',                    statement: 'Communicate data findings and business insights effectively to diverse audiences.' },
      { id: 'PO4', domain: 'Problem Solving',                  statement: 'Apply analytical methods and tools to solve real-world business problems.' },
      { id: 'PO5', domain: 'Ethics & Data Privacy',            statement: 'Apply ethical principles in data collection, analysis, and business decision-making.' },
      { id: 'PO6', domain: 'Teamwork',                         statement: 'Collaborate effectively in analytics and business project teams.' },
      { id: 'PO7', domain: 'Technology & Tools',               statement: 'Use industry-standard analytics tools (Python, R, SQL, Tableau, Power BI) proficiently.' },
      { id: 'PO8', domain: 'Innovation',                       statement: 'Apply data-driven approaches to identify and develop innovative business solutions.' },
      { id: 'PO9', domain: 'Global Awareness',                 statement: 'Understand global data ecosystems, digital business models, and analytics trends.' },
      { id: 'PO10', domain: 'Lifelong Learning',               statement: 'Engage in continuous upskilling in analytics, AI, and emerging technologies.' },
    ],
    psos: [
      { id: 'PSO1', statement: '[relevant analytics-specific PSO for this subject]' },
      { id: 'PSO2', statement: '[relevant PSO for this BBA Analytics subject]' },
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
    pos: [
      { id: 'PO1', domain: 'Legal Knowledge',         statement: 'Demonstrate comprehensive knowledge of substantive and procedural law across relevant areas.' },
      { id: 'PO2', domain: 'Legal Reasoning',         statement: 'Apply legal principles and statutory interpretation to analyse and resolve legal problems.' },
      { id: 'PO3', domain: 'Research Skills',         statement: 'Conduct rigorous primary and secondary legal research using law reports, statutes, and databases.' },
      { id: 'PO4', domain: 'Communication',            statement: 'Communicate legal arguments effectively in written and oral form, including moot court and drafting.' },
      { id: 'PO5', domain: 'Ethics & Professionalism', statement: 'Adhere to professional ethics, Bar Council norms, and principles of justice.' },
      { id: 'PO6', domain: 'Critical Analysis',        statement: 'Critically evaluate legislative, judicial, and policy developments in the law.' },
      { id: 'PO7', domain: 'Social Justice',           statement: 'Understand and apply law as an instrument of social justice and constitutional values.' },
      { id: 'PO8', domain: 'Interdisciplinary Skills', statement: 'Integrate perspectives from arts, social sciences, and humanities with legal analysis.' },
      { id: 'PO9', domain: 'Global Legal Awareness',   statement: 'Understand international law, comparative law, and global legal developments.' },
      { id: 'PO10', domain: 'Lifelong Learning',       statement: 'Engage in continuous legal education and professional development.' },
    ],
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
    pos: [
      { id: 'PO1', domain: 'Legal & Business Knowledge', statement: 'Apply integrated knowledge of law and business administration to corporate and commercial legal scenarios.' },
      { id: 'PO2', domain: 'Legal Reasoning',             statement: 'Apply legal principles and statutory interpretation to analyse and resolve business legal problems.' },
      { id: 'PO3', domain: 'Research Skills',             statement: 'Conduct legal and business research using case law, statutes, and commercial databases.' },
      { id: 'PO4', domain: 'Communication',                statement: 'Communicate legal and business arguments effectively in written and oral form.' },
      { id: 'PO5', domain: 'Ethics & Professionalism',    statement: 'Adhere to professional ethics, Bar Council norms, and corporate governance principles.' },
      { id: 'PO6', domain: 'Critical Analysis',            statement: 'Critically evaluate legal, regulatory, and business policy developments.' },
      { id: 'PO7', domain: 'Corporate Governance',         statement: 'Understand corporate law, compliance frameworks, and governance in business organisations.' },
      { id: 'PO8', domain: 'Global Legal Awareness',       statement: 'Understand international business law, trade law, and cross-border regulatory frameworks.' },
      { id: 'PO9', domain: 'Entrepreneurship & Law',       statement: 'Apply legal knowledge to business formation, contracts, IPR, and entrepreneurial ventures.' },
      { id: 'PO10', domain: 'Lifelong Learning',           statement: 'Engage in continuous legal education and professional development in law and business.' },
    ],
    psos: [
      { id: 'PSO1', statement: '[subject-specific legal/business competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BBA LLB subject]' },
    ],
  },

  // ─── UG SCIENCE / SOCIAL SCIENCE ────────────────────────────────────────────

  BSC_PSYCHOLOGY: {
    id: 'BSC_PSYCHOLOGY',
    label: 'BSc Psychology — Bachelor of Science in Psychology',
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
    pos: [
      { id: 'PO1', domain: 'Disciplinary Knowledge', statement: 'Demonstrate comprehensive knowledge of psychological theories, concepts, and empirical research.' },
      { id: 'PO2', domain: 'Research Skills',         statement: 'Apply research methods and statistical techniques to design and conduct psychological studies.' },
      { id: 'PO3', domain: 'Critical Thinking',       statement: 'Critically evaluate psychological research, theories, and clinical or applied practices.' },
      { id: 'PO4', domain: 'Communication',            statement: 'Communicate psychological concepts and research findings effectively in written and oral form.' },
      { id: 'PO5', domain: 'Ethics',                   statement: 'Apply ethical principles in psychological research, assessment, and professional practice.' },
      { id: 'PO6', domain: 'Applied Skills',           statement: 'Apply psychological knowledge to real-world problems in clinical, educational, or organisational settings.' },
      { id: 'PO7', domain: 'Diversity & Inclusion',    statement: 'Demonstrate sensitivity to cultural, social, and individual diversity in psychological practice.' },
      { id: 'PO8', domain: 'Lifelong Learning',        statement: 'Engage in continuous professional development in psychology and related fields.' },
    ],
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
    pos: [
      { id: 'PO1', domain: 'Economic Knowledge',       statement: 'Apply micro and macroeconomic theories to analyse economic problems and policy issues.' },
      { id: 'PO2', domain: 'Quantitative Skills',      statement: 'Use mathematical and statistical methods to analyse economic data and test hypotheses.' },
      { id: 'PO3', domain: 'Critical Thinking',        statement: 'Critically evaluate economic theories, empirical studies, and policy proposals.' },
      { id: 'PO4', domain: 'Communication',             statement: 'Communicate economic analysis and policy recommendations effectively.' },
      { id: 'PO5', domain: 'Research Skills',          statement: 'Conduct economic research using primary and secondary data sources.' },
      { id: 'PO6', domain: 'Policy Awareness',         statement: 'Analyse Indian and global economic policies and their socioeconomic implications.' },
      { id: 'PO7', domain: 'Ethics',                   statement: 'Apply ethical reasoning to economic decision-making and policy analysis.' },
      { id: 'PO8', domain: 'Global Perspective',       statement: 'Understand international economics, trade, and global economic interdependencies.' },
      { id: 'PO9', domain: 'Lifelong Learning',        statement: 'Engage in continuous learning in economics and related social sciences.' },
    ],
    psos: [
      { id: 'PSO1', statement: '[subject-specific economics competency outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BSc Economics subject]' },
    ],
  },

  // ─── UG HOSPITALITY ─────────────────────────────────────────────────────────

  BHEM: {
    id: 'BHEM',
    label: 'BHEM — Bachelor of Hotel and Event Management',
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
    pos: [
      { id: 'PO1', domain: 'Hospitality Knowledge',    statement: 'Apply theoretical and practical knowledge of hotel and event management operations.' },
      { id: 'PO2', domain: 'Technical Skills',         statement: 'Demonstrate proficiency in hospitality operations including food & beverage, front office, and events.' },
      { id: 'PO3', domain: 'Communication',             statement: 'Communicate effectively with guests, clients, and team members in professional hospitality settings.' },
      { id: 'PO4', domain: 'Problem Solving',           statement: 'Analyse and resolve operational challenges in hotel and event management contexts.' },
      { id: 'PO5', domain: 'Customer Focus',            statement: 'Apply guest-centric service principles and hospitality standards to enhance customer experience.' },
      { id: 'PO6', domain: 'Ethics & Professionalism',  statement: 'Demonstrate professional ethics, grooming standards, and industry norms in hospitality practice.' },
      { id: 'PO7', domain: 'Teamwork & Leadership',     statement: 'Work effectively in hospitality teams and develop supervisory and leadership skills.' },
      { id: 'PO8', domain: 'Sustainability',            statement: 'Apply sustainable hospitality practices including food safety, waste management, and eco-friendly operations.' },
      { id: 'PO9', domain: 'Entrepreneurship',          statement: 'Develop entrepreneurial skills for starting and managing hospitality and event ventures.' },
      { id: 'PO10', domain: 'Global Awareness',         statement: 'Understand international hospitality trends, global tourism, and cross-cultural guest interactions.' },
    ],
    psos: [
      { id: 'PSO1', statement: '[subject-specific hospitality management outcome]' },
      { id: 'PSO2', statement: '[relevant PSO for this BHEM subject]' },
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
