import { Outlet } from "react-router-dom";
import Navbar from "../../components/Home/Navbar/Navbar";
import NavbarTop from "../../components/Home/NavbarTop/NavbarTop";
import Footer from "../../components/Home/Footer/Footer";

const HomeLayout = () => {
  return (
    <div className="relative">
      <NavbarTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
