import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy, useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { login, logout } from "./redux/slices/appSlice";
import { useDispatch } from "react-redux";
import "./styles/index.scss";

import LoadingAnimation from "./screens/loadingAnimation";
import ProtectedRoute from "./components/protectedRoute";
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

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userExist, setUSerExist] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      const uDoc = await getDoc(
        doc(db, "users", auth.currentUser ? auth.currentUser.uid : "")
      );
      if (uDoc.exists()) {
        const uData = uDoc.data();
        dispatch(login(uData));
        setUSerExist(true);
        navigate("/home");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserData = async () => {
    dispatch(logout());
    setUSerExist(false);
    navigate("/firstScreen");
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((authUser) => {
      authUser ? getUserData() : removeUserData();
    });
  }, []);

  return loading ? (
    <LoadingAnimation />
  ) : (
    <Suspense fallback={<LoadingAnimation />}>
      <Routes>
        <Route
          element={
            <ProtectedRoute isAuthenticated={userExist ? false : true} />
          }
        >
          <Route path="/" element={<LoadingAnimation />} />
          <Route path="/firstScreen" element={<FirstScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login_c" element={<Login_c />} />
          <Route path="/signup1" element={<Signup1 />} />
          <Route path="/signup2" element={<Signup2 />} />
          <Route path="/signup3" element={<Signup3 />} />
          <Route path="/signup3_edit" element={<Signup3_edit />} />
          <Route path="/signup4" element={<Signup4 />} />
          <Route path="/signup5" element={<Signup5 />} />
          <Route path="/signup5_c" element={<Signup5_c />} />
        </Route>
        <Route
          element={
            <ProtectedRoute isAuthenticated={userExist ? true : false} />
          }
        >
          <Route path="/uploadDetails" element={<UploadDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/captureSnap" element={<CaptureSnap />} />
          <Route
            path="/previewCapturedSnap"
            element={<PreviewCapturedSnap />}
          />
          <Route path="/snap" element={<Snap />} />
        </Route>
      </Routes>
      <Toaster position="bottom-center" />
    </Suspense>
  );
}
