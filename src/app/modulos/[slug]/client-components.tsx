"use client";

import { Navigation } from "@/components/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

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

export function ClientModuloContent({ modulo }: { modulo: Modulo }) {
  return (
    <>
      <Navigation />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">{modulo.titulo}</h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300">{modulo.descricao}</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        <Accordion type="single" collapsible className="w-full">
          {modulo.seccoes?.map((secao: Secao, index: number) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1
                  }
                }
              }}
            >
              <AccordionItem value={`secao-${index}`} className="border-b border-neutral-200 dark:border-neutral-700">
                <AccordionTrigger className="text-xl font-medium hover:no-underline py-6">
                  {secao.titulo}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-700 dark:text-neutral-300 pb-6">
                  <div dangerouslySetInnerHTML={{ __html: secao.conteudo }} className="prose dark:prose-invert max-w-none" />
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </>
  );
} 