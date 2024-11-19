import ControlCard from "../../../components/shared/ControlCard";
import QuillTextEditor from "../../../components/shared/QuillTextEditor";

const AboutControl = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
      <ControlCard category="banner" name="about-subtitle" page="about" />
      <ControlCard category="banner" name="about-title" page="about" />
      <QuillTextEditor category="banner" name="about-text" page="about" />
      <ControlCard category="banner" name="about-button" page="about" />
    </div>
  );
};

export default AboutControl;
