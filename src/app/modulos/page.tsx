"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTrail, animated, config } from "@react-spring/web";
import Link from "next/link";
import { useState } from "react";
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

// Variantes para animações de botões
const buttonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)",
    backgroundColor: "var(--primary)" 
  },
  hover: { 
    scale: 1.03, 
    boxShadow: "0px 5px 15px rgba(0,0,0,0.15)",
    backgroundColor: "var(--primary-dark)",
    transition: {
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  },
  tap: { 
    scale: 0.97, 
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    transition: {
      type: "spring", 
      stiffness: 500, 
      damping: 15
    }
  }
};

export default function Modulos() {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  
  // Configuração do React Spring para a animação em cascata
  const trail = useTrail(modulos.length, {
    from: { opacity: 0, y: 60, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { mass: 1.2, tension: 180, friction: 24 },
    delay: 300,
  });

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trail.map((style, index) => (
            <MotionCard
              key={modulos[index].id}
              className="overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1
              }}
            >
              <Card className="h-full border-0 flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{modulos[index].titulo}</CardTitle>
                    <div className="rounded-full w-8 h-8 flex items-center justify-center bg-primary/10 text-primary">
                      {index + 1}
                    </div>
                  </div>
                  <CardDescription>
                    {modulos[index].totalAulas} aulas · {modulos[index].duracao}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2 flex-grow">
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4">
                    {modulos[index].descricao}
                  </p>
                  
                  <MotionAccordion type="single" collapsible>
                    <MotionAccordionItem value="topicos">
                      <MotionAccordionTrigger className="text-sm font-medium hover:text-primary">
                        Ver tópicos do módulo
                      </MotionAccordionTrigger>
                      <MotionAccordionContent>
                        <ul className="space-y-2 mt-2 text-sm">
                          {modulos[index].topicos.map((topico, i) => (
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
                        <MotionHover
                          type="subtle"
                          className="flex items-center gap-1"
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Detalhes
                        </MotionHover>
                      </Button>
                    </MotionDialogTrigger>
                    <MotionDialogContent>
                      <MotionDialogHeader>
                        <MotionDialogTitle>{modulos[index].titulo}</MotionDialogTitle>
                        <MotionDialogDescription>
                          {modulos[index].totalAulas} aulas · {modulos[index].duracao}
                        </MotionDialogDescription>
                      </MotionDialogHeader>
                      
                      <div className="space-y-4">
                        <p>{modulos[index].detalhes}</p>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Tópicos abordados:</h4>
                          <ul className="space-y-2">
                            {modulos[index].topicos.map((topico, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span>{topico.descricao}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Objetivos de aprendizagem:</h4>
                          <ul className="space-y-2">
                            {modulos[index].objetivos?.map((objetivo, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="flex items-start gap-2"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{objetivo}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </MotionDialogContent>
                  </MotionDialog>
                  
                  <Link href={`/modulos/${modulos[index].id}`} className="flex-1">
                    <Button className="w-full" size="sm">
                      <MotionHover
                        type="primary"
                        className="flex items-center gap-1 w-full justify-center"
                      >
                        <BookOpen className="h-4 w-4 mr-1" />
                        Iniciar
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </MotionHover>
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </MotionCard>
          ))}
        </div>
      </main>
    </>
  );
} 