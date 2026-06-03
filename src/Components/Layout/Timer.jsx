
import React, { useEffect, useState } from "react";



const Timer = () => {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2026-08-31T23:59:59"); 
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return {
        Days: "00",
        Hours: "00",
        Minutes: "00",
        Seconds: "00",
      };
    }

    return {
      Days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      Hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      Minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      Seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "Days", value: timeLeft.Days },
    { label: "Hours", value: timeLeft.Hours },
    { label: "Minutes", value: timeLeft.Minutes },
    { label: "Seconds", value: timeLeft.Seconds },
  ];

  return (
    <div className="flex gap-4 bg-stone-100 p-4 rounded-md justify-center">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-white text-black px-3 py-1 rounded-md text-lg font-bold shadow">
            {item.value}
          </div>
          <span className="text-sm text-gray-600 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Timer;
