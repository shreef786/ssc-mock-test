import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ duration, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp(); // Jab timer zero pe pohonch jaaye, timeUp function call hoga.
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Cleanup interval when component unmounts
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700">Time Left</h3>
            <div className="text-3xl font-bold text-red-600 mt-2">
                {formatTime(timeLeft)}
            </div>
        </div>
    );
};

export default CountdownTimer;
