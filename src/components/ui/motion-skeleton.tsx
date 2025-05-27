"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string;
  animated?: boolean;
  pulse?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Skeleton({
  className,
  animated = true,
  pulse = true,
  children,
  style,
  ...props
}: SkeletonProps & Omit<React.HTMLAttributes<HTMLDivElement>, "style" | "className" | "children">) {
  if (animated) {
    return (
      <motion.div
        className={cn("bg-neutral-200 dark:bg-neutral-800 rounded-md", className)}
        animate={pulse ? { opacity: [0.5, 0.8, 0.5] } : undefined}
        transition={pulse ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : undefined}
        style={style}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div
      className={cn("bg-neutral-200 dark:bg-neutral-800 rounded-md", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

// Conjunto de esqueletos para um card
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className="h-5 w-2/5" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}

// Esqueleto para um card completo
export function FullCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 space-y-4", className)}>
      <div className="flex justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-12" />
      </div>
      <Skeleton className="h-4 w-32" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

// Grid de esqueletos de cards
export function CardGridSkeleton({ 
  count = 3, 
  columns = 3,
  className
}: { 
  count?: number;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  const columnsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };
  
  return (
    <div className={cn(`grid gap-4 ${columnsClass[columns]}`, className)}>
      {Array.from({ length: count }).map((_, i) => (
        <FullCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Esqueleto para textos
export function TextSkeleton({ 
  lines = 3, 
  lastLineWidth = "3/4",
  className
}: { 
  lines?: number;
  lastLineWidth?: "1/4" | "1/3" | "1/2" | "2/3" | "3/4" | "full";
  className?: string;
}) {
  const lineWidths = [...Array(lines - 1).fill("w-full"), `w-${lastLineWidth}`];
  
  return (
    <div className={cn("space-y-2", className)}>
      {lineWidths.map((width, i) => (
        <motion.div
          key={i} 
          className={cn("h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md", width)}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            delay: i * 0.1 
          }}
        />
      ))}
    </div>
  );
}

// Esqueleto para tabelas
export function TableSkeleton({ 
  rows = 5, 
  columns = 3,
  className
}: { 
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Cabeçalho */}
      <div className="flex gap-4 border-b border-neutral-200 dark:border-neutral-700 pb-2">
        {Array.from({ length: columns }).map((_, i) => (
          <motion.div
            key={`header-${i}`} 
            className="h-6 flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-md"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
      
      {/* Linhas */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <motion.div
              key={`cell-${rowIndex}-${colIndex}`} 
              className="h-5 flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-md"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                delay: (rowIndex * columns + colIndex) * 0.05
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Esqueleto para avatar com texto
export function AvatarWithTextSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
} 