import PopArticles from "./PopArticles";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="border-4 border-white rounded m-4 p-2 sm:max-w-2xl sm:mx-auto">
        <h3 className="text-xl font-bold p-1">Welcome to News & Stuff!</h3>
        <button
          className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400"
          onClick={() => navigate("/articles")}
        >
          Get Started!
        </button>
      </div>
      <div>
        <PopArticles />
      </div>
    </>
  );
};

export default LandingPage;
