import Image from "next/image";
import { FormField } from "./FormField";

export function AccountInformation({ subStep, formData, onInputChange, errors }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-4 flex-grow w-full place-content-center md:min-h-96">

      <div className="flex flex-col">
        <h2 className="text-3xl text-white font-semibold mb-6">
          {subStep === 1 ? "Your Name:" : "Your Account:"}
        </h2>
        <div className="space-y-4">
          {subStep === 1 ? (
            <>
              <FormField
                type="text"
                id="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={(e) => onInputChange("firstName", e.target.value)}
                error={errors.firstName}
              />
              <FormField
                id="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => onInputChange("lastName", e.target.value)}
                error={errors.lastName}
              />
            </>
          ) : (
            <>
              <FormField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                error={errors.email}
              />
              <FormField
                id="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => onInputChange("password", e.target.value)}
                error={errors.password}
              />
            </>
          )}
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Image
          src={`/images/signup/step1_${subStep}.svg`}
          alt={`Account Information ${subStep}`}
          width={350}
          height={350}
          className="object-contain"
        />
      </div>
    </div>
  );
}
