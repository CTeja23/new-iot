import CancelListing from '../components/CancelListing';

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Cancel IoT Data Listing</h1>
        <CancelListing />
      </main>
    </div>
  );
};

export default CancelPage;
