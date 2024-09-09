import {
  ECommercePlatformType,
  HelpdeskPlatformType,
} from "./BusinessInformation";

const isBrowser = typeof window !== "undefined";
const EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours in milliseconds


const signupSteps = [
  {
    title: "Account Information",
    subSteps: 1,
    fields: [
      [
        {
          name: "firstName",
          required: true,
          errorMessage: "First name is required.",
        },
        {
          name: "lastName",
          required: true,
          errorMessage: "Last name is required.",
        },
      ],
      // [
      //   {
      //     name: "email",
      //     required: true,
      //     errorMessage: "Email is required.",
      //   },
      //   {
      //     name: "password",
      //     required: true,
      //     errorMessage: "Password is required.",
      //   },
      // ],
    ],
  },
  {
    title: "Business Information",
    subSteps: 7,
    fields: [
      [
        {
          name: "storeName",
          required: true,
          errorMessage: "Store name is required.",
        },
        {
          name: "storeURL",
          required: true,
          errorMessage: "Store URL is required.",
        },
        {
          name: "storeSupportEmail",
          required: true,
          errorMessage: "Store support email is required.",
        },
      ],
      [
        {
          name: "eCommercePlatform",
          required: true,
          errorMessage: "Please select an E-Commerce platform.",
        },
      ],
      [
        {
          name: "monthlyVisitors",
          required: true,
          errorMessage: "Please select a number of monthly visitors.",
        },
      ],
      [
        {
          name: "productCategories",
          required: false,
          errorMessage: "Please select at least one product category.",
        },
      ],
      [
        {
          name: "brandTone",
          required: false,
          errorMessage: "Brand tone is required.",
        },
      ],
      [
        {
          name: "helpdeskPlatform",
          required: true,
          errorMessage: "Please select a helpdesk platform.",
        },
      ],
      [
        {
          name: "hearAboutUs",
          required: false,
          errorMessage: "Please tell us how you heard about us.",
        },
      ],
    ],
  },
  {
    title: "Norgai Setup",
    subSteps: 2,
    fields: [
      [
        {
          name: "shopifyStore",
          required: true,
          errorMessage: "Shopify store information is required.",
        },
      ],
      [
        {
          name: "norgTagEnabled",
          required: false,
          errorMessage: "Please indicate if Norg tag is enabled.",
        },
      ],
    ],
  },
  {
    title: "Design and Launch",
    subSteps: 3,
    fields: [[], [], []],
  },
];

export const isEmpty = (value: any) => {
  if (typeof value === "string") {
    return !value || value.trim() === "";
  } else if (Array.isArray(value)) {
    return value.length === 0;
  }
  return !value;
};

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
