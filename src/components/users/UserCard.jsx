import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user";

const UserCard = ({ localUser }) => {
  const { user } = useContext(UserContext);

  return (
    <li className={"mx-auto w-full sm:w-fit"}>
      <Link to={`/users/${localUser.username}`}>
        <div
          className={
            "w-full border-2 border-white rounded my-4 mx-auto p-2 shadow shadow-sky-800 sm:max-w-2xl sm:mx-auto sm:hover:shadow-lg sm:hover:shadow-sky-800" +
            (user.username === localUser.username ? " border-emerald-600" : "")
          }
        >
          <div className=" grid grid-cols-[auto_auto] grid-rows-2">
            <img
              src={localUser.avatar_url}
              alt="Avatar"
              className="col-auto row-start-1 row-span-2 h-32 mx-auto mx-4"
            />
            <h2 className="text-2xl font-bold p-1 col-auto row-auto mx-4">{localUser.username}</h2>
            <h2 className="text-xl font-bold p-1 col-auto row-auto mx-4">{localUser.name}</h2>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default UserCard;
