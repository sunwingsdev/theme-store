import { useController } from "react-hook-form";

const TextInput = ({
  name,
  control,
  label,
  fontSize = "text-base",
  backgroundColor = "bg-white",
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value, name: fieldName },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={fieldName}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={fieldName}
        name={fieldName}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className={`w-full p-1.5 border border-gray-300 rounded-sm shadow focus:outline-none focus:ring-2 focus:ring-blue-500 ${fontSize} ${backgroundColor} ${
          error ? "border-red-500" : ""
        }`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default TextInput;
