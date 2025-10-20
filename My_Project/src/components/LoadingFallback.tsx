const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="text-6xl mb-4 animate-bounce">🏝️</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Loading 3D Island...
        </h2>
        <p className="text-gray-600 mb-4">
          Preparing your interactive experience
        </p>
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;