import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 shadow-md py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-white text-2xl font-bold hover:text-gray-200">
                    SSC Mock Test
                </Link>
                <div className="flex space-x-6">
                    <Link to="/" className="text-white text-lg hover:text-gray-200">
                        Home
                    </Link>
                    <Link to="/login" className="text-white text-lg hover:text-gray-200">
                        Login
                    </Link>
                    <Link to="/register" className="text-white text-lg hover:text-gray-200">
                        Register
                    </Link>
                    <Link to="/dashboard" className="text-white text-lg hover:text-gray-200">
                        Dashboard
                    </Link>
                    <Link to="/payments" className="text-white text-lg hover:text-gray-200">
                        Subscription
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
