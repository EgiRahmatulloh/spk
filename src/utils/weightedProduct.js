// Kriteria dan bobot default
export const CRITERIA = {
  harga: { name: 'Harga Produk', weight: 0.25, type: 'cost' },
  rating: { name: 'Rating Toko', weight: 0.20, type: 'benefit' },
  terjual: { name: 'Jumlah Terjual', weight: 0.20, type: 'benefit' },
  ulasan: { name: 'Ulasan Positif (%)', weight: 0.15, type: 'benefit' },
  waktu_balas: { name: 'Waktu Balas Chat', weight: 0.10, type: 'benefit' },
  chat_dibalas: { name: 'Chat Dibalas (%)', weight: 0.10, type: 'benefit' }
};

// Fungsi untuk menghitung range harga dinamis berdasarkan data
export const calculateDynamicPriceRanges = (products) => {
  if (!products || products.length === 0) {
    // Fallback ke range default jika tidak ada data
    return {
      min: 70000,
      max: 85000,
      ranges: {
        score1: 73000,  // < 73000
        score2: 75000,  // 73000-75000
        score3: 77000,  // 75001-77000
        score4: 79000,  // 77001-79000
        score5: 79001   // > 79000
      }
    };
  }

  const prices = products.map(p => p.harga).filter(p => p && p > 0);
  if (prices.length === 0) {
    return calculateDynamicPriceRanges([]);
  }

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice;
  
  // Buat 5 interval yang merata
  const interval = range / 5;
  
  return {
    min: minPrice,
    max: maxPrice,
    ranges: {
      score1: Math.round(minPrice + interval),
      score2: Math.round(minPrice + interval * 2),
      score3: Math.round(minPrice + interval * 3),
      score4: Math.round(minPrice + interval * 4),
      score5: Math.round(minPrice + interval * 4) + 1
    }
  };
};

// Fungsi untuk mengkonversi nilai ke skor standar (1-5)
export const convertToStandardScore = (criteria, value, allProducts = []) => {
  switch (criteria) {
    case 'harga':
      const priceRanges = calculateDynamicPriceRanges(allProducts);
      if (value > priceRanges.ranges.score4) return 5; // Mahal
      if (value >= priceRanges.ranges.score3 + 1) return 4; // Agak Mahal
      if (value >= priceRanges.ranges.score2 + 1) return 3; // Sedang
      if (value >= priceRanges.ranges.score1) return 2; // Murah
      return 1; // Murah Sekali

    case 'rating':
      if (value > 4.8) return 5; // Sangat Baik
      if (value >= 4.5) return 4; // Baik
      if (value >= 4.2) return 3; // Cukup
      if (value >= 4.0) return 2; // Kurang Baik
      return 1; // Buruk

    case 'terjual':
      if (value > 10000) return 5; // Sangat Laris
      if (value >= 5000) return 4; // Laris
      if (value >= 1000) return 3; // Sedang
      if (value >= 100) return 2; // Kurang Laris
      return 1; // Sepi

    case 'ulasan':
      if (value > 97) return 5; // Sangat Positif
      if (value >= 94) return 4; // Positif
      if (value >= 90) return 3; // Cukup Positif
      if (value >= 85) return 2; // Kurang Positif
      return 1; // Negatif

    case 'waktu_balas':
      // Asumsi: 1 = < 1 jam, 2 = < 1 hari, 3 = > 1 hari, 4 = tidak membalas
      if (value === 1) return 5; // Responsif
      if (value === 2) return 4; // Cukup
      if (value === 3) return 3; // Lambat
      return 1; // Tidak Responsif

    case 'chat_dibalas':
      if (value > 97) return 5; // Selalu Membalas
      if (value >= 90) return 4; // Sering Membalas
      if (value >= 80) return 3; // Cukup Sering
      if (value >= 70) return 2; // Membalas
      return 1; // Jarang Membalas

    default:
      return 1;
  }
};

// Fungsi untuk menghitung persentase ulasan positif
export const calculatePositiveReviewPercentage = (reviews) => {
  const { bintang5 = 0, bintang4 = 0, total = 0 } = reviews;
  if (total === 0) return 0;
  return ((bintang5 + bintang4) / total) * 100;
};

// Fungsi untuk normalisasi bobot
export const normalizeWeights = (weights) => {
  const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
  const normalized = {};
  
  Object.keys(weights).forEach(key => {
    normalized[key] = weights[key] / totalWeight;
  });
  
  return normalized;
};

// Fungsi untuk menghitung nilai S (vektor S)
export const calculateSVector = (alternatives, weights) => {
  const normalizedWeights = normalizeWeights(weights);
  
  return alternatives.map(alternative => {
    let sValue = 1;
    
    Object.keys(CRITERIA).forEach(criteria => {
      const criteriaData = CRITERIA[criteria];
      const standardScore = convertToStandardScore(criteria, alternative[criteria], alternatives);
      const weight = normalizedWeights[criteria];
      
      // Untuk kriteria cost, gunakan 1/standardScore
      const adjustedScore = criteriaData.type === 'cost' ? (1 / standardScore) : standardScore;
      
      sValue *= Math.pow(adjustedScore, weight);
    });
    
    return {
      ...alternative,
      sValue,
      standardScores: Object.keys(CRITERIA).reduce((scores, criteria) => {
        scores[criteria] = convertToStandardScore(criteria, alternative[criteria], alternatives);
        return scores;
      }, {})
    };
  });
};

