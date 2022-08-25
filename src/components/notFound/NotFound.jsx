import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/");
  };

  return (
    <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto">
      <h3 className="text-2xl font-bold p-1">404 - Page Not Found!</h3>
      <h4 className="text-xl font-bold p-1">
        Unfortunately, the page you are looking for is not available.
      </h4>
      <br />
      <h4 className="text-xl font-bold p-1">
        You may have typed the web address incorrectly. Please check the address you entered.
      </h4>
      <button
        className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 disabled:opacity-50"
        onClick={handleButton}
      >
        Back to home page
      </button>
    </div>
  );
};

export default NotFound;
