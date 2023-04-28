// Here the main page for user and their router
// import start here
import "./User.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Suspense, lazy, useCallback } from "react";
import LoadingScreen from "../../Reusable/LoadingScreen/LoadingScreen";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import VerifyEmail from "./VerifyEmail/VerifyEmail";
import ProtectedRoute from "../../Route/Components/ProtectedRoute";
import EnterAnimation from "../../Reusable/Animation/EnterAnimation/EnterAnimation";
import ProtectedRoutePathVerify from "../../Route/Components/ProtectedRouteVerify";
import ProtectedRouteClosed from "../../Route/Components/ProtectedRouteClosed";
import JoinClosed from "./Join/JoinClosed";
import Preulympic from "./Preulympic/Preulympic";
import PreulympicRegistration from "./Preulympic/PreulympicRegistration";
import PreulympicRebelSquad from "./Preulympic/PreulympicRebelSquad";
import PreulympicPayment from "./Preulympic/PreulympicPayment";
import PreulympicForm from "./Preulympic/PreulympicForm";
// Bellow is code spliting using react lazy load and react suspense
// This method aim to make the code more easy to load on deployment by separating them into several smaller chunk
const Announcement = lazy(() => import("./Announcement/Announcement"));
const ComingSoon = lazy(() => import("./ComingSoon/ComingSoon"));
const NavbarUser = lazy(() => import("../../Reusable/NavbarUser/Navbar"));
const NavbarMobile = lazy(() => import("../../Reusable/NavbarUser/NavbarMobile/NavbarMobile"));
const Footer = lazy(() => import("../../Reusable/Footer/Footer"));
const Home = lazy(() => import("./Home/Home"));
const About = lazy(() => import("./About Us/About"));
const Division = lazy(() => import("./Division/Division"));
const Login = lazy(() => import("./Login/Login"));
const Register = lazy(() => import("./Register/Register"));
const Join = lazy(() => import("./Join/Join"));
// end here

// function start here
export default function User() {
  // Check if screen is mobile
  const isMobile = useMediaQuery("(max-width: 960px)");
  // [Callback]
  // (i'm not sure if it is work because they are rarely re-rendered)
  // prevent home page to re-rendered when value change
  const HomeCallback = useCallback(() => {
    return <Home />;
  }, []);
  // prevent about page to re-rendered
  const AboutCallback = useCallback(() => {
    return <About />;
  }, []);
  // prevent division page to re-rendered
  const DivisionCallback = useCallback(() => {
    return <Division />;
  }, []);

  // return is here
  return (
    <div id="User-Page">
      {/* must calling Router first before calling Route */}
      {/* Routes is more like wrapper for the Route */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              {isMobile ? (
                <Suspense fallback={<LoadingScreen />}>
                  <NavbarMobile />
                </Suspense>
              ) : (
                <Suspense fallback={<LoadingScreen />}>
                  <EnterAnimation className="NavbarUser-wrap">
                    <NavbarUser />
                  </EnterAnimation>
                </Suspense>
              )}
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Preulympic/>
              </Suspense>
            }
          />
          <Route
            path="Announcement"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <Announcement />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <AboutCallback />
              </Suspense>
            }
          />
          <Route
            path="division"
            element={
              <Suspense fallback={<LoadingScreen />}>
                <DivisionCallback />
              </Suspense>
            }
          />
          <Route
            path="login"
            element={
              <ProtectedRoute user={"guest"}>
                <Suspense fallback={<LoadingScreen />}>
                  <Login />
                  {/* <ComingSoon /> */}
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute user={"guest"}>
                <Suspense fallback={<LoadingScreen />}>
                  <Register />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="register/verify"
            element={
              <ProtectedRoute user={"user"}>
                {/* <ProtectedRoutePath path="/register/verify"> */}
                <VerifyEmail />
                {/* </ProtectedRoutePath> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="verify"
            element={
              <ProtectedRoute user={"user"}>
                {/* <ProtectedRoutePath path="/register/verify"> */}
                <VerifyEmail />
                {/* </ProtectedRoutePath> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="recruitment"
            element={
              <>
                <ProtectedRoute user={"user"}>
                  <ProtectedRoutePathVerify>
                    <ProtectedRouteClosed status={0}>
                      <Suspense fallback={<LoadingScreen />}>
                        <Join />
                      </Suspense>
                    </ProtectedRouteClosed>
                  </ProtectedRoutePathVerify>
                </ProtectedRoute>
              </>
            }
          />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/joinclosed" element={<JoinClosed />} />
          <Route path="/PreulympicRegistration"element={<PreulympicRegistration/>}/>
          <Route path="/PreulympicRebelSquad"element={<PreulympicRebelSquad/>}/>
          <Route path="/PreulympicPayment"element={<PreulympicPayment/>}/>
          <Route path="/PreulympicForm"element={<PreulympicForm/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}
