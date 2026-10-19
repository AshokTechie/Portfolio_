export const portfolioData = {
  identity: {
    name: "Ashok H",
    initials: "AH",
    title: "Software Engineer",
    roleSubtitle: "Angular 20 • Python (Flask) • Azure AKS • Cloud Microservices • Real-Time Telemetry",
    tagline: "Proactive and detail-oriented Software Engineer with hands-on enterprise experience in developing responsive web applications and scalable microservices. Proficient in Angular 20, TypeScript, Python (Flask), and Azure cloud infrastructure (AKS, Cosmos DB).",
    currentRole: "Software Engineer @ ConnectSecure",
    location: "Bengaluru, Karnataka, India",
    email: "ashok.anjinappa@campusuvce.in",
    phone: "+91 9741854203",
    github: "https://github.com/AshokTechie",
    githubUsername: "AshokTechie",
    linkedin: "https://linkedin.com/in/ashok-h-75a0b82a9",
    statusBadge: "Available for Software Engineering Roles",
    timezone: "Asia/Kolkata",
  },

  metrics: [
    {
      label: "BPCL Outlets Monitored",
      value: "Hundreds",
      subtext: "Live CNG dispenser sales, line pressures & MFM telemetry across ROs",
      category: "Enterprise Scale",
    },
    {
      label: "Live Alert Streaming",
      value: "<1s",
      subtext: "Sub-second emergency shutdown & geospatial alerts via WebSockets",
      category: "Real-Time Systems",
    },
    {
      label: "Gas Reconciliation",
      value: "100%",
      subtext: "Automated kg, SCM, MMBTU conversions & ≤90% / ≥110% penalty guardrails",
      category: "Cloud Systems",
    },
    {
      label: "RAG Retrieval Latency",
      value: "sub-200ms",
      subtext: "Semantic similarity search on 50+ indexed documents in Qdrant",
      category: "AI Systems",
    },
    {
      label: "Evaluation Accuracy",
      value: "95%+",
      subtext: "Automated evaluation workflows covering 20+ benchmark test scenarios",
      category: "AI Precision",
    },
    {
      label: "Academic Distinction",
      value: "8.76",
      subtext: "UVCE B.Tech in Electronics & Communication Engineering CGPA",
      category: "Academic Honours",
    },
  ],

  experiences: [
    {
      id: "connectsecure",
      role: "Software Engineer",
      employmentType: "Full-time",
      company: "ConnectSecure",
      location: "Bengaluru, Karnataka (On-site)",
      period: "Feb 2026 — Present",
      isCurrent: true,
      bullets: [
        "Architected scalable real-time monitoring dashboards using Angular 20, PrimeNG, and ApexCharts to track City Gas Distribution (CGD) operations, visualizing live CNG dispenser sales, line pressures, and mass flow meter (MFM) telemetry across hundreds of BPCL Retail Outlets (ROs).",
        "Integrated WebSockets and optimized Angular change-detection, enabling live geospatial alert streaming while eliminating UI thread blocking and screen freeze during high-frequency telemetry bursts and modal dialog interactions.",
        "Implemented IoT router and telemetry rule engine microservices in Python, ingesting raw Modbus register payloads, accurately resolving Retail Outlet IDs (ROIDs), and automating safety threshold and emergency shutdown alerts.",
        "Developed the Station-level Gas Reconciliation & Custody Transfer Billing Engine, automating multi-unit volume conversions (kg, SCM, MMBTU), flagging custody imbalance penalty breaches (≤90% / ≥110%), and generating provisional billing PDF statements.",
        "Designed dynamic administrative tooling, including high-performance searchable autocomplete filters for retail outlets, custom date-range analytical queries, and interactive Modbus register mapping interfaces for rapid device onboarding.",
        "Collaborated on containerized CI/CD deployments using Docker and Azure DevOps pipelines, ensuring automated, zero-downtime releases across multi-cluster Azure Kubernetes Service (AKS) environments (DEV, QA, PROD)."
      ],
      technologies: [
        "Angular 20",
        "TypeScript",
        "Python (Flask)",
        "Azure Kubernetes Service (AKS)",
        "Azure Cosmos DB",
        "WebSockets (Flask-SocketIO)",
        "ApexCharts",
        "PrimeNG",
        "Microservices Architecture",
        "Docker",
        "Azure DevOps (CI/CD)"
      ]
    }
  ],

  education: [
    {
      institution: "University of Visvesvaraya College of Engineering (UVCE)",
      degree: "B.Tech – Electronics & Communication Engineering",
      period: "2022 — 2026",
      score: "CGPA: 8.76 / 10",
      location: "Bengaluru, India",
      coursework: [
        "Object Oriented Programming",
        "Computer Networks",
        "Data Structures & Algorithms",
        "Operating Systems"
      ]
    }
  ],

  projects: [
    {
      id: "agentic-rag-pipeline",
      title: "Conversational AI Agent – Agentic RAG System",
      role: "Developer",
      category: "Conversational AI & Agentic Systems",
      badge: "Flagship Project",
      roleTarget: "ai",
      summary: "Production-grade conversational AI agent with multi-step reasoning, cyclic state graph routing, vector retrieval in Qdrant, and grounded Gemini response generation with speech I/O.",
      bullets: [
        "Built a system that takes a goal (answer a question about a PDF), breaks it into steps (retrieve relevant chunks, reason over context, synthesize answer), and recovers gracefully when a retrieval step returns poor results.",
        "Designed a LangGraph agentic pipeline with conditional routing, state management, and 5 decoupled nodes – ingestion, chunking, embedding, retrieval, and generation – each independently testable and replaceable.",
        "Implemented document chunking and HuggingFace embedding generation; stored vectors in Qdrant for semantic similarity search, achieving sub-200ms retrieval latency on 50+ indexed documents.",
        "Connected Gemini API for grounded response generation with prompt engineering and output validation; added speech recognition and synthesis for full voice I/O workflow.",
        "Built automated evaluation workflows covering 20+ test scenarios; measured retrieval accuracy and response quality against benchmark sets, achieving 95%+ accuracy – iterated prompts based on results.",
        "Shipped a working end-to-end agentic application with observable pipeline stages, structured error handling, and measurable quality metrics, including AI products and data-heavy backends."
      ],
      technologies: ["Python", "LangChain", "LangGraph", "Qdrant", "HuggingFace", "Gemini API"],
      githubUrl: "https://github.com/AshokTechie",
      metrics: [
        "Sub-200ms retrieval latency on 50+ indexed documents",
        "95%+ accuracy across 20+ benchmark evaluation scenarios",
        "5 decoupled pipeline nodes with self-correcting conditional routing"
      ]
    },
    {
      id: "bpcl-cgd-platform",
      title: "BPCL City Gas Distribution (CGD) Enterprise Platform",
      role: "Software Engineer",
      category: "Enterprise Cloud & Real-Time Telemetry",
      badge: "Production Platform",
      roleTarget: "software",
      summary: "Centralized real-time monitoring and gas reconciliation platform tracking hundreds of BPCL retail outlets with live WebSockets, GIS visualizations, and automated billing PDF statements.",
      bullets: [
        "Architected scalable real-time monitoring dashboards using Angular 20, PrimeNG, and ApexCharts to track City Gas Distribution operations across hundreds of BPCL Retail Outlets.",
        "Integrated WebSockets and optimized Angular change-detection, enabling live geospatial alert streaming without UI thread blocking.",
        "Implemented IoT router and telemetry rule engine microservices in Python (Flask) on Azure AKS, processing Modbus register payloads and automating safety alerts.",
        "Developed Station-level Gas Reconciliation & Custody Transfer Billing Engine, calculating volume conversions (kg, SCM, MMBTU) and flagging imbalance penalty breaches (≤90% / ≥110%).",
        "Designed dynamic administrative tooling with high-performance searchable autocomplete filters and date-range analytical queries.",
        "Containerized with Docker and deployed via Azure DevOps CI/CD pipelines to multi-cluster Azure Kubernetes Service (AKS) environments."
      ],
      technologies: ["Angular 20", "TypeScript", "Python (Flask)", "Azure AKS", "Azure Cosmos DB", "WebSockets (Flask-SocketIO)", "ApexCharts", "PrimeNG", "Docker", "Azure DevOps"],
      githubUrl: "https://github.com/AshokTechie",
      metrics: [
        "Hundreds of BPCL Retail Outlets monitored in real-time",
        "<1s WebSocket streaming latency for emergency shutdown alerts",
        "100% automated daily gas volume reconciliation (kg, SCM, MMBTU)"
      ]
    },
    {
      id: "smart-agriculture-ml",
      title: "Smart Agriculture ML System",
      role: "Developer",
      category: "ML & Cloud Analytics",
      badge: "Competition Winner",
      roleTarget: "ml",
      summary: "End-to-end predictive analytics system deploying Python ML models on GCP with live IoT sensor streaming and mobile inference delivery.",
      bullets: [
        "Built and deployed Python ML models on GCP for predictive analytics on real agricultural sensor data, achieving 85%+ prediction accuracy on held-out validation sets.",
        "Designed the full data pipeline: ESP32 sensor collection → REST API ingestion → Firebase time-series store → GCP inference → mobile delivery, processing 100+ readings/minute with zero data loss.",
        "Compared model approaches and tuned for accuracy vs. latency trade-offs; integrated model outputs via REST API with sub-2 second end-to-end latency under live competition load."
      ],
      technologies: ["Python", "GCP", "Firebase", "ESP32"],
      githubUrl: "https://github.com/AshokTechie",
      metrics: [
        "85%+ prediction accuracy on held-out validation sets",
        "100+ readings/minute processed with zero data loss",
        "Sub-2 second end-to-end inference latency under live load"
      ]
    },
    {
      id: "car-rental-platform",
      title: "Car Rental Platform",
      role: "Developer",
      category: "Full-Stack Web Development",
      badge: "REST Backend",
      roleTarget: "web",
      summary: "Modular REST API backend with 12+ endpoints, JWT authentication, role-based access control, and Docker containerization.",
      bullets: [
        "Designed a modular REST API backend with 12+ endpoints, JWT authentication, role-based access control, and structured error handling and logging throughout.",
        "Built to be readable and maintainable by other engineers with full technical documentation.",
        "Managed codebase with Git across structured feature branches and containerized with Docker – zero defects post-deployment."
      ],
      technologies: ["Python", "Node.js", "Express.js", "React.js", "MongoDB", "Docker"],
      githubUrl: "https://github.com/AshokTechie",
      metrics: [
        "12+ modular REST API endpoints with JWT & RBAC security",
        "Zero post-deployment defects",
        "Fully containerized with Docker"
      ]
    }
  ],

  skills: {
    databases: ["Azure Cosmos DB", "Qdrant", "MongoDB", "MySQL", "Firebase"],
    frameworksAndLibraries: ["Angular", "Flask", "LangChain", "LangGraph", "React", "Node.js", "Express", "FastAPI", "Tailwind CSS"],
    coursework: ["Object Oriented Programming", "Computer Networks", "Data Structures & Algorithms", "Operating Systems"],
    programmingLanguages: ["Python", "TypeScript", "JavaScript", "C", "C++", "Java", "SQL"],
    toolsAndPlatforms: ["Azure Kubernetes Service (AKS)", "Azure IoT", "GCP", "Docker", "Linux", "Postman", "GitHub", "CI/CD", "Kubernetes"],
    softSkills: ["Teamwork", "Communication", "Decision Making", "Problem Solving", "Adaptability"]
  },

  awardsAndAchievements: [
    {
      title: "End-to-End AI Competition Deployment",
      description: "Shipped an end-to-end AI system with real sensor data and deployed ML models under live competition conditions with zero data loss."
    }
  ],

  resumes: [
    {
      id: "software",
      title: "Ashok H — Software Engineer Resume (Single Source of Truth)",
      tag: "Verified Enterprise Resume",
      focus: "Angular 20, Python (Flask), Azure AKS, Cosmos DB, WebSockets, Docker, CI/CD, Agentic RAG",
      filename: "Ashok_H_Software_Engineer_Resume.pdf",
      fileUrl: "/resumes/Ashok_H_Software_Engineer_Resume.pdf"
    }
  ]
};
