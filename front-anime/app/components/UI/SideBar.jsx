// components/UI/SideBar.jsx
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";

const SideBar = ({ isSidebarOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 bg-base-200 shadow-md h-full transition-transform transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 z-50`}
    >
      <ul className="menu p-4 space-y-2">
        <li className="menu-title">
          <span>Páginas</span>
        </li>
        <li>
          <Link href="/dashboard" className="flex items-center">
            <i className="bi bi-house-door"></i>
            <span className="ml-2">Escritorio</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/anime" className="flex items-center">
            <i className="bi bi-list-stars"></i>
            <span className="ml-2">Lista de animes</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
