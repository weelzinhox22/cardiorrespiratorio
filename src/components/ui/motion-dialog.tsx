"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"

const MotionDialog = DialogPrimitive.Root

const MotionDialogTrigger = DialogPrimitive.Trigger

const MotionDialogPortal = DialogPrimitive.Portal

const MotionDialogClose = DialogPrimitive.Close

const MotionDialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    asChild
  >
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
    />
  </DialogPrimitive.Overlay>
))
MotionDialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const dialogVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      type: "spring",
      damping: 20,
      stiffness: 200,
      duration: 0.35
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 10,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
  }
}

const MotionDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <MotionDialogPortal>
    <MotionDialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
        className
      )}
      {...props}
      asChild
    >
      <motion.div
        variants={dialogVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-200 dark:border-neutral-700 bg-background p-7 shadow-[0_10px_30px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] sm:rounded-xl rounded-lg",
          className
        )}
      >
        {children}
        <motion.div
          whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.06)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="absolute right-4 top-4 rounded-full p-1.5 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <DialogPrimitive.Close className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </motion.div>
      </motion.div>
    </DialogPrimitive.Content>
  </MotionDialogPortal>
))
MotionDialogContent.displayName = DialogPrimitive.Content.displayName

function MotionDialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}
MotionDialogHeader.displayName = "MotionDialogHeader"

function MotionDialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...props}
    />
  )
}
MotionDialogFooter.displayName = "MotionDialogFooter"

const MotionDialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
MotionDialogTitle.displayName = DialogPrimitive.Title.displayName

const MotionDialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
MotionDialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  MotionDialog,
  MotionDialogPortal,
  MotionDialogOverlay,
  MotionDialogClose,
  MotionDialogTrigger,
  MotionDialogContent,
  MotionDialogHeader,
  MotionDialogFooter,
  MotionDialogTitle,
  MotionDialogDescription,
  // Alias para compatibilidade
  MotionDialog as Dialog,
  MotionDialogPortal as DialogPortal,
  MotionDialogOverlay as DialogOverlay,
  MotionDialogClose as DialogClose,
  MotionDialogTrigger as DialogTrigger,
  MotionDialogContent as DialogContent,
  MotionDialogHeader as DialogHeader,
  MotionDialogFooter as DialogFooter,
  MotionDialogTitle as DialogTitle,
  MotionDialogDescription as DialogDescription,
} 