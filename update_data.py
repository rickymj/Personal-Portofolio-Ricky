import json

with open("static/js/data.js", "r", encoding="utf-8") as f:
    content = f.read()

# We will replace the PROJECTS_EN and PROJECTS_ID arrays with the new schema.
projects_en_new = """const PROJECTS_EN = [
  {
    id: "proj_qcc3",
    title: "BPO Sales Revenue Turnaround & Optimization",
    impactHeadline: "Revenue grew from IDR 700M to IDR 2.0B/month (285% growth)",
    roleContext: "MSM BPO (Job Sales) account management and pipeline optimization",
    problem: "Client revenue was stagnant at an average of IDR 700M/month, caused by unmonitored sales bottlenecks, high lead drop-offs, and delayed pipeline turnaround.",
    approach: "Conducted root cause analysis on the complete sales funnel, built automated daily pipeline tracking dashboards in Power BI, and identified specific conversion drop-off points.",
    action: "Restructured SLA protocols, realigned target incentives for high-conversion sales jobs, and established rapid-response communication between recruitment and client operations.",
    result: "Scaled monthly client revenue to IDR 2.0B/month. Won the Special Recognition Award in QCC Batch 3 at SIMGROUP (April 2026).",
    tools: ["Revenue Growth", "Root Cause Analysis", "Power BI", "SLA Monitoring"],
    confidential: true,
    evidenceButtons: []
  },
  {
    id: "proj_qcc2",
    title: "Survey Operation Gross Margin Turnaround",
    impactHeadline: "Increased Gross Margin from 20% to 22%, boosting company net profit",
    roleContext: "Client survey operations across JABODETABEK area",
    problem: "Suffered from compressed profit margins (20%), driven by high field travel variance and uncoordinated surveyor dispatching.",
    approach: "Analyzed survey cost components, travel radius, surveyor efficiency, and unit economics to uncover high-variance cost drivers.",
    action: "Implemented strict operational zoning, reorganized field routes, and improved surveyor verification turnaround.",
    result: "Increased Gross Margin to 22%, earning 2nd Place Winner in QCC Batch 2 SIMGROUP (August 2025).",
    tools: ["Gross Margin Optimization", "Cost Analysis", "Field Operations"],
    confidential: true,
    evidenceButtons: []
  },
  {
    id: "proj_billing",
    title: "Billing Collection Performance & Risk Segmentation",
    impactHeadline: "Significantly improved collection recovery rates by targeting high-value accounts",
    roleContext: "Billing collection and debt recovery operations",
    problem: "Increasing volume of overdue invoices and unprioritized debtor queues created extended Days Sales Outstanding (DSO) and cash collection delays.",
    approach: "Cleaned, transformed, and queried historical billing data using SQL and Python (Pandas). Segmented debtors based on payment behaviors and aging period.",
    action: "Designed an executive Power BI dashboard with automated risk scoring to prioritize high-value overdue accounts for the collection team.",
    result: "Enabled targeted collection strategies that eliminated guesswork in daily priorities and accelerated cash recovery.",
    tools: ["Python", "Pandas", "SQL", "Power BI", "Risk Modeling"],
    confidential: true,
    evidenceButtons: []
  },
  {
    id: "proj_automation_bots",
    title: "Field Operations & Order Tracking Telegram Bots",
    impactHeadline: "Reduced manual query tracking workload by 100%",
    roleContext: "Field operations data query automation",
    problem: "Field surveyors and internal coordinators spent hours daily on manual data lookups across 40,000+ records and repetitive order status inquiries.",
    approach: "Developed two asynchronous Telegram Bots in Python integrated with Google Sheets API and Google Maps geolocation query logic.",
    action: "Automated instant query retrieval, address geocoding, and order status verification with <2 second response latency.",
    result: "Enabled surveyors to navigate to locations instantly without manual office assistance, completely eliminating operational bottlenecks.",
    tools: ["Python", "Telegram Bot API", "Google Sheets API", "RPA"],
    confidential: false,
    evidenceButtons: [
      { label: "View GitHub Repo", link: "https://github.com/rickymj" }
    ]
  },
  {
    id: "proj_nlp_journal",
    title: "Indonesian Journal Abstract Classification",
    impactHeadline: "Achieved 96% classification accuracy across academic datasets",
    roleContext: "Academic NLP text classification research",
    problem: "Manual document categorization and indexing of academic research abstracts is time-intensive and error-prone.",
    approach: "Built an NLP text classification pipeline incorporating Indonesian POS Tagging, TF-IDF feature extraction, and Naive Bayes modeling in Python.",
    action: "Optimized hyperparameters and evaluated model performance across Confusion Matrix, Precision, Recall, and F1-Score.",
    result: "Successfully automated abstract categorization, vastly improving indexing speed while maintaining high accuracy.",
    tools: ["Python", "Machine Learning", "NLP", "Scikit-Learn"],
    confidential: false,
    evidenceButtons: [
      { label: "View GitHub Repo", link: "https://github.com/rickymj" }
    ]
  }
];"""

