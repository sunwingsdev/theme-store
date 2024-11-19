import BannerVideo from "../../../components/HomepageControls/BannerVideo";
import LogoUpload from "../../../components/HomepageControls/LogoUpload";
import ControlCard from "../../../components/shared/ControlCard";
import QuillTextEditor from "../../../components/shared/QuillTextEditor";

const HomeControl = () => {
  return (
    <div className="p-4">
      <LogoUpload />
      <BannerVideo />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <ControlCard category="navbar-top" name="number" page="home" />
        <ControlCard category="navbar-top" name="email" page="home" />
        <ControlCard category="navbar-top" name="address" page="home" />
        <ControlCard category="banner" name="slogan" page="home" />
        <ControlCard category="banner" name="title" page="home" />
        <ControlCard category="banner" name="text" page="home" />
        <ControlCard category="banner" name="first-button" page="home" />
        <ControlCard category="banner" name="second-button" page="home" />
        <ControlCard category="footer" name="footer-title" page="home" />
        <QuillTextEditor category="footer" name="footer-subtitle" page="home" />
      </div>
    </div>
  );
};

export default HomeControl;
