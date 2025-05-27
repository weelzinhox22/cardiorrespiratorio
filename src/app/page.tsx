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

// Variantes para links
const linkVariants = {
  initial: { x: 0 },
  hover: { 
    x: 5,
    color: "#2563eb",
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

// Variantes para os cards
const cardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
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
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500 dark:text-blue-400">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 7h6M8 11h8M8 15h5" strokeLinecap="round"/>
        </svg>
      ),
      link: "/modulos"
    },
    {
      title: "Banco de Questões",
      description: "Pratique com questões de múltipla escolha e verdadeiro/falso para testar seus conhecimentos.",
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500 dark:text-purple-400">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 10.6c0-1 .8-1.8 1.8-1.8h2.4c1 0 1.8.8 1.8 1.8v0c0 1-.8 1.8-1.8 1.8h-1.2v1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      link: "/questoes"
    },
    {
      title: "Recursos Adicionais",
      description: "Glossários, artigos, vídeos e outros materiais complementares para aprofundar seu aprendizado.",
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-500 dark:text-red-400">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 5v3M5 12h3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
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
        <section className="flex flex-col md:flex-row gap-8 py-12 min-h-[80vh] items-center bg-gradient-to-br from-white to-blue-50 dark:from-neutral-950 dark:to-blue-950/20">
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold mb-6 text-neutral-900 dark:text-neutral-50 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              Bem-vindo ao Portal de Estudos em Fisioterapia Cardiorrespiratória
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 text-neutral-700 dark:text-neutral-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            >
              Este é um espaço dedicado ao aprendizado e aprofundamento dos seus conhecimentos em fisioterapia cardiorrespiratória. 
              Aqui você encontrará material organizado, questões de estudo e recursos complementares.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
            >
              <Link href="/modulos">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-neutral-800"
                  asChild
                >
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                    whileHover={{ scale: 1.03, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
            transition={{ delay: 0.8, duration: 0.7, type: "spring", stiffness: 100 }}
          >
            <div className="relative w-full max-w-md h-[350px] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
              {/* Ícone de ECG animado */}
              <motion.svg 
                viewBox="0 0 200 100" 
                className="absolute w-full h-full opacity-20"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, delay: 1.2, ease: "easeInOut" }}
              >
                <motion.path 
                  d="M0,50 L30,50 L40,20 L50,80 L60,35 L70,50 L100,50 L110,50 L120,20 L130,80 L140,35 L150,50 L180,50 L200,50"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-red-500 dark:text-red-400"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, delay: 1.5, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                />
              </motion.svg>
              
              {/* Ícone de coração pulsante */}
              <motion.div
                className="absolute top-10 right-10 text-red-500 dark:text-red-400 opacity-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.1, 1] }}
                transition={{ 
                  opacity: { delay: 1.8, duration: 2, repeat: Infinity, repeatType: "reverse" },
                  scale: { delay: 1.8, duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
              
              {/* Ícone de pulmões */}
              <motion.div
                className="absolute bottom-10 left-10 text-blue-500 dark:text-blue-400 opacity-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: [0.2, 0.3, 0.2],
                  scale: [1, 1.05, 1], 
                  y: [0, -5, 0]
                }}
                transition={{ 
                  delay: 2,
                  duration: 4, 
                  repeat: Infinity, 
                  repeatType: "reverse" 
                }}
              >
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5,15.35V8.66C15.5,6.09 12.42,4 9.5,4C6.58,4 3.5,6.09 3.5,8.66V15.35C2.58,15.82 2,16.79 2,17.89V19.5H17V17.89C17,16.79 16.42,15.82 15.5,15.35M5.5,15.2V8.66C5.5,7.21 7.31,6 9.5,6C11.69,6 13.5,7.21 13.5,8.66V15.2C12.84,15.07 12.18,15 11.5,15H7.5C6.82,15 6.16,15.07 5.5,15.2M16.72,15.47L16,16.32L17.23,17.21L15.88,19L17.05,19.91L18.4,18.12L19.43,18.91L19.93,17L17.72,15.47M20.91,18.9L22,20.5H17.63L16,19.05L15.12,18.27L17.68,17.17L18.47,17.74L19.97,16.63L20.91,18.9Z" />
                </svg>
              </motion.div>
              
              <motion.div 
                className="z-10 text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-200">
                  Fisioterapia Cardiorrespiratória
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Uma abordagem especializada para reabilitação e prevenção de disfunções cardíacas e respiratórias.
                </p>
              </motion.div>
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
          
          {/* Cards com animação de entrada em cascata */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={cardsContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-white dark:bg-neutral-800 p-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200 dark:border-neutral-700 h-full flex flex-col relative overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                {/* Elemento decorativo de fundo */}
                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-50"></div>
                
                <motion.div 
                  className="relative z-10 mb-4"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20, 
                    delay: 0.1 + index * 0.1 
                  }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-50 relative z-10">{card.title}</h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-5 flex-grow relative z-10">{card.description}</p>
                <Link href={card.link} className="relative z-10">
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
                        initial={{ x: 0 }}
                        whileHover={{ 
                          x: [0, 5], 
                          transition: { 
                            repeat: Infinity, 
                            repeatType: "reverse", 
                            duration: 0.6 
                          } 
                        }}
                        className="ml-1 inline-block"
                      >
                        →
                      </motion.span>
                    </motion.div>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
                  whileHover={{ scale: 1.03, boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
