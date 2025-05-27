"use client";

import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

interface Questao {
  id: number;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: number;
  explicacao: string;
  modulo: string;
}

const questoes: Questao[] = [
  {
    id: 1,
    pergunta: "Qual estrutura é conhecida como o 'marcapasso natural' do coração?",
    opcoes: [
      "Nódulo Sinusal (Nó SA)",
      "Nódulo Atrioventricular (Nó AV)",
      "Feixe de His",
      "Fibras de Purkinje"
    ],
    respostaCorreta: 0,
    explicacao: "O Nódulo Sinusal (Nó SA) é o marcapasso natural do coração, localizado na parede do átrio direito. Ele gera o impulso elétrico que inicia cada batimento cardíaco.",
    modulo: "Anatomia Cardíaca"
  },
  {
    id: 2,
    pergunta: "Qual é a função da válvula mitral?",
    opcoes: [
      "Controlar o fluxo entre o ventrículo direito e a artéria pulmonar",
      "Controlar o fluxo entre o átrio direito e o ventrículo direito",
      "Controlar o fluxo entre o átrio esquerdo e o ventrículo esquerdo",
      "Controlar o fluxo entre o ventrículo esquerdo e a aorta"
    ],
    respostaCorreta: 2,
    explicacao: "A válvula mitral (também chamada de válvula bicúspide) controla o fluxo sanguíneo entre o átrio esquerdo e o ventrículo esquerdo, impedindo o refluxo durante a contração ventricular.",
    modulo: "Anatomia Cardíaca"
  },
  {
    id: 3,
    pergunta: "Durante a inspiração normal e tranquila, o principal músculo que atua é:",
    opcoes: [
      "Esternocleidomastoideo",
      "Diafragma",
      "Intercostais internos",
      "Reto abdominal"
    ],
    respostaCorreta: 1,
    explicacao: "O diafragma é o principal músculo da respiração. Durante a inspiração, ele se contrai e desce, aumentando o volume da cavidade torácica e criando pressão negativa que permite a entrada de ar nos pulmões.",
    modulo: "Fisiologia Respiratória"
  },
  {
    id: 4,
    pergunta: "O volume de ar que permanece nos pulmões após uma expiração forçada é chamado de:",
    opcoes: [
      "Volume Corrente",
      "Volume de Reserva Expiratória",
      "Volume Residual",
      "Capacidade Vital"
    ],
    respostaCorreta: 2,
    explicacao: "O Volume Residual (VR) é o volume de ar que permanece nos pulmões mesmo após uma expiração forçada. Este volume não pode ser expirado e permanece nos pulmões para evitar que eles colapsem.",
    modulo: "Fisiologia Respiratória"
  },
  {
    id: 5,
    pergunta: "Qual das seguintes câmaras cardíacas recebe sangue oxigenado vindo dos pulmões?",
    opcoes: [
      "Átrio direito",
      "Ventrículo direito",
      "Átrio esquerdo",
      "Ventrículo esquerdo"
    ],
    respostaCorreta: 2,
    explicacao: "O átrio esquerdo recebe sangue oxigenado vindo dos pulmões através das veias pulmonares. Este sangue é então bombeado para o ventrículo esquerdo e, em seguida, distribuído para todo o corpo através da aorta.",
    modulo: "Anatomia Cardíaca"
  }
];

