"use client";
import { ButtonTypes } from "@/constants/enums";
import React from "react";

interface ButtonProps {
  type: ButtonTypes;
  htmlType?: "button" | "submit" | "reset";
  text?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => any | void;
}

export default function Button({
  type,
  text,
  htmlType = "button",
  className,
  children,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type={htmlType}
      onClick={() => onClick()}
      className={`btn btn-${type} ${className}`}
    >
      {text || children}
    </button>
  );
}
