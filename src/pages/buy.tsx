import BuyItem from '../components/BuyItem';

const BuyPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Buy IoT Data</h1>
        <BuyItem />
      </main>
    </div>
  );
};

export default BuyPage;
