import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { getAlternatifCode } from '../utils/weightedProduct';

const ResultsTable = ({ results, criteria, weights }) => {
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={20} />;
      case 2:
        return <Medal className="text-gray-400" size={20} />;
      case 3:
        return <Award className="text-amber-600" size={20} />;
      default:
        return <span className="text-gray-600 font-bold">{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 2:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 3:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const getWaktuBalasText = (value) => {
    switch (value) {
      case 1: return '< 1 jam';
      case 2: return '< 1 hari';
      case 3: return '> 1 hari';
      case 4: return 'Tidak membalas';
      default: return 'Unknown';
    }
  };

  const getStandardScoreColor = (score) => {
    switch (score) {
      case 5: return 'bg-green-100 text-green-800';
      case 4: return 'bg-blue-100 text-blue-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 2: return 'bg-orange-100 text-orange-800';
      case 1: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!results || results.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">Belum ada data untuk dihitung. Silakan tambahkan produk terlebih dahulu.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Detail Data Table */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">📊 Detail Data Produk</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Toko
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Terjual
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ulasan +
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waktu Balas
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chat Dibalas
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id}>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.nama_toko}</div>
                    <div className="text-xs text-gray-500">Rank #{result.rank}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(result.harga)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.rating}/5</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.terjual.toLocaleString('id-ID')}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.ulasan.toFixed(2)}%</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getWaktuBalasText(result.waktu_balas)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.chat_dibalas}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Standard Scores Matrix Table */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🎯 Matriks Skor Standar (1-5)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-300">
                  Alternatif / Kriteria
                </th>
                {Object.keys(criteria).map((key, index) => (
                  <th key={key} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    C{index + 1}
                    <div className="text-xs font-normal text-gray-400">
                      {criteria[key].name}
                    </div>
                    <div className="text-xs font-normal text-gray-400">
                      ({criteria[key].type}) - {(weights[key] * 100).toFixed(1)}%
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results
                .sort((a, b) => a.id - b.id)
                .map((result, index) => (
                <tr key={result.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-4 whitespace-nowrap border-r border-gray-300 bg-gray-100">
                    <div className="text-sm font-bold text-gray-900 text-center">{getAlternatifCode(result.nama_toko, results)}</div>
                    <div className="text-xs text-gray-600 text-center">{result.nama_toko}</div>
                  </td>
                  {Object.keys(criteria).map(key => (
                    <td key={key} className="px-4 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getStandardScoreColor(result.standardScores[key])}`}>
                         {result.standardScores[key]}
                       </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weights Information */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">⚖️ Bobot Kriteria</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(criteria).map(key => (
            <div key={key} className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm font-medium text-gray-900">{criteria[key].name}</div>
              <div className="text-xs text-gray-500 mb-1">({criteria[key].type})</div>
              <div className="text-lg font-semibold text-primary-600">{(weights[key] * 100).toFixed(1)}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ranking Table - Moved to bottom */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">🏆 Hasil Ranking Weighted Product</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Toko
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nilai S
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nilai V
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferensi (%)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results
                .sort((a, b) => a.rank - b.rank)
                .map((result) => (
                <tr key={result.id} className={result.rank <= 3 ? 'bg-yellow-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRankBadgeColor(result.rank)}`}>
                      <div className="flex items-center space-x-1">
                        {getRankIcon(result.rank)}
                        <span>#{result.rank}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{result.nama_toko}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.sValue.toFixed(6)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{result.vValue.toFixed(6)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-primary-600">{result.preference.toFixed(2)}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Criteria Legend */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">📋 Legenda Kriteria:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            {Object.keys(criteria).map((key, index) => (
              <div key={key} className="flex items-center space-x-2">
                <span className="font-bold text-blue-800">C{index + 1}:</span>
                <span className="text-blue-700">{criteria[key].name}</span>
                <span className={`px-1.5 py-0.5 text-xs rounded ${
                  criteria[key].type === 'Benefit' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {criteria[key].type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;