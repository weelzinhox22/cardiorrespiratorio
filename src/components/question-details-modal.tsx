"use client"

import * as React from "react"
import { 
  MotionDialogHeader, 
  MotionDialogTitle, 
  MotionDialogDescription 
} from "@/components/ui/motion-dialog"
import { motion } from "framer-motion"
import { LoadingContainer, DotsLoading } from "@/components/ui/motion-loading"

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

  return (
    <>
      <MotionDialogHeader>
        <MotionDialogTitle>{questao.titulo}</MotionDialogTitle>
        <MotionDialogDescription>
          {questao.tipo} - Dificuldade: {questao.dificuldade}
        </MotionDialogDescription>
      </MotionDialogHeader>
      
      <div className="py-4">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">{questao.conteudo}</h3>
          <div className="space-y-3 mt-4">
            {questao.alternativas.map((alt) => (
              <motion.div 
                key={alt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: parseInt(alt.id.replace("a", "0").replace("b", "1").replace("c", "2").replace("d", "3")) * 0.1 
                }}
                className="flex items-start gap-3 p-3 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary">
                  {alt.id}
                </div>
                <div>
                  <p className="text-neutral-700 dark:text-neutral-300">{alt.texto}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h4 className="font-medium mb-2">Explicação:</h4>
          <p className="text-neutral-700 dark:text-neutral-300">
            {questao.explicacao}
          </p>
        </motion.div>
      </div>
    </>
  );
} 