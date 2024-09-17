// components/signup/NorgaiSetup.tsx
import Image from "next/image";
import { useState } from "react";
import StarChat from "./designlaunch/SpaceChat";
import { FormField } from "./FormField";
import { motion } from "framer-motion";

export function NorgaiSetup({
  subStep,
  formData,
  onInputChange,
  errors,
}: {
  subStep: number;
  formData: any;
  onInputChange: (key: string, value: any) => void;
  errors: Record<string, string>;
}) {
  const [enabled, setEnabled] = useState(formData.norgTagEnabled);
  const [shop, setShop] = useState(formData.storeURL);
  const scriptCode = `<script type="text/javascript" id="your_a_vfPmulI=1_a..."></script>`;
  const [errorMessage, setErrorMessage] = useState("");

  const handleToggle = async () => {
    const newValue = !enabled;
    setEnabled(newValue);
    const shop_val= shop;
    setShop(shop_val);
    onInputChange("norgTagEnabled", newValue);
    try {
      const response = await fetch(`https://117f-2409-40d1-dd-4774-41c2-f2cb-d9db-6866.ngrok-free.app/api/dataSave/toggle-norg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          enabled: newValue,
          scriptCode,
          shop: shop_val,
         }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      // Handle the API response data here if needed
      console.log('API response:', data);
  
    } catch (error) {
      console.error('Error toggling Norg tag:', error);
      // Optionally, update UI or state based on error
    }
  };
  
  const handleInstall = async () => {
    try {
      const res = await fetch(`https://117f-2409-40d1-dd-4774-41c2-f2cb-d9db-6866.ngrok-free.app/api/check-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shop: formData.shopifyStore }), // Send shop data in the body
      });
    
      if (!res.ok) {
        // Handle non-OK responses (errors)
        let errorMessage = "An error occurred.";
    
        // Check if the response content type is JSON
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await res.json();
          errorMessage = errorData.message || "An error occurred.";
        } else {
          // If not JSON, log the raw HTML error response
          const errorText = await res.text();
          console.error("HTML error response:", errorText);
        }
    
        setErrorMessage(errorMessage);
        console.error(`Error: ${errorMessage}`);
        return; // Exit early if there's an error
      }
    
      // If successful, parse the JSON response
      const data = await res.json();
    
      // Successful response
      console.log('Session found, redirecting to install app.');
      window.location.href = `/api/auth/offline?shop=${formData.shopifyStore}.myshopify.com`;
    
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
    

    
  };
  const renderSubStep = () => {
    switch (subStep) {
      case 1:
        return (
          <>
            <h2 className="text-3xl mb-6">Connect your Shopify account:</h2>
            <div className="flex flex-col">
              <div className="flex items-center">
                <FormField
                  id="shopifyStore"
                  placeholder="storename"
                  type="text"
                  value={formData.shopifyStore}
                  onChange={(e) =>
                    onInputChange("shopifyStore", e.target.value)
                  }
                />
                <span className="ml-1">.myshopify.com</span>
              </div>
              {errors.shopifyStore && (
                <p className="text-red-500 text-sm col-span-2">
                  {errors.shopifyStore}
                </p>
              )}
                <button
                  onClick={handleInstall}
                  className="text-white border px-4 p-1 rounded-lg w-fit mt-4"
                >
                  Install App
                </button>
                {errorMessage && (
                  <p className="text-red-500 mt-2">
                    {errorMessage}
                  </p>
                )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-3xl mb-2">Add the Norg tag:</h2>
            <p className="mb-4 italic">
              Add the auto-inject of the Norg tag on your website and use
              tracking to enable our behavioral AI. This will help us predict
              customer drop-off and approach disengaged customers in real-time.
            </p>
            <div className="flex items-center mb-4 py-5">
              <button
                onClick={handleToggle}
                className={`mr-2 bg-white text-[#6528F7] flex gap-2 px-3 py-1 rounded-lg ${
                  enabled ? "bg-green-200" : ""
                }`}
              >
                Turn on
                <Image
                  src={"/signup/ph_power-bold.svg"}
                  alt="power logo"
                  height={18}
                  width={18}
                  className="my-auto"
                />
              </button>
              {enabled && (
                <span className="ml-2 text-green-500 flex items-center">
                  <svg
                    width="99"
                    height="20"
                    viewBox="0 0 99 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="8.5" cy="9.5" r="8.5" fill="#00CB65" />
                    <path
                      d="m4.364 10.211 2.667 2.666 5.332-5.713"
                      stroke="#fff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28.156 16.18a6.7 6.7 0 0 1-2.16-.342 5.5 5.5 0 0 1-1.728-.954 4 4 0 0 1-1.098-1.458q-.162-.306-.018-.576.162-.27.522-.36a.72.72 0 0 1 .54.072q.27.126.396.414.27.504.774.918a4.2 4.2 0 0 0 1.224.63q.72.216 1.548.216.936 0 1.674-.306a2.73 2.73 0 0 0 1.17-.882q.432-.576.432-1.404 0-1.044-.792-1.818-.792-.792-2.52-.99-2.142-.252-3.366-1.314-1.206-1.062-1.206-2.628 0-1.116.612-1.926.612-.828 1.674-1.26 1.062-.45 2.412-.45 1.026 0 1.836.324.81.306 1.404.828a4.9 4.9 0 0 1 1.008 1.17q.216.324.144.63a.65.65 0 0 1-.324.45.83.83 0 0 1-.612.054.84.84 0 0 1-.468-.396 3.5 3.5 0 0 0-.684-.792 2.8 2.8 0 0 0-.972-.594q-.576-.216-1.368-.234-1.386 0-2.268.576t-.882 1.71q0 .576.306 1.098.324.504 1.062.864.756.36 2.052.54 2.232.288 3.348 1.35t1.116 2.79q0 .99-.378 1.746-.36.756-1.026 1.278-.666.504-1.548.774a6.5 6.5 0 0 1-1.836.252m11.77-.072q-1.277 0-2.285-.522a3.93 3.93 0 0 1-1.566-1.566q-.576-1.026-.576-2.52V6.91q0-.324.216-.54a.73.73 0 0 1 .54-.216q.324 0 .54.216a.73.73 0 0 1 .216.54v4.59q0 1.098.414 1.8.414.684 1.116 1.044a3.6 3.6 0 0 0 1.584.342 3.5 3.5 0 0 0 1.53-.324 2.86 2.86 0 0 0 1.08-.9q.396-.576.396-1.314h1.026a4.03 4.03 0 0 1-.594 2.034 4.06 4.06 0 0 1-1.512 1.404 4.35 4.35 0 0 1-2.124.522m3.96-.108a.8.8 0 0 1-.557-.198q-.198-.216-.198-.576V6.91q0-.342.198-.54a.76.76 0 0 1 .558-.216q.342 0 .558.216.216.198.216.54v8.316q0 .36-.216.576a.8.8 0 0 1-.558.198m8.42.09q-1.423 0-2.539-.648a4.9 4.9 0 0 1-1.764-1.8q-.63-1.134-.63-2.556 0-1.44.612-2.574a4.74 4.74 0 0 1 1.692-1.782q1.08-.666 2.484-.666 1.08 0 1.998.432a4.5 4.5 0 0 1 1.62 1.26q.216.252.144.522-.054.252-.324.45a.7.7 0 0 1-.486.108.9.9 0 0 1-.468-.288q-.99-1.116-2.484-1.116-.99 0-1.746.468a3.2 3.2 0 0 0-1.152 1.296q-.414.81-.414 1.89 0 1.044.432 1.872.45.81 1.224 1.296.792.468 1.8.468.684 0 1.224-.18.558-.18.99-.558a.93.93 0 0 1 .504-.216.68.68 0 0 1 .468.144.8.8 0 0 1 .27.486.56.56 0 0 1-.18.486q-1.314 1.206-3.276 1.206m10.74 0q-1.422 0-2.538-.648a4.9 4.9 0 0 1-1.764-1.8q-.63-1.134-.63-2.556 0-1.44.612-2.574a4.74 4.74 0 0 1 1.692-1.782q1.08-.666 2.484-.666 1.08 0 1.998.432a4.5 4.5 0 0 1 1.62 1.26q.216.252.144.522-.054.252-.324.45a.7.7 0 0 1-.486.108.9.9 0 0 1-.468-.288q-.99-1.116-2.484-1.116-.99 0-1.746.468a3.2 3.2 0 0 0-1.152 1.296q-.414.81-.414 1.89 0 1.044.432 1.872.45.81 1.224 1.296.792.468 1.8.468.684 0 1.224-.18.558-.18.99-.558a.93.93 0 0 1 .504-.216.68.68 0 0 1 .468.144.8.8 0 0 1 .27.486.56.56 0 0 1-.18.486q-1.314 1.206-3.276 1.206m10.848 0q-1.476 0-2.61-.63a4.7 4.7 0 0 1-1.782-1.782q-.648-1.134-.648-2.592 0-1.476.612-2.592a4.6 4.6 0 0 1 1.674-1.782q1.08-.648 2.484-.648 1.368 0 2.376.63a4 4 0 0 1 1.566 1.71q.558 1.098.558 2.502a.68.68 0 0 1-.198.504.72.72 0 0 1-.504.18h-7.524v-1.242h7.614l-.774.54q.018-.99-.36-1.782a2.95 2.95 0 0 0-1.08-1.242q-.702-.45-1.674-.45-1.026 0-1.8.468-.756.468-1.17 1.314-.396.828-.396 1.89t.468 1.89a3.4 3.4 0 0 0 1.278 1.296q.828.468 1.89.468.612 0 1.242-.216.648-.216 1.026-.54a.8.8 0 0 1 .486-.162.6.6 0 0 1 .468.144q.27.234.27.504.018.27-.234.468-.594.504-1.512.828a5.3 5.3 0 0 1-1.746.324m10.048 0a6.7 6.7 0 0 1-2.178-.36q-1.044-.378-1.674-1.062a.65.65 0 0 1-.18-.54.73.73 0 0 1 .288-.504q.288-.216.576-.18a.8.8 0 0 1 .504.252q.396.468 1.098.756.702.27 1.548.27 1.242 0 1.818-.414.594-.432.612-1.062 0-.612-.594-1.026-.576-.414-1.98-.648-1.818-.306-2.664-1.026-.828-.72-.828-1.728 0-.918.504-1.53a3.07 3.07 0 0 1 1.314-.918 5.1 5.1 0 0 1 1.782-.306q1.206 0 2.088.414.882.396 1.422 1.08a.7.7 0 0 1 .162.54q-.018.27-.288.432-.234.162-.558.108a.9.9 0 0 1-.522-.288 2.66 2.66 0 0 0-1.026-.702 3.5 3.5 0 0 0-1.314-.234q-.936 0-1.512.378-.576.36-.576.936 0 .396.198.684.216.288.738.522.54.216 1.53.396 1.35.234 2.124.666.792.414 1.116.972.342.558.342 1.242 0 .846-.486 1.494-.468.63-1.332 1.008t-2.052.378m9.72 0a6.7 6.7 0 0 1-2.178-.36q-1.044-.378-1.674-1.062a.65.65 0 0 1-.18-.54.73.73 0 0 1 .288-.504q.288-.216.576-.18a.8.8 0 0 1 .504.252q.396.468 1.098.756.702.27 1.548.27 1.242 0 1.818-.414.594-.432.612-1.062 0-.612-.594-1.026-.576-.414-1.98-.648-1.818-.306-2.664-1.026-.828-.72-.828-1.728 0-.918.504-1.53a3.07 3.07 0 0 1 1.314-.918 5.1 5.1 0 0 1 1.782-.306q1.206 0 2.088.414.882.396 1.422 1.08a.7.7 0 0 1 .162.54q-.018.27-.288.432-.234.162-.558.108a.9.9 0 0 1-.522-.288 2.66 2.66 0 0 0-1.026-.702 3.5 3.5 0 0 0-1.314-.234q-.936 0-1.512.378-.576.36-.576.936 0 .396.198.684.216.288.738.522.54.216 1.53.396 1.35.234 2.124.666.792.414 1.116.972.342.558.342 1.242 0 .846-.486 1.494-.468.63-1.332 1.008t-2.052.378"
                      fill="#00CB65"
                    />
                  </svg>
                </span>
              )}
            </div>
            <p className="mb-4">
              Or inject Norg manually by copying the following code and placing
              it after your {"<body>"} tag:
            </p>
            <div className="bg-white px-2 py-2 rounded-lg flex items-center justify-between w-full mb-4 ">
              <code className="text-sm text-black text-nowrap overflow-x-hidden overflow-ellipsis gett_code">
                {`<script type="text/javascript" id="your_a_vfPmulI=1_a...">`}
              </code>

              <button
                className=" text-[#6528F7] px-3 py-1 rounded border border-[#6528F7]"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `<script type="text/javascript" id="your_a_vfPmulI=1_a...">`
                  )
                }
              >
                Copy
              </button>
            </div>
            <i className="w-[740px] relative text-[12px] leading-[125%] flex font-medium font-inter text-white-text text-left items-center opacity-[0.8]">
              Note: Norg wil not be visible on the website until you choose to
              launch.
            </i>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid md:grid-cols-2 flex-grow w-full place-content-center md:min-h-96">
      <div className="flex flex-col justify-center">{renderSubStep()}</div>
      <div className="flex justify-end">
        {subStep === 1 ? (
          // Placeholder div for case 1
          <div className="w-64 h-64 flex items-center justify-center text-gray-500 gap-3">
            <Image
              src="/signup/technicalnorglogo.svg"
              alt="norg logo"
              width={136}
              height={136}
            />
            <motion.svg
              width={118}
              height={12}
              viewBox="0 0 118 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="cursor-pointer shrink-0"
            >
              <motion.path
                d="M.667 6a5.333 5.333 0 1 0 10.666 0A5.333 5.333 0 0 0 .667 6m117.256 0-10-5.774v11.548zM6 7h4.664V5H6zm13.99 0h9.327V5H19.99zm18.654 0h9.327V5h-9.327zm18.654 0h9.327V5h-9.327zm18.654 0h9.327V5h-9.327zm18.654 0h9.327V5h-9.327zM.666 6a5.333 5.333 0 1 0 10.667 0A5.333 5.333 0 0 0 .667 6m117.257 0-10-5.774v11.548zM6 7h4.664V5H6zm13.99 0h9.327V5H19.99zm18.654 0h9.327V5h-9.327zm18.654 0h9.327V5h-9.327zm18.654 0h9.327V5h-9.327zm18.654 0h9.327V5h-9.327z"
                fill="#EDE4FF"
                strokeDasharray="4 4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </motion.svg>

            <Image
              src="/signup/technicalshopify.svg"
              alt="norg logo"
              width={136}
              height={136}
            />
          </div>
        ) : (
          <StarChat />
        )}
      </div>
    </div>
  );
}
