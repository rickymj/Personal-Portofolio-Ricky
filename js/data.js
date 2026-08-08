/**
 * Ricky Muhammad Jufrizal - Portfolio Data Store (Dual Language)
 */

const PROFILE_EN = {
  name: "Ricky Muhammad Jufrizal",
  title: "Account Manager & Data-driven Operator",
  bio: "Account Manager with hands-on experience in B2B client relationship management, contract negotiation, and portfolio growth in the telecommunications and BPO industries, supported by over 4 years of combined professional experience in account management, data analysis, and process automation.",
  email: "ricky.mjufrizal@gmail.com",
  phone: "+62819-2423-137",
  linkedin: "https://linkedin.com/in/rickymj",
  github: "https://github.com/rickymj",
  photo: "assets/profile.jpg",
  metrics: [
    { val: "IDR 7–8B", lbl: "Portfolio Managed" },
    { val: "96–100%", lbl: "SLA Achievement" },
    { val: "700jt → 2M", lbl: "Client Revenue / Mo" },
    { val: "80%+", lbl: "Manual Work Automated" }
  ]
};

const PROFILE_ID = {
  name: "Ricky Muhammad Jufrizal",
  title: "Account Manager & Data-driven Operator",
  bio: "Account Manager dengan pengalaman langsung dalam manajemen hubungan klien B2B, negosiasi kontrak, dan pertumbuhan portofolio di industri telekomunikasi dan BPO, didukung oleh lebih dari 4 tahun total pengalaman profesional gabungan di bidang account management, analisis data, dan automasi proses.",
  email: "ricky.mjufrizal@gmail.com",
  phone: "+62819-2423-137",
  linkedin: "https://linkedin.com/in/rickymj",
  github: "https://github.com/rickymj",
  photo: "assets/profile.jpg",
  metrics: [
    { val: "IDR 7–8B", lbl: "Portofolio Dikelola" },
    { val: "96–100%", lbl: "Pencapaian SLA" },
    { val: "700jt → 2M", lbl: "Revenue Klien / Bln" },
    { val: "80%+", lbl: "Automasi Proses Manual" }
  ]
};

const EXPERIENCES_EN = [
  {
    id: "exp_1",
    company: "PT. Swakarya Insan Mandiri",
    org_suffix: "(SIMGROUP) - Jakarta",
    role: "Account Manager",
    type: "Full-time",
    department: "LOB MSM BPO",
    date: "Jan 2025 - Present",
    badges: [],
    bullets: [
      "Analyzed revenue, SLA, workforce, and account-performance data for a portfolio of approximately 1,600 outsourced personnel and contracts valued at IDR 7–8 billion.",
      "Monitored departmental KPIs and strategic initiatives to evaluate business performance, identify operational risks, and recommend corrective actions.",
      "Maintained 96%–100% SLA achievement through performance monitoring, issue analysis, and risk-mitigation planning.",
      "Translated client operational challenges into data-driven business recommendations and service-improvement initiatives.",
      "Collaborated with operations, finance, legal, and commercial teams to ensure accurate reporting and successful implementation of client solutions."
    ]
  },
  {
    id: "exp_2",
    company: "PT. Telekomunikasi Seluler",
    org_suffix: "(Telkomsel) - Bangka Belitung",
    role: "Data Analyst & Billing Collection",
    type: "Contract",
    department: "",
    date: "Jan 2021 - Dec 2024",
    badges: [],
    bullets: [
      "Extracted, cleaned, validated, and transformed approximately 3,000 work-order records per month using SQL and advanced Excel to support collection operations, capacity planning, and monthly target setting.",
      "Developed daily and monthly performance dashboards using Power BI and Excel to monitor collection achievement, agent productivity, incentives, and operational KPIs.",
      "Maintained 100% reporting accuracy by performing data validation, reconciliation, and quality checks before distributing reports to operational supervisors.",
      "Automated invoicing processes for approximately 1,000 work orders per month using UiPath and Power Automate, reducing manual processing time by more than 80%.",
      "Developed a Google Sheets-based WhatsApp notification tool to replace manual customer notification activities and improve collection process efficiency.",
      "Analyzed collection performance trends and operational variances to support supervisor decision-making and corrective action planning."
    ]
  },
  {
    id: "exp_3",
    company: "RPA (Robotic Process Automation) Community Indonesia",
    org_suffix: "- Jakarta",
    role: "Administrator & Moderator",
    type: "Part-Time",
    department: "",
    date: "Jan 2021 - Dec 2021",
    badges: [],
    bullets: [
      "Organized webinars and virtual events covering robotic process automation topics.",
      "Moderated technical discussions, coordinated speakers, and summarized key webinar insights for community members."
    ]
  },
  {
    id: "exp_4",
    company: "PT. Tiki Jalur Nugraha Ekakurir",
    org_suffix: "(JNE) - Pangkalpinang",
    role: "Admin Checker",
    type: "Contract",
    department: "",
    date: "Sep 2021 - Dec 2021",
    badges: [],
    bullets: [
      "Entered shipment data into internal systems for courier distribution.",
      "Categorized and assigned approximately 1,000 packages based on courier delivery areas.",
      "Maintained accurate shipment records across multiple client systems."
    ]
  },
  {
    id: "exp_5",
    company: "Koperasi Mahasiswa (Kopma) Telkom",
    org_suffix: "- Bandung",
    role: "Shop Manager",
    type: "Contract",
    department: "",
    date: "Jan 2015 - Dec 2016",
    badges: [],
    bullets: [
      "Managed daily store operations, product availability, inventory reconciliation, and supplier replenishment.",
      "Recruited and coordinated minimarket staff to ensure continuity of operations.",
      "Analyzed monthly sales and inventory performance against an annual revenue target of IDR 2 billion."
    ]
  }
];

