"use client"

import * as React from "react"
import { motion, MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

// Interface para componente envolvendo elemento
interface MotionHoverProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  type?: "primary" | "secondary" | "subtle" | "scale" | "lift" | "glow";
  intensity?: "sm" | "md" | "lg";
}

// Componente com animações para hover/click
export function MotionHover({
  children,
  className,
  asChild = false,
  type = "scale",
  intensity = "md",
  ...props
}: MotionHoverProps) {
  // Mapear intensidades para valores
  const intensityValues = {
    sm: {
      scale: 1.02,
      y: -2,
      shadow: "0px 2px 4px rgba(0,0,0,0.1)"
    },
    md: {
      scale: 1.05,
      y: -3,
      shadow: "0px 4px 8px rgba(0,0,0,0.15)"
    },
    lg: {
      scale: 1.08,
      y: -5,
      shadow: "0px 6px 12px rgba(0,0,0,0.2)"
    }
  };
  
  // Configurar variantes com base no tipo
  const variants = {
    primary: {
      rest: { 
        scale: 1, 
        boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      },
      hover: { 
        scale: intensityValues[intensity].scale,
        boxShadow: intensityValues[intensity].shadow,
        backgroundColor: "#000000",
      },
      tap: { 
        scale: 0.98,
        backgroundColor: "#000000",
      }
    },
    secondary: {
      rest: {
        backgroundColor: "var(--background)",
        y: 0,
        boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      },
      hover: {
        backgroundColor: "#000000",
        color: "#ffffff",
        y: -2,
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      },
      tap: {
        y: 0,
        backgroundColor: "#000000",
        color: "#ffffff",
        boxShadow: "0px 0px 0px rgba(0,0,0,0)",
      }
    },
    subtle: {
      rest: {
        x: 0,
        opacity: 0.9,
        color: "rgba(0, 0, 0, 0.7)"
      },
      hover: {
        x: 3,
        opacity: 1,
        color: "#000000",
        backgroundColor: "transparent"
      },
      tap: {
        x: 1,
        color: "#000000",
        backgroundColor: "transparent"
      }
    },
    scale: {
      rest: { 
        scale: 1
      },
      hover: { 
        scale: intensityValues[intensity].scale,
        backgroundColor: "#000000",
        color: "#ffffff",
      },
      tap: { 
        scale: 0.98,
        backgroundColor: "#000000",
        color: "#ffffff",
      }
    },
    lift: {
      rest: { 
        y: 0,
        boxShadow: "0px 0px 0px rgba(0,0,0,0)"
      },
      hover: { 
        y: intensityValues[intensity].y,
        boxShadow: intensityValues[intensity].shadow,
        backgroundColor: "#000000",
        color: "#ffffff",
      },
      tap: { 
        y: -1,
        boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
        backgroundColor: "#000000",
        color: "#ffffff",
      }
    },
    glow: {
      rest: { 
        boxShadow: "0px 0px 0px rgba(var(--primary-rgb), 0)" 
      },
      hover: { 
        boxShadow: `0px 0px ${intensity === "sm" ? "8px" : intensity === "md" ? "12px" : "16px"} rgba(0, 0, 0, ${intensity === "sm" ? "0.2" : intensity === "md" ? "0.3" : "0.4"})`,
        backgroundColor: "#000000",
        color: "#ffffff",
      },
      tap: { 
        boxShadow: `0px 0px ${intensity === "sm" ? "4px" : intensity === "md" ? "8px" : "12px"} rgba(0, 0, 0, ${intensity === "sm" ? "0.15" : intensity === "md" ? "0.25" : "0.35"})`,
        backgroundColor: "#000000",
        color: "#ffffff",
      }
    }
  };
  
  // Transições para as animações
  const transitions = {
    spring: {
      type: "spring",
      stiffness: 400,
      damping: 17
    },
    quick: {
      type: "tween",
      duration: 0.1
    }
  };

  // Elemento a ser renderizado
  const Component = asChild ? motion.div : motion.button;

  return (
    <Component
      className={cn(className)}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={variants[type]}
      transition={transitions.spring}
      {...props}
    >
      {children}
    </Component>
  );
}

// Componente para adicionar efeito de hover em links e textos
export function MotionLink({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & MotionProps) {
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={{ x: 0 }}
      whileHover={{ x: 2 }}
      transition={{ type: "tween", duration: 0.2 }}
      {...props}
    >
      {children}
      <motion.span
        className="inline-block"
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ type: "tween", duration: 0.2 }}
        style={{
          height: "1px",
          backgroundColor: "currentColor",
          position: "absolute",
          bottom: 0,
          left: 0,
          opacity: 0.7,
        }}
      />
    </motion.span>
  );
}

// Link de navegação com efeito de deslizar
export function MotionNavLink({
  children,
  className,
  active = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
} & MotionProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0.9 }}
      whileHover={{ opacity: 1 }}
      {...props}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        initial={{ width: active ? "100%" : "0%", opacity: active ? 0.7 : 0 }}
        whileHover={{ 
          width: "100%", 
          opacity: 0.7,
          transition: { type: "spring", stiffness: 400, damping: 15 } 
        }}
        exit={{ width: active ? "100%" : "0%", opacity: active ? 0.7 : 0 }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 500,
          damping: 25
        }}
      />
    </motion.div>
  );
}

// Efeito de destaque pulsante para elementos importantes
export function PulseHighlight({
  children,
  className,
  intensity = "md",
  color = "primary",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: "sm" | "md" | "lg";
  color?: "primary" | "blue" | "green" | "amber";
} & Omit<MotionProps, "animate">) {
  
  const intensityValues = {
    sm: { scale: 1.03, opacity: 0.5, blur: "3px" },
    md: { scale: 1.06, opacity: 0.7, blur: "5px" },
    lg: { scale: 1.1, opacity: 0.8, blur: "8px" }
  };
  
  const colorValues = {
    primary: "bg-primary/40 dark:bg-primary/30",
    blue: "bg-blue-400/40 dark:bg-blue-500/30",
    green: "bg-green-400/40 dark:bg-green-500/30",
    amber: "bg-amber-400/40 dark:bg-amber-500/30"
  };
  
  return (
    <motion.div className={cn("relative", className)} {...props}>
      <motion.div 
        className={cn(
          "absolute inset-0 rounded-xl blur-md -z-10",
          colorValues[color]
        )}
        animate={{ 
          scale: [1, intensityValues[intensity].scale, 1],
          opacity: [0.2, intensityValues[intensity].opacity, 0.2],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      {children}
    </motion.div>
  );
}

// Wrapper para cartões interativos
export function MotionCard({
  children,
  className,
  intensity = "md",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: "sm" | "md" | "lg";
} & MotionProps) {
  // Valores baseados na intensidade
  const intensityValues = {
    sm: {
      scale: 1.01,
      y: -2,
      shadow: "0px 3px 6px rgba(0,0,0,0.08)"
    },
    md: {
      scale: 1.02,
      y: -3,
      shadow: "0px 5px 10px rgba(0,0,0,0.1)"
    },
    lg: {
      scale: 1.03,
      y: -4,
      shadow: "0px 8px 16px rgba(0,0,0,0.12)"
    }
  };

  return (
    <motion.div
      className={cn(className)}
      initial={{ 
        scale: 1, 
        y: 0, 
        boxShadow: "0px 0px 0px rgba(0,0,0,0)"
      }}
      whileHover={{ 
        scale: intensityValues[intensity].scale, 
        y: intensityValues[intensity].y, 
        boxShadow: intensityValues[intensity].shadow
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
} 