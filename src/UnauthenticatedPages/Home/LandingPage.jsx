import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingPage;