const EXPERIENCES_ID = [
  {
    id: "exp_1",
    company: "PT. Swakarya Insan Mandiri",
    org_suffix: "(SIMGROUP) – Jakarta",
    role: "Account Manager",
    type: "Full-time",
    department: "LOB MSM BPO",
    date: "Jan 2025 – Present",
    badges: [],
    bullets: [
      "Menganalisis data revenue, SLA, tenaga kerja, dan performa akun untuk portofolio sekitar 1.600 tenaga kerja outsourcing dan kontrak senilai IDR 7–8 miliar.",
      "Memantau KPI departemen dan inisiatif strategis untuk mengevaluasi performa bisnis, mengidentifikasi risiko operasional, dan merekomendasikan tindakan korektif.",
      "Menjaga pencapaian SLA 96%–100% melalui pemantauan performa, analisis masalah, dan perencanaan mitigasi risiko.",
      "Menerjemahkan tantangan operasional klien menjadi rekomendasi bisnis berbasis data dan inisiatif peningkatan layanan.",
      "Berkolaborasi dengan tim operasional, keuangan, legal, dan komersial untuk memastikan pelaporan yang akurat dan implementasi solusi klien yang berhasil."
    ]
  },
  {
    id: "exp_2",
    company: "PT. Telekomunikasi Seluler",
    org_suffix: "(Telkomsel) – Bangka Belitung",
    role: "Data Analyst & Billing Collection",
    type: "Contract",
    department: "",
    date: "Jan 2021 – Dec 2024",
    badges: [],
    bullets: [
      "Mengekstraksi, membersihkan, memvalidasi, dan mentransformasi sekitar 3.000 data Work Order per bulan menggunakan SQL dan Excel tingkat lanjut untuk mendukung operasional collection, capacity planning, dan penetapan target bulanan.",
      "Mengembangkan dashboard performa harian dan bulanan menggunakan Power BI dan Excel untuk memantau pencapaian collection, produktivitas agen, insentif, dan KPI operasional.",
      "Menjaga akurasi pelaporan 100% dengan melakukan validasi data, rekonsiliasi, dan pengecekan kualitas sebelum laporan didistribusikan ke supervisor operasional.",
      "Mengotomasi proses invoicing untuk sekitar 1.000 Work Order per bulan menggunakan UiPath dan Power Automate, mengurangi waktu pemrosesan manual lebih dari 80%.",
      "Mengembangkan tools notifikasi WhatsApp berbasis Google Sheets untuk menggantikan aktivitas notifikasi pelanggan secara manual dan meningkatkan efisiensi proses collection.",
      "Menganalisis tren performa collection dan variansi operasional untuk mendukung pengambilan keputusan supervisor dan perencanaan tindakan korektif."
    ]
  },
  {
    id: "exp_3",
    company: "RPA (Robotic Process Automation) Community Indonesia",
    org_suffix: "– Jakarta",
    role: "Administrator & Moderator",
    type: "Part-Time",
    department: "",
    date: "Jan 2021 – Dec 2021",
    badges: [],
    bullets: [
      "Menyelenggarakan webinar dan acara virtual seputar topik robotic process automation.",
      "Memoderasi diskusi teknis, mengoordinasikan pembicara, dan merangkum insight utama webinar untuk anggota komunitas."
    ]
  },
  {
    id: "exp_4",
    company: "PT. Tiki Jalur Nugraha Ekakurir",
    org_suffix: "(JNE) – Pangkalpinang",
    role: "Admin Checker",
    type: "Contract",
    department: "",
    date: "Sep 2021 – Dec 2021",
    badges: [],
    bullets: [
      "Menginput data pengiriman ke sistem internal untuk distribusi kurir.",
      "Mengategorikan dan menugaskan sekitar 1.000 paket berdasarkan area pengiriman kurir.",
      "Menjaga keakuratan data pengiriman di berbagai sistem klien."
    ]
  },
  {
    id: "exp_5",
    company: "Koperasi Mahasiswa (Kopma) Telkom",
    org_suffix: "– Bandung",
    role: "Shop Manager",
    type: "Contract",
    department: "",
    date: "Jan 2015 – Dec 2016",
    badges: [],
    bullets: [
      "Mengelola operasional toko harian, ketersediaan produk, rekonsiliasi inventaris, dan pengadaan dari supplier.",
      "Merekrut dan mengoordinasikan staf minimarket untuk memastikan kelangsungan operasional.",
      "Menganalisis performa penjualan dan inventaris bulanan terhadap target revenue tahunan sebesar IDR 2 miliar."
    ]
  }
];

