"use client"

import * as React from "react"
import { 
  LazyMotion, 
  domAnimation, 
  m, 
  AnimatePresence,
  HTMLMotionProps,
  useAnimation,
  useInView
} from "framer-motion"
import { cn } from "@/lib/utils"

// Wrapper para lazy-loading do Framer Motion
export function OptimizedMotion({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <LazyMotion features={domAnimation}>
      <div className={className} {...props}>
        {children}
      </div>
    </LazyMotion>
  );
}

// Componente de movimento otimizado - agora com suporte para todas as props do framer-motion
export function Motion({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        {...props}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

// AnimatePresence otimizado
export function MotionPresence({
  children,
  mode = "sync",
  initial = true,
  ...props
}: {
  children: React.ReactNode;
  mode?: "sync" | "wait" | "popLayout";
  initial?: boolean;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode={mode} initial={initial} {...props}>
        {children}
      </AnimatePresence>
    </LazyMotion>
  );
}

// Componente de texto com animação otimizada
export function MotionText({
  children,
  className,
  staggerChildren = 0.05,
  delayChildren = 0,
  ...props
}: {
  children: string;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
} & HTMLMotionProps<"p">) {
  const words = React.useMemo(() => {
    return children.split(' ').map((word, i) => (
      <m.span
        key={i}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: i * staggerChildren + delayChildren,
          duration: 0.4
        }}
        className="inline-block mr-1"
      >
        {word}
      </m.span>
    ));
  }, [children, staggerChildren, delayChildren]);

  return (
    <LazyMotion features={domAnimation}>
      <m.p className={className} {...props}>
        {words}
      </m.p>
    </LazyMotion>
  );
}

// Fade-in simples otimizado
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 20,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
} & Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition">) {
  // Configurar direção da animação
  const directionValues = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {}
  };
  
  const initial = {
    opacity: 0,
    ...directionValues[direction]
  };
  
  const animate = {
    opacity: 1,
    y: 0,
    x: 0
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={className}
        initial={initial}
        animate={animate}
        transition={{ 
          duration, 
          delay,
          ease: "easeOut" 
        }}
        {...props}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

// Componente de imagem com transição suave
export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className">) {
  return (
    <LazyMotion features={domAnimation}>
      <div className={cn("relative overflow-hidden", className)} {...props}>
        <m.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration, 
            delay,
            ease: "easeOut" 
          }}
        >
          {children}
        </m.div>
        <m.div
          className="absolute inset-0 bg-neutral-900"
          initial={{ left: 0, right: 0 }}
          animate={{ left: "100%", right: 0 }}
          transition={{ 
            duration: duration * 0.8, 
            delay,
            ease: "easeInOut" 
          }}
        />
      </div>
    </LazyMotion>
  );
} 