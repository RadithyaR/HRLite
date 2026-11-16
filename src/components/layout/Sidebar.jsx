import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-60 min-h-screen border-r p-4">
      <h2 className="mb-6 text-xl font-bold">HRLite</h2>

      <nav>
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            `block rounded-md px-4 py-2 ${
              isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
            }`
          }
        >
          Employees
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
