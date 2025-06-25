import React from 'react';
import { calculateDynamicPriceRanges } from '../utils/weightedProduct';

const DynamicPriceGuide = ({ products }) => {
  const priceRanges = calculateDynamicPriceRanges(products);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-blue-800 mb-3">
        📊 Skala Penilaian Harga Dinamis
      </h3>
      
      <div className="text-sm text-blue-700 mb-3">
        <p>Range harga dihitung otomatis berdasarkan data produk yang ada:</p>
        <p className="font-medium">
          Rentang: {formatPrice(priceRanges.min)} - {formatPrice(priceRanges.max)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <div className="bg-green-100 border border-green-300 rounded p-2 text-center">
          <div className="font-bold text-green-800">Skor 1</div>
          <div className="text-xs text-green-600">Murah Sekali</div>
          <div className="text-xs font-medium">
            &lt; {formatPrice(priceRanges.ranges.score1)}
          </div>
        </div>
        
        <div className="bg-lime-100 border border-lime-300 rounded p-2 text-center">
          <div className="font-bold text-lime-800">Skor 2</div>
          <div className="text-xs text-lime-600">Murah</div>
          <div className="text-xs font-medium">
            {formatPrice(priceRanges.ranges.score1)} - {formatPrice(priceRanges.ranges.score2)}
          </div>
        </div>
        
        <div className="bg-yellow-100 border border-yellow-300 rounded p-2 text-center">
          <div className="font-bold text-yellow-800">Skor 3</div>
          <div className="text-xs text-yellow-600">Sedang</div>
          <div className="text-xs font-medium">
            {formatPrice(priceRanges.ranges.score2 + 1)} - {formatPrice(priceRanges.ranges.score3)}
          </div>
        </div>
        
        <div className="bg-orange-100 border border-orange-300 rounded p-2 text-center">
          <div className="font-bold text-orange-800">Skor 4</div>
          <div className="text-xs text-orange-600">Agak Mahal</div>
          <div className="text-xs font-medium">
            {formatPrice(priceRanges.ranges.score3 + 1)} - {formatPrice(priceRanges.ranges.score4)}
          </div>
        </div>
        
        <div className="bg-red-100 border border-red-300 rounded p-2 text-center">
          <div className="font-bold text-red-800">Skor 5</div>
          <div className="text-xs text-red-600">Mahal</div>
          <div className="text-xs font-medium">
            &gt; {formatPrice(priceRanges.ranges.score4)}
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-blue-600">
        <p>💡 <strong>Catatan:</strong> Harga adalah kriteria <strong>Cost</strong> - semakin rendah harga, semakin baik nilainya.</p>
        <p>Range akan otomatis menyesuaikan ketika Anda menambahkan produk dengan harga yang berbeda.</p>
      </div>
    </div>
  );
};

export default DynamicPriceGuide;