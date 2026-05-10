const LoadingFallback = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50">
      <div className="animate-pulse rounded-3xl bg-white p-12 shadow-soft">
        <div className="mb-4 h-4 w-48 rounded-full bg-slate-200"></div>
        <div className="space-y-3">
          <div className="h-4 w-72 rounded-full bg-slate-200"></div>
          <div className="h-4 w-64 rounded-full bg-slate-200"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;
