import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./App.css";

import Signin from "@/auth/signin/Signin";
import Signup from "@/auth/signup/Signup";
import SetUp from "./auth/AccountSetUp/SetUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import PasswordReset from "./auth/forgottenPassword/PasswordReset";
import Campaigns from "./pages/Campaigns/Campaigns";
import CampaignManager from "@/Components/CampaignManager";
import SmsCampaign from "./pages/Campaigns/SMSCampaign/SmsCampaign";
import WhatsAppMessageCreation from "./pages/Campaigns/WhatsAppCampaign/WhatsAppMessageCreation";
import WhatsAppCampaign from "./pages/Campaigns/WhatsAppCampaign/WhatsAppCampaign";
import MessageCreation from "./pages/Campaigns/SMSCampaign/MessageCreation";
import Contact from "./pages/Contact/Contact";
import Analytics from "./pages/Analytics/Analytics";
import Setting from "./pages/Settings/Setting";
import Wallet from "./pages/Wallet/Wallet";
import Notification from "./pages/Notification/Notification";
import Groups from "./pages/Groups/Groups";
import CampaignPage from "./pages/Campaigns/EmailCampaign";
import Home from "./pages/Campaigns/Email/page";
import LandingPage from "./UnauthenticatedPages/Home/LandingPage";
import HomeLandingPage from "./UnauthenticatedPages/Home/HomeLandingPage";
import ContactUs from "./UnauthenticatedPages/Contact/ContactUs";
import About from "./UnauthenticatedPages/About/About";
import UseCases from "./UnauthenticatedPages/UseCases/UseCases";
import Community from "./UnauthenticatedPages/Community/Community";
import PrivacyPolicy from "./UnauthenticatedPages/PrivacyPolicy/PrivacyPolicy";
import ServiceAgreement from "./UnauthenticatedPages/ServiceAgreement/ServiceAgreement";
import CodeOfConduct from "./UnauthenticatedPages/CodeOfConduct/CodeOfConduct";

import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/redux/slice/authSlice";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  // Load authentication state on mount
  useEffect(() => {
    const token = Cookies.get("authToken");
    const userData = Cookies.get("userData");

    if (token && userData) {
      dispatch(loginSuccess(JSON.parse(userData))); // Restore authentication state
    }
  }, [dispatch]);

  // Handle sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth > 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleLogout = () => dispatch(logout());

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />}>
          <Route index element={<HomeLandingPage />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="about-us" element={<About />} />
          <Route path="use-cases" element={<UseCases />} />
          <Route path="community" element={<Community />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="legal-agreement" element={<ServiceAgreement />} />
          <Route path="code-of-conduct" element={<CodeOfConduct />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>

        {/* Auth Routes */}
        <Route
          path="/sign-in"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signin />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/account-setup" element={<SetUp />} />

        {/* Protected Routes (Authenticated Only) */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <div className="h-[100vh] overflow-hidden flex relative">
                {isSidebarOpen && (
                  <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                )}
                <div
                  className={`${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 ease-in-out fixed md:relative z-30 h-full`}
                >
                  <Sidebar />
                </div>

                <div className="flex-1 overflow-y-scroll">
                  <Navbar
                    toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    isSidebarOpen={isSidebarOpen}
                  />
                  <Routes>
                    <Route
                      index
                      element={<Dashboard handleLogout={handleLogout} />}
                    />
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="contacts" element={<Contact />} />
                    <Route path="campaigns/email" element={<CampaignPage />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="settings" element={<Setting />} />
                    <Route path="wallet" element={<Wallet />} />
                    <Route path="groups" element={<Groups />} />
                    <Route path="notifications" element={<Notification />} />
                    <Route
                      path="campaigns/smsCampaign"
                      element={<SmsCampaign />}
                    />
                    <Route path="campaigns/template" element={<Home />} />
                    <Route
                      path="campaigns/WhatsApp-campaign"
                      element={<WhatsAppCampaign />}
                    />
                    <Route
                      path="campaigns/WhatsApp-campaign/create"
                      element={<WhatsAppMessageCreation />}
                    />
                    <Route
                      path="campaigns/smsCampaign/create"
                      element={<MessageCreation />}
                    />
                    <Route
                      path="*"
                      element={<Navigate to="/dashboard" replace />}
                    />
                  </Routes>
                  <CampaignManager />
                </div>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
