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
import Analytics from "./pages/Analytics/Analytics";
import Setting from "./pages/Settings/Setting";
import Wallet from "./pages/Wallet/Wallet";

import Sidebar from "./Components/Sidebar/Sidebar";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("authToken")
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Handle sidebar visibility based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!isAuthenticated ? (
          <>
            <Route
              path="/sign-in"
              element={<Signin setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/signup"
              element={<Signup setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/account-setup" element={<SetUp />} />
            <Route path="*" element={<Navigate to="/sign-in" />} />
          </>
        ) : (
          // Authenticated Layout
          <Route
            path="/*"
            element={
              <div className="h-[100vh] overflow-hidden flex relative">
                {/* Overlay for mobile */}
                {isSidebarOpen && (
                  <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
                    onClick={() => setIsSidebarOpen(false)}
                  />
                )}
                
                {/* Sidebar with responsive positioning */}
                <div 
                  className={`${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                  } transition-transform duration-300 ease-in-out fixed md:relative z-30 h-full`}
                >
                  <Sidebar />
                </div>

                <div className="flex-1 overflow-y-scroll">
                  <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                  <Routes>
                    <Route
                      path="/"
                      element={<Dashboard handleLogout={handleLogout} />}
                    />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Setting />} />
                    <Route path="/wallet" element={<Wallet />} />
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

// All has been commented for proper understanding... so yeah! that's it for this file.