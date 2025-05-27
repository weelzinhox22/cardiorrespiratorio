"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const modulos = [
  {
    id: "anatomia-cardiaca",
    titulo: "Módulo 1: Anatomia Cardíaca",
    descricao: "Estudo da estrutura e organização do coração, incluindo câmaras, válvulas, vasos principais e sistema de condução.",
    imagem: "/modulos/coracao.jpg"
  },
  {
    id: "fisiologia-respiratoria",
    titulo: "Módulo 2: Fisiologia Respiratória",
    descricao: "Estudo dos mecanismos de respiração, troca gasosa, volumes e capacidades pulmonares.",
    imagem: "/modulos/pulmao.jpg"
  },
  {
    id: "avaliacao-cardiorrespiratoria",
    titulo: "Módulo 3: Avaliação Cardiorrespiratória",
    descricao: "Métodos e técnicas para avaliação da função cardíaca e respiratória, incluindo testes e medidas.",
    imagem: "/modulos/avaliacao.jpg"
  },
  {
    id: "fisioterapia-respiratoria",
    titulo: "Módulo 4: Fisioterapia Respiratória",
    descricao: "Técnicas e procedimentos para tratamento de disfunções respiratórias.",
    imagem: "/modulos/fisioterapia.jpg"
  },
  {
    id: "reabilitacao-cardiaca",
    titulo: "Módulo 5: Reabilitação Cardíaca",
    descricao: "Programas de reabilitação para pacientes com doenças cardiovasculares.",
    imagem: "/modulos/reabilitacao.jpg"
  },
  {
    id: "ventilacao-mecanica",
    titulo: "Módulo 6: Ventilação Mecânica",
    descricao: "Princípios e aplicações da ventilação mecânica em pacientes com insuficiência respiratória.",
    imagem: "/modulos/ventilacao.jpg"
  }
];

// Variante de animação para os cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function Modulos() {
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
            Explore os módulos disponíveis para aprofundar seus conhecimentos em fisioterapia cardiorrespiratória.
            Cada módulo contém material teórico, ilustrações e informações baseadas nos slides da professora.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {modulos.map((modulo) => (
            <motion.div key={modulo.id} variants={itemVariants}>
              <Card className="h-full overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-all hover:shadow-lg">
                <div className="h-48 bg-neutral-200 dark:bg-neutral-800 relative">
                  {/* Placeholder para imagem */}
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>{modulo.titulo}</CardTitle>
                  <CardDescription className="line-clamp-2">{modulo.descricao}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link href={`/modulos/${modulo.id}`} className="w-full">
                    <Button className="w-full">Acessar Módulo</Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  );
} 