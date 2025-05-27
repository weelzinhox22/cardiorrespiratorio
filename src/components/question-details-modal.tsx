"use client"

import * as React from "react"
import { 
  MotionDialogHeader, 
  MotionDialogTitle, 
  MotionDialogDescription 
} from "@/components/ui/motion-dialog"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingContainer, DotsLoading } from "@/components/ui/motion-loading"
import { CheckCircle2 } from "lucide-react"

interface Alternativa {
  id: string;
  texto: string;
  correta: boolean;
}

interface Questao {
  id: number;
  titulo: string;
  tipo: string;
  dificuldade: string;
  conteudo: string;
  alternativas: Alternativa[];
  explicacao: string;
}

interface QuestionDetailsModalProps {
  questao: Questao;
  loading: boolean;
}

export default function QuestionDetailsModal({ questao, loading }: QuestionDetailsModalProps) {
  if (loading) {
    return (
      <div className="py-12">
        <LoadingContainer>
          <DotsLoading size="lg" />
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Carregando detalhes da questão...</p>
        </LoadingContainer>
      </div>
    );
  }

  const [mostrarRespostas, setMostrarRespostas] = React.useState(false);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.3, 
        ease: "easeOut" 
      }
    })
  };

  return (
    <>
      <MotionDialogHeader>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <MotionDialogTitle>{questao.titulo}</MotionDialogTitle>
          <MotionDialogDescription>
            {questao.tipo} - Dificuldade: {questao.dificuldade}
          </MotionDialogDescription>
        </motion.div>
      </MotionDialogHeader>
      
      <div className="py-4">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h3 className="text-lg font-medium mb-2">{questao.conteudo}</h3>
          <div className="space-y-3 mt-4">
            {questao.alternativas.map((alt, index) => (
              <motion.div 
                key={alt.id}
                custom={index}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  mostrarRespostas && alt.correta 
                    ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20" 
                    : "border-neutral-200 dark:border-neutral-700"
                } hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 shadow-sm hover:shadow-md`}
              >
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                  mostrarRespostas && alt.correta 
                    ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white border-0" 
                    : "border border-primary"
                }`}>
                  {mostrarRespostas && alt.correta ? <CheckCircle2 className="h-4 w-4" /> : alt.id}
                </div>
                <div>
                  <p className="text-neutral-700 dark:text-neutral-300">{alt.texto}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <motion.button
              onClick={() => setMostrarRespostas(!mostrarRespostas)}
              className="px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {mostrarRespostas ? "Ocultar Resposta" : "Mostrar Resposta"}
            </motion.button>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {mostrarRespostas && (
            <motion.div 
              className="mt-8 p-5 bg-neutral-50 dark:bg-neutral-800/80 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm"
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.4
              }}
            >
              <h4 className="font-medium mb-2 text-neutral-900 dark:text-neutral-100">Explicação:</h4>
              <p className="text-neutral-700 dark:text-neutral-300">
                {questao.explicacao}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 