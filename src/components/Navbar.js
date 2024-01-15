import { Link } from "react-router-dom";
import logoImage from "../logo.png";
import "../css/navbar.css"
import UserContext from "../context/user/UserContext";
import { useContext } from "react";


export default function Navbar() {
    const user = useContext(UserContext);

    return (
        <>
            <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img alt="" src={logoImage} width="200px" height="28px" />
                    </a>


                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item">
                            Home
                        </Link>

                        {/* <a className="navbar-item">
                            Documentation
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                More
                            </a>

                            <div className="navbar-dropdown">
                                <a className="navbar-item">
                                    About
                                </a>
                                <a className="navbar-item">
                                    Jobs
                                </a>
                                <a className="navbar-item">
                                    Contact
                                </a>
                                <hr className="navbar-divider" />
                                <a className="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div> */}
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link to="/add">
                                    <button id="addbtn" className="button is-primary">
                                        <strong>+ Add</strong>
                                    </button>
                                </Link>
                                {user.isLoggedIn ? (
                                    <button className="button is-info" onClick={user.handleLogout}>Logout</button>
                                ) : (
                                    <Link className="button is-info" to="/login">
                                        Login
                                    </Link>
                                )}
                                <Link className="button is-info" to="/signup">
                                    Signup
                                </Link>


                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}