import { collection, orderBy, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase.config";
import "../styles/home.scss";
import { Avatar } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/appSlice";
import { signOut } from "firebase/auth";
import SnapsListItem from "../components/snapsListItem";

function Home() {
  const [snaps, setSnaps] = useState<any>([]);
  const userData = useSelector(selectUser);
  const navigate = useNavigate();

  const logoutUser = () => {
    signOut(auth);
    navigate("/");
  };

  const getSnaps = () => {
    onSnapshot(
      query(
        collection(db, "users", userData.id, "receivedSnaps"),
        orderBy("uploadedOn", "desc")
      ),
      (snapshot) => {
        setSnaps(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );
    console.log(snaps);
  };

  useEffect(() => {
    getSnaps();
  }, []);

  return (
    <div className="home">
      <div className="homeHeader">
        <Avatar
          src={userData ? userData.dp : ""}
          className="accountCircleIcon"
        />
        <h3 className="headerHeading">Snaps</h3>
        <PowerSettingsNewIcon className="searchIcon" onClick={logoutUser} />
      </div>
      <div className="snapsDiv">
        {snaps.map(
          ({
            id,
            data: { snapImageURL, uploadedOn, read, username, dp },
          }: {
            id: string;
            data: {
              snapImageURL: string;
              uploadedOn: any;
              read: boolean;
              dp: string;
              username: string;
            };
          }) => (
            <SnapsListItem
              key={id}
              id={id}
              username={username}
              uploadedOn={uploadedOn}
              read={read}
              snapImageURL={snapImageURL}
              dp={dp}
            />
          )
        )}
      </div>
      <div
        className="snapCaptureButton"
        onClick={() => navigate("/captureSnap")}
      ></div>
    </div>
  );
}

export default Home;
