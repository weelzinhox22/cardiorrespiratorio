"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { MotionNavLink } from "./ui/motion-hover";

// Variantes para animação do container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Variantes para animação de cada item
const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

// Links de navegação
const navigationLinks = [
  {
    name: "Início",
    href: "/"
  },
  {
    name: "Módulos",
    href: "/modulos"
  },
  {
    name: "Questões",
    href: "/questoes"
  },
  {
    name: "Recursos",
    href: "/recursos"
  }
];

// Componente de mudança de tema
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Montagem do componente
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
    >
      {theme === "dark" ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </motion.button>
  );
};

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { 
                scale: { type: "spring", stiffness: 400, damping: 10 },
                rotate: { duration: 0.5, ease: "easeInOut" }
              }
            }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="text-xl font-bold"
          >
            FisioCardio
          </motion.div>
        </Link>

        <motion.nav 
          className="flex gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navigationLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <motion.div 
                key={link.href}
                variants={itemVariants}
                custom={navigationLinks.indexOf(link)}
              >
                <MotionNavLink active={isActive}>
                  <Link 
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive 
                        ? "text-primary dark:text-primary" 
                        : "text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                </MotionNavLink>
              </motion.div>
            );
          })}
          
          <ThemeToggle />
        </motion.nav>
      </div>
    </header>
  );
} 