const PROJECTS_EN = [
  {
    id: "proj_1",
    title: "Indonesian Journal Abstract Classification",
    tags: ["Python", "Naive Bayes", "Natural Language Processing", "POS Tagging"],
    bullets: [
      "Developed a machine learning model to classify Indonesian-language journal abstracts using the Naive Bayes algorithm and Indonesian POS Tagging features.",
      "Performed text preprocessing, feature extraction, model training, and performance evaluation using Python.",
      "Evaluated model performance using accuracy, precision, recall, F1-score, and confusion matrix.",
      "Achieved an accuracy of 96% using a dataset containing 465 journal abstracts."
    ]
  },
  {
    id: "proj_2",
    title: "TPISurvey_BOT",
    tags: ["Python", "Telegram Bot API", "Google Sheets API"],
    bullets: [
      "Developed a Telegram Bot to retrieve and present information from a database containing more than 40,000 records.",
      "Implemented query logic and Google Maps integration to support field-surveyor activities.",
      "Improved accessibility of survey information and reduced manual data-search activities."
    ]
  },
  {
    id: "proj_3",
    title: "CheckOrder_BOT",
    tags: ["Python", "Telegram Bot API", "Google Sheets API"],
    bullets: [
      "Developed a Telegram Bot integrated with Google Sheets to provide updated order-tracking information.",
      "Automated order-status retrieval based on order numbers, eliminating repetitive manual checking activities.",
      "Reduced manual tracking workload by up to 100%."
    ]
  },
  {
    id: "proj_4",
    title: "Billing Collection Performance Analysis",
    tags: ["Python", "Pandas", "SQL", "Power BI"],
    bullets: [
      "Extracted, cleaned, validated, and transformed billing and collection data to ensure accuracy and consistency for analysis.",
      "Conducted exploratory data analysis to identify payment trends, collection patterns, customer segments, and factors affecting collection performance.",
      "Analyzed collection rate, payment status, outstanding balance, aging period, and customer response as key performance indicators.",
      "Segmented customers based on payment behavior and collection risk to support targeted collection strategies.",
      "Developed an interactive Power BI dashboard to monitor collection performance, high-risk customer segments, and operational trends.",
      "Presented data-driven recommendations to help the collection team prioritize customers and improve collection effectiveness."
    ]
  }
];

