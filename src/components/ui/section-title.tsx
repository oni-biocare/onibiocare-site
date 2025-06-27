import { cn } from "@/lib/utils";
import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionTitle({ 
  children, 
  className 
}: SectionTitleProps) {
  return (
    <h2 className={cn("text-3xl md:text-4xl font-bold", className)}>
      {children}
    </h2>
  );
} 