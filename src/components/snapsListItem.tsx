import { Avatar } from "@mui/material";
import "../styles/snapsListItem.scss";
import ReactTimeago from "react-timeago";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { collection, doc, updateDoc } from "firebase/firestore";
import { selectUser, setSnapURL } from "../redux/slices/appSlice";
import { useState } from "react";

function SnapsListItem({
  id,
  snapImageURL,
  uploadedOn,
  read,
  username,
  dp,
}: {
  id: string;
  snapImageURL: string;
  uploadedOn: any;
  read: boolean;
  username: string;
  dp: string;
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  const open = () => {
    if (!read) {
      dispatch(setSnapURL(snapImageURL));
      console.log(user.id);
      updateDoc(doc(collection(db, "users", user.id, "receivedSnaps"), id), {
        read: true,
      });
      navigate("/snap");
    }
  };

  return (
    <>
      <div onClick={open} className="snapsListItem">
        {loading && <Avatar className="avatar" />}
        <img className="avatar_img" src={dp} onLoad={() => setLoading(false)} />
        <div className="snapInfo">
          <h3>{username}</h3>
          <p>
            {!read && `Tap to view - `}
            <ReactTimeago date={new Date(uploadedOn?.toDate()).toUTCString()} />
          </p>
        </div>
        {!read && <StopRoundedIcon className="readDot" />}
      </div>
      <div className="seperator"></div>
    </>
  );
}

export default SnapsListItem;
