import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { calculatePositiveReviewPercentage } from '../utils/weightedProduct';

const ProductForm = ({ onAddProduct, onClose }) => {
  const [formData, setFormData] = useState({
    nama_toko: '',
    harga: '',
    rating: '',
    terjual: '',
    bintang5: '',
    bintang4: '',
    total_review: '',
    waktu_balas: '2', // default < 1 hari
    chat_dibalas: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nama_toko.trim()) newErrors.nama_toko = 'Nama toko harus diisi';
    if (!formData.harga || formData.harga <= 0) newErrors.harga = 'Harga harus lebih dari 0';
    if (!formData.rating || formData.rating < 0 || formData.rating > 5) newErrors.rating = 'Rating harus antara 0-5';
    if (!formData.terjual || formData.terjual < 0) newErrors.terjual = 'Jumlah terjual harus >= 0';
    if (!formData.bintang5 || formData.bintang5 < 0) newErrors.bintang5 = 'Review bintang 5 harus >= 0';
    if (!formData.bintang4 || formData.bintang4 < 0) newErrors.bintang4 = 'Review bintang 4 harus >= 0';
    if (!formData.total_review || formData.total_review <= 0) newErrors.total_review = 'Total review harus > 0';
    if (!formData.chat_dibalas || formData.chat_dibalas < 0 || formData.chat_dibalas > 100) {
      newErrors.chat_dibalas = 'Persentase chat dibalas harus antara 0-100';
    }
    
    const totalPositive = parseInt(formData.bintang5) + parseInt(formData.bintang4);
    if (totalPositive > parseInt(formData.total_review)) {
      newErrors.total_review = 'Total review tidak boleh kurang dari jumlah review positif';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const ulasanPositif = calculatePositiveReviewPercentage({
      bintang5: parseInt(formData.bintang5),
      bintang4: parseInt(formData.bintang4),
      total: parseInt(formData.total_review)
    });
    
    const productData = {
      id: Date.now(),
      nama_toko: formData.nama_toko.trim(),
      harga: parseFloat(formData.harga),
      rating: parseFloat(formData.rating),
      terjual: parseInt(formData.terjual),
      ulasan: ulasanPositif,
      waktu_balas: parseInt(formData.waktu_balas),
      chat_dibalas: parseFloat(formData.chat_dibalas)
    };
    
    onAddProduct(productData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Tambah Produk Baru</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Toko *
              </label>
              <input
                type="text"
                name="nama_toko"
                value={formData.nama_toko}
                onChange={handleChange}
                className={`input-field ${errors.nama_toko ? 'border-red-500' : ''}`}
                placeholder="Masukkan nama toko"
              />
              {errors.nama_toko && <p className="text-red-500 text-xs mt-1">{errors.nama_toko}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga (Rp) *
              </label>
              <input
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                className={`input-field ${errors.harga ? 'border-red-500' : ''}`}
                placeholder="75000"
                min="0"
              />
              {errors.harga && <p className="text-red-500 text-xs mt-1">{errors.harga}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating Toko *
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className={`input-field ${errors.rating ? 'border-red-500' : ''}`}
                placeholder="4.8"
                min="0"
                max="5"
                step="0.1"
              />
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Terjual *
              </label>
              <input
                type="number"
                name="terjual"
                value={formData.terjual}
                onChange={handleChange}
                className={`input-field ${errors.terjual ? 'border-red-500' : ''}`}
                placeholder="272"
                min="0"
              />
              {errors.terjual && <p className="text-red-500 text-xs mt-1">{errors.terjual}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waktu Balas Chat *
              </label>
              <select
                name="waktu_balas"
                value={formData.waktu_balas}
                onChange={handleChange}
                className="input-field"
              >
                <option value="1">&lt; 1 jam</option>
                <option value="2">&lt; 1 hari</option>
                <option value="3">&gt; 1 hari</option>
                <option value="4">Tidak membalas</option>
              </select>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Data Review untuk Perhitungan Ulasan Positif</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Bintang 5 *
                </label>
                <input
                  type="number"
                  name="bintang5"
                  value={formData.bintang5}
                  onChange={handleChange}
                  className={`input-field ${errors.bintang5 ? 'border-red-500' : ''}`}
                  placeholder="150"
                  min="0"
                />
                {errors.bintang5 && <p className="text-red-500 text-xs mt-1">{errors.bintang5}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Bintang 4 *
                </label>
                <input
                  type="number"
                  name="bintang4"
                  value={formData.bintang4}
                  onChange={handleChange}
                  className={`input-field ${errors.bintang4 ? 'border-red-500' : ''}`}
                  placeholder="80"
                  min="0"
                />
                {errors.bintang4 && <p className="text-red-500 text-xs mt-1">{errors.bintang4}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Review *
                </label>
                <input
                  type="number"
                  name="total_review"
                  value={formData.total_review}
                  onChange={handleChange}
                  className={`input-field ${errors.total_review ? 'border-red-500' : ''}`}
                  placeholder="250"
                  min="1"
                />
                {errors.total_review && <p className="text-red-500 text-xs mt-1">{errors.total_review}</p>}
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Chat Dibalas (%) *
              </label>
              <input
                type="number"
                name="chat_dibalas"
                value={formData.chat_dibalas}
                onChange={handleChange}
                className={`input-field ${errors.chat_dibalas ? 'border-red-500' : ''}`}
                placeholder="96"
                min="0"
                max="100"
                step="0.1"
              />
              {errors.chat_dibalas && <p className="text-red-500 text-xs mt-1">{errors.chat_dibalas}</p>}
            </div>
            
            {formData.bintang5 && formData.bintang4 && formData.total_review && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Persentase Ulasan Positif:</strong> {' '}
                  {calculatePositiveReviewPercentage({
                    bintang5: parseInt(formData.bintang5) || 0,
                    bintang4: parseInt(formData.bintang4) || 0,
                    total: parseInt(formData.total_review) || 1
                  }).toFixed(2)}%
                </p>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Tambah Produk</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;