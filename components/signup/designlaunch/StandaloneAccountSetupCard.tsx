import React from "react";

type CheckOption = {
  text: string;
  isCompleted: boolean;
};

type AccountSetupCardProps = {
  title: string;
  checkOptions: CheckOption[];
};

export default function AccountSetupCard({
  title,
  checkOptions,
}: AccountSetupCardProps) {
  return (
    <div className="w-80 rounded-lg overflow-hidden shadow-lg bg-white bg-opacity-80 h- relative">
      <div className="bg-[#9479FA] text-white p-12  rounded-b-2xl ">
        <h2 className="text-2xl font-semibold text-center">{title}</h2>
      </div>
      <div className="p-6 bg-white rounded-lg relative -top-6 left-1/2 transform -translate-x-1/2 w-[90%]">
        <ul className="space-y-3 whitespace-nowrap relative">
          {checkOptions.map((option, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="relative">
                {index < checkOptions.length - 1 && (
                  <div className="absolute top-8 left-4 w-0.5 h-10 border-l-2 border-dashed border-purple-lightest"></div>
                )}
                {option.isCompleted ? (
                  <svg
                    width={32}
                    height={33}
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx={15.885} cy={16.424} r={15.885} fill="#F7F7F7" />
                    <path
                      d="m8.158 17.753 4.982 4.983 9.966-10.677"
                      stroke="#00CB65"
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="32"
                    height="33"
                    viewBox="0 0 32 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="15.885" cy="16.193" r="15.885" fill="#F7F7F7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm ${
                  option.isCompleted ? "text-black-text/70" : "text-black-1E"
                }`}
              >
                {option.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
