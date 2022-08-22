import Title from "./Title";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header className="border-b-8 border-white sticky top-0 bg-sky-300 sm:grid sm:grid-cols-2">
      <Title className="sm:col-auto sm:text-left" />
      <NavBar className="sm:col-auto" />
    </header>
  );
};

export default Header;
