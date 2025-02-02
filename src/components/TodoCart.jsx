import { useState, useEffect } from "react";

import {
  AlertCircle,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Delete,
  Edit2,
  Flag,
  Save,
  Star,
  Timer,
  Trash2,
  X,
} from "lucide-react";

export default function TodoCard({
  Notified,
  todo,
  onToggle,
  onDelete,
  onUpdate,
}) {
  const [checked, setChecked] = useState(todo.finished);
  const [notified, setNotified] = useState(todo.notified);
  const [timeLeft, setTimeLeft] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todoText);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  useEffect(() => {
    setChecked(todo.finished);
    setNotified(todo.notified);
    setEditedText(todo.todoText);
    setEditedDescription(todo.description);
  }, [todo]);

  const handleToggle = (id, checked, notified) => {
    setChecked(checked);
    setNotified(notified);
    onToggle?.(id, checked, notified);
  };
  const handelNotified = (id, notified) => {
    setNotified(notified);
    Notified?.(id, notified);
  };

  const handleSaveEdit = (id) => {
    onUpdate?.(id, {
      todoText: editedText,
      description: editedDescription,
    });
    setIsEditing(false);
    setIsExpanded(false);
  };

  const handleCancelEdit = () => {
    setIsExpanded(false);
    setEditedText(todo.todoText);
    setEditedDescription(todo.description);
    setIsEditing(false);
  };

  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const difference = target - now;

    if (difference <= 0) return "Overdue";

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((difference % (1000 * 60)) / 1000);
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${sec}s`;
    if (hours > 0) return `${hours}h ${minutes}m ${sec}s`;
    if (minutes > 0) return `${minutes}m ${sec}s`;
    return `${sec}s`;
  };

  const getPriorityIcon = () => {
    switch (todo.priority) {
      case "high":
        return <Flag className="w-4 h-4 text-red-500" />;
      case "medium":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "Low":
        return <Flag className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case "high":
        return "bg-red-50 text-red-700 ring-red-600/20";
      case "medium":
        return "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
      case "low":
        return "bg-green-50 text-green-700 ring-green-600/20";
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20";
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => ({
        ...prev,
        [todo.id]: calculateTimeLeft(todo.timestamp),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setTimeLeft((prev) => ({
      ...prev,
      [todo.id]: calculateTimeLeft(todo.timestamp),
    }));
  }, []);

  const getStatusIcon = () => {
    if (checked) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (timeLeft[todo.id] === "Overdue")
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    return <Timer className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div
      className={`
      w-[310px] sm:w-[450px] rounded-xl shadow-sm
      ${checked && "bg-green-100"}
      border border-gray-300 hover:shadow-lg
      ${
        timeLeft[todo.id] === "Overdue" && !checked
          ? "border-red-200 bg-red-100"
          : ""
      }
      relative 
      transition-[max-height]  duration-500 ease-in-out
    `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        {!checked && !notified && timeLeft[todo.id] === "Overdue" && (
          <p className="text-red-400 flex  bg-red-200  justify-center  items-center gap-1 top-[-20px] right-2 pl-1 pr-1 rounded-t-lg absolute text-sm">
            Task time is over{" "}
            <X
              className="pt-1 cursor-pointer  hover:scale-150"
              size={15}
              onClick={() => handelNotified(todo.id, !notified)}
            />
          </p>
        )}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleToggle(todo.id, !checked, !notified)}
              title={!checked ? "Set not Completed" : "Completed"}
              className={`
                flex items-center cursor-pointer justify-center w-6 h-6 rounded-full
                transition-all duration-200 transform hover:scale-110
                ${
                  checked
                    ? "bg-green-500 text-white"
                    : "border-2  border-gray-400 hover:border-green-500"
                }
              `}
            >
              {checked && <Check className="w-4 h-4" />}
            </button>
            {getPriorityIcon()}
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`
              inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset
              ${getPriorityColor()}
            `}
            >
              {todo.priority}
            </span>
            {getStatusIcon()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            {isEditing ? (
              <input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <h3
                className={`font-medium text-lg flex-1 max-w-[80%] break-words ${
                  checked ? "line-through text-gray-500" : "text-gray-900"
                }`}
              >
                {todo.todoText}
              </h3>
            )}
            {!checked && isHovered && !isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={() => (setIsEditing(true), setIsExpanded(true))}
                  className="text-gray-400 hover:text-blue-500  cursor-pointer transition-colors p-1"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
            {isHovered && (
              <button
                onClick={() => onDelete(todo)}
                className="text-gray-400  cursor-pointer hover:text-red-500 transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            {isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveEdit(todo.id)}
                  className="text-green-500  cursor-pointer hover:text-green-600 transition-colors p-1"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-500  cursor-pointer hover:text-red-600 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div
            className={`
         overflow-auto transition-all duration-800
            ${
              isExpanded
                ? "max-h-[340px] opacity-100 "
                : " overflow-hidden max-h-0 opacity-0"
            }
          `}
          >
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                rows={3}
              />
            ) : (
              <div className="">
                <p className="text-gray-600 text-sm leading-relaxed ">
                  {todo.description}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(todo.timestamp)}</span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span
                className={`
                ${
                  timeLeft[todo.id] === "Overdue" && !checked
                    ? "text-red-500 font-medium"
                    : ""
                }
                ${checked ? "text-green-500" : ""}
              `}
              >
                {checked ? "Completed" : timeLeft[todo.id]}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-sm  cursor-pointer  text-gray-500 hover:text-blue-700 flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 hover:text-red-500" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 " />
              Show more
            </>
          )}
        </button>
      </div>
    </div>
  );
}
