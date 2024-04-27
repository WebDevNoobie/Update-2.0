import { useState } from "react";
import "../styles/signup3_edit.scss";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUserName } from "../redux/slices/signupSlice";
import { Button } from "@mui/material";
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

function Signup3_edit() {
  const [username, setUsername] = useState("");
  const [check, setCheck] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recordUserName = () => {
    dispatch(setUserName(username));
    navigate("/signup4");
  };

  const checkAndSetUserName = async (userName: string) => {
    const docRef = doc(db, "users", userName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCheck(1);
      return;
    }
    setUsername(userName);
    setCheck(2);
  };

  return (
    <div className="signUp3_a">
      <h3 className="heading">Pick a username</h3>
      <h5 className="info">
        Your friends use your username to add you on snapchat
      </h5>
      <div className="userInput">
        <h6>USERNAME</h6>
        <input
          type="text"
          onChange={(evt) => checkAndSetUserName(evt.target.value)}
        />
        <h6 style={{ color: check === 1 ? "red" : "green" }}>
          {check === 0
            ? ""
            : check === 1
            ? "username already exists!"
            : "username available!"}
        </h6>
      </div>
      <Button
        sx={{
          backgroundColor: username.length === 0 ? "#c8c8c8" : "#74d4fe",
          ":hover": {
            backgroundColor: username.length === 0 ? "#c8c8c8" : "#ade6ff",
          },
        }}
        className="signUp3_aButton"
        onClick={recordUserName}
        disabled={username.length === 0 ? true : false}
      >
        Continue
      </Button>
    </div>
  );
}

export default Signup3_edit;
