
const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
