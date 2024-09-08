import { ExternalLink, Rocket } from "lucide-react";
import Image from 'next/image';
import AccountSetupCard from "./StandaloneAccountSetupCard";
export function LaunchStep() {
  const checkOptions=[
    { text: "Connect Shopify", isCompleted: true },
    { text: "Activate The Norg Tag", isCompleted: true },
    { text: "Design The Look", isCompleted: true },
    { text: "Launch Your AI Brand Concierge", isCompleted: false },
  ]
  return (
    <div className="flex justify-between items-center ">
      <div className="w-2/3">
        <h1 className="text-3xl font-bold mb-4 flex items-center">
          It's time to launch! 🚀
        </h1>
        <p className="mb-4 text-sm">
          You've configured your AI Concierge and now it's ready for the real world.
        </p>
        <p className="mb-4 text-sm">
        From now on, you wil get a weekly analytics report to update you on Rep's effectiveness in rescuing more traffic (CVR) & driving more sales (AOV).
        </p>
        <p className="mb-6 text-sm">
          Click on "Test your AI" to test it on your website. And once you're done testing, hit "Go Live"!
        </p>
        <p className="mb-4 text-sm font-semibold">
          Let the magic begin!
        </p>
        <div className=" flex gap-4">
          <button className="text-white border border-white px-2 rounded-lg h-fit flex items-center  my-auto">
            Test your AI <ExternalLink className="ml-2 h-4 w-4" />
          </button>
          <button className=" text-purple-600  rounded ">
            <Image src={"signup/golivebutton.svg"} alt={"go live button"} width={145} height={53}></Image>
          </button>
        </div>
      </div>
      <div className="w-1/3 mx-auto flex justify-center items-center">
      <AccountSetupCard title={" Set up your account"} checkOptions={checkOptions}/>
      </div>
    </div>
  );
}
