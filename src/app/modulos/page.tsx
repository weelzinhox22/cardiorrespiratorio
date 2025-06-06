"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTrail } from "@react-spring/web";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  MotionAccordion, 
  MotionAccordionItem, 
  MotionAccordionTrigger, 
  MotionAccordionContent 
} from "@/components/ui/motion-accordion";
import {
  MotionDialog,
  MotionDialogContent,
  MotionDialogDescription,
  MotionDialogHeader,
  MotionDialogTitle,
  MotionDialogTrigger,
} from "@/components/ui/motion-dialog";
import { ArrowRight, BookOpen, CheckCircle2, Info } from "lucide-react";
import { MotionCard, MotionHover } from "@/components/ui/motion-hover";

const modulos = [
  {
    id: "anatomia-cardiaca",
    slug: "anatomia-cardiaca",
    titulo: "Anatomia Cardíaca",
    descricao: "Estudo detalhado da estrutura do coração, incluindo câmaras, válvulas e sistema de condução.",
    totalAulas: 4,
    duracao: "2h 30min",
    imagem: "/images/modulos/anatomia-cardiaca.jpg",
    detalhes: "Este módulo aborda a anatomia detalhada do coração humano, explorando sua estrutura desde o nível macroscópico até o microscópico. Você aprenderá sobre a organização das câmaras cardíacas, o funcionamento das válvulas, e a importância do sistema de condução para o ritmo cardíaco normal.",
    topicos: [
      { 
        titulo: "Estrutura macroscópica do coração", 
        descricao: "Forma, tamanho, localização e relações anatômicas do coração no mediastino." 
      },
      { 
        titulo: "Câmaras cardíacas", 
        descricao: "Átrios e ventrículos: estrutura, função e características específicas." 
      },
      { 
        titulo: "Sistema valvular", 
        descricao: "Válvulas atrioventriculares e semilunares: estrutura e função." 
      },
      { 
        titulo: "Sistema de condução", 
        descricao: "Nódulo sinusal, nódulo AV, feixe de His e fibras de Purkinje." 
      }
    ],
    objetivos: [
      "Identificar e descrever as estruturas anatômicas do coração",
      "Compreender a relação entre estrutura e função das câmaras e válvulas",
      "Explicar o funcionamento do sistema de condução cardíaca",
      "Relacionar alterações anatômicas com condições patológicas comuns"
    ]
  },
  {
    id: "fisiologia-respiratoria",
    titulo: "Módulo 2: Fisiologia Respiratória",
    descricao: "Estudo dos mecanismos de respiração, troca gasosa, volumes e capacidades pulmonares.",
    imagem: "/modulos/pulmao.jpg",
    topicos: [
      {
        titulo: "Mecânica Respiratória",
        descricao: "Compreensão dos processos de inspiração e expiração."
      },
      {
        titulo: "Volumes e Capacidades Pulmonares",
        descricao: "Medidas e significado clínico dos diferentes volumes respiratórios."
      },
      {
        titulo: "Difusão e Transporte de Gases",
        descricao: "Processo de troca gasosa alveolar e transporte no sangue."
      }
    ],
    detalhes: "Este módulo explora os mecanismos fisiológicos da respiração, incluindo a mecânica ventilatória, os volumes e capacidades pulmonares, a difusão e o transporte de gases. O entendimento desses processos é essencial para a avaliação e intervenção em pacientes com disfunções respiratórias."
  },
  {
    id: "avaliacao-cardiorrespiratoria",
    titulo: "Módulo 3: Avaliação Cardiorrespiratória",
    descricao: "Métodos e técnicas para avaliação da função cardíaca e respiratória, incluindo testes e medidas.",
    imagem: "/modulos/avaliacao.jpg",
    topicos: [
      {
        titulo: "Anamnese Cardiorrespiratória",
        descricao: "Técnicas de entrevista e coleta de informações relevantes."
      },
      {
        titulo: "Exame Físico",
        descricao: "Métodos de inspeção, palpação, percussão e ausculta."
      },
      {
        titulo: "Testes Funcionais",
        descricao: "Testes de capacidade funcional e sua interpretação."
      }
    ],
    detalhes: "O módulo de avaliação cardiorrespiratória aborda os métodos e técnicas utilizados para avaliar a função cardíaca e pulmonar. Inclui anamnese específica, exame físico detalhado, além de testes funcionais como o teste de caminhada de 6 minutos, ergoespirometria e manovacuometria. Esses conhecimentos são fundamentais para o diagnóstico fisioterapêutico e planejamento de intervenções."
  },
  {
    id: "fisioterapia-respiratoria",
    titulo: "Módulo 4: Fisioterapia Respiratória",
    descricao: "Técnicas e procedimentos para tratamento de disfunções respiratórias.",
    imagem: "/modulos/fisioterapia.jpg",
    topicos: [
      {
        titulo: "Técnicas de Higiene Brônquica",
        descricao: "Métodos para remoção de secreções e desobstrução das vias aéreas."
      },
      {
        titulo: "Técnicas de Reexpansão Pulmonar",
        descricao: "Estratégias para melhorar a ventilação e prevenir atelectasias."
      },
      {
        titulo: "Treinamento Muscular Respiratório",
        descricao: "Métodos para fortalecer a musculatura respiratória."
      }
    ],
    detalhes: "Este módulo apresenta as técnicas e procedimentos utilizados na fisioterapia respiratória, incluindo manobras de higiene brônquica, técnicas de reexpansão pulmonar e treinamento muscular respiratório. São abordadas também as indicações, contraindicações e evidências científicas de cada técnica."
  },
  {
    id: "reabilitacao-cardiaca",
    titulo: "Módulo 5: Reabilitação Cardíaca",
    descricao: "Programas de reabilitação para pacientes com doenças cardiovasculares.",
    imagem: "/modulos/reabilitacao.jpg",
    topicos: [
      {
        titulo: "Fases da Reabilitação Cardíaca",
        descricao: "Estruturação das diferentes fases do programa de reabilitação."
      },
      {
        titulo: "Prescrição de Exercícios",
        descricao: "Princípios e métodos para prescrição individualizada."
      },
      {
        titulo: "Monitorização durante o Exercício",
        descricao: "Técnicas para acompanhamento seguro das atividades."
      }
    ],
    detalhes: "O módulo de reabilitação cardíaca aborda os programas estruturados para pacientes com doenças cardiovasculares, incluindo as diferentes fases da reabilitação, desde a fase hospitalar até a manutenção. São discutidos os princípios da prescrição de exercícios, monitorização e adaptação do programa conforme a evolução do paciente."
  },
  {
    id: "ventilacao-mecanica",
    titulo: "Módulo 6: Ventilação Mecânica",
    descricao: "Princípios e aplicações da ventilação mecânica em pacientes com insuficiência respiratória.",
    imagem: "/modulos/ventilacao.jpg",
    topicos: [
      {
        titulo: "Princípios da Ventilação Mecânica",
        descricao: "Fundamentos e objetivos da assistência ventilatória."
      },
      {
        titulo: "Modos Ventilatórios",
        descricao: "Diferentes modalidades e suas indicações específicas."
      },
      {
        titulo: "Desmame da Ventilação",
        descricao: "Estratégias para retirada gradual do suporte ventilatório."
      }
    ],
    detalhes: "Este módulo explora os princípios e aplicações da ventilação mecânica em pacientes com insuficiência respiratória. São abordados os diferentes modos ventilatórios, parâmetros, monitorização e estratégias de desmame. O fisioterapeuta desempenha papel fundamental na assistência ao paciente em ventilação mecânica, sendo essencial o domínio desse conhecimento."
  }
];

