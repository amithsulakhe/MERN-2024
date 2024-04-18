import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <nav>
        <ul style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/admin/contacts">Contacts</NavLink>
          </li>

          {/* <li></li>
        <li></li> */}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default AdminLayout;
