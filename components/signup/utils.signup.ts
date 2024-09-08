import { ECommercePlatformType, HelpdeskPlatformType } from "./BusinessInformation";

const isBrowser = typeof window !== "undefined";
const EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours in milliseconds

export const errorMessages = {
  eCommercePlatform: "Please select an E-Commerce platform.",
  monthlyVisitors: "Please select a number of monthly visitors.",
  productCategories: "Please select at least one product category.",
  helpdeskPlatform: "Please select a helpdesk platform.",
};

const signupSteps = [
  {
    title: "Account Information",
    subSteps: 2,
    fields: [
      ["firstName", "lastName"],
      ["email", "password"],
    ],
  },
  {
    title: "Business Information",
    subSteps: 7,
    fields: [
      ["storeName", "storeURL", "storeSupportEmail"],
      ["eCommercePlatform"],
      ["monthlyVisitors"],
      ["productCategories"],
      ["brandTone"],
      ["helpdeskPlatform"],
      ["hearAboutUs"],
    ],
  },
  {
    title: "Norgai Setup",
    subSteps: 2,
    fields: [["shopifyStore"], ["norgTagEnabled"]],
  },
  {
    title: "Design and Launch",
    subSteps: 3,
    fields: [[], [], []],
  },
];

const initialStepCallback = () => {
  if (!isBrowser) return 0;
  const storedTimestamp = parseInt(
    localStorage.getItem("signupTimestamp") || "0",
    10
  );
  const currentTime = Date.now();
  if (currentTime - storedTimestamp > EXPIRATION_TIME) {
    clearLocalStorage();
    return 0;
  }
  return parseInt(localStorage.getItem("currentStep") || "0", 10);
};

const initialSubStepCallback = () => {
  if (!isBrowser) return 0;
  return parseInt(localStorage.getItem("currentSubStep") || "1", 10);
};

export type FormDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  storeName: string;
  storeURL: string;
  storeSupportEmail: string;
  eCommercePlatform: ECommercePlatformType | "";
  monthlyVisitors: string;
  productCategories: string[];
  brandTone: string;
  helpdeskPlatform: HelpdeskPlatformType | "";
  hearAboutUs: string;
  shopifyStore: string;
  norgTagEnabled: boolean;
  task_ids: string[];
};

const initialFormDataCallback = (): FormDataType => {
  const emptyFormData: FormDataType = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    storeName: "",
    storeURL: "",
    storeSupportEmail: "",
    eCommercePlatform: "",
    monthlyVisitors: "",
    productCategories: [],
    brandTone: "",
    helpdeskPlatform: "",
    hearAboutUs: "",
    shopifyStore: "",
    norgTagEnabled: false,
    task_ids: [],
  };
  if (!isBrowser) return emptyFormData;
  const savedData = localStorage.getItem("signupFormData");
  return savedData ? JSON.parse(savedData) : emptyFormData;
};

const clearLocalStorage = () => {
  localStorage.removeItem("signupFormData");
  localStorage.removeItem("currentStep");
  localStorage.removeItem("currentSubStep");
  localStorage.removeItem("signupTimestamp");
};

export {
  signupSteps,
  initialStepCallback,
  initialSubStepCallback,
  initialFormDataCallback,
  clearLocalStorage,
};
