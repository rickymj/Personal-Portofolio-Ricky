# Portofolio — Ricky Muhammad Jufrizal (Vercel Edition)

Situs portofolio modern berstandar industri dengan **Vercel / Geist UI Design System** dan arsitektur file modular (HTML, CSS terpisah, JavaScript terpisah, aset terpisah). Siap langsung di-deploy ke Vercel atau penyedia hosting statis manapun tanpa build tools yang rumit.

---

## 📁 Struktur File Modular

Proyek ini telah dipisahkan secara rapi berdasarkan fungsinya:

```text
portfolio_vercel/
├── index.html              # Halaman utama (semantic HTML bersih & terstruktur)
├── vercel.json             # Konfigurasi caching & routing Vercel
├── README.md               # Dokumentasi lengkap & panduan penggunaan
├── css/
│   ├── style.css           # Vercel / Geist Design System, dark mode, typography, layout
│   └── modal.css           # Styling modal dialog, form, uploader & auth
├── js/
│   ├── data.js             # Data default portofolio (profil, pengalaman, proyek, skill)
│   ├── auth.js             # Modul login Admin vs Guest & state management
│   ├── uploader.js         # Modul upload gambar (drag & drop, preview, base64)
│   └── app.js              # Controller utama aplikasi (render DOM, CRUD, export)
└── assets/
    └── profile.jpg         # Foto profil asli beresolusi tinggi
```

---

## 🔐 Sistem Akses: Mode Guest vs Mode Admin

### 1. Mode Guest (Tamu / Pengunjung Publik — Default)
- Ketika siapapun membuka link portofolio Anda, mereka akan langsung masuk dalam **Mode Guest**.
- Tampilan sangat bersih, rapi, dan profesional.
- Tombol-tombol administrasi (*Edit*, *Hapus*, *Tambah Pengalaman*, *Ganti Foto*) disembunyikan agar tidak membingungkan pengunjung.
- Pengunjung dapat melihat seluruh portofolio, metrik, pengalaman kerja, proyek, skill, pendidikan, dan menghubungi Anda via email/telepon/LinkedIn.

### 2. Mode Admin (Pemilik Portofolio)
Untuk mengedit konten portofolio Anda:
1. Klik tombol **`Admin Login`** di pojok kanan atas navigasi.
2. Masukkan kredensial admin:
   - **Username**: `RickyMJ`
   - **Password**: `17rickyMJ`
3. Setelah login, Anda akan melihat badge **`👑 Admin`** dan seluruh tombol pengelolaan akan aktif:
   - **`+ Add Experience`**: Membuka modal untuk menambah pengalaman kerja baru.
   - **`Edit Mode`**: Memunculkan tombol edit (✏️), pindah urutan (↑ / ↓), dan hapus (🗑️) pada setiap kartu pengalaman kerja.
   - **`Upload Profile Photo`**: Klik pada foto profil Anda untuk mengunggah foto baru.
   - **`Export HTML & Backup JSON`**: Mengunduh data terbaru untuk disimpan / di-deploy.
   - **`Logout`**: Keluar kembali ke Mode Guest.

---

## 🖼️ Fitur Upload Gambar (Photo & Media)

1. Pastikan Anda sudah login sebagai Admin.
2. Arahkan kursor (*hover*) ke foto profil di Hero section, lalu klik **Upload New Photo**.
3. Anda dapat melakukan **Drag & Drop** file gambar (`JPG`, `PNG`, atau `WebP`, maks 8MB) atau klik untuk memilih dari komputer.
4. Periksa hasil *Live Preview*, lalu klik **Save Photo**.
5. Foto profil baru akan langsung aktif dan tersimpan di browser Anda. Tersedia juga tombol **Reset to Default** untuk mengembalikan ke foto asli sewaktu-waktu.

---

## 🚀 Cara Deploy ke Vercel

### Opsi 1 — Drag & Drop (Paling Cepat, Tanpa Terminal)
1. Buka [vercel.com](https://vercel.com) dan login dengan akun Anda.
2. Klik **Add New → Project**.
3. Pilih opsi **Deploy without Git** (atau drag-and-drop area).
4. Tarik (*drag*) seluruh folder `portfolio_vercel` ke browser.
5. Klik **Deploy**. Dalam hitungan detik situs portofolio Anda sudah aktif di URL publik!

### Opsi 2 — Lewat GitHub (Auto-Deploy Tiap Push)
1. Buat repositori baru di GitHub Anda (misal: `portfolio_vercel`).
2. Push seluruh file di folder ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: modern modular vercel portfolio"
   git branch -M main
   git remote add origin https://github.com/rickymj/portfolio_vercel.git
   git push -u origin main
   ```
3. Di dashboard Vercel, pilih **Import Git Repository** → pilih repo tersebut → klik **Deploy**.
4. Setiap kali Anda melakukan perubahan dan push ke GitHub, Vercel akan otomatis meng-update situs Anda secara instan.

### Opsi 3 — Vercel CLI
```bash
npm install -g vercel
cd portfolio_vercel
vercel login
vercel --prod
```

---

## 🌐 Menghubungkan Domain Kustom
Setelah deploy live di Vercel, Anda dapat menambahkan domain pribadi Anda (misal: `rickymj.com` atau `rickyjufrizal.my.id`) melalui menu **Settings → Domains** pada dashboard proyek di Vercel.
