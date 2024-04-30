import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSnapURL } from "../redux/slices/appSlice";
import "../styles/snap.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import LoadingAnimation from "./loadingAnimation";

function Snap() {
  const selectedImage = useSelector(selectSnapURL);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    navigate(-1);
  };

  return (
    <div className="snap">
      {loading && (
        <div className="animationDiv">
          <LoadingAnimation />
        </div>
      )}
      <img
        src={selectedImage}
        alt=""
        onClick={exit}
        className="snapImg"
        onLoad={() => {
          setLoading(false);
          console.log("loaded");
        }}
      />
      <div className="countdownTimer">
        <CountdownCircleTimer
          isPlaying={!loading}
          duration={10}
          strokeWidth={5}
          size={35}
          colors="#000000"
        >
          {({ remainingTime, color }) => {
            if (remainingTime === 0) {
              exit();
            }
            return <span style={{ color }}>{remainingTime}</span>;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default Snap;
