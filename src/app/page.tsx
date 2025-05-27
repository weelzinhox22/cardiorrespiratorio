"use client";

import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto py-10 px-4 max-w-6xl">
        <section className="flex flex-col md:flex-row gap-8 py-12">
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
                <Button size="lg" className="w-full sm:w-auto">
                  Iniciar Estudos
                </Button>
              </Link>
              <Link href="/questoes">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Testar Conhecimentos
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

        <motion.section 
          className="py-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-neutral-900 dark:text-neutral-50">
            O que você encontrará aqui
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
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
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md border border-neutral-200 dark:border-neutral-700"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900 dark:text-neutral-50">{item.title}</h3>
                <p className="text-neutral-700 dark:text-neutral-300 mb-4">{item.description}</p>
                <Link href={item.link}>
                  <Button variant="link" className="p-0">
                    Acessar →
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  );
}
