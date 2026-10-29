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
    "Developer working across multimodal AI, computer vision, full-stack systems, and the pipelines that keep them running. Selected work: TulongGuro, LiturgyGen, Kindway, INTELSY.",
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

/**
 * What the masthead says he does, turned over on the beat.
 *
 * Four readings of the same person rather than four claims: the first is the
 * descriptor this site has always carried, and the rest are the words already
 * set in the description and the colophon. Nothing here is new, which is the
 * rule for anything that moves on this page.
 */
export const MASTHEAD_RUN = [
  SITE.descriptor,
  "FULL-STACK · DEVOPS",
  "COMPUTER VISION · MULTIMODAL AI",
  "OPEN TO IT INTERNSHIPS",
];

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
  // "· PHILIPPINES" comes off: the colophon says where, and this line now
  // sets in the sentence column rather than across the whole sheet.
  eyebrow: "COMPUTER SCIENCE · HOLY ANGEL UNIVERSITY",
  // The same sentence, re-broken for the narrower column it now sets in.
  // The spans are hints — if one overruns it wraps and the sheet still holds.
  headline: ["I build systems", "that turn complex", "inputs into useful", "outcomes."],
  support:
    "Developer working across multimodal AI, computer vision, full-stack systems, and the pipelines that keep them running.",
  // Tracked-out mono, for the contact rail. The colophon states the same
  // thing in sentence case; see HERO_SPEC.
  availability: "OPEN TO IT INTERNSHIPS · SOFTWARE · FULL-STACK · DEVOPS · AI/ML",
};

/** What this sheet is, stated in the margin the way every plate states itself. */
export const HERO_SHEET = {
  plate: "PLATE 00",
  label: "FRONTISPIECE",
  marks: [
    { k: "SHEET", v: "01 OF 08" },
    { k: "SET", v: CAPTURED },
    { k: "EXPOSURES", v: "02" },
  ],
  hint: "Point at the plate to turn the exposure. Every figure below is keyed the same way.",
};

/**
 * The three readings this page can prove, set as a key rather than a stats
 * bar. Each row opens the plate that proves it, so the first evidence a
 * reader meets is not an assertion. The figures are the thesis's own
 * (docs/CONCLUSION-AND-RECOMMENDATIONS.md in the TulongGuro repo) and the
 * LiturgyGen README's test count; the earlier "50% · 10 pilot teachers" had
 * no source behind it.
 */
export const HERO_KEY = [
  {
    n: 1,
    value: "55% less grading time per paper",
    source: "TULONGGURO STUDY · 3 TEACHERS",
    href: "#tulongguro",
  },
  {
    n: 2,
    value: "Feedback back in 1.5 days, not 2.55",
    // Not "35 papers": that was the accuracy set. The timing study ran on
    // three other task types (manuscript, Table 23).
    source: "TULONGGURO STUDY · 3 TASK TYPES",
    href: "#tulongguro",
  },
  { n: 3, value: "152 automated tests", source: "LITURGYGEN PIPELINE", href: "#liturgygen" },
];

/**
 * The colophon that closes the opening sheet. Every value here already
 * existed on the page, three to seven screens down — which is no use to a
 * reader whose only question is what he wants, when he is free and how to
 * reach him.
 */
export const HERO_SPEC = {
  reachHref: `mailto:${LINKS.email}`,
  rows: [
    {
      k: "OPEN TO",
      v: "IT internships — software engineering, full-stack, DevOps, AI/ML",
      live: true,
    },
    { k: "BASED IN", v: "Pampanga, Philippines" },
    { k: "GRADUATING", v: "April 2027 · B.S. Computer Science, Holy Angel University" },
    { k: "REACH", v: LINKS.email, href: `mailto:${LINKS.email}`, go: "Write" },
  ],
};

/**
 * The tape that runs above the colophon.
 *
 * Nothing here is new. Each token is the shortest true form of something the
 * key or the colophon above already says, derived from those arrays rather
 * than written out again, so the strip cannot be left quoting a figure the
 * page has since corrected.
 */
export const TAPE = [
  HERO.availability,
  ...HERO_KEY.map((row) => `${row.source} · ${row.value.toUpperCase()}`),
  `BASED IN ${SITE.location.toUpperCase()}`,
  `REACH · ${LINKS.email}`,
];

export type LegendItem = { n: number; title: string; body: string };

/**
 * A measured result, never set without what it was measured against. The
 * value is the big reading; `from → to` is the baseline and the result; the
 * basis says who, how many and how — so a reader can judge it rather than
 * take it.
 */
export type Measure = {
  value: string;
  label: string;
  from?: string;
  to?: string;
  basis: string;
};

/**
 * The engineering view's trace: six stations, always six, laid out as a
 * serpentine in the stylesheet. Step n lights station n and draws the wire
 * that reaches it from station n − 1.
 */
export type TraceStation = { label: string; sub: string; title: string; body: string };

export type Decision = { title: string; body: string };

export type Check = { k: string; v: string; note?: string };

export type Engineering = {
  trace: TraceStation[];
  decisions: Decision[];
  checks: Check[];
  limits: string;
  /** Absent when the code is private: there is nothing public to point at. */
  source?: { label: string; href: string };
};

/**
 * Who did the work. Where the commit history can say, it says it as a count;
 * where it cannot (a team on one shared account), there is no count at all.
 */
export type Contribution = { role: string; commits?: string; note?: string };

/**
 * The expandable account under "My part": what I did, one problem and how it
 * was closed, and what I would change. Every line points at a commit or a
 * document. Where the record cannot separate my work from the team's, `did`
 * is empty and `scope` says so rather than guessing a share.
 */
export type CaseNotes = {
  scope: string;
  did: string[];
  problem: { title: string; body: string; href?: string; label: string };
  next: string;
};

