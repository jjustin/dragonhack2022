import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <h1>Triftify</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/listings">Listings</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </div>
  );
}
