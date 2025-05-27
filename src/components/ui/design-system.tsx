"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Tipografia
export function Heading({ 
  level = 1, 
  children, 
  className,
  ...props 
}: { 
  level?: 1 | 2 | 3 | 4 | 5 | 6; 
  children: React.ReactNode; 
  className?: string;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag = `h${level}` as React.ElementType;
  
  // Classes baseadas no nível do heading
  const sizeClasses = {
    1: "text-4xl font-bold tracking-tight",
    2: "text-3xl font-semibold tracking-tight",
    3: "text-2xl font-semibold",
    4: "text-xl font-medium",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };
  
  return (
    <Tag 
      className={cn(
        sizeClasses[level],
        "text-neutral-900 dark:text-neutral-50",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Texto com tamanhos consistentes
export function Text({ 
  size = "base", 
  children, 
  className,
  ...props 
}: { 
  size?: "xs" | "sm" | "base" | "lg" | "xl"; 
  children: React.ReactNode; 
  className?: string;
} & React.HTMLAttributes<HTMLParagraphElement>) {
  // Classes baseadas no tamanho do texto
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };
  
  return (
    <p 
      className={cn(
        sizeClasses[size],
        "text-neutral-700 dark:text-neutral-300",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// Container com espaçamento consistente
export function Section({ 
  size = "md", 
  children, 
  className,
  ...props 
}: { 
  size?: "sm" | "md" | "lg" | "xl"; 
  children: React.ReactNode; 
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  // Classes baseadas no tamanho da seção
  const sizeClasses = {
    sm: "py-4 gap-4",
    md: "py-6 gap-6",
    lg: "py-8 gap-8",
    xl: "py-12 gap-10",
  };
  
  return (
    <section 
      className={cn(
        "w-full flex flex-col",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

// Paleta de cores consistente
export const colors = {
  primary: "var(--primary)",
  primaryLight: "var(--primary-light)",
  primaryDark: "var(--primary-dark)",
  secondary: "var(--secondary)",
  accent: "var(--accent)",
  background: "var(--background)",
  foreground: "var(--foreground)",
  card: "var(--card)",
  cardForeground: "var(--card-foreground)",
  border: "var(--border)",
  input: "var(--input)",
  success: "var(--green-600)",
  error: "var(--red-600)",
  warning: "var(--yellow-600)",
  info: "var(--blue-600)",
};

// Espaçamento consistente
export const spacing = {
  xs: "0.25rem",   // 4px
  sm: "0.5rem",    // 8px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
  "3xl": "4rem",   // 64px
};

// Bordas consistentes
export const borderRadius = {
  none: "0",
  sm: "0.125rem",  // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem",  // 6px
  lg: "0.5rem",    // 8px
  xl: "0.75rem",   // 12px
  "2xl": "1rem",   // 16px
  full: "9999px",
};

// Sombras consistentes
export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  DEFAULT: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
}; 