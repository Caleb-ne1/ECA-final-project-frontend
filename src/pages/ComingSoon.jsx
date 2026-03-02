import { useState, useEffect } from "react";

export default function ComingSoon() {
  const calculateTimeLeft = () => {
    const launchDate = new Date("2025-03-14T23:59:59").getTime();
    const now = new Date().getTime();
    const timeLeft = launchDate - now;

    return {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((timeLeft / (1000 * 60)) % 60),
      seconds: Math.floor((timeLeft / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="mb-4 text-4xl font-bold">Coming Soon :)</h1>
      <div className="flex gap-6 text-2xl font-semibold text-white">
        <div className="p-4 bg-gray-800 rounded-xl">{timeLeft.days}d</div>
        <div className="p-4 bg-gray-800 rounded-xl">{timeLeft.hours}h</div>
        <div className="p-4 bg-gray-800 rounded-xl">{timeLeft.minutes}m</div>
        <div className="p-4 bg-gray-800 rounded-xl">{timeLeft.seconds}s</div>
      </div>
    </div>
  );
}