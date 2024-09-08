// app/signup/page.tsx
"use client";

import { EmailSignup } from "@/components/signup/EmailSignup";
import { SignupSteps } from "@/components/signup/SignupSteps";
import {
  DotsIndicator,
  StepIndicator,
} from "@/components/signup/StepIndicator";
import {
  clearLocalStorage,
  errorMessages,
  signupSteps,
} from "@/components/signup/utils.signup";
import { Dispatch, SetStateAction, useState } from "react";

const SignupComponent = ({
  formData,
  setFormData,
  currentStep,
  setCurrentStep,
  currentSubStep,
  setCurrentSubStep,
}: {
  formData: any;
  setFormData: (data: any) => void;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentSubStep: number;
  setCurrentSubStep: Dispatch<SetStateAction<number>>;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: any) => {
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
    console.log(`Updated form data: ${JSON.stringify({ [name]: value })}`);
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validateCurrentStep = () => {
    const currentStepConfig = signupSteps[currentStep - 1];
    const fieldsToValidate = currentStepConfig.fields[currentSubStep - 1];
    const newErrors: Record<string, string> = {};
    let isValid = true;

    for (const field of fieldsToValidate) {
      if (
        !formData[field] ||
        (typeof formData[field] === "string" &&
          formData[field].trim() === "") ||
        (Array.isArray(formData[field]) && formData[field].length === 0)
      ) {
        newErrors[field] =
          errorMessages[field as keyof typeof errorMessages] ||
          `Please fill in the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    const currentStepConfig = signupSteps[currentStep - 1];
    if (currentSubStep < currentStepConfig.subSteps) {
      setCurrentSubStep((prev) => prev + 1);
    } else if (currentStep < signupSteps.length) {
      setCurrentStep((prev) => prev + 1);
      setCurrentSubStep(1);
    } else {
      clearLocalStorage(); // router.push("/main");
    }
    setErrors({});
  };

  const handleBack = () => {
    if (currentStep === 0 && currentSubStep === 1) {
      return;
    }

    if (currentSubStep > 1) {
      setCurrentSubStep((prev) => prev - 1);
    } else if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      const prevStepConfig = signupSteps[currentStep - 2];
      setCurrentSubStep(prevStepConfig.subSteps || 1);
    }
    setErrors({});
  };

  const handleEmailSubmit = (email: string) => {
    setFormData((prevData: any) => ({ ...prevData, email }));
    setCurrentStep(1); // Move to the first step
  };
  if (currentStep === 0) {
    return (
      <div className="max-w-screen-lg mx-auto flex flex-col min-h-[calc(100vh-10rem)]">
        <EmailSignup onEmailSubmit={handleEmailSubmit} />
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto flex flex-col min-h-[calc(100vh-10rem)]">
      <StepIndicator currentStep={currentStep} />
      <div className="flex flex-col justify-center">
        <SignupSteps
          currentStep={currentStep}
          currentSubStep={currentSubStep}
          formData={formData}
          onInputChange={handleInputChange}
          onComplete={handleNext}
          errors={errors}
        />
        <div className="my-12 flex justify-between items-center">
          <DotsIndicator
            currentStep={currentStep}
            currentSubStep={currentSubStep}
          />
          <div className="space-x-4">
            {currentStep === signupSteps.length &&
            currentSubStep === signupSteps[signupSteps.length - 1].subSteps ? (
              <a
                href="/main"
                className="px-4  border h-fit text-white rounded-md"
              >
                Return to Dashboard and Do It Later
              </a>
            ) : (
              <>
                {(currentStep > 1 || currentSubStep > 1) && (
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 border border-white/30 rounded-lg"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-4 py-2 bg-white text-indigo hover:bg-white/90 rounded-lg"
                >
                  Next
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
