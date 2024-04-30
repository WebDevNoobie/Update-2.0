import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";
import { PhoneInput } from "react-international-phone";
import "../styles/te.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast from "react-hot-toast";
import { auth, db } from "../../firebase.config";
import { setConfirmation } from "../redux/slices/appSlice";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";

function Login() {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();

  const sendOTP = async () => {
    try {
      const docRef = doc(db, "numbers", number);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
          size: "invisible",
          callback: () => {},
          "expired-callback": () => {},
        });
        const confirmation = await signInWithPhoneNumber(
          auth,
          "+" + number,
          recaptcha
        );
        if (confirmation) {
          dispatch(setConfirmation(confirmation));
          navigate("/login_c", {
            state: { phone: number },
          });
        }
      } else {
        toast.error("Phone number not registered!");
      }
    } catch (error) {
      toast.error("Couldn't send OTP!");
      console.log(error);
    }
  };

  return (
    <div className="login">
      <h3 className="heading">Whats your mobile number?</h3>
      <h5 className="info">
        We'll send you a text verification code on your registered mobile
        number.
      </h5>
      <div className="userInput">
        <h6>MOBILE</h6>
        <PhoneInput
          className="qwe"
          inputClassName="phon"
          defaultCountry="in"
          value={number}
          onChange={(phone) => setNumber(phone)}
        />
      </div>
      <Button
        sx={{
          backgroundColor: number.length < 13 ? "#c8c8c8" : "#74d4fe",
          ":hover": {
            backgroundColor: number.length < 13 ? "#c8c8c8" : "#ade6ff",
          },
        }}
        className="loginButton"
        onClick={sendOTP}
        disabled={number.length < 13 ? true : false}
      >
        Continue
      </Button>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Login;
