// src/components/OwnedItems.tsx
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractABI } from '../lib/contract';

const OwnedItems = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnedItems = async () => {
      setError(null);
      if (!window.ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        setLoading(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const ownerAddress = accounts[0];
        const balance = await contract.balanceOf(ownerAddress);
        
        const items = [];
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.tokenOfOwnerByIndex(ownerAddress, i);
          const tokenURI = await contract.tokenURI(tokenId);
          items.push({ tokenId: tokenId.toString(), tokenURI });
        }

        setItems(items);
      } catch (error) {
        console.error('Error fetching owned items:', error);
        setError('Failed to fetch owned items. See console for details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOwnedItems();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4">
      <h2 className="text-2xl font-bold mb-4">My IoT Data</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-2">
              <strong>Token ID:</strong> {item.tokenId}
              <br />
              <strong>Token URI:</strong> <a href={item.tokenURI} target="_blank" rel="noopener noreferrer">{item.tokenURI}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OwnedItems;
