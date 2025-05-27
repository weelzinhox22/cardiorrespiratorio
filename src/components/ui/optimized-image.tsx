"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface OptimizedImageProps extends React.ComponentProps<typeof Image> {
  fallback?: string;
  aspectRatio?: "auto" | "square" | "video" | "portrait" | "ultrawide";
  containerClassName?: string;
}

export function OptimizedImage({
  src,
  alt = "",
  className,
  fallback,
  aspectRatio = "auto",
  containerClassName,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = React.useState(false);
  
  // Mapear relações de aspecto para valores de classes tailwind
  const aspectRatioClasses = {
    auto: "",
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
    ultrawide: "aspect-[21/9]",
  };
  
  // Determinar as props padrão se não forem especificadas
  const defaultProps = !width && !height 
    ? { 
        sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
        width: 800,
        height: aspectRatio === "square" ? 800 : 
               aspectRatio === "video" ? 450 :
               aspectRatio === "portrait" ? 1067 :
               aspectRatio === "ultrawide" ? 343 : 600
      } 
    : {};
  
  // Renderizar fallback se houver erro
  if (error && fallback) {
    return (
      <div 
        className={cn(
          "relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center", 
          aspectRatioClasses[aspectRatio],
          containerClassName
        )}
      >
        {fallback.startsWith('/') || fallback.startsWith('http') ? (
          <img 
            src={fallback} 
            alt={alt} 
            className={cn("object-cover", className)}
          />
        ) : (
          <div className="text-neutral-400 text-sm">{fallback}</div>
        )}
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden", 
        aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      <Image
        src={src}
        alt={alt}
        className={cn("object-cover", className)}
        onError={() => setError(true)}
        loading="lazy"
        {...defaultProps}
        {...props}
      />
    </div>
  );
}

// Variante para imagens de avatar/perfil
export function AvatarImage({
  src,
  alt = "",
  size = "md",
  className,
  fallback = "Usuário",
  ...props
}: Omit<OptimizedImageProps, "width" | "height" | "aspectRatio"> & {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) {
  const [error, setError] = React.useState(false);
  
  // Mapear tamanhos para dimensões
  const sizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 64,
    xl: 96,
  };
  
  // Mapear tamanhos para classes
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };
  
  // Renderizar placeholder se houver erro ou sem src
  if (error || !src) {
    return (
      <div 
        className={cn(
          "relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center text-neutral-600 dark:text-neutral-400 font-medium", 
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {typeof fallback === 'string' && fallback.length > 0 
          ? fallback.charAt(0).toUpperCase() 
          : 'U'
        }
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-full", 
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={sizes[size]}
        height={sizes[size]}
        className="object-cover w-full h-full"
        onError={() => setError(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
} 