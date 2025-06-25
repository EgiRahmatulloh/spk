import React, { useState, useEffect } from 'react';
import { Plus, Settings, Calculator, Download, Upload, Trash2 } from 'lucide-react';
import ProductForm from './components/ProductForm';
import ResultsTable from './components/ResultsTable';
import WeightSettings from './components/WeightSettings';
import ScoringGuide from './components/ScoringGuide';
import AlternativeTable from './components/AlternativeTable';
import DynamicPriceGuide from './components/DynamicPriceGuide';
import { 
  calculateWeightedProduct, 
  CRITERIA, 
  SAMPLE_DATA 
} from './utils/weightedProduct';

function App() {
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState(null);
  const [weights, setWeights] = useState(
    Object.keys(CRITERIA).reduce((w, key) => {
      w[key] = CRITERIA[key].weight;
      return w;
    }, {})
  );
  const [showProductForm, setShowProductForm] = useState(false);
  const [showWeightSettings, setShowWeightSettings] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Load sample data on first render
  useEffect(() => {
    setProducts(SAMPLE_DATA);
  }, []);

  // Auto calculate when products or weights change
  useEffect(() => {
    if (products.length > 0) {
      calculateResults();
    } else {
      setResults(null);
    }
  }, [products, weights]);

  const calculateResults = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const calculation = calculateWeightedProduct(products, weights);
      setResults(calculation);
      setIsCalculating(false);
    }, 500); // Small delay for better UX
  };

  const handleAddProduct = (product) => {
    setProducts(prev => [...prev, product]);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleWeightsChange = (newWeights) => {
    setWeights(newWeights);
  };

  const handleLoadSampleData = () => {
    if (confirm('Ini akan mengganti semua data yang ada dengan data contoh. Lanjutkan?')) {
      setProducts(SAMPLE_DATA);
    }
  };

  const handleClearAllData = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua data?')) {
      setProducts([]);
    }
  };

  const handleExportData = () => {
    const exportData = {
      products,
      weights,
      results: results?.results || [],
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `wp-gamepad-results-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        if (importData.products && Array.isArray(importData.products)) {
          setProducts(importData.products);
          if (importData.weights) {
            setWeights(importData.weights);
          }
          alert('Data berhasil diimpor!');
        } else {
          alert('Format file tidak valid!');
        }
      } catch (error) {
        alert('Error membaca file: ' + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Calculator className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Sistem WP - Gamepad X3</h1>
                <p className="text-sm text-gray-600">Weighted Product Method untuk Evaluasi Produk</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowWeightSettings(true)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Pengaturan Bobot"
              >
                <Settings size={20} />
                <span className="hidden sm:inline">Bobot</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                  id="import-file"
                />
                <label
                  htmlFor="import-file"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                  title="Import Data"
                >
                  <Upload size={20} />
                  <span className="hidden sm:inline">Import</span>
                </label>
                
                {results && (
                  <button
                    onClick={handleExportData}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                    title="Export Hasil"
                  >
                    <Download size={20} />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setShowProductForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>Tambah Produk</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Scoring Guide */}
        <ScoringGuide products={products} />
        
        {/* Alternative Table */}
        <AlternativeTable products={products} />
        
        {/* Dynamic Price Guide */}
        <DynamicPriceGuide products={products} />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calculator className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Produk</p>
                <p className="text-2xl font-semibold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Settings className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Kriteria</p>
                <p className="text-2xl font-semibold text-gray-900">{Object.keys(CRITERIA).length}</p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <span className="text-yellow-600 text-xl font-bold">🏆</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toko Terbaik</p>
                <p className="text-lg font-semibold text-gray-900">
                  {results?.results?.[0]?.nama_toko || '-'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-purple-600 text-xl font-bold">%</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Skor Tertinggi</p>
                <p className="text-lg font-semibold text-gray-900">
                  {results?.results?.[0]?.preference?.toFixed(2) || '0'}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {products.length === 0 && (
          <div className="card text-center py-12 mb-8">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Data Produk</h3>
              <p className="text-gray-600 mb-6">
                Mulai dengan menambahkan data produk atau memuat data contoh untuk melihat perhitungan WP.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowProductForm(true)}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Tambah Produk Baru</span>
                </button>
                <button
                  onClick={handleLoadSampleData}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Upload size={20} />
                  <span>Muat Data Contoh</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {products.length > 0 && (
          <div className="card mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Data Produk ({products.length})</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleLoadSampleData}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Muat Data Contoh
                </button>
                <button
                  onClick={handleClearAllData}
                  className="flex items-center space-x-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Hapus Semua</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Toko
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
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.nama_toko}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                          }).format(product.harga)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.rating}/5</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.terjual.toLocaleString('id-ID')}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Hapus Produk"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isCalculating && (
          <div className="card text-center py-8 mb-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Menghitung hasil WP...</p>
          </div>
        )}
      </main>

      {/* Results - Moved to bottom after all content */}
      {results && !isCalculating && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <ResultsTable 
            results={results.results} 
            criteria={results.criteria} 
            weights={results.weights} 
          />
        </div>
      )}

      {/* Modals */}
      {showProductForm && (
        <ProductForm
          onAddProduct={handleAddProduct}
          onClose={() => setShowProductForm(false)}
        />
      )}

      {showWeightSettings && (
        <WeightSettings
          weights={weights}
          onWeightsChange={handleWeightsChange}
          onClose={() => setShowWeightSettings(false)}
        />
      )}
    </div>
  );
}

export default App;