/**
 * Ricky Muhammad Jufrizal — Portfolio Public Controller
 * Refactored: Modular, Clean, Single Responsibility
 */

// ==========================================
// 1. CONFIGURATION & CONSTANTS
// ==========================================
const CONFIG = {
  DOM_IDS: {
    EXPERIENCE_LIST: 'experienceList',
    PROJECT_LIST: 'projectList',
    SKILL_LIST: 'skillList',
    EDU_LIST: 'eduList',
    CERT_LIST: 'certList',
    THEME_BTN: 'themeToggleBtn',
    THEME_ICON_DARK: 'themeIconDark',
    THEME_ICON_LIGHT: 'themeIconLight',
    MODAL: 'certImageModal',
    MODAL_TITLE: 'certImageModalTitle',
    MODAL_IMG: 'certImageModalImg',
    MODAL_CLOSE_TOP: 'btnCloseCertImageModal',
    MODAL_CLOSE_BOTTOM: 'btnCloseCertImageModalBottom',
    TOAST: 'toastMessage',
    TOAST_TEXT: 'toastText'
  },
  STORAGE_KEYS: {
    THEME: 'rmj_theme'
  },
  CLASSES: {
    LIGHT: 'light',
    DARK: 'dark',
    SHOW: 'show',
    ACTIVE: 'active',
    OPEN: 'open'
  },
  TOAST_DURATION: 3200
};

// Global State
const state = {
  experiences: [],
  projects: [],
  skills: [],
  education: [],
  certifications: []
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(message) {
  try {
    const toast = document.getElementById(CONFIG.DOM_IDS.TOAST);
    const text = document.getElementById(CONFIG.DOM_IDS.TOAST_TEXT);

    if (!toast || !text) return;

    text.textContent = message;
    toast.classList.add(CONFIG.CLASSES.SHOW);

    setTimeout(() => {
      toast.classList.remove(CONFIG.CLASSES.SHOW);
    }, CONFIG.TOAST_DURATION);
  } catch (error) {
    console.error("Failed to show toast:", error);
  }
}

function safeGetElement(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`Element with ID '${id}' not found.`);
  return el;
}

// ==========================================
// 3. DATA ACCESS
// ==========================================
function loadData() {
  try {
    state.experiences = typeof EXPERIENCES_EN !== 'undefined' ? [...EXPERIENCES_EN] : (typeof DEFAULT_EXPERIENCES !== 'undefined' ? [...DEFAULT_EXPERIENCES] : []);
    state.projects = typeof PROJECTS_EN !== 'undefined' ? [...PROJECTS_EN] : (typeof DEFAULT_PROJECTS !== 'undefined' ? [...DEFAULT_PROJECTS] : []);
    state.skills = typeof SKILLS_EN !== 'undefined' ? [...SKILLS_EN] : (typeof DEFAULT_SKILLS !== 'undefined' ? [...DEFAULT_SKILLS] : []);
    state.education = typeof EDUCATION_EN !== 'undefined' ? [...EDUCATION_EN] : (typeof DEFAULT_EDUCATION !== 'undefined' ? [...DEFAULT_EDUCATION] : []);
    state.certifications = typeof CERTIFICATIONS_EN !== 'undefined' ? [...CERTIFICATIONS_EN] : (typeof DEFAULT_CERTIFICATIONS !== 'undefined' ? [...DEFAULT_CERTIFICATIONS] : []);
  } catch (error) {
    console.error("Error loading data from data.js:", error);
  }
}

// ==========================================
// 4. BUSINESS LOGIC & HANDLERS
// ==========================================
const ThemeManager = {
  init() {
    const themeBtn = safeGetElement(CONFIG.DOM_IDS.THEME_BTN);
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
    if (savedTheme === CONFIG.CLASSES.LIGHT) {
      document.documentElement.classList.replace(CONFIG.CLASSES.DARK, CONFIG.CLASSES.LIGHT);
      this.updateIcon(true);
    }

    themeBtn.addEventListener('click', () => this.toggleTheme());
  },

  toggleTheme() {
    try {
      const isLight = document.documentElement.classList.contains(CONFIG.CLASSES.LIGHT);
      if (isLight) {
        document.documentElement.classList.replace(CONFIG.CLASSES.LIGHT, CONFIG.CLASSES.DARK);
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, CONFIG.CLASSES.DARK);
        this.updateIcon(false);
      } else {
        document.documentElement.classList.replace(CONFIG.CLASSES.DARK, CONFIG.CLASSES.LIGHT);
        localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, CONFIG.CLASSES.LIGHT);
        this.updateIcon(true);
      }
    } catch (error) {
      console.error("Error toggling theme:", error);
    }
  },

  updateIcon(isLight) {
    const iconDark = safeGetElement(CONFIG.DOM_IDS.THEME_ICON_DARK);
    const iconLight = safeGetElement(CONFIG.DOM_IDS.THEME_ICON_LIGHT);
    if (!iconDark || !iconLight) return;

    iconDark.style.display = isLight ? 'block' : 'none';
    iconLight.style.display = isLight ? 'none' : 'block';
  }
};

