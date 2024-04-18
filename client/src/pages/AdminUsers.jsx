import { useEffect, useState } from "react";
import "../css/adminUsers.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const AdminUsers = () => {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    const data = await fetch("http://localhost:5000/auth/api/admin/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const json = await data.json();
    setData(json.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/auth/api/admin/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        toast.success("Deleted Successfully");
        getUsers();
      }
    } catch (err) {
      toast.error("Unable to delete Successfully");
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th>isAdmin</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((ele, i) => {
            return (
              <tr key={i} style={{ boxShadow: "0 0 3px" }}>
                <td>{ele.userName}</td>
                <td>{ele.email}</td>
                <td>{ele.phone}</td>
                <td style={{ background: ele.isAdmin ? "green" : "red", borderRadius: "10px" }}>{ele.isAdmin ? "Active" : "Inactive"}</td>
                <td style={{ background: "orange", paddingInline: "20px", borderRadius: "10px" }}>
                  <Link to={`/admin/users/${ele._id}/edit`}>Edit</Link>
                </td>
                <td onClick={() => handleDelete(ele._id)} style={{ background: "red", paddingInline: "20px", borderRadius: "10px" }}>
                  Delete
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
