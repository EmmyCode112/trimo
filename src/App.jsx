import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./App.css";

// Import Components
import SignIn from "./auth/signin/SignIn";
import Signup from "./auth/signup/SignUp";
import SetUp from "./auth/AccountSetUp/SetUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import PasswordReset from "./auth/forgottenPassword/PasswordReset";

// Dashboard Pages
import Campaigns from "./pages/Campaigns/Campaigns";
import Analytics from "./pages/Analytics/Analytics";
import Setting from "./pages/Settings/Setting";
import Wallet from "./pages/Wallet/Wallet";

import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("authToken")
  );

  const handleLogout = () => {
    Cookies.remove("authToken"); // Remove auth token
    setIsAuthenticated(false); // Update authentication state
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1030);

  const toggleSidebar = () => {
    if (window.innerWidth < 1030) {
      setIsSidebarOpen((prev) => !prev);
    }
  };


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1030) {
        setIsSidebarOpen(true); // Show sidebar on larger screens
      } else {
        setIsSidebarOpen(false); // Hide sidebar on smaller screens
      }
    };
  
    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!isAuthenticated ? (
          <>
            <Route
              path="/sign-in"
              element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/account-setup" element={<SetUp />} />
            {/* Default redirect for unauthenticated users */}
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </>
        ) : (
          // Authenticated Layout
          <Route
            path="/*"
            element={
              <div className="h-[100vh] overflow-hidden flex">
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <div className="flex-1 overflow-y-scroll">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <Routes>
                    <Route
                      path="/"
                      element={<Dashboard handleLogout={handleLogout} />}
                    />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/wallet" element={<Wallet />} />
                    {/* Redirect unknown routes to dashboard */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </div>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
