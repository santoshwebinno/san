import React, { ChangeEventHandler } from "react";

interface FormFieldProps {
  id: string;
  label?: string;
  value: string | boolean;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: React.HTMLInputTypeAttribute | undefined;
  note?: string;
  icon?: React.ReactNode;
  checkboxVariant?: "default" | "pill";
  error?: string;
}

export function FormField({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  note = "",
  type = "text",
  icon,
  checkboxVariant = "default",
  error,
}: FormFieldProps) {
  return type === "checkbox" ? (
    <CheckboxField
      id={id}
      label={label}
      value={value as boolean}
      onChange={onChange}
      checkboxVariant={checkboxVariant}
      icon={icon}
    />
  ) : (
    <InputField
      id={id}
      label={label}
      value={value as string}
      onChange={onChange}
      type={type}
      note={note}
      placeholder={placeholder}
      error={error}
    />
  );
}

function CheckboxField({
  id,
  label,
  value,
  onChange,
  checkboxVariant = "default",
  icon,
}: Omit<FormFieldProps, "type" | "note">) {
  const checkboxClasses = getCheckboxClasses(checkboxVariant, value as boolean);

  return (
    <label
      htmlFor={id}
      className={getContainerClasses(checkboxVariant, value as boolean)}
    >
      <span className={checkboxClasses}>
        <input
          id={id}
          type="checkbox"
          checked={value as boolean}
          onChange={onChange}
          className="absolute opacity-0 cursor-pointer"
        />
        {renderCheckboxContent(checkboxVariant, value as boolean, label)}
      </span>
      {renderDefaultLabel(checkboxVariant, label, icon)}
    </label>
  );
}

function InputField({
  id,
  label,
  value,
  onChange,
  type,
  note,
  placeholder = "",
  error,
}: Omit<FormFieldProps, "icon" | "checkboxVariant">) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 text-white text-base font-medium text-opacity-80"
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={id}
          rows={6}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 bg-white border ${
            error ? 'border-red-500' : 'border-gray-600'
          } text-black-text text-opacity-60 rounded-lg focus:outline-none focus:border-blue-500`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2 bg-white border ${
            error ? 'border-red-500' : 'border-gray-600'
          } text-black-text text-opacity-60 rounded-lg focus:outline-none focus:border-blue-500`}
        />
      )}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {note && <p className="text-sm mt-1.5 italic text-white/80">{note}</p>}
    </div>
  );
}

// Helper functions
function getCheckboxClasses(variant: "default" | "pill", value: boolean) {
  return variant === "pill"
    ? `relative flex items-center px-4 py-2 rounded-full cursor-pointer group ${
        value ? "bg-purple-light text-white" : "bg-white text-black-text"
      }`
    : `relative flex items-center justify-center w-5 h-5 rounded-sm cursor-pointer group shrink-0 ${
        value ? "bg-white" : "bg-purple-light"
      }`;
}

function getContainerClasses(variant: "default" | "pill", value: boolean) {
  return `${
    variant === "pill"
      ? "rounded-full"
      : "flex items-center px-4 py-2 cursor-pointer rounded-lg"
  } ${value ? "bg-purple-light" : "bg-white"}`;
}

function renderCheckboxContent(
  variant: "default" | "pill",
  value: boolean,
  label?: string
) {
  if (variant === "default" && value) {
    return (
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.95703 10.1631L6.67578 13.8818L14.1133 5.91309"
          stroke="#6528F7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (variant === "pill" && label) {
    return (
      <span className="text-sm font-medium whitespace-nowrap">{label}</span>
    );
  }
  return null;
}

function renderDefaultLabel(
  variant: "default" | "pill",
  label?: string,
  icon?: React.ReactNode
) {
  if (variant === "default" && label) {
    return (
      <div className="flex items-center ml-3 cursor-pointer">
        {icon && <span className="mr-2 shrink-0">{icon}</span>}
        <span className="text-sm font-medium text-black-text whitespace-nowrap">
          {label}
        </span>
      </div>
    );
  }
  return null;
}
