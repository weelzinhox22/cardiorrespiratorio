"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const MotionTooltipProvider = TooltipPrimitive.Provider

const MotionTooltip = TooltipPrimitive.Root

const MotionTooltipTrigger = TooltipPrimitive.Trigger

const tooltipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 5,
    transition: { duration: 0.15, ease: "easeIn" }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.2, 
      ease: "easeOut",
      type: "spring",
      stiffness: 500,
      damping: 25
    }
  }
}

const MotionTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
    asChild
  >
    <AnimatePresence>
      <motion.div
        variants={tooltipVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={cn(
          "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground",
          className
        )}
      >
        {props.children}
      </motion.div>
    </AnimatePresence>
  </TooltipPrimitive.Content>
))
MotionTooltipContent.displayName = TooltipPrimitive.Content.displayName

export { 
  MotionTooltipProvider, 
  MotionTooltip,
  MotionTooltipTrigger, 
  MotionTooltipContent,
  // Alias para compatibilidade
  MotionTooltipProvider as TooltipProvider,
  MotionTooltip as Tooltip,
  MotionTooltipTrigger as TooltipTrigger,
  MotionTooltipContent as TooltipContent
} 