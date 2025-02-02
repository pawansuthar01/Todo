import { Menu, User, Settings, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import logo from "../assets/App.svg";
function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative">
      {/* Sidebar for smaller screens */}
      <div
        className={`fixed top-0 left-0 w-64 h-full mt-16 bg-gradient-to-b from-teal-500 to-teal-600 text-white shadow-lg z-50 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col p-5 mt-0 space-y-2">
          <button className="flex cursor-pointer items-center w-full p-3 rounded-lg transition-colors hover:bg-teal-400 active:bg-teal-700 focus:outline-none">
            <User className="w-5 h-5 mr-3" />
            <span>Profile</span>
          </button>
          <button className="flex cursor-pointer items-center w-full p-3 rounded-lg transition-colors hover:bg-teal-400 active:bg-teal-700 focus:outline-none">
            <Settings className="w-5 h-5 mr-3" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Main NavBar */}
      <nav className="fixed top-0 w-full h-16 bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg z-40">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <img src={logo} alt="App.logo" />
            </div>
            <h1 className="text-xl font-bold">Todo Master</h1>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sm:hidden p-2  z-50  relative rounded-lg hover:bg-teal-400 active:bg-teal-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 cursor-pointer" />
            ) : (
              <Menu className="w-6 h-6 cursor-pointer" />
            )}
          </button>

          {/* Desktop menu */}
          <div className="hidden sm:flex items-center space-x-6">
            <button className="flex items-center cursor-pointer space-x-2 p-2 rounded-lg transition-colors hover:bg-teal-400 active:bg-teal-700 focus:outline-none">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button className="flex items-center cursor-pointer space-x-2 p-2 rounded-lg transition-colors hover:bg-teal-400 active:bg-teal-700 focus:outline-none">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default NavBar;
