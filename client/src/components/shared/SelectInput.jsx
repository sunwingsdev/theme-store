import { useForm } from "react-hook-form";

const SelectInput = ({ name, label, options }) => {
  const { register } = useForm();
  return (
    <div className="col-span-2 md:col-span-1">
      <select
        {...register(name, { required: `${label} is required` })}
        className="w-full h-10 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
      >
        <option value="" disabled selected>
          Select {label}
        </option>
        {options?.map((item) => (
          <option key={item?.value} value={item?.value}>
            {item?.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
