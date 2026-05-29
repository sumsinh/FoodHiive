import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/register");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen bg-orange-500 flex items-center justify-center">
      <h1 className="text-6xl font-bold text-white">
        FoodHiive
      </h1>
    </div>
  );
}

export default Splash;