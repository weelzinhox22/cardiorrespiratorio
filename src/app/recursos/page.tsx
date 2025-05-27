"use client";

import { Navigation } from "@/components/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RecursoItem {
  titulo: string;
  descricao: string;
  link?: string;
}

interface CategoriaRecursos {
  [key: string]: RecursoItem[];
}

const recursos: CategoriaRecursos = {
  glossario: [
    {
      titulo: "Anatomia Cardíaca",
      descricao: "Átrio: Câmara superior do coração que recebe o sangue que retorna ao coração.\nVentrículo: Câmara inferior do coração responsável por bombear o sangue para fora do coração.\nSístole: Fase de contração do coração.\nDiástole: Fase de relaxamento do coração.\nPericárdio: Membrana que envolve o coração.",
    },
    {
      titulo: "Fisiologia Respiratória",
      descricao: "Inspiração: Processo de entrada de ar nos pulmões.\nExpiração: Processo de saída de ar dos pulmões.\nCapacidade Vital: Volume máximo de ar que pode ser expirado após uma inspiração máxima.\nVolume Residual: Volume de ar que permanece nos pulmões após uma expiração forçada.\nCompliance Pulmonar: Medida da distensibilidade pulmonar.",
    },
    {
      titulo: "Termos Clínicos",
      descricao: "Dispneia: Sensação de falta de ar.\nHipóxia: Baixo nível de oxigênio nos tecidos.\nTaquicardia: Frequência cardíaca acima do normal (> 100 bpm).\nBradicardia: Frequência cardíaca abaixo do normal (< 60 bpm).\nIsquemia: Redução do fluxo sanguíneo para um tecido ou órgão.",
    }
  ],
  artigos: [
    {
      titulo: "Efeitos da Fisioterapia Respiratória em Pacientes com DPOC",
      descricao: "Revisão sistemática sobre as técnicas de fisioterapia respiratória e seus benefícios em pacientes com Doença Pulmonar Obstrutiva Crônica.",
      link: "https://example.com/artigo1"
    },
    {
      titulo: "Reabilitação Cardíaca Após Infarto Agudo do Miocárdio",
      descricao: "Artigo sobre protocolos de reabilitação cardíaca e seus resultados em pacientes pós-infarto.",
      link: "https://example.com/artigo2"
    },
    {
      titulo: "Ventilação Mecânica: Princípios e Aplicações Clínicas",
      descricao: "Revisão detalhada sobre os princípios da ventilação mecânica e suas aplicações em diferentes condições clínicas.",
      link: "https://example.com/artigo3"
    }
  ],
  videos: [
    {
      titulo: "Anatomia do Coração em 3D",
      descricao: "Vídeo educativo que mostra a anatomia do coração em detalhes com animação 3D.",
      link: "https://example.com/video1"
    },
    {
      titulo: "Mecânica Respiratória Explicada",
      descricao: "Explicação visual dos processos de inspiração e expiração, demonstrando a ação do diafragma e músculos acessórios.",
      link: "https://example.com/video2"
    },
    {
      titulo: "Técnicas de Fisioterapia Respiratória",
      descricao: "Demonstração prática das principais técnicas utilizadas na fisioterapia respiratória.",
      link: "https://example.com/video3"
    }
  ],
  bibliografia: [
    {
      titulo: "Fisioterapia Cardiorrespiratória",
      descricao: "MACHADO, M. G. R. Bases da Fisioterapia Respiratória: Terapia Intensiva e Reabilitação. Rio de Janeiro: Guanabara Koogan, 2018.",
    },
    {
      titulo: "Anatomia Cardíaca",
      descricao: "MOORE, K. L.; DALLEY, A. F.; AGUR, A. M. R. Anatomia Orientada para a Clínica. 8. ed. Rio de Janeiro: Guanabara Koogan, 2019.",
    },
    {
      titulo: "Fisiologia Respiratória",
      descricao: "WEST, J. B. Fisiologia Respiratória: Princípios Básicos. 9. ed. Porto Alegre: Artmed, 2013.",
    }
  ]
};

// Variantes de animação
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

export default function RecursosPage() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto py-10 px-4 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Recursos Adicionais</h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            Explore recursos complementares para aprofundar seus conhecimentos em fisioterapia cardiorrespiratória.
          </p>
        </motion.div>

        <Tabs defaultValue="glossario" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="glossario">Glossário</TabsTrigger>
            <TabsTrigger value="artigos">Artigos</TabsTrigger>
            <TabsTrigger value="videos">Vídeos</TabsTrigger>
            <TabsTrigger value="bibliografia">Bibliografia</TabsTrigger>
          </TabsList>
          
          {Object.keys(recursos).map((categoria) => (
            <TabsContent key={categoria} value={categoria}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {recursos[categoria].map((item, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="h-full border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle>{item.titulo}</CardTitle>
                        {categoria === 'artigos' || categoria === 'videos' ? (
                          <CardDescription>{item.descricao}</CardDescription>
                        ) : null}
                      </CardHeader>
                      <CardContent>
                        {categoria === 'glossario' || categoria === 'bibliografia' ? (
                          <div className="whitespace-pre-line">
                            {item.descricao}
                          </div>
                        ) : null}
                        
                        {item.link && (
                          <div className="mt-4">
                            <Link href={item.link} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm">
                                Acessar {categoria === 'artigos' ? 'Artigo' : 'Vídeo'} →
                              </Button>
                            </Link>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </>
  );
} 