import { AccountInformation } from "./AccountInformation";
import { BusinessInformation } from "./BusinessInformation";
import { NorgaiSetup } from "./NorgaiSetup";
import { DesignAndLaunch } from "./DesignSetup";

export function SignupSteps({
  currentStep,
  currentSubStep,
  formData,
  onInputChange,
  onComplete,
  errors,
}: {
  currentStep: number;
  currentSubStep: number;
  formData: any;
  onInputChange: (name: string, value: string | string[] | boolean) => void;
  onComplete: () => void;
  errors: Record<string, string>;
}) {
  switch (currentStep) {
    case 1:
      return (
        <AccountInformation
          subStep={currentSubStep}
          formData={formData}
          onInputChange={onInputChange}
          errors={errors}
        />
      );
    case 2:
      return (
        <BusinessInformation
          subStep={currentSubStep}
          formData={formData}
          onInputChange={onInputChange}
          errors={errors}
        />
      );
    case 3:
      return (
        <NorgaiSetup
          subStep={currentSubStep}
          formData={formData}
          onInputChange={onInputChange}
          errors={errors}
        />
      );
    case 4:
      return (
        <DesignAndLaunch
          subStep={currentSubStep}
          formData={formData}
          onComplete={onComplete}
          errors={errors}
        />
      );
    default:
      return null;
  }
}
