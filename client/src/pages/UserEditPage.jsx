/* eslint-disable react/jsx-key */
import { useCallback, useContext, useEffect, useState } from "react";
import "../css/Registration.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/Context";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const Register = () => {
  const { id } = useParams();
  console.log(id);
  const { storeTokenInLokelStorage } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phone: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const fetchData = async () => {
    try {
      const data = await fetch(`http://localhost:5000/auth/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const json = await data.json();
      setFormData({
        userName: json?.userName,
        email: json?.email,
        phone: json?.phone,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    console.log("clicked");
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/auth/api/admin/users/update/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const res_json = await response.json();
      console.log(res_json);
      if (response.ok) {
        setFormData({
          userName: "",
          email: "",
          password: "",
          phone: "",
        });
        toast.success("Updated succesfull");
        navigate("/admin/users");
      } else {
        toast.error(res_json.extraDetails ? res_json.extraDetails : res_json.email);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div className="registration-form">
      <form action="" onSubmit={handleSubmit}>
        <div className="field-conatainer">
          <div className="label">
            <label htmlFor="userName">UserName</label>
          </div>
          <div className="input">
            <input
              onChange={handleChange}
              value={formData.userName}
              placeholder="Enter user Name"
              type="text"
              id="userName"
              name="userName"
            />
          </div>
        </div>
        <div className="field-conatainer">
          <div className="label">
            <label htmlFor="email">Email</label>
          </div>
          <div className="input">
            <input onChange={handleChange} value={formData.email} placeholder="Enter Email" type="text" id="email" name="email" />
          </div>
        </div>
        <div className="field-conatainer">
          <div className="label">
            <label htmlFor="phone">Phone</label>
          </div>
          <div className="input">
            <input onChange={handleChange} value={formData.phone} placeholder="Enter Phone Number" type="text" id="phone" name="phone" />
          </div>
        </div>

        <div className="btn-submit">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