const TG_REPO = "https://github.com/Damudachi/TulongGuro";
const TG_STUDY = `${TG_REPO}/blob/main/docs/CONCLUSION-AND-RECOMMENDATIONS.md`;

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
  contribution: {
    role: "Thesis lead — architecture and end-to-end development on a thesis team.",
    commits: "189 of 358 commits",
  } satisfies Contribution,
  // From the commit history: 7f87bc7 and 669696a are mine; the teammates'
  // 169 commits are where the admin, roster and mobile-layout work landed.
  notes: {
    scope: "My commits, and what the team’s commits cover",
    did: [
      "Architecture and the AI grading path: batching several papers into one model request, rotating across models, and splitting “validate” from “release”.",
      "The grading audit trail (AI graded → teacher validated → released), and a system rule telling the model to ignore instructions written inside a student’s paper.",
      "Teammates’ commits include admin settings, school codes, redaction-tool and mobile-layout fixes; the Docker Compose setup is a teammate’s too.",
    ],
    problem: {
      title: "A late batch result could silently undo a teacher",
      body: "A batch snapshots its queue and can run for minutes. If a teacher validated a paper in the meantime, the batch’s write reverted it to pending, and it quietly dropped out of “release all”. The write is now scoped to papers still pending, so a late result becomes a reported no-op.",
      href: `${TG_REPO}/commit/669696a`,
      label: "Commit 669696a",
    },
    next: "Run the timing study counterbalanced (the manual condition always went first), and move the job registry and quota out of memory before running a second API instance.",
  } satisfies CaseNotes,
  measures: [
    {
      value: "55%",
      label: "less grading time per paper",
      from: "5.05 min",
      to: "2.22 min",
      // 55.34% is the thesis's own figure: the mean of the three per-task
      // reductions in Table 21. The drop between the two overall means is
      // 56.04%. Both are stated so the arithmetic can be checked.
      basis:
        "3 Grade 6 English teachers timed short responses, full essays and reading reflections by hand, then with TulongGuro. 55% is the study’s mean of the three per-task cuts (75%, 57%, 34%); the two overall means alone give 56%.",
    },
    {
      value: "41%",
      label: "faster feedback turnaround",
      from: "2.55 days",
      to: "1.50 days",
      basis: "Collection to validated feedback returned, same teachers and tasks.",
    },
    {
      value: "25.71%",
      label: "of raw AI drafts in the teacher’s band",
      basis: "9 of 35. The draft is not the grade — which is why nothing releases without a teacher.",
    },
  ] satisfies Measure[],
  measuresNote:
    "From the thesis evaluation. Descriptive, not generalisable: three teachers, the manual condition always run first. The 35-paper accuracy check was a separate set of papers.",
  measuresSource: { label: "Read the study’s conclusions", href: TG_STUDY },
  stack: [
    "React 19",
    "Vite",
    "Tailwind CSS",
    "Node.js / Express",
    "Prisma",
    "Supabase PostgreSQL",
    "Supabase Storage",
    "Google Gemini",
    "Vercel",
    "Render",
  ],
  demo: "https://tulong-guro.vercel.app/",
  links: [
    { label: "Open the live site", href: "https://tulong-guro.vercel.app/", lead: true },
    { label: "Read the code", href: TG_REPO, lead: false },
  ],
  shot: {
    bar: "tulong-guro.vercel.app",
    alt: "The TulongGuro home page, headlined “Grading that gives you your evenings back”, with buttons to register a school or sign in.",
    fig: "FIG. 1.1 — THE LIVE SITE",
    note: "A capture of the deployed application, not a mockup.",
  },
  engineering: {
    trace: [
      {
        label: "Progressive web app",
        sub: "React 19 · Vite · Vercel",
        title: "A photographed page goes in",
        body: "A teacher or student uploads a photo of handwritten work, or a typed file, against an activity and its rubric. Uploads queue offline and send when the connection comes back.",
      },
      {
        label: "Express API",
        sub: "Node.js · Render",
        title: "The API takes the job",
        body: "One deliberate single instance: the AI job registry and the daily model quota live in memory, so there is exactly one place that knows how much budget is left.",
      },
      {
        label: "Image optimiser",
        sub: "orient · cap · compress",
        title: "The image is prepared before it costs anything",
        body: "Orientation corrected, resolution capped, JPEG recompressed — server-side, before the model ever sees it.",
      },
      {
        label: "Vision-language model",
        sub: "Gemini Flash · fallback tier",
        title: "One inference reads and scores",
        body: "The model reads the handwriting and scores it criterion by criterion against the teacher’s rubric in a single call. A primary and a fallback Flash model, so a class is read to one standard whichever answers.",
      },
      {
        label: "PostgreSQL",
        sub: "Prisma · Supabase",
        title: "A draft is stored, marked PENDING",
        body: "Score, rubric breakdown and feedback land as a draft. The write is scoped to status PENDING, so a batch result that arrives late can never overwrite a grade a teacher has already validated.",
      },
      {
        label: "Teacher review",
        sub: "validate · then release",
        title: "A teacher validates, then releases",
        body: "Validating marks a paper GRADED; releasing publishes the set. Two acts, so a teacher who recalibrates on paper 20 has not already shown paper 2 to a student. Every change goes to an append-only audit log.",
      },
    ],
    decisions: [
      {
        title: "Validation and release are separate",
        body: "Teachers recalibrate partway down a stack. Holding release until the set is reviewed means a drifting standard is corrected before any student sees it.",
      },
      {
        title: "The AI draft is kept beside the final mark",
        body: "aiScore and hitlScore are separate columns, with an append-only log behind them, so an approval can be reconstructed if a grade is disputed months later.",
      },
      {
        title: "Late results cannot overwrite a teacher",
        body: "A batch can run for minutes. Scoping its write to PENDING turns a late result into a no-op instead of silently un-validating a paper.",
      },
      {
        title: "One API instance, on purpose",
        body: "In-memory job state and quota keep the system simple and correct at pilot scale. The cost is named: scaling out means moving both somewhere shared first.",
      },
    ],
    checks: [
      { k: "Unit & component", v: "32 / 32 pass", note: "plus 5 / 5 VLM functional scenarios" },
      { k: "Functional & regression", v: "170 cases", note: "13 problems found, fixed and re-verified" },
      { k: "ISO/IEC 25010:2023", v: "4.35 / 5", note: "“Very Good”" },
      { k: "System Usability Scale", v: "80 · 75 · 84", note: "teacher · student · admin" },
      { k: "AI time per paper", v: "24.83 s", note: "mean, the model’s own processing" },
      { k: "Raw AI band agreement", v: "25.71%", note: "macro-F1 11.64% across 35 outputs" },
    ],
    limits:
      "Accuracy: 35 outputs from two activities. Timing: three teachers on three other task types, manual condition first. The repository also carries 84 files in its server test suite.",
    source: { label: "Study conclusions on GitHub", href: TG_STUDY },
  } satisfies Engineering,
};