const ScrollManager = {
  init() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
      try {
        let currentSectionId = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSectionId = sec.getAttribute('id') || '';
          }
        });

        navLinks.forEach(link => {
          link.classList.remove(CONFIG.CLASSES.ACTIVE);
          if (currentSectionId && link.getAttribute('href').includes(currentSectionId)) {
            link.classList.add(CONFIG.CLASSES.ACTIVE);
          }
        });
      } catch (error) {
        console.error("Error in scroll handler:", error);
      }
    });
  }
};

const LightboxManager = {
  init() {
    const btnCloseTop = safeGetElement(CONFIG.DOM_IDS.MODAL_CLOSE_TOP);
    const btnCloseBottom = safeGetElement(CONFIG.DOM_IDS.MODAL_CLOSE_BOTTOM);
    const modal = safeGetElement(CONFIG.DOM_IDS.MODAL);

    if (btnCloseTop) btnCloseTop.addEventListener('click', () => this.close());
    if (btnCloseBottom) btnCloseBottom.addEventListener('click', () => this.close());

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    // Bind global for inline onclick
    window.openImageLightbox = this.open.bind(this);
    window.viewCertImage = this.viewCert.bind(this);
  },

  open(src, title = 'Image Preview') {
    try {
      const modal = safeGetElement(CONFIG.DOM_IDS.MODAL);
      const modalTitle = safeGetElement(CONFIG.DOM_IDS.MODAL_TITLE);
      const imgEl = safeGetElement(CONFIG.DOM_IDS.MODAL_IMG);

      if (!modal) return;

      if (imgEl && src) imgEl.src = src;
      if (modalTitle && title) modalTitle.innerHTML = `<span>${escapeHtml(title)}</span>`;

      modal.classList.add(CONFIG.CLASSES.OPEN);
    } catch (error) {
      console.error("Error opening lightbox:", error);
    }
  },

  close() {
    const modal = safeGetElement(CONFIG.DOM_IDS.MODAL);
    if (modal) modal.classList.remove(CONFIG.CLASSES.OPEN);
  },

  viewCert(certId) {
    const cert = state.certifications.find(c => c.id === certId);
    if (!cert || !cert.image) return;
    this.open(cert.image, cert.title || 'Certificate Preview');
  }
};

function handleCVDownloads() {
  const cvLinks = document.querySelectorAll('a[href*="Ricky_Muhammad_Jufrizal_CV.pdf"]');
  cvLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      try {
        const res = await fetch(link.getAttribute('href'), { method: 'HEAD' });
        if (!res.ok) {
          e.preventDefault();
          showToast('File CV belum tersedia. Silakan hubungi via WhatsApp.');
        } else {
          showToast('CV sedang diunduh...');
        }
      } catch (error) {
        e.preventDefault();
        showToast('File CV belum tersedia. Silakan hubungi via WhatsApp.');
        console.error("CV fetch error:", error);
      }
    });
  });
}

function applyRevealAnimations() {
  if (!('IntersectionObserver' in window)) return;

  try {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(CONFIG.CLASSES.SHOW);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } catch (error) {
    console.error("Error setting up intersection observer:", error);
  }
}

// ==========================================
// 5. RENDERERS
// ==========================================
function generateBadgesHtml(badges) {
  if (!badges || badges.length === 0) return '';
  const badgeTags = badges.map(badge => {
    let colorClass = '';
    const text = badge.toLowerCase();
    if (text.includes('sla') || text.includes('gross margin')) colorClass = 'emerald';
    if (text.includes('revenue') || text.includes('idr 2b') || text.includes('award')) colorClass = 'amber';
    return `<span class="badge-pill ${colorClass}">${escapeHtml(badge)}</span>`;
  }).join('');
  return `<div class="exp-badges">${badgeTags}</div>`;
}

