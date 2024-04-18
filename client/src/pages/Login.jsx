import { useCallback, useContext, useState } from "react";
import { UserContext } from "../store/Context";
import { toast } from "react-toastify";

const Login = () => {
  const { storeTokenInLokelStorage } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res_json = await response.json();

      if (response.ok) {
        setFormData({
          email: "",
          password: "",
        });
        toast.success("Login successfull");
        storeTokenInLokelStorage(res_json.token);
        // navigate("/login");
      } else {
        toast.error(res_json.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-form">
      <div style={{ textAlign: "center" }}>
        <h1>Welcome For Login form</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
