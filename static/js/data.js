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
    id: "proj_qcc3",
    title: "BPO Sales Revenue Turnaround & Optimization (QCC Batch 3 Award)",
    tags: ["Revenue Growth", "Root Cause Analysis", "Power BI", "SLA Monitoring", "Sales Operations"],
    bullets: [
      "Context & Problem: MSM BPO (Job Sales) client revenue was stagnant at an average of IDR 700M/month (September–November 2025), caused by unmonitored sales bottlenecks, high lead drop-offs, and delayed pipeline turnaround.",
      "Data & Approach: Conducted root cause analysis on the complete sales funnel, built automated daily pipeline tracking dashboards in Power BI, and identified specific conversion drop-off points across regional sales agents.",
      "Operational Action: Restructured SLA protocols, realigned target incentives for high-conversion sales jobs, and established rapid-response communication between recruitment and client operations.",
      "Impact & Numbers: Scaled monthly client revenue from IDR 700M to IDR 2.0B/month (285% growth), winning the Special Recognition Award in QCC Batch 3 at SIMGROUP (April 2026)."
    ]
  },
  {
    id: "proj_qcc2",
    title: "Survey Operation Gross Margin Turnaround (QCC Batch 2 Award)",
    tags: ["Gross Margin Optimization", "Cost Analysis", "Field Operations", "Unit Economics"],
    bullets: [
      "Context & Problem: Client survey operations across JABODETABEK area suffered from compressed profit margins (20%), driven by high field travel variance and uncoordinated surveyor dispatching.",
      "Data & Approach: Analyzed survey cost components, travel radius, surveyor efficiency, and unit economics to uncover high-variance cost drivers.",
      "Operational Action: Implemented strict operational zoning, reorganized field routes, and improved surveyor verification turnaround.",
      "Impact & Numbers: Increased Gross Margin from 20% to 22%, directly boosting company net profit and earning 2nd Place Winner in QCC Batch 2 SIMGROUP (August 2025)."
    ]
  },
  {
    id: "proj_billing",
    title: "Billing Collection Performance & Risk Segmentation Analysis",
    tags: ["Python", "Pandas", "SQL", "Power BI", "Risk Modeling"],
    bullets: [
      "Context & Problem: Increasing volume of overdue invoices and unprioritized debtor queues created extended Days Sales Outstanding (DSO) and cash collection delays.",
      "Data & Approach: Cleaned, transformed, and queried historical billing data using SQL and Python (Pandas). Segmented debtors based on payment behaviors, outstanding balance, aging period, and responsiveness.",
      "Operational Action: Designed an executive Power BI dashboard with automated risk scoring to prioritize high-value overdue accounts for the collection team.",
      "Impact & Numbers: Enabled targeted collection strategies that significantly improved collection recovery rates and eliminated guesswork in team daily priorities."
    ]
  },
  {
    id: "proj_automation_bots",
    title: "Field Operations & Order Tracking Telegram Bots (TPISurvey & CheckOrder)",
    tags: ["Python", "Telegram Bot API", "Google Sheets API", "RPA & Automation"],
    bullets: [
      "Context & Problem: Field surveyors and internal coordinators spent hours daily on manual data lookups across 40,000+ records and repetitive order status inquiries.",
      "Data & Approach: Developed two asynchronous Telegram Bots in Python integrated with Google Sheets API and Google Maps geolocation query logic.",
      "Operational Action: Automated instant query retrieval, address geocoding, and order status verification with <2 second response latency.",
      "Impact & Numbers: Reduced manual query tracking workload by 100%, enabling surveyors to navigate to locations instantly without manual office assistance."
    ]
  },
  {
    id: "proj_nlp_journal",
    title: "Indonesian Journal Abstract Classification (NLP & Machine Learning)",
    tags: ["Python", "Machine Learning", "NLP", "Naive Bayes", "Scikit-Learn"],
    bullets: [
      "Context & Problem: Manual document categorization and indexing of academic research abstracts is time-intensive and error-prone.",
      "Data & Approach: Built an NLP text classification pipeline incorporating Indonesian POS Tagging, TF-IDF feature extraction, and Naive Bayes modeling in Python.",
      "Operational Action: Optimized hyperparameters and evaluated model performance across Confusion Matrix, Precision, Recall, and F1-Score.",
      "Impact & Numbers: Achieved 96% classification accuracy across a dataset of 465 academic papers."
    ]
  }
];

