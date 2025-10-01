import React from "react";

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={[
        "rounded-full border-4 border-t-gray-600 px-4 py-3 text-center animate-spin w-10 h-10",
        className,
      ].join(" ")}
    ></div>
  );
};