// Fungsi untuk menghitung nilai V (vektor V) dan ranking
export const calculateVVector = (sVectorResults) => {
  const totalS = sVectorResults.reduce((sum, item) => sum + item.sValue, 0);
  
  const results = sVectorResults.map(item => ({
    ...item,
    vValue: item.sValue / totalS,
    preference: (item.sValue / totalS) * 100
  }));
  
  // Urutkan berdasarkan nilai V tertinggi
  results.sort((a, b) => b.vValue - a.vValue);
  
  // Tambahkan ranking
  results.forEach((item, index) => {
    item.rank = index + 1;
  });
  
  return results;
};

// Fungsi utama untuk perhitungan WP
export const calculateWeightedProduct = (alternatives, customWeights = null) => {
  const weights = customWeights || Object.keys(CRITERIA).reduce((w, key) => {
    w[key] = CRITERIA[key].weight;
    return w;
  }, {});
  
  const sVector = calculateSVector(alternatives, weights);
  const results = calculateVVector(sVector);
  
  return {
    results,
    weights: normalizeWeights(weights),
    criteria: CRITERIA
  };
};

// Mapping kode alternatif untuk toko
export const TOKO_ALTERNATIF_MAP = {
  'Anitechtoko': 'A1',
  'everlastinggift': 'A2', 
  'VS_DJAKARTA': 'A3',
  'ONE BOYS ACC': 'A4',
  'La Vare': 'A5'
};

// Fungsi untuk mendapatkan kode alternatif
export const getAlternatifCode = (namaToko, allProducts = []) => {
  // Jika ada di mapping statis, gunakan itu
  if (TOKO_ALTERNATIF_MAP[namaToko]) {
    return TOKO_ALTERNATIF_MAP[namaToko];
  }
  
  // Jika tidak ada, buat mapping dinamis berdasarkan urutan dalam allProducts
  const uniqueStores = [...new Set(allProducts.map(p => p.nama_toko))];
  const storeIndex = uniqueStores.indexOf(namaToko);
  
  if (storeIndex !== -1) {
    return `A${storeIndex + 1}`;
  }
  
  // Fallback jika tidak ditemukan
  return `A${Object.keys(TOKO_ALTERNATIF_MAP).length + 1}`;
};

// Data contoh Gamepad X3 - Disesuaikan untuk menghasilkan skor standar yang diinginkan
// Target skor standar (1-5):
// A1 (Anitechtoko): C1=4, C2=5, C3=2, C4=4, C5=5, C6=5
// A2 (everlastinggift): C1=5, C2=5, C3=4, C4=4, C5=4, C6=5
// A3 (VS_DJAKARTA): C1=5, C2=5, C3=2, C4=5, C5=4, C6=3
// A4 (ONE BOYS ACC): C1=3, C2=4, C3=2, C4=2, C5=4, C6=4
// A5 (La Vare): C1=1, C2=4, C3=5, C4=4, C5=4, C6=4
export const SAMPLE_DATA = [
  {
    id: 1,
    nama_toko: 'Anitechtoko', // A1: Target skor 4,5,2,4,5,5
    harga: 77500,     // C1=4 (Rp 77.001-79.000)
    rating: 4.9,      // C2=5 (>4.8)
    terjual: 500,     // C3=2 (100-999)
    ulasan: 95.5,     // C4=4 (94%-97%)
    waktu_balas: 1,   // C5=5 (<1 jam)
    chat_dibalas: 98  // C6=5 (>97%)
  },
  {
    id: 2,
    nama_toko: 'everlastinggift', // A2: Target skor 5,5,4,4,4,5
    harga: 80000,     // C1=5 (>Rp 79.000)
    rating: 4.9,      // C2=5 (>4.8)
    terjual: 7500,    // C3=4 (5.000-10.000)
    ulasan: 95.5,     // C4=4 (94%-97%)
    waktu_balas: 2,   // C5=4 (<1 hari)
    chat_dibalas: 98  // C6=5 (>97%)
  },
  {
    id: 3,
    nama_toko: 'VS_DJAKARTA', // A3: Target skor 5,5,2,5,4,3
    harga: 80500,     // C1=5 (>Rp 79.000)
    rating: 4.9,      // C2=5 (>4.8)
    terjual: 800,     // C3=2 (100-999)
    ulasan: 98,       // C4=5 (>97%)
    waktu_balas: 2,   // C5=4 (<1 hari)
    chat_dibalas: 85  // C6=3 (80%-89%)
  },
  {
    id: 4,
    nama_toko: 'ONE BOYS ACC', // A4: Target skor 3,4,2,2,4,4
    harga: 76000,     // C1=3 (Rp 75.001-77.000)
    rating: 4.6,      // C2=4 (4.5-4.8)
    terjual: 300,     // C3=2 (100-999)
    ulasan: 87,       // C4=2 (85%-89%)
    waktu_balas: 2,   // C5=4 (<1 hari)
    chat_dibalas: 93  // C6=4 (90%-97%)
  },
  {
    id: 5,
    nama_toko: 'La Vare', // A5: Target skor 1,4,5,4,4,4
    harga: 72000,     // C1=1 (<Rp 73.000)
    rating: 4.6,      // C2=4 (4.5-4.8)
    terjual: 12000,   // C3=5 (>10.000)
    ulasan: 95.5,     // C4=4 (94%-97%)
    waktu_balas: 2,   // C5=4 (<1 hari)
    chat_dibalas: 93  // C6=4 (90%-97%)
   }
 ];