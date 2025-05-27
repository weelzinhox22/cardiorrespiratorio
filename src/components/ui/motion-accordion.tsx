"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

function MotionAccordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function MotionAccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}

interface TriggerProps extends React.ComponentProps<typeof AccordionPrimitive.Trigger> {
  open?: boolean;
}

function MotionAccordionTrigger({
  className,
  children,
  open,
  ...props
}: TriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: open ? 180 : 0,
            scale: open ? 1.2 : 1
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="ml-2"
        >
          <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5" />
        </motion.div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

const accordionContentVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    transition: { 
      duration: 0.3,
      ease: [0.33, 1, 0.68, 1]  // Custom easing for smoother motion
    }
  },
  expanded: {
    opacity: 1,
    height: "auto",
    transition: { 
      duration: 0.4,
      ease: [0.33, 1, 0.68, 1]
    }
  }
}

interface MotionAccordionContentProps {
  className?: string;
  children?: React.ReactNode;
  forceMount?: boolean;
  open?: boolean;
  [key: string]: unknown; // Usar unknown em vez de any
}

function MotionAccordionContent({
  className,
  children,
  forceMount,
  open,
  ...props
}: MotionAccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn("overflow-hidden", className)}
      forceMount={forceMount as true | undefined}
      {...props}
    >
      <AnimatePresence initial={false}>
        {(forceMount || open) && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={accordionContentVariants}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className={cn("pt-0 pb-4", className)}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionPrimitive.Content>
  )
}

export { 
  MotionAccordion, 
  MotionAccordionItem, 
  MotionAccordionTrigger, 
  MotionAccordionContent,
  // Tipos originais para compatibilidade
  MotionAccordion as Accordion,
  MotionAccordionItem as AccordionItem,
  MotionAccordionTrigger as AccordionTrigger,
  MotionAccordionContent as AccordionContent
} 