export default function QuestoesPage() {
  const [questaoAtual, setQuestaoAtual] = useState<number>(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [mostrarExplicacao, setMostrarExplicacao] = useState<boolean>(false);
  const [pontuacao, setPontuacao] = useState<number>(0);
  const [quizFinalizado, setQuizFinalizado] = useState<boolean>(false);

  const verificarResposta = () => {
    if (respostaSelecionada === null) {
      toast.error("Por favor, selecione uma resposta!");
      return;
    }

    setMostrarExplicacao(true);
    
    if (respostaSelecionada === questoes[questaoAtual].respostaCorreta) {
      setPontuacao(prev => prev + 1);
      toast.success("Resposta correta!");
    } else {
      toast.error("Resposta incorreta!");
    }
  };

  const proximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(prev => prev + 1);
      setRespostaSelecionada(null);
      setMostrarExplicacao(false);
    } else {
      setQuizFinalizado(true);
    }
  };

  const reiniciarQuiz = () => {
    setQuestaoAtual(0);
    setRespostaSelecionada(null);
    setMostrarExplicacao(false);
    setPontuacao(0);
    setQuizFinalizado(false);
  };

  return (
    <>
      <Navigation />
      <main className="container mx-auto py-10 px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Banco de Questões</h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            Teste seus conhecimentos em fisioterapia cardiorrespiratória respondendo às questões abaixo.
          </p>
        </motion.div>

        {!quizFinalizado ? (
          <motion.div
            key={questaoAtual}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 border border-neutral-200 dark:border-neutral-700">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Questão {questaoAtual + 1} de {questoes.length} • {questoes[questaoAtual].modulo}
                  </span>
                  <h2 className="text-xl font-bold mt-2 mb-4">{questoes[questaoAtual].pergunta}</h2>
                  
                  <div className="space-y-3">
                    {questoes[questaoAtual].opcoes.map((opcao, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Button
                          variant="outline"
                          className={`w-full justify-start p-4 h-auto text-left ${
                            respostaSelecionada === index
                              ? mostrarExplicacao
                                ? index === questoes[questaoAtual].respostaCorreta
                                  ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-700"
                                  : "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-700"
                                : "bg-blue-100 border-blue-500 dark:bg-blue-900/30 dark:border-blue-700"
                              : mostrarExplicacao && index === questoes[questaoAtual].respostaCorreta
                              ? "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-700"
                              : ""
                          }`}
                          onClick={() => !mostrarExplicacao && setRespostaSelecionada(index)}
                          disabled={mostrarExplicacao}
                        >
                          <div className="flex items-start">
                            <span className="text-lg font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                            <span>{opcao}</span>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {mostrarExplicacao && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg mb-4"
                  >
                    <h3 className="font-bold mb-2">Explicação:</h3>
                    <p>{questoes[questaoAtual].explicacao}</p>
                  </motion.div>
                )}
                
                <div className="flex justify-end gap-4">
                  {!mostrarExplicacao ? (
                    <Button onClick={verificarResposta}>Verificar Resposta</Button>
                  ) : (
                    <Button onClick={proximaQuestao}>
                      {questaoAtual < questoes.length - 1 ? "Próxima Questão" : "Finalizar Quiz"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center text-neutral-500 dark:text-neutral-400">
              <p>Pontuação atual: {pontuacao} de {questaoAtual + (mostrarExplicacao ? 1 : 0)}</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <h2 className="text-3xl font-bold mb-6">Quiz Finalizado!</h2>
            <p className="text-xl mb-8">
              Sua pontuação final: {pontuacao} de {questoes.length} ({Math.round((pontuacao / questoes.length) * 100)}%)
            </p>
            
            <div className="mb-10">
              {pontuacao === questoes.length ? (
                <p className="text-green-600 dark:text-green-400 font-medium">Parabéns! Você acertou todas as questões!</p>
              ) : pontuacao >= questoes.length * 0.7 ? (
                <p className="text-green-600 dark:text-green-400 font-medium">Muito bom! Você está no caminho certo.</p>
              ) : pontuacao >= questoes.length * 0.5 ? (
                <p className="text-yellow-600 dark:text-yellow-400 font-medium">Bom trabalho, mas ainda há espaço para melhorar.</p>
              ) : (
                <p className="text-red-600 dark:text-red-400 font-medium">Você precisa estudar mais. Revise o conteúdo dos módulos.</p>
              )}
            </div>
            
            <Button onClick={reiniciarQuiz} size="lg">
              Tentar Novamente
            </Button>
          </motion.div>
        )}
      </main>
    </>
  );
} 