/**
 * The walkthrough on Plate I. Every word below was written for this page:
 * three fictional learners, one real rubric. The rubric is TulongGuro’s own
 * built-in Narrative & Persuasive Composition template (server/
 * rubricTemplates.js), criteria and weights verbatim. Nothing here came out
 * of a model — the drafts are precomputed, and the Lab says so on its face.
 * The first sample is adapted from the worked example the app itself shows
 * teachers before they trust it with a class (src/components/ExampleFeedback.jsx).
 */
export type LabCriterion = { name: string; points: number; description: string };

export type LabSample = {
  id: string;
  learner: string;
  activity: string;
  medium: string;
  lines: string[];
  scores: { draft: number; why: string; line?: number }[];
  strengths: string;
  growth: { line: number; quote: string; explanation: string }[];
  steps: string[];
};

export const LAB = {
  plate: "FIG. 1.2",
  title: "Grade one paper the way a teacher does",
  label: "Simulated walkthrough · sample data · no live inference",
  intro:
    "Pick a paper, read the rubric and the draft, change what you disagree with, then validate and release it. The drafts are precomputed for this page; the states they move through are the application’s own.",
  stages: [
    { key: "select", title: "Choose a paper" },
    { key: "rubric", title: "Read the rubric" },
    { key: "draft", title: "Check the draft" },
    { key: "edit", title: "Make it yours" },
    { key: "approve", title: "Validate & release" },
    { key: "done", title: "What changed" },
  ],
  rubric: {
    name: "Narrative & Persuasive Composition Rubric",
    source: "TulongGuro built-in template · Grade 6 English",
    criteria: [
      {
        name: "Content & Ideas",
        points: 35,
        description: "Depth and relevance of ideas, a clear central message or claim, and understanding of the prompt/topic.",
      },
      {
        name: "Organization",
        points: 25,
        description: "Clear introduction, body, and conclusion; logical sequence of ideas or events; effective transitions.",
      },
      {
        name: "Evidence & Support",
        points: 20,
        description: "Uses specific evidence, examples, or details to support the narrative or persuasive claim.",
      },
      {
        name: "Language & Mechanics",
        points: 20,
        description: "Age-appropriate, gender-responsive, culture-sensitive language; correct grammar, spelling, and punctuation.",
      },
    ] satisfies LabCriterion[],
  },
  samples: [
    {
      id: "favourite-place",
      learner: "Learner A",
      activity: "Narrative: My Favourite Place",
      medium: "Handwritten · photographed",
      lines: [
        "My favourite place is my Lola's house in Bataan.",
        "I go their every summer with my cousins.",
        "The sea is right behind the house and it smells like salt.",
        "It was fun we swam and ate grilled fish by the shore.",
        "At night we listen to the waves until we fall asleep.",
        "I want to go back there every year of my life.",
      ],
      scores: [
        { draft: 30, why: "A clear central feeling about one place, held from the first line to the last.", line: 0 },
        { draft: 19, why: "Opens and closes well; the middle runs events together without transitions.", line: 3 },
        { draft: 16, why: "Concrete detail — salt air, grilled fish, the waves — carries the description.", line: 2 },
        { draft: 12, why: "A homophone error and a run-on sentence.", line: 1 },
      ],
      strengths:
        "You describe your favourite place with real feeling, and the reader can picture it. The smell of salt and the sound of the waves do the work for you.",
      growth: [
        {
          line: 1,
          quote: "I go their every summer",
          explanation: "‘Their’ shows belonging. For a place, use ‘there’ — ‘I go there every summer.’",
        },
        {
          line: 3,
          quote: "It was fun we swam and ate",
          explanation: "Two ideas are joined without punctuation. Try: ‘It was fun. We swam and ate…’",
        },
      ],
      steps: [
        "Practise the difference between ‘there’, ‘their’ and ‘they’re’.",
        "Read your work aloud — where you pause for breath, you usually need a full stop.",
      ],
    },
    {
      id: "school-garden",
      learner: "Learner B",
      activity: "Persuasive: Our School Needs a Garden",
      medium: "Typed · uploaded",
      lines: [
        "Our school should build a vegetable garden.",
        "First, a garden teaches us where food comes from.",
        "Second, we can use the vegetables for the feeding program.",
        "Some people say it is too much work, but every class can take one week.",
        "Also gardens are nice.",
        "That is why the principal should say yes to a garden.",
      ],
      scores: [
        { draft: 29, why: "A clear claim, stated first and returned to at the end.", line: 0 },
        { draft: 22, why: "Signposted reasons — first, second — and a counter-argument answered.", line: 3 },
        { draft: 12, why: "Two reasons are supported; the third is an opinion with nothing behind it.", line: 4 },
        { draft: 17, why: "Clean sentences; one missing comma after an introductory word.", line: 4 },
      ],
      strengths:
        "You state your claim in the first sentence and you answer the strongest objection before anyone can raise it. That is what persuasive writing is for.",
      growth: [
        {
          line: 4,
          quote: "Also gardens are nice.",
          explanation: "This reason has no support. Say what makes them nice — shade, a quiet place to read — or leave it out.",
        },
      ],
      steps: [
        "Give every reason one piece of evidence: a fact, an example or a number.",
        "After ‘Also,’ ‘First,’ and ‘However,’ put a comma.",
      ],
    },
    {
      id: "rainy-day",
      learner: "Learner C",
      activity: "Narrative: The Day the Rain Came",
      medium: "Handwritten · photographed",
      lines: [
        "the rain came on the day of our field trip.",
        "We waited in the bus.",
        "Then we went home.",
        "My friend Ana was sad because she brought a camera.",
        "I was sad to.",
        "The end.",
      ],
      scores: [
        { draft: 18, why: "The event is there, but the story stops before anything happens in it.", line: 2 },
        { draft: 13, why: "Events are in order, with no build and an abrupt close.", line: 5 },
        { draft: 9, why: "One detail — Ana’s camera — is the only thing the reader can see.", line: 3 },
        { draft: 12, why: "A missing capital and a ‘to / too’ error.", line: 4 },
      ],
      strengths:
        "Ana’s camera is a strong detail: it tells the reader exactly what the rain took away without saying so.",
      growth: [
        {
          line: 2,
          quote: "Then we went home.",
          explanation: "This is where your story could happen. What did you see from the bus window? What did anyone say?",
        },
        {
          line: 4,
          quote: "I was sad to.",
          explanation: "‘To’ points somewhere. When you mean ‘also’, write ‘too’ — ‘I was sad too.’",
        },
      ],
      steps: [
        "Add three sentences between waiting and going home: one you saw, one you heard, one you felt.",
        "Start every sentence with a capital letter, including the first.",
      ],
    },
  ] satisfies LabSample[],
  states: {
    PENDING: "Pending review",
    GRADED: "Validated",
    RELEASED: "Released",
  },
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
  contribution: {
    role: "Sole developer, under contract to the HAU Campus Ministry Office.",
    commits: "59 of 59 commits",
  } satisfies Contribution,
  notes: {
    scope: "Sole developer: all of it is mine",
    did: [
      "The React client, the Express API, the romcal calendar overlay, the rate-limited readings queue, the prayer-matching cascade and the .docx builder.",
      "The public demo: a seeded, client-only build, with a script that strips copyrighted text before anything is committed.",
    ],
    problem: {
      title: "The progress bar stopped behind the sign-in",
      body: "Batch progress streamed over EventSource, which cannot send an Authorization header. Once the app sat behind sign-in, the stream answered 401 and the bar just stalled. It now streams over an authenticated fetch, with regression tests so EventSource cannot come back.",
      href: "https://github.com/Damudachi/LiturgyGen/commit/8a5a2f4",
      label: "Commit 8a5a2f4",
    },
    next: "Bring back the single-file desktop installer that the move from SQLite to PostgreSQL put on hold.",
  } satisfies CaseNotes,
  stack: [
    "React",
    "Vite",
    "Node.js / Express",
    "PostgreSQL (Supabase)",
    "docx",
    "romcal",
    "Render",
    "GitHub Pages",
  ],
  repo: "https://github.com/Damudachi/LiturgyGen",
  links: [
    { label: "Open the app", href: "https://liturgygen.onrender.com/", lead: true },
    { label: "Read the code", href: "https://github.com/Damudachi/LiturgyGen", lead: false },
  ],
  demoNote:
    "The app opens on the office’s sign-in. Its “See the demo” button needs no account: a client-only build on GitHub Pages with seeded data kept in your browser. Scripture text and the office’s own prayers are copyrighted, so the demo uses stand-in lines.",
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
      body: "Readings come through a serialised, rate-limited queue with a fallback source and a permanent disk cache, and progress streams to the client as a run proceeds.",
    },
    {
      n: 4,
      title: "152 automated tests",
      body: "138 server and 14 client tests, last run 11 Oct 2026, so a change to one feast day does not quietly break another.",
    },
  ] satisfies LegendItem[],
  context: "Built for publishing workflows in the HAU Campus Ministry Office.",
  engineering: {
    trace: [
      {
        label: "React client",
        sub: "Vite · one API interface",
        title: "A day or a month is asked for",
        body: "The client talks to one interface with two implementations behind it — the real API, or a seeded mock for the public demo — so no component knows which it is using.",
      },
      {
        label: "Express API",
        sub: "Render · same origin",
        title: "The API owns everything slow or shared",
        body: "Supabase issues the session; the server verifies the token and resolves which parish is asking before any work starts.",
      },
      {
        label: "Liturgical calendar",
        sub: "romcal · local ORDO overlay",
        title: "The date is resolved",
        body: "romcal’s Philippine calendar, with a local ORDO overlay on top of it.",
      },
      {
        label: "Readings queue",
        sub: "rate-limited · cached",
        title: "The readings are fetched once",
        body: "A serialised, rate-limited queue against the primary source, a fallback when it fails, and a permanent disk cache so a reading is never fetched twice.",
      },
      {
        label: "Prayer cascade",
        sub: "PostgreSQL templates",
        title: "The prayers are matched",
        body: "Templates and hand corrections in PostgreSQL, matched to the day through a cascading engine.",
      },
      {
        label: "Word builder",
        sub: "docx · daily or monthly",
        title: "A print-ready .docx comes out",
        body: "The missalette is assembled as a Word document a layout desk can send to print, with progress streamed back to the client as it builds.",
      },
    ],
    decisions: [
      {
        title: "Progress over fetch, not EventSource",
        body: "EventSource cannot send an Authorization header. Behind the sign-in gate the stream answered 401 and the progress bar simply stopped — so the client streams over fetch, and a test asserts it never reaches for EventSource.",
      },
      {
        title: "SQLite to PostgreSQL in week 3",
        body: "Hosting needed a server database. The cost is named, not discovered later: the single-file desktop installer is on hold, because it relied on SQLite being a file.",
      },
      {
        title: "A demo that cannot leak",
        body: "The public seed is generated by a script that strips copyrighted scripture text and the office’s transcribed prayers before anything is committed.",
      },
      {
        title: "Demo mode is the default",
        body: "Only the exact string ‘false’ turns it off, so a mistyped variable leaves a visible demo rather than a silently broken build.",
      },
    ],
    checks: [
      { k: "Server tests", v: "138", note: "1 skips without a real PostgreSQL" },
      { k: "Client tests", v: "14" },
      { k: "Last full run", v: "11 Oct 2026", note: "per the README" },
      { k: "Regression guards", v: "boot · stream · CSP", note: "sign-in over HTTP, no EventSource, policy headers" },
    ],
    limits:
      "The demo shows the interface, not the pipeline: readings and prayers are stand-ins, and nothing is fetched or generated server-side.",
    source: { label: "Architecture in the README", href: "https://github.com/Damudachi/LiturgyGen#architecture" },
  } satisfies Engineering,
};

