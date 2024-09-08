import { HelpCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-900 text-white p-6 w-full m-auto">
      <header className="flex justify-between items-center mb-6">
        <Image
          src="/images/white-logo.svg"
          alt="Norgai Logo"
          width={140}
          height={38}
          className="object-contain"
        />

        <button className="flex items-center p-2 rounded-full bg-transparent hover:bg-white/10 gap-1">
          <HelpCircle className="h-6 w-6" />
          <span className="hidden sm:inline">Help</span>
        </button>
      </header>
      {children}
      <footer className="mt-6 text-xs text-white/60 flex justify-between">
        <span>© 2024 norg.ai</span>
        <div className="space-x-4">
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
        </div>
      </footer>
    </main>
  );
};

export default SignupLayout;