const PROJECTS_ID = [
  {
    id: "proj_1",
    title: "Indonesian Journal Abstract Classification",
    tags: ["Python", "Naive Bayes", "Natural Language Processing", "POS Tagging"],
    bullets: [
      "Mengembangkan model machine learning untuk mengklasifikasikan abstrak jurnal berbahasa Indonesia menggunakan algoritma Naive Bayes dan fitur Indonesian POS Tagging.",
      "Melakukan text preprocessing, feature extraction, pelatihan model, dan evaluasi performa menggunakan Python.",
      "Mengevaluasi performa model menggunakan accuracy, precision, recall, F1-score, dan confusion matrix.",
      "Mencapai akurasi 96% menggunakan dataset berisi 465 abstrak jurnal."
    ]
  },
  {
    id: "proj_2",
    title: "TPISurvey_BOT",
    tags: ["Python", "Telegram Bot API", "Google Sheets API"],
    bullets: [
      "Mengembangkan Telegram Bot untuk mengambil dan menyajikan informasi dari basis data berisi lebih dari 40.000 records.",
      "Mengimplementasikan query logic dan integrasi Google Maps untuk mendukung aktivitas surveyor lapangan.",
      "Meningkatkan aksesibilitas informasi survei dan mengurangi aktivitas pencarian data secara manual."
    ]
  },
  {
    id: "proj_3",
    title: "CheckOrder_BOT",
    tags: ["Python", "Telegram Bot API", "Google Sheets API"],
    bullets: [
      "Mengembangkan Telegram Bot yang terintegrasi dengan Google Sheets untuk menyediakan informasi tracking order terkini.",
      "Mengotomasi pengecekan status order berdasarkan nomor order, menghilangkan aktivitas pengecekan manual yang berulang.",
      "Mengurangi beban kerja tracking manual hingga 100%."
    ]
  },
  {
    id: "proj_4",
    title: "Billing Collection Performance Analysis",
    tags: ["Python", "Pandas", "SQL", "Power BI"],
    bullets: [
      "Mengekstraksi, membersihkan, memvalidasi, dan mentransformasi data billing dan collection untuk memastikan akurasi dan konsistensi analisis.",
      "Melakukan exploratory data analysis untuk mengidentifikasi tren pembayaran, pola collection, segmen pelanggan, dan faktor yang memengaruhi performa collection.",
      "Menganalisis collection rate, status pembayaran, saldo outstanding, aging period, dan respons pelanggan sebagai indikator kinerja utama.",
      "Melakukan segmentasi pelanggan berdasarkan perilaku pembayaran dan risiko collection untuk mendukung strategi collection yang tertarget.",
      "Mengembangkan dashboard Power BI interaktif untuk memantau performa collection, segmen pelanggan berisiko tinggi, dan tren operasional.",
      "Menyampaikan rekomendasi berbasis data untuk membantu tim collection memprioritaskan pelanggan dan meningkatkan efektivitas collection."
    ]
  }
];

