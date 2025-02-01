import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { addTodo } from "../TodoRedux/Slice/TodoList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const TodoForm = () => {
  const [todoText, setTodoText] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [priority, setPriority] = useState("Low");
  const [selectTime, setSelectTime] = useState(new Date());
  const dispatch = useDispatch();

  //* File Upload Handler *
  const onDrop = useCallback((acceptedFiles) => {
    const filesPromise = acceptedFiles.map((file) => {
      return new Promise((resolve) => {
        const previewUrl = URL.createObjectURL(file);
        resolve({ name: file.name, data: previewUrl, type: file.type });
      });
    });

    Promise.all(filesPromise).then((fileData) => {
      setFiles((prevFiles) => [...prevFiles, ...fileData]);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "video/*": [],
      "application/pdf": [],
    },
    multiple: true,
  });

  // Add Todo Handler
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoText.length === 0) return;

    // Add 10 minutes to the selected time
    const updatedTime = new Date(selectTime);
    updatedTime.setMinutes(updatedTime.getMinutes() + 10);

    dispatch(
      addTodo({
        files,
        todoText,
        selectTime: updatedTime.toISOString(),
        description,
        priority,
      })
    );

    // Clear form
    setTodoText("");
    setFiles([]);
    setDescription("");
    setSelectTime(new Date());
  };

  return (
    <form className="rounded-lg m-4 flex flex-col" onSubmit={handleAddTodo}>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter Todo text"
        className="border-2 p-2 mb-4"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Todo description"
        className="border-2 p-2 mb-4"
      />
      <select
        name="priority"
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border-2 p-2 mb-4"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <DatePicker
        selected={selectTime}
        onChange={(date) => setSelectTime(date)}
        showTimeSelect
        dateFormat="Pp"
        className="border p-2 w-full mb-4"
      />

      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 text-center cursor-pointer mb-4"
      >
        <input {...getInputProps()} />
        <p>Drag & Drop files here, or click to select files</p>
      </div>

      {files.length > 0 && (
        <ul>
          {files.map((file, index) => (
            <li key={index} className="text-sm">
              {file.name}
            </li>
          ))}
        </ul>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
