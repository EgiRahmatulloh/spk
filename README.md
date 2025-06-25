# Sistem Perhitungan Weighted Product (WP) - Evaluasi Gamepad X3

Sistem pendukung keputusan berbasis web untuk mengevaluasi produk Gamepad X3 dari berbagai toko di Shopee menggunakan metode **Weighted Product (WP)**.

## 🎯 Fitur Utama

- ✅ **Perhitungan WP Otomatis** - Sistem menghitung ranking secara real-time
- ✅ **Input Data Fleksibel** - Tambah produk baru dengan mudah
- ✅ **Standard Scoring** - Konversi nilai aktual ke skor 1-5 otomatis
- ✅ **Pengaturan Bobot** - Sesuaikan bobot kriteria sesuai kebutuhan
- ✅ **Export/Import Data** - Simpan dan muat data dalam format JSON
- ✅ **UI Modern** - Interface yang responsif dan user-friendly

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

## 🤝 Kontribusi

Silakan buat issue atau pull request untuk perbaikan dan penambahan fitur.

## 📄 Lisensi

MIT License - Bebas digunakan untuk keperluan akademik dan komersial.

---

**Dibuat untuk keperluan Sistem Pendukung Keputusan**  
*Semester 6 - Evaluasi Produk Gamepad X3 dengan Metode Weighted Product*