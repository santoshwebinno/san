import Image from "next/image";
import React from "react";
import { FormDataType } from "../utils.signup";

interface InfoBlockProps {
  label: string;
  value?: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="flex flex-col justify-center mt-1 w-full whitespace-nowrap">
      <p className="text-[#A9B1A5] text-xs font-medium leading-5">{label}</p>
      <p className="text-black-text text-xs font-medium leading-5">{value}</p>
    </div>
  );
};

interface Step2CardGraphicProps {
  formData: Partial<FormDataType>;
}

const Step2CardGraphic: React.FC<Step2CardGraphicProps> = ({ formData }) => {
  const {
    storeName,
    storeURL,
    email,
    firstName,
    lastName,
    eCommercePlatform,
    monthlyVisitors,
  } = formData;

  return (
    <section className="flex flex-col rounded-xl bg-white bg-opacity-80 w-full max-w-xs pb-7">
      <div className="flex flex-col justify-center py-10 w-full whitespace-nowrap bg-violet-400 rounded-xl">
        <div className="flex flex-col self-center text-xs font-semibold leading-loose text-violet-600">
          <div className="px-4 flex items-center justify-center text-xl bg-white  w-10 h-10 rounded-[50px]">
            {firstName ? firstName[0].toUpperCase() : "N"}
          </div>
        </div>
        <h1 className="mt-3 text-xl font-bold leading-none text-center text-white">
          {storeName || "Your Store Name"}
        </h1>
      </div>
      <div className="flex z-10 flex-col gap-1 self-center p-4 -mt-6 w-10/12 text-xs leading-loose bg-white rounded-xl shadow-sm">
        <InfoBlock label="Website Address" value={storeURL || "example.com"} />
        <InfoBlock label="Email" value={email || "example@example.com"} />
        <InfoBlock label="Full Name" value={`${firstName} ${lastName}`} />
        <InfoBlock label="Ecommerce" value={eCommercePlatform} />
        <InfoBlock label="Visitors" value={monthlyVisitors} />
        <div className="flex relative items-end justify-center gap-1 mt-5 max-w-full text-stone-300">
          <span className="text-xs font-semibold leading-[19px]">
            Powered by
          </span>
          <svg
            width="55"
            height="15"
            viewBox="0 0 55 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.038 7.472v2.58c0 .9-.226 1.734-.693 2.507a4.58 4.58 0 0 1-2.254 1.914c-.346.14-.706.247-1.1.28-.24.02-.48.073-.72.06-.84-.053-1.633-.267-2.347-.733a4.73 4.73 0 0 1-1.827-2.16c-.246-.574-.34-1.18-.36-1.8-.006-.354.287-.76.587-.814.407-.067.673-.034.94.36.16.24.134.533.16.8.12 1.147.734 1.927 1.76 2.413.587.28 1.207.314 1.807.194a2.84 2.84 0 0 0 1.96-1.394c.3-.506.427-1.053.434-1.633q-.002-.72.007-1.44c0-.04.02-.087-.02-.107-.054-.033-.087.02-.12.047-.42.353-.894.6-1.414.76-.607.193-1.233.293-1.88.22-.674-.08-1.314-.26-1.894-.607a4.76 4.76 0 0 1-1.94-2.187c-.387-.86-.453-1.76-.307-2.653.14-.887.56-1.674 1.187-2.334.534-.567 1.16-1 1.894-1.227.726-.226 1.466-.333 2.247-.18 1.133.22 2.06.74 2.8 1.614q.602.711.873 1.613c.147.487.22.98.214 1.487-.014.8 0 1.6 0 2.407zm-7.614-2.547c-.066 1.64 1.354 3.007 2.987 2.994 1.654-.013 2.974-1.36 2.974-2.967 0-1.733-1.334-3.014-2.994-3.02-1.6 0-3.013 1.3-2.967 2.993m18.931 1.847v1.854c0 .487-.18.753-.586.893a.796.796 0 0 1-.967-.426c-.06-.134-.114-.267-.1-.42.007-.134-.034-.174-.154-.08-.413.333-.88.58-1.38.733-.653.2-1.32.293-2.013.193a4.65 4.65 0 0 1-3.52-2.42 4.6 4.6 0 0 1-.534-2.673 4.5 4.5 0 0 1 .694-1.967c.413-.647.946-1.18 1.62-1.554.96-.527 1.967-.767 3.08-.553 1.22.226 2.187.833 2.94 1.8a4.5 4.5 0 0 1 .86 1.98c.067.394.067.807.06 1.22-.006.474 0 .947 0 1.42m-1.66-1.826a2.956 2.956 0 0 0-2.967-3.02c-1.707 0-2.993 1.306-3.013 2.966a2.957 2.957 0 0 0 2.98 3.014c1.687.013 3.014-1.347 3-2.967zM20.04 4.832c.014 2.58-2.106 4.654-4.633 4.66-2.54 0-4.654-2.086-4.64-4.64a4.637 4.637 0 0 1 4.68-4.647c2.454.02 4.56 1.967 4.594 4.627m-4.64-2.96c-1.633-.054-2.993 1.367-2.986 3 .013 1.62 1.353 3.02 3.066 2.967 1.634-.047 2.927-1.327 2.92-3 0-1.627-1.28-2.994-3.006-2.967zM9.986 6.479v2.14c0 .367-.166.64-.5.807-.52.253-1.08-.16-1.127-.6-.013-.147-.026-.287-.026-.434 0-1.173.02-2.353 0-3.527-.02-1.206-.567-2.127-1.647-2.693-.693-.36-1.433-.394-2.18-.187-.927.253-1.547.853-1.934 1.714-.166.38-.233.793-.233 1.206-.007 1.227 0 2.46 0 3.687 0 .354-.113.634-.447.814-.5.273-1.167-.094-1.173-.667-.007-.627 0-1.247 0-1.873 0-.707-.007-1.42 0-2.127.013-1.354.567-2.46 1.553-3.36A4.55 4.55 0 0 1 4.7.251c.247-.034.494-.08.74-.06.84.06 1.634.273 2.354.733a4.7 4.7 0 0 1 1.84 2.18c.14.327.22.667.287 1.02.146.84.026 1.68.073 2.367zm12.421.247c0 .66-.013 1.313 0 1.973.014.367-.353.714-.66.787-.353.08-.753-.153-.9-.487a1.2 1.2 0 0 1-.1-.533c0-1.187-.013-2.38 0-3.567.02-1.314.487-2.46 1.427-3.387a4.4 4.4 0 0 1 1.66-1.027c.507-.173 1-.3 1.527-.3 1.113 0 2.107.347 2.973 1.053.78.64 1.307 1.44 1.574 2.414.087.313.107.633.153.947.067.493-.173.84-.566 1.013-.38.167-.914-.126-1.027-.54-.053-.187-.067-.373-.087-.567-.1-1.066-.647-1.846-1.58-2.333-1.493-.774-3.387-.167-4.087 1.407a3.3 3.3 0 0 0-.293 1.333v1.814zm31.875-.607c0 .846-.013 1.693 0 2.54.013.467-.393.787-.767.827-.393.04-.773-.287-.84-.7a1 1 0 0 1-.02-.194v-4.9c0-.334.1-.6.4-.78a.78.78 0 0 1 .774-.034c.266.127.446.347.446.667v2.58zm.001-4.98c0 .473-.333.793-.813.793s-.807-.333-.807-.8c0-.527.414-.82.82-.84.434-.027.794.386.794.853zm-11.88 7.474a.794.794 0 0 1-.82.8c-.514-.014-.8-.4-.827-.814-.027-.407.447-.86.847-.833.413.033.806.36.8.847"
              fill="#BDBDBD"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Step2CardGraphic;
