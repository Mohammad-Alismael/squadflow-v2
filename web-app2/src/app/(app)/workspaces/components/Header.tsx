import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <div className="w-full flex flex-row items-center justify-between">
      <h3>all workspaces</h3>
      <Button className="capitalize bg-green-800">create workspace</Button>
    </div>
  );
}

export default Header;
