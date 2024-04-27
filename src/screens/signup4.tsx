import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPassword } from "../redux/slices/signupSlice";
import "../styles/signup4.scss";

function Signup4() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPass] = useState("");

  const recordPassword = () => {
    dispatch(setPassword(password));
    navigate("/signup5");
  };

  return (
    <div className="signUp4">
      <h3 className="heading">Set a password</h3>
      <h5 className="info">
        Your password should be at least 8 characters long.
      </h5>
      <div className="userInput">
        <h6>PASSWORD</h6>
        <input type="password" onChange={(evt) => setPass(evt.target.value)} />
      </div>
      <Button
        sx={{
          backgroundColor: password.length < 8 ? "#c8c8c8" : "#74d4fe",
          ":hover": {
            backgroundColor: password.length < 8 ? "#c8c8c8" : "#ade6ff",
          },
        }}
        className="signUp4Button"
        onClick={recordPassword}
        disabled={password.length < 8 ? true : false}
      >
        Continue
      </Button>
    </div>
  );
}

export default Signup4;
