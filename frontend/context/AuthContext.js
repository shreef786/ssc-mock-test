import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

// Create a Context for Authentication
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if the user is authenticated when the app loads
    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const response = await api.get('/api/auth/me'); // Backend se current user info fetch karna
                if (response.data) {
                    setUser(response.data); // User details set karna
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false); // Loading ko false karna jab authentication check complete ho jaye
            }
        };

        checkUserAuth();
    }, []);

    // User login function
    const login = async (email, password) => {
        try {
            const response = await api.post('/api/auth/login', { email, password });
            setUser(response.data.user); // Set user data from response
            localStorage.setItem('token', response.data.token); // Token ko localStorage me save karna
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // User register function
    const register = async (email, password) => {
        try {
            const response = await api.post('/api/auth/register', { email, password });
            setUser(response.data.user); // Set user data from response
            localStorage.setItem('token', response.data.token); // Token ko localStorage me save karna
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    // User logout function
    const logout = () => {
        setUser(null); // Set user to null
        localStorage.removeItem('token'); // Token ko localStorage se remove karna
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
