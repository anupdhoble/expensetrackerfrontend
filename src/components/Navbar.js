import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <>
            <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/expensetrackerfrontend/">
                        <img alt="" src="logo.png" width="200" height="28" />
                    </a>

                    
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link to="/expensetrackerfrontend/" className="navbar-item">
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
                                <Link to="/expensetrackerfrontend/add">
                                    <a className="button is-primary">
                                        <strong>+ Add</strong>
                                    </a>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}