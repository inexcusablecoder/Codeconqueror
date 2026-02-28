import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

export const Card = ({ className, children }: CardProps) => (
  <div className={cn("bg-[#151619] border border-[#141414] rounded-xl overflow-hidden", className)}>
    {children}
  </div>
);
