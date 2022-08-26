import { useEffect, useState, useContext } from "react";
import { fetchLists, fetchSingles, postSingle } from "../../api";
import { UserContext } from "../../context/user";
import { ErrContext } from "../../context/err";
import { errReset } from "../../utils";

const SignIn = ({ setDisplaySignIn }) => {
  const { setUser } = useContext(UserContext);
  const { setErr } = useContext(ErrContext);
  const [optionSelected, setOptionSelected] = useState(true);
  const [usernames, setUsernames] = useState([]);
  const [usernamesLoading, setUsernamesLoading] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameFree, setUsernameFree] = useState(true);
  const [fullNameValid, setFullNameValid] = useState(true);

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

  const checkUsernameFree = (event) => {
    if (usernames.indexOf(event.target.value) === -1) {
      setUsernameFree(true);
    } else {
      setUsernameFree(false);
    }
  };

  const checkFullNameValid = (event) => {
    setFullNameValid(
      /^[a-zA-Z-]+(\s[a-zA-Z-]+)*$/g.test(event.target.value) || event.target.value === ""
    );
  };

  const handleLogIn = (event) => {
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

  const handleSignUp = (event) => {
    event.preventDefault();
    const body = {
      username: event.target[0].value,
      name: event.target[1].value,
      avatar_url:
        event.target[2].value ||
        "https://st.depositphotos.com/1779253/5140/v/380/depositphotos_51404241-stock-illustration-female-profile-avatar-icon-white.jpg",
    };

    if (usernameFree && fullNameValid) {
      setDisplaySignIn(false);
      postSingle("/users", body)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          setErr("Unable To Add User, Please Try Again");
          setTimeout(errReset, 5000, setErr);
        });
    }
  };

  if (usernamesLoading) return <></>;

  return (
    <>
      <div className="h-screen w-screen bg-black opacity-50" onClick={handleBG}></div>
      <div className="sm:flex sm:justify-end fixed top-[7.25rem] w-screen sm:top-[4.75rem] sm:right-0">
        <div className="border-b-8 border-white bg-sky-300 sm:border-l-8 sm:rounded-bl grid grid-rows-[auto_auto]">
          <div className="row-auto grid grid-cols-2">
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
          <div className="row-auto">
            {optionSelected ? (
              <form
                onSubmit={handleLogIn}
                className="m-4 mt-0 grid grid-rows-[auto_auto_auto] sm:grid-cols-[auto_auto] sm:grid-rows-[auto_auto] sm:w-96"
              >
                <label htmlFor="username" className="row-auto m-3 font-bold text-lg sm:col-auto">
                  Username:{" "}
                </label>
                <input
                  name="username"
                  placeholder="user123"
                  className={
                    "row-auto w-2/3 mx-auto p-1 sm:col-auto sm:w-full sm:my-2" +
                    (usernameValid ? "" : " bg-red-400")
                  }
                  onInput={checkUsername}
                  onBlur={checkUsername}
                  onFocus={checkUsername}
                  required
                />
                <button
                  className="row-auto rounded-full bg-white py-2 px-5 m-4 mx-auto sm:hover:bg-slate-400 w-fit disabled:opacity-50 sm:col-start-1 sm:col-span-2"
                  disabled={!usernameValid}
                >
                  Log In
                </button>
              </form>
            ) : (
              <form
                onSubmit={handleSignUp}
                className="m-4 mt-0 grid grid-rows-[auto_auto_auto_auto_auto_auto_auto] sm:grid-cols-[auto_auto] sm:grid-rows-[auto_auto_auto_auto] sm:w-96"
              >
                <label htmlFor="username" className="row-auto m-3 font-bold text-lg sm:col-auto ">
                  Username:{" "}
                </label>
                <input
                  name="username"
                  placeholder="user123"
                  className={
                    "row-auto w-2/3 mx-auto p-1 sm:col-auto sm:w-full sm:my-2" +
                    (usernameFree ? "" : " bg-red-400")
                  }
                  onInput={checkUsernameFree}
                  onBlur={checkUsernameFree}
                  onFocus={checkUsernameFree}
                  required
                />
                <label htmlFor="full-name" className="row-auto m-3 font-bold text-lg sm:col-auto">
                  Full Name:{" "}
                </label>
                <input
                  name="full-name"
                  placeholder="John Smith"
                  className={
                    "row-auto w-2/3 mx-auto p-1 sm:col-auto sm:w-full sm:my-2" +
                    (fullNameValid ? "" : " bg-red-400")
                  }
                  onInput={checkFullNameValid}
                  onBlur={checkFullNameValid}
                  onFocus={checkFullNameValid}
                  required
                />
                <label htmlFor="avatar" className="row-auto m-3 font-bold text-lg sm:col-auto">
                  Add an Avatar
                </label>
                <input
                  type="url"
                  name="avatar"
                  placeholder="https://test.com/image.jpg"
                  className={"row-auto w-2/3 mx-auto p-1 sm:col-auto sm:w-full sm:my-2"}
                ></input>
                <button
                  className="row-auto rounded-full bg-white py-2 px-5 m-4 mx-auto sm:hover:bg-slate-400 w-fit disabled:opacity-50 sm:col-start-1 sm:col-span-2"
                  disabled={!usernameFree || !fullNameValid}
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
