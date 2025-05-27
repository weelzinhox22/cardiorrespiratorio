"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTrail, animated, config } from "@react-spring/web";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import {
  MotionDialog,
  MotionDialogContent,
  MotionDialogDescription,
  MotionDialogHeader,
  MotionDialogTitle,
  MotionDialogTrigger,
} from "@/components/ui/motion-dialog";
import { 
  SpinnerLoading, 
  ProgressLoading, 
  DotsLoading, 
  PulseLoading,
  LoadingContainer
} from "@/components/ui/motion-loading";
import { CardGridSkeleton } from "@/components/ui/motion-skeleton";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { FadeIn, Motion, MotionPresence } from "@/components/ui/optimized-framer";
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
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  
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
    setSelectedQuestion(id);
    setLoadingQuestion(true);
    
    // Simular carregamento de detalhes da questão
    setTimeout(() => {
      setLoadingQuestion(false);
    }, 1000);
  };
  
  // Configuração do React Spring para a animação em cascata
  const trail = useTrail(questoes.length, {
    from: { opacity: 0, y: 60, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { mass: 1.2, tension: 180, friction: 24 },
    delay: 300,
  });

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
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trail.map((style, index) => (
              <animated.div 
                key={questoes[index].id} 
                style={style}
                className="h-full"
              >
                <Card className="h-full overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-all hover:shadow-lg flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{questoes[index].titulo}</CardTitle>
                      <motion.div 
                        className="px-2 py-1 rounded text-xs font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{
                          backgroundColor: 
                            questoes[index].dificuldade === "Fácil" 
                              ? "var(--green-50)" 
                              : questoes[index].dificuldade === "Média" 
                                ? "var(--yellow-50)" 
                                : "var(--red-50)",
                          color: 
                            questoes[index].dificuldade === "Fácil" 
                              ? "var(--green-700)" 
                              : questoes[index].dificuldade === "Média" 
                                ? "var(--yellow-700)" 
                                : "var(--red-700)"
                        }}
                      >
                        {questoes[index].dificuldade}
                      </motion.div>
                    </div>
                    <CardDescription>
                      <span className="font-medium">{questoes[index].tipo}</span>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <p className="text-neutral-700 dark:text-neutral-300 line-clamp-3">
                      {questoes[index].conteudo}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto flex gap-2 flex-wrap">
                    <MotionDialog>
                      <MotionDialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                        >
                          <Motion
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonVariants}
                            className="py-2 flex items-center justify-center w-full"
                            onClick={() => handleOpenQuestion(questoes[index].id)}
                          >
                            Visualizar
                          </Motion>
                        </Button>
                      </MotionDialogTrigger>
                      <MotionDialogContent className="max-w-3xl">
                        <Suspense fallback={
                          <div className="py-12">
                            <LoadingContainer>
                              <DotsLoading size="lg" />
                              <p className="mt-4 text-neutral-600 dark:text-neutral-400">Carregando detalhes da questão...</p>
                            </LoadingContainer>
                          </div>
                        }>
                          <QuestionDetailsModal 
                            questao={questoes[index]}
                            loading={loadingQuestion}
                          />
                        </Suspense>
                      </MotionDialogContent>
                    </MotionDialog>
                    
                    <Link href={`/questoes/resolucao?id=${questoes[index].id}`} className="flex-1">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        <Motion
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="py-2 flex items-center justify-center w-full"
                        >
                          Resolver
                        </Motion>
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </animated.div>
            ))}
          </div>
        )}
      </main>
    </>
  );
} 