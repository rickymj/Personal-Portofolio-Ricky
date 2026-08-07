/**
 * Authentication Module: Admin vs Guest Mode
 * Credentials: RickyMJ / 17rickyMJ
 */

const AUTH_CONFIG = {
  USERNAME: "RickyMJ",
  PASSWORD: "17rickyMJ",
  STORAGE_KEY: "rmj_portfolio_auth_v1"
};

const Auth = {
  isAdmin() {
    return localStorage.getItem(AUTH_CONFIG.STORAGE_KEY) === "true";
  },

  login(username, password) {
    if (username === AUTH_CONFIG.USERNAME && password === AUTH_CONFIG.PASSWORD) {
      localStorage.setItem(AUTH_CONFIG.STORAGE_KEY, "true");
      this.applyAuthState();
      return { success: true, message: "Login berhasil sebagai Admin RickyMJ!" };
    }
    return { success: false, message: "Username atau password salah. Silakan coba lagi." };
  },

  logout() {
    localStorage.removeItem(AUTH_CONFIG.STORAGE_KEY);
    this.applyAuthState();
    if (typeof showToast === 'function') {
      showToast("Anda telah keluar ke Mode Guest");
    }
  },

  applyAuthState() {
    const isUserAdmin = this.isAdmin();
    if (isUserAdmin) {
      document.body.classList.add("is-admin");
    } else {
      document.body.classList.remove("is-admin");
      document.body.classList.remove("edit-mode-active");
    }

    // Update navbar indicators
    const adminBadge = document.getElementById("adminBadge");
    const btnLoginNav = document.getElementById("btnOpenLoginModal");
    const btnLogoutNav = document.getElementById("btnLogout");

    if (adminBadge) adminBadge.style.display = isUserAdmin ? "inline-flex" : "none";
    if (btnLoginNav) btnLoginNav.style.display = isUserAdmin ? "none" : "inline-flex";
    if (btnLogoutNav) btnLogoutNav.style.display = isUserAdmin ? "inline-flex" : "none";

    // Re-render all sections if loaded
    if (typeof renderAll === 'function') {
      renderAll();
    } else if (typeof renderExperiences === 'function') {
      renderExperiences();
    }
  },

  init() {
    this.applyAuthState();

    // Login modal event listeners
    const modal = document.getElementById("loginModal");
    const btnOpen = document.getElementById("btnOpenLoginModal");
    const btnClose = document.getElementById("btnCloseLoginModal");
    const btnCancel = document.getElementById("btnCancelLogin");
    const form = document.getElementById("loginForm");
    const btnLogout = document.getElementById("btnLogout");
    const errorAlert = document.getElementById("loginErrorAlert");

    if (btnOpen) {
      btnOpen.addEventListener("click", () => {
        if (errorAlert) errorAlert.style.display = "none";
        form.reset();
        modal.classList.add("open");
        document.getElementById("loginUsername").focus();
      });
    }

    const closeLoginModal = () => {
      if (modal) modal.classList.remove("open");
      if (form) form.reset();
    };

    if (btnClose) btnClose.addEventListener("click", closeLoginModal);
    if (btnCancel) btnCancel.addEventListener("click", closeLoginModal);

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeLoginModal();
      });
    }

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const u = document.getElementById("loginUsername").value.trim();
        const p = document.getElementById("loginPassword").value;
        const result = Auth.login(u, p);

        if (result.success) {
          closeLoginModal();
          if (typeof showToast === 'function') {
            showToast(result.message);
          }
        } else {
          if (errorAlert) {
            errorAlert.textContent = result.message;
            errorAlert.style.display = "flex";
          }
        }
      });
    }

    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        Auth.logout();
      });
    }
  }
};

window.Auth = Auth;
