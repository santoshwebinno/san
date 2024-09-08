import { CheckIcon } from "lucide-react";
import React from "react";
import { signupSteps } from "./utils.signup";

export const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex justify-between items-center mb-12 relative gap-3">
      {signupSteps.map((step, index) => (
        <React.Fragment key={step.title}>
          <div
            className={`flex items-center space-x-2 ${
              index + 1 > currentStep ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            <div
              className={`rounded-full w-8 h-8 p-1 flex items-center justify-center bg-white text-purple font-bold`}
            >
              {index + 1 < currentStep ? (
                <CheckIcon className="text-green" />
              ) : (
                <span className="text-purple">{index + 1}</span>
              )}
            </div>
            <span className="hidden sm:inline">{step.title}</span>
          </div>
          {index < signupSteps.length - 1 && (
            <div className="flex-grow h-px bg-gray-300 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export const DotsIndicator = ({
  currentStep,
  currentSubStep,
}: {
  currentStep: number;
  currentSubStep: number;
}) => {
  return (
    <div className="flex space-x-2">
      {currentStep > 0
        ? Array.from({
            length: signupSteps[currentStep - 1].subSteps,
          }).map((_, index) => (
            <div
              key={index}
              className={`h-4 rounded-full ${
                index + 1 === currentSubStep
                  ? "w-9 bg-purple-medium"
                  : "bg-white w-4"
              }`}
            ></div>
          ))
        : null}
    </div>
  );
};
