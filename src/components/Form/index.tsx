import { Icon } from "@iconify/react";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "id"> {
  icon: string;
  label: string;
  placeholder?: string;
}

export const Input = ({
  icon,
  label,
  placeholder,
  ...inputProps
}: InputProps) => {
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

interface TextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "name" | "id"
  > {
  icon: string;
  label: string;
  placeholder?: string;
}

export const Textarea = ({
  icon,
  label,
  placeholder,
  ...textareaProps
}: TextareaProps) => {
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
        placeholder={placeholder}
        name={label}
        id={label}
        rows={5}
      />
    </label>
  );
};

interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "name" | "id" | "children"
  > {
  icon: string;
  label: string;
  placeholder?: string;
  options: string[];
}

export const Select = ({
  icon,
  label,
  placeholder,
  options,
  ...selectProps
}: SelectProps) => {
  return (
    <label
      className={`flex border-b bg-white ${
        selectProps.disabled ? "opacity-65" : "opacity-100"
      } p-4 w-full`}
    >
      <Icon className="text-gold" icon={icon} fontSize={26} />
      <select
        {...selectProps}
        className="border-none w-full text-blue py-1 px-2 leading-tight focus:outline-none"
        style={{ background: "transparent" }}
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
