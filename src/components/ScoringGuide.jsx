import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { calculateDynamicPriceRanges } from '../utils/weightedProduct';

const ScoringGuide = ({ products = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Hitung range harga dinamis
  const priceRanges = calculateDynamicPriceRanges(products);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const scoringCriteria = [
    {
      name: 'Harga Produk',
      type: 'Cost',
      description: 'Semakin rendah semakin baik',
      scales: [
        { score: 5, range: `> ${formatPrice(priceRanges.ranges.score4)}`, label: 'Mahal' },
        { score: 4, range: `${formatPrice(priceRanges.ranges.score3 + 1)} - ${formatPrice(priceRanges.ranges.score4)}`, label: 'Agak Mahal' },
        { score: 3, range: `${formatPrice(priceRanges.ranges.score2 + 1)} - ${formatPrice(priceRanges.ranges.score3)}`, label: 'Sedang' },
        { score: 2, range: `${formatPrice(priceRanges.ranges.score1)} - ${formatPrice(priceRanges.ranges.score2)}`, label: 'Murah' },
        { score: 1, range: `< ${formatPrice(priceRanges.ranges.score1)}`, label: 'Murah Sekali' }
      ]
    },
    {
      name: 'Rating Toko',
      type: 'Benefit',
      description: 'Semakin tinggi semakin baik',
      scales: [
        { score: 5, range: '> 4.8', label: 'Sangat Baik' },
        { score: 4, range: '4.5 - 4.8', label: 'Baik' },
        { score: 3, range: '4.2 - 4.49', label: 'Cukup' },
        { score: 2, range: '4.0 - 4.19', label: 'Kurang Baik' },
        { score: 1, range: '< 4.0', label: 'Buruk' }
      ]
    },
    {
      name: 'Jumlah Terjual',
      type: 'Benefit',
      description: 'Semakin tinggi semakin baik',
      scales: [
        { score: 5, range: '> 10.000', label: 'Sangat Laris' },
        { score: 4, range: '5.000 - 10.000', label: 'Laris' },
        { score: 3, range: '1.000 - 4.999', label: 'Sedang' },
        { score: 2, range: '100 - 999', label: 'Kurang Laris' },
        { score: 1, range: '< 100', label: 'Sepi' }
      ]
    },
    {
      name: 'Ulasan Positif (%)',
      type: 'Benefit',
      description: 'Semakin tinggi semakin baik',
      scales: [
        { score: 5, range: '> 97%', label: 'Sangat Positif' },
        { score: 4, range: '94% - 97%', label: 'Positif' },
        { score: 3, range: '90% - 93%', label: 'Cukup Positif' },
        { score: 2, range: '85% - 89%', label: 'Kurang Positif' },
        { score: 1, range: '< 85%', label: 'Negatif' }
      ]
    },
    {
      name: 'Waktu Balas Chat',
      type: 'Benefit',
      description: 'Semakin cepat semakin baik',
      scales: [
        { score: 5, range: '< 1 jam', label: 'Responsif' },
        { score: 4, range: '< 1 hari', label: 'Cukup' },
        { score: 3, range: '> 1 hari', label: 'Lambat' },
        { score: 1, range: 'Tidak membalas', label: 'Tidak Responsif' }
      ]
    },
    {
      name: 'Chat Dibalas (%)',
      type: 'Benefit',
      description: 'Semakin tinggi semakin baik',
      scales: [
        { score: 5, range: '> 97%', label: 'Selalu Membalas' },
        { score: 4, range: '90% - 97%', label: 'Sering Membalas' },
        { score: 3, range: '80% - 89%', label: 'Cukup Sering' },
        { score: 2, range: '70% - 79%', label: 'Membalas' },
        { score: 1, range: '< 70%', label: 'Jarang Membalas' }
      ]
    }
  ];

  const getScoreColor = (score) => {
    switch (score) {
      case 5: return 'bg-green-100 text-green-800 border-green-200';
      case 4: return 'bg-blue-100 text-blue-800 border-blue-200';
      case 3: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2: return 'bg-orange-100 text-orange-800 border-orange-200';
      case 1: return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Info className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              📊 Panduan Skala Penilaian (1-5)
            </h3>
            <p className="text-sm text-gray-600">
              Klik untuk melihat detail skala penilaian setiap kriteria
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scoringCriteria.map((criteria, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="mb-3">
                  <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                    <span>{criteria.name}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      criteria.type === 'Benefit' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {criteria.type}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{criteria.description}</p>
                </div>
                
                <div className="space-y-2">
                  {criteria.scales.map((scale, scaleIndex) => (
                    <div key={scaleIndex} className="flex items-center justify-between p-2 rounded border">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-sm font-medium rounded border ${
                          getScoreColor(scale.score)
                        }`}>
                          {scale.score}
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {scale.range}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 italic">
                        {scale.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-900 mb-2">💡 Catatan Penting:</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Benefit:</strong> Semakin tinggi nilai semakin baik (skor 5 = terbaik)</li>
              <li>• <strong>Cost:</strong> Semakin rendah nilai semakin baik (skor 1 = terbaik untuk perhitungan)</li>
              <li>• Sistem otomatis mengkonversi nilai input ke skor standar 1-5</li>
              <li>• Untuk kriteria Cost, sistem menggunakan 1/skor dalam perhitungan WP</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoringGuide;