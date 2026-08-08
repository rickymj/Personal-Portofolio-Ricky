/**
 * Ricky Muhammad Jufrizal — Portfolio Public Controller
 * 100% Clean Public Experience (No CMS / Admin Overheads)
 */

// Global State (Loaded directly from js/data.js)
let experiences = [];
let projects = [];
let skills = [];
let education = [];
let certifications = [];

// Helper: Escape HTML special characters
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 1. DATA INITIALIZATION
function loadAllData() {
  experiences = typeof EXPERIENCES_EN !== 'undefined' ? [...EXPERIENCES_EN] : (typeof DEFAULT_EXPERIENCES !== 'undefined' ? [...DEFAULT_EXPERIENCES] : []);
  projects = typeof PROJECTS_EN !== 'undefined' ? [...PROJECTS_EN] : (typeof DEFAULT_PROJECTS !== 'undefined' ? [...DEFAULT_PROJECTS] : []);
  skills = typeof SKILLS_EN !== 'undefined' ? [...SKILLS_EN] : (typeof DEFAULT_SKILLS !== 'undefined' ? [...DEFAULT_SKILLS] : []);
  education = typeof EDUCATION_EN !== 'undefined' ? [...EDUCATION_EN] : (typeof DEFAULT_EDUCATION !== 'undefined' ? [...DEFAULT_EDUCATION] : []);
  certifications = typeof CERTIFICATIONS_EN !== 'undefined' ? [...CERTIFICATIONS_EN] : (typeof DEFAULT_CERTIFICATIONS !== 'undefined' ? [...DEFAULT_CERTIFICATIONS] : []);
}

// 2. RENDERING CONTROLLERS

