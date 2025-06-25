import React from 'react';
import { getAlternatifCode } from '../utils/weightedProduct';

const AlternativeTable = ({ products = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          📋 Tabel Alternatif
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Mapping kode alternatif dengan nama toko
        </p>
      </div>
      
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alternatif
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kode
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => {
                const kode = getAlternatifCode(product.nama_toko, products);
                return (
                  <tr key={`${product.nama_toko}-${index}`} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        Toko {product.nama_toko}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {kode}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>💡 Catatan:</strong> Kode alternatif ini akan tetap konsisten untuk setiap toko, 
            tidak berubah berdasarkan ranking hasil perhitungan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlternativeTable;