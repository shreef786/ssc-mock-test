import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} SSC Mock Test. All rights reserved.
                        </p>
                    </div>
                    <div className="space-x-4">
                        <a href="#" className="text-sm hover:text-gray-400">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm hover:text-gray-400">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm hover:text-gray-400">
                            Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
