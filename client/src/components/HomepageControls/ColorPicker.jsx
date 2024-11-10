import { useController } from "react-hook-form";

const ColorPicker = ({ name, control, label, disabled }) => {
  const {
    field: { onChange, value, name: fieldName },
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
          className={`block mb-1 text-sm font-medium ${
            disabled ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {label}
        </label>
      )}
      <div className="flex items-center space-x-1">
        <input
          type="color"
          id={`${fieldName}-picker`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-8 h-8 cursor-pointer rounded-sm ${
            disabled ? "cursor-not-allowed" : ""
          }`}
          disabled={disabled}
        />
        <input
          id={fieldName}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter color code start with #"
          className={`w-full px-2 py-1 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          readOnly={disabled}
        />
      </div>
    </div>
  );
};

export default ColorPicker;
