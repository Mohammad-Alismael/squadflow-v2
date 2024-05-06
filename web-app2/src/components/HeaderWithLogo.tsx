import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

HeaderWithLogo.propTypes = {};

function HeaderWithLogo() {
  return (
    <div className="p-2 mb-2 flex items-center justify-center gap-2 bg-white rounded-lg">
      <Image src="/squadflow-v2-logo.png" width={60} height={60} alt="logo" />
      <h4 className="text-4xl font-bold">Squadflow</h4>
    </div>
  );
}

export default HeaderWithLogo;