const SKILLS_EN = [
  {
    id: "skill_1",
    category: "Business & Account Management",
    skills: ["Account Management", "Client Relationship Management (CRM)", "Contract Negotiation", "Portfolio & Revenue Growth", "Business Development", "KPI/SLA Monitoring", "Stakeholder Management", "Risk Management"]
  },
  {
    id: "skill_2",
    category: "Programming",
    skills: ["Python", "SQL", "R"]
  },
  {
    id: "skill_3",
    category: "Libraries",
    skills: ["Pandas", "NumPy", "scikit-learn"]
  },
  {
    id: "skill_4",
    category: "Data Science",
    skills: ["Data Cleaning", "EDA", "Feature Engineering", "Classification", "Regression", "Hypothesis Testing", "Model Evaluation"]
  },
  {
    id: "skill_5",
    category: "Visualization",
    skills: ["Power BI", "Excel", "PowerPoint"]
  },
  {
    id: "skill_6",
    category: "Automation",
    skills: ["UiPath", "Power Automate", "Google Sheets", "Telegram Bot API"]
  },
  {
    id: "skill_7",
    category: "Tools",
    skills: ["Jupyter Notebook", "Google Colab", "Git", "GitHub"]
  }
];

const SKILLS_ID = [
  {
    id: "skill_1",
    category: "Manajemen Bisnis & Akun",
    skills: ["Account Management", "Client Relationship Management (CRM)", "Contract Negotiation", "Portfolio & Revenue Growth", "Business Development", "KPI/SLA Monitoring", "Stakeholder Management", "Risk Management"]
  },
  {
    id: "skill_2",
    category: "Bahasa Pemrograman",
    skills: ["Python", "SQL", "R"]
  },
  {
    id: "skill_3",
    category: "Library",
    skills: ["Pandas", "NumPy", "scikit-learn"]
  },
  {
    id: "skill_4",
    category: "Analisis Data",
    skills: ["Data Cleaning", "EDA", "Feature Engineering", "Klasifikasi", "Regresi", "Hypothesis Testing", "Evaluasi Model"]
  },
  {
    id: "skill_5",
    category: "Visualisasi",
    skills: ["Power BI", "Excel", "PowerPoint"]
  },
  {
    id: "skill_6",
    category: "Otomasi",
    skills: ["UiPath", "Power Automate", "Google Sheets", "Telegram Bot API"]
  },
  {
    id: "skill_7",
    category: "Perangkat",
    skills: ["Jupyter Notebook", "Google Colab", "Git", "GitHub"]
  }
];

const EDUCATION_EN = [
  {
    id: "edu_1",
    institution: "Telkom University, Bandung",
    period: "Aug 2013 - Sep 2021",
    degree: "Bachelor’s Degree in Informatics Engineering | Computer Science",
    thesis: "Completed a thesis titled \"Abstract Classification Based on Indonesian Language Journals Using the Naive Bayes Method and Indonesian Pos Tagger Features\" developed individually using Python programming and Machine Learning.",
    honors: "Awarded Staff of The Month in KOPMA organization for actively contributing to activities and setting an example for other team members."
  }
];

const EDUCATION_ID = [
  {
    id: "edu_1",
    institution: "Telkom University, Bandung",
    period: "Aug 2013 – Sep 2021",
    degree: "Sarjana Teknik Informatika | Ilmu Komputer",
    thesis: "Klasifikasi Abstrak Berbasis Jurnal Berbahasa Indonesia Menggunakan Metode Naive Bayes dan Fitur Indonesian POS Tagger",
    honors: "Meraih penghargaan Staff of The Month di organisasi KOPMA atas kontribusi aktif dalam berbagai kegiatan dan menjadi teladan bagi anggota tim lainnya."
  }
];

