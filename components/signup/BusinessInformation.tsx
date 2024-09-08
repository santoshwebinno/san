import Image from "next/image";
import { FormField } from "./FormField";
import { cn } from "@/lib/utils";
import Step2CardGraphic from "./step2/Step2CardGraphic";
import ECommerceSvg from "./step2/ECommerceSvg";
import { FormDataType } from "./utils.signup";

const eCommercePlatforms = [
  "Shopify",
  "Magento",
  "WooCommerce",
  "BigCommerce",
  "Salesforce Commerce",
  "Other",
] as const;

const visitorRanges = [
  "Below 10,000",
  "10,000 - 25,000",
  "25,000 - 50,000",
  "50,000 - 100,000",
  "100,000 - 200,000",
  "Above 200,000",
];

const productCategories = [
  "💎 Jewelry",
  "💊 Medical & Rx",
  "🖥️ Electronics",
  "🚗 Auto",
  "🍼 Baby Products",
  "👕 Apparel",
  "🕹️ Games & Media",
  "⚽ Outdoor Sports",
  "🐕 Products for Pets",
  "🎨 Arts & Crafts",
  "💅 Beauty & Skincare",
  "🌸 Health & Wellness",
  "🏡 Home & Garden",
  "🔫 Toys",
  "🍔 Food & Grocery",
  "📕 Books",
  "Other",
];

const helpdeskPlatforms = [
  "Zendesk",
  "Gorgias",
  "Help Scout",
  "Richpanel",
  "Freshdesk",
  "No",
  "Other",
] as const;

export type HelpdeskPlatformType = (typeof helpdeskPlatforms)[number];
export type ECommercePlatformType = (typeof eCommercePlatforms)[number];

export function BusinessInformation({
  subStep,
  formData,
  onInputChange,
  errors,
}: {
  subStep: number;
  formData: any;
  onInputChange: (name: string, value: string | string[] | boolean) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-4 flex-grow w-full place-content-center md:min-h-96">
      <div
        className={cn("w-full", {
          "md:col-span-2 max-w-screen-sm": subStep === 4 || subStep === 5,
        })}
      >
        {renderSubStep(subStep, formData, onInputChange, errors)}
      </div>
      <div className="flex justify-end items-center">
        {renderStepGraphic(subStep, formData)}
      </div>
    </div>
  );
}