// Adicionando variantes para a animação dos cards em grupo
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

export default function Modulos() {
  const [isInView, setIsInView] = useState(false);
  
  // Simulação de carregamento para demonstrar animação
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navigation />
      <main className="container mx-auto py-10 px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Módulos de Estudo</h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            Explore os módulos abaixo para aprender mais sobre fisioterapia cardiorrespiratória.
            Cada módulo contém informações detalhadas e recursos para auxiliar no seu aprendizado.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          viewport={{ once: true, amount: 0.1 }}
        >
          {modulos.map((modulo, index) => (
            <motion.div
              key={modulo.id}
              className="h-full"
              variants={cardVariants}
              custom={index}
            >
              <Card className="h-full overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{modulo.titulo}</CardTitle>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-800/40 text-primary shadow-sm border border-blue-100 dark:border-blue-800/30">
                      <span className="text-lg font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <CardDescription>
                    {modulo.totalAulas} aulas · {modulo.duracao}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2 flex-grow">
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    {modulo.descricao}
                  </p>
                  
                  <MotionAccordion type="single" collapsible>
                    <MotionAccordionItem value="topicos">
                      <MotionAccordionTrigger className="text-sm font-medium hover:text-primary">
                        Ver tópicos do módulo
                      </MotionAccordionTrigger>
                      <MotionAccordionContent>
                        <ul className="space-y-2 mt-2 text-sm">
                          {modulo.topicos.map((topico, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{topico.titulo}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </MotionAccordionContent>
                    </MotionAccordionItem>
                  </MotionAccordion>
                </CardContent>
                
                <CardFooter className="pt-2 flex gap-2">
                  <MotionDialog>
                    <MotionDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <motion.div
                          whileHover={{ scale: 1.03, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
                          whileTap={{ scale: 0.97 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="flex items-center gap-1 w-full justify-center"
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Detalhes
                        </motion.div>
                      </Button>
                    </MotionDialogTrigger>
                    <MotionDialogContent className="max-w-2xl">
                      <MotionDialogHeader>
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <MotionDialogTitle>{modulo.titulo}</MotionDialogTitle>
                          <MotionDialogDescription>
                            {modulo.totalAulas} aulas · {modulo.duracao}
                          </MotionDialogDescription>
                        </motion.div>
                      </MotionDialogHeader>
                      
                      <div className="space-y-5">
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-neutral-700 dark:text-neutral-300"
                        >
                          {modulo.detalhes}
                        </motion.p>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
                          className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm"
                        >
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list-checks"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>
                            </span>
                            Tópicos abordados:
                          </h4>
                          <ul className="space-y-2.5">
                            {modulo.topicos.map((topico, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: i * 0.1,
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 15
                                }}
                                className="flex items-start gap-2.5"
                              >
                                <div className="mt-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-indigo-400/80 to-blue-500/80 flex items-center justify-center text-white shadow-sm">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </div>
                                <div>
                                  <span className="font-medium text-neutral-800 dark:text-neutral-200">{topico.titulo}</span>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{topico.descricao}</p>
                                </div>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 15 }}
                          className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm"
                        >
                          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                            </span>
                            Objetivos de aprendizagem:
                          </h4>
                          <ul className="space-y-2.5">
                            {modulo.objetivos?.map((objetivo, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ 
                                  delay: i * 0.1 + 0.3,
                                  type: "spring",
                                  stiffness: 100,
                                  damping: 15
                                }}
                                className="flex items-start gap-2.5"
                              >
                                <div className="mt-0.5 h-5 w-5 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white shadow-sm">
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-neutral-700 dark:text-neutral-300">{objetivo}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                        
                        <motion.div 
                          className="flex justify-end mt-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Link href={`/modulos/${modulo.id}`} className="flex-1">
                            <Button className="w-full hover:bg-black bg-neutral-800" size="sm" asChild>
                              <motion.div
                                whileHover={{ scale: 1.03, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="flex items-center gap-1 w-full justify-center"
                              >
                                <BookOpen className="h-4 w-4 mr-1" />
                                Iniciar
                                <ArrowRight className="h-4 w-4 ml-1" />
                              </motion.div>
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    </MotionDialogContent>
                  </MotionDialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  );
} 