/**
 * Main Portfolio Application Controller
 * Manages State & CRUD for Experience, Projects, Skills, Education & Certifications,
 * Synchronized Edit Mode, Scroll Reveal, and HTML/JSON Export
 */

// Storage Keys
const STORAGE_KEYS = {
  experiences: 'rmj_portfolio_experiences_v8_en',
  projects: 'rmj_portfolio_projects_v8_en',
  skills: 'rmj_portfolio_skills_v8_en',
  education: 'rmj_portfolio_education_v8_en',
  certifications: 'rmj_portfolio_certifications_v8_en'
};

// Global State
let experiences = [];
let projects = [];
let skills = [];
let education = [];
let certifications = [];
let isEditMode = false;

// ============================================================================
// 1. STORAGE & DATA MANAGEMENT
// ============================================================================

function loadList(key, defaults, label) {
  try {
    const stored = localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaults];
  } catch (e) {
    console.error(`Error reading ${label}:`, e);
    return [...defaults];
  }
}

function loadAllData() {
  experiences = loadList(STORAGE_KEYS.experiences, typeof DEFAULT_EXPERIENCES !== 'undefined' ? DEFAULT_EXPERIENCES : [], 'experiences');
  projects = loadList(STORAGE_KEYS.projects, typeof DEFAULT_PROJECTS !== 'undefined' ? DEFAULT_PROJECTS : [], 'projects');
  skills = loadList(STORAGE_KEYS.skills, typeof DEFAULT_SKILLS !== 'undefined' ? DEFAULT_SKILLS : [], 'skills');
  education = loadList(STORAGE_KEYS.education, typeof DEFAULT_EDUCATION !== 'undefined' ? DEFAULT_EDUCATION : [], 'education');
  certifications = loadList(STORAGE_KEYS.certifications, typeof DEFAULT_CERTIFICATIONS !== 'undefined' ? DEFAULT_CERTIFICATIONS : [], 'certifications');

  // Trigger background cloud sync if configured
  syncFromCloud();
}

async function syncFromCloud() {
  if (typeof CloudDB !== 'undefined' && CloudDB.isCloudConnected()) {
    try {
      const expData = await CloudDB.fetchCloudData('experiences');
      if (expData && expData.length) {
        experiences = expData;
        localStorage.setItem(STORAGE_KEYS.experiences, JSON.stringify(experiences));
      }
      const projData = await CloudDB.fetchCloudData('projects');
      if (projData && projData.length) {
        projects = projData;
        localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
      }
      const skillData = await CloudDB.fetchCloudData('skills');
      if (skillData && skillData.length) {
        skills = skillData;
        localStorage.setItem(STORAGE_KEYS.skills, JSON.stringify(skills));
      }
      const eduData = await CloudDB.fetchCloudData('education');
      if (eduData && eduData.length) {
        education = eduData;
        localStorage.setItem(STORAGE_KEYS.education, JSON.stringify(education));
      }
      const certData = await CloudDB.fetchCloudData('certifications');
      if (certData && certData.length) {
        certifications = certData;
        localStorage.setItem(STORAGE_KEYS.certifications, JSON.stringify(certifications));
      }
      renderAll();
    } catch (e) {
      console.warn('Cloud sync background error:', e);
    }
  }
}

function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));

    // Async push to Supabase Cloud DB if connected
    if (typeof CloudDB !== 'undefined' && CloudDB.isCloudConnected()) {
      let table = '';
      if (key === STORAGE_KEYS.experiences) table = 'experiences';
      else if (key === STORAGE_KEYS.projects) table = 'projects';
      else if (key === STORAGE_KEYS.skills) table = 'skills';
      else if (key === STORAGE_KEYS.education) table = 'education';
      else if (key === STORAGE_KEYS.certifications) table = 'certifications';

      if (table) {
        CloudDB.saveCloudData(table, data).then(ok => {
          if (ok) console.log(`[CloudDB] Synced ${table}`);
        });
      }
    }
    return true;
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
    if (typeof showToast === 'function') {
      showToast('Data gagal disimpan ke browser storage.');
    }
    return false;
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function compressImageFile(file, maxSide = 1400, quality = 0.78) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        if (!blob) {
          reject(new Error('Gagal kompres gambar'));
          return;
        }
        try {
          resolve(await readFileAsDataUrl(blob));
        } catch (e) {
          reject(e);
        }
      }, 'image/jpeg', quality);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Gambar tidak dapat dibaca'));
    };

    img.src = url;
  });
}

const CERT_IMAGE_DB_NAME = 'rmj_portfolio_cert_images';
const CERT_IMAGE_STORE_NAME = 'images';
const CERT_IMAGE_PREFIX = 'indexeddb:';

function openCertImageDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(CERT_IMAGE_DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(CERT_IMAGE_STORE_NAME);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function setCertImage(id, dataUrl) {
  const db = await openCertImageDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(CERT_IMAGE_STORE_NAME, 'readwrite');
    tx.objectStore(CERT_IMAGE_STORE_NAME).put(dataUrl, id);
    tx.oncomplete = () => {
      db.close();
      resolve(`${CERT_IMAGE_PREFIX}${id}`);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function getCertImage(src) {
  if (!src || !src.startsWith(CERT_IMAGE_PREFIX)) return src || '';
  const db = await openCertImageDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(CERT_IMAGE_STORE_NAME, 'readonly');
    const request = tx.objectStore(CERT_IMAGE_STORE_NAME).get(src.slice(CERT_IMAGE_PREFIX.length));
    request.onsuccess = () => resolve(request.result || '');
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
  });
}

async function deleteCertImage(id) {
  const db = await openCertImageDb();
  return new Promise((resolve) => {
    const tx = db.transaction(CERT_IMAGE_STORE_NAME, 'readwrite');
    tx.objectStore(CERT_IMAGE_STORE_NAME).delete(id);
    tx.oncomplete = tx.onerror = () => {
      db.close();
      resolve();
    };
  });
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================================
// 2. RENDERING FUNCTIONS
// ============================================================================

// A. Render Experiences
function renderExperiences() {
  const container = document.getElementById('experienceList');
  if (!container) return;

  if (experiences.length === 0) {
    const adminActionHtml = Auth.isAdmin()
      ? `<button class="btn btn-primary btn-sm" onclick="openAddExpModal()">+ Add Your First Experience</button>`
      : '';
    container.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
        <p style="margin-bottom: 12px;">Belum ada pengalaman kerja yang ditambahkan.</p>
        ${adminActionHtml}
      </div>
    `;
    return;
  }

  container.innerHTML = experiences.map((exp, index) => {
    const badgesHtml = (exp.badges && exp.badges.length > 0)
      ? `<div class="exp-badges">
          ${exp.badges.map((b, i) => `<span class="badge-pill ${i % 2 === 0 ? 'emerald' : ''}">${escapeHtml(b)}</span>`).join('')}
         </div>`
      : '';

    const bulletsHtml = (exp.bullets && exp.bullets.length > 0)
      ? `<ul class="exp-bullets">
          ${exp.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
         </ul>`
      : '';

    const roleText = [exp.role, exp.department, exp.type].filter(Boolean).join(' · ');

    const actionButtons = Auth.isAdmin()
      ? `<div class="exp-card-actions">
          ${index > 0 ? `<button class="action-btn" onclick="moveExperience(${index}, -1)" title="Pindah ke Atas">↑</button>` : ''}
          ${index < experiences.length - 1 ? `<button class="action-btn" onclick="moveExperience(${index}, 1)" title="Pindah ke Bawah">↓</button>` : ''}
          <button class="action-btn" onclick="editExperience('${exp.id}')" title="Edit Pengalaman">✏️</button>
          <button class="action-btn delete-btn" onclick="deleteExperience('${exp.id}')" title="Hapus">🗑️</button>
        </div>`
      : '';

    return `
      <div class="exp-item reveal show" data-id="${exp.id}">
        <div class="exp-node"></div>
        <div class="exp-card">
          ${actionButtons}

          <div class="exp-card-header">
            <div>
              <h3 class="exp-company">
                ${escapeHtml(exp.company)}
                ${exp.org_suffix ? `<span class="org-suffix">${escapeHtml(exp.org_suffix)}</span>` : ''}
              </h3>
              <div class="exp-role-row">
                <span>${escapeHtml(roleText)}</span>
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

// B. Render Projects
function renderProjects() {
  const container = document.getElementById('projectList');
  if (!container) return;

  if (projects.length === 0) {
    const adminActionHtml = Auth.isAdmin()
      ? `<button class="btn btn-primary btn-sm" onclick="openAddProjectModal()">+ Add Your First Project</button>`
      : '';
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
        <p style="margin-bottom: 12px;">Belum ada proyek yang ditambahkan.</p>
        ${adminActionHtml}
      </div>
    `;
    return;
  }

  container.innerHTML = projects.map((proj, index) => {
    const tagsHtml = (proj.tags && proj.tags.length > 0)
      ? `<div class="proj-tags">
          ${proj.tags.map(t => `<span class="proj-tag">${escapeHtml(t)}</span>`).join('')}
         </div>`
      : '';

    const bulletsHtml = (proj.bullets && proj.bullets.length > 0)
      ? `<ul class="proj-bullets">
          ${proj.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}
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

    const actionButtons = Auth.isAdmin()
      ? `<div class="proj-card-actions">
          ${index > 0 ? `<button class="action-btn" onclick="moveProject(${index}, -1)" title="Pindah ke Atas">↑</button>` : ''}
          ${index < projects.length - 1 ? `<button class="action-btn" onclick="moveProject(${index}, 1)" title="Pindah ke Bawah">↓</button>` : ''}
          <button class="action-btn" onclick="editProject('${proj.id}')" title="Edit Proyek">✏️</button>
          <button class="action-btn delete-btn" onclick="deleteProject('${proj.id}')" title="Hapus">🗑️</button>
        </div>`
      : '';

    return `
      <div class="proj-card reveal show" data-id="${proj.id}">
        <div class="card-glow-bar"></div>
        ${actionButtons}
        <h3 class="proj-title">${escapeHtml(proj.title)}</h3>
        ${tagsHtml}
        ${imageHtml}
        ${bulletsHtml}
        ${!proj.image ? linkHtml : ''}
      </div>
    `;
  }).join('');
}

// Lightbox / Image Viewer Helpers
async function viewCertImage(id) {
  const cert = certifications.find(c => c.id === id);
  if (!cert || !cert.image) return;
  const src = await getCertImage(cert.image);
  openImageLightbox(src, cert.title || 'Certificate Preview');
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

// C. Render Skills
function renderSkills() {
  const container = document.getElementById('skillList');
  if (!container) return;

  if (skills.length === 0) {
    const adminActionHtml = Auth.isAdmin()
      ? `<button class="btn btn-primary btn-sm" onclick="openAddSkillModal()">+ Add Your First Skill Group</button>`
      : '';
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
        <p style="margin-bottom: 12px;">Belum ada skill group yang ditambahkan.</p>
        ${adminActionHtml}
      </div>
    `;
    return;
  }

  container.innerHTML = skills.map((skillGroup, index) => {
    const tagsHtml = (skillGroup.skills && skillGroup.skills.length > 0)
      ? `<div class="tags-flex">
          ${skillGroup.skills.map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`).join('')}
         </div>`
      : '';

    const actionButtons = Auth.isAdmin()
      ? `<div class="skill-card-actions">
          ${index > 0 ? `<button class="action-btn" onclick="moveSkill(${index}, -1)" title="Pindah ke Atas">↑</button>` : ''}
          ${index < skills.length - 1 ? `<button class="action-btn" onclick="moveSkill(${index}, 1)" title="Pindah ke Bawah">↓</button>` : ''}
          <button class="action-btn" onclick="editSkill('${skillGroup.id}')" title="Edit Skill Group">✏️</button>
          <button class="action-btn delete-btn" onclick="deleteSkill('${skillGroup.id}')" title="Hapus">🗑️</button>
        </div>`
      : '';

    return `
      <div class="skill-group reveal show" data-id="${skillGroup.id}">
        ${actionButtons}
        <div class="skill-group-title">${escapeHtml(skillGroup.category)}</div>
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
    if (education.length === 0) {
      eduContainer.innerHTML = `
        <div class="edu-card reveal show" style="text-align: center; color: var(--text-muted);">
          <p>Belum ada data pendidikan formal.</p>
        </div>
      `;
    } else {
      eduContainer.innerHTML = education.map((edu, index) => {
        const actionButtons = Auth.isAdmin()
          ? `<div class="edu-card-actions">
              ${index > 0 ? `<button class="action-btn" onclick="moveEducation(${index}, -1)" title="Pindah ke Atas">↑</button>` : ''}
              ${index < education.length - 1 ? `<button class="action-btn" onclick="moveEducation(${index}, 1)" title="Pindah ke Bawah">↓</button>` : ''}
              <button class="action-btn" onclick="editEducation('${edu.id}')" title="Edit Pendidikan">✏️</button>
              <button class="action-btn delete-btn" onclick="deleteEducation('${edu.id}')" title="Hapus">🗑️</button>
            </div>`
          : '';

        const thesisHtml = edu.thesis
          ? `<p style="font-style:italic; font-size:13.5px; color:var(--text-muted); border-left:2px solid var(--border-medium); padding-left:12px; margin-bottom:14px;">"${escapeHtml(edu.thesis)}"</p>`
          : '';

        const honorsHtml = edu.honors
          ? `<p style="font-size:13.5px; color:var(--text-secondary);">${escapeHtml(edu.honors)}</p>`
          : '';

        return `
          <div class="edu-card reveal show" data-id="${edu.id}">
            ${actionButtons}
            <div class="mono" style="font-size:12px; color:var(--accent-blue); margin-bottom:8px;">${escapeHtml(edu.period)}</div>
            <h3 style="font-size:19px; font-weight:600; color:#fff; margin-bottom:6px;">${escapeHtml(edu.institution)}</h3>
            <p style="color:var(--text-secondary); font-size:14px; margin-bottom:12px;">${escapeHtml(edu.degree)}</p>
            ${thesisHtml}
            ${honorsHtml}
          </div>
        `;
      }).join('');
    }
  }

  // 2. Certifications
  if (certContainer) {
    if (certifications.length === 0) {
      certContainer.innerHTML = `
        <li style="padding: 20px 0; text-align: center; color: var(--text-muted);">
          Belum ada sertifikasi atau penghargaan.
        </li>
      `;
    } else {
      certContainer.innerHTML = certifications.map((cert, index) => {
        const actionButtons = Auth.isAdmin()
          ? `<div class="cert-item-actions">
              ${index > 0 ? `<button class="action-btn" onclick="moveCertification(${index}, -1)" title="Pindah ke Atas">↑</button>` : ''}
              ${index < certifications.length - 1 ? `<button class="action-btn" onclick="moveCertification(${index}, 1)" title="Pindah ke Bawah">↓</button>` : ''}
              <button class="action-btn" onclick="editCertification('${cert.id}')" title="Edit Sertifikasi">✏️</button>
              <button class="action-btn delete-btn" onclick="deleteCertification('${cert.id}')" title="Hapus">🗑️</button>
            </div>`
          : '';

        const iconSymbol = cert.icon === 'star' ? '★' : '✓';
        const iconColor = cert.icon === 'star' ? 'var(--accent-amber)' : 'var(--accent-emerald)';

        const descHtml = cert.desc
          ? `<div style="font-size:13px; margin-top:2px; color:var(--text-secondary);">${escapeHtml(cert.desc)}</div>`
          : '';

        const imageBtnHtml = cert.image
          ? `<div style="margin-top:8px;">
               <button class="btn btn-secondary btn-sm" onclick="viewCertImage('${cert.id}')" style="font-size:11.5px; padding:3px 8px; gap:4px; border-color:var(--border-medium);">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                   <circle cx="12" cy="12" r="3"></circle>
                 </svg>
                 <span>View Certificate</span>
               </button>
             </div>`
          : '';

        return `
          <li class="cert-item" data-id="${cert.id}">
            ${actionButtons}
            <span class="cert-icon" style="color:${iconColor};">${iconSymbol}</span>
            <div style="flex:1; padding-right: 70px;">
              <strong style="color:#fff;">${escapeHtml(cert.title)}</strong>
              <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">${escapeHtml(cert.issuer_date || '')}</div>
              ${descHtml}
              ${imageBtnHtml}
            </div>
          </li>
        `;
      }).join('');
    }
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

// ============================================================================
// 3. CRUD & MODAL CONTROLLERS
// ============================================================================

// --- A. EXPERIENCE CRUD ---
const expModalEl = document.getElementById('experienceModal');
const expFormEl = document.getElementById('experienceForm');

function openAddExpModal() {
  if (!Auth.isAdmin()) {
    showToast('Silakan login sebagai Admin untuk menambah pengalaman');
    return;
  }
  document.getElementById('modalTitle').textContent = 'Add Experience';
  document.getElementById('formExpId').value = '';
  if (expFormEl) expFormEl.reset();
  if (expModalEl) expModalEl.classList.add('open');
  const comp = document.getElementById('formCompany');
  if (comp) comp.focus();
}

function editExperience(id) {
  if (!Auth.isAdmin()) return;
  const exp = experiences.find(e => e.id === id);
  if (!exp) return;

  document.getElementById('modalTitle').textContent = 'Edit Experience';
  document.getElementById('formExpId').value = exp.id;
  document.getElementById('formCompany').value = exp.company || '';
  document.getElementById('formOrgSuffix').value = exp.org_suffix || '';
  document.getElementById('formRole').value = exp.role || '';
  document.getElementById('formType').value = exp.type || 'Full-time';
  document.getElementById('formDepartment').value = exp.department || '';
  document.getElementById('formDate').value = exp.date || '';
  document.getElementById('formBadges').value = (exp.badges || []).join(', ');
  document.getElementById('formBullets').value = (exp.bullets || []).join('\n');

  if (expModalEl) expModalEl.classList.add('open');
}

function deleteExperience(id) {
  if (!Auth.isAdmin()) return;
  const exp = experiences.find(e => e.id === id);
  if (!exp) return;

  if (confirm(`Yakin ingin menghapus pengalaman di "${exp.company}"?`)) {
    experiences = experiences.filter(e => e.id !== id);
    saveData(STORAGE_KEYS.experiences, experiences);
    renderExperiences();
    showToast('Pengalaman berhasil dihapus');
  }
}

function moveExperience(index, direction) {
  if (!Auth.isAdmin()) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= experiences.length) return;

  const temp = experiences[index];
  experiences[index] = experiences[targetIndex];
  experiences[targetIndex] = temp;

  saveData(STORAGE_KEYS.experiences, experiences);
  renderExperiences();
  showToast('Urutan pengalaman diperbarui');
}

// --- B. PROJECTS CRUD ---
const projModalEl = document.getElementById('projectModal');
const projFormEl = document.getElementById('projectForm');

function openAddProjectModal() {
  if (!Auth.isAdmin()) {
    showToast('Silakan login sebagai Admin untuk menambah proyek');
    return;
  }
  document.getElementById('projectModalTitle').textContent = 'Add Project';
  document.getElementById('formProjId').value = '';
  if (projFormEl) projFormEl.reset();
  const urlInput = document.getElementById('formProjImageUrl');
  if (urlInput) urlInput.value = '';
  document.getElementById('formProjImageData').value = '';
  if (projModalEl) projModalEl.classList.add('open');
  const title = document.getElementById('formProjTitle');
  if (title) title.focus();
}

function editProject(id) {
  if (!Auth.isAdmin()) return;
  const proj = projects.find(p => p.id === id);
  if (!proj) return;

  document.getElementById('projectModalTitle').textContent = 'Edit Project';
  document.getElementById('formProjId').value = proj.id;
  document.getElementById('formProjTitle').value = proj.title || '';
  document.getElementById('formProjTags').value = (proj.tags || []).join(', ');
  document.getElementById('formProjBullets').value = (proj.bullets || []).join('\n');
  document.getElementById('formProjImageData').value = proj.image || '';
  const urlInput = document.getElementById('formProjImageUrl');
  if (urlInput) urlInput.value = (proj.image && proj.image.startsWith('http')) ? proj.image : '';
  document.getElementById('formProjImage').value = '';
  document.getElementById('formProjImageCaption').value = proj.imageCaption || '';
  document.getElementById('formProjLink').value = proj.link || '';

  if (projModalEl) projModalEl.classList.add('open');
}

function deleteProject(id) {
  if (!Auth.isAdmin()) return;
  const proj = projects.find(p => p.id === id);
  if (!proj) return;

  if (confirm(`Yakin ingin menghapus proyek "${proj.title}"?`)) {
    projects = projects.filter(p => p.id !== id);
    saveData(STORAGE_KEYS.projects, projects);
    renderProjects();
    showToast('Proyek berhasil dihapus');
  }
}

function moveProject(index, direction) {
  if (!Auth.isAdmin()) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= projects.length) return;

  const temp = projects[index];
  projects[index] = projects[targetIndex];
  projects[targetIndex] = temp;

  saveData(STORAGE_KEYS.projects, projects);
  renderProjects();
  showToast('Urutan proyek diperbarui');
}

// --- C. SKILLS CRUD ---
const skillModalEl = document.getElementById('skillModal');
const skillFormEl = document.getElementById('skillForm');

function openAddSkillModal() {
  if (!Auth.isAdmin()) {
    showToast('Silakan login sebagai Admin untuk menambah skill group');
    return;
  }
  document.getElementById('skillModalTitle').textContent = 'Add Skill Group';
  document.getElementById('formSkillId').value = '';
  if (skillFormEl) skillFormEl.reset();
  if (skillModalEl) skillModalEl.classList.add('open');
  const cat = document.getElementById('formSkillCategory');
  if (cat) cat.focus();
}

function editSkill(id) {
  if (!Auth.isAdmin()) return;
  const skill = skills.find(s => s.id === id);
  if (!skill) return;

  document.getElementById('skillModalTitle').textContent = 'Edit Skill Group';
  document.getElementById('formSkillId').value = skill.id;
  document.getElementById('formSkillCategory').value = skill.category || '';
  document.getElementById('formSkillTags').value = (skill.skills || []).join(', ');

  if (skillModalEl) skillModalEl.classList.add('open');
}

function deleteSkill(id) {
  if (!Auth.isAdmin()) return;
  const skill = skills.find(s => s.id === id);
  if (!skill) return;

  if (confirm(`Yakin ingin menghapus grup skill "${skill.category}"?`)) {
    skills = skills.filter(s => s.id !== id);
    saveData(STORAGE_KEYS.skills, skills);
    renderSkills();
    showToast('Grup skill berhasil dihapus');
  }
}

function moveSkill(index, direction) {
  if (!Auth.isAdmin()) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= skills.length) return;

  const temp = skills[index];
  skills[index] = skills[targetIndex];
  skills[targetIndex] = temp;

  saveData(STORAGE_KEYS.skills, skills);
  renderSkills();
  showToast('Urutan skill group diperbarui');
}

// --- D. EDUCATION & CERTIFICATIONS CRUD ---
const eduModalEl = document.getElementById('eduModal');
const eduFormEl = document.getElementById('eduForm');

function updateEduModalFields() {
  const itemType = document.getElementById('formEduItemType').value;
  const eduGroup = document.getElementById('eduFieldsGroup');
  const certGroup = document.getElementById('certFieldsGroup');

  if (itemType === 'education') {
    eduGroup.style.display = 'block';
    certGroup.style.display = 'none';
  } else {
    eduGroup.style.display = 'none';
    certGroup.style.display = 'block';
  }
}

function openAddEduModal(defaultType = 'education') {
  if (!Auth.isAdmin()) {
    showToast('Silakan login sebagai Admin untuk menambah pendidikan / sertifikasi');
    return;
  }
  document.getElementById('eduModalTitle').textContent = defaultType === 'education' ? 'Add Education' : 'Add Certification / Award';
  document.getElementById('formEduItemId').value = '';
  document.getElementById('formEduItemType').value = defaultType;
  if (eduFormEl) eduFormEl.reset();
  const certUrlInput = document.getElementById('formCertImageUrl');
  if (certUrlInput) certUrlInput.value = '';
  document.getElementById('formCertImageData').value = '';
  document.getElementById('formEduItemType').value = defaultType;
  updateEduModalFields();
  if (eduModalEl) eduModalEl.classList.add('open');
}

function editEducation(id) {
  if (!Auth.isAdmin()) return;
  const edu = education.find(e => e.id === id);
  if (!edu) return;

  document.getElementById('eduModalTitle').textContent = 'Edit Education';
  document.getElementById('formEduItemId').value = edu.id;
  document.getElementById('formEduItemType').value = 'education';
  document.getElementById('formEduInstitution').value = edu.institution || '';
  document.getElementById('formEduPeriod').value = edu.period || '';
  document.getElementById('formEduDegree').value = edu.degree || '';
  document.getElementById('formEduThesis').value = edu.thesis || '';
  document.getElementById('formEduHonor').value = edu.honors || '';

  updateEduModalFields();
  if (eduModalEl) eduModalEl.classList.add('open');
}

function deleteEducation(id) {
  if (!Auth.isAdmin()) return;
  const edu = education.find(e => e.id === id);
  if (!edu) return;

  if (confirm(`Yakin ingin menghapus pendidikan "${edu.institution}"?`)) {
    education = education.filter(e => e.id !== id);
    saveData(STORAGE_KEYS.education, education);
    renderEducation();
    showToast('Data pendidikan berhasil dihapus');
  }
}

function moveEducation(index, direction) {
  if (!Auth.isAdmin()) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= education.length) return;

  const temp = education[index];
  education[index] = education[targetIndex];
  education[targetIndex] = temp;

  saveData(STORAGE_KEYS.education, education);
  renderEducation();
  showToast('Urutan pendidikan diperbarui');
}

function editCertification(id) {
  if (!Auth.isAdmin()) return;
  const cert = certifications.find(c => c.id === id);
  if (!cert) return;

  document.getElementById('eduModalTitle').textContent = 'Edit Certification / Award';
  document.getElementById('formEduItemId').value = cert.id;
  document.getElementById('formEduItemType').value = 'certification';
  document.getElementById('formCertTitle').value = cert.title || '';
  document.getElementById('formCertIssuerDate').value = cert.issuer_date || '';
  document.getElementById('formCertIcon').value = cert.icon || 'check';
  document.getElementById('formCertDesc').value = cert.desc || '';
  document.getElementById('formCertImageData').value = cert.image || '';
  const certUrlInput = document.getElementById('formCertImageUrl');
  if (certUrlInput) certUrlInput.value = (cert.image && cert.image.startsWith('http')) ? cert.image : '';
  document.getElementById('formCertImage').value = '';

  updateEduModalFields();
  if (eduModalEl) eduModalEl.classList.add('open');
}

async function deleteCertification(id) {
  if (!Auth.isAdmin()) return;
  const cert = certifications.find(c => c.id === id);
  if (!cert) return;

  if (confirm(`Yakin ingin menghapus sertifikasi "${cert.title}"?`)) {
    certifications = certifications.filter(c => c.id !== id);
    saveData(STORAGE_KEYS.certifications, certifications);
    await deleteCertImage(id);
    renderEducation();
    showToast('Sertifikasi berhasil dihapus');
  }
}

function moveCertification(index, direction) {
  if (!Auth.isAdmin()) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= certifications.length) return;

  const temp = certifications[index];
  certifications[index] = certifications[targetIndex];
  certifications[targetIndex] = temp;

  saveData(STORAGE_KEYS.certifications, certifications);
  renderEducation();
  showToast('Urutan sertifikasi diperbarui');
}

// Close All Modals Helper
function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('open');
  });
}

// ============================================================================
// 4. FORM SUBMISSION EVENT LISTENERS
// ============================================================================

function initFormSubmissions() {
  // 1. Experience Form
  if (expFormEl) {
    expFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('formExpId').value || ('exp_' + Date.now());
      const company = document.getElementById('formCompany').value.trim();
      const org_suffix = document.getElementById('formOrgSuffix').value.trim();
      const role = document.getElementById('formRole').value.trim();
      const type = document.getElementById('formType').value;
      const department = document.getElementById('formDepartment').value.trim();
      const date = document.getElementById('formDate').value.trim();
      const badgesRaw = document.getElementById('formBadges').value.trim();
      const bulletsRaw = document.getElementById('formBullets').value.trim();

      const badges = badgesRaw ? badgesRaw.split(',').map(b => b.trim()).filter(Boolean) : [];
      const bullets = bulletsRaw ? bulletsRaw.split('\n').map(b => b.trim()).filter(Boolean) : [];

      const item = { id, company, org_suffix, role, type, department, date, badges, bullets };
      const idx = experiences.findIndex(e => e.id === id);
      if (idx >= 0) {
        experiences[idx] = item;
        showToast('Pengalaman berhasil diperbarui');
      } else {
        experiences.unshift(item);
        showToast('Pengalaman baru berhasil ditambahkan!');
      }

      saveData(STORAGE_KEYS.experiences, experiences);
      renderExperiences();
      closeAllModals();
    });
  }

  // 2. Project Form
  if (projFormEl) {
    projFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('formProjId').value || ('proj_' + Date.now());
      const title = document.getElementById('formProjTitle').value.trim();
      const tagsRaw = document.getElementById('formProjTags').value.trim();
      const bulletsRaw = document.getElementById('formProjBullets').value.trim();
      const link = document.getElementById('formProjLink').value.trim();
      const urlInput = document.getElementById('formProjImageUrl');
      const image = (urlInput && urlInput.value.trim()) || document.getElementById('formProjImageData').value.trim();
      const imageCaption = document.getElementById('formProjImageCaption').value.trim();

      const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];
      const bullets = bulletsRaw ? bulletsRaw.split('\n').map(b => b.trim()).filter(Boolean) : [];

      const item = { id, title, tags, bullets, image, imageCaption, link };
      const idx = projects.findIndex(p => p.id === id);
      if (idx >= 0) {
        projects[idx] = item;
        showToast('Proyek berhasil diperbarui');
      } else {
        projects.unshift(item);
        showToast('Proyek baru berhasil ditambahkan!');
      }

      saveData(STORAGE_KEYS.projects, projects);
      renderProjects();
      closeAllModals();
    });
  }

  // 3. Skill Form
  if (skillFormEl) {
    skillFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('formSkillId').value || ('skill_' + Date.now());
      const category = document.getElementById('formSkillCategory').value.trim();
      const skillsRaw = document.getElementById('formSkillTags').value.trim();

      const skillList = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

      const item = { id, category, skills: skillList };
      const idx = skills.findIndex(s => s.id === id);
      if (idx >= 0) {
        skills[idx] = item;
        showToast('Grup skill berhasil diperbarui');
      } else {
        skills.push(item);
        showToast('Grup skill baru berhasil ditambahkan!');
      }

      saveData(STORAGE_KEYS.skills, skills);
      renderSkills();
      closeAllModals();
    });
  }

  // 4. Education & Certification Form
  if (eduFormEl) {
    eduFormEl.addEventListener('submit', async (e) => {
      e.preventDefault();
      const itemType = document.getElementById('formEduItemType').value;
      const id = document.getElementById('formEduItemId').value || ((itemType === 'education' ? 'edu_' : 'cert_') + Date.now());

      if (itemType === 'education') {
        const institution = document.getElementById('formEduInstitution').value.trim();
        const period = document.getElementById('formEduPeriod').value.trim();
        const degree = document.getElementById('formEduDegree').value.trim();
        const thesis = document.getElementById('formEduThesis').value.trim();
        const honors = document.getElementById('formEduHonor').value.trim();

        const item = { id, institution, period, degree, thesis, honors };
        const idx = education.findIndex(ed => ed.id === id);
        if (idx >= 0) {
          education[idx] = item;
          showToast('Data pendidikan berhasil diperbarui');
        } else {
          education.unshift(item);
          showToast('Data pendidikan baru berhasil ditambahkan!');
        }
        saveData(STORAGE_KEYS.education, education);
      } else {
        const title = document.getElementById('formCertTitle').value.trim();
        const issuer_date = document.getElementById('formCertIssuerDate').value.trim();
        const icon = document.getElementById('formCertIcon').value;
        const desc = document.getElementById('formCertDesc').value.trim();
        const certUrlInput = document.getElementById('formCertImageUrl');
        let image = (certUrlInput && certUrlInput.value.trim()) || document.getElementById('formCertImageData').value.trim();

        if (image.startsWith('data:')) {
          image = await setCertImage(id, image);
        }

        const item = { id, title, issuer_date, icon, desc, image };
        const idx = certifications.findIndex(c => c.id === id);
        if (idx >= 0) {
          certifications[idx] = item;
          showToast('Sertifikasi berhasil diperbarui');
        } else {
          certifications.unshift(item);
          showToast('Sertifikasi baru berhasil ditambahkan!');
        }
        saveData(STORAGE_KEYS.certifications, certifications);
      }

      renderEducation();
      closeAllModals();
    });

    const typeSelect = document.getElementById('formEduItemType');
    if (typeSelect) {
      typeSelect.addEventListener('change', updateEduModalFields);
    }
  }
}

// ============================================================================
// 5. UNIFIED EDIT MODE TOGGLE
// ============================================================================

function toggleEditMode() {
  if (!Auth.isAdmin()) {
    showToast('Hanya Admin yang dapat menggunakan Edit Mode');
    return;
  }
  isEditMode = !isEditMode;
  document.body.classList.toggle('edit-mode-active', isEditMode);

  const labels = document.querySelectorAll('.edit-mode-label');
  const buttons = document.querySelectorAll('.btn-toggle-edit-mode');

  labels.forEach(lbl => {
    lbl.textContent = isEditMode ? 'Exit Edit' : 'Edit Mode';
  });

  buttons.forEach(btn => {
    if (isEditMode) {
      btn.classList.add('btn-primary');
      btn.classList.remove('btn-secondary');
    } else {
      btn.classList.add('btn-secondary');
      btn.classList.remove('btn-primary');
    }
  });

  showToast(isEditMode ? 'Mode Edit aktif' : 'Mode Edit nonaktif');
}

// ============================================================================
// 6. SCROLL REVEAL & EXPORT HELPERS
// ============================================================================

async function resetToDefault() {
  if (!Auth.isAdmin()) {
    showToast('Hanya Admin yang dapat me-reset data');
    return;
  }
  if (confirm('Kembalikan seluruh data portofolio ke default awal?')) {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    indexedDB.deleteDatabase(CERT_IMAGE_DB_NAME);

    experiences = typeof DEFAULT_EXPERIENCES !== 'undefined' ? [...DEFAULT_EXPERIENCES] : [];
    projects = typeof DEFAULT_PROJECTS !== 'undefined' ? [...DEFAULT_PROJECTS] : [];
    skills = typeof DEFAULT_SKILLS !== 'undefined' ? [...DEFAULT_SKILLS] : [];
    education = typeof DEFAULT_EDUCATION !== 'undefined' ? [...DEFAULT_EDUCATION] : [];
    certifications = typeof DEFAULT_CERTIFICATIONS !== 'undefined' ? [...DEFAULT_CERTIFICATIONS] : [];

    renderAll();
    showToast('Seluruh data berhasil di-reset ke default');
  }
}

function exportDataJSON() {
  const exportPayload = {
    profile: {
      ...(typeof DEFAULT_PROFILE !== 'undefined' ? DEFAULT_PROFILE : {}),
      photo: (typeof ImageUploader !== 'undefined' && ImageUploader.getEffectivePhoto) ? ImageUploader.getEffectivePhoto() : ''
    },
    experiences,
    projects,
    skills,
    education,
    certifications,
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Data JSON lengkap berhasil diekspor!');
}

function exportStandaloneHtml() {
  const blob = new Blob(['<!DOCTYPE html>\n<html lang="en" class="dark">\n' + document.documentElement.innerHTML + '\n</html>'], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('File index.html berhasil diekspor!');
}

function showToast(msg) {
  const toast = document.getElementById('toastMessage');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;
  text.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

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

// ============================================================================
// 7. INITIALIZATION & EVENT BINDINGS
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Init Modules
  if (typeof CloudDB !== 'undefined') CloudDB.init();
  if (typeof Auth !== 'undefined') Auth.init();
  if (typeof ImageUploader !== 'undefined') ImageUploader.init();

  loadAllData();
  renderAll();
  initFormSubmissions();

  // Top Nav Buttons
  const btnAddNav = document.getElementById('btnOpenAddModal');
  const btnExport = document.getElementById('btnExportHtml');
  const btnExportJSON = document.getElementById('btnExportJSON');
  const btnReset = document.getElementById('btnResetData');

  if (btnAddNav) btnAddNav.addEventListener('click', openAddExpModal);
  if (btnExport) btnExport.addEventListener('click', exportStandaloneHtml);
  if (btnExportJSON) btnExportJSON.addEventListener('click', exportDataJSON);
  if (btnReset) btnReset.addEventListener('click', resetToDefault);

  // Cloud DB Modal
  const btnCloudDb = document.getElementById('btnOpenCloudDbModal');
  const cloudDbModal = document.getElementById('cloudDbModal');
  const btnCloseCloudDb = document.getElementById('btnCloseCloudDbModal');
  const btnCancelCloudDb = document.getElementById('btnCancelCloudDb');
  const cloudDbForm = document.getElementById('cloudDbForm');

  if (btnCloudDb && cloudDbModal) {
    btnCloudDb.addEventListener('click', () => {
      if (!Auth.isAdmin()) {
        showToast('Hanya Admin yang dapat mengatur Cloud Database');
        return;
      }
      if (typeof CloudDB !== 'undefined') {
        const urlEl = document.getElementById('cfgSupabaseUrl');
        const keyEl = document.getElementById('cfgSupabaseKey');
        const bucketEl = document.getElementById('cfgStorageBucket');
        const imgbbEl = document.getElementById('cfgImgbbKey');
        if (urlEl) urlEl.value = CloudDB.config.supabaseUrl || '';
        if (keyEl) keyEl.value = CloudDB.config.supabaseAnonKey || '';
        if (bucketEl) bucketEl.value = CloudDB.config.storageBucket || 'portfolio-images';
        if (imgbbEl) imgbbEl.value = CloudDB.config.imgbbApiKey || '';
      }
      cloudDbModal.classList.add('open');
    });
  }

  if (btnCloseCloudDb) btnCloseCloudDb.addEventListener('click', () => cloudDbModal.classList.remove('open'));
  if (btnCancelCloudDb) btnCancelCloudDb.addEventListener('click', () => cloudDbModal.classList.remove('open'));

  if (cloudDbForm) {
    cloudDbForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const supabaseUrl = document.getElementById('cfgSupabaseUrl').value.trim();
      const supabaseAnonKey = document.getElementById('cfgSupabaseKey').value.trim();
      const storageBucket = document.getElementById('cfgStorageBucket').value.trim() || 'portfolio-images';
      const imgbbApiKey = document.getElementById('cfgImgbbKey').value.trim();

      if (typeof CloudDB !== 'undefined') {
        CloudDB.saveConfig({ supabaseUrl, supabaseAnonKey, storageBucket, imgbbApiKey });
      }
      cloudDbModal.classList.remove('open');
      showToast('Konfigurasi Cloud DB disimpan! Memulai sinkronisasi...');
      syncFromCloud();
    });
  }

  // Section Add Buttons
  const btnAddExp = document.getElementById('btnOpenAddExpModal');
  const btnAddProj = document.getElementById('btnOpenAddProjectModal');
  const btnAddSkill = document.getElementById('btnOpenAddSkillModal');
  const btnAddEdu = document.getElementById('btnOpenAddEduModal');

  if (btnAddExp) btnAddExp.addEventListener('click', openAddExpModal);
  if (btnAddProj) btnAddProj.addEventListener('click', openAddProjectModal);
  if (btnAddSkill) btnAddSkill.addEventListener('click', openAddSkillModal);
  if (btnAddEdu) btnAddEdu.addEventListener('click', () => openAddEduModal('education'));

  // Project Image File Picker
  const projImageInput = document.getElementById('formProjImage');
  if (projImageInput) {
    projImageInput.addEventListener('change', async () => {
      const file = projImageInput.files && projImageInput.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('File harus berupa gambar (JPG, PNG, WebP)');
        projImageInput.value = '';
        return;
      }
      if (typeof CloudDB !== 'undefined' && (CloudDB.isCloudConnected() || CloudDB.config.imgbbApiKey)) {
        try {
          showToast('Mengunggah gambar proyek ke cloud...');
          const uploadedUrl = await CloudDB.uploadImage(file, 'projects');
          document.getElementById('formProjImageData').value = uploadedUrl;
          const urlInput = document.getElementById('formProjImageUrl');
          if (urlInput) urlInput.value = uploadedUrl;
          showToast('Gambar proyek berhasil diunggah ke cloud!');
          return;
        } catch (e) {
          console.warn('Direct cloud upload failed, using local compress:', e);
        }
      }
      try {
        document.getElementById('formProjImageData').value = await compressImageFile(file, 1200, 0.76);
        showToast('Foto proyek siap disimpan');
      } catch (e) {
        showToast('Gagal memproses gambar');
      }
    });
  }

  // Cert Image File Picker
  const certImageInput = document.getElementById('formCertImage');
  if (certImageInput) {
    certImageInput.addEventListener('change', async () => {
      const file = certImageInput.files && certImageInput.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showToast('File harus berupa gambar (JPG, PNG, WebP)');
        certImageInput.value = '';
        return;
      }
      if (typeof CloudDB !== 'undefined' && (CloudDB.isCloudConnected() || CloudDB.config.imgbbApiKey)) {
        try {
          showToast('Mengunggah gambar sertifikat ke cloud...');
          const uploadedUrl = await CloudDB.uploadImage(file, 'certs');
          document.getElementById('formCertImageData').value = uploadedUrl;
          const urlInput = document.getElementById('formCertImageUrl');
          if (urlInput) urlInput.value = uploadedUrl;
          showToast('Gambar sertifikat berhasil diunggah ke cloud!');
          return;
        } catch (e) {
          console.warn('Direct cloud upload failed, using local compress:', e);
        }
      }
      try {
        document.getElementById('formCertImageData').value = await compressImageFile(file, 1400, 0.78);
        showToast('Foto sertifikat siap disimpan');
      } catch (e) {
        console.error('Error processing certificate image:', e);
        showToast('Gambar sertifikat gagal diproses');
        certImageInput.value = '';
      }
    });
  }

  // Download CV Toast Check
  const btnDownloadCV = document.getElementById('btnDownloadCV');
  if (btnDownloadCV) {
    btnDownloadCV.addEventListener('click', () => {
      fetch('assets/Ricky_Muhammad_Jufrizal_CV.pdf', { method: 'HEAD' })
        .then(res => {
          if (!res.ok) {
            showToast('Catatan: Tempatkan file CV PDF di folder assets/Ricky_Muhammad_Jufrizal_CV.pdf');
          }
        })
        .catch(() => {});
    });
  }

  // Section Edit Mode Toggle Buttons
  document.querySelectorAll('.btn-toggle-edit-mode').forEach(btn => {
    btn.addEventListener('click', toggleEditMode);
  });

  // Modal Cancel / Close Buttons
  const modalCloseMap = [
    { closeBtn: 'btnCloseModal', cancelBtn: 'btnCancelModal' },
    { closeBtn: 'btnCloseProjectModal', cancelBtn: 'btnCancelProjectModal' },
    { closeBtn: 'btnCloseSkillModal', cancelBtn: 'btnCancelSkillModal' },
    { closeBtn: 'btnCloseEduModal', cancelBtn: 'btnCancelEduModal' }
  ];

  modalCloseMap.forEach(({ closeBtn, cancelBtn }) => {
    const cBtn = document.getElementById(closeBtn);
    const cnBtn = document.getElementById(cancelBtn);
    if (cBtn) cBtn.addEventListener('click', closeAllModals);
    if (cnBtn) cnBtn.addEventListener('click', closeAllModals);
  });

  // Cert / Lightbox image viewer modal
  const certImgModal = document.getElementById('certImageModal');
  const btnCloseCertImg = document.getElementById('btnCloseCertImageModal');
  const btnCloseCertImgBot = document.getElementById('btnCloseCertImageModalBottom');
  const closeCertImgModal = () => { if (certImgModal) certImgModal.classList.remove('open'); };
  if (btnCloseCertImg) btnCloseCertImg.addEventListener('click', closeCertImgModal);
  if (btnCloseCertImgBot) btnCloseCertImgBot.addEventListener('click', closeCertImgModal);
  if (certImgModal) certImgModal.addEventListener('click', (e) => { if (e.target === certImgModal) closeCertImgModal(); });

  // Click outside backdrop to close
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  // ESC key to close any open modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Reveal Animations
  applyRevealAnimations();
});
