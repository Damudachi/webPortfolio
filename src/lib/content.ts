/**
 * Every fact on the page lives here. Nothing is generated, inferred or
 * rounded up: these are the details supplied in the brief, verbatim.
 */

export const SITE = {
  name: "Aldrich Sabando",
  role: "Applied AI & Software Engineering",
  descriptor: "APPLIED AI · SOFTWARE ENGINEERING",
  title: "Aldrich Sabando — Applied AI & Software Engineering",
  description:
    "AI/ML-focused developer working across multimodal AI, computer vision, and full-stack systems. Selected work: TulongGuro, LiturgyGen, INTELSY.",
  location: "Pampanga, Philippines",
  year: new Date().getFullYear(),
};

export const LINKS = {
  email: "sabando.ag@gmail.com",
  github: "https://github.com/Damudachi",
  githubHandle: "github.com/Damudachi",
  linkedin: "https://www.linkedin.com/in/aldrich-sabando",
  linkedinHandle: "linkedin.com/in/aldrich-sabando",
};

export const NAV = [
  { id: "work", label: "Work" },
  { id: "profile", label: "Profile" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

/**
 * When the live screenshots on this page were taken. Shown on every capture,
 * so a reader can tell how old the picture is rather than assume it is today.
 */
export const CAPTURED = "11 OCT 2026";

export const HERO = {
  eyebrow: "COMPUTER SCIENCE · HOLY ANGEL UNIVERSITY · PHILIPPINES",
  headline: ["I build systems that turn", "complex inputs into", "useful outcomes."],
  support:
    "AI/ML-focused developer working across multimodal AI, computer vision, and full-stack systems.",
  availability: "OPEN TO AI/ML ENGINEERING INTERNSHIPS",
  annotations: ["BUILD", "TEST", "ITERATE"],
  figure: {
    label: "FIG. 00 — INPUT, INTERPRETATION, SYSTEM",
    caption:
      "Loose marks resolve into a measured field, then into the discrete structure a system can act on.",
  },
};

export const FACTS = [
  { value: "50%", label: "less grading time", source: "Reported across the TulongGuro pilot" },
  { value: "10", label: "pilot teachers", source: "TulongGuro classroom pilot" },
  { value: "90+", label: "automated tests", source: "LiturgyGen generation pipeline" },
];

export const FACTS_NOTE =
  "Each figure comes from that project alone — they are not results of one shared experiment.";

export type LegendItem = { n: number; title: string; body: string };

export const TULONGGURO = {
  plate: "PLATE I",
  index: "01",
  title: "TulongGuro",
  descriptor: "AI-Assisted Grading & Classroom Management System",
  year: "2025 — 2026",
  category: "APPLIED AI",
  summary:
    "AI-assisted, rubric-based feedback for handwritten and typed student work, with teacher approval built into the workflow.",
  detail:
    "Google Gemini vision-language models draft scores and diagnostic feedback against teacher-defined rubrics. Teachers approve every grade. Classroom management and competency analytics sit alongside the grading loop, aligned with the DepEd MATATAG Curriculum.",
  stats: [
    { value: "50%", label: "less grading time" },
    { value: "10", label: "pilot teachers" },
  ],
  stack: [
    "React 19",
    "Vite",
    "Tailwind CSS",
    "Node.js / Express",
    "Prisma",
    "Supabase PostgreSQL",
    "Supabase Storage",
    "Vercel",
    "Render",
  ],
  demo: "https://tulong-guro.vercel.app/",
  links: [
    { label: "Open the live site", href: "https://tulong-guro.vercel.app/", lead: true },
  ],
  shot: {
    bar: "tulong-guro.vercel.app",
    alt: "The TulongGuro home page, headlined “Grading that gives you your evenings back”, with buttons to register a school or sign in.",
    fig: "FIG. 1.1 — THE LIVE SITE",
    note: "A capture of the deployed application, not a mockup.",
  },
  steps: [
    {
      n: 1,
      title: "Student submission",
      body: "Handwritten or typed work enters the queue against a chosen rubric.",
    },
    {
      n: 2,
      title: "Rubric evaluation",
      body: "Gemini vision-language models read the work and score it criterion by criterion.",
    },
    {
      n: 3,
      title: "Drafted feedback",
      body: "Scores arrive with diagnostic comments the teacher can edit before anything is sent.",
    },
    {
      n: 4,
      title: "Teacher approval",
      body: "Nothing reaches a student until a teacher approves it. No grade is released automatically.",
    },
  ],
};

export const LITURGYGEN = {
  plate: "PLATE II",
  index: "02",
  title: "LiturgyGen",
  descriptor: "Automated Document Assembly & Missalette Publishing Engine",
  year: "2026",
  category: "AUTOMATION",
  summary:
    "Automates Philippine liturgical date resolution, reading retrieval, prayer matching, and print-ready .docx generation.",
  stack: ["Python", "FastAPI", "SQLite", "PostgreSQL", "python-docx", "Server-Sent Events"],
  repo: "https://github.com/Damudachi/LiturgyGen",
  links: [
    { label: "Try the demo", href: "https://damudachi.github.io/LiturgyGen/", lead: true },
    { label: "Read the code", href: "https://github.com/Damudachi/LiturgyGen", lead: false },
  ],
  demoNote: "The demo runs on seeded data with no sign-in.",
  shots: [
    {
      src: "day",
      bar: "LiturgyGen / a day, open",
      alt: "A day open in LiturgyGen: the steps for 8 September 2026 on the left, the missalette laid out as it will print on the right.",
      fig: "FIG. 2.2 — A DAY, OPEN AS A BOOK",
    },
    {
      src: "calendar",
      bar: "LiturgyGen / the month",
      alt: "A month of September 2026 as a grid of tiles, each marked with its liturgical colour and the feast the day keeps.",
      fig: "FIG. 2.3 — THE MONTH AS TILES",
    },
  ],
  legend: [
    {
      n: 1,
      title: "Resolve, retrieve, match",
      body: "Works out the liturgical date, pulls the day’s readings, and matches the prayers that belong with them.",
    },
    {
      n: 2,
      title: "Render print-ready .docx",
      body: "Assembles daily or monthly missalettes as documents a layout desk can send straight to print.",
    },
    {
      n: 3,
      title: "Queue, cache, stream",
      body: "Request queues, raw-response caching and batch processing, with Server-Sent Events reporting progress as a run proceeds.",
    },
    {
      n: 4,
      title: "90+ automated tests",
      body: "A test suite covering the generation pipeline, so a change to one feast day does not quietly break another.",
    },
  ] satisfies LegendItem[],
  context: "Built for publishing workflows in the HAU Campus Ministry Office.",
};

export const INTELSY = {
  plate: "PLATE III",
  index: "03",
  title: "INTELSY",
  descriptor: "Real-Time Industrial PPE Detection",
  year: "2026",
  category: "COMPUTER VISION",
  summary:
    "A computer-vision pipeline for detecting hardhats, safety vests, and face masks.",
  stack: ["Python", "YOLOv8", "OpenCV", "PyTorch"],
  repo: "https://github.com/ShawnUriel/MIGHT-TEAM_INTELSY",
  links: [
    {
      label: "Team repository",
      href: "https://github.com/ShawnUriel/MIGHT-TEAM_INTELSY",
      lead: false,
    },
  ],
  teamNote: "Team repository — built with the MIGHT team, not solo.",
  legend: [
    {
      n: 1,
      title: "Three PPE classes",
      body: "YOLOv8 fine-tuned to detect hardhats, safety vests and face masks on the factory floor.",
    },
    {
      n: 2,
      title: "Live and batch inference",
      body: "Real-time webcam inference for demonstration, plus batch evaluation runs over held-out footage.",
    },
    {
      n: 3,
      title: "Ablation studies",
      body: "Trained across a sweep of image dimensions and dataset fractions to see what each one actually buys.",
    },
    {
      n: 4,
      title: "What was compared",
      body: "Precision, recall, mAP@0.5, mAP@0.5:0.95 and inference latency, measured per configuration.",
    },
  ] satisfies LegendItem[],
  caption: "Illustration of the detection task. Not model output.",
};

export const MORE_BUILDS = [
  {
    n: "04",
    title: "MeatShopPOS",
    body: "Scala inventory and point-of-sale system.",
  },
  {
    n: "05",
    title: "Watts Energy",
    body: "Flutter household energy forecasting app.",
  },
  {
    n: "06",
    title: "HAU About That Way",
    body: "Flutter and Supabase campus navigation app.",
  },
];

export const PRINCIPLES = [
  {
    title: "Human-in-the-loop by default",
    body: "Keep people involved where accuracy, trust, and accountability matter.",
  },
  {
    title: "Measure before optimizing",
    body: "Use evaluation metrics and experiments rather than assumptions.",
  },
  {
    title: "Build for the actual workflow",
    body: "Consider usability, deployment, and operational constraints alongside model capability.",
  },
];

export const PROFILE_LEAD =
  "Most of this was built while studying — for a thesis, for a campus office, and with a team. The constraint never changed: it has to hold up for the person who actually has to use it.";

export const PORTRAIT = {
  fig: "FIG. 4 — THE AUTHOR",
  alt: "Aldrich Sabando, in a dark suit and tie, facing the camera.",
  states: [
    { key: "smile", label: "At ease", hint: "Resting state" },
    { key: "shades", label: "On task", hint: "Hover, or wait ten seconds" },
  ],
  note: "Two exposures of the same sitting. The page cycles between them every ten seconds; point at the plate to hold the second.",
};

export const EXPERIENCE = [
  {
    role: "Thesis Lead & AI/Full-Stack Developer",
    org: "Holy Angel University",
    terms: "Apprenticeship, part-time",
    dates: "AUG 2025 — SEP 2026",
    body: "Led architecture and end-to-end development of TulongGuro, integrating Gemini vision-language models, rubric-based grading, classroom management, analytics, and teacher validation aligned with the DepEd MATATAG Curriculum.",
  },
  {
    role: "Software Developer, Internal Systems",
    org: "HAU Campus Ministry Office",
    terms: "Contract, part-time",
    dates: "AUG 2026 — SEP 2026",
    body: "Built LiturgyGen to automate Philippine liturgical date resolution, reading retrieval, prayer matching, and .docx missalette generation.",
  },
  {
    role: "Student Assistant Scholar & Google Developer Organization Staff",
    org: "Holy Angel University",
    terms: "",
    dates: "JUN 2023 — PRESENT",
    body: "Earned a 100% full-tuition scholarship for the full college program in recognition of sustained service as a Student Assistant. Supported office operations and coordinated technical events.",
  },
  {
    role: "VP for Marketing",
    org: "Scholar Volunteers for the Environment (HAU-SVE)",
    terms: "",
    dates: "MAY 2026 — PRESENT",
    body: "Led digital outreach and campaign content for environmental events.",
  },
];

export const EDUCATION = {
  degree: "B.S. Computer Science",
  school: "Holy Angel University, Angeles City",
  facts: [
    { label: "Expected graduation", value: "April 2027" },
    { label: "GWA", value: "1.15 / 1.00 highest" },
    { label: "President’s Lister", value: "Six semesters" },
  ],
  coursework: "Intelligent Systems, Machine Learning, Operating Systems.",
};

export const STACK = [
  {
    group: "AI / ML",
    terms: [
      "Python",
      "Google Gemini API",
      "Vision-Language Models",
      "YOLOv8",
      "RAG",
      "LangChain",
      "NLP",
      "BERT",
      "CNNs",
    ],
  },
  {
    group: "Frontend",
    terms: ["React", "Vite", "Flutter", "Tailwind CSS", "JavaScript"],
  },
  {
    group: "Backend / Data",
    terms: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "SQLite",
      "SQL",
      "Scala",
      "Java",
    ],
  },
  {
    group: "Cloud / DevOps",
    terms: ["Docker", "Nginx", "Vercel", "Render", "AWS EC2", "AWS RDS", "AWS Lambda"],
  },
  {
    group: "Engineering",
    terms: [
      "Git",
      "GitHub",
      "Automated testing",
      "Full-stack development",
      "AI model integration",
      "Human-in-the-loop design",
      "Agile",
      "CRISP-DM",
    ],
  },
];

export const CREDENTIALS = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    year: "2026",
  },
  { title: "AWS Academy Cloud Foundations", issuer: "AWS Academy", year: "" },
  { title: "AI Fundamentals", issuer: "IBM SkillsBuild", year: "2026" },
  { title: "Data Analytics Essentials", issuer: "Cisco", year: "2026" },
  { title: "Google Cloud Security", issuer: "Google Cloud", year: "2026" },
];

export const CONTACT = {
  headline: "Let’s build something useful.",
  support:
    "Open to conversations about applied AI, computer vision, automation, and AI/ML engineering internships.",
  channels: [
    { label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}`, go: "Write" },
    { label: "GitHub", value: LINKS.githubHandle, href: LINKS.github, go: "Open" },
    { label: "LinkedIn", value: LINKS.linkedinHandle, href: LINKS.linkedin, go: "Open" },
  ],
};