/**
 * Kindway's repository is private, so nothing here links into it: the
 * figures come from its README, docs/roadmap.md, docs/security-review.md and
 * docs/ai-evaluation.md, and the test count from a full `jest` run on
 * 29 Oct 2026 (510 passed; the 69 skipped need the hosted project or a live
 * model). The commit count is the local history, one author.
 */
const KW_SITE = "https://kindway.pages.dev/";

export const KINDWAY = {
  plate: "PLATE IV",
  index: "04",
  title: "Kindway",
  descriptor: "AI Reflection Journal for Android & the Web",
  year: "2026",
  category: "MOBILE & WEB",
  summary:
    "A private evening journal for Android and the iPhone web, with AI that reflects on an entry only when asked, and only with consent.",
  contribution: {
    role: "Sole developer — the app, the backend and the AI pipeline.",
    commits: "39 of 39 commits",
    note: "private repository",
  } satisfies Contribution,
  notes: {
    scope: "Sole developer: all of it is mine",
    did: [
      "The Expo app for Android and its web build for iPhone: onboarding, the composer, journal, Patterns, Compass and the Tomorrow Bridge, a night scheme, reminders and an Android home-screen widget.",
      "The Supabase side: migrations with Row Level Security on every table, two-user pgTAP tests, cloud sync and account deletion.",
      "The AI path: three Edge Functions, versioned consent per feature, a request ledger with a cooldown and a daily cap, and a 20-case live evaluation of the replies.",
    ],
    problem: {
      title: "“Written by AI” could be faked",
      body: "My security review found that a signed-in user could insert their own AI rows, so a reflection’s provider, model and label could be forged inside their own account. Now only the Edge Functions write those rows, with the server key and the verified user id; users can read and delete them but never create one. pgTAP tests and a hosted smoke test that tries a direct write keep it that way.",
      label: "Security review, finding SR-1 · private repository",
    },
    next: "Replace last-writer-wins sync with field-level conflict handling before anyone uses two devices, and have the safety flow reviewed by a clinician rather than resting on a phrase check and the model’s own flag.",
  } satisfies CaseNotes,
  stack: [
    "React Native",
    "Expo",
    "TypeScript",
    "Supabase Auth",
    "PostgreSQL + RLS",
    "Edge Functions",
    "GroqCloud",
    "Cloudflare Pages",
    "Jest",
    "pgTAP",
  ],
  links: [{ label: "Open the web app", href: KW_SITE, lead: true }],
  demoNote:
    "The web app is the iPhone build. It works with no account, everything kept in your browser; real AI needs an account and consent, so without one the reflections are simulated and say so. The code is in a private repository.",
  captured: "29 OCT 2026",
  shots: [
    {
      src: "today",
      bar: "Today",
      alt: "Kindway’s Today screen at night: “How are you arriving tonight?”, a Write a thought button, and the day’s entry on a winding trail tagged Worried and Proud.",
      fig: "FIG. 4.2 — TODAY",
    },
    {
      src: "consent",
      bar: "Consent",
      alt: "An onboarding step headed “Your thoughts deserve care.”, explaining separately what happens when the journal is stored and when AI reflects on it.",
      fig: "FIG. 4.3 — WHAT HAPPENS TO YOUR WORDS",
    },
    {
      src: "reflection",
      bar: "Reflection",
      alt: "A reflection on a sample entry about presenting a project in class, marked “Preview response · simulated” because no account is signed in.",
      fig: "FIG. 4.4 — A REFLECTION, LABELLED",
      note: "Simulated: no account, so no real AI, and the screen says so. The entry was written for this capture.",
    },
  ],
  legend: [
    {
      n: 1,
      title: "Free writing, on the device",
      body: "The journal works fully with no account: entries live on the phone, or in the browser’s IndexedDB on the web.",
    },
    {
      n: 2,
      title: "Consent per feature",
      body: "Reflections, reviews and follow-ups each need their own recorded, versioned consent, and withdrawing one stops the next request on the server.",
    },
    {
      n: 3,
      title: "Only the server writes AI",
      body: "Edge Functions verify the user, check consent and the request ledger, call the model, and store the reply with the server key.",
    },
    {
      n: 4,
      title: "510 automated tests",
      body: "Across 28 suites, run 29 Oct 2026. Another 69 run only against the hosted project and the live model.",
    },
  ] satisfies LegendItem[],
  context: "Built for a two-person closed beta: the owner on Android, a friend on iPhone.",
  engineering: {
    trace: [
      {
        label: "Composer",
        sub: "React Native · Expo Router",
        title: "An entry is written on the device",
        body: "Free writing first; feelings, prompts and compass values are optional. The entry is saved on the phone — IndexedDB in a browser — before anything else happens.",
      },
      {
        label: "Cloud backup",
        sub: "Supabase · Postgres · RLS",
        title: "Synced only if asked",
        body: "With an account and backup on, records sync to Postgres. Every table has Row Level Security, so a row is only ever its owner’s. Sync is per record, last writer wins.",
      },
      {
        label: "Consent check",
        sub: "versioned · revocable",
        title: "Consent is checked on the server",
        body: "Reflection, review and follow-up each need their own consent at the current version. An outdated or withdrawn one is refused before any model is called.",
      },
      {
        label: "Edge Function",
        sub: "Deno · request ledger",
        title: "The server builds the request",
        body: "It verifies the token, reads the entry itself, then runs the safety screen and the ledger: one request at a time, a cooldown, a daily cap. The client never sends entry text or a user id.",
      },
      {
        label: "Language model",
        sub: "GroqCloud · gpt-oss-120b",
        title: "Three advisors, then one answer",
        body: "Three advisor passes write notes against flattery, the answer is written from them and validated, and any safety flag sends the user to support instead. Zero Data Retention is on.",
      },
      {
        label: "AI outputs",
        sub: "server-only writes",
        title: "Stored where only the server writes",
        body: "The reply is saved with the server key under the verified user and read back on the user’s other devices. Users can delete it; they cannot forge one.",
      },
    ],
    decisions: [
      {
        title: "The journal works without an account",
        body: "Device first. An account, cloud backup and AI are three separate choices, each asked for when it matters, so the app is still useful with all three off.",
      },
      {
        title: "Simulated is labelled, never passed off",
        body: "Without real AI the app shows pre-written previews chosen by style and tags, and each one says that nothing read the writing.",
      },
      {
        title: "A web app instead of an iOS build",
        body: "A native iPhone build needs a paid Apple Developer account, so the iPhone gets an installable PWA from the same code. The cost is named: no reminders or widget there yet.",
      },
      {
        title: "Risk goes to people, not the model",
        body: "If the phrase check or the model flags a safety concern, the app shows verified Philippine support contacts and no model text.",
      },
    ],
    checks: [
      { k: "Automated tests", v: "510 pass", note: "28 suites, 29 Oct 2026; 69 more need the live services" },
      { k: "Hosted smoke test", v: "9 / 9", note: "two throwaway accounts, live model, a direct write refused" },
      { k: "Live AI evaluation", v: "20 cases", note: "2 problems found, fixed and rerun" },
      { k: "Security review", v: "10 findings", note: "none High; both Mediums fixed" },
      { k: "Accessibility", v: "14 screens", note: "every control named; AA contrast tested in both schemes" },
      { k: "Users", v: "2", note: "a closed beta — no usage figures yet" },
    ],
    limits:
      "A two-person beta, not a launch. The AI evaluation is product QA on fictional entries, judged by me, not clinical validation. Safety screening is a phrase check plus the model’s own flag, and sync is last writer wins.",
  } satisfies Engineering,
};

