import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import { useContext } from "react";
import { UserContext } from "../store/Context";
const Navbar = () => {
  const { isLoggedIn, setToken } = useContext(UserContext);
  console.log(isLoggedIn);
  const handleLoginPage = () => {
    const value = localStorage.removeItem("token");
    setToken(value);
  };
  return (
    <div>
      <header>
        <div className="container">
          <div className="logo-container">
            <NavLink to="/">Home</NavLink>
          </div>
          <div className="links-container">
            <ul>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {isLoggedIn ? (
                <li>
                  <NavLink to="/" onClick={handleLoginPage}>
                    Logout
                  </NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/service">Services</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
