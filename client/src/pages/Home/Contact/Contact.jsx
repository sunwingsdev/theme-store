import { useForm } from "react-hook-form";
import PrimaryButton from "../../../components/Home/PrimaryButton/PrimaryButton";
import { useAddQueryMutation } from "../../../redux/features/allApis/queriesApi/queriesApi";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import Heading from "../../../components/shared/Heading";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [addQuery] = useAddQueryMutation();
  const { addToast } = useToasts();

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
            <h3 className="text-[#ff1e1e] text-[22px] font-bold pb-[3px] leading-[33px]">
              Head Office [Main Campus, Dhaka]
            </h3>
            <p className="text-[#212529] leading-[1.5rem]">
              A.I. Nannu Tower (6th Floor) <br /> Beside of Mirpur DOHS Shopping
              Complex <br /> 1st Gate, Mirpur DOHS, <br />
              Dhaka 1216, Bangladesh
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-start m-auto lg:m-0 sm:items-start gap-8">
            <div className="">
              <h3 className="text-[#1f1e1e] text-[22px] leading-[33px] pb-[3px] font-bold">
                Phone Number
              </h3>
              <p className="text-[#212529] leading-[1.5rem]">
                +880 1777308777 <br /> +880 1777308777 <br /> +880 1777308777{" "}
                <br /> +880 1777308777 <br /> +880 1777308777
              </p>
            </div>
            <div>
              <h3 className="text-[#1f1e1e] text-[22px] leading-[33px] pb-[3px] font-bold">
                Office Visit Time:
              </h3>
              <p>
                Saturday- Thursday <br />
                10:00 am to 7:00 pm
              </p>
              <h3 className="text-[#1f1e1e] text-[22px] leading-[33px] pb-[3px] font-bold pt-2">
                Email:
              </h3>
              <p>sunwingsdev@gmail.com</p>
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
