import React from "react";
import PropTypes from "prop-types";
import { PlusCircleIcon } from "lucide-react";

AddItem.propTypes = {};

function AddItem({ title }: { title: string }) {
  return (
    <div className="px-3 py-2 flex flex-row items-center rounded-full bg-[#D0E6D8] text-black gap-2">
      <PlusCircleIcon className="w-6 h-6" />
      <p>{title}</p>
    </div>
  );
}

export default AddItem;
