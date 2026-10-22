
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
    const navigate = useNavigate();

    function handleLogout() {
        onLogout();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <Link to="/" className="brand">
                <span className="brand-mark">S.</span>
                <span>Social Blog</span>
            </Link>

            <div className="nav-links">
                {user ? (
                    <>
                        <span className="welcome">
                            Hi, {user.username}
                        </span>
                        <button
                            className="button button-outline"
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Log in</Link>
                        <Link to="/register" className="button button-primary">
                            Join us
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
