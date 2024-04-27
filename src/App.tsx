import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import animationData from "./assets/Loading.json";
import Lottie from "react-lottie";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useEffect } from "react";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { login, logout } from "./redux/slices/appSlice";
import { useDispatch } from "react-redux";

const FirstScreen = lazy(() => import("./screens/firstScreen"));
const Login = lazy(() => import("./screens/login"));
const Login_c = lazy(() => import("./screens/login_otp"));
const Signup1 = lazy(() => import("./screens/signup1"));
const Signup2 = lazy(() => import("./screens/signup2"));
const Signup3 = lazy(() => import("./screens/signup3"));
const Signup3_edit = lazy(() => import("./screens/signup3_edit"));
const Signup4 = lazy(() => import("./screens/signup4"));
const Signup5 = lazy(() => import("./screens/signup5"));
const Signup5_c = lazy(() => import("./screens/signup5_otp"));
const UploadDetails = lazy(() => import("./screens/uploadDetails"));
const Home = lazy(() => import("./screens/home"));
const CaptureSnap = lazy(() => import("./screens/captureSnap"));
const PreviewCapturedSnap = lazy(() => import("./screens/previewCapturedSnap"));
const Snap = lazy(() => import("./screens/snap"));
// import FirstScreen from "./screens/firstScreen";
// import Login from "./screens/login";
// import Login_c from "./screens/login_otp";
// import Signup1 from "./screens/signup1";
// import Signup2 from "./screens/signup2";
// import Signup3 from "./screens/signup3";
// import Signup3_edit from "./screens/signup3_edit";
// import Signup4 from "./screens/signup4";
// import Signup5 from "./screens/signup5";
// import Signup5_c from "./screens/signup5_otp";
// import UploadDetails from "./screens/uploadDetails";
// import Home from "./screens/home";
// import CaptureSnap from "./screens/captureSnap";
// import PreviewCapturedSnap from "./screens/previewCapturedSnap";
// import Snap from "./screens/snap";

export default function App() {
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const getUserData = async () => {
    const uData = await (
      await getDoc(
        doc(db, "users", auth.currentUser ? auth.currentUser.uid : "")
      )
    ).data();
    dispatch(login(uData));
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      authUser ? getUserData() : dispatch(logout());
    });
  }, []);

  return (
    <Router>
      <Suspense
        fallback={<Lottie options={defaultOptions} height={40} width={40} />}
      >
        <Routes>
          <Route path="/" element={<FirstScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login_c" element={<Login_c />} />
          <Route path="/signup1" element={<Signup1 />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/signup3" element={<Signup3 />} />
          <Route path="/signup3_edit" element={<Signup3_edit />} />
          <Route path="/signup4" element={<Signup4 />} />
          <Route path="/signup5" element={<Signup5 />} />
          <Route path="/signup5_c" element={<Signup5_c />} />
          <Route path="/uploadDetails" element={<UploadDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/captureSnap" element={<CaptureSnap />} />
          <Route
            path="/previewCapturedSnap"
            element={<PreviewCapturedSnap />}
          />
          <Route path="/snap" element={<Snap />} />
        </Routes>
        <Toaster position="bottom-center" />
      </Suspense>
    </Router>
  );
}
