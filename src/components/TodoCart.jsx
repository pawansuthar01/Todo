import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/solid"; // ✅ Correct Import

function TodoCart({ todo }) {
  const [checked, setChecked] = useState(todo.finished);
  const [timeLeft, setTimeLeft] = useState("");
  const [statusColor, setStatusColor] = useState("bg-gray-200"); // Default color
  useEffect(() => {
    console.log(todo);
  }, []);
  useEffect(() => {
    setChecked(todo.finished);
  }, [todo.finished]);

  // Calculate Remaining Time
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    if (difference <= 0) return "Time Over";

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((difference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${sec}s`;
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    } else {
      // If not today, return full date (e.g., "Jan 31, 2025")
      const options = {
        year: "numeric",
        month: "short", // Show month in shortened form (e.g., "Jan")
        day: "numeric", // Show the day (e.g., "31")
      };
      return date.toLocaleDateString("en-US", options);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeftText = calculateTimeLeft(todo.timestamp);
      setTimeLeft(timeLeftText);

      // Change Background Color Based on Status
      if (todo.finished) {
        setStatusColor("bg-green-500 text-white"); // Completed
      } else if (timeLeftText === "Time Over") {
        setStatusColor("bg-red-500 text-white"); // Deadline Missed
      } else {
        setStatusColor("bg-gray-200 text-black"); // Pending
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [todo.timestamp, todo.finished]);

  return (
    <div
      className={`max-w-[310px] rounded-lg shadow-[0_0_1px_0_black] border border-black transition-all duration-800 ${
        checked ? "bg-green-500" : ""
      } darK:shadow-[0_0_1px_0_white] dark:bg-gray-800 p-4 relative  m-1  `}
    >
      <div className="flex justify-between items-center">
        {/* Checkbox */}
        <div>
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
            <span
              className={`w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center transition-all duration-300 ${
                checked
                  ? "bg-green-500 border-blue-500 ring-2 ring-green-300"
                  : "bg-transparent"
              }`}
            >
              <CheckIcon
                className={`w-5 h-5 text-white ${
                  checked ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </label>
        </div>

        <p>{formatDate(todo.timestamp)}</p>
      </div>
      {/* Task Title */}
      <h2 className="text-lg font-semibold mt-2">{todo.title}</h2>

      {/* Task Description */}
      <p className="text-sm">{todo.description}</p>

      {/* Countdown Timer */}

      <div className="mt-2 text-sm">
        <p>Time Left: {timeLeft}</p>
      </div>
    </div>
  );
}

export default TodoCart;
