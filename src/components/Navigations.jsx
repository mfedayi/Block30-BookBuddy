/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Link } from "react-router-dom"

export default function Navigations() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Books
              </Link>
              <Link className="nav-link" to="/Login">
                Login
              </Link>
              <Link className="nav-link" to="/Register">
                Register
              </Link>
              <Link className="nav-link" to="/SingleBook">
                Single Book
              </Link>
              <Link className="nav-link" to="/Accounts">
                Accounts
              </Link>

              {/* CAN A LINK BE USED FOR THE SEARCH BAR....? <Link className="nav-link" to="/PuppyForm">
                Sign up
              </Link> */}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
