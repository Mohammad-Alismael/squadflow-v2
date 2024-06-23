import React from "react";

function Label({ text }: { text: string }) {
  return (
    <div className="h-8 sflex justify-center items-center px-3 border-2 border-green-800 rounded-full">
      <span className="text-green-800 text-sm">{text}</span>
    </div>
  );
}

export default Label;
