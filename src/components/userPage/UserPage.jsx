import UserCard from "./UserCard";
import UserPageList from "./UserPageList";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { username } = useParams();

  return (
    <div className="sm:grid sm:grid-cols-3">
      <UserCard username={username} />
      <UserPageList username={username} />
    </div>
  );
};

export default UserPage;
