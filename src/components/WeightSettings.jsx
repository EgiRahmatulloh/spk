import React, { useState, useEffect } from 'react';
import { Settings, RotateCcw, Save } from 'lucide-react';
import { CRITERIA } from '../utils/weightedProduct';

const WeightSettings = ({ weights, onWeightsChange, onClose }) => {
  const [localWeights, setLocalWeights] = useState(weights);
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    const total = Object.values(localWeights).reduce((sum, weight) => sum + parseFloat(weight || 0), 0);
    setTotalWeight(total);
  }, [localWeights]);

  const handleWeightChange = (criteria, value) => {
    const numValue = parseFloat(value) || 0;
    setLocalWeights(prev => ({
      ...prev,
      [criteria]: numValue
    }));
  };

  const handleReset = () => {
    const defaultWeights = Object.keys(CRITERIA).reduce((w, key) => {
      w[key] = CRITERIA[key].weight;
      return w;
    }, {});
    setLocalWeights(defaultWeights);
  };

  const handleSave = () => {
    if (Math.abs(totalWeight - 1) > 0.001) {
      alert('Total bobot harus sama dengan 1.0 (100%)');
      return;
    }
    onWeightsChange(localWeights);
    onClose();
  };

  const normalizeWeights = () => {
    if (totalWeight === 0) return;
    
    const normalized = {};
    Object.keys(localWeights).forEach(key => {
      normalized[key] = localWeights[key] / totalWeight;
    });
    setLocalWeights(normalized);
  };

  const isValidTotal = Math.abs(totalWeight - 1) < 0.001;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-2">
            <Settings className="text-primary-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">Pengaturan Bobot Kriteria</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Bobot Kriteria</h3>
                <p className="text-sm text-gray-600">Sesuaikan bobot untuk setiap kriteria. Total harus = 1.0</p>
              </div>
              <div className={`text-right ${isValidTotal ? 'text-green-600' : 'text-red-600'}`}>
                <div className="text-sm font-medium">Total Bobot</div>
                <div className="text-lg font-bold">{totalWeight.toFixed(3)}</div>
                <div className="text-xs">{(totalWeight * 100).toFixed(1)}%</div>
              </div>
            </div>
            
            {!isValidTotal && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-yellow-800">
                    Total bobot tidak sama dengan 1.0. Klik "Normalisasi" untuk menyesuaikan otomatis.
                  </p>
                  <button
                    onClick={normalizeWeights}
                    className="text-sm bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded transition-colors"
                  >
                    Normalisasi
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {Object.keys(CRITERIA).map(key => {
              const criteria = CRITERIA[key];
              const percentage = (localWeights[key] * 100).toFixed(1);
              
              return (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{criteria.name}</h4>
                      <p className="text-sm text-gray-500">
                        Tipe: <span className={`font-medium ${
                          criteria.type === 'benefit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {criteria.type === 'benefit' ? 'Benefit (semakin tinggi semakin baik)' : 'Cost (semakin rendah semakin baik)'}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary-600">{percentage}%</div>
                      <div className="text-xs text-gray-500">dari total</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={localWeights[key]}
                      onChange={(e) => handleWeightChange(key, e.target.value)}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={localWeights[key]}
                      onChange={(e) => handleWeightChange(key, e.target.value)}
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  {/* Visual weight bar */}
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(localWeights[key] * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between items-center pt-6 border-t mt-6">
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw size={16} />
              <span>Reset ke Default</span>
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="btn-secondary"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={!isValidTotal}
                className={`flex items-center space-x-2 ${
                  isValidTotal 
                    ? 'btn-primary' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed px-4 py-2 rounded-lg'
                }`}
              >
                <Save size={16} />
                <span>Simpan Bobot</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #2563eb;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default WeightSettings;