/* eslint-disable react/jsx-key */
import { useCallback, useContext, useEffect, useState } from "react";
import "../css/Registration.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/Context";
import { toast } from "react-toastify";
const Register = () => {
  const { storeTokenInLokelStorage } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
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
    const data = await fetch("http://localhost:5000/auth/api");
    const json = await data.json();
    setData(json.data);
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res_json = await response.json();
      if (response.ok) {
        setFormData({
          userName: "",
          email: "",
          password: "",
          phone: "",
        });
        toast.success("Registration succesfull");
        storeTokenInLokelStorage(res_json.token);
        navigate("/login");
      } else {
        toast.error(res_json.extraDetails ? res_json.extraDetails : res_json.email);
      }
    } catch (err) {
      console.log(err);
    }
  });
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="registration-form">
      <div style={{ textAlign: "center" }}>
        <h1>Welcome For Registration form</h1>
      </div>
      <div>
        {data.length &&
          data.map((ele, index) => {
            return (
              <div key={index} style={{ marginBlock: "10px" }}>
                <h4>Name:{ele.userName}</h4>
                <h4>Name:{ele.email}</h4>
                <h4>Name:{ele.phone}</h4>
              </div>
            );
          })}
      </div>
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
        <div className="field-conatainer">
          <div className="label">
            <label htmlFor="password">Password</label>
          </div>
          <div className="input">
            <input
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              type="text"
              id="password"
              name="password"
            />
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
