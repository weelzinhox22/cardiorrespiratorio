"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTrail, animated } from "@react-spring/web";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import {
  MotionDialog,
  MotionDialogContent,
  MotionDialogTrigger,
} from "@/components/ui/motion-dialog";
import { 
  DotsLoading, 
  LoadingContainer,
  ProgressLoading
} from "@/components/ui/motion-loading";
import { CardGridSkeleton } from "@/components/ui/motion-skeleton";
import { FadeIn, Motion } from "@/components/ui/optimized-framer";
import { Heading, Text, Section } from "@/components/ui/design-system";
import dynamic from "next/dynamic";

// Variantes para animações de botões
const buttonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)" 
  },
  hover: { 
    scale: 1.05, 
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
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

// Variantes para os cards de questões
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.6
    }
  }
};

// Exemplo de questões para a página
const questoesData = [
  {
    id: 1,
    titulo: "Circulação Coronariana",
    tipo: "Múltipla Escolha",
    dificuldade: "Média",
    conteudo: "Qual das seguintes artérias é responsável por irrigar a parede anterior do ventrículo esquerdo?",
    alternativas: [
      { id: "a", texto: "Artéria coronária direita", correta: false },
      { id: "b", texto: "Artéria circunflexa", correta: false },
      { id: "c", texto: "Artéria descendente anterior", correta: true },
      { id: "d", texto: "Artéria marginal", correta: false }
    ],
    explicacao: "A artéria descendente anterior, também conhecida como interventricular anterior, é um ramo da artéria coronária esquerda e é responsável por irrigar a parede anterior do ventrículo esquerdo, além de parte do septo interventricular. É uma das artérias mais importantes clinicamente, pois sua obstrução está relacionada a um grande número de infartos do miocárdio."
  },
  {
    id: 2,
    titulo: "Volumes Pulmonares",
    tipo: "Verdadeiro ou Falso",
    dificuldade: "Fácil",
    conteudo: "Avalie as seguintes afirmações sobre volumes pulmonares:",
    alternativas: [
      { id: "a", texto: "A capacidade pulmonar total é a soma do volume corrente, volume de reserva inspiratório e volume de reserva expiratório.", correta: false },
      { id: "b", texto: "O volume residual é o volume de ar que permanece nos pulmões após uma expiração forçada.", correta: true },
      { id: "c", texto: "A capacidade vital é medida durante a respiração normal em repouso.", correta: false },
      { id: "d", texto: "O volume corrente é tipicamente em torno de 500ml em um adulto saudável em repouso.", correta: true }
    ],
    explicacao: "A capacidade pulmonar total (CPT) é a soma do volume corrente, volume de reserva inspiratório, volume de reserva expiratório e volume residual. O volume residual é, de fato, o ar que permanece nos pulmões após uma expiração forçada. A capacidade vital é a quantidade máxima de ar exalado após uma inspiração máxima, não durante respiração normal. O volume corrente em repouso é aproximadamente 500ml em adultos saudáveis."
  },
  {
    id: 3,
    titulo: "Ventilação Mecânica",
    tipo: "Múltipla Escolha",
    dificuldade: "Difícil",
    conteudo: "Em relação ao modo ventilatório de Pressão de Suporte (PSV), qual afirmativa está correta?",
    alternativas: [
      { id: "a", texto: "É um modo totalmente controlado pelo ventilador", correta: false },
      { id: "b", texto: "O paciente determina a frequência respiratória e o tempo inspiratório", correta: true },
      { id: "c", texto: "O fluxo inspiratório é constante", correta: false },
      { id: "d", texto: "É contraindicado durante o processo de desmame ventilatório", correta: false }
    ],
    explicacao: "A Pressão de Suporte (PSV) é um modo ventilatório parcialmente assistido, onde o paciente determina a frequência respiratória e o tempo inspiratório, enquanto o ventilador fornece uma pressão pré-determinada durante a inspiração. O fluxo inspiratório é variável e descendente, não constante. É amplamente utilizado durante o processo de desmame da ventilação mecânica, pois permite avaliar a capacidade do paciente em assumir progressivamente o trabalho respiratório."
  }
];

// Carregamento dinâmico do componente de detalhes da questão
const QuestionDetailsModal = dynamic(
  () => import("@/components/question-details-modal"),
  { 
    loading: () => (
      <div className="flex justify-center items-center p-12">
        <DotsLoading size="lg" />
      </div>
    ),
    ssr: false 
  }
);

