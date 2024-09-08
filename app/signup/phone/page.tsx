'use client';
import { useState } from 'react';

export default function CustomChatPage() {
  const [chatMessage, setChatMessage] = useState('Hello, this is a chat message!');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  const handleChatMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextColor(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-4">
      <div className="w-1/2 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Customize Chat Interface</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Chat Message
            </label>
            <input
              type="text"
              value={chatMessage}
              onChange={handleChatMessageChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Background Color
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={handleBackgroundColorChange}
              className="mt-1 block w-full h-10 p-1 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Text Color
            </label>
            <input
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
              className="mt-1 block w-full h-10 p-1 rounded-md"
            />
          </div>
        </form>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        {/* Phone Mockup */}
        <div className="relative w-80 h-[500px] bg-black rounded-[2rem] border-8 border-gray-300 shadow-2xl">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-5 bg-black rounded-b-lg"></div>
          
          {/* Phone Screen */}
          <div
            className="absolute inset-0 m-4 bg-white rounded-[1.5rem] overflow-hidden"
            style={{ backgroundColor: backgroundColor, color: textColor }}
          >
            <div className="flex flex-col h-full justify-center items-center p-4">
              <div className="w-full bg-white p-2 rounded-lg shadow-lg">
                <p className="text-sm">{chatMessage}</p>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-200">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
