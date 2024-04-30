import Lottie from "react-lottie";
import animationData from "../assets/Loading.json";
import "../styles/loadingAnimation.scss";

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // rendererSettings: {
    //   preserveAspectRatio: "xMidYMid slice",
    // },
  };

  const width = visualViewport?.width ? visualViewport?.width : 0;
  const height = visualViewport?.height ? visualViewport?.height : 0;

  return (
    <div className="loadingDiv">
      <Lottie
        options={defaultOptions}
        width={width > height ? height : width}
        height={width > height ? height : width}
      />
    </div>
  );
};

export default LoadingAnimation;
