import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        name: 'Nasir',
        email: 'nasir@gmail.com',
        number: '92567890'
    });

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = {
            name: localStorage.getItem('name') || 'Nasir',
            email: localStorage.getItem('email') || 'nasir@gmail.com',
            number: localStorage.getItem('number') || '92567890'
        };
        setProfileData(user);
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            setIsLoggingOut(true);
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('number');
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#f5f7fa',
                width: '100%',
                padding: '20px'
            }}
        >
            <div
                className="shadow rounded-4 p-4 mx-auto"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0'
                }}
            >
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary">{profileData.name}</h3>
                </div>

                <div
                    className="p-3 rounded-4 mb-3 text-center"
                    style={{ backgroundColor: '#ffe8e8' }}
                >
                    <p className="mb-0 fs-5">{profileData.email}</p>
                </div>

                <div
                    className="p-3 rounded-4 mb-3 text-center"
                    style={{ backgroundColor: '#e8fff0' }}
                >
                    <p className="mb-0 fs-5">{profileData.number}</p>
                </div>

                <div className="text-center mt-4">
                    <button
                        onClick={handleLogout}
                        className="btn btn-danger px-4 py-2 rounded-3"
                        disabled={isLoggingOut}
                        aria-label="Logout Button"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            transition: 'all 0.3s ease',
                            fontWeight: 'bold',
                            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                            backgroundColor: isHovered ? '#c82333' : '#dc3545',
                            borderColor: isHovered ? '#bd2130' : '#dc3545'
                        }}
                    >
                        {isLoggingOut ? (
                            <span>Logging Out...</span>
                        ) : (
                            <>
                                <FaSignOutAlt className="me-2" /> Logout
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
