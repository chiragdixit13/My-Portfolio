// ============================================================
// CENTRAL PORTFOLIO CONFIG
// Everything on the site reads from this file. Update values
// here (photos, resume, certificates, projects, links, quotes)
// and the UI updates automatically — no component edits needed.
// ============================================================

import avatarAi from "@/assets/avatar-ai.jpg";
import portrait from "@/assets/portrait.jpg";
import certTata from "@/assets/cert-tata.jpg";
import certJava from "@/assets/cert-java.jpg";
import certMern from "@/assets/cert-mern.jpg";
import mduCampus from "@/assets/mdu-campus.jpg";
import jkboseLogo from "@/assets/jkbose-logo.jpg";
import krishna from "@/assets/krishna.jpg";
import projSos from "@/assets/proj-sos.jpg";
import projStudent from "@/assets/proj-student.jpg";
import projHouse from "@/assets/proj-house.jpg";

export const profile = {
  name: "Chirag Dixit",
  roles: ["AI/ML Engineer", "Software Engineer"],
  typingRoles: [
    "AI/ML Engineer",
    "Software Engineer",
    "Machine Learning Developer",
    "Full Stack Developer",
  ],
  tagline: "Building Intelligent AI Solutions & Modern Software Experiences.",
  location: "Gurugram, Haryana, India",
  email: "chiragdixit320@gmail.com",
  avatar: avatarAi,
  portrait: portrait,
  aboutImage: avatarAi,
  // Drop your PDF at public/resume.pdf (or point this at any URL)
  resumeUrl: "/resume.pdf",
  githubUsername: "chiragdixit13",
  socials: {
    github: "https://github.com/chiragdixit13",
    linkedin: "https://linkedin.com/in/chiragdixit13",
  },
  lookingFor: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Software Engineer",
    "Backend Engineer",
    "Full Stack Developer",
  ],
  intro: [
    "I'm Chirag Dixit — a Computer Science Engineering graduate who builds machine learning systems and the software around them. I like the full arc of a problem: framing it, cleaning the data, training the model, and shipping an interface a real person can use.",
    "My work spans predictive modelling with scikit-learn, data storytelling with pandas and matplotlib, and full stack delivery with React, Next.js and Firebase. I care about clean architecture, measurable results and interfaces that feel effortless.",
  ],
  quickFacts: [
    { label: "Degree", value: "B.Tech CSE" },
    { label: "CGPA", value: "8.0 / 10" },
    { label: "Base", value: "Rohtak, India" },
    { label: "Focus", value: "AI / ML + Full Stack" },
    { label: "Availability", value: "Open to roles" },
    { label: "Languages", value: "English, Hindi" },
  ],
  achievements: [
    "Built an SOS emergency response web app with real-time location sharing.",
    "Trained student-performance and house-price regression models with 85%+ accuracy.",
    "Completed the GenAI Powered Data Analytics job simulation with Tata & Forage.",
    "Maintained an 8.0 CGPA while shipping side projects every semester.",
  ],
};

export const stats = [
  { label: "Projects", value: 12, suffix: "+" },
  { label: "Internships", value: 3, suffix: "" },
  { label: "Certificates", value: 8, suffix: "+" },
  { label: "CGPA", value: 8.0, suffix: "/10", decimals: 1 },
];

export const skillGroups = [
  {
    title: "Programming",
    blurb: "Core languages I reach for daily.",
    skills: [
      { name: "Python", level: 92 },
      { name: "Java", level: 82 },
      { name: "JavaScript", level: 88 },
      { name: "SQL", level: 84 },
    ],
  },
  {
    title: "Machine Learning",
    blurb: "Modelling, analysis and visual storytelling.",
    skills: [
      { name: "Scikit-learn", level: 88 },
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 90 },
      { name: "Matplotlib", level: 85 },
      { name: "Seaborn", level: 82 },
    ],
  },
  {
    title: "Web",
    blurb: "Interfaces and product surfaces.",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 84 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML / CSS", level: 94 },
      { name: "Git & GitHub", level: 88 },
    ],
  },
  {
    title: "Databases & Cloud",
    blurb: "Where the data lives.",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "Firebase", level: 82 },
    ],
  },
];

