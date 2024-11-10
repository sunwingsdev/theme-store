import { useController } from "react-hook-form";

const TextInput = ({
  name,
  control,
  label,
  fontSize = "text-base",
  backgroundColor = "bg-white",
  readOnly = false,
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
    <div className="mb-4">
      {label && (
        <label
          htmlFor={fieldName}
          className="block mb-1 text-sm font-medium text-gray-700"
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
        readOnly={readOnly}
        className={`w-full px-2 py-1 border rounded-sm shadow focus:outline-none ${
          readOnly
            ? "border-gray-300 bg-gray-100 cursor-not-allowed" // Styling for read-only state
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        } ${fontSize} ${backgroundColor} ${error ? "border-red-500" : ""}`}
        {...rest}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default TextInput;
