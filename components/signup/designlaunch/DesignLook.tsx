import { useState } from "react";
import ChatBox from './ChatBox'; // Import the ChatBox component

// Default configuration values
const defaultConfig = {
  userConfig: {
    assistantAvatarUrl: "default-assistant-avatar-url",
    assistantLabel: "Assistant",
    assistantOfflineMessage: "Sorry, I'm offline right now. Please try again later.",
    colors: {
      primary: "#7e1aff",
      secondary: "#c1c1c1",
      dark_primary: "#7e1aff",
      dark_secondary: "#c1c1c1",
      backgroundLight: "#ffffff",
      backgroundDark: "#05021f",
    },
    defaultTemplateQuestions: [],
    displayVariant: "speechyAvatarV2",
    elementIds: "",
    introduction: "Hi there! I'm your AI product assistant, here to help you find what you're looking for.",
    isDarkMode: false,
    logoUrl: "default-logo-url",
    popupLocation: "bottom_right",
    positionType: "popup",
    showResetButton: true,
    systemErrorMessage: "Sorry, I'm having trouble connecting to the server. Please try again later.",
    userAvatarUrl: "default-user-avatar-url",
    userLabel: "User",
    popupLabel: "Ask AI",
    popupVariation: "speechy",
  }
};

export function DesignLook() {
  const [config, setConfig] = useState(defaultConfig.userConfig);

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;

    if (id.startsWith("color_")) {
      const colorKey = id.split("_")[1];
      setConfig((prevConfig) => ({
        ...prevConfig,
        colors: {
          ...prevConfig.colors,
          [colorKey]: value,
        },
      }));
    } else {
      setConfig((prevConfig) => ({
        ...prevConfig,
        [id]: value,
      }));
    }
  };

  return (
    <div className="flex justify-between gap-6">
      <div className="w-[60%] p-6 rounded-lg  text-white">
        <h1 className="text-3xl mb-4 font-sans">Design the look:</h1>
        <p className="mb-6 text-base">
          We scanned your website and fetched your brand style guidelines. But feel free to customize the appearance of your AI Concierge any way you want.
        </p>

        <div className="flex flex-col gap-6">
          {/* Colours Section */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <ColorInput
              label="Primary"
              id="color_primary"
              defaultValue={config.colors.primary}
              handleChange={handleInputChange}
            />
            <ColorInput
              label="Secondary"
              id="color_secondary"
              defaultValue={config.colors.secondary}
              handleChange={handleInputChange}
            />
            <ColorInput
              label="Background"
              id="color_backgroundLight"
              defaultValue={config.colors.backgroundLight}
              handleChange={handleInputChange}
            />
            <ColorInput
              label="Notifications"
              id="color_primary"
              defaultValue={config.colors.primary}
              handleChange={handleInputChange}
            />
          </div>

          {/* Button Color */}
          <div className="w-[50%]">
            <label className="pb-2">Button Colour</label>
            <ColorInput
              label="Primary"
              id="color_primary"
              defaultValue={config.colors.primary}
              handleChange={handleInputChange}
            />
          </div>

          {/* Button Style */}
          <div className="space-y-2 pt-4">
            <label>Button Style</label>
            <div className="flex space-x-4">
              <RadioButton label="Store Icon" value="store" defaultChecked />
              <RadioButton label="Round chat icon" value="round" />
            </div>
          </div>

          {/* Text Inputs */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <TextInput
              label="Assistant Avatar URL"
              id="assistantAvatarUrl"
              defaultValue={config.assistantAvatarUrl}
              handleChange={handleInputChange}
            />
            <TextInput
              label="Assistant Label"
              id="assistantLabel"
              defaultValue={config.assistantLabel}
              handleChange={handleInputChange}
            />
            <TextInput
              label="Popup Label"
              id="popupLabel"
              defaultValue={config.popupLabel}
              handleChange={handleInputChange}
            />
            <TextInput
              label="User Avatar URL"
              id="userAvatarUrl"
              defaultValue={config.userAvatarUrl}
              handleChange={handleInputChange}
            />
            <TextInput
              label="User Label"
              id="userLabel"
              defaultValue={config.userLabel}
              handleChange={handleInputChange}
            />
          </div>

          {/* Select Inputs */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <SelectInput
              label="Popup Location"
              id="popupLocation"
              options={["bottom_right", "bottom_left", "top_right", "top_left"]}
              defaultValue={config.popupLocation}
              handleChange={handleInputChange}
            />
            <SelectInput
              label="Position Type"
              id="positionType"
              options={["popup", "inline"]}
              defaultValue={config.positionType}
              handleChange={handleInputChange}
            />
            <SelectInput
              label="Popup Variation"
              id="popupVariation"
              options={["speechy", "classic", "bubble"]}
              defaultValue={config.popupVariation}
              handleChange={handleInputChange}
            />
            <SelectInput
              label="Display Variant"
              id="displayVariant"
              options={["speechyAvatarV2", "classicAvatar", "bubbleAvatar"]}
              defaultValue={config.displayVariant}
              handleChange={handleInputChange}
            />
          </div>

          {/* Checkbox Inputs */}
          <CheckboxInput
            label="Dark Mode"
            id="isDarkMode"
            checked={config.isDarkMode}
            handleChange={handleInputChange}
          />
          <CheckboxInput
            label="Show Reset Button"
            id="showResetButton"
            checked={config.showResetButton}
            handleChange={handleInputChange}
          />
        </div>
      </div>

      <div className="w-[40%] flex justify-center items-center">
        <ChatBox config={config} />
      </div>
    </div>
  );
}

function ColorInput({ label, id, defaultValue, handleChange }: any) {
  return (
    <div className="flex h-10 w-full">
      <div className="rounded-l-lg bg-[#F2F2F2] text-[#444444] w-[45%] text-start flex justify-center flex-col">
        <label htmlFor={id} className="pl-1">
          {label}
        </label>
      </div>
      <div className="w-[55%]">
        <input
          id={id}
          type="color"
          value={defaultValue}
          onChange={handleChange}
          className="rounded-r-lg bg-white text-black h-full w-full"
        />
      </div>
    </div>
  );
}

function TextInput({ label, id, defaultValue, handleChange }: any) {
  return (
    <div className="flex h-10 w-full">
      <div className="rounded-l-lg bg-[#F2F2F2] text-[#444444] w-[45%] text-start flex justify-center flex-col">
        <label htmlFor={id} className="pl-1">
          {label}
        </label>
      </div>
      <div className="w-[55%]">
        <input
          id={id}
          type="text"
          value={defaultValue}
          onChange={handleChange}
          className="rounded-r-lg bg-white text-black h-full w-full"
        />
      </div>
    </div>
  );
}

function SelectInput({ label, id, options, defaultValue, handleChange }: any) {
  return (
    <div className="flex h-10 w-full">
      <div className="rounded-l-lg bg-[#F2F2F2] text-[#444444] w-[45%] text-start flex justify-center flex-col">
        <label htmlFor={id} className="pl-1">
          {label}
        </label>
      </div>
      <div className="w-[55%]">
        <select
          id={id}
          value={defaultValue}
          onChange={handleChange}
          className="rounded-r-lg bg-white text-black h-full w-full"
        >
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function CheckboxInput({ label, id, checked, handleChange }: any) {
  return (
    <div className="flex h-10 w-full">
      <div className="rounded-l-lg bg-[#F2F2F2] text-[#444444] w-[45%] text-start flex justify-center flex-col">
        <label htmlFor={id} className="pl-1">
          {label}
        </label>
      </div>
      <div className="w-[55%]">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => handleChange({ target: { id, value: e.target.checked } })}
          className="rounded-r-lg bg-white text-black h-full w-full"
        />
      </div>
    </div>
  );
}

function RadioButton({ label, value, defaultChecked = false }: any) {
  return (
    <div className="flex items-center gap-2 bg-white text-[#444444] w-[50%] p-2 h-10 rounded-lg">
      <input
        type="radio"
        id={value}
        name="buttonStyle"
        value={value}
        defaultChecked={defaultChecked}
        className="bg-[#EDE4FF]"
      />
      <label htmlFor={value} className="w-full">
        {label}
      </label>
    </div>
  );
}
