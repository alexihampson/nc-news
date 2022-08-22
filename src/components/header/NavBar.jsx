import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className=" grid grid-cols-3 grid-rows-1 my-4">
      <div className="col-auto row-auto">
        <Link to="/articles">Articles</Link>
      </div>
      <div className="col-auto row-auto">
        <span to="/topics">Topics</span>
      </div>
      <div className="col-auto row-auto">Sign In</div>
    </nav>
  );
};

export default NavBar;
