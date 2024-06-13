const HomePage = () => {
  return (
    <div className="pageTemplate1">
      <div className="w-full flex justify-center items-center gap-4 bg-blue-300 border-4 border-white rounded-[300px] ring-4 ring-blue-300 p-10">
        <div className="flex-1 flex flex-col justify-center items-end">
          <img src="images/UM_LOGO.png" />
        </div>
        <div className="flex-1 flex flex-col justify-center items-start gap-8 ml-16 -mt-8">
          <h1 className="text-7xl font-bold text-transparent bg-gradient-to-b from-amber-400 to-amber-600 bg-clip-text">
            Accreditation System
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
