// app/signup/page.tsx
"use client";

import {
  initialFormDataCallback,
  initialStepCallback,
  initialSubStepCallback,
} from "@/components/signup/utils.signup";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SignupComponent = dynamic(() => import("@/components/SignupComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <Loader2Icon className="animate-spin" />
    </div>
  ),
});

export default function Page() {
  const [formData, setFormData] = useState(initialFormDataCallback);
  const [currentStep, setCurrentStep] = useState(initialStepCallback);
  const [currentSubStep, setCurrentSubStep] = useState(initialSubStepCallback);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
    localStorage.setItem("currentSubStep", currentSubStep.toString());
    localStorage.setItem("signupTimestamp", Date.now().toString());
  }, [currentStep, currentSubStep]);

  useEffect(() => {
    localStorage.setItem("signupFormData", JSON.stringify(formData));
    localStorage.setItem("signupTimestamp", Date.now().toString());
  }, [formData]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isAuthenticated = urlParams.get("authenticated") === "true";

    if (isAuthenticated) {
      // If authenticated, navigate to the specified step and subStep
      setCurrentStep(3);
      setCurrentSubStep(2);

      const fetchTaskIds = async () => {
        try {
          const response = await fetch("/api/v1/train", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              storeURL: formData.storeURL, // Passing the store URL to the API
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const taskIds = data.task_ids; // Get all task IDs

            // Update the formData with the task_ids
            setFormData((prevData: any) => ({
              ...prevData,
              task_ids: taskIds, // Store all task IDs
            }));

            console.log("Task IDs received and stored:", taskIds);
          } else {
            console.error("Failed to fetch task IDs:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching task IDs:", error);
        }
      };

      // fetchTaskIds();

      // Fetch SupportEmail from Azure B2C
    const fetchSupportEmail = async () => {
      try {
        const response = await fetch("/api/v1/storessupportemail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supportEmail: formData.storeSupportEmail, // Passing the store URL to the API
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const supportEmail = data.supportEmail; // Assume API returns the SupportEmail field
          
          console.log("SupportEmail received and stored:", supportEmail);
        } else {
          console.error("Failed to fetch SupportEmail:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching SupportEmail:", error);
      }
    };

    fetchSupportEmail();

      // Remove 'authenticated' from the URL
      urlParams.delete("authenticated");

      // Construct the new URL
      let newUrl = window.location.pathname;
      const queryString = urlParams.toString();

      if (queryString) {
        newUrl += `?${queryString}`;
      }

      // Use history.replaceState to update the URL without reloading the page
      window.history.replaceState(null, "", newUrl);
    }
  }, []);

  useEffect(() => {
    if (formData.norgTagEnabled) {
      const loadScript = async () => {
        try {
          const response = await fetch(`/api/v1/inserttag`);

          console.log(
            "🚀 ~ file: page.tsx:194 ~ loadScript ~ response:",
            response
          );
        } catch (error) {
          console.error("Failed to load script:", error);
        }
      };

      loadScript();
    }
  }, [formData.norgTagEnabled]);

  return (
    <SignupComponent
      formData={formData}
      setFormData={setFormData}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      currentSubStep={currentSubStep}
      setCurrentSubStep={setCurrentSubStep}
    />
  );
}
