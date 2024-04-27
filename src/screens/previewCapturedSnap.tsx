import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetCameraImage,
  selectCameraImage,
} from "../redux/slices/cameraSlice";
import "../styles/previewCapturedSnap.scss";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../firebase.config";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { selectUser } from "../redux/slices/appSlice";

function PreviewCapturedSnap() {
  const cameraImage: any = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const recapture = () => {
    dispatch(resetCameraImage());
    navigate("/captureSnap");
  };

  const sendSnap = () => {
    const id = uuid();
    const storageRef = ref(storage, "snaps/" + user.id + "/" + id);
    const uploadTask = uploadString(storageRef, cameraImage, "data_url");
    uploadTask.then(() => {
      getDownloadURL(storageRef).then((downloadURL) => {
        const snapData = {
          snapImageURL: downloadURL,
          uploadedOn: serverTimestamp(),
          username: user.username,
          dp: user.dp,
          read: false,
        };
        getDocs(collection(db, "users")).then((docsSnapshot) => {
          docsSnapshot.forEach((document) => {
            document.id === user.id
              ? setDoc(
                  doc(collection(db, "users", document.id, "sentSnaps")),
                  snapData,
                  {
                    merge: true,
                  }
                )
              : setDoc(
                  doc(collection(db, "users", document.id, "receivedSnaps")),
                  snapData,
                  {
                    merge: true,
                  }
                );
          });
          navigate("/home");
        });
      });
    });
  };

  return (
    <div className="preview">
      <CloseIcon className="recaptureButton" onClick={recapture} />
      <img src={cameraImage} alt="Snap" className="snapPreviewImg" />
      <div className="sendSnapButton" onClick={sendSnap}>
        <h2>Send Now</h2>
        <SendIcon className="sendIcon" />
      </div>
    </div>
  );
}

export default PreviewCapturedSnap;
