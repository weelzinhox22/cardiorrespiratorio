"use client";

import { Navigation } from "@/components/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Definição dos tipos
interface Secao {
  titulo: string;
  conteudo: string;
}

interface Modulo {
  titulo: string;
  descricao: string;
  seccoes: Secao[];
}

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
  hidden: { opacity: 0, y: 50 },
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

export function ClientModuloContent({ modulo }: { modulo: Modulo }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <>
      <Navigation />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-10"
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
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-12"
      >
        <Accordion 
          type="single" 
          collapsible 
          className="w-full"
          onValueChange={(value) => setOpenItem(value)}
        >
          {modulo.seccoes?.map((secao: Secao, index: number) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              custom={index}
            >
              <AccordionItem 
                value={`secao-${index}`} 
                className="border-b border-neutral-200 dark:border-neutral-700 overflow-hidden"
              >
                <AccordionTrigger 
                  className="text-xl font-medium hover:no-underline py-6 group flex"
                >
                  <motion.span
                    className="flex-1 text-left"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {secao.titulo}
                  </motion.span>
                </AccordionTrigger>
                
                <AnimatePresence>
                  {openItem === `secao-${index}` && (
                    <AccordionContent 
                      className="text-neutral-700 dark:text-neutral-300"
                      forceMount
                    >
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="prose dark:prose-invert max-w-none pb-6"
                      >
                        <div dangerouslySetInnerHTML={{ __html: secao.conteudo }} />
                      </motion.div>
                    </AccordionContent>
                  )}
                </AnimatePresence>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mt-8 flex justify-center"
      >
        <motion.div 
          className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg text-blue-800 dark:text-blue-200 max-w-2xl text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <p className="text-sm">
            Este conteúdo foi estruturado para facilitar seu aprendizado. Expanda cada seção para acessar o material detalhado.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
} 