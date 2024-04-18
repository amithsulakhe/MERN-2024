import { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/Context";

const Contact = () => {
  const { userData } = useContext(UserContext);
  const [userBoolData, setUserBoolData] = useState(true);
  const [conatctData, setConatctData] = useState({
    userName: userData?.userName || "",
    email: userData?.email || "",
    message: "",
  });

  if (userBoolData && userData) {
    setConatctData({
      userName: userData?.userName,
      email: userData?.email,
      message: "",
    });
    setUserBoolData(false);
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setConatctData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(conatctData),
      });
      if (response.ok) {
        const msg = await response.json();
        console.log(msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="registration-form">
        <div style={{ textAlign: "center" }}>
          <h1>Welcome For Contact form</h1>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="field-conatainer">
            <div className="label">
              <label htmlFor="userName">UserName</label>
            </div>
            <div className="input">
              <input
                onChange={handleChange}
                value={conatctData.userName}
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
              <input onChange={handleChange} value={conatctData.email} placeholder="Enter Email" type="text" id="email" name="email" />
            </div>
          </div>
          <div className="field-conatainer">
            <div className="label">
              <label htmlFor="email">Meassage</label>
            </div>
            <div className="input">
              <textarea
                onChange={handleChange}
                value={conatctData.message}
                style={{
                  outline: "none",
                  borderRadius: "10px",
                  padding: "20px",
                  minWidth: "100%",
                  maxWidth: "100%",
                  minHeight: "100px",
                  maxHeight: "100px",
                }}
                placeholder="Enter Message here"
                name="message"
                id="message"
              ></textarea>
            </div>
          </div>

          <div className="btn-submit">
            <button type="submit">Send message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
