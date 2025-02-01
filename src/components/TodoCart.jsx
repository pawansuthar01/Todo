import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/24/solid"; // ✅ Correct Import

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

export default function TodoCard({ todo, onToggle, onDelete, onUpdate }) {
  const [checked, setChecked] = useState(todo.finished);
  const [timeLeft, setTimeLeft] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.todoText);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleToggle = () => {
    setChecked(!checked);
    onToggle?.(todo.id);
  };

  const handleSaveEdit = () => {
    onUpdate?.(todo.id, {
      todoText: editedText,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
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
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
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
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setTimeLeft((prev) => ({
      ...prev,
      [todo.id]: calculateTimeLeft(todo.timestamp),
    }));
  }, []);

  const FilePreview = ({ files }) => {
    const renderPreview = (file) => {
      if (file.type.startsWith("image/")) {
        return <img src={file.data} alt="Preview" className="" />;
      } else if (file.type.startsWith("video/")) {
        return (
          <video
            controls
            src={file.data}
            muted
            className=" h-32 w-full object-cover"
          />
        );
      } else if (file.type === "application/pdf") {
        return (
          <iframe
            src={file.data}
            width="100%"
            height="250px"
            title="PDF Preview"
            className="border-2 border-gray-300 rounded-lg shadow-md"
          ></iframe>
        );
      } else if (file.type === "text/plain") {
        return (
          <textarea
            readOnly
            value={file.content}
            className="w-32 h-32 p-2 border"
          />
        );
      }
      return <p>Unsupported file type</p>;
    };
    return <div className="file-preview">{renderPreview(files)}</div>;
  };
  const getStatusIcon = () => {
    if (checked) return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    if (timeLeft[todo.id] === "Overdue")
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    return <Timer className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div
      className={`
        w-[310px]   rounded-xl shadow-sm transition-all duration-300
        ${checked ? "bg-green-100" : "bg-white dark:bg-gray-700"}
        border border-gray-200 hover:shadow-lg
        ${
          timeLeft[todo.id] === "Overdue" && !checked
            ? "border-red-200 bg-red-100"
            : ""
        }
        relative
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              className={`
                flex items-center justify-center w-6 h-6 rounded-full
                transition-all duration-200 transform hover:scale-110
                ${
                  checked
                    ? "bg-green-500 text-white"
                    : "border-2 border-gray-300 hover:border-green-500"
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
                className={`font-medium text-lg flex-1 ${
                  checked ? "line-through text-gray-500" : "text-gray-900"
                }`}
              >
                {todo.todoText}
              </h3>
            )}
            {!checked && isHovered && !isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-blue-500 transition-colors p-1"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {onDelete && (
                  <button
                    onClick={() => onDelete(todo)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
            {isEditing && (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-600 transition-colors p-1"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-red-500 hover:text-red-600 transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div
            className={`
            overflow-hidden transition-all duration-1000
            ${
              isExpanded
                ? "max-h-[500px] overflow-y-scroll opacity-100"
                : "max-h-0 opacity-0"
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
              <div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {todo.description}
                </p>
                <div className="border p-2 rounded flex flex-wrap gap-2 ">
                  {todo.files.map((file, index) => (
                    <FilePreview key={index} files={file} />
                  ))}
                </div>
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
          className="mt-3 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Show more
            </>
          )}
        </button>
      </div>
    </div>
  );
}
