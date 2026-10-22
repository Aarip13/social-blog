
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("/auth/register", form);
            navigate("/login", {
                state: { message: "Account created! Please log in." }
            });
        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <p className="eyebrow">YOUR SPACE TO WRITE</p>
                <h1>Create your account</h1>
                <p className="muted">
                    Join the community and share your thoughts.
                </p>

                {error && <p className="error">{error}</p>}

                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    minLength={3}
                    maxLength={30}
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    minLength={8}
                    required
                />

                <button
                    className="button button-primary full-width"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <p className="auth-footer">
                    Already a member? <Link to="/login">Log in</Link>
                </p>
            </form>
        </div>
    );
}
