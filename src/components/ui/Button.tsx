import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
}

export default function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 text-sm uppercase tracking-wide";
  
  const variants = {
    primary: "bg-lime-400 hover:bg-lime-300 text-black shadow-[0_0_20px_-5px_rgba(163,230,53,0.5)] hover:shadow-[0_0_30px_-5px_rgba(163,230,53,0.7)]",
    outline: "border border-white/20 hover:border-lime-300 text-white/80 hover:text-lime-300 bg-transparent backdrop-blur-sm",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)} 
      {...props} 
    />
  );
}