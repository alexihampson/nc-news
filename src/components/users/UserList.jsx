import { useEffect, useState } from "react";
import { fetchLists } from "../../api";
import UserCard from "./UserCard";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    setUsersLoading(true);
    fetchLists("/users", {}).then(([users]) => {
      setUsers(users);
      setUsersLoading(false);
    });
  }, []);

  if (usersLoading)
    return (
      <div className="border-2 border-white rounded m-4 p-2 sm:max-w-xl sm:mx-auto">
        <h3 className="text-xl font-bold p-1 m-3">Loading...</h3>
      </div>
    );

  return (
    <div className="w-10/12 m-auto">
      <ul className="flex flex-wrap justify-center">
        {users.map((user) => {
          return <UserCard key={user.username} localUser={user} />;
        })}
      </ul>
    </div>
  );
};

export default UserList;