projects_id_new = """const PROJECTS_ID = [
  {
    id: "proj_qcc3",
    title: "Peningkatan Revenue Klien BPO Sales",
    impactHeadline: "Revenue klien tumbuh dari Rp 700jt menjadi Rp 2,0M/bulan (naik 285%)",
    roleContext: "Manajemen akun MSM BPO (Job Sales) & optimasi pipeline konversi",
    problem: "Revenue klien stagnan di rata-rata Rp 700 juta/bulan (September-November 2025) akibat bottleneck alur sales, drop-off prospek tinggi, dan lambatnya perputaran pipeline.",
    approach: "Melakukan root cause analysis pada sales funnel, membangun dashboard monitoring harian di Power BI, dan memetakan titik drop-off konversi agen daerah.",
    action: "Restrukturisasi protokol SLA, revisi skema insentif untuk agen unggulan, serta mempercepat jalur komunikasi antara tim rekrutmen dan klien.",
    result: "Revenue bulanan klien melesat mencapai Rp 2,0 Miliar/bulan. Meraih Special Recognition Award QCC Batch 3 di SIMGROUP (April 2026).",
    tools: ["Peningkatan Revenue", "Root Cause Analysis", "Power BI", "Monitoring SLA"],
    confidential: true,
    evidenceButtons: []
  },
  {
    id: "proj_qcc2",
    title: "Peningkatan Gross Margin Survei Klien",
    impactHeadline: "Meningkatkan Gross Margin dari 20% menjadi 22%, mendongkrak laba bersih",
    roleContext: "Operasi survei klien di seluruh area JABODETABEK",
    problem: "Gross margin proyek tertahan di 20% akibat tingginya biaya perjalanan lapangan (travel variance) dan penugasan surveyor yang belum optimal.",
    approach: "Menganalisis komponen biaya survei, radius penugasan, efisiensi surveyor, dan unit economics per titik lokasi untuk menemukan pemicu biaya terbesar.",
    action: "Mengimplementasikan zonasi wilayah kerja ketat, mengoptimasi rute, dan mempercepat proses validasi hasil survei lapangan.",
    result: "Berhasil meningkatkan Gross Margin menjadi 22%. Meraih Juara 2 QCC Batch 2 SIMGROUP (Agustus 2025).",
    tools: ["Optimasi Gross Margin", "Analisis Biaya", "Operasional Lapangan"],
    confidential: true,
    evidenceButtons: []
  },
  {
    id: "proj_billing",
    title: "Analisis Performa Billing Collection & Segmentasi Risiko",
    impactHeadline: "Meningkatkan rasio pelunasan (recovery rate) dengan strategi penagihan tepat sasaran",
    roleContext: "Operasional penagihan dan pemulihan piutang (debt recovery)",
    problem: "Penumpukan tagihan jatuh tempo dan antrean penagihan yang belum terprioritaskan memperlambat perputaran kas (DSO).",
    approach: "Mengekstraksi, membersihkan, dan mentransformasi riwayat penagihan dengan SQL & Python. Melakukan segmentasi debitur berdasarkan pola bayar dan usia tunggakan.",
    action: "Membangun dashboard eksekutif Power BI dengan risk-scoring otomatis untuk memandu tim memprioritaskan akun bernilai/berisiko tinggi.",
    result: "Menghasilkan strategi penagihan yang efisien, mengeliminasi proses manual dalam penentuan target harian.",
    tools: ["Python", "Pandas", "SQL", "Power BI", "Risk Modeling"],
    confidential: true,
    evidenceButtons: []
  },
  {
    id: "proj_automation_bots",
    title: "Bot Telegram Otomasi Survei Lapangan & Tracking Order",
    impactHeadline: "Mengurangi beban kerja pencarian data manual hingga 100%",
    roleContext: "Otomasi pencarian data untuk operasional lapangan",
    problem: "Tim surveyor dan koordinator menghabiskan waktu harian mencari data secara manual dari 40.000+ baris data dan mengecek status order berulang.",
    approach: "Mengembangkan dua bot Telegram asinkron menggunakan Python yang terintegrasi dengan Google Sheets API dan query geolokasi Google Maps.",
    action: "Mengotomatisasi penarikan data instan, geocoding alamat, dan verifikasi status order dengan respons kurang dari 2 detik.",
    result: "Surveyor dapat langsung menuju lokasi secara presisi tanpa bantuan manual tim kantor, menghilangkan bottleneck operasional sepenuhnya.",
    tools: ["Python", "Telegram Bot API", "Google Sheets API", "RPA"],
    confidential: false,
    evidenceButtons: [
      { label: "Lihat GitHub Repo", link: "https://github.com/rickymj" }
    ]
  },
  {
    id: "proj_nlp_journal",
    title: "Klasifikasi Abstrak Jurnal (NLP & Machine Learning)",
    impactHeadline: "Mencapai akurasi klasifikasi 96% pada dataset makalah akademik",
    roleContext: "Riset klasifikasi teks NLP untuk akademik",
    problem: "Kategorisasi dan indeksasi dokumen secara manual pada abstrak penelitian memakan waktu lama dan rentan terjadi human error.",
    approach: "Membangun pipeline klasifikasi teks NLP meliputi POS Tagging Bahasa Indonesia, ekstraksi fitur TF-IDF, dan model Naive Bayes menggunakan Python.",
    action: "Melakukan optimasi hyperparameter serta mengevaluasi performa model melalui Confusion Matrix, Precision, Recall, dan F1-Score.",
    result: "Proses kategorisasi menjadi otomatis dan jauh lebih cepat tanpa mengorbankan akurasi klasifikasi.",
    tools: ["Python", "Machine Learning", "NLP", "Scikit-Learn"],
    confidential: false,
    evidenceButtons: [
      { label: "Lihat GitHub Repo", link: "https://github.com/rickymj" }
    ]
  }
];"""

import re
content = re.sub(r'const PROJECTS_EN = \[.*?\];', projects_en_new, content, flags=re.DOTALL)
content = re.sub(r'const PROJECTS_ID = \[.*?\];', projects_id_new, content, flags=re.DOTALL)

with open("static/js/data.js", "w", encoding="utf-8") as f:
    f.write(content)

print("data.js updated")
