import "../styles/signup3.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectName, setUserName } from "../redux/slices/signupSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function Signup3() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName =
    name.firstName[Math.floor(Math.random() * name.firstName.length)] +
    Math.floor(Math.random() * 10000) +
    name.firstName[Math.floor(Math.random() * name.firstName.length)] +
    Math.floor(Math.random() * 10000);

  const recordUserName = () => {
    dispatch(setUserName(userName));
    navigate("/signup4");
  };

  const changeUserName = () => {
    navigate("/signup3_edit");
  };

  return (
    <div className="signUp3">
      <h3 className="heading">Your username</h3>
      <h1 className="userName">{userName}</h1>
      <h5 className="changeUserName" onClick={changeUserName}>
        Change my username
      </h5>
      <h5 className="info">
        You will be able to change this later in Settings
      </h5>
      <Button className="signUp3Button" onClick={recordUserName}>
        Continue
      </Button>
    </div>
  );
}

export default Signup3;
