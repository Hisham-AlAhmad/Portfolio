import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
import BackToTop from "../components/BackToTop/BackToTop";
import ThemeSettings from "../components/ThemeSettings/ThemeSettings";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <ThemeSettings />
      <div className="content">
        <Outlet />
      </div>
      {/* <Footer /> */}
      <BackToTop />
    </div>
  );
}

export default Layout;