const renderSubStep = (
  subStep: number,
  formData: any,
  onInputChange: (name: string, value: string | string[] | boolean) => void,
  errors: Record<string, string>
) => {
  switch (subStep) {
    case 1:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-6">Your store information:</h2>
          <div className="space-y-4">
            <FormField
              id="storeName"
              label="Store Name"
              value={formData.storeName}
              onChange={(e) => onInputChange("storeName", e.target.value)}
              error={errors.storeName}
            />
            <FormField
              id="storeURL"
              label="Store URL"
              value={formData.storeURL}
              onChange={(e) => onInputChange("storeURL", e.target.value)}
              error={errors.storeURL}
            />
            <FormField
              id="storeSupportEmail"
              label="Store Support Email"
              type="email"
              note="We need it in case the AI doesn't know how to answer."
              value={formData.storeSupportEmail}
              onChange={(e) =>
                onInputChange("storeSupportEmail", e.target.value)
              }
              error={errors.storeSupportEmail}
            />
          </div>
        </div>
      );
    case 2:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-6">Your E-Commerce platform:</h2>
          <div className="grid grid-cols-2 gap-4">
            {eCommercePlatforms.map((platform) => (
              <FormField
                key={platform}
                id={platform}
                label={platform}
                value={formData.eCommercePlatform === platform}
                onChange={(e) =>
                  onInputChange(
                    "eCommercePlatform",
                    (e.target as HTMLInputElement).checked ? platform : ""
                  )
                }
                icon={
                  platform === "Other" ? null : (
                    <Image
                      src={`/images/signup/step2/${platform}.png`}
                      alt={platform}
                      className="object-contain"
                      width={20}
                      height={20}
                    />
                  )
                }
                type="checkbox"
              />
            ))}
            {errors.eCommercePlatform && (
              <p className="text-red-500 text-sm col-span-2">
                {errors.eCommercePlatform}
              </p>
            )}
          </div>
        </div>
      );
    case 3:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-6">
            Your monthly website visitors:
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {visitorRanges.map((range) => (
              <FormField
                key={range}
                id={range}
                label={range}
                value={formData.monthlyVisitors === range}
                onChange={(e) =>
                  onInputChange(
                    "monthlyVisitors",
                    (e.target as HTMLInputElement).checked ? range : ""
                  )
                }
                type="checkbox"
              />
            ))}
            {errors.monthlyVisitors && (
              <p className="text-red-500 text-sm col-span-2">
                {errors.monthlyVisitors}
              </p>
            )}
          </div>
        </div>
      );
    case 4:
      return (
        <div>
          <h2 className="text-3xl font-bold mb-6">
            What kind of products do you sell?
          </h2>
          <div className="flex flex-wrap gap-3">
            {productCategories.map((category) => (
              <FormField
                id={category}
                label={category}
                value={formData.productCategories.includes(category)}
                onChange={(e) => {
                  const updatedCategories = (e.target as HTMLInputElement)
                    .checked
                    ? [...formData.productCategories, category]
                    : formData.productCategories.filter(
                        (c: string) => c !== category
                      );
                  onInputChange("productCategories", updatedCategories);
                }}
                type="checkbox"
                checkboxVariant="pill"
                key={category}
              />
            ))}
            {errors.productCategories && (
              <p className="text-red-500 text-sm col-span-2">
                {errors.productCategories}
              </p>
            )}
          </div>
        </div>
      );
    case 5:
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl leading-[55px] mb-1 font-bold">
              Describe your brand&apos;s tone of voice:
            </h2>
            <p className="text-sm italic text-white/60 mb-4">
              Describe your brand&apos;s tone of voice (optional). Use up to 4
              traits to instruct how your AI will sound like.
            </p>
            <FormField
              id="brandTone"
              value={formData.brandTone}
              onChange={(e) => onInputChange("brandTone", e.target.value)}
              type="textarea"
              placeholder="Friendly, down to earth, but trustworthy"
              error={errors.brandTone}
            />
          </div>
        </div>
      );
    case 6:
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Are you using any helpdesk platforms?
            </h2>
            <p className="text-sm italic text-white/60 mb-4">
              Connect Norg to your CRM so the AI could transfer the conversation
              to a live human agent when needed.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {helpdeskPlatforms.map((platform) => (
                <FormField
                  key={platform}
                  id={platform}
                  label={platform}
                  value={formData.helpdeskPlatform === platform}
                  onChange={(e) =>
                    onInputChange(
                      "helpdeskPlatform",
                      (e.target as HTMLInputElement).checked ? platform : ""
                    )
                  }
                  icon={
                    ["No", "Other"].includes(platform) ? null : (
                      <Image
                        src={`/images/signup/step2/${platform}.png`}
                        alt={platform}
                        width={20}
                        height={20}
                      />
                    )
                  }
                  type="checkbox"
                />
              ))}
              {errors.helpdeskPlatform && (
                <p className="text-red-500 text-sm col-span-2">
                  {errors.helpdeskPlatform}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    case 7:
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 leading-[55px]">
              How did you hear about us?
            </h2>
            <FormField
              id="hearAboutUs"
              value={formData.hearAboutUs}
              onChange={(e) => onInputChange("hearAboutUs", e.target.value)}
              error={errors.hearAboutUs}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
};

const renderStepGraphic = (subStep: number, formData: FormDataType) => {
  if (subStep === 2) {
    return <ECommerceSvg className="overflow-visible" selectedValue={formData.eCommercePlatform} />;
  }
  if (subStep === 6) {
    return (
      <Image
        src={`/images/signup/step2_${subStep}.svg`}
        alt={`Business Information ${subStep}`}
        width={350}
        height={350}
        className="object-contain"
      />
    );
  }

  if (subStep === 4 || subStep === 5) {
    return null;
  }

  const graphicFormData = {
    ...formData,
    eCommercePlatform:
      subStep === 1
        ? ""
        : formData?.eCommercePlatform || "Your E-Commerce Platform",
    monthlyVisitors:
      subStep === 1 || subStep === 3
        ? ""
        : formData?.monthlyVisitors || "Below 10,000",
  };

  return <Step2CardGraphic formData={graphicFormData} key={subStep} />;
};
