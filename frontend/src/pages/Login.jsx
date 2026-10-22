
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login({ onLogin }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const message = location.state?.message;

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            onLogin(response.data.token, response.data.user);
            navigate("/", { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message || "Login failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <p className="eyebrow">WELCOME BACK</p>
                <h1>Log in</h1>
                <p className="muted">
                    Pick up where your thoughts left off.
                </p>

                {message && <p className="success">{message}</p>}
                {error && <p className="error">{error}</p>}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    required
                />

                <button
                    className="button button-primary full-width"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Log in"}
                </button>

                <p className="auth-footer">
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </form>
        </div>
    );
}
