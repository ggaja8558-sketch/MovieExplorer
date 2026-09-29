import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        🎬 MovieExplorer
      </Link>

      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Header;