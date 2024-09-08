import { useState } from "react";
import { HelpCircle } from "lucide-react";
import ChatBox from './ChatBox'; // Import the ChatBox component

export function DesignLook() {
  const [colors, setColors] = useState({
    primary: '#6528F7',
    secondary: '#D7BBF5',
    background: '#ffffff',
    notifications: '#6528F7',
    buttoncolor: '#6528F7',
  });

  const handleColorChange = (e: any) => {
    const { id, value } = e.target;

    console.log("🚀 ~ file: DesignLook.tsx:17 ~ handleColorChange ~ value:", value)


    console.log("🚀 ~ file: DesignLook.tsx:17 ~ handleColorChange ~ id:", id)

    setColors((prevColors) => ({
      ...prevColors,
      
      [id]: value,
    }));
  };

  return (
    <div className="flex justify-between gap-6">
      <div className="w-[60%]">
        <h1 className="text-3xl mb-4 font-sans">Design the look:</h1>
        <p className="mb-6 text-base">
          We scanned your website and fetched your brand style guidelines.
          But feel free to customize the appearance of your AI Concierge
          any way you want.
        </p>

        <div className="flex flex-col">
          <label className="pb-2">Colours</label>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            {/* Color Inputs */}
            <ColorInput
              label="Primary"
              defaultValue={colors.primary}
              handleChange={handleColorChange}
            />
            <ColorInput
              label="Secondary"
              defaultValue={colors.secondary}
              handleChange={handleColorChange}
            />
            <ColorInput
              label="Background"
              defaultValue={colors.background}
              handleChange={handleColorChange}
            />
            <ColorInput
              label="Notifications"
              defaultValue={colors.notifications}
              handleChange={handleColorChange}
            />
          </div>

          <div className="pt-4 w-1/2 pr-1">
            <label className="pb-2">Button Colour</label>
            <ColorInput
              label="Button Color"
              defaultValue={colors.buttoncolor}
              handleChange={handleColorChange}
            />
          </div>

          <ButtonStyleInput />
        </div>
      </div>

      <div className="w-[40%] flex justify-center items-center">
        <ChatBox colors={colors} />
      </div>
    </div>
  );
}

function ColorInput({ label, defaultValue, handleChange }: any) {
  return (
    <div className=" flex h-10 w-auto">
      <div className="rounded-l-lg bg-[#F2F2F2] text-[#444444] w-[45%] text-start flex justify-center flex-col">
        <label htmlFor={label.toLowerCase()} className="pl-1">
          {label}
        </label>
      </div>
      <div className="w-[70%]">
        <input
          id={label.toLowerCase().replace(" ", "")}
          type="color"
          value={defaultValue}
          onChange={handleChange}
          className="rounded-r-lg bg-white text-black h-full w-full"
        />
      </div>
    </div>
  );
}

function ButtonStyleInput() {
  return (
    <div className="space-y-2 pt-4">
      <label>Button Style</label>
      <div className="flex space-x-4">
        <RadioButton label="Store icon" value="store" />
        <RadioButton label="Round chat icon" value="round" defaultChecked />
      </div>
    </div>
  );
}

function RadioButton({ label, value, defaultChecked = false }: any) {
  return (
    <div className="flex items-center gap-2 bg-white text-[#444444] w-[50%] p-2 h-10 rounded-lg checked:bg-[#D7BBF5]">
      <input
        type="radio"
        id={value}
        name="buttonStyle"
        value={value}
        defaultChecked={defaultChecked}
        className="bg-[#EDE4FF] checked:bg-[#6528F7]"
      />
      <label htmlFor={value} className="w-full">
        {label}
      </label>
    </div>
  );
}