export const education = [
  {
    course: "B.Tech — Computer Science Engineering",
    institute: "Maharshi Dayanand University, Rohtak",
    years: "2021 — 2025",
    cgpa: "8.0 / 10",
    percentage: "76%",
    photo: mduCampus,
    logo: mduCampus,
    description:
      "Specialised in artificial intelligence, machine learning and data structures, with capstone work in predictive modelling and full stack engineering.",
    achievements: [
      "Consistent 8.0 CGPA across semesters",
      "Capstone: SOS Emergency Response Web App",
      "Coursework in ML, DBMS, OS, Networks and DSA",
    ],
  },
  {
    course: "Senior Secondary (12th) — Science",
    institute: "J&K Board of School Education",
    years: "2019 — 2021",
    cgpa: "—",
    percentage: "96.4%",
    photo: jkboseLogo,
    logo: jkboseLogo,
    description:
      "Physics, Chemistry, Mathematics and Computer Science — where the first lines of code got written.",
    achievements: ["Amongst the Toppers", "Started learning programming"],
  },
];

export const projects = [
  {
    slug: "sos-emergency",
    title: "SOS Emergency Web App",
    subtitle: "Real-time emergency alerting for people in danger",
    cover: projSos,
    gallery: [projSos],
    problem:
      "In an emergency, people lose critical minutes trying to explain where they are and who to call. Existing tools need too many taps.",
    solution:
      "A one-tap SOS web app that captures live geolocation, broadcasts an alert to pre-saved trusted contacts, and keeps a live incident feed for responders.",
    features: [
      "One-tap SOS trigger with live geolocation",
      "Trusted contact broadcast via email/SMS payloads",
      "Live incident map with status tracking",
      "Offline-tolerant queueing of alerts",
      "Role-based responder dashboard",
    ],
    stack: ["React", "Firebase", "Tailwind CSS", "Geolocation API", "Cloud Functions"],
    architecture:
      "React SPA → Firebase Auth for identity → Firestore for incidents with realtime listeners → Cloud Functions fan out notifications to contacts → responder dashboard subscribes to the same collection.",
    timeline: "3 months",
    challenges: [
      "Keeping location accuracy usable indoors",
      "Preventing duplicate alerts on flaky networks",
    ],
    results: [
      "Alert delivered in under 2 seconds end to end",
      "Duplicate alerts reduced to near zero with idempotent writes",
    ],
    metrics: [
      { label: "Alert latency", value: "<2s" },
      { label: "Uptime", value: "99.5%" },
      { label: "Lighthouse", value: "94" },
    ],
    links: {
      github: "https://github.com/chiragdixit13/Emergency-SOS",
      demo: "https://emergency-sos-oltf.vercel.app",
      caseStudy: "",
    },
  },
  {
    slug: "student-performance",
    title: "Student Performance Prediction",
    subtitle: "Predicting academic outcomes with supervised learning",
    cover: projStudent,
    gallery: [projStudent],
    problem:
      "Institutions notice at-risk students far too late — usually after the results are already out.",
    solution:
      "A regression and classification pipeline that predicts final scores from study habits, attendance and prior performance, surfacing at-risk students early.",
    features: [
      "Exploratory data analysis with pandas and seaborn",
      "Feature engineering on attendance and study hours",
      "Linear regression + random forest comparison",
      "Cross-validated evaluation with confusion matrix",
      "Explainable feature-importance output",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    architecture:
      "CSV ingestion → cleaning and encoding → train/test split → model zoo (LinearRegression, RandomForest, GradientBoosting) → cross-validation → serialized best model.",
    timeline: "6 weeks",
    challenges: ["Imbalanced grade bands", "Correlated features inflating importance"],
    results: [
      "R² of 0.87 on the held-out set",
      "At-risk classification recall of 0.91",
    ],
    metrics: [
      { label: "R² score", value: "0.87" },
      { label: "Recall", value: "0.91" },
      { label: "Features", value: "18" },
    ],
    links: {
      github: "https://github.com/chiragdixit13/Student-Performance-Prediction-ML",
      demo: "",
      caseStudy: "",
    },
  },
  {
    slug: "house-price",
    title: "House Price Prediction",
    subtitle: "Regression modelling on real estate data",
    cover: projHouse,
    gallery: [projHouse],
    problem:
      "Property pricing is guesswork without a model that weighs location, size and condition together.",
    solution:
      "An end-to-end regression pipeline that predicts sale prices and explains which features drive them, wrapped in a simple prediction interface.",
    features: [
      "Outlier handling and skew correction",
      "One-hot and ordinal encoding pipeline",
      "Ridge / Lasso / Gradient Boosting comparison",
      "Feature importance visualisation",
      "Interactive prediction form",
    ],
    stack: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Streamlit"],
    architecture:
      "Data loader → sklearn Pipeline (impute → encode → scale) → model selection via GridSearchCV → persisted estimator → thin prediction UI.",
    timeline: "4 weeks",
    challenges: ["Heavy right-skew in prices", "Leakage from post-sale features"],
    results: ["RMSE reduced 31% over baseline", "Top-5 drivers identified for pricing strategy"],
    metrics: [
      { label: "RMSE ↓", value: "31%" },
      { label: "R² score", value: "0.89" },
      { label: "Models", value: "5" },
    ],
    links: {
      github: "https://github.com/chiragdixit13/House-Price-Prediction",
      demo: "",
      caseStudy: "",
    },
  },
  {
    slug: "ai-next",
    title: "Generative AI Lab (in progress)",
    subtitle: "RAG assistants and LLM tooling",
    cover: projStudent,
    gallery: [projStudent],
    problem: "Teams drown in internal documents that no one can search meaningfully.",
    solution:
      "A retrieval-augmented assistant that embeds internal docs, retrieves relevant context and answers with citations.",
    features: [
      "Document chunking and embedding store",
      "Hybrid keyword + vector retrieval",
      "Citation-backed answers",
      "Streaming chat interface",
    ],
    stack: ["Python", "LangChain", "Vector DB", "Next.js"],
    architecture: "Ingest → chunk → embed → vector store → retriever → LLM with citations → UI.",
    timeline: "Ongoing",
    challenges: ["Chunking strategy for mixed formats", "Grounding answers to reduce drift"],
    results: ["Prototype answering across 500+ pages"],
    metrics: [
      { label: "Docs", value: "500+" },
      { label: "Status", value: "WIP" },
    ],
    links: { github: "https://github.com/chiragdixit", demo: "", caseStudy: "" },
  },
];

export const experience = [
  {
    role: "MERN Full Stack Developer Intern",
    company: "Vital Skills × Techkriti, IIT Kanpur",
    duration: "June — July 2025",
    logo: certMern,
    responsibilities: [
      "Built full stack features across MongoDB, Express, React and Node",
      "Implemented authentication, REST APIs and responsive interfaces",
      "Collaborated through Git-based review workflows",
    ],
    achievements: ["Shipped a complete MERN application during the programme"],
  },
  {
    role: "Java Programming Intern",
    company: "Vital Skills × Techkriti, IIT Kanpur",
    duration: "June — July 2025",
    logo: certJava,
    responsibilities: [
      "Applied OOP principles, collections and exception handling",
      "Solved algorithmic problem sets in core Java",
      "Built console applications with layered design",
    ],
    achievements: ["Certified for active participation and project delivery"],
  },
];

export const certificates = [
  {
    title: "GenAI Powered Data Analytics Job Simulation",
    org: "Tata · Forage",
    date: "June 2026",
    image: certTata,
    file: certTata,
    type: "image" as const,
  },
  {
    title: "MERN Full Stack Web Developer",
    org: "Vital Skills × Techkriti, IIT Kanpur",
    date: "June — July 2025",
    image: certMern,
    file: certMern,
    type: "image" as const,
  },
  {
    title: "JAVA Programming",
    org: "Vital Skills × Techkriti, IIT Kanpur",
    date: "June — July 2025",
    image: certJava,
    file: certJava,
    type: "image" as const,
  },
];

export const gitaQuotes = [
  {
    sanskrit: "Yogah Karmasu Kaushalam.",
    meaning: "Excellence in action is Yoga.",
    chapter: "Bhagavad Gita 2.50",
  },
  {
    sanskrit: "Karmanye Vadhikaraste Ma Phaleshu Kadachana.",
    meaning: "Focus on your actions, never on the fruits of them.",
    chapter: "Bhagavad Gita 2.47",
  },
  {
    sanskrit: "Uddhared Atmanatmanam.",
    meaning: "Lift yourself by your own efforts.",
    chapter: "Bhagavad Gita 6.5",
  },
  {
    sanskrit: "Shraddhavan Labhate Jnanam.",
    meaning: "The one with faith and focus attains knowledge.",
    chapter: "Bhagavad Gita 4.39",
  },
];

export const krishnaArt = krishna;

export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "github", label: "GitHub" },
  { id: "inspiration", label: "Inspiration" },
  { id: "contact", label: "Contact" },
];

