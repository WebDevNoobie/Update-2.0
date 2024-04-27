import { useState } from "react";
import "../styles/signup2.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDob } from "../redux/slices/signupSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";

function Signup2() {
  const [dob, setDoB] = useState<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recordDob = () => {
    dispatch(setDob(dob.toLocaleDateString()));
    navigate("/signup3");
  };

  return (
    <div className="signUp2">
      <h3>When's your birthday?</h3>
      <div className="signUp2Info">
        <h6>BIRTHDAY</h6>
        <DatePicker
          selected={dob}
          onChange={(date) => setDoB(date)}
          className="datePicker"
          popperPlacement="bottom"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
      <Button
        sx={{
          backgroundColor: dob === null ? "#c8c8c8" : "#74d4fe",
          ":hover": { backgroundColor: dob === null ? "#c8c8c8" : "#ade6ff" },
        }}
        className="signUp2Button"
        disabled={dob === null ? true : false}
        onClick={recordDob}
      >
        Continue
      </Button>
    </div>
  );
}

export default Signup2;
