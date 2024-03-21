"use client";
import { ButtonTypes } from "@/constants/enums";
import React from "react";

interface ButtonProps {
  type: ButtonTypes;
  htmlType?: "button" | "submit" | "reset";
  text?: string;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => any | void;
}

export default function Button({
  type,
  text,
  htmlType = "button",
  className,
  children,
  disabled = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type={htmlType}
      disabled={disabled}
      onClick={() => onClick()}
      className={`btn btn-${type} ${className} ${disabled && "disabled"} `}
    >
      {text || children}
    </button>
  );
}