const PROJECTS_ID = [
  {
    id: "proj_qcc3",
    title: "Peningkatan Revenue Klien BPO Sales (Penghargaan QCC Batch 3)",
    tags: ["Peningkatan Revenue", "Root Cause Analysis", "Power BI", "Monitoring SLA", "Operasional Sales"],
    bullets: [
      "Masalah & Konteks: Revenue klien MSM BPO (Job Sales) stagnan di rata-rata Rp 700 juta/bulan (periode September–November 2025) akibat bottleneck alur sales dan tingginya drop-off prospek.",
      "Pendekatan & Data: Melakukan analisis akar masalah pada seluruh alur sales funnel, membangun dashboard monitoring harian di Power BI, dan memetakan titik drop-off konversi per agen sales daerah.",
      "Aksi Operasional: Melakukan restrukturisasi protokol SLA, merevisi skema insentif untuk jenis sales berkontribusi tinggi, serta mempercepat koordinasi antara tim rekrutmen dan operasional klien.",
      "Hasil & Dampak: Revenue bulanan klien melesat dari Rp 700jt menjadi Rp 2,0 Miliar/bulan (pertumbuhan 285%), meraih Special Recognition Award QCC Batch 3 di SIMGROUP (April 2026)."
    ]
  },
  {
    id: "proj_qcc2",
    title: "Peningkatan Gross Margin Survei Klien (Penghargaan QCC Batch 2)",
    tags: ["Gross Margin Optimization", "Analisis Biaya", "Operasional Lapangan", "Unit Economics"],
    bullets: [
      "Masalah & Konteks: Gross margin proyek survei klien area JABODETABEK tertahan di angka 20% akibat tingginya biaya perjalanan lapangan dan jadwal penugasan surveyor yang belum optimal.",
      "Pendekatan & Data: Menganalisis komponen biaya survei, radius penugasan, produktivitas surveyor, dan unit economics per titik lokasi.",
      "Aksi Operasional: Mengimplementasikan zonasi wilayah kerja yang ketat, mengoptimasi rute perjalanan surveyor, dan mempercepat validasi data lapangan.",
      "Hasil & Dampak: Berhasil meningkatkan Gross Margin dari 20% menjadi 22%, mendongkrak profitabilitas bersih proyek dan meraih Juara 2 QCC Batch 2 SIMGROUP (Agustus 2025)."
    ]
  },
  {
    id: "proj_billing",
    title: "Analisis Performa Billing Collection & Segmentasi Risiko",
    tags: ["Python", "Pandas", "SQL", "Power BI", "Risk Modeling"],
    bullets: [
      "Masalah & Konteks: Penumpukan tagihan jatuh tempo dan antrean penagihan yang belum terprioritaskan memperlambat perputaran arus kas penagihan.",
      "Pendekatan & Data: Mengekstraksi, membersihkan, dan mentransformasi data riwayat penagihan dengan SQL & Python (Pandas), kemudian melakukan segmentasi debitur berdasarkan pola pembayaran dan masa tunggakan (aging).",
      "Aksi Operasional: Membangun dashboard eksekutif interaktif Power BI dengan risk-scoring otomatis untuk memandu tim penagihan memprioritaskan akun bernilai tinggi.",
      "Hasil & Dampak: Menghasilkan strategi penagihan yang tepat sasaran, meningkatkan recovery rate tagihan, dan mengeliminasi proses manual dalam penentuan target harian."
    ]
  },
  {
    id: "proj_automation_bots",
    title: "Bot Telegram Otomasi Survei Lapangan & Tracking Order (TPISurvey & CheckOrder)",
    tags: ["Python", "Telegram Bot API", "Google Sheets API", "RPA & Otomasi"],
    bullets: [
      "Masalah & Konteks: Tim surveyor lapangan dan koordinator kantor menghabiskan banyak waktu mencari data manual pada basis data berisi 40.000+ data dan pengecekan status order yang berulang.",
      "Pendekatan & Data: Mengembangkan dua Bot Telegram otomatis berbasis Python yang terhubung dengan Google Sheets API dan query lokasi Google Maps.",
      "Aksi Operasional: Mengotomasi pencarian data survei, geocoding alamat, dan pengecekan status pesanan secara instan dengan waktu respons < 2 detik.",
      "Hasil & Dampak: Mengurangi beban kerja pencarian manual hingga 100%, mempercepat mobilisasi surveyor lapangan tanpa perlu menunggu bantuan admin kantor."
    ]
  },
  {
    id: "proj_nlp_journal",
    title: "Klasifikasi Abstrak Jurnal Bahasa Indonesia (NLP & Machine Learning)",
    tags: ["Python", "Machine Learning", "NLP", "Naive Bayes", "Scikit-Learn"],
    bullets: [
      "Masalah & Konteks: Pengelompokan dan pengindeksan dokumen abstrak karya ilmiah secara manual memakan waktu lama dan rentan inkonsistensi.",
      "Pendekatan & Data: Membangun pipeline NLP klasifikasi teks dengan fitur Indonesian POS Tagging, ekstraksi TF-IDF, dan algoritma Naive Bayes menggunakan Python.",
      "Aksi Operasional: Melakukan evaluasi performa model secara komprehensif menggunakan Confusion Matrix, Precision, Recall, dan F1-Score.",
      "Hasil & Dampak: Berhasil mencapai akurasi klasifikasi sebesar 96% pada dataset 465 dokumen abstrak jurnal."
    ]
  }
];