// A. Render Work Experience
function renderExperiences() {
  const container = document.getElementById('experienceList');
  if (!container) return;

  container.innerHTML = experiences.map((exp) => {
    const badgesHtml = (exp.badges && exp.badges.length > 0)
      ? `<div class="exp-badges">
          ${exp.badges.map(b => {
            let colorClass = '';
            if (b.includes('SLA') || b.includes('Gross Margin')) colorClass = 'emerald';
            if (b.includes('Revenue') || b.includes('IDR 2B') || b.includes('Award')) colorClass = 'amber';
            return `<span class="badge-pill ${colorClass}">${escapeHtml(b)}</span>`;
          }).join('')}
         </div>`
      : '';

    const bulletsHtml = (exp.bullets && exp.bullets.length > 0)
      ? `<ul class="exp-bullets">
          ${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
         </ul>`
      : '';

    const deptText = exp.department ? ` • <span style="color:var(--text-muted);">${escapeHtml(exp.department)}</span>` : '';
    const orgSuffixText = exp.org_suffix ? ` <span class="org-suffix">${escapeHtml(exp.org_suffix)}</span>` : '';

    return `
      <div class="exp-item reveal show" data-id="${exp.id}">
        <div class="exp-node"></div>
        <div class="exp-card">
          <div class="exp-card-header">
            <div>
              <div class="exp-company">
                ${escapeHtml(exp.company)}${orgSuffixText}
              </div>
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

// B. Render Projects & Case Studies
function renderProjects() {
  const container = document.getElementById('projectList');
  if (!container) return;

  container.innerHTML = projects.map((proj) => {
    const tagsHtml = (proj.tags && proj.tags.length > 0)
      ? `<div class="proj-tags">
          ${proj.tags.map(t => `<span class="proj-tag">${escapeHtml(t)}</span>`).join('')}
         </div>`
      : '';

    const bulletsHtml = (proj.bullets && proj.bullets.length > 0)
      ? `<ul class="proj-bullets">
          ${proj.bullets.map(b => {
            const colonIdx = b.indexOf(':');
            if (colonIdx > 0 && colonIdx < 35) {
              const prefix = b.substring(0, colonIdx).trim();
              const content = b.substring(colonIdx + 1);
              const pLower = prefix.toLowerCase();
              let badgeClass = 'proj-step-label';
              if (pLower.includes('impact') || pLower.includes('hasil') || pLower.includes('dampak') || pLower.includes('numbers')) {
                badgeClass += ' label-impact';
              } else if (pLower.includes('data') || pLower.includes('approach') || pLower.includes('pendekatan') || pLower.includes('aksi') || pLower.includes('action')) {
                badgeClass += ' label-approach';
              } else if (pLower.includes('problem') || pLower.includes('masalah') || pLower.includes('konteks') || pLower.includes('context')) {
                badgeClass += ' label-problem';
              }
              return `<li><span class="${badgeClass}">${escapeHtml(prefix)}</span>${escapeHtml(content)}</li>`;
            }
            return `<li>${escapeHtml(b)}</li>`;
          }).join('')}
         </ul>`
      : '';

    const linkHtml = proj.link
      ? `<div class="proj-link-wrap">
          <a href="${escapeHtml(proj.link)}" target="_blank" rel="noopener noreferrer" class="link-cyan">
            <span>View Project</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>`
      : '';

    const imageHtml = proj.image
      ? `<figure class="proj-media">
          <img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.imageCaption || proj.title)} project preview" style="cursor:zoom-in;" onclick="openImageLightbox('${escapeHtml(proj.image)}', '${escapeHtml(proj.title)}')">
          ${proj.imageCaption ? `<figcaption>${escapeHtml(proj.imageCaption)}</figcaption>` : ''}
          ${linkHtml}
        </figure>`
      : '';

    return `
      <div class="proj-card reveal show" data-id="${proj.id}">
        <div class="card-glow-bar"></div>
        <h3 class="proj-title">${escapeHtml(proj.title)}</h3>
        ${tagsHtml}
        ${imageHtml}
        ${bulletsHtml}
        ${!proj.image ? linkHtml : ''}
      </div>
    `;
  }).join('');
}

// C. Render Skills
function renderSkills() {
  const container = document.getElementById('skillList');
  if (!container) return;

  container.innerHTML = skills.map((skillGroup) => {
    const catLower = (skillGroup.category || '').toLowerCase();
    let catIcon = '🔹';
    if (catLower.includes('analytics') || catLower.includes('analisis') || catLower.includes('data')) catIcon = '📊';
    else if (catLower.includes('automation') || catLower.includes('otomasi')) catIcon = '⚡';
    else if (catLower.includes('business') || catLower.includes('account') || catLower.includes('manajemen')) catIcon = '💼';
    else if (catLower.includes('tool') || catLower.includes('perangkat') || catLower.includes('developer')) catIcon = '🛠️';

    const count = (skillGroup.skills || []).length;

    const tagsHtml = (skillGroup.skills && skillGroup.skills.length > 0)
      ? `<div class="tags-flex">
          ${skillGroup.skills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
         </div>`
      : '';

    return `
      <div class="skill-group reveal show" data-id="${skillGroup.id}">
        <div class="skill-group-header">
          <div class="skill-group-title">
            <span>${catIcon}</span>
            <span>${escapeHtml(skillGroup.category)}</span>
          </div>
          <span class="skill-count-badge">${count} skills</span>
        </div>
        ${tagsHtml}
      </div>
    `;
  }).join('');
}

// D. Render Education & Certifications
function renderEducation() {
  const eduContainer = document.getElementById('eduList');
  const certContainer = document.getElementById('certList');

  // 1. Academic Degrees
  if (eduContainer) {
    eduContainer.innerHTML = education.map((edu) => {
      const thesisHtml = edu.thesis
        ? `<p style="font-style:italic; font-size:13.5px; color:var(--text-muted); border-left:2px solid var(--border-medium); padding-left:12px; margin-bottom:14px;">"${escapeHtml(edu.thesis)}"</p>`
        : '';

      const honorsHtml = edu.honors
        ? `<p style="font-size:13.5px; color:var(--text-secondary);">${escapeHtml(edu.honors)}</p>`
        : '';

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

  // 2. Certifications & Honors Grid
  if (certContainer) {
    certContainer.innerHTML = certifications.map((cert) => {
      const isAward = cert.icon === 'star';
      const iconSymbol = isAward ? '★' : '✓';
      const iconColor = isAward ? 'var(--accent-amber)' : 'var(--accent-emerald)';
      const tagLabel = isAward ? 'Award / Recognition' : 'Certified';

      let mediaHeaderHtml = '';
      if (cert.image) {
        mediaHeaderHtml = `
          <div class="cert-thumb-wrap" onclick="viewCertImage('${cert.id}')" title="Click to zoom certificate preview">
            <img src="${escapeHtml(cert.image)}" alt="${escapeHtml(cert.title)}" class="cert-thumb-img" loading="lazy" />
            <div class="cert-thumb-overlay">
              <span class="cert-thumb-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
                <span>Preview Full</span>
              </span>
            </div>
          </div>
        `;
      } else {
        mediaHeaderHtml = `
          <div class="cert-award-banner">
            <div>
              <span class="badge-pill amber" style="font-size:10.5px;">${tagLabel}</span>
            </div>
            <div class="cert-award-icon">${iconSymbol}</div>
          </div>
        `;
      }

      const descHtml = cert.desc
        ? `<div class="cert-desc-text">${escapeHtml(cert.desc)}</div>`
        : '<div class="cert-desc-text" style="color:var(--text-muted); font-style:italic;">Verified competence & credential completion.</div>';

      const actionBtnHtml = cert.image
        ? `<button class="btn btn-secondary btn-sm" onclick="viewCertImage('${cert.id}')" style="font-size:11.5px; padding:4px 10px; gap:6px; border-color:var(--border-subtle);">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
               <circle cx="12" cy="12" r="3"></circle>
             </svg>
             <span>View Certificate</span>
           </button>`
        : `<span style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">Internal Company Award</span>`;

      return `
        <div class="cert-card reveal show" data-id="${cert.id}">
          ${mediaHeaderHtml}
          <div class="cert-body">
            <div class="cert-meta-row">
              <span class="cert-icon-tag" style="color:${iconColor};">
                <span>${iconSymbol}</span>
                <span style="color:var(--text-secondary);">${tagLabel}</span>
              </span>
              <span class="cert-date-text">${escapeHtml(cert.issuer_date || '')}</span>
            </div>
            <h4 class="cert-title-text">${escapeHtml(cert.title)}</h4>
            ${descHtml}
            <div class="cert-footer-row">
              ${actionBtnHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Master Render All
function renderAll() {
  renderExperiences();
  renderProjects();
  renderSkills();
  renderEducation();
  applyRevealAnimations();
}

// 3. IMAGE LIGHTBOX VIEWER
function viewCertImage(id) {
  const cert = certifications.find(c => c.id === id);
  if (!cert || !cert.image) return;
  openImageLightbox(cert.image, cert.title || 'Certificate Preview');
}

function openImageLightbox(src, title = 'Image Preview') {
  const modal = document.getElementById('certImageModal');
  const modalTitle = document.getElementById('certImageModalTitle');
  const imgEl = document.getElementById('certImageModalImg');
  if (imgEl && src) {
    imgEl.src = src;
  }
  if (modalTitle && title) {
    modalTitle.innerHTML = `<span>${escapeHtml(title)}</span>`;
  }
  if (modal) modal.classList.add('open');
}

function closeImageLightbox() {
  const modal = document.getElementById('certImageModal');
  if (modal) modal.classList.remove('open');
}

// 4. SCROLL REVEAL ANIMATIONS
function applyRevealAnimations() {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
}

// 5. INITIALIZATION & EVENT BINDINGS
document.addEventListener('DOMContentLoaded', () => {
  loadAllData();
  renderAll();

  // Lightbox Modal Close Listeners
  const btnCloseCertTop = document.getElementById('btnCloseCertImageModal');
  const btnCloseCertBottom = document.getElementById('btnCloseCertImageModalBottom');
  const certModal = document.getElementById('certImageModal');

  if (btnCloseCertTop) btnCloseCertTop.addEventListener('click', closeImageLightbox);
  if (btnCloseCertBottom) btnCloseCertBottom.addEventListener('click', closeImageLightbox);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeImageLightbox();
    });
  }

  // Keyboard Escape to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeImageLightbox();
  });
});
