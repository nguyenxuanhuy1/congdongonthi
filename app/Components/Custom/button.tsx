"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export default function ButtonCustom({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx("btn-custom", className)}
      {...props}
    >
      {children}
    </button>
  );
}
