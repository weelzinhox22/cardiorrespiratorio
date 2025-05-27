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

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/50 backdrop-blur-md dark:bg-neutral-950/50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="text-xl font-bold"
          >
            FisioCardio
          </motion.div>
        </Link>

        <nav className="flex gap-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link href={link.href} key={link.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className="relative"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
} 