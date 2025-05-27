"use client";

import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTrail, animated } from "@react-spring/web";
import Link from "next/link";
import { useRef } from "react";

// Variantes para animações de entrada em cascata
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
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

// Variantes para a seção de descrição
const descriptionVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Variantes para animações de botões
const buttonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0)" 
  },
  hover: { 
    scale: 1.05, 
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    backgroundColor: "#000000",
    transition: {
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  },
  tap: { 
    scale: 0.95, 
    boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
    backgroundColor: "#000000",
    transition: {
      type: "spring", 
      stiffness: 500, 
      damping: 15
    }
  }
};

// Variantes para links
const linkVariants = {
  initial: { x: 0 },
  hover: { 
    x: 5,
    transition: {
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  },
  tap: { 
    x: 2,
    transition: {
      type: "spring", 
      stiffness: 400, 
      damping: 10
    }
  }
};

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  
  // Dados dos cards
  const cards = [
    {
      title: "Módulos de Estudo",
      description: "Conteúdo organizado por temas, com material teórico baseado nos slides da professora.",
      icon: "📚",
      link: "/modulos"
    },
    {
      title: "Banco de Questões",
      description: "Pratique com questões de múltipla escolha e verdadeiro/falso para testar seus conhecimentos.",
      icon: "❓",
      link: "/questoes"
    },
    {
      title: "Recursos Adicionais",
      description: "Glossários, artigos, vídeos e outros materiais complementares para aprofundar seu aprendizado.",
      icon: "📋",
      link: "/recursos"
    }
  ];
  
  // Configuração do React Spring para a animação em cascata
  const trail = useTrail(cards.length, {
    from: { opacity: 0, y: 80, scale: 0.9 },
    to: { opacity: 1, y: 0, scale: 1 },
    config: { mass: 1, tension: 280, friction: 26 },
    delay: 300,
  });

  return (
    <>
      <Navigation />
      <main className="container mx-auto py-10 px-4 max-w-6xl">
        <section className="flex flex-col md:flex-row gap-8 py-12 min-h-[80vh] items-center">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-neutral-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Bem-vindo ao Portal de Estudos em Fisioterapia Cardiorrespiratória
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 text-neutral-700 dark:text-neutral-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Este é um espaço dedicado ao aprendizado e aprofundamento dos seus conhecimentos em fisioterapia cardiorrespiratória. 
              Aqui você encontrará material organizado, questões de estudo e recursos complementares.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href="/modulos">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-neutral-800"
                  asChild
                >
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    className="px-6 py-2 flex items-center justify-center"
                  >
                    Iniciar Estudos
                  </motion.div>
                </Button>
              </Link>
              <Link href="/questoes">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  asChild
                >
                  <motion.div
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    className="px-6 py-2 flex items-center justify-center"
                  >
                    Testar Conhecimentos
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <div className="relative w-full max-w-md h-[300px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
              <svg 
                viewBox="0 0 200 200" 
                className="w-full h-full absolute opacity-20"
              >
                <path 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3"
                  d="M50,100 A50,50 0 1,1 150,100 A50,50 0 1,1 50,100 Z" 
                  className="text-blue-500 dark:text-blue-300"
                />
                <motion.path 
                  d="M100,90 Q120,60 140,90 T180,90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-red-500 dark:text-red-300"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
              </svg>
              <div className="z-10 text-center p-6">
                <h3 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-200">
                  Fisioterapia Cardiorrespiratória
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Uma abordagem especializada para reabilitação e prevenção de disfunções cardíacas e respiratórias.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Seção de descrição da Fisioterapia Cardiorrespiratória */}
        <motion.section 
          ref={descriptionRef}
          className="py-16 bg-neutral-50 dark:bg-neutral-900 rounded-xl p-8 my-12"
          variants={descriptionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-6 text-center text-neutral-900 dark:text-neutral-50"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            Fisioterapia Cardiorrespiratória
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">O que é?</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                A fisioterapia cardiorrespiratória é uma especialidade que atua na prevenção e reabilitação de disfunções cardíacas, 
                pulmonares e circulatórias. Utiliza técnicas específicas para melhorar a capacidade funcional e qualidade de vida 
                dos pacientes.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50">Importância Clínica</h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                É fundamental no tratamento de condições como DPOC, asma, insuficiência cardíaca, pós-operatório de cirurgias cardíacas 
                e pulmonares, além de contribuir para a reabilitação após eventos como AVC e infarto do miocárdio.
              </p>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section 
          ref={targetRef}
          className="py-16"
          style={{ opacity, scale, y }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-8 text-center text-neutral-900 dark:text-neutral-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            O que você encontrará aqui
          </motion.h2>
          
          {/* React Spring Cards com efeito de trail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trail.map((style, index) => (
              <animated.div
                key={index}
                style={style}
                className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700 h-full flex flex-col"
                onMouseEnter={() => {
                  document.body.style.cursor = "pointer";
                }}
                onMouseLeave={() => {
                  document.body.style.cursor = "default";
                }}
              >
                <animated.div 
                  className="text-4xl mb-4"
                  style={{
                    transform: style.scale.to(s => `scale(${s})`)
                  }}
                >
                  {cards[index].icon}
                </animated.div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">{cards[index].title}</h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4 flex-grow">{cards[index].description}</p>
                <Link href={cards[index].link}>
                  <Button variant="link" className="p-0 group" asChild>
                    <motion.div
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      variants={linkVariants}
                      className="flex items-center text-primary"
                    >
                      Acessar 
                      <motion.span
                        initial={{ x: 0, opacity: 1 }}
                        animate={{ x: [0, 5, 0], opacity: 1 }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "mirror", 
                          duration: 1.5,
                          repeatDelay: 0.5
                        }}
                        className="ml-1"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </Button>
                </Link>
              </animated.div>
            ))}
          </div>
        </motion.section>
        
        <motion.section 
          className="py-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Comece sua jornada de aprendizado
          </motion.h2>
          <motion.p 
            className="text-lg mb-8 max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Escolha um módulo de estudo para começar a explorar os conceitos fundamentais da fisioterapia cardiorrespiratória.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/modulos">
              <Button size="lg" className="px-8 bg-neutral-800" asChild>
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  className="px-8 py-2 flex items-center justify-center"
                >
                  Explorar Módulos
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
