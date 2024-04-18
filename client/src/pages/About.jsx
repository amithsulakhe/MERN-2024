import { useContext } from "react";
import { UserContext } from "../store/Context";

const About = () => {
  const { userData } = useContext(UserContext);

  return (
    <div style={{ padding: "20px", textAlign: "center", background: "black", color: "#fff", fontSize: "25px" }}>
      Hello welcome {userData?.userName}
    </div>
  );
};

export default About;
