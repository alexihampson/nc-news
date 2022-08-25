import { useEffect, useState, useContext } from "react";
import { fetchLists, fetchSingles } from "../../api";
import { UserContext } from "../../context/user";

const SignIn = ({ setDisplaySignIn }) => {
  const { setUser } = useContext(UserContext);
  const [optionSelected, setOptionSelected] = useState(true);
  const [usernames, setUsernames] = useState([]);
  const [usernamesLoading, setUsernamesLoading] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);

  useEffect(() => {
    setUsernamesLoading(true);
    fetchLists("/users").then(([users]) => {
      setUsernames(users.map((user) => user.username));
      setUsernamesLoading(false);
    });
  }, []);

  const handleButton = () => {
    setOptionSelected((curr) => !curr);
    setUsernameValid(true);
  };

  const handleBG = () => {
    setDisplaySignIn(false);
  };

  const checkUsername = (event) => {
    if ([...usernames, ""].indexOf(event.target.value) === -1) {
      setUsernameValid(false);
    } else {
      setUsernameValid(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (usernameValid) {
      fetchSingles(`/users/${event.target[0].value}`)
        .then((user) => {
          setUser(user);
          setDisplaySignIn(false);
        })
        .catch(() => {
          setUsernameValid(false);
        });
    }
  };

  if (usernamesLoading) return <></>;

  return (
    <>
      <div className="h-screen w-screen bg-black opacity-50" onClick={handleBG}></div>
      <div className="sm:flex sm:justify-end fixed top-[7.25rem] w-screen sm:top-[4.75rem] sm:right-0">
        <div className="border-b-8 border-white bg-sky-300 sm:border-l-8 sm:rounded-bl">
          <div className="grid grid-cols-2">
            <button
              className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 col-auto disabled:bg-slate-800 disabled:text-white"
              id="log-in-button"
              disabled={optionSelected}
              onClick={handleButton}
            >
              Log In
            </button>
            <button
              className="rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400 col-auto disabled:bg-slate-800 disabled:text-white"
              id="sign-in-button"
              disabled={!optionSelected}
              onClick={handleButton}
            >
              Sign Up
            </button>
          </div>
          <div>
            {optionSelected ? (
              <form onSubmit={handleSubmit} className="m-4 grid grid-rows-[auto_auto_auto]">
                <label htmlFor="username" className="row-auto">
                  Username:{" "}
                </label>
                <input
                  name="username"
                  className={"row-auto w-2/3 mx-auto" + (usernameValid ? "" : " bg-red-400")}
                  onInput={checkUsername}
                  onBlur={checkUsername}
                  onFocus={checkUsername}
                  required
                />
                <button
                  className="row-auto rounded-full bg-white py-2 px-5 m-4 mx-auto sm:hover:bg-slate-400 w-fit disabled:opacity-50"
                  disabled={!usernameValid}
                >
                  Submit
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
