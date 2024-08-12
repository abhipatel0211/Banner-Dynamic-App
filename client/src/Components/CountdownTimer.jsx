import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate, onCountdownComplete }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const distance = targetDate - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Check if countdown is complete
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        onCountdownComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onCountdownComplete]);

  return (
    <div className="flex justify-center items-center space-x-4 p-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg shadow-lg">
      <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center">
        <span className="text-4xl font-bold">{timeLeft.days}</span>
        <span className="text-lg text-gray-600">Days</span>
      </div>
      <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center">
        <span className="text-4xl font-bold">{timeLeft.hours}</span>
        <span className="text-lg text-gray-600">Hours</span>
      </div>
      <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center">
        <span className="text-4xl font-bold">{timeLeft.minutes}</span>
        <span className="text-lg text-gray-600">Minutes</span>
      </div>
      <div className="bg-white text-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center">
        <span className="text-4xl font-bold">{timeLeft.seconds}</span>
        <span className="text-lg text-gray-600">Seconds</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
