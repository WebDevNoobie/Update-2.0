import { useCallback, useRef } from "react";
import "../styles/captureSnap.scss";
import { useDispatch } from "react-redux";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import { setCameraImage } from "../redux/slices/cameraSlice";

function CaptureSnap() {
  const webCamRef = useRef<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/previewCapturedSnap");
  }, [webCamRef]);

  return (
    <div className="snapCaptureDiv">
      <Webcam
        audio={false}
        height={visualViewport?.height}
        ref={webCamRef}
        screenshotFormat="image/jpeg"
        width={visualViewport?.width}
        videoConstraints={{ facingMode: "user" }}
        mirrored={true}
        imageSmoothing={true}
        screenshotQuality={1}
      />
      <div className="snapCaptureButton" onClick={capture}></div>
    </div>
  );
}

export default CaptureSnap;
