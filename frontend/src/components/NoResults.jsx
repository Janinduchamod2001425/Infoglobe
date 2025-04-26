import Lottie from "lottie-react";
import noResults from "../assets/noResults.json";

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">
        ⚠️ No Results Found
      </h2>
      <p className="text-gray-600 mb-4 text-center">
        We couldn&apos;t find any Country Data matching your search. Try using
        different keywords or browse our collection.
      </p>
      {/* Lottie Animation */}
      <div className="w-88 h-88 mb-4 rounded-lg">
        <Lottie animationData={noResults} loop={true} />
      </div>
    </div>
  );
};

export default NoResults;
