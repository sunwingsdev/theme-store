import { useForm } from "react-hook-form";
import { useAddAdmissionMutation } from "../../../redux/features/allApis/admissionApi/admissionApi";
import { useToasts } from "react-toast-notifications";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { IoMdDoneAll } from "react-icons/io";

const AdmissionForm = ({ closeModal, course }) => {
  const [loading, setLoading] = useState(false);
  const [addMission] = useAddAdmissionMutation();
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await addMission(data);
      if (result.data.insertedId) {
        addToast("Form submitted successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        closeModal();
        setLoading(false);
      }
      console.log(result);
    } catch (error) {
      addToast(error.message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter full name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Phone"
            {...register("phone", { required: true, pattern: /^\d+$/ })}
          />
          {errors.phone && (
            <span className="text-red-500">
              Please enter a valid phone number
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="profession"
          >
            Profession
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="profession"
            type="text"
            placeholder="Profession"
            {...register("profession", { required: true })}
          />
          {errors.profession && (
            <span className="text-red-500">Profession is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            placeholder="Location"
            {...register("location", { required: true })}
          />
          {errors.location && (
            <span className="text-red-500">Location is required</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="course"
          >
            Course
          </label>
          <select
            defaultValue={course}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="course"
            {...register("course", { required: true })}
          >
            <option value="" selected disabled>
              Select a course
            </option>
            <option value="visa processing course">
              Visa Processing Course
            </option>
            <option value="air ticketing course">Air Ticketing Course</option>
            <option value="travel agency business course">
              Travel Agency Business Course
            </option>
          </select>
          {errors.course && (
            <span className="text-red-500">Please select a course</span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="schedule"
          >
            Schedule
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="schedule"
            {...register("schedule", { required: true })}
          >
            <option value="" selected disabled>
              Select schedule
            </option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
          {errors.course && (
            <span className="text-red-500">Please select a course</span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button type="submit">
            {loading ? (
              <PrimaryButton
                text={"Submitting..."}
                arrow={false}
                icon={TbFidgetSpinner}
                spin={true}
              />
            ) : (
              <PrimaryButton text={"Submit"} arrow={false} icon={IoMdDoneAll} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdmissionForm;
