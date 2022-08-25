import Title from "./Title";
import NavBar from "./NavBar";
import SignIn from "./SignIn";
import { useContext, useState } from "react";
import { ErrContext } from "../../context/err";

const Header = () => {
  const { err } = useContext(ErrContext);
  const [displaySignIn, setDisplaySignIn] = useState(false);

  return (
    <>
      <header className="fixed -top-4 inset-x-0 z-10 w-screen overflow-hidden mt-0">
        <div className="border-b-8 border-white bg-sky-300 sm:grid sm:grid-cols-2 pt-4">
          <Title className="sm:col-auto sm:text-left" />
          <NavBar className="sm:col-auto" setDisplaySignIn={setDisplaySignIn} />
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
        </div>
        {displaySignIn ? <SignIn setDisplaySignIn={setDisplaySignIn} /> : <></>}
      </header>
      <div className="mb-32"></div>
    </>
  );
};

export default Header;
