import { useContext } from "react";
import { patchSingle } from "../../api";
import { ErrContext } from "../../context/err";
import { UserContext } from "../../context/user";
import { errReset } from "../../utils";

const ChangeAvatar = ({ setDisplayAvatar, setLocalUser }) => {
  const { user, setUser } = useContext(UserContext);
  const { setErr } = useContext(ErrContext);
  const handleClose = () => {
    setDisplayAvatar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    patchSingle(`/users/${user.username}`, {
      avatar_url:
        event.target[0].value ||
        "https://st.depositphotos.com/1779253/5140/v/380/depositphotos_51404241-stock-illustration-female-profile-avatar-icon-white.jpg",
    })
      .then((res) => {
        setUser(res.data.user);
        setLocalUser(res.data.user);
        setDisplayAvatar(false);
      })
      .catch(() => {
        setDisplayAvatar(false);
        setErr("Unable to Update, Please Try Again");
        setTimeout(errReset, 5000, setErr);
      });
  };

  return (
    <>
      <div
        className="h-screen w-screen bg-black opacity-50 fixed top-0"
        onClick={handleClose}
      ></div>
      <div className="h-screen w-screen fixed top-32 pointer-events-none">
        <div className="border-2 border-white bg-sky-300 rounded m-4 p-2 sm:max-w-xl sm:mx-auto mx-auto w-11/12 opacity-100 pointer-events-auto">
          <div className="grid grid-cols-[90%_10%] grid-rows-1">
            <h3 className="text-lg font-bold p-1 m-1 col-start-1 col-span-2 row-start-1">
              Change Avatar
            </h3>
            <button
              onClick={handleClose}
              className="text-white font-bold col-start-2 row-start-1 rounded-full bg-sky-300 py-1 px-3"
            >
              X
            </button>
          </div>
          <form
            className="grid grid-cols-1 grid-rows-[auto_auto_auto] sm:grid-cols-2 sm:grid-rows-2"
            onSubmit={handleSubmit}
          >
            <label htmlFor="avatar-url" className="col-auto row-auto m-auto font-bold my-3">
              New Avatar:
            </label>
            <input
              type="url"
              name="avatar"
              placeholder="https://test.com/image.jpg"
              className={"w-2/3 mx-auto p-1 col-auto row-auto sm:w-full sm:my-2 h-fit m-auto"}
            />
            <button className="col-auto sm:col-span-2 row-auto rounded-full bg-white py-2 px-3 my-4 mx-auto w-fit sm:hover:bg-slate-400">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeAvatar;
