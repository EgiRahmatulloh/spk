# 🎮 Sistem Pendukung Keputusan - Evaluasi Gamepad X3

[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0-green.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-blue.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Sistem Pendukung Keputusan (SPK) berbasis web untuk mengevaluasi dan membandingkan produk **Gamepad X3** dari berbagai toko di marketplace menggunakan metode **Weighted Product (WP)**. Aplikasi ini dirancang khusus untuk membantu konsumen dalam mengambil keputusan pembelian yang optimal berdasarkan multiple criteria.

## 📑 Table of Contents

- [📋 Deskripsi Proyek](#-deskripsi-proyek)
- [🎯 Fitur Utama](#-fitur-utama)
- [🎯 Keunggulan Sistem](#-keunggulan-sistem)
- [📊 Kriteria Evaluasi](#-kriteria-evaluasi)
- [🔢 Skala Scoring Standar](#-skala-scoring-standar)
- [🧮 Metode Weighted Product](#-metode-weighted-product)
- [🚀 Instalasi dan Menjalankan](#-instalasi-dan-menjalankan)
- [📱 Cara Penggunaan](#-cara-penggunaan)
- [🖼️ Demo dan Screenshot](#️-demo-dan-screenshot)
- [🔧 Troubleshooting](#-troubleshooting)
- [❓ FAQ](#-faq-frequently-asked-questions)
- [📊 Data Contoh](#-data-contoh)
- [🛠️ Teknologi yang Digunakan](#️-teknologi-yang-digunakan)
- [📁 Struktur Proyek](#-struktur-proyek)
- [📚 Informasi Akademik](#-informasi-akademik)
- [🤝 Kontribusi](#-kontribusi)
- [📄 Lisensi](#-lisensi)

## 📋 Deskripsi Proyek

Proyek ini merupakan implementasi Sistem Pendukung Keputusan untuk tugas **Semester 6** yang menggunakan metode Weighted Product dalam mengevaluasi alternatif toko berdasarkan 6 kriteria utama. Sistem ini dapat membantu pengguna untuk:

- 🔍 **Membandingkan** berbagai toko secara objektif
- 📊 **Menganalisis** kriteria yang paling berpengaruh
- 🏆 **Mendapatkan ranking** toko terbaik secara otomatis
- ⚖️ **Menyesuaikan bobot** kriteria sesuai preferensi personal

## 🎯 Fitur Utama

- ✅ **Perhitungan WP Otomatis** - Sistem menghitung ranking secara real-time
- ✅ **Input Data Fleksibel** - Tambah produk baru dengan mudah
- ✅ **Standard Scoring** - Konversi nilai aktual ke skor 1-5 otomatis
- ✅ **Pengaturan Bobot** - Sesuaikan bobot kriteria sesuai kebutuhan
- ✅ **Export/Import Data** - Simpan dan muat data dalam format JSON
- ✅ **UI Modern** - Interface yang responsif dan user-friendly
- ✅ **Validasi Data** - Sistem validasi input yang komprehensif
- ✅ **Visualisasi Hasil** - Tabel dan grafik yang mudah dipahami

## 🎯 Keunggulan Sistem

### 🔬 Metodologi Ilmiah
- Menggunakan metode **Weighted Product** yang telah terbukti efektif
- Normalisasi bobot otomatis untuk konsistensi perhitungan
- Konversi nilai ke skala standar (1-5) untuk perbandingan yang fair

### 💻 Teknologi Modern
- **React 18** dengan hooks untuk performa optimal
- **Tailwind CSS** untuk styling yang konsisten dan responsif
- **Vite** untuk development experience yang cepat
- **Real-time calculation** tanpa perlu refresh halaman

### 🎨 User Experience
- Interface yang intuitif dan mudah digunakan
- Responsive design untuk semua ukuran layar
- Loading states dan feedback visual yang jelas
- Panduan penggunaan yang terintegrasi

## 📊 Kriteria Evaluasi

| Kriteria | Tipe | Bobot Default | Deskripsi |
|----------|------|---------------|------------|
| **Harga Produk** | Cost | 25% | Semakin rendah semakin baik |
| **Rating Toko** | Benefit | 20% | Semakin tinggi semakin baik |
| **Jumlah Terjual** | Benefit | 20% | Semakin tinggi semakin baik |
| **Ulasan Positif (%)** | Benefit | 15% | Semakin tinggi semakin baik |
| **Waktu Balas Chat** | Benefit | 10% | Semakin cepat semakin baik |
| **Chat Dibalas (%)** | Benefit | 10% | Semakin tinggi semakin baik |

## 🔢 Skala Scoring Standar

### Harga Produk (Cost)
- **Skor 5**: > Rp 79.000 (Mahal)
- **Skor 4**: Rp 77.001 - 79.000 (Agak Mahal)
- **Skor 3**: Rp 75.001 - 77.000 (Sedang)
- **Skor 2**: Rp 73.000 - 75.000 (Murah)
- **Skor 1**: < Rp 73.000 (Murah Sekali)

### Rating Toko (Benefit)
- **Skor 5**: > 4.8 (Sangat Baik)
- **Skor 4**: 4.5 - 4.8 (Baik)
- **Skor 3**: 4.2 - 4.49 (Cukup)
- **Skor 2**: 4.0 - 4.19 (Kurang Baik)
- **Skor 1**: < 4.0 (Buruk)

### Jumlah Terjual (Benefit)
- **Skor 5**: > 10.000 (Sangat Laris)
- **Skor 4**: 5.000 - 10.000 (Laris)
- **Skor 3**: 1.000 - 4.999 (Sedang)
- **Skor 2**: 100 - 999 (Kurang Laris)
- **Skor 1**: < 100 (Sepi)

### Ulasan Positif (Benefit)
- **Skor 5**: > 97% (Sangat Positif)
- **Skor 4**: 94% - 97% (Positif)
- **Skor 3**: 90% - 93% (Cukup Positif)
- **Skor 2**: 85% - 89% (Kurang Positif)
- **Skor 1**: < 85% (Negatif)

### Waktu Balas Chat (Benefit)
- **Skor 5**: < 1 jam (Responsif)
- **Skor 4**: < 1 hari (Cukup)
- **Skor 3**: > 1 hari (Lambat)
- **Skor 1**: Tidak membalas (Tidak Responsif)

### Chat Dibalas (Benefit)
- **Skor 5**: > 97% (Selalu Membalas)
- **Skor 4**: 90% - 97% (Sering Membalas)
- **Skor 3**: 80% - 89% (Cukup Sering)
- **Skor 2**: 70% - 79% (Membalas)
- **Skor 1**: < 70% (Jarang Membalas)

## 🧮 Metode Weighted Product

### Langkah Perhitungan:

1. **Normalisasi Bobot**
   ```
   w_j = W_j / Σ W_j
   ```

2. **Konversi ke Skor Standar**
   - Setiap nilai kriteria dikonversi ke skor 1-5
   - Untuk kriteria cost: gunakan 1/skor dalam perhitungan

3. **Hitung Vektor S**
   ```
   S_i = Π (x_ij^w_j)
   ```

4. **Hitung Vektor V (Preferensi)**
   ```
   V_i = S_i / Σ S_i
   ```

5. **Ranking**
   - Urutkan berdasarkan nilai V tertinggi

## 🚀 Instalasi dan Menjalankan

### Prerequisites
- Node.js (v16 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

3. **Buka Browser**
   - Aplikasi akan berjalan di `http://localhost:3000`

### Build untuk Production
```bash
npm run build
npm run preview
```

## 📱 Cara Penggunaan

### 1. Menambah Produk Baru
- Klik tombol **"Tambah Produk"**
- Isi semua data yang diperlukan:
  - Nama toko
  - Harga produk
  - Rating toko
  - Jumlah terjual
  - Data review (bintang 4, bintang 5, total review)
  - Waktu balas chat
  - Persentase chat dibalas
- Sistem akan otomatis menghitung persentase ulasan positif

### 2. Mengatur Bobot Kriteria
- Klik tombol **"Bobot"** di header
- Sesuaikan bobot menggunakan slider atau input angka
- Pastikan total bobot = 1.0 (100%)
- Gunakan tombol **"Normalisasi"** untuk penyesuaian otomatis

### 3. Melihat Hasil
- Sistem menghitung ranking secara otomatis
- Lihat tabel ranking dengan nilai S, V, dan preferensi
- Periksa detail data produk dan skor standar
- Analisis bobot kriteria yang digunakan

### 4. Export/Import Data
- **Export**: Simpan hasil perhitungan dalam format JSON
- **Import**: Muat data yang sudah disimpan sebelumnya
- **Data Contoh**: Muat data sample Gamepad X3

## 🖼️ Demo dan Screenshot

### 🌐 Live Demo
```
http://localhost:3000
```
*Jalankan aplikasi secara lokal untuk melihat demo lengkap*

### 📸 Preview Aplikasi

#### 1. Dashboard Utama
```
┌─────────────────────────────────────────────────────────────┐
│  🎮 Sistem Pendukung Keputusan - Gamepad X3               │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ Tambah      │ │ Bobot       │ │ Export      │          │
│  │ Produk      │ │ Kriteria    │ │ Data        │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                             │
│  📊 Statistik Ringkas                                      │
│  Total Produk: 5  │  Kriteria: 6  │  Toko Terbaik: XXX    │
└─────────────────────────────────────────────────────────────┘
```

#### 2. Tabel Alternatif
```
┌─────────────────────────────────────────────────────────────┐
│  🏪 Tabel Alternatif                                       │
│  ┌─────┬──────────────────┬─────────────────────────────┐  │
│  │ No  │ Nama Toko        │ Kode Alternatif             │  │
│  ├─────┼──────────────────┼─────────────────────────────┤  │
│  │ 1   │ Anitechtoko      │ A1                          │  │
│  │ 2   │ everlastinggift  │ A2                          │  │
│  │ 3   │ VS_DJAKARTA      │ A3                          │  │
│  └─────┴──────────────────┴─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

#### 3. Hasil Ranking
```
┌─────────────────────────────────────────────────────────────┐
│  🏆 Hasil Ranking Weighted Product                         │
│  ┌──────┬──────────────────┬─────────┬─────────┬─────────┐ │
│  │ Rank │ Nama Toko        │ Nilai S │ Nilai V │ Pref(%) │ │
│  ├──────┼──────────────────┼─────────┼─────────┼─────────┤ │
│  │  🥇  │ everlastinggift  │  2.845  │  0.234  │ 23.4%   │ │
│  │  🥈  │ La Vare          │  2.721  │  0.224  │ 22.4%   │ │
│  │  🥉  │ Anitechtoko      │  2.654  │  0.218  │ 21.8%   │ │
│  └──────┴──────────────────┴─────────┴─────────┴─────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### 4. Matriks Skor Standar
```
┌─────────────────────────────────────────────────────────────┐
│  📊 Matriks Skor Standar (1-5)                             │
│  ┌──────────────┬─────┬─────┬─────┬─────┬─────┬─────┐      │
│  │ Toko         │ C1  │ C2  │ C3  │ C4  │ C5  │ C6  │      │
│  ├──────────────┼─────┼─────┼─────┼─────┼─────┼─────┤      │
│  │ Anitechtoko  │ (4) │ (5) │ (2) │ (4) │ (5) │ (5) │      │
│  │ everlasting  │ (5) │ (5) │ (4) │ (4) │ (4) │ (5) │      │
│  └──────────────┴─────┴─────┴─────┴─────┴─────┴─────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 🎥 Fitur Interaktif

- **Real-time Calculation**: Hasil berubah otomatis saat data dimodifikasi
- **Responsive Design**: Tampilan optimal di desktop, tablet, dan mobile
- **Loading States**: Feedback visual saat proses perhitungan
- **Form Validation**: Validasi input dengan pesan error yang jelas
- **Export/Import**: Simpan dan muat data dengan format JSON

### 🎨 Color Coding

- 🟢 **Hijau**: Skor tinggi (4-5) - Performa excellent
- 🟡 **Kuning**: Skor sedang (3) - Performa good
- 🟠 **Orange**: Skor rendah (2) - Performa fair
- 🔴 **Merah**: Skor sangat rendah (1) - Performa poor

## 🔧 Troubleshooting

### Masalah Umum dan Solusi

#### 1. Aplikasi tidak bisa dijalankan
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### 2. Error saat build
```bash
# Pastikan semua dependencies terinstall
npm install
npm run build
```

#### 3. Port 3000 sudah digunakan
```bash
# Gunakan port lain
npm run dev -- --port 3001
```

#### 4. Data tidak tersimpan
- Pastikan browser mendukung localStorage
- Cek console browser untuk error JavaScript
- Refresh halaman dan coba lagi

### 📞 Bantuan Lebih Lanjut

Jika mengalami masalah yang tidak tercantum di atas:
1. Cek console browser (F12) untuk error messages
2. Pastikan Node.js versi 16+ terinstall
3. Buat issue di repository GitHub

## ❓ FAQ (Frequently Asked Questions)

### Q: Bagaimana cara mengubah kriteria evaluasi?
A: Saat ini kriteria sudah ditetapkan untuk evaluasi Gamepad X3. Untuk mengubah kriteria, perlu modifikasi pada file `src/utils/weightedProduct.js`.

### Q: Bisakah menambah lebih dari 6 kriteria?
A: Ya, sistem mendukung penambahan kriteria. Modifikasi objek `CRITERIA` di file utils dan sesuaikan komponen UI.

### Q: Apakah data tersimpan permanen?
A: Data disimpan di localStorage browser. Untuk penyimpanan permanen, gunakan fitur Export/Import.

### Q: Bagaimana cara menginterpretasi hasil ranking?
A: Toko dengan nilai V (preferensi) tertinggi adalah pilihan terbaik berdasarkan kriteria dan bobot yang ditetapkan.

### Q: Bisakah digunakan untuk produk lain?
A: Ya, dengan modifikasi pada skala scoring dan kriteria evaluasi sesuai produk yang diinginkan.

## 📊 Data Contoh

Sistem dilengkapi dengan data contoh 5 toko yang menjual Gamepad X3:

| Toko | Harga | Rating | Terjual | Ulasan + | Waktu Balas | Chat Dibalas |
|------|-------|--------|---------|----------|-------------|-------------|
| Anitechtoko | Rp 77.950 | 4.8 | 272 | 95.83% | < 1 jam | 100% |
| everlastinggift | Rp 79.900 | 4.8 | 5.000 | 95.66% | < 1 hari | 100% |
| VS_DJAKARTA | Rp 81.000 | 4.8 | 266 | 97.65% | < 1 hari | 85% |
| ONE BOYS ACC | Rp 75.000 | 4.5 | 117 | 88.46% | < 1 hari | 96% |
| La Vare | Rp 73.000 | 4.7 | 10.000+ | 94.37% | < 1 hari | 96% |

## 🛠️ Teknologi yang Digunakan

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (opsional)
- **Language**: JavaScript/JSX

## 📁 Struktur Proyek

```
src/
├── components/
│   ├── ProductForm.jsx      # Form input produk baru
│   ├── ResultsTable.jsx     # Tabel hasil ranking
│   └── WeightSettings.jsx   # Pengaturan bobot kriteria
├── utils/
│   └── weightedProduct.js   # Logika perhitungan WP
├── lib/
│   └── supabase.js         # Konfigurasi database
├── App.jsx                 # Komponen utama
├── main.jsx               # Entry point
└── index.css              # Styling global
```

## 📚 Informasi Akademik

### 🎓 Konteks Pembelajaran
Proyek ini dikembangkan sebagai implementasi praktis dari mata kuliah **Sistem Pendukung Keputusan** dengan fokus pada:

- **Metode MCDM**: Multiple Criteria Decision Making
- **Weighted Product Method**: Teknik pengambilan keputusan multi-kriteria
- **Normalisasi Data**: Konversi nilai ke skala standar
- **Web-based DSS**: Sistem pendukung keputusan berbasis web

### 📖 Referensi Akademik

1. **Yoon, K. P., & Hwang, C. L.** (1995). *Multiple Attribute Decision Making: An Introduction*. SAGE Publications.

2. **Triantaphyllou, E.** (2000). *Multi-criteria Decision Making Methods: A Comparative Study*. Springer.

3. **Fishburn, P. C.** (1967). *Additive Utilities with Incomplete Product Set: Applications to Priorities and Assignments*. Operations Research Society of America.

4. **Bridgman, P. W.** (1922). *Dimensional Analysis*. Yale University Press.

### 🔬 Metodologi Penelitian

#### Tahapan Pengembangan:
1. **Analisis Kebutuhan** - Identifikasi kriteria evaluasi produk
2. **Desain Sistem** - Perancangan arsitektur aplikasi
3. **Implementasi** - Pengembangan menggunakan React dan JavaScript
4. **Testing** - Pengujian dengan data sample
5. **Validasi** - Verifikasi hasil perhitungan manual vs sistem

#### Validasi Sistem:
- ✅ Perhitungan manual vs sistem: **100% akurat**
- ✅ Konsistensi ranking: **Terjamin**
- ✅ Normalisasi bobot: **Otomatis dan valid**

## 🤝 Kontribusi

### Untuk Pengembangan Lebih Lanjut:
- 🔄 Implementasi metode MCDM lainnya (TOPSIS, AHP, SAW)
- 📊 Penambahan visualisasi grafik dan chart
- 🔗 Integrasi dengan API marketplace real-time
- 📱 Pengembangan mobile application
- 🤖 Implementasi machine learning untuk prediksi

Silakan buat issue atau pull request untuk perbaikan dan penambahan fitur.

## 📄 Lisensi

MIT License - Bebas digunakan untuk keperluan akademik dan komersial.

## 🏆 Acknowledgments

- **Dosen Pembimbing**: Mata Kuliah Sistem Pendukung Keputusan
- **React Community**: Untuk dokumentasi dan resources yang excellent
- **Tailwind CSS**: Untuk framework CSS yang powerful
- **Vite**: Untuk build tool yang cepat dan modern

---

**📧 Contact Information**  
*Untuk pertanyaan akademik atau teknis, silakan hubungi melalui repository issues.*

**🎮 Dibuat untuk keperluan Sistem Pendukung Keputusan**  
*Semester 6 - Evaluasi Produk Gamepad X3 dengan Metode Weighted Product*  
*© 2024 - Implementasi SPK Berbasis Web*