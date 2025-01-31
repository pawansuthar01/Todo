import { CheckIcon } from "@heroicons/react/24/solid"; // ✅ Correct import

function TodoCart({ todo }) {
  return (
    <div className="max-w-[350px] rounded-lg bg-white shadow dark:bg-gray-700 text-black dark:text-white p-4">
      <div className="flex justify-between items-center">
        {/* Checkbox with Rounded Border and Icon */}
        <label className="relative cursor-pointer">
          <input type="checkbox" className="hidden peer" />
          <span className="w-8 h-8 bg-transparent border-2 border-gray-500 rounded-full flex items-center justify-center transition-all duration-300 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-300 peer-checked:bg-blue-500">
            <CheckIcon className="w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-all duration-300" />
          </span>
        </label>

        {/* Timestamp */}
        <CheckIcon className="w-5 h-5 text-red-500  " />
        <p>{todo.timestamp}</p>
      </div>
    </div>
  );
}

export default TodoCart;