const INTELSY_REPO = "https://github.com/ShawnUriel/MIGHT-TEAM_INTELSY";

export const INTELSY = {
  plate: "PLATE III",
  index: "03",
  title: "INTELSY",
  descriptor: "Real-Time Industrial PPE Detection",
  year: "2026",
  category: "COMPUTER VISION",
  summary:
    "A computer-vision pipeline for detecting hardhats, safety vests, and face masks.",
  /**
   * No per-person commit count here, on purpose: the team worked from one
   * shared account, so the repository's history cannot say who did what.
   */
  contribution: {
    role: "Built jointly by the MIGHT team, working together from one shared account — the work is the team’s as a whole, not split by person.",
  } satisfies Contribution,
  notes: {
    scope: "Team-level results only",
    did: [],
    problem: {
      title: "Short runs found almost nothing (team)",
      body: "Every short run kept recall under 0.10, whatever the data fraction or image size. The team then trained in full: resumed from earlier weights, 30 epochs at 640 px, which reached recall 0.84 on the validation set.",
      href: `${INTELSY_REPO}/blob/main/docs/release_notes_v1.0.md`,
      label: "Release notes",
    },
    next: "Measure latency (the report defines it but never measured it), test on footage from a real site, and deal with the class imbalance behind NO-Safety Vest’s 0.19.",
  } satisfies CaseNotes,
  stack: ["Python", "YOLOv8", "OpenCV", "PyTorch", "Google Colab"],
  repo: INTELSY_REPO,
  links: [
    {
      label: "Team repository",
      href: INTELSY_REPO,
      lead: false,
    },
  ],
  teamNote: "Team repository — built with the MIGHT team, not solo.",
  legend: [
    {
      n: 1,
      title: "Fourteen classes, PPE first",
      body: "YOLOv8 fine-tuned on the 14-class Roboflow PPE Combined set: hardhats, safety vests and face masks, their NO- counterparts, and the context around them.",
    },
    {
      n: 2,
      title: "Live and batch inference",
      body: "One script runs a still image, a folder, a video or a live webcam, from a committed checkpoint — no training needed to demonstrate it.",
    },
    {
      n: 3,
      title: "Ablation studies",
      body: "Early runs swept dataset fraction and image size to see what each one buys before committing to a full training run.",
    },
    {
      n: 4,
      title: "What was compared",
      body: "Precision, recall, mAP@0.5 and mAP@0.5:0.95 per configuration, against a non-learning majority-class baseline.",
    },
  ] satisfies LegendItem[],
  caption: "Illustration of the detection task. Not model output.",
  /**
   * YOLO's own validation renders from the final run (colab_ppe_v_final,
   * the checkpoint promoted to models/best.pt). Batch 0 is left out: its
   * "pred" file is byte-identical to its labels file, so it is not output.
   */
  output: {
    fig: "FIG. 3.2 — VALIDATION BATCHES",
    badge: "Precomputed · not live",
    model: "YOLOv8 · colab_ppe_v_final · epoch 30 · 14 classes",
    note: "The final checkpoint’s real predictions on held-out images, saved during training, beside the human labels for the same images. Nothing runs in your browser. Images: Roboflow PPE Combined, CC BY 4.0.",
    live: "Running it live would mean an ONNX export of the 22 MB checkpoint and a WebAssembly runtime on this page, so the saved output is shown instead.",
    pred: "Model predictions",
    labels: "Ground-truth labels",
    batches: [
      {
        key: "1",
        label: "Batch 1",
        alt: {
          pred: "A four-by-four grid of construction-site photographs with the model’s boxes: mostly hardhats at confidence 0.3 to 0.8, and one safety vest.",
          labels: "The same sixteen photographs with the human-annotated boxes the model was scored against.",
        },
      },
      {
        key: "2",
        label: "Batch 2",
        alt: {
          pred: "Sixteen more site photographs with the model’s boxes: hardhats at confidence 0.3 to 0.9, and one NO-Safety Vest at 0.3.",
          labels: "The same sixteen photographs with their human-annotated boxes, which in this batch mark hardhats only.",
        },
        caveat: "This batch’s labels mark hardhats only. A vest the model leaves unboxed is not counted against it, and a hardhat it finds that nobody labelled counts as a false positive.",
      },
    ],
  },
  measures: [
    {
      value: "0.78",
      label: "mAP@0.5, final checkpoint",
      basis: "Validation set (8,814 images), epoch 30 of the final run. mAP@0.5:0.95 is 0.52.",
    },
    {
      value: "0.84",
      label: "recall",
      basis: "Same run; precision 0.71. For a safety tool, a missed hardhat costs more than a false alarm.",
    },
    {
      value: "0.06",
      label: "mAP@0.5, where it started",
      basis: "The first short YOLOv8n run, before full training. Kept here because it is where the work started.",
    },
  ] satisfies Measure[],
  engineering: {
    trace: [
      {
        label: "Dataset",
        sub: "Roboflow PPE Combined v8",
        title: "A public, labelled dataset",
        body: "30,765 training, 8,814 validation and 4,423 test images at 640 × 640, CC BY 4.0. Heavily imbalanced: hardhats dominate, people and ladders are rare.",
      },
      {
        label: "EDA & baselines",
        sub: "majority class · YOLOv8n",
        title: "What doing nothing scores",
        body: "A majority-class-per-box baseline reaches 0.41 accuracy and 0.04 macro-F1 — the floor any detector has to clear.",
      },
      {
        label: "Ablations",
        sub: "data fraction · image size",
        title: "What each knob buys",
        body: "Short runs varying the data fraction and the input size. More data helped mAP; recall stayed low in every short run.",
      },
      {
        label: "Training",
        sub: "640 px · batch 16 · 30 epochs",
        title: "The full run",
        body: "Fine-tuned in Colab, resumed from the previous run’s weights, at 640 px for 30 epochs.",
      },
      {
        label: "Evaluation",
        sub: "P · R · mAP per class",
        title: "Scored per class",
        body: "Precision, recall and mAP on the validation set, with per-class mAP showing where the model is weakest — masks and the NO- classes.",
      },
      {
        label: "Inference",
        sub: "image · folder · webcam",
        title: "One entry point",
        body: "detect.py runs any source from the committed checkpoint, so a demonstration never depends on retraining.",
      },
    ],
    decisions: [
      {
        title: "Recall over precision",
        body: "A detector that misses an unprotected worker is worse than one that raises a false alarm a person can dismiss.",
      },
      {
        title: "Baseline before model",
        body: "A non-learning baseline sets the floor, so the model’s number means something.",
      },
      {
        title: "Review, not autonomy",
        body: "The report positions the system as decision support with human review, not an automated compliance judge.",
      },
    ],
    checks: [
      { k: "Hardhat", v: "0.54", note: "mAP@0.5:0.95, local test validation" },
      { k: "Safety vest", v: "0.48", note: "mAP@0.5:0.95" },
      { k: "Mask", v: "0.38", note: "mAP@0.5:0.95 — the weakest of these three" },
      { k: "NO-Safety Vest", v: "0.19", note: "mAP@0.5:0.95 — the weakest of all 14 classes" },
      { k: "Overall", v: "0.79 · 0.52", note: "mAP@0.5 · mAP@0.5:0.95, local test validation" },
      { k: "Latency", v: "Not reported", note: "defined in the report; no figure was committed" },
    ],
    limits:
      "Scores are on Roboflow imagery, not footage from a real site. Classes are imbalanced, and the per-class numbers matter more than the overall one.",
    source: {
      label: "Release notes and metrics",
      href: `${INTELSY_REPO}/blob/main/docs/release_notes_v1.0.md`,
    },
  } satisfies Engineering,
};

