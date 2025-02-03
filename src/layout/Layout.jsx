import NavBar from "../components/NavBar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="pt-20 mx-auto">{children}</main>
    </div>
  );
}
export default Layout;
