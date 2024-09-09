// components/signup/EmailSignup.tsx
import Image from "next/image";
import { useState } from "react";
import SingupHomeSvg from "./SingupHomeSvg";

interface EmailSignupProps {
  onEmailSubmit: (email: string) => void;
}

export const EmailSignup: React.FC<EmailSignupProps> = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <SingupHomeSvg className="mb-6" />
      <h1 className="text-2xl mb-4 font-semibold">
        Let&apos;s start with your email
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto flex flex-col items-center"
      >
        <input
          type="email"
          placeholder="email@yourstore.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 bg-white text-black text-center w-full px-4 py-2 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full max-w-max mx-auto text-indigo bg-white hover:bg-indigo hover:text-white py-2 px-4 rounded-lg font-medium text-sm"
        >
          Get Started
        </button>
      </form>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <a href="#" className="underline font-semibold">
          Sign In
        </a>
      </p>
      <p className="mt-4 text-xs text-center max-w-md text-white/60">
        By clicking on &quot;Get Started&quot;, <br /> I acknowledge and agree
        to the{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>
      </p>
    </div>
  );
};
