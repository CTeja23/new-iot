import CreateItem from '../components/CreateItem';

const CreatePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Create IoT Data</h1>
        <CreateItem />
      </main>
    </div>
  );
};

export default CreatePage;
