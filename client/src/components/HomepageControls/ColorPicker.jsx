import { useController } from "react-hook-form";

const ColorPicker = ({ name, control, label }) => {
  const {
    field: { onChange, value, name: fieldName },
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
          className="block mb-1 text-sm font-medium text-gray-700"
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
          className="w-8 h-8 border-none cursor-pointer rounded-sm"
        />
        <input
          id={fieldName}
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter color code"
          className="w-full p-1.5 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
