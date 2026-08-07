/**
 * Image Uploader Module
 * Supports Drag & Drop, File Picker, Base64 Conversion, Live Preview, and LocalStorage Sync
 */

const PHOTO_STORAGE_KEY = 'rmj_portfolio_custom_photo';

const ImageUploader = {
  currentPhotoDataUrl: null,

  init() {
    this.loadSavedPhoto();

    const modal = document.getElementById('photoModal');
    const btnOpen = document.getElementById('btnChangePhoto');
    const btnClose = document.getElementById('btnClosePhotoModal');
    const btnCancel = document.getElementById('btnCancelPhoto');
    const dropzone = document.getElementById('photoDropzone');
    const fileInput = document.getElementById('photoFileInput');
    const btnSave = document.getElementById('btnSavePhoto');
    const btnReset = document.getElementById('btnResetPhoto');
    const previewContainer = document.getElementById('photoPreviewContainer');
    const previewImg = document.getElementById('photoPreviewImg');

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        if (!Auth.isAdmin()) {
          showToast('Hanya Admin yang dapat mengubah foto');
          return;
        }
        this.currentPhotoDataUrl = null;
        if (previewContainer) previewContainer.style.display = 'none';
        if (modal) modal.classList.add('open');
      });
    }

    const closePhotoModal = () => {
      if (modal) modal.classList.remove('open');
      this.currentPhotoDataUrl = null;
      if (fileInput) fileInput.value = '';
    };

    if (btnClose) btnClose.addEventListener('click', closePhotoModal);
    if (btnCancel) btnCancel.addEventListener('click', closePhotoModal);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closePhotoModal();
      });
    }

    // Dropzone Click
    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      // Drag & Drop
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          ImageUploader.handleFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          ImageUploader.handleFile(e.target.files[0]);
        }
      });
    }

    // Save Photo
    if (btnSave) {
      btnSave.addEventListener('click', () => {
        if (!this.currentPhotoDataUrl) {
          showToast('Pilih gambar terlebih dahulu!');
          return;
        }
        localStorage.setItem(PHOTO_STORAGE_KEY, this.currentPhotoDataUrl);
        this.updateProfilePhoto(this.currentPhotoDataUrl);
        closePhotoModal();
        showToast('Foto profil berhasil diperbarui & disimpan!');
      });
    }

    // Reset Photo to Default
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Kembalikan foto profil ke foto default asli?')) {
          localStorage.removeItem(PHOTO_STORAGE_KEY);
          this.updateProfilePhoto(DEFAULT_PROFILE.photo);
          closePhotoModal();
          showToast('Foto profil dikembalikan ke default');
        }
      });
    }
  },

  handleFile(file) {
    if (!file.type.match('image.*')) {
      alert('Hanya file gambar (JPG, PNG, WebP) yang didukung.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('Ukuran file terlalu besar! Maksimal 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      this.currentPhotoDataUrl = dataUrl;

      const previewContainer = document.getElementById('photoPreviewContainer');
      const previewImg = document.getElementById('photoPreviewImg');
      if (previewContainer && previewImg) {
        previewImg.src = dataUrl;
        previewContainer.style.display = 'flex';
      }
    };
    reader.readAsDataURL(file);
  },

  loadSavedPhoto() {
    const saved = localStorage.getItem(PHOTO_STORAGE_KEY);
    if (saved) {
      this.updateProfilePhoto(saved);
    } else if (typeof DEFAULT_PROFILE !== 'undefined' && DEFAULT_PROFILE.photo) {
      this.updateProfilePhoto(DEFAULT_PROFILE.photo);
    }
  },

  updateProfilePhoto(src) {
    const imgEl = document.getElementById('profileImg');
    if (imgEl && src) {
      imgEl.src = src;
    }
  },

  getEffectivePhoto() {
    return localStorage.getItem(PHOTO_STORAGE_KEY) || (typeof DEFAULT_PROFILE !== 'undefined' ? DEFAULT_PROFILE.photo : '');
  }
};

window.ImageUploader = ImageUploader;
