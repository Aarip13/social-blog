
import { useState } from "react";
import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./App.css";

function AppContent() {
    const [token, setToken] = useState(
        () => localStorage.getItem("token")
    );

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch {
            return null;
        }
    });

    function handleLogin(newToken, newUser) {
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));

        setToken(newToken);
        setUser(newUser);
    }

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
    }

    const isLoggedIn = Boolean(token && user);

    return (
        <>
            <Navbar user={isLoggedIn ? user : null} onLogout={handleLogout} />

            <Routes>
                <Route
                    path="/login"
                    element={
                        isLoggedIn
                            ? <Navigate to="/" replace />
                            : <Login onLogin={handleLogin} />
                    }
                />

                <Route
                    path="/register"
                    element={
                        isLoggedIn
                            ? <Navigate to="/" replace />
                            : <Register />
                    }
                />

                <Route
                    path="/"
                    element={
                        isLoggedIn
                            ? <Home user={user} />
                            : <Navigate to="/login" replace />
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>

            <footer className="site-footer">
                A little space for every story.
            </footer>
        </>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}
