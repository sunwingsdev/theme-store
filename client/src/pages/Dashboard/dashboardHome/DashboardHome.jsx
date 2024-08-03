const DashboardHome = () => {
  return (
    <div className="p-4 w-full">
      <h2 className="text-4xl font-bold mb-6">Dashboard Home :-</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        <div className="border border-l-8 border-l-green-300 hover:border-l-green-600 rounded p-4 hover:bg-white bg-slate-100 transition-all duration-200 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <p>Lorem, ipsum dolor</p>
          <span className="text-4xl font-bold">200 %</span>
        </div>
        <div className="border border-l-8 border-l-red-300 hover:border-l-red-500 rounded p-4 hover:bg-white bg-slate-100 transition-all duration-200 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <p>Lorem, ipsum dolor</p>
          <span className="text-4xl font-bold">200 %</span>
        </div>
        <div className="border border-l-8 border-l-yellow-300 hover:border-l-yellow-500 rounded p-4 hover:bg-white bg-slate-100 transition-all duration-200 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <p>Lorem, ipsum dolor</p>
          <span className="text-4xl font-bold">200 %</span>
        </div>
        <div className="border border-l-8 border-l-orange-300 hover:border-l-orange-500 rounded p-4 hover:bg-white bg-slate-100 transition-all duration-200 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] hover:shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
          <p>Lorem, ipsum dolor</p>
          <span className="text-4xl font-bold">200 %</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
