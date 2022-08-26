import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSingles } from "../../api";
import { UserContext } from "../../context/user";
import ChangeAvatar from "./ChangeAvatar";
import DeleteConfirm from "../articleId/DeleteConfirm";

const UserCard = ({ username }) => {
  const { user, setUser } = useContext(UserContext);
  const [localUser, setLocalUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [displayAvatar, setDisplayAvatar] = useState(false);
  const [displayDelete, setDisplayDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUserLoading(true);
    fetchSingles(`/users/${username}`, {})
      .then((user) => {
        setLocalUser(user);
        setUserLoading(false);
      })
      .catch(() => {
        navigate("/404");
      });
  }, [username, navigate]);

  const handleSignOut = () => {
    setUser({ username: null });
    navigate("/");
  };

  const handleAvatar = () => {
    setDisplayAvatar(true);
  };

  const handleDelete = () => {
    setDisplayDelete(true);
  };

  const onDelete = () => {
    handleSignOut();
  };

  return (
    <>
      <div className="border-2 border-white rounded m-4 p-2 sm:w-xl sm:mx-auto sm:col-start-1 sm:col-span-2 sm:h-fit sm:sticky sm:top-32">
        {userLoading ? (
          <h2 className="text-xl font-bold p-1">Loading User...</h2>
        ) : (
          <div className="grid grid-cols-[auto_auto] grid-rows-[1fr_1fr_auto_auto]">
            <img
              src={localUser.avatar_url}
              alt="Avatar"
              className="col-auto row-start-1 row-span-2 h-32 mx-auto"
            />
            <h2 className="text-2xl font-bold p-1 col-auto row-auto">{localUser.username}</h2>
            <h2 className="text-xl font-bold p-1 col-auto row-auto">{localUser.name}</h2>
            {user.username === localUser.username ? (
              <>
                <button
                  onClick={handleAvatar}
                  className="col-start-1 row-start-3 rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400"
                >
                  Change Avatar
                </button>
                <button
                  onClick={handleSignOut}
                  className="col-start-2 row-start-3 rounded-full bg-white py-2 px-3 m-4 sm:hover:bg-slate-400"
                >
                  Sign Out
                </button>
                <button
                  className="col-start-1 col-span-2 row-start-4 rounded-full bg-red-800 text-white py-2 px-3 m-5 sm:hover:bg-slate-400"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      {displayAvatar ? (
        <ChangeAvatar setDisplayAvatar={setDisplayAvatar} setLocalUser={setLocalUser} />
      ) : (
        <></>
      )}
      {displayDelete ? (
        <DeleteConfirm
          setDisplayDelete={setDisplayDelete}
          endpoint={`/users/${user.username}`}
          onDelete={onDelete}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserCard;
