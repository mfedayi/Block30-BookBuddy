import { Link, useLocation } from "react-router-dom"

export default function Navigations({ token, setToken }) {
  const location = useLocation(); // Get the current location object

  const isActive = (path) => {
    return location.pathname === path; // Check if the current path matches the given path
  }

  const handleLogout = () => {
    setToken(null); // Clear the token
    localStorage.removeItem("token"); // Remove the token from local storage
  }

  return (
      <nav className="navbar bg-light justify-content-center">
        <ul className="nav d-flex align-items-center gap-4">
          <li className="nav-item">
              <Link className={`nav-link ${isActive("/books") || isActive("/") ? "active text-primary" : "text-dark"}`} to="/">
                Books
              </Link>
          </li>
              
        {!localStorage.getItem("token") && (
          <>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/login") ? "active text-primary" : "text-dark"}`}
          to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/register") ? "active text-primary" : "text-dark"}`}
          to="/register">
                Register
              </Link>
            </li>
          </>
        )}

        {localStorage.getItem("token") && (
          <>
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/account") ? "active text-primary" : "text-dark"}`}
          to="/account">
                Account
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/" 
                className="nav-link text-dark" 
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
