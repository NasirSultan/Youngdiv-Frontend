import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Fetch user and token from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Parse JSON safely
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user"); // Remove corrupted data
            }
        }

        if (storedToken) {
            setToken(storedToken);
        }

        // Redirect to login if no token
        if (!storedToken) {
            navigate("/login");
        }
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate("/login");
    };

    return (
        <nav style={navStyle}>
            <div style={{ display: "flex", alignItems: "center" }}>
                {/* Store Name with Home Icon */}
                <Link to="/" style={brandStyle}>
    <FontAwesomeIcon icon={faHome} style={{ marginRight: "8px", color: "white" }} />
    <span style={{ marginRight: "5px" }}>Welcome to</span>
    <span style={{ color: "#f8d210", fontWeight: "bold", margin: "0 5px" }}>{user?.role}</span>
    <span>Dashboard</span>
</Link>

            </div>

            {/* Show Name & Email if Logged In */}
            {user && token ? (
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <span style={infoStyle}>
                        <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px", color: "#f8d210" }} />
                        <span>{user.name}</span>
                    </span>

                    <span style={infoStyle}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "5px", color: "#f8d210" }} />
                        <span>{user.email}</span>
                    </span>

                    <button onClick={handleLogout} style={logoutButtonStyle}>
                        <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "5px" }} />
                        Logout
                    </button>
                </div>
            ) : (
                <Link to="/login" style={buttonStyle}>Login</Link>
            )}
        </nav>
    );
};

// Styling
const navStyle = {
    backgroundColor: "#343a40",
    color: "white",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
};

const brandStyle = {
    color: "white",
    fontSize: "18px",
    textDecoration: "none",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    transition: "color 0.3s ease-in-out"
};

const infoStyle = {
    fontSize: "14px",
    color: "white",
    display: "flex",
    alignItems: "center",
    fontWeight: "500",
    transition: "color 0.3s ease-in-out"
};

const buttonStyle = {
    textDecoration: "none",
    color: "white",
    padding: "8px 14px",
    border: "2px solid white",
    borderRadius: "6px",
    fontSize: "14px",
    transition: "background 0.3s ease, transform 0.2s ease",
    marginLeft: "10px"
};

const logoutButtonStyle = {
    backgroundColor: "#e63946",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    transition: "background 0.3s ease, transform 0.2s ease"
};

// Hover Effects
buttonStyle[":hover"] = {
    backgroundColor: "white",
    color: "#343a40",
    transform: "scale(1.05)"
};

logoutButtonStyle[":hover"] = {
    backgroundColor: "#ff4d4d",
    transform: "scale(1.05)"
};

brandStyle[":hover"] = {
    color: "#f8d210"
};

export default Header;
