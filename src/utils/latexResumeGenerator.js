// Single Source of Truth Resume Generator for Ashok H
import { portfolioData } from '../data/portfolioData.js';
import { jsPDF } from 'jspdf';

// Helper to escape LaTeX special characters
export const escapeLatex = (str) => {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/([&%$#_{}])/g, '\\$1')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');
};

export const getTailoredResumeData = () => {
  return {
    roleKey: 'software',
    roleTitle: 'Software Engineer',
    name: 'Ashok H',
    phone: '9741854203',
    email: 'ashok.anjinappa@campusuvce.in',
    linkedin: 'ashok-h-75a0b82a9',
    github: 'AshokTechie',
    location: 'Bengaluru, India',
    summary: 'Proactive and detail-oriented Software Engineer with hands-on enterprise experience in developing responsive web applications and scalable microservices. Proficient in Angular 20, TypeScript, Python (Flask), and Azure cloud infrastructure (AKS, Cosmos DB). Proven ability in building real-time IoT monitoring dashboards, processing telemetry data, and optimizing frontend performance, with strong problem-solving skills across the full software development lifecycle, from UI design to containerized CI/CD deployments.',
    experience: [
      {
        role: 'Software Engineer',
        employmentType: 'Full-time',
        company: 'ConnectSecure',
        period: 'Feb 2026 - Present',
        location: 'On-site • Bengaluru, Karnataka',
        bullets: [
          'Architected scalable real-time monitoring dashboards using Angular 20, PrimeNG, and ApexCharts to track City Gas Distribution (CGD) operations, visualizing live CNG dispenser sales, line pressures, and mass flow meter (MFM) telemetry across hundreds of BPCL Retail Outlets (ROs).',
          'Integrated WebSockets and optimized Angular change-detection, enabling live geospatial alert streaming while eliminating UI thread blocking and screen freeze during high-frequency telemetry bursts and modal dialog interactions.',
          'Implemented IoT router and telemetry rule engine microservices in Python, ingesting raw Modbus register payloads, accurately resolving Retail Outlet IDs (ROIDs), and automating safety threshold and emergency shutdown alerts.',
          'Developed the Station-level Gas Reconciliation & Custody Transfer Billing Engine, automating multi-unit volume conversions (kg, SCM, MMBTU), flagging custody imbalance penalty breaches (≤90% / ≥110%), and generating provisional billing PDF statements.',
          'Designed dynamic administrative tooling, including high-performance searchable autocomplete filters for retail outlets, custom date-range analytical queries, and interactive Modbus register mapping interfaces for rapid device onboarding.',
          'Collaborated on containerized CI/CD deployments using Docker and Azure DevOps pipelines, ensuring automated, zero-downtime releases across multi-cluster Azure Kubernetes Service (AKS) environments (DEV, QA, PROD).'
        ],
        technologies: 'Angular 20, TypeScript, Python (Flask), Azure Kubernetes Service (AKS), Azure Cosmos DB, WebSockets (Flask-SocketIO), ApexCharts, PrimeNG, Microservices Architecture, Docker, Azure DevOps (CI/CD)'
      }
    ],
    education: {
      institution: 'University of Visvesvaraya College of Engineering (UVCE)',
      location: 'Bengaluru, India',
      degree: 'B.Tech – Electronics & Communication Engineering',
      period: '2022 - 2026',
      cgpa: '8.76'
    },
    projects: [
      {
        title: 'Conversational AI Agent – Agentic RAG System',
        role: 'Developer',
        bullets: [
          'Built a system that takes a goal (answer a question about a PDF), breaks it into steps (retrieve relevant chunks, reason over context, synthesize answer), and recovers gracefully when a retrieval step returns poor results.',
          'Designed a LangGraph agentic pipeline with conditional routing, state management, and 5 decoupled nodes – ingestion, chunking, embedding, retrieval, and generation – each independently testable and replaceable.',
          'Implemented document chunking and HuggingFace embedding generation; stored vectors in Qdrant for semantic similarity search, achieving sub-200ms retrieval latency on 50+ indexed documents.',
          'Connected Gemini API for grounded response generation with prompt engineering and output validation; added speech recognition and synthesis for full voice I/O workflow.',
          'Built automated evaluation workflows covering 20+ test scenarios; measured retrieval accuracy and response quality against benchmark sets, achieving 95%+ accuracy – iterated prompts based on results.',
          'Shipped a working end-to-end agentic application with observable pipeline stages, structured error handling, and measurable quality metrics, including AI products and data-heavy backends.'
        ],
        technologies: 'Python, LangChain, LangGraph, Qdrant, HuggingFace, Gemini API'
      },
      {
        title: 'Smart Agriculture ML System',
        role: 'Developer',
        bullets: [
          'Built and deployed Python ML models on GCP for predictive analytics on real agricultural sensor data, achieving 85%+ prediction accuracy on held-out validation sets.',
          'Designed the full data pipeline: ESP32 sensor collection → REST API ingestion → Firebase time-series store → GCP inference → mobile delivery, processing 100+ readings/minute with zero data loss.',
          'Compared model approaches and tuned for accuracy vs. latency trade-offs; integrated model outputs via REST API with sub-2 second end-to-end latency under live competition load.'
        ],
        technologies: 'Python, GCP, Firebase, ESP32'
      },
      {
        title: 'Car Rental Platform',
        role: 'Developer',
        bullets: [
          'Designed a modular REST API backend with 12+ endpoints, JWT authentication, role-based access control, and structured error handling and logging throughout – built to be readable and maintainable by other engineers.',
          'Managed codebase with Git across structured feature branches; containerised with Docker; maintained full technical documentation – zero defects post-deployment.'
        ],
        technologies: 'Python, Node.js, Express.js, React.js, MongoDB, Docker'
      }
    ],
    skills: [
      { label: 'Databases', value: 'Azure Cosmos DB, Qdrant, MongoDB, MySQL, Firebase' },
      { label: 'Frameworks & Libraries', value: 'LangChain, LangGraph, Node.js, Express, React, FastAPI, Tailwind CSS, Angular, Flask' },
      { label: 'Coursework', value: 'Object Oriented Programming, Computer Networks, Data Structures & Algorithms, Operating Systems' },
      { label: 'Programming Languages', value: 'Python, JavaScript, C, C++, Java, SQL' },
      { label: 'Soft Skills', value: 'Teamwork, Communication, Decision Making, Problem Solving, Adaptability' },
      { label: 'Tools & Platforms', value: 'GCP, Azure IoT, Git, Docker, Linux, Postman, GitHub, CI/CD, Kubernetes' }
    ],
    awardsAndAchievements: [
      'Shipped an end-to-end AI system with real sensor data and deployed ML models under competition conditions.'
    ]
  };
};

// Generates Overleaf / Jake's Resume compliant LaTeX source code (.tex)
export const generateLatexSource = () => {
  const d = getTailoredResumeData();

  return `%-------------------------
% Resume in LaTeX — Single Source of Truth
% Candidate: ${d.name}
% Role: ${d.roleTitle}
%-------------------------

\\documentclass[letterpaper,10pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.0in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape ${escapeLatex(d.name)}} \\\\ \\vspace{3pt}
    \\small ${escapeLatex(d.phone)} $|$ 
    \\href{mailto:${d.email}}{\\underline{${escapeLatex(d.email)}}} $|$ 
    \\href{https://linkedin.com/in/${d.linkedin}}{\\underline{${escapeLatex(d.linkedin)}}} $|$ 
    \\href{https://github.com/${d.github}}{\\underline{${escapeLatex(d.github)}}} $|$ 
    \\small ${escapeLatex(d.location)}
\\end{center}

%-----------PROFESSIONAL SUMMARY-----------
\\section{Professional Summary}
\\small{${escapeLatex(d.summary)}}

%-----------WORK EXPERIENCE-----------
\\section{Work Experience}
  \\resumeSubHeadingListStart
${d.experience.map(exp => `    \\resumeSubheading
      {${escapeLatex(exp.role)} $|$ ${escapeLatex(exp.employmentType)}}{${escapeLatex(exp.period)}}
      {${escapeLatex(exp.company)}}{${escapeLatex(exp.location)}}
      \\resumeItemListStart
${exp.bullets.map(b => `        \\resumeItem{${escapeLatex(b)}}`).join('\n')}
      \\resumeItemListEnd
      \\vspace{2pt}
      \\small{\\textbf{Technologies / Skills Used :} ${escapeLatex(exp.technologies)}}`).join('\n')}
  \\resumeSubHeadingListEnd

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {${escapeLatex(d.education.institution)}}{${escapeLatex(d.education.period)}}
      {${escapeLatex(d.education.degree)}}{CGPA : ${escapeLatex(d.education.cgpa)}}
  \\resumeSubHeadingListEnd

%-----------PROJECTS-----------
\\section{Projects}
    \\resumeSubHeadingListStart
${d.projects.map(proj => `      \\resumeProjectHeading
          {\\textbf{${escapeLatex(proj.title)}} $|$ \\emph{${escapeLatex(proj.role)}}}{}
          \\resumeItemListStart
${proj.bullets.map(b => `            \\resumeItem{${escapeLatex(b)}}`).join('\n')}
          \\resumeItemListEnd
          \\vspace{2pt}
          \\small{\\textbf{Technologies / Tools Used :} ${escapeLatex(proj.technologies)}}`).join('\n')}
    \\resumeSubHeadingListEnd

%-----------SKILLS-----------
\\section{Skills}
 \\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
${d.skills.map(s => `     \\textbf{${escapeLatex(s.label)}} : ${escapeLatex(s.value)} \\\\`).join('\n')}
    }}
 \\end{itemize}

%-----------AWARDS & ACHIEVEMENTS-----------
\\section{Awards \\& Achievements}
    \\resumeSubHeadingListStart
${d.awardsAndAchievements.map(a => `      \\resumeItem{${escapeLatex(a)}}`).join('\n')}
    \\resumeSubHeadingListEnd

\\end{document}
`;
};

// Generates clean plain-text ATS format for quick copy-paste
export const generatePlaintextATS = () => {
  const d = getTailoredResumeData();

  return `================================================================================
${d.name.toUpperCase()}
${d.phone} | ${d.email} | ${d.linkedin} | ${d.github} | ${d.location}
================================================================================

PROFESSIONAL SUMMARY
--------------------------------------------------------------------------------
${d.summary}

WORK EXPERIENCE
--------------------------------------------------------------------------------
${d.experience.map(exp => `${exp.role} | ${exp.employmentType}
${exp.company}
${exp.period} | ${exp.location}
${exp.bullets.map(b => `• ${b}`).join('\n')}
Technologies / Skills Used : ${exp.technologies}`).join('\n\n')}

EDUCATION
--------------------------------------------------------------------------------
${d.education.institution} | ${d.education.location}
${d.education.degree}
${d.education.period} | CGPA : ${d.education.cgpa}

PROJECTS
--------------------------------------------------------------------------------
${d.projects.map(proj => `${proj.title}
${proj.role}
${proj.bullets.map(b => `• ${b}`).join('\n')}
Technologies / Tools Used : ${proj.technologies}`).join('\n\n')}

SKILLS
--------------------------------------------------------------------------------
${d.skills.map(s => `${s.label} : ${s.value}`).join('\n')}

AWARDS & ACHIEVEMENTS
--------------------------------------------------------------------------------
${d.awardsAndAchievements.map(a => `• ${a}`).join('\n')}
================================================================================
`;
};

// Triggers download of .tex file in the browser
export const downloadLatexFile = () => {
  const latexContent = generateLatexSource();
  const blob = new Blob([latexContent], { type: 'text/x-tex;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Ashok_H_Software_Engineer_Resume.tex`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Native vector PDF generator using jsPDF — 100% exact replica of single source of truth resume
export const generateDirectATSResumePdf = (customFilename = 'Ashok_H_Software_Engineer_Resume.pdf') => {
  const d = getTailoredResumeData();

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const marginX = 13;
  const contentWidth = pageWidth - (marginX * 2); // 184mm
  let y = 12;

  // Header: Name
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(0, 0, 0);
  doc.text(d.name, pageWidth / 2, y, { align: 'center' });
  y += 5.5;

  // Header: Contact row
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(30, 41, 59);
  const contacts = `${d.phone}   ${d.email}   ${d.linkedin}   ${d.github}   ${d.location}`;
  doc.text(contacts, pageWidth / 2, y, { align: 'center' });
  y += 2.5;

  // Section Header Helper
  const renderSectionHeader = (title) => {
    y += 2;
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(title.toUpperCase(), marginX, y);
    y += 1.2;
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 3.5;
  };

  // 1. PROFESSIONAL SUMMARY
  renderSectionHeader('Professional Summary');
  doc.setFont('times', 'normal');
  doc.setFontSize(8.7);
  doc.setTextColor(20, 20, 20);
  const summaryLines = doc.splitTextToSize(d.summary, contentWidth);
  doc.text(summaryLines, marginX, y);
  y += (summaryLines.length * 3.6) + 1.5;

  // 2. WORK EXPERIENCE
  renderSectionHeader('Work Experience');
  d.experience.forEach(exp => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(0, 0, 0);
    doc.text(`${exp.role} | ${exp.employmentType}`, marginX, y);
    doc.setFont('times', 'normal');
    doc.setFontSize(8.8);
    doc.text(exp.period, pageWidth - marginX, y, { align: 'right' });
    y += 3.8;

    doc.setFont('times', 'italic');
    doc.setFontSize(9);
    doc.text(exp.company, marginX, y);
    doc.text(exp.location, pageWidth - marginX, y, { align: 'right' });
    y += 3.8;

    doc.setFont('times', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(25, 25, 25);
    exp.bullets.forEach(b => {
      doc.text('•', marginX + 1.5, y);
      const bLines = doc.splitTextToSize(b, contentWidth - 5.5);
      doc.text(bLines, marginX + 5, y);
      y += (bLines.length * 3.3) + 0.8;
    });

    doc.setFont('times', 'bold');
    doc.setFontSize(8.4);
    doc.text('Technologies / Skills Used :', marginX + 1.5, y);
    const labelW = doc.getTextWidth('Technologies / Skills Used :');
    doc.setFont('times', 'normal');
    doc.text(exp.technologies, marginX + 2.5 + labelW, y);
    y += 4;
  });

  // 3. EDUCATION
  renderSectionHeader('Education');
  doc.setFont('times', 'bold');
  doc.setFontSize(9.3);
  doc.setTextColor(0, 0, 0);
  doc.text(d.education.institution, marginX, y);
  doc.setFont('times', 'normal');
  doc.setFontSize(8.8);
  doc.text(d.education.period, pageWidth - marginX, y, { align: 'right' });
  y += 3.6;

  doc.setFont('times', 'italic');
  doc.setFontSize(8.8);
  doc.text(d.education.degree, marginX, y);
  doc.setFont('times', 'bold');
  doc.text(`CGPA : ${d.education.cgpa}`, pageWidth - marginX, y, { align: 'right' });
  y += 4;

  // 4. PROJECTS
  renderSectionHeader('Projects');
  d.projects.forEach(proj => {
    doc.setFont('times', 'bold');
    doc.setFontSize(9.3);
    doc.setTextColor(0, 0, 0);
    doc.text(proj.title, marginX, y);
    y += 3.4;

    doc.setFont('times', 'italic');
    doc.setFontSize(8.6);
    doc.text(proj.role, marginX, y);
    y += 3.4;

    doc.setFont('times', 'normal');
    doc.setFontSize(8.3);
    doc.setTextColor(25, 25, 25);
    proj.bullets.forEach(b => {
      doc.text('•', marginX + 1.5, y);
      const bLines = doc.splitTextToSize(b, contentWidth - 5.5);
      doc.text(bLines, marginX + 5, y);
      y += (bLines.length * 3.2) + 0.7;
    });

    doc.setFont('times', 'bold');
    doc.setFontSize(8.3);
    doc.text('Technologies / Tools Used :', marginX + 1.5, y);
    const labelW = doc.getTextWidth('Technologies / Tools Used :');
    doc.setFont('times', 'normal');
    doc.text(proj.technologies, marginX + 2.5 + labelW, y);
    y += 3.8;
  });

  // 5. SKILLS
  renderSectionHeader('Skills');
  doc.setFontSize(8.3);
  d.skills.forEach(s => {
    doc.setFont('times', 'bold');
    doc.text(`${s.label} :`, marginX, y);
    const labelW = doc.getTextWidth(`${s.label} :`);
    doc.setFont('times', 'normal');
    doc.text(s.value, marginX + labelW + 2, y);
    y += 3.4;
  });

  // 6. AWARDS & ACHIEVEMENTS
  renderSectionHeader('Awards & Achievements');
  doc.setFont('times', 'normal');
  doc.setFontSize(8.4);
  d.awardsAndAchievements.forEach(a => {
    doc.text('•', marginX + 1.5, y);
    const aLines = doc.splitTextToSize(a, contentWidth - 5.5);
    doc.text(aLines, marginX + 5, y);
    y += (aLines.length * 3.4) + 1;
  });

  doc.save(customFilename);
  return true;
};

// Print Preview function
export const printLatexResume = () => {
  const d = getTailoredResumeData();

  const existingIframe = document.getElementById('ats-print-isolated-iframe');
  if (existingIframe) existingIframe.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'ats-print-isolated-iframe';
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${d.name} - Resume</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 14mm; }
    body { font-family: 'Times New Roman', Times, serif; color: #000; font-size: 9pt; line-height: 1.35; margin: 0; padding: 0; }
    h1 { font-size: 20pt; text-align: center; margin: 0 0 2px 0; letter-spacing: 1px; }
    .contacts { text-align: center; font-size: 8.5pt; margin-bottom: 6px; }
    .section-title { font-size: 9.8pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 1px; margin: 6px 0 3px 0; }
    .flex-row { display: flex; justify-content: space-between; align-items: baseline; }
    .bold { font-weight: bold; }
    .italic { font-style: italic; }
    ul { margin: 2px 0 3px 14px; padding: 0; }
    li { margin-bottom: 1.5px; }
  </style>
</head>
<body>
  <h1>${d.name}</h1>
  <div class="contacts">${d.phone} &nbsp; ${d.email} &nbsp; ${d.linkedin} &nbsp; ${d.github} &nbsp; ${d.location}</div>

  <div class="section-title">Professional Summary</div>
  <p>${d.summary}</p>

  <div class="section-title">Work Experience</div>
  ${d.experience.map(exp => `
    <div class="flex-row">
      <span class="bold">${exp.role} | ${exp.employmentType}</span>
      <span>${exp.period}</span>
    </div>
    <div class="flex-row">
      <span class="italic">${exp.company}</span>
      <span>${exp.location}</span>
    </div>
    <ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    <p><span class="bold">Technologies / Skills Used :</span> ${exp.technologies}</p>
  `).join('')}

  <div class="section-title">Education</div>
  <div class="flex-row">
    <span class="bold">${d.education.institution}</span>
    <span>${d.education.period}</span>
  </div>
  <div class="flex-row">
    <span class="italic">${d.education.degree}</span>
    <span class="bold">CGPA : ${d.education.cgpa}</span>
  </div>

  <div class="section-title">Projects</div>
  ${d.projects.map(proj => `
    <div class="bold">${proj.title}</div>
    <div class="italic">${proj.role}</div>
    <ul>${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    <p><span class="bold">Technologies / Tools Used :</span> ${proj.technologies}</p>
  `).join('')}

  <div class="section-title">Skills</div>
  ${d.skills.map(s => `<p><span class="bold">${s.label} :</span> ${s.value}</p>`).join('')}

  <div class="section-title">Awards & Achievements</div>
  <ul>${d.awardsAndAchievements.map(a => `<li>${a}</li>`).join('')}</ul>
</body>
</html>`;

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  iframe.contentWindow.focus();
  setTimeout(() => {
    iframe.contentWindow.print();
  }, 250);
};
