import Title from "./Title";
import NavBar from "./NavBar";
import { useContext } from "react";
import { ErrContext } from "../../context/err";

const Header = () => {
  const { err } = useContext(ErrContext);

  return (
    <header className="border-b-8 border-white sticky top-0 bg-sky-300 sm:grid sm:grid-cols-2 z-10">
      <Title className="sm:col-auto sm:text-left" />
      <NavBar className="sm:col-auto" />
      {err ? (
        <div className="fixed top-28 w-full">
          <div className="flex justify-center text-center text-white">
            <div className="bg-red-800 rounded py-4 px-2 w-fit">
              <p>{err}</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};

export default Header;
