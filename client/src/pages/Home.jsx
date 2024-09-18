import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [accountSize, setAccountSize] = useState('');
    const [cost, setCost] = useState('');
    const [maxDD, setMaxDD] = useState('');
    const [target, setTarget] = useState('');
    const [result, setResult] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://127.0.0.1:8000/predict/', {
          account_size: parseFloat(accountSize),
          cost: parseFloat(cost),
          max_dd: parseFloat(maxDD),
          target: parseFloat(target),
        });
        setResult(response.data.predicted_live);
      } catch (error) {
        console.error('Error making API call', error);
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-300 via-purple-300 to-purple-500 flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-white max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-4">One Phase Challenge</h1>
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Account Size</label>
              <input
                type="number"
                value={accountSize}
                onChange={(e) => setAccountSize(e.target.value)}
                className="mt-1 block w-full text-black p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium">Cost</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="mt-1 block w-full p-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium">Max DD (%)</label>
              <input
                type="number"
                value={maxDD}
                onChange={(e) => setMaxDD(e.target.value)}
                className="mt-1 block w-full p-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium">Target (%)</label>
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="mt-1 block w-full p-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>
  
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Calculate
            </button>
          </form>
  
          {result !== null && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Required in Live Account</h2>
              <p className="text-2xl mt-2 font-bold">${result.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

export default Home;
