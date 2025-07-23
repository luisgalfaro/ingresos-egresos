import { Outlet, Link, useLocation } from "react-router-dom";
import { FiHome, FiPlusCircle, FiUser } from "react-icons/fi";

export default function MainLayout() {
  const location = useLocation();

  return (
    <>
      <main className="pb-16">
        <Outlet />
      </main>
      <div className="dock">
        <Link to="/">
          <button
            className={`flex flex-col gap-1 items-center ${
              location.pathname === "/" ? "bg-primary px-6 py-1 rounded-xl" : ""
            }`}
          >
            <FiHome size="18px" />
            <span className="dock-label">Inicio</span>
          </button>
        </Link>

        <Link to="/agregar">
          <button
            className={`flex flex-col gap-2  items-center ${
              location.pathname === "/agregar"
                ? "bg-primary px-6 py-1 rounded-xl"
                : ""
            }`}
          >
            <FiPlusCircle size="18px" />
            <span className="dock-label">Agregar</span>
          </button>
        </Link>

        <Link to="/perfil">
          <button
            className={`flex flex-col gap-2 items-center ${
              location.pathname === "/perfil"
                ? "bg-primary px-6 py-1 rounded-xl"
                : ""
            }`}
          >
            <FiUser size="18px" />
            <span className="dock-label">Perfil</span>
          </button>
        </Link>
      </div>
    </>
  );
}