export const MORE_BUILDS: { n: string; title: string; body: string; href?: string }[] = [
  {
    n: "05",
    title: "MeatShopPOS",
    // From src/main/scala/MeatInventoryPOS.scala and build.sbt in the repo.
    // Not claimed: transactional sales — the stock-update statement there is
    // still an empty placeholder.
    body: "Course project: a Scala 3 and Swing desktop app on MySQL, with inventory, sales, spoilage and restock screens.",
    href: "https://github.com/Damudachi/MeatShopPOS_Scala",
  },
  {
    n: "06",
    title: "Watts Energy",
    body: "Flutter household energy forecasting app.",
  },
  {
    n: "07",
    title: "HAU About That Way",
    body: "Flutter and Supabase campus navigation app.",
  },
];

/**
 * Explore by role. A role reorders the four plates and marks the stack terms
 * the work on this page actually demonstrates — a term that is only listed
 * (RAG, BERT, AWS) is never highlighted, because nothing above shows it.
 * Every summary is a sentence the plates themselves already prove.
 */
export type RoleKey = "swe" | "ai" | "fullstack";
export type PlateId = "tulongguro" | "liturgygen" | "kindway" | "intelsy";

export const ROLES: {
  key: RoleKey;
  label: string;
  summary: string;
  order: PlateId[];
  look: { href: string; label: string }[];
  stack: string[];
}[] = [
  {
    key: "swe",
    label: "IT / Software Engineering",
    summary:
      "Applications built around a real office’s workflow and kept honest by tests. LiturgyGen, built solo for a campus office, runs 152 automated tests. TulongGuro’s testing closed 170 functional and regression cases. Kindway, a solo mobile and web app, runs 510. The bugs I diagnosed are written up commit by commit.",
    order: ["liturgygen", "tulongguro", "kindway", "intelsy"],
    look: [
      { href: "#liturgygen-notes", label: "LiturgyGen — a stalled stream, diagnosed" },
      { href: "#liturgygen-engineering", label: "LiturgyGen — tests and regression guards" },
      { href: "#tulongguro-notes", label: "TulongGuro — a race that undid teachers’ grades" },
      { href: "#kindway-engineering", label: "Kindway — 510 tests and a security review" },
      { href: "#builds", label: "MeatShopPOS — Scala and MySQL" },
    ],
    stack: [
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "SQLite",
      "SQL",
      "Scala",
      "Git",
      "GitHub",
      "Automated testing",
    ],
  },
  {
    key: "ai",
    label: "AI / Machine Learning",
    summary:
      "Models integrated into real workflows, with the evaluation and the limits shown. TulongGuro’s Gemini vision-language grader drafted marks in the teacher’s band only 25.71% of the time, so a teacher approves every grade. INTELSY, a team project, fine-tuned YOLOv8 for PPE detection to mAP@0.5 0.78. Kindway sends an entry to a model only with consent, and its replies went through a 20-case live evaluation.",
    order: ["tulongguro", "intelsy", "kindway", "liturgygen"],
    look: [
      { href: "#tulongguro-engineering", label: "TulongGuro — the vision-language pipeline and its scores" },
      { href: "#lab", label: "TulongGuro — the grading walkthrough (simulated)" },
      { href: "#intelsy", label: "INTELSY — real validation output (team)" },
      { href: "#intelsy-engineering", label: "INTELSY — per-class scores and limits" },
      { href: "#kindway-engineering", label: "Kindway — consent-gated AI and its evaluation" },
    ],
    stack: [
      "Python",
      "Google Gemini API",
      "Vision-Language Models",
      "YOLOv8",
      "AI model integration",
      "Human-in-the-loop design",
    ],
  },
  {
    key: "fullstack",
    label: "Full-stack / DevOps",
    summary:
      "Three deployed apps: React clients, Express APIs, and PostgreSQL through Prisma or Supabase, hosted on Vercel, Render, GitHub Pages and Cloudflare Pages. LiturgyGen’s public demo swaps the real API for a seeded mock behind one interface; Kindway is one React Native codebase shipped to Android and the web.",
    order: ["tulongguro", "kindway", "liturgygen", "intelsy"],
    look: [
      { href: "#tulongguro-engineering", label: "TulongGuro — from the web app to PostgreSQL" },
      { href: "#liturgygen-engineering", label: "LiturgyGen — API, queue, cache and stream" },
      { href: "#liturgygen-notes", label: "LiturgyGen — an auth bug in a streaming API" },
      { href: "#kindway-engineering", label: "Kindway — local-first sync, RLS and Edge Functions" },
    ],
    stack: [
      "React",
      "React Native",
      "Vite",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "Vercel",
      "Render",
      "Cloudflare Pages",
      "Git",
      "GitHub",
    ],
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
  bar: "PLATE 00",
  // What the read-out says while a reader has the plate pinned. It names the
  // length of the pin because the pin is temporary by design: an indefinite
  // one is what used to leave the face stuck on the second exposure.
  pinned: "Pinned · one cycle",
  fig: "FIG. 00 — THE AUTHOR",
  alt: "Aldrich Sabando, in a dark suit and tie, facing the camera.",
  states: [
    { key: "smile", label: "At ease", hint: "Resting state" },
    { key: "shades", label: "On task", hint: "Hover, or wait ten seconds" },
  ],
  note: "Two exposures of one sitting, registered to the same crop.",
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
    role: "Student Office Assistant",
    org: "Holy Angel University · Angeles City, on-site",
    terms: "Part-time, scholarship service",
    dates: "JUN 2023 — OCT 2026",
    body: "Selected under HAU’s scholarship program, serving the university in exchange for a 100% tuition exemption. Handled paperwork and administrative requirements, prepared and staffed university events, and coordinated with students, faculty, and staff. Made pubmats, edited promotional videos, and helped livestream events, working alongside university personnel and fellow student assistants.",
  },
  {
    role: "Google Developer Organization Staff",
    org: "Holy Angel University",
    terms: "",
    dates: "JUN 2023 — PRESENT",
    body: "Coordinated technical events.",
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
    { label: "GWA", value: "1.15 — 1.00 is the highest grade on my university’s scale" },
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
    terms: ["React", "React Native", "Expo", "Vite", "Flutter", "Tailwind CSS", "JavaScript", "TypeScript"],
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
    terms: ["Docker", "Nginx", "Vercel", "Render", "Cloudflare Pages", "AWS EC2", "AWS RDS", "AWS Lambda"],
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

/**
 * Newest first. `href` is the issuer's own verification page — the
 * "Show credential" link on the LinkedIn entry. A credential with no href
 * renders as plain text, so an unverified one is never dressed up as a link.
 *
 * Titles, issuers and dates are the issuers' own: the Credly entries were
 * read back from their badge assertions rather than transcribed, so what the
 * page claims and what the badge says cannot drift apart. The two with no
 * public verification page carry `file` instead: the certificate itself,
 * served from public/cert and downloaded like the résumé.
 */
export const CREDENTIALS: {
  title: string;
  issuer: string;
  year: string;
  href?: string;
  file?: { href: string; download: string };
}[] = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    year: "MAY 2026",
    href: "https://www.coursera.org/account/accomplishments/verify/LSZEUD1M6ZPO",
  },
  {
    title: "SkillQuest — Generative AI Literacy",
    issuer: "Simplilearn SkillUp",
    year: "MAY 2026",
    file: { href: "/cert/certificate.pdf", download: "Aldrich_Sabando_SkillQuest_GenAI_Literacy.pdf" },
  },
  {
    title: "AWS Academy Graduate — Cloud Foundations",
    issuer: "AWS Training & Certification",
    year: "MAR 2026",
    href: "https://www.credly.com/badges/ee3ea386-fb04-4722-93ba-fdb20ba2e76b/linked_in_profile",
  },
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco",
    year: "MAR 2026",
    href: "https://www.credly.com/badges/757fb578-b2dd-4377-97ef-9efc2e868da5/linked_in_profile",
  },
  {
    title: "AI Fundamentals with IBM SkillsBuild",
    issuer: "Cisco",
    year: "MAR 2026",
    href: "https://www.credly.com/badges/43ac7b5e-9157-4859-9ba6-0bfbe5e465ee/linked_in_profile",
  },
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    year: "MAR 2026",
    href: "https://www.credly.com/badges/526e2db8-65c4-4428-80a5-938ced921ab2/linked_in_profile",
  },
  {
    title: "Google Cloud Security",
    issuer: "Google Cloud",
    year: "FEB 2026",
    href: "https://www.credly.com/badges/b8e733b6-261a-40ef-9b12-d5fa9a51f802/linked_in_profile",
  },
  {
    title: "HackAda AI Challenge — AI in UX for Fintech",
    issuer: "KadaKareer × Home Credit",
    year: "DEC 2025",
    file: {
      href: "/cert/Aldrich%20Gavriel_HCHackadaCertificate.pdf",
      download: "Aldrich_Sabando_HackAda_AI_Challenge.pdf",
    },
  },
  {
    title: "Cyber Threat Management",
    issuer: "Cisco",
    year: "NOV 2025",
    href: "https://www.credly.com/badges/a1a0a44a-ef3f-46b5-a352-62501a6b663f/linked_in_profile",
  },
  {
    title: "Endpoint Security",
    issuer: "Cisco",
    year: "AUG 2025",
    href: "https://www.credly.com/badges/69f1dac4-ce0f-453e-9908-3b7b12f9288f/linked_in_profile",
  },
  {
    title: "JavaScript Essentials 1",
    issuer: "Cisco",
    year: "OCT 2024",
    href: "https://www.credly.com/badges/c3e66cfd-4df9-4f19-8f63-01f6e7b44da3/linked_in_profile",
  },
  {
    title: "CompTIA IT Fundamentals+ (ITF+)",
    issuer: "CompTIA",
    year: "NOV 2023",
    href: "https://www.credly.com/badges/ed376267-ccbd-403d-bc70-14d5deb62b6a/linked_in_profile",
  },
  {
    title: "Build a Certification Study Guide: PMLE",
    issuer: "Google Skills",
    year: "",
    href: "https://www.skills.google/public_profiles/bec87c87-24a5-4be3-be98-1090d8afc33c/badges/23447856",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "",
    href: "https://www.freecodecamp.org/certification/damudachi/responsive-web-design",
  },
  {
    title: "Relational Database",
    issuer: "freeCodeCamp",
    year: "",
    href: "https://www.freecodecamp.org/certification/damudachi/relational-database-v8",
  },
];

/**
 * The PDF lives at public/Resume.pdf. The path is case-sensitive on the host,
 * so keep the capital R. Set `href` to null to show the empty slot instead.
 */
export const RESUME: { href: string | null; label: string; pending: string } = {
  href: "/Resume.pdf",
  label: "Résumé",
  pending: "PDF to be supplied",
};

export const CONTACT = {
  headline: "Let’s build something useful.",
  support:
    "Open to IT internships of any kind — software engineering, full-stack, DevOps, and AI/ML engineering are where I am strongest.",
  channels: [
    { label: "Email", value: LINKS.email, href: `mailto:${LINKS.email}`, go: "Write" },
    { label: "GitHub", value: LINKS.githubHandle, href: LINKS.github, go: "Open" },
    { label: "LinkedIn", value: LINKS.linkedinHandle, href: LINKS.linkedin, go: "Open" },
  ],
};
