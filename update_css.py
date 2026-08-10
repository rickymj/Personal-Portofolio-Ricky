css_append = """
/* --- CASE STUDY PROJECTS STYLES --- */
.proj-header-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.confidential-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 152, 0, 0.1);
  color: #ff9800;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(255, 152, 0, 0.2);
  width: fit-content;
}

.proj-impact-headline {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-base);
  margin-bottom: 12px;
  padding: 10px 14px;
  background: rgba(0, 198, 255, 0.05);
  border-left: 3px solid var(--accent-cyan);
  border-radius: 0 4px 4px 0;
}

.proj-role-context {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: 20px;
}
.proj-role-context strong {
  color: var(--text-base);
  font-weight: 600;
}

.proj-case-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 20px;
}
@media (min-width: 768px) {
  .proj-case-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.case-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.case-section p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.case-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 4px;
  width: fit-content;
}

.proj-tools-section {
  margin-bottom: 24px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.proj-tools-section strong {
  display: block;
  margin-bottom: 4px;
  color: var(--text-base);
}

.proj-evidence-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  border-top: 1px solid var(--border-subtle);
  padding-top: 16px;
}

.btn-evidence {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-base);
  background: var(--surface-raised);
  border: 1px solid var(--border-medium);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-evidence:hover {
  background: var(--surface-hover);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}
"""

with open("static/css/style.css", "a", encoding="utf-8") as f:
    f.write(css_append)

print("style.css updated")
