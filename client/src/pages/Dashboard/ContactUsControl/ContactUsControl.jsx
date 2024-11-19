import ControlCard from "../../../components/shared/ControlCard";
import QuillTextEditor from "../../../components/shared/QuillTextEditor";

const ContactUsControl = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
      <ControlCard
        category="office"
        name="contact-office-title"
        page="contact"
      />
      <QuillTextEditor
        category="office"
        name="contact-office-text"
        page="contact"
      />
      <ControlCard category="phone" name="contact-phone-title" page="contact" />
      <QuillTextEditor
        category="phone"
        name="contact-phone-text"
        page="contact"
      />
      <ControlCard
        category="visit-time"
        name="contact-visit-title"
        page="contact"
      />
      <QuillTextEditor
        category="visit-time"
        name="contact-visit-text"
        page="contact"
      />
      <ControlCard category="email" name="contact-email-title" page="contact" />
      <ControlCard category="email" name="contact-email-text" page="contact" />
    </div>
  );
};

export default ContactUsControl;