const CERTIFICATIONS_EN = [
  {
    id: "cert_qcc_3",
    title: "Special Recognition Award for QCC Batch 3 at SIMGROUP",
    issuer_date: "SIMGROUP, April 2026",
    icon: "star",
    desc: "Increased MSM BPO client revenue (Sales Job) from an average of IDR 700M/month (Sep–Nov 2025) to IDR 2B/month.",
    image: ""
  },
  {
    id: "cert_qcc_2",
    title: "2nd Place Winner in QCC Batch 2 (2024–2025) at SIMGROUP",
    issuer_date: "SIMGROUP, August 2025",
    icon: "star",
    desc: "Certificate of Achievement (No: 007/QCC/SIM/VIII/2025) for dedication, innovation, and teamwork in continuous improvement.",
    image: "assets/certs/simgroup_qcc_batch_2_winner.jpg"
  },
  {
    id: "cert_pcap_python",
    title: "PCAP: Programming Essentials in Python",
    issuer_date: "Cisco Networking Academy & OpenEDG Python Institute, 23 Mar 2024",
    icon: "check",
    desc: "Comprehensive certification covering OOP, data structures, algorithms, and modular Python programming.",
    image: "assets/certs/cisco_pcap_python_2024.jpg"
  },
  {
    id: "cert_bi_analyst",
    title: "Business Intelligence Analyst — Professional Academy",
    issuer_date: "Kominfo Digital Talent Scholarship & BINAR, May 2023",
    icon: "check",
    desc: "78 Hours Professional Training in Data Modeling, Power BI Dashboarding, and Business Analytics (No: 1985601840-119/PROA/BLSDM.Kominfo/2023).",
    image: "assets/certs/kominfo_bi_analyst_2023.jpg"
  },
  {
    id: "cert_rpa_kominfo",
    title: "Robotic Process Automation — Professional Academy",
    issuer_date: "Kominfo Digital Talent Scholarship & Train4Best, Dec 2023",
    icon: "check",
    desc: "126 Hours Comprehensive RPA Training and Automated Workflow Deployment (No: 1987048840-83/PROA/BLSDM.Kominfo/2023).",
    image: "assets/certs/kominfo_rpa_proa_2023.jpg"
  },
  {
    id: "cert_genai_azure",
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer_date: "Dicoding Indonesia & Microsoft, 15 June 2026",
    icon: "check",
    desc: "Competency Certificate in Generative AI Application Development with Azure (No: 0LZ0Y00WQX65).",
    image: "assets/certs/dicoding_genai_azure.jpg"
  },
  {
    id: "cert_ds_fabric",
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer_date: "Dicoding Indonesia & Microsoft, 15 June 2026",
    icon: "check",
    desc: "Competency Certificate in End-to-End Data Science implementation with Microsoft Fabric (No: MEPJ06RG6Z3V).",
    image: "assets/certs/dicoding_data_science_fabric.jpg"
  },
  {
    id: "cert_dasar_ds",
    title: "Belajar Dasar Data Science",
    issuer_date: "Dicoding Indonesia, 30 September 2024",
    icon: "check",
    desc: "Foundations of Data Science, Data Exploration, and Statistical Analysis (No: 0LZ04100RP65).",
    image: "assets/certs/dicoding_dasar_data_science.jpg"
  },
  {
    id: "cert_clickup",
    title: "Certificate of Completion — Intermediate",
    issuer_date: "ClickUp (Skilljar), June 2026",
    icon: "check",
    desc: "Intermediate Project Management & Workflow Orchestration (Cert No: bg2tcmdsi287).",
    image: "assets/certs/clickup_intermediate.jpg"
  },
  {
    id: "cert_uipath_pm",
    title: "Diploma of Completion — Automation Project Manager",
    issuer_date: "UiPath Academy, 08/10/2021",
    icon: "check",
    desc: "Robotic Process Automation Project Management & Implementation Life Cycle.",
    image: "assets/certs/uipath_automation_pm.jpg"
  }
];

