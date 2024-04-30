import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/signup1.scss";
import { setName } from "../redux/slices/signupSlice";

function Signup1() {
  const [btnState, setBtnState] = useState<number>(0);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recordName = () => {
    dispatch(
      setName({
        firstName: fname,
        lastName: lname,
      })
    );
    navigate("/signup2");
  };

  return (
    <div className="signUp1">
      <h3>What's your name?</h3>
      <div className="signUp1Info">
        <h6>FIRST NAME</h6>
        <input
          type="text"
          onChange={(evt) => {
            evt.target.value.length > 0 ? setBtnState(1) : setBtnState(0);
            setFname(evt.target.value);
          }}
        />
        <h6>LAST NAME</h6>
        <input
          type="text"
          onChange={(evnt) => {
            evnt.target.value.length > 0 ? setBtnState(1) : setBtnState(0);
            setLname(evnt.target.value);
          }}
        />
        <p>
          By tapping Sign Up & Accept, you acknowledge that you have read the{" "}
          <span>Privacy Policy</span> and agree to the{" "}
          <span>Terms of Service</span>.
        </p>
      </div>
      <Button
        sx={{
          backgroundColor: btnState > 0 ? "#74d4fe" : "#c8c8c8",
          ":hover": { backgroundColor: btnState > 0 ? "#ade6ff" : "#c8c8c8" },
        }}
        className="signUp1Button"
        disabled={btnState > 0 ? false : true}
        onClick={recordName}
      >
        Sign up & Accept
      </Button>
    </div>
  );
}

export default Signup1;
