import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectSnapURL } from "../redux/slices/appSlice";
import "../styles/snap.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function Snap() {
  const selectedImage = useSelector(selectSnapURL);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedImage) {
      exit();
    }
  }, [selectedImage]);

  const exit = () => {
    navigate("/home");
  };

  return (
    <div className="snap">
      <img src={selectedImage} alt="" onClick={exit} className="snapImg" />
      <div className="countdownTimer">
        <CountdownCircleTimer
          isPlaying
          duration={10}
          strokeWidth={5}
          size={35}
          colors="#ffffff"
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
