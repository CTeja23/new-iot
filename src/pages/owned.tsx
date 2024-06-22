// src/pages/owned.tsx

import OwnedItems from '../components/OwnedItems';

const OwnedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">My IoT Data</h1>
        <OwnedItems />
      </main>
    </div>
  );
};

export default OwnedPage;
