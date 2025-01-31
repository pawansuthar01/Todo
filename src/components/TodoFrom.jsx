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
  const [selectTime, setSelectTime] = useState(new Date());
  const dispatch = useDispatch();

  //*    uploadFiles//*
  const onDrop = useCallback((acceptedFiles) => {
    const filesPromise = acceptedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ name: file.name, data: reader.result });
      });
    });
    Promise.all(filesPromise).then((fileData) => {
      setFiles((prevFile) => [...prevFile, ...fileData]);
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

  const handelAddTodo = (e) => {
    e.preventDefault();
    if (todoText.length == 0) return;
    selectTime.setMinutes(selectTime.getMinutes() + 10);
    dispatch(
      addTodo({
        files,
        todoText,
        selectTime: selectTime.toISOString(),
        description,
      })
    );

    setTodoText("");
    setFiles([]);
    setDescription("");
    setSelectTime(new Date());
    setDescription("");
  };
  return (
    <form className=" rounded-lg m-4 flex" onSubmit={handelAddTodo}>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="enter Todo text"
        className="border-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="enter Todo text"
        className="border-2"
      />
      <DatePicker
        selected={selectTime}
        onChange={(date) => setSelectTime(date)}
        showTimeSelect
        dateFormat="Pp"
        className="border p-2 w-full mb-4"
      />
      <div
        {...getRootProps()}
        className="border-2 border-dashed p-6 text-center cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Dreg && Drop files here,or click to select files</p>
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
