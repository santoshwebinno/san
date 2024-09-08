import React from 'react'

type CheckOption = {
  text: string;
  isCompleted: boolean;
}

type AccountSetupCardProps = {
  title: string;
  checkOptions: CheckOption[];
}

export default function AccountSetupCard({ 
  title, 
  checkOptions
}: AccountSetupCardProps) {
  return (
    <div className="w-80 rounded-lg overflow-hidden shadow-lg bg-white bg-opacity-80 h-[290px] relative">
      <div className="bg-[#9479FA] text-white p-12  rounded-b-2xl ">
        <h2 className="text-2xl font-semibold text-center">
          {title}
        </h2>
      </div>
      <div className="p-6 bg-white rounded-lg absolute top-24 left-1/2 transform -translate-x-1/2 w-[90%]">
        <ul className="space-y-3">
          {checkOptions.map((option, index) => (
            <li key={index} className="flex items-center space-x-3">
              {option.isCompleted ? (
                <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                </svg>
              )}
              <span className={`text-sm ${option.isCompleted ? 'text-gray-700' : 'text-gray-500'}`}>
                {option.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}