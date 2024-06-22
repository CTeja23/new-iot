// src/components/ListForSale.tsx

import { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../lib/contract';

const ListForSale = ({ tokenIdProp }: { tokenIdProp?: number | null }) => {
  const [tokenId, setTokenId] = useState(tokenIdProp || '');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listIoTData = async () => {
    setError(null); // Reset error state

    if (!tokenId || !price) {
      setError('Please enter a valid token ID and price.');
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
      const tx = await contract.listIoTData(tokenId, ethers.utils.parseUnits(price, 'ether'));
      console.log('Transaction hash:', tx.hash);
      await tx.wait();
      alert('IoT Data Listed for Sale Successfully!');
    } catch (error) {
      console.error('Error listing IoT data for sale:', error);
      setError('Failed to list IoT data for sale. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 mt-4">
      <h2 className="text-2xl font-bold mb-4">List IoT Data for Sale</h2>
      {!tokenIdProp && (
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Enter Token ID"
          className="w-full px-3 py-2 mb-4 border rounded-md"
        />
      )}
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter Price (ETH)"
        className="w-full px-3 py-2 mb-4 border rounded-md"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={listIoTData}
        disabled={loading || !tokenId}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Listing...' : 'List for Sale'}
      </button>
    </div>
  );
};

export default ListForSale;
