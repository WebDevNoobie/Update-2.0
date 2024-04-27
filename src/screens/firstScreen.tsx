import "../styles/firstScreen.scss";
import Logo from "../assets/SnapChat-Logo.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FirstScreen() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/signup1");
  };

  return (
    <div className="firstScreen">
      <img src={Logo} alt="" className="logo" />
      <div className="buttons">
        <Button
          sx={{
            backgroundColor: "#fe5a5a",
            fontSize: "18px",
            fontWeight: 600,
            color: "white",
            padding: "12px",
            ":hover": { backgroundColor: "#ff9d9d" },
          }}
          onClick={login}
        >
          Log in
        </Button>
        <Button
          sx={{
            backgroundColor: "#74d4fe",
            fontSize: "18px",
            fontWeight: 600,
            color: "white",
            padding: "12px",
            ":hover": { backgroundColor: "#ade6ff" },
          }}
          onClick={signup}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default FirstScreen;
