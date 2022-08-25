import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/user";

const NavBar = ({ setDisplaySignIn }) => {
  const { user } = useContext(UserContext);

  const handleSignIn = () => {
    setDisplaySignIn((curr) => !curr);
  };

  return (
    <nav className=" grid grid-cols-3 grid-rows-1 my-4">
      <Link to="/articles">
        <div className="col-auto row-auto">Articles</div>
      </Link>
      <Link to="/topics">
        <div className="col-auto row-auto">
          <span to="/topics">Topics</span>
        </div>
      </Link>
      {user.username ? (
        <Link to={`/users/${user.username}`}>
          <div className="col-auto row-auto">
            <div className="grid grid-cols-[auto_auto]">
              <span className="col-auto">{user.username}</span>
              <img src={user.avatar_url} alt="User Icon" className="h-5 col-auto" />
            </div>
          </div>
        </Link>
      ) : (
        <div className="col-auto row-auto cursor-pointer" onClick={handleSignIn}>
          Sign In
        </div>
      )}
    </nav>
  );
};

export default NavBar;
