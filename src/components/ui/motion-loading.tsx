"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Spinner de carregamento circular
export function SpinnerLoading({ 
  className, 
  size = "md",
  color = "primary"
}: { 
  className?: string; 
  size?: "sm" | "md" | "lg"; 
  color?: "primary" | "secondary" | "accent" | "neutral"
}) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };
  
  const colorClasses = {
    primary: "border-primary border-t-transparent",
    secondary: "border-secondary border-t-transparent",
    accent: "border-blue-500 border-t-transparent",
    neutral: "border-neutral-300 dark:border-neutral-600 border-t-transparent"
  };

  return (
    <motion.div 
      className={cn(
        "rounded-full animate-spin",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      animate={{ 
        rotate: 360 
      }}
      transition={{ 
        duration: 1,
        ease: "linear",
        repeat: Infinity
      }}
    />
  )
}

// Barra de progresso indeterminada
export function ProgressLoading({ 
  className,
  height = "md",
  color = "primary" 
}: { 
  className?: string;
  height?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "neutral"
}) {
  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };
  
  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-500",
    neutral: "bg-neutral-300 dark:bg-neutral-600"
  };
  
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800", heightClasses[height], className)}>
      <motion.div
        className={cn("h-full rounded-full", colorClasses[color])}
        initial={{ width: "0%", x: "-100%" }}
        animate={{
          width: "50%",
          x: ["-100%", "200%"]
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />
    </div>
  )
}

// Três pontos pulsando
export function DotsLoading({
  className,
  size = "md",
  color = "primary"
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "neutral"
}) {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-3.5 h-3.5"
  };
  
  const spacingClasses = {
    sm: "gap-1",
    md: "gap-1.5",
    lg: "gap-2"
  };
  
  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-500",
    neutral: "bg-neutral-300 dark:bg-neutral-600"
  };
  
  const dotVariants = {
    initial: { scale: 0.8, opacity: 0.4 },
    animate: { scale: 1, opacity: 1 }
  };
  
  const dotTransition = (delay: number) => ({
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
    delay: delay * 0.2
  });

  return (
    <div className={cn("flex", spacingClasses[size], className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={cn(
            "rounded-full",
            sizeClasses[size],
            colorClasses[color]
          )}
          initial="initial"
          animate="animate"
          variants={dotVariants}
          transition={dotTransition(i)}
        />
      ))}
    </div>
  )
}

// Pulse loading
export function PulseLoading({
  className,
  size = "md",
  color = "primary"
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "neutral"
}) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };
  
  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-blue-500",
    neutral: "bg-neutral-300 dark:bg-neutral-600"
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full opacity-75",
          colorClasses[color]
        )}
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
      <motion.div 
        className={cn(
          "absolute inset-0 rounded-full",
          colorClasses[color]
        )}
        animate={{ 
          scale: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

// Container para centralizar componentes de loading
export function LoadingContainer({
  children,
  fullScreen = false,
  className
}: {
  children: React.ReactNode;
  fullScreen?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      fullScreen ? "fixed inset-0 bg-white/80 dark:bg-black/80 z-50" : "py-8",
      className
    )}>
      {children}
      
      {/* Texto de carregamento opcional */}
      <motion.p 
        className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Carregando...
      </motion.p>
    </div>
  )
} 