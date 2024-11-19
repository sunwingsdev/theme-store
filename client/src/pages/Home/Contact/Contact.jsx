import { useForm } from "react-hook-form";
import PrimaryButton from "../../../components/Home/PrimaryButton/PrimaryButton";
import { useAddQueryMutation } from "../../../redux/features/allApis/queriesApi/queriesApi";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import Heading from "../../../components/shared/Heading";
import { useGetAllHomeControlsQuery } from "../../../redux/features/allApis/homeControlApi/homeControlApi";

const Contact = () => {
  const { data: controls } = useGetAllHomeControlsQuery();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [addQuery] = useAddQueryMutation();
  const { addToast } = useToasts();
  const contactOfficeTitleControl = controls?.find(
    (control) =>
      control.page === "contact" &&
      control.subcategory === "contact-office-title"
  );
  const contactOfficeTextControl = controls?.find(
    (control) =>
      control.page === "contact" &&
      control.subcategory === "contact-office-text"
  );
  const contactPhoneTitleControl = controls?.find(
    (control) =>
      control.page === "contact" &&
      control.subcategory === "contact-phone-title"
  );
  const contactPhoneTextControl = controls?.find(
    (control) =>
      control.page === "contact" && control.subcategory === "contact-phone-text"
  );
  const contactVisitTitleControl = controls?.find(
    (control) =>
      control.page === "contact" &&
      control.subcategory === "contact-visit-title"
  );
  const contactVisitTextControl = controls?.find(
    (control) =>
      control.page === "contact" && control.subcategory === "contact-visit-text"
  );
  const contactEmailTitleControl = controls?.find(
    (control) =>
      control.page === "contact" &&
      control.subcategory === "contact-email-title"
  );
  const contactEmailTextControl = controls?.find(
    (control) =>
      control.page === "contact" && control.subcategory === "contact-email-text"
  );

  const onSubmit = async (data) => {
    // Handle form submission here
    setLoading(true);
    try {
      const result = await addQuery(data);
      if (result.data.success === true) {
        addToast("Your message has been sent", {
          appearance: "success",
          autoDismiss: true,
        });
        setLoading(false);
      }
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    reset();
  };

  return (
    <div className="">
      <Heading
        title={"Contact Us"}
        subtitle={
          "For any website-related information, you are welcome to visit our office. You can also contact us through a hotline number or messenger."
        }
      />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-center text-center lg:text-start gap-12 mt-16">
          <div className="">
            <h3
              style={{
                fontSize: `${contactOfficeTitleControl?.fontSize}px`,
                color: contactOfficeTitleControl?.textColor,
                backgroundColor: contactOfficeTitleControl?.backgroundColor,
              }}
              className="text-[#ff1e1e] text-[22px] font-bold pb-[3px] leading-[33px]"
            >
              {contactOfficeTitleControl?.text
                ? contactOfficeTitleControl?.text
                : "Head Office [Main Campus, Dhaka]"}
            </h3>
            {contactOfficeTextControl?.text ? (
              <p
                className="py-6"
                dangerouslySetInnerHTML={{
                  __html: contactOfficeTextControl?.text,
                }}
              ></p>
            ) : (
              <p className="text-[#212529] leading-[1.5rem]">
                A.I. Nannu Tower (6th Floor) <br /> Beside of Mirpur DOHS
                Shopping Complex <br /> 1st Gate, Mirpur DOHS, <br />
                Dhaka 1216
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-start m-auto lg:m-0 sm:items-start gap-8">
            <div className="">
              <h3
                style={{
                  fontSize: `${contactPhoneTitleControl?.fontSize}px`,
                  color: contactPhoneTitleControl?.textColor,
                  backgroundColor: contactPhoneTitleControl?.backgroundColor,
                }}
                className="text-[#1f1e1e] text-[22px] leading-[33px] pb-[3px] font-bold"
              >
                {contactPhoneTitleControl?.text
                  ? contactPhoneTitleControl?.text
                  : "Phone Number"}
              </h3>
              {contactOfficeTitleControl?.text ? (
                <p
                  className="py-6"
                  dangerouslySetInnerHTML={{
                    __html: contactPhoneTextControl?.text,
                  }}
                ></p>
              ) : (
                <p className="text-[#212529] leading-[1.5rem]">
                  +880 1777308777 <br /> +880 1777308777 <br /> +880 1777308777{" "}
                  <br /> +880 1777308777 <br /> +880 1777308777
                </p>
              )}
            </div>
            <div>
              <h3
                style={{
                  fontSize: `${contactVisitTitleControl?.fontSize}px`,
                  color: contactVisitTitleControl?.textColor,
                  backgroundColor: contactVisitTitleControl?.backgroundColor,
                }}
                className="text-[#1f1e1e] text-[22px] leading-[33px] pb-[3px] font-bold"
              >
                {contactVisitTitleControl?.text
                  ? contactVisitTitleControl?.text
                  : "Office Visit Time:"}
              </h3>
              {contactOfficeTitleControl?.text ? (
                <p
                  className="py-6"
                  dangerouslySetInnerHTML={{
                    __html: contactVisitTextControl?.text,
                  }}
                ></p>
              ) : (
                <p className="text-[#212529] leading-[1.5rem]">
                  Saturday- Thursday <br />
                  10:00 am to 7:00 pm
                </p>
              )}
              <h3
                style={{
                  fontSize: `${contactEmailTitleControl?.fontSize}px`,
                  color: contactEmailTitleControl?.textColor,
                  backgroundColor: contactEmailTitleControl?.backgroundColor,
                }}
                className="text-[#1f1e1e] text-[22px] leading-[33px] pb-[3px] font-bold"
              >
                {contactEmailTitleControl?.text
                  ? contactEmailTitleControl?.text
                  : "Email:"}
              </h3>
              <p
                style={{
                  fontSize: `${contactEmailTextControl?.fontSize}px`,
                  color: contactEmailTextControl?.textColor,
                  backgroundColor: contactEmailTextControl?.backgroundColor,
                }}
              >
                {contactEmailTextControl?.text
                  ? contactEmailTextControl?.text
                  : "oracletechnology.net@gmail.com"}
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-md mx-auto my-10 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Queries</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="border-2 border-gray-400 w-full py-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="border-2 border-gray-400 w-full py-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                {...register("phone", { required: true })}
                placeholder="Phone Number"
                className="border-2 border-gray-400 w-full py-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                {...register("subject", { required: true })}
                placeholder="Subject"
                className="border-2 border-gray-400 w-full py-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <textarea
                {...register("details", { required: true })}
                placeholder="Your Query"
                rows="4"
                className="border-2 border-gray-400 w-full py-2 px-3 rounded-lg focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button type="submit">
                {loading ? (
                  <PrimaryButton text={"Submitting"} />
                ) : (
                  <PrimaryButton text={"Submit"} />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
