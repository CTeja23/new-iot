// src/components/CancelListing.tsx

import { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../lib/contract';

const CancelListing = () => {
  const [tokenId, setTokenId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cancelListing = async () => {
    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      setLoading(true);
      const tx = await contract.cancelListing(tokenId);
      await tx.wait();
      alert('Listing Canceled Successfully!');
    } catch (error) {
      console.error('Error canceling listing:', error);
      setError('Failed to cancel listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-bold mb-4">Cancel Listing</h2>
      <input
        type="text"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Enter Token ID"
        className="w-full px-3 py-2 mb-4 border rounded-md"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={cancelListing}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Canceling...' : 'Cancel Listing'}
      </button>
    </div>
  );
};

export default CancelListing;