function generateEvidenceHtml(evidenceButtons, title) {
  if (!evidenceButtons || evidenceButtons.length === 0) return '';
  const buttonsHtml = evidenceButtons.map(btn => {
    if (btn.link) {
      return `<a href="${escapeHtml(btn.link)}" target="_blank" rel="noopener noreferrer" class="btn-evidence">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>${escapeHtml(btn.label)}</span>
              </a>`;
    }
    if (btn.image) {
      return `<button type="button" onclick="openImageLightbox('${escapeHtml(btn.image)}', '${escapeHtml(title)}')" class="btn-evidence">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <span>${escapeHtml(btn.label)}</span>
              </button>`;
    }
    return '';
  }).join('');
  return `<div class="proj-evidence-actions">${buttonsHtml}</div>`;
}

function renderExperiences() {
  const container = safeGetElement(CONFIG.DOM_IDS.EXPERIENCE_LIST);
  if (!container || state.experiences.length === 0) return;

  container.innerHTML = state.experiences.map(exp => {
    const badgesHtml = generateBadgesHtml(exp.badges);
    const bulletsHtml = exp.bullets && exp.bullets.length > 0 ? `<ul class="exp-bullets">${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : '';
    const deptText = exp.department ? ` • <span style="color:var(--text-muted);">${escapeHtml(exp.department)}</span>` : '';
    const orgSuffixText = exp.org_suffix ? ` <span class="org-suffix">${escapeHtml(exp.org_suffix)}</span>` : '';

    return `
      <div class="exp-item reveal show" data-id="${exp.id}">
        <div class="exp-node"></div>
        <div class="exp-card">
          <div class="exp-card-header">
            <div>
              <div class="exp-company">${escapeHtml(exp.company)}${orgSuffixText}</div>
              <div class="exp-role-row">
                <span class="exp-role">${escapeHtml(exp.role)}</span>
                <span class="exp-type">(${escapeHtml(exp.type || 'Full-time')})</span>
                ${deptText}
              </div>
            </div>
            <div class="exp-date">${escapeHtml(exp.date)}</div>
          </div>
          ${badgesHtml}
          ${bulletsHtml}
        </div>
      </div>
    `;
  }).join('');
}

function renderProjects() {
  const container = safeGetElement(CONFIG.DOM_IDS.PROJECT_LIST);
  if (!container || state.projects.length === 0) return;

  container.innerHTML = state.projects.map(proj => {
    const toolsHtml = proj.tools && proj.tools.length > 0 ? `<div class="proj-tags" style="margin-top: 8px;">${proj.tools.map(t => `<span class="proj-tag">${escapeHtml(t)}</span>`).join('')}</div>` : '';
    const evidenceHtml = generateEvidenceHtml(proj.evidenceButtons, proj.title);
    const confidentialBadge = proj.confidential ? `<div class="confidential-badge"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span>Confidential Client Project</span></div>` : '';

    return `
      <div class="proj-card case-study-card reveal show" data-id="${proj.id}">
        <div class="card-glow-bar"></div>
        <div class="proj-header-wrap">
          <h3 class="proj-title" style="margin-bottom: 5px;">${escapeHtml(proj.title)}</h3>
          ${confidentialBadge}
        </div>
        <div class="proj-impact-headline">${escapeHtml(proj.impactHeadline)}</div>
        <div class="proj-role-context"><strong>Role & Context:</strong> ${escapeHtml(proj.roleContext)}</div>
        <div class="proj-case-grid">
          <div class="case-section"><span class="case-label label-problem">Problem</span><p>${escapeHtml(proj.problem)}</p></div>
          <div class="case-section"><span class="case-label label-approach">Approach</span><p>${escapeHtml(proj.approach)}</p></div>
          <div class="case-section"><span class="case-label label-approach">Action</span><p>${escapeHtml(proj.action)}</p></div>
          <div class="case-section"><span class="case-label label-impact">Result</span><p>${escapeHtml(proj.result)}</p></div>
        </div>
        <div class="proj-tools-section"><strong>Tools & Methods:</strong>${toolsHtml}</div>
        ${evidenceHtml}
      </div>
    `;
  }).join('');
}

function renderSkills() {
  const container = safeGetElement(CONFIG.DOM_IDS.SKILL_LIST);
  if (!container || state.skills.length === 0) return;

  container.innerHTML = state.skills.map(skillGroup => {
    const catLower = (skillGroup.category || '').toLowerCase();
    let catIcon = '🔹';
    if (catLower.includes('analytics') || catLower.includes('analisis') || catLower.includes('data')) catIcon = '📊';
    else if (catLower.includes('automation') || catLower.includes('otomasi')) catIcon = '⚡';
    else if (catLower.includes('business') || catLower.includes('account') || catLower.includes('manajemen')) catIcon = '💼';
    else if (catLower.includes('tool') || catLower.includes('perangkat') || catLower.includes('developer')) catIcon = '🛠️';

    const tagsHtml = skillGroup.skills && skillGroup.skills.length > 0 ? `<div class="tags-flex">${skillGroup.skills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}</div>` : '';

    return `
      <div class="skill-group reveal show" data-id="${skillGroup.id}">
        <div class="skill-group-header">
          <div class="skill-group-title">
            <span>${catIcon}</span>
            <span>${escapeHtml(skillGroup.category)}</span>
          </div>
          <span class="skill-count-badge">${(skillGroup.skills || []).length} skills</span>
        </div>
        ${tagsHtml}
      </div>
    `;
  }).join('');
}

function renderEducation() {
  const eduContainer = safeGetElement(CONFIG.DOM_IDS.EDU_LIST);
  if (eduContainer && state.education.length > 0) {
    eduContainer.innerHTML = state.education.map(edu => {
      const thesisHtml = edu.thesis ? `<p style="font-style:italic; font-size:13.5px; color:var(--text-muted); border-left:2px solid var(--border-medium); padding-left:12px; margin-bottom:14px;">"${escapeHtml(edu.thesis)}"</p>` : '';
      const honorsHtml = edu.honors ? `<p style="font-size:13.5px; color:var(--text-secondary);">${escapeHtml(edu.honors)}</p>` : '';

      return `
        <div class="edu-card reveal show" data-id="${edu.id}">
          <div class="mono" style="font-size:12px; color:var(--accent-blue); margin-bottom:8px;">${escapeHtml(edu.period)}</div>
          <h3 style="font-size:19px; font-weight:600; color:#fff; margin-bottom:6px;">${escapeHtml(edu.institution)}</h3>
          <p style="color:var(--text-secondary); font-size:14px; margin-bottom:12px;">${escapeHtml(edu.degree)}</p>
          ${thesisHtml}
          ${honorsHtml}
        </div>
      `;
    }).join('');
  }

  const certContainer = safeGetElement(CONFIG.DOM_IDS.CERT_LIST);
  if (certContainer && state.certifications.length > 0) {
    certContainer.innerHTML = state.certifications.map(cert => {
      const isAward = cert.icon === 'star';
      const iconSymbol = isAward ? '★' : '✓';
      const iconColor = isAward ? 'var(--accent-amber)' : 'var(--accent-emerald)';
      const tagLabel = isAward ? 'Award / Recognition' : 'Certified';

      const mediaHeaderHtml = cert.image
        ? `<div class="cert-thumb-wrap" onclick="viewCertImage('${cert.id}')" title="Click to zoom certificate preview">
             <img src="${escapeHtml(cert.image)}" alt="${escapeHtml(cert.title)}" class="cert-thumb-img" loading="lazy" />
             <div class="cert-thumb-overlay">
               <span class="cert-thumb-badge">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                 <span>Preview Full</span>
               </span>
             </div>
           </div>`
        : `<div class="cert-award-banner">
             <div><span class="badge-pill amber" style="font-size:10.5px;">${tagLabel}</span></div>
             <div class="cert-award-icon">${iconSymbol}</div>
           </div>`;

      const descHtml = cert.desc
        ? `<div class="cert-desc-text">${escapeHtml(cert.desc)}</div>`
        : '<div class="cert-desc-text" style="color:var(--text-muted); font-style:italic;">Verified competence & credential completion.</div>';

      const actionBtnHtml = cert.image ? '' : `<div class="cert-footer-row"><span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">Internal Company Award</span></div>`;

      return `
        <div class="cert-card reveal show" data-id="${cert.id}">
          ${mediaHeaderHtml}
          <div class="cert-body">
            <div class="cert-meta-row">
              <span class="cert-icon-tag" style="color:${iconColor};">
                <span>${iconSymbol}</span><span style="color:var(--text-secondary);">${tagLabel}</span>
              </span>
              <span class="cert-date-text">${escapeHtml(cert.issuer_date || '')}</span>
            </div>
            <h4 class="cert-title-text">${escapeHtml(cert.title)}</h4>
            ${descHtml}
            ${actionBtnHtml}
          </div>
        </div>
      `;
    }).join('');
  }
}

function renderUI() {
  renderExperiences();
  renderProjects();
  renderSkills();
  renderEducation();
  applyRevealAnimations();
}

// ==========================================
// 6. MAIN ENTRY POINT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  try {
    loadData();
    renderUI();

    ThemeManager.init();
    ScrollManager.init();
    LightboxManager.init();
    handleCVDownloads();
  } catch (error) {
    console.error("Initialization failed:", error);
  }
});
