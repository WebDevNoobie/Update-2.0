import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDob,
  selectMobile,
  selectName,
  selectPassword,
  selectUid,
  selectUserName,
} from "../redux/slices/signupSlice";
import "../styles/uploadDetails.scss";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/appSlice";

function UploadDetails() {
  const navigate = useNavigate();
  const nameobj = useSelector(selectName);
  const password = useSelector(selectPassword);
  const dob = useSelector(selectDob);
  const phone = useSelector(selectMobile);
  const username = useSelector(selectUserName);
  const uid = useSelector(selectUid);
  const [file, setFile] = useState<any>(null);
  const [imgURL, setImgURL] = useState<any>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const dispatch = useDispatch();

  const saveData = async () => {
    if (!file) {
      return;
    }
    const storageRef = ref(storage, "profilePictures/" + username + "-dp");
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const userData = {
            id: uid,
            name: nameobj,
            username: username,
            password: password,
            dob: dob,
            phone: phone,
            dp: downloadURL,
          };
          setImgURL(downloadURL);
          setFile(null);
          setDoc(doc(db, "users", uid), userData);
          dispatch(login(userData));
          navigate("/home");
        });
      }
    );
  };

  return (
    <div className="uploadDetails">
      <img
        className="profilePic"
        src={
          imgURL === null
            ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            : imgURL
        }
        alt="Profile Pic"
      />
      <label className="file">
        <input
          type="file"
          id="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
            setImgURL(
              URL.createObjectURL(
                e.target.files ? e.target.files[0] : new Blob()
              )
            );
          }}
          style={{ display: "none" }}
        />
        <p>{file === null ? "Select Picture" : "Change Picture"}</p>
      </label>
      <Button
        sx={{
          backgroundColor:
            file === null && imgURL === null ? "#c8c8c8" : "#74d4fe",
          ":hover": {
            backgroundColor:
              file === null && imgURL === null ? "#c8c8c8" : "#ade6ff",
          },
        }}
        className="upload"
        onClick={saveData}
        disabled={file === null && imgURL === null ? true : false}
      >
        Upload and Continue
      </Button>
      {!imgURL && (
        <ProgressBar
          completed={progressPercent}
          bgColor="#74d4fe"
          baseBgColor="ade6ff"
          className="progressBar"
        />
      )}
    </div>
  );
}

export default UploadDetails;
