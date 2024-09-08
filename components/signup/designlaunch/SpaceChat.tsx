"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  rotation: number;
}

interface Message {
  id: number;
  align: "left" | "right";
  zIndex: number;
}

export default function StarChat() {
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 10 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      rotation: Math.random() * 360,
    }))
  );
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages];
        if (newMessages.length >= 2) {
          newMessages.shift();
        }

        const alignment =
          newMessages?.[newMessages.length - 1]?.align === "left"
            ? "right"
            : "left";

        newMessages.push({
          id: Date.now(),
          align: alignment,
          zIndex: newMessages.length,
        });

        return newMessages;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const messageVariants = {
    initial: { opacity: 0, y: 30, scale: 0.75 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.9 },
  };

  return (
    <div className="relative h-[400px] max-w-sm w-full overflow-hidden flex flex-col items-center justify-center">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute text-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: `rotate(${star.rotation}deg)`,
          }}
          animate={{
            y: ["0%", "100%"],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: Math.random() * 30 + 40, // Longer duration for extra smoothness
            repeat: Infinity,
            ease: "easeInOut", // Smooth ease for natural movement
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width={star.size}
            height={star.size}
          >
            <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.798 1.42 8.307L12 18.896l-7.419 4.378 1.42-8.307-6.001-5.798 8.332-1.151z" />
          </svg>
        </motion.div>
      ))}

      <div className="w-full max-w-xs flex flex-col items-center justify-center">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              className="w-full flex relative"
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1], // Custom easing for smoother transition
              }}
              style={{
                justifyContent:
                  message.align === "left" ? "flex-start" : "flex-end",
                marginTop: index !== 0 ? "-15px" : "0", // Add slight overlap with more margin
                zIndex: message.zIndex,
              }}
            >
              <div
                className={`${
                  message.align === "left" ? "bg-[#9479FA]" : "bg-indigo-600"
                } text-white p-4 rounded-2xl flex`}
                style={{ width: `70%` }}
              >
                {message.align === "left" && (
                  <div className="flex-shrink-0 bg-white rounded-full w-4 h-4 mr-2"></div>
                )}
                <div className="flex flex-col justify-center w-full">
                  <div
                    className={`${
                      message.align === "left"
                        ? "bg-indigo-600"
                        : "bg-[#9479FA]"
                    } h-1 bg-white rounded animate-pulse mb-1 ${
                      message.align === "left"
                        ? "self-start w-1/2"
                        : "self-end w-1/2"
                    }`}
                  ></div>
                  <div className="h-1 bg-white bg-opacity-30 rounded animate-pulse w-full"></div>
                </div>
                {message.align !== "left" && (
                  <div className="flex-shrink-0 bg-white rounded-full w-4 h-4 ml-2"></div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
