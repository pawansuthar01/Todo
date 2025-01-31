function NavBar() {
  return (
    <nav className="h-16 fixed  rounded-b-lg shadow  z-50 top-0 w-full  ra bg-green-500 text-white font-medium flex justify-between items-center pl-1 pr-1 ">
      <img src="" alt="logo" />
      <h1>Todo Master</h1>
      <div className="max-sm:flex hidden">*</div>
      <div className="sm:flex hidden gap-2  pr-5 ">
        <p className=" cursor-pointer hover:text-white/80">profile</p>
        <p className=" cursor-pointer hover:text-white/80">setting</p>
      </div>
    </nav>
  );
}
export default NavBar;
