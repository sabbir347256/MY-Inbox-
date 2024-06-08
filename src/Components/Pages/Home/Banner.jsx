const Banner = () => {
  return (
    <div className="bg-blue-500 text-white py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to MyInbox</h1>
        <p className="text-lg mb-8 text-center">Stay connected with your friends and family through our seamless chat experience.</p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md px-4 py-2 rounded-l-md border-none focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button className="bg-blue-700 px-4 py-2 rounded-r-md hover:bg-blue-800 focus:outline-none">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
