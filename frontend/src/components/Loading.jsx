import Lottie from "lottie-react";
import LoadingAnimation from "../assets/earth.json";
import { useEffect, useState } from "react";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set the loading animation to disappear after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000); // Change 3000 to your desired duration in milliseconds

    // Cleanup timeout on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    isLoading && (
      <div className="bg-gradient-to-r via-green-100 from-blue-100 to-yellow-100 fixed inset-0 flex justify-center items-center z-50">
        <Lottie
          animationData={LoadingAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </div>
    )
  );
};

export default Loading;