const CERTIFICATIONS_ID = [
  {
    id: "cert_qcc_3",
    title: "Special Recognition Award QCC Batch 3 di SIMGROUP",
    issuer_date: "SIMGROUP, April 2026",
    icon: "star",
    desc: "Meningkatkan Revenue Klien MSM BPO (Job Sales) dari Rata-rata Rp 700jt per Bulan (Periode September–November 2025) menjadi Rp 2M per Bulan.",
    image: ""
  },
  {
    id: "cert_qcc_2",
    title: "Juara 2 QCC Batch 2 (2024–2025) di SIMGROUP",
    issuer_date: "SIMGROUP, Agustus 2025",
    icon: "star",
    desc: "Certificate of Achievement (No: 007/QCC/SIM/VIII/2025) atas dedikasi, inovasi, dan peningkatan gross margin survei klien area JABODETABEK.",
    image: "assets/certs/simgroup_qcc_batch_2_winner.jpg"
  },
  {
    id: "cert_pcap_python",
    title: "PCAP: Programming Essentials in Python",
    issuer_date: "Cisco Networking Academy & OpenEDG Python Institute, 23 Mar 2024",
    icon: "check",
    desc: "Pemrograman berorientasi objek (OOP), struktur data, algoritma, dan pemrograman modular Python.",
    image: "assets/certs/cisco_pcap_python_2024.jpg"
  },
  {
    id: "cert_bi_analyst",
    title: "Business Intelligence Analyst — Professional Academy",
    issuer_date: "Kominfo Digital Talent Scholarship & BINAR, Mei 2023",
    icon: "check",
    desc: "Pelatihan 78 Jam Pelatihan dalam Pemodelan Data, Dashboarding Power BI, dan Analisis Bisnis (No: 1985601840-119/PROA/BLSDM.Kominfo/2023).",
    image: "assets/certs/kominfo_bi_analyst_2023.jpg"
  },
  {
    id: "cert_rpa_kominfo",
    title: "Robotic Process Automation — Professional Academy",
    issuer_date: "Kominfo Digital Talent Scholarship & Train4Best, Des 2023",
    icon: "check",
    desc: "Pelatihan Komprehensif 126 Jam Pelatihan Implementasi dan Manajemen Proyek RPA (No: 1987048840-83/PROA/BLSDM.Kominfo/2023).",
    image: "assets/certs/kominfo_rpa_proa_2023.jpg"
  },
  {
    id: "cert_genai_azure",
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer_date: "Dicoding Indonesia & Microsoft, 15 Juni 2026",
    icon: "check",
    desc: "Sertifikat Kompetensi Pengembangan Aplikasi Generative AI dengan Azure (No: 0LZ0Y00WQX65).",
    image: "assets/certs/dicoding_genai_azure.jpg"
  },
  {
    id: "cert_ds_fabric",
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer_date: "Dicoding Indonesia & Microsoft, 15 Juni 2026",
    icon: "check",
    desc: "Sertifikat Kompetensi Implementasi Data Science End-to-End dengan Microsoft Fabric (No: MEPJ06RG6Z3V).",
    image: "assets/certs/dicoding_data_science_fabric.jpg"
  },
  {
    id: "cert_dasar_ds",
    title: "Belajar Dasar Data Science",
    issuer_date: "Dicoding Indonesia, 30 September 2024",
    icon: "check",
    desc: "Fondasi Data Science, Exploratory Data Analysis, dan Analisis Statistik (No: 0LZ04100RP65).",
    image: "assets/certs/dicoding_dasar_data_science.jpg"
  },
  {
    id: "cert_clickup",
    title: "Certificate of Completion — Intermediate",
    issuer_date: "ClickUp (Skilljar), Juni 2026",
    icon: "check",
    desc: "Manajemen Proyek & Orkestrasi Workflow Tingkat Menengah (No: bg2tcmdsi287).",
    image: "assets/certs/clickup_intermediate.jpg"
  },
  {
    id: "cert_uipath_pm",
    title: "Diploma of Completion — Automation Project Manager",
    issuer_date: "UiPath Academy, 08/10/2021",
    icon: "check",
    desc: "Manajemen Proyek Robotic Process Automation (RPA) dan Siklus Implementasi Sistem Otomasi.",
    image: "assets/certs/uipath_automation_pm.jpg"
  }
];

const DEFAULT_PROFILE = PROFILE_EN;
const DEFAULT_EXPERIENCES = EXPERIENCES_EN;
const DEFAULT_PROJECTS = PROJECTS_EN;
const DEFAULT_SKILLS = SKILLS_EN;
const DEFAULT_EDUCATION = EDUCATION_EN;
const DEFAULT_CERTIFICATIONS = CERTIFICATIONS_EN;
