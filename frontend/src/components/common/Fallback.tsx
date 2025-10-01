import React from "react";

export const Fallback = () => {
  return (
    <div className="w-full h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="256"
        height="256"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-popcorn-icon lucide-popcorn sm:w-36 sm:h-36 lg:w-40 lg:h-40 w-20 h-20"
      >
        <path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" />
        <path d="M10 22 9 8" />
        <path d="m14 22 1-14" />
        <path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z" />
      </svg>
      <div className="text-2xl font-bold inline-block">
        Loading<span className="animate-caret-blink text-4xl">.</span>
        <span className="animate-caret-blink delay-150 text-4xl">.</span>
        <span className="animate-caret-blink delay-300 text-4xl">.</span>
      </div>
    </div>
  );
};