export const tourScript: Record<string, string> = {
  hero: `Welcome. This is the portfolio of ${profile.name}, an AI and Machine Learning Engineer who also builds modern full stack software. His work focuses on turning data into intelligent products that people can actually use.`,
  about: `Chirag is a Computer Science Engineering graduate with a CGPA of 8.0. He works across the whole arc of a problem: framing it, cleaning the data, training the model, and shipping the interface around it.`,
  skills: `His technical toolkit spans Python, Java, JavaScript and SQL for programming; scikit-learn, NumPy, Pandas, Matplotlib and Seaborn for machine learning; React, Next.js and Tailwind for the web; and MySQL and Firebase for data.`,
  education: `He completed his Bachelor of Technology in Computer Science Engineering with a CGPA of 8.0, after a science stream in senior secondary, specialising in artificial intelligence and machine learning.`,
  projects: `His flagship projects include an SOS Emergency Web App with real-time alerting, a Student Performance Prediction model with an R squared of 0.87, and a House Price Prediction pipeline that cut error by thirty one percent.`,
  experience: `Chirag has completed internships in generative AI data analytics with Tata through Forage, MERN full stack development, and Java programming with Techkriti at I I T Kanpur.`,
  certificates: `His certifications cover generative AI powered data analytics, full stack MERN development, and Java programming — each one verifiable and viewable right here.`,
  github: `On GitHub you can explore his repositories, contribution activity and the languages he works in most, from Python notebooks to production React applications.`,
  inspiration: `He draws focus from the Bhagavad Gita — excellence in action, without attachment to the outcome.`,
  contact: `If you're hiring for AI, machine learning, backend or full stack roles, Chirag is open to opportunities. Reach out through the contact form, email, LinkedIn or GitHub. Thank you for taking the tour.`,
};

