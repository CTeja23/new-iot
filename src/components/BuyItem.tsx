// src/components/BuyItem.tsx

import { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../lib/contract';

const BuyItem = () => {
  const [tokenId, setTokenId] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buyIoTData = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      setLoading(true);
      const tx = await contract.buyIoTData(tokenId, { value: ethers.utils.parseUnits(price, 'ether') });
      await tx.wait();
      alert('IoT Data Bought Successfully!');
    } catch (error) {
      console.error('Error buying IoT data:', error);
      setError('Failed to buy IoT data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-bold mb-4">Buy IoT Data</h2>
      <input
        type="text"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Enter Token ID"
        className="w-full px-3 py-2 mb-4 border rounded-md"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price (ETH)"
        className="w-full px-3 py-2 mb-4 border rounded-md"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={buyIoTData}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Buying...' : 'Buy'}
      </button>
    </div>
  );
};

export default BuyItem;
