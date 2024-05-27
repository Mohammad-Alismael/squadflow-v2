"use client";
import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

SubmitButton.propTypes = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className=" w-1/2 bg-green-600 capitalize"
      disabled={pending}
    >
      {!pending ? "join community" : "loading..."}
    </Button>
  );
}

export default SubmitButton;
