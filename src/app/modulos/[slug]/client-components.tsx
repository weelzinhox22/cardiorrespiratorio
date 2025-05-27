"use client";

import { Navigation } from "@/components/navigation";
import { 
  MotionAccordion, 
  MotionAccordionContent, 
  MotionAccordionItem, 
  MotionAccordionTrigger 
} from "@/components/ui/motion-accordion";
import { motion } from "framer-motion";
import { useState } from "react";
import { BookOpen, ArrowLeft, Heart, Wind } from "lucide-react";
import { Modulo } from "../types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PulseHighlight } from "@/components/ui/motion-hover";
import Image from "next/image";

// Variantes para animações
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.5
    }
  }
};

// Mapeia os tipos de módulos para ícones e cores apropriados
const moduleIcons: Record<string, any> = {
  "anatomia-cardiaca": {
    icon: Heart,
    color: "blue",
    image: "/images/heart-anatomy.svg"
  },
  "fisiologia-respiratoria": {
    icon: Wind,
    color: "green",
    image: "/images/respiratory-system.svg"
  }
};

export function MotionBackButton() {
  return (
    <Link href="/modulos" className="inline-block">
      <Button 
        variant="ghost" 
        className="mb-6 hover:bg-neutral-100 dark:hover:bg-neutral-800 group transition-colors"
        asChild
      >
        <motion.div
          whileHover={{ x: -5, transition: { type: "spring", stiffness: 400, damping: 15 } }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:text-primary transition-colors" />
          <span>Voltar para Módulos</span>
        </motion.div>
      </Button>
    </Link>
  );
}

// Componente para o trigger do accordion com microinterações
function EnhancedAccordionTrigger({ 
  children, 
  className, 
  open, 
  icon 
}: { 
  children: React.ReactNode; 
  className?: string; 
  open?: boolean;
  icon: React.ElementType;
}) {
  const Icon = icon;
  
  return (
    <motion.div 
      className={className}
      whileHover={{ 
        backgroundColor: "rgba(59, 130, 246, 0.05)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3 relative overflow-hidden">
        <motion.div 
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-500/40 dark:from-blue-600/30 dark:to-indigo-700/30 text-primary border border-blue-100 dark:border-blue-800/30"
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
          }}
          animate={open ? { rotate: [0, 5, 0] } : {}}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <Icon className="h-4 w-4" />
        </motion.div>
        
        <div className="flex-1">
          {children}
        </div>
        
        <motion.div
          animate={open ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-4 w-4 shrink-0 text-neutral-500"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600"
          initial={{ width: "0%" }}
          animate={{ width: open ? "100%" : "0%" }}
          exit={{ width: "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

export function ClientModuloContent({ modulo }: { modulo: Modulo }) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  
  // Obter o slug do módulo a partir do path
  const slug = typeof window !== 'undefined' 
    ? window.location.pathname.split('/').pop() 
    : '';
  
  // Encontrar o ícone e cor correspondentes
  const moduleConfig = moduleIcons[slug || ''] || {
    icon: BookOpen,
    color: "primary",
    image: null
  };
  
  const IconComponent = moduleConfig.icon;

  return (
    <>
      <Navigation />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-3 text-neutral-900 dark:text-neutral-50"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {modulo.titulo}
          </motion.h1>
          <motion.p 
            className="text-lg text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {modulo.descricao}
          </motion.p>
          
          <PulseHighlight 
            className="mt-6 p-4 rounded-xl bg-white dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700"
            color={moduleConfig.color as any}
            intensity="sm"
          >
            <div className="flex items-center gap-3">
              <IconComponent className="h-6 w-6 text-primary" />
              <p className="text-sm">
                <strong>Dica:</strong> Estude cada tópico detalhadamente. 
                Este conteúdo aborda conceitos fundamentais para a compreensão da fisioterapia cardiorrespiratória.
              </p>
            </div>
          </PulseHighlight>
        </motion.div>
        
        {moduleConfig.image && (
          <motion.div 
            className="relative hidden md:block h-[200px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src={moduleConfig.image} 
                alt={modulo.titulo}
                width={200}
                height={200}
                className="object-contain w-full h-full"
              />
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <MotionAccordion 
          type="single" 
          collapsible 
          className="w-full space-y-4"
          onValueChange={(value) => setOpenItem(value)}
        >
          {modulo.seccoes?.map((secao, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
            >
              <MotionAccordionItem 
                value={`secao-${index}`} 
                className="border border-neutral-200 dark:border-neutral-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <MotionAccordionTrigger 
                  className="text-xl font-medium hover:no-underline py-6 px-6 bg-neutral-50 dark:bg-neutral-800/30"
                  open={openItem === `secao-${index}`}
                >
                  <EnhancedAccordionTrigger 
                    className="w-full text-left"
                    open={openItem === `secao-${index}`}
                    icon={BookOpen}
                  >
                    {secao.titulo}
                  </EnhancedAccordionTrigger>
                </MotionAccordionTrigger>
                
                <MotionAccordionContent 
                  className="text-neutral-700 dark:text-neutral-300 px-6"
                  forceMount
                  open={openItem === `secao-${index}`}
                >
                  <div className="prose dark:prose-invert max-w-none py-6">
                    <div dangerouslySetInnerHTML={{ __html: secao.conteudo }} />
                  </div>
                </MotionAccordionContent>
              </MotionAccordionItem>
            </motion.div>
          ))}
        </MotionAccordion>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex justify-center"
      >
        <motion.div 
          className="bg-blue-50 dark:bg-blue-900/30 p-5 rounded-lg border border-blue-100 dark:border-blue-800/40 text-blue-800 dark:text-blue-200 max-w-2xl text-center shadow-sm"
          whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <p className="text-sm">
            Este conteúdo foi estruturado para facilitar seu aprendizado. Clique em cada seção para expandir e acessar o material detalhado.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
} 