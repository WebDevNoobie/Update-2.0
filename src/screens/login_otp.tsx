import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import "../styles/login_otp.scss";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { login, selectConfirmation } from "../redux/slices/appSlice";
import { doc, getDoc } from "firebase/firestore";

function Login_c() {
  const [confRes, setConfRes] = useState<ConfirmationResult>();
  const [code, setCode] = useState("");
  const [num, setNum] = useState("");
  const confRess = useSelector(selectConfirmation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setNum(location.state.phone);
  }, []);

  const sendOTP = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {},
        "expired-callback": () => {},
      });
      const confirmation = await signInWithPhoneNumber(
        auth,
        "+" + num,
        recaptcha
      );
      if (confirmation) {
        setConfRes(confirmation);
      }
    } catch (error) {
      toast.error("Can't send OTP");
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      let data;
      if (confRes) {
        data = await confRes?.confirm(code);
      } else {
        data = await confRess?.confirm(code);
      }
      const uData = await (
        await getDoc(doc(db, "users", data?.user.uid))
      ).data();
      dispatch(login(uData));
      navigate("/home");
    } catch (error) {
      toast.error("Can't verify OTP");
      console.log(error);
    }
  };

  return (
    <div className="login_c">
      <div id="recaptcha-container"></div>
      <h3 className="heading">Enter Confirmation Code</h3>
      <h5 className="info">Enter the code we sent to +{num}</h5>
      <div className="userInput">
        <h6>CODE</h6>
        <OtpInput
          value={code}
          onChange={(inp) => setCode(inp)}
          numInputs={6}
          containerStyle={"otpInput"}
          inputStyle={"otpInputSingle"}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <h5 className="resendCode" onClick={sendOTP}>
        Resend Code
      </h5>
      <Button
        sx={{
          backgroundColor: code.length < 6 ? "#c8c8c8" : "#74d4fe",
          ":hover": {
            backgroundColor: code.length < 6 ? "#c8c8c8" : "#ade6ff",
          },
        }}
        className="login_cButton"
        onClick={verifyOTP}
        disabled={code.length < 6 ? true : false}
      >
        Continue
      </Button>
    </div>
  );
}

export default Login_c;
