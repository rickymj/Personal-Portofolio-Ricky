import re

with open("static/js/app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

render_projects_new = """function renderProjects() {
  const container = document.getElementById('projectList');
  if (!container) return;

  container.innerHTML = projects.map((proj) => {
    
    // Tools / Tags
    const toolsHtml = (proj.tools && proj.tools.length > 0)
      ? `<div class="proj-tags" style="margin-top: 8px;">
          ${proj.tools.map(t => `<span class="proj-tag">${escapeHtml(t)}</span>`).join('')}
         </div>`
      : '';

    // Evidence Buttons
    const evidenceHtml = (proj.evidenceButtons && proj.evidenceButtons.length > 0)
      ? `<div class="proj-evidence-actions">
          ${proj.evidenceButtons.map(btn => {
            if (btn.link) {
              return `<a href="${escapeHtml(btn.link)}" target="_blank" rel="noopener noreferrer" class="btn-evidence">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        <span>${escapeHtml(btn.label)}</span>
                      </a>`;
            } else if (btn.image) {
              return `<button type="button" onclick="openImageLightbox('${escapeHtml(btn.image)}', '${escapeHtml(proj.title)}')" class="btn-evidence">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        <span>${escapeHtml(btn.label)}</span>
                      </button>`;
            }
            return '';
          }).join('')}
         </div>`
      : '';

    const confidentialBadge = proj.confidential
      ? `<div class="confidential-badge">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
           <span>Confidential Client Project</span>
         </div>`
      : '';

    return `
      <div class="proj-card case-study-card reveal show" data-id="${proj.id}">
        <div class="card-glow-bar"></div>
        
        <div class="proj-header-wrap">
          <h3 class="proj-title" style="margin-bottom: 5px;">${escapeHtml(proj.title)}</h3>
          ${confidentialBadge}
        </div>

        <div class="proj-impact-headline">
          ${escapeHtml(proj.impactHeadline)}
        </div>

        <div class="proj-role-context">
          <strong>Role & Context:</strong> ${escapeHtml(proj.roleContext)}
        </div>

        <div class="proj-case-grid">
          <div class="case-section">
            <span class="case-label label-problem">Problem</span>
            <p>${escapeHtml(proj.problem)}</p>
          </div>
          <div class="case-section">
            <span class="case-label label-approach">Approach</span>
            <p>${escapeHtml(proj.approach)}</p>
          </div>
          <div class="case-section">
            <span class="case-label label-approach">Action</span>
            <p>${escapeHtml(proj.action)}</p>
          </div>
          <div class="case-section">
            <span class="case-label label-impact">Result</span>
            <p>${escapeHtml(proj.result)}</p>
          </div>
        </div>

        <div class="proj-tools-section">
          <strong>Tools & Methods:</strong>
          ${toolsHtml}
        </div>

        ${evidenceHtml}
      </div>
    `;
  }).join('');
}"""

app_js = re.sub(r'function renderProjects\(\) \{.*?\n\}\n', render_projects_new + '\n', app_js, flags=re.DOTALL)

with open("static/js/app.js", "w", encoding="utf-8") as f:
    f.write(app_js)

print("app.js updated")
