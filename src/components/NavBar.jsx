import logo from "../assets/App.svg";
function NavBar() {
  return (
    <div className="relative">
      <nav className="fixed top-0 w-full h-16 bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg z-40">
        <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <img src={logo} alt="App.logo" />
            </div>
            <h1 className="text-xl font-bold">Todo Master</h1>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
