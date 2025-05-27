"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const links = [
  { href: "/", label: "Início" },
  { href: "/modulos", label: "Módulos de Estudo" },
  { href: "/questoes", label: "Banco de Questões" },
  { href: "/recursos", label: "Recursos" },
];

// Animações para os itens do menu
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

// Variantes para animações de botões
const buttonHoverVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)" 
  },
  hover: { 
    scale: 1.08, 
    boxShadow: "0px 5px 10px rgba(0,0,0,0.1)",
    transition: {
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  },
  tap: { 
    scale: 0.95, 
    boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
    transition: {
      type: "spring", 
      stiffness: 500, 
      damping: 15
    }
  }
};

export function Navigation() {
  const pathname = usePathname();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-md dark:bg-neutral-950/50"
    >
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
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <motion.div
                key={link.href}
                variants={itemVariants}
              >
                <Link href={link.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className="relative overflow-hidden"
                    asChild
                  >
                    <motion.div
                      initial="initial"
                      whileHover={isActive ? {} : "hover"}
                      whileTap="tap"
                      variants={buttonHoverVariants}
                      className="px-4 py-2 flex items-center justify-center"
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary"
                          initial={{ opacity: 0, width: "0%" }}
                          animate={{ opacity: 1, width: "100%" }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </div>
    </motion.header>
  );
} 