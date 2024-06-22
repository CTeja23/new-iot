import ListForSale from '../components/ListForSale';

const ListPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">List IoT Data for Sale</h1>
        <ListForSale />
      </main>
    </div>
  );
};

export default ListPage;
