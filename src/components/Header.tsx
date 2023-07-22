import Navigation from "./Navigation";

const navItems = [
  { label: "Posts", href: "/" },
  { label: "Todos", href: "/todos" },
  { label: "Albums", href: "/albums" },
];

const Header = () => {
  return (
    <header className="header flex justify-center items-center">
      <Navigation navLinks={navItems} />
    </header>
  );
};

export default Header;