export default function Questoes() {
  const [questoes, setQuestoes] = useState<typeof questoesData>([]);
  const [loading, setLoading] = useState(true);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  
  // Simular carregamento de dados ao iniciar
  useEffect(() => {
    const fetchQuestoes = async () => {
      setLoading(true);
      
      // Simular uma requisição de API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setQuestoes(questoesData);
      setLoading(false);
    };
    
    fetchQuestoes();
  }, []);
  
  // Simular carregamento ao abrir questão específica
  const handleOpenQuestion = (id: number) => {
    setLoadingQuestion(true);
    
    // Simular carregamento de detalhes da questão
    setTimeout(() => {
      setLoadingQuestion(false);
    }, 1000);
  };

  return (
    <>
      <Navigation />
      <main className="container mx-auto py-10 px-4 max-w-6xl">
        <FadeIn direction="down" duration={0.6}>
          <Section size="lg">
            <Heading level={1} className="mb-4">Banco de Questões</Heading>
            <Text size="lg" className="mb-4">
              Pratique seus conhecimentos com questões de múltipla escolha e verdadeiro/falso sobre fisioterapia cardiorrespiratória.
              Selecione uma questão para ver os detalhes e testar seus conhecimentos.
            </Text>
            
            <div className="flex gap-3 mt-6">
              <Link href="/questoes/resolucao">
                <Button 
                  className="bg-neutral-800 hover:bg-black flex items-center gap-2"
                  asChild
                >
                  <Motion
                    whileHover={{ scale: 1.03 }} 
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"/><path d="M16 8V5c0-1.1.9-2 2-2"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8a2 2 0 0 0 2-2V5"/></svg>
                    Iniciar Módulo de Questões
                  </Motion>
                </Button>
              </Link>
            </div>
          </Section>
        </FadeIn>

        {/* Estado de carregamento - esqueleto de cards */}
        {loading ? (
          <>
            <div className="hidden md:block">
              <CardGridSkeleton count={6} columns={3} />
            </div>
            <div className="md:hidden">
              <CardGridSkeleton count={3} columns={1} />
            </div>
            
            <div className="mt-8 flex justify-center">
              <div className="flex flex-col items-center">
                <ProgressLoading className="w-64 mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">Carregando questões...</p>
              </div>
            </div>
          </>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {questoes.map((questao, index) => (
              <motion.div
                key={questao.id}
                className="h-full"
                variants={cardVariants}
                custom={index}
              >
                <Card className="h-full overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-all hover:shadow-lg shadow-md rounded-xl flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{questao.titulo}</CardTitle>
                      <motion.div 
                        className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                          backgroundColor: 
                            questao.dificuldade === "Fácil" 
                              ? "var(--green-50)" 
                              : questao.dificuldade === "Média" 
                                ? "var(--yellow-50)" 
                                : "var(--red-50)",
                          color: 
                            questao.dificuldade === "Fácil" 
                              ? "var(--green-700)" 
                              : questao.dificuldade === "Média" 
                                ? "var(--yellow-700)" 
                                : "var(--red-700)"
                        }}
                      >
                        {questao.dificuldade}
                      </motion.div>
                    </div>
                    <CardDescription>
                      <span className="font-medium">{questao.tipo}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="text-neutral-700 dark:text-neutral-300 line-clamp-3">
                      {questao.conteudo}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto flex gap-2 flex-wrap">
                    <MotionDialog>
                      <MotionDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          asChild
                        >
                          <motion.div
                            whileHover={{ scale: 1.03, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            className="flex items-center gap-1 py-2 justify-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye mr-1">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                            Ver Questão
                          </motion.div>
                        </Button>
                      </MotionDialogTrigger>
                      <MotionDialogContent>
                        <Suspense fallback={
                          <LoadingContainer>
                            <DotsLoading size="lg" />
                          </LoadingContainer>
                        }>
                          <QuestionDetailsModal 
                            questao={questao} 
                            loading={loadingQuestion}
                          />
                        </Suspense>
                      </MotionDialogContent>
                    </MotionDialog>

                    <Link 
                      href={`/questoes/resolucao?id=${questao.id}`} 
                      className="flex-1"
                      onClick={() => handleOpenQuestion(questao.id)}
                    >
                      <Button 
                        className="w-full hover:bg-black bg-neutral-800" 
                        size="sm"
                        asChild
                      >
                        <motion.div
                          whileHover={{ scale: 1.03, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="flex items-center gap-1 py-2 justify-center w-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil mr-1">
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                            <path d="m15 5 4 4"/>
                          </svg>
                          Resolver
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1">
                            <path d="M5 12h14"/>
                            <path d="m12 5 7 7-7 7"/>
                          </svg>
                        </motion.div>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </>
  );
} 