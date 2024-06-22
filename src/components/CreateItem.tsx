// src/components/CreateItem.tsx

import { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../lib/contract';

const CreateItem = () => {
  const [tokenURI, setTokenURI] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createIoTData = async () => {
    setError(null); // Reset error state

    if (!tokenURI) {
      setError('Please enter a valid token URI.');
      return;
    }

    if (!window.ethereum) {
      setError('Please install MetaMask!');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
      setLoading(true);
      console.log('Sending transaction to create IoT data with URI:', tokenURI);
      const tx = await contract.createIoTData(tokenURI);
      console.log('Transaction hash:', tx.hash);
      await tx.wait();
      alert('IoT Data Created Successfully!');
    } catch (error) {
      console.error('Error creating IoT data:', error);
      setError('Failed to create IoT data. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-bold mb-4">Create IoT Data</h2>
      <input
        type="text"
        value={tokenURI}
        onChange={(e) => setTokenURI(e.target.value)}
        placeholder="Enter Token URI"
        className="w-full px-3 py-2 mb-4 border rounded-md"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={createIoTData}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Creating...' : 'Create'}
      </button>
    </div>
  );
};

export default CreateItem;
