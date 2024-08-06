import React from "react";
import Image from "next/image";
import logo from "../../public/squadflow-v2-logo.png";

HeaderWithLogo.propTypes = {};

function HeaderWithLogo() {
  return (
    <div className="p-2 mb-2 flex items-center justify-center gap-2 bg-white rounded-lg">
      <Image src={logo} width={60} height={60} alt="logo" />
      <h4 className="text-4xl font-bold">Squadflow</h4>
    </div>
  );
}

export default HeaderWithLogo;
