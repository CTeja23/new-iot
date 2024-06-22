// src/components/TopBar.tsx

import Link from 'next/link';
import { useState } from 'react';
import classNames from 'classnames';
import { ethers } from 'ethers';

const TopBar = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setError(null);
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length === 0) {
          setError('No accounts found');
          return;
        }
        setAccounts(accounts);
        setSelectedAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
        setError('Failed to connect to MetaMask');
      }
    } else {
      setError('MetaMask is not installed!');
    }
  };

  const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccount(event.target.value);
  };

  return (
    <div className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4">
        <div className="text-xl font-bold">IoT Marketplace</div>
        <div className="flex space-x-4 items-center">
          <TopBarItem href="/">Home</TopBarItem>
          <TopBarItem href="/create">Create</TopBarItem>
          <TopBarItem href="/list">List for Sale</TopBarItem>
          <TopBarItem href="/buy">Buy</TopBarItem>
          <TopBarItem href="/cancel">Cancel Listing</TopBarItem>
          {selectedAccount ? (
            <div>
              <span className="mr-2">Connected: {selectedAccount.substring(0, 6)}...{selectedAccount.substring(selectedAccount.length - 4)}</span>
              <select value={selectedAccount} onChange={handleAccountChange} className="bg-gray-700 text-white p-2 rounded">
                {accounts.map(account => (
                  <option key={account} value={account}>
                    {account.substring(0, 6)}...{account.substring(account.length - 4)}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Connect Wallet
            </button>
          )}
          {error && <span className="text-red-500 ml-4">{error}</span>}
        </div>
      </div>
    </div>
  );
};

type TopBarItemProps = {
  href: string;
  children: React.ReactNode;
};

const TopBarItem = ({ href, children }: TopBarItemProps) => {
  return (
    <Link href={href} className={classNames('px-3 py-2 rounded-lg text-white', {
      'bg-blue-600': isActive(href),
      'hover:bg-blue-700': !isActive(href),
    })}>
      {children}
    </Link>
  );
};

const isActive = (href: string) => {
  return typeof window !== 'undefined' && window.location.pathname === href;
};

export default TopBar;
