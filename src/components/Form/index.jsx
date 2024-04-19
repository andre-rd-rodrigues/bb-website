import { Icon } from "@iconify/react";

const Input = ({ icon, label, placeholder, ...inputProps }) => {
  return (
    <label
      className={`flex items-center border-b bg-white  ${
        inputProps.disabled ? "opacity-65" : "opacity-100"
      } p-4 w-full`}
    >
      <Icon className="text-gold" icon={icon} fontSize={26} />

      <input
        {...inputProps}
        className="border-none w-full text-blue py-1 px-2 leading-tight focus:outline-none"
        style={{ background: "transparent" }}
        type="text"
        placeholder={placeholder}
        name={label}
        id={label}
      />
    </label>
  );
};

const Textarea = ({ icon, label, placeholder, ...textareaProps }) => {
  return (
    <label
      className={`flex border-b bg-white ${
        textareaProps.disabled ? "opacity-65" : "opacity-100"
      } p-4 w-full`}
    >
      <Icon className="text-gold" icon={icon} fontSize={26} />

      <textarea
        {...textareaProps}
        className={`border-none w-full text-blue py-1 px-2 leading-tight focus:outline-none`}
        style={{ background: "transparent" }}
        type="text"
        placeholder={placeholder}
        name={label}
        id={label}
        rows={5}
      />
    </label>
  );
};

const Select = ({ icon, label, placeholder, options, ...selectProps }) => {
  return (
    <label
      className={`flex border-b bg-white ${
        selectProps.disabled ? "opacity-65" : "opacity-100"
      } p-4 w-full`}
    >
      <Icon className="text-gold" icon={icon} fontSize={26} />
      <select
        className="border-none w-full text-blue py-1 px-2 leading-tight focus:outline-none"
        style={{ background: "transparent" }}
        type="text"
        placeholder={placeholder}
        name={label}
        id={label}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export { Input, Textarea, Select };
