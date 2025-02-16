const API_URL = "http://localhost:8000/api";

// Register User
export const registerUser = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

// Login User
export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

// Create Store
export const createStore = async (data, token) => {
    const response = await fetch(`${API_URL}/stores`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
};

// Get Store List
export const getStores = async (token) => {
    const response = await fetch(`${API_URL}/stores`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
};
export const deleteStore = async (storeId, token) => {
    try {
        const response = await fetch(`${API_URL}/stores/${storeId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Failed to delete store");
        }

        return data;
    } catch (error) {
        return { message: error.message || "Failed to delete store" };
    }
};


export const updateStore = async (storeId, data, token) => {
    const response = await fetch(`${API_URL}/stores/${storeId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return response.json();
};