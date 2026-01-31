import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export default function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-95";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30",
    outline: "border border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white bg-transparent",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)} 
      {...props} 
    />
  );
}