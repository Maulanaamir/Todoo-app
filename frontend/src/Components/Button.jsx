import { Link } from "react-router-dom";

export default function Button({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        backgroundColor: "#333",
        color: "#fff",
        padding: "12px 25px",
        margin: "0 10px",
        borderRadius: "5px",
        transition: "background-color 0.3s ease",
        display: "inline-block"
      }}
      onMouseOver={e => (e.target.style.backgroundColor = "#555")}
      onMouseOut={e => (e.target.style.backgroundColor = "#333")}
    >
      {children}
    </Link>
  );
}