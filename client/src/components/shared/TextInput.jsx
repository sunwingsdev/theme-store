const TextInput = ({ name, label, register, defaultValue }) => {
  return (
    <div className="relative w-full h-10">
      <input
        {...register(name)}
        className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-400 focus:border-blue-600"
        placeholder=" "
        defaultValue={defaultValue}
      />
      <label
        htmlFor={name}
        className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content-[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all after:content-[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-orange-600 before:border-blue-gray-200 peer-focus:before:!border-blue-600 after:border-blue-gray-200 peer-focus:after:!border-blue-600"
      >
        {label}
      </label>
    </div>
  );
};

export default TextInput;