export const assistantKnowledge: { q: string; keys: string[]; a: string }[] = [
  {
    q: "Tell me about Chirag",
    keys: ["about", "who", "chirag", "yourself", "intro"],
    a: `${profile.name} is an AI/ML Engineer and Software Engineer. ${profile.intro[0]} He holds a B.Tech in Computer Science Engineering with an 8.0 CGPA and is open to AI, ML, backend and full stack roles.`,
  },
  {
    q: "Show Projects",
    keys: ["project", "portfolio work", "built"],
    a: "Key projects: 1) SOS Emergency Web App — one-tap real-time alerting on React + Firebase. 2) Student Performance Prediction — scikit-learn models reaching R² 0.87. 3) House Price Prediction — regression pipeline cutting RMSE by 31%. 4) A generative AI lab building retrieval-augmented assistants.",
  },
  {
    q: "Show Skills",
    keys: ["skill", "tech", "stack", "tools"],
    a: "Programming: Python, Java, JavaScript, SQL. ML: scikit-learn, NumPy, Pandas, Matplotlib, Seaborn. Web: React, Next.js, HTML, CSS, Tailwind, Firebase, Git/GitHub. Databases: MySQL, Firebase.",
  },
  {
    q: "Tell me about SOS Emergency App",
    keys: ["sos", "emergency"],
    a: "The SOS Emergency Web App sends a one-tap alert with live geolocation to trusted contacts. Built with React, Firebase Auth, Firestore realtime listeners and Cloud Functions. Alerts land in under 2 seconds, with idempotent writes preventing duplicates on flaky networks.",
  },
  {
    q: "Tell me about Student Performance Prediction",
    keys: ["student", "performance", "prediction"],
    a: "Student Performance Prediction is a supervised learning pipeline over attendance, study hours and prior scores. Linear Regression, Random Forest and Gradient Boosting were compared with cross-validation; the best model reached R² 0.87 and 0.91 recall on at-risk students.",
  },
  {
    q: "Show Experience",
    keys: ["experience", "internship", "work"],
    a: "Three internships: GenAI Data Analytics with Tata via Forage (EDA, delinquency prediction, AI-driven collections strategy), MERN Full Stack Development with Vital Skills × Techkriti IIT Kanpur, and Java Programming with the same programme.",
  },
  {
    q: "Education",
    keys: ["education", "college", "degree", "cgpa", "university"],
    a: "B.Tech in Computer Science Engineering from Maharshi Dayanand University, Rohtak (2021–2025) with an 8.0 CGPA, after senior secondary science with J&K Board of School Education at 96.4%.",
  },
  {
    q: "Download Resume",
    keys: ["resume", "cv", "download"],
    a: "You can view or download the resume from the Resume buttons in the hero and about sections — it opens in an in-page viewer with a download option.",
  },
  {
    q: "Contact",
    keys: ["contact", "email", "hire", "reach", "linkedin"],
    a: `Email ${profile.email}, or use the contact form at the bottom of the page. He's also on GitHub and LinkedIn — all links are in the contact section.`,
  },
  {
    q: "Career Goals",
    keys: ["goal", "career", "future", "looking"],
    a: "Chirag is targeting AI Engineer, Machine Learning Engineer, Software Engineer, Backend Engineer and Full Stack Developer roles — ideally where research-grade modelling meets shipping real products.",
  },
];
