import React from "react";
import Image from "next/image";
import logo from "../../../../../../../public/processing.gif";

Loading.propTypes = {};

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <Image src={logo} width={500} height={500} alt="processing" />
      </div>
    </div>
  );
}

export default Loading;
