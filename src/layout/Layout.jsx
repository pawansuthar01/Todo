import NavBar from "../components/NavBar";

function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="relative top-19">{children}</div>
    </div>
  );
}
export default Layout;
