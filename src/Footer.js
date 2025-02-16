import React from "react";

const Footer = () => {
    return (
        <footer style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#343a40",
            color: "white",
            textAlign: "center",
            padding: "2px 0",  // Reduced padding
            fontSize: "14px",  // Smaller font size
            lineHeight: "20px" // Adjusted line height
        }}>
            <p>© 2025 Medical Store | Contact: support@medicalstore.com</p>
        </footer>
    );
};

export default Footer;
