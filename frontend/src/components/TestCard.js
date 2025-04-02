import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = ({ test }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
            <img
                className="w-full h-48 object-cover"
                src={test.image || "https://via.placeholder.com/400x200"}
                alt={test.title}
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{test.title}</h2>
                <p className="text-gray-600 mt-2">{test.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-medium text-blue-600">{test.price} ₹</span>
                    <Link
                        to={`/test/${test.id}`}
                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                        Start Test
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TestCard;