const SKILLS_EN = [
  {
    id: "skill_analytics",
    category: "Analytics & Data Intelligence",
    skills: [
      "SQL (Joins, Aggregations)",
      "Python (Pandas, NumPy, Scikit-learn)",
      "Power BI & DAX",
      "Exploratory Data Analysis (EDA)",
      "Data Cleaning & ETL",
      "Statistical Modeling",
      "Microsoft Fabric",
      "Microsoft Azure GenAI"
    ]
  },
  {
    id: "skill_automation",
    category: "Automation & Workflow Orchestration",
    skills: [
      "UiPath RPA",
      "Power Automate",
      "Telegram Bot API",
      "Google Sheets API",
      "ClickUp",
      "Process Mapping & SOP"
    ]
  },
  {
    id: "skill_business",
    category: "Business & Account Management",
    skills: [
      "Account Management",
      "Client Relationship (CRM)",
      "Portfolio & Revenue Growth",
      "Contract & Rate Negotiation",
      "KPI & SLA Monitoring",
      "Stakeholder Management",
      "Risk Management",
      "BPO Operations"
    ]
  },
  {
    id: "skill_tools",
    category: "Developer Tools & Environments",
    skills: [
      "Jupyter Notebook",
      "Google Colab",
      "Git & GitHub",
      "Excel Advanced (Pivot, Power Query)"
    ]
  }
];

const SKILLS_ID = [
  {
    id: "skill_analytics",
    category: "Analisis & Inteligensi Data",
    skills: [
      "SQL (Query Kompleks, Aggregasi)",
      "Python (Pandas, NumPy, Scikit-learn)",
      "Power BI & DAX",
      "Exploratory Data Analysis (EDA)",
      "Data Cleaning & ETL",
      "Pemodelan Statistik",
      "Microsoft Fabric",
      "Microsoft Azure GenAI"
    ]
  },
  {
    id: "skill_automation",
    category: "Otomasi & Manajemen Alur Kerja",
    skills: [
      "UiPath RPA",
      "Power Automate",
      "Telegram Bot API",
      "Google Sheets API",
      "ClickUp",
      "Pemetaan Proses & SOP"
    ]
  },
  {
    id: "skill_business",
    category: "Manajemen Akun & Bisnis",
    skills: [
      "Account Management",
      "Hubungan Klien (CRM)",
      "Pertumbuhan Revenue Portofolio",
      "Negosiasi Kontrak & Rate",
      "Monitoring KPI & SLA",
      "Manajemen Stakeholder",
      "Manajemen Risiko",
      "Operasional BPO"
    ]
  },
  {
    id: "skill_tools",
    category: "Perangkat & Lingkungan Kerja",
    skills: [
      "Jupyter Notebook",
      "Google Colab",
      "Git & GitHub",
      "Excel Tingkat Lanjut (Pivot, Power Query)"
    ]
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
