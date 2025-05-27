"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SpinnerLoading, ProgressLoading, LoadingContainer } from "@/components/ui/motion-loading";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Home, RotateCcw } from "lucide-react";

// Tipos para as questões
interface Alternativa {
  id: string;
  texto: string;
  correta: boolean;
}

interface Questao {
  id: number;
  titulo: string;
  tipo: string;
  dificuldade: string;
  conteudo: string;
  alternativas: Alternativa[];
  explicacao: string;
}

// Exemplo de questões (será substituído por dados reais no futuro)
const questoesData: Questao[] = [
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
    tipo: "Múltipla Escolha",
    dificuldade: "Fácil",
    conteudo: "Qual volume pulmonar representa a quantidade de ar que permanece nos pulmões após uma expiração forçada?",
    alternativas: [
      { id: "a", texto: "Volume corrente", correta: false },
      { id: "b", texto: "Volume residual", correta: true },
      { id: "c", texto: "Volume de reserva inspiratório", correta: false },
      { id: "d", texto: "Capacidade vital", correta: false }
    ],
    explicacao: "O volume residual é o volume de ar que permanece nos pulmões após uma expiração forçada. Este volume não pode ser medido por espirometria simples e representa aproximadamente 1200ml em um adulto médio."
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
  },
  {
    id: 4,
    titulo: "Anatomia Cardíaca",
    tipo: "Múltipla Escolha",
    dificuldade: "Média",
    conteudo: "Qual estrutura é responsável pela geração do impulso elétrico normal que inicia o batimento cardíaco?",
    alternativas: [
      { id: "a", texto: "Nódulo sinoatrial (SA)", correta: true },
      { id: "b", texto: "Nódulo atrioventricular (AV)", correta: false },
      { id: "c", texto: "Feixe de His", correta: false },
      { id: "d", texto: "Fibras de Purkinje", correta: false }
    ],
    explicacao: "O nódulo sinoatrial (SA), localizado na parede do átrio direito próximo à entrada da veia cava superior, é o 'marcapasso natural' do coração. Ele gera espontaneamente impulsos elétricos que iniciam cada batimento cardíaco, determinando o ritmo cardíaco normal (ritmo sinusal)."
  },
  {
    id: 5,
    titulo: "Mecânica Respiratória",
    tipo: "Múltipla Escolha",
    dificuldade: "Média",
    conteudo: "Durante a inspiração tranquila, qual é o principal músculo responsável pelo aumento do volume torácico?",
    alternativas: [
      { id: "a", texto: "Músculos intercostais externos", correta: false },
      { id: "b", texto: "Diafragma", correta: true },
      { id: "c", texto: "Músculos escalenos", correta: false },
      { id: "d", texto: "Músculos esternocleidomastóideos", correta: false }
    ],
    explicacao: "O diafragma é o principal músculo da respiração, responsável por cerca de 70% do trabalho respiratório durante a respiração tranquila. Quando se contrai, ele se move para baixo, aumentando o volume da cavidade torácica verticalmente, o que cria pressão negativa e permite a entrada de ar nos pulmões."
  }
];

export default function QuestoesResolucao() {
  const [loading, setLoading] = useState(true);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
  const [respostas, setRespostas] = useState<(string | null)[]>([]);
  const [mostrarExplicacao, setMostrarExplicacao] = useState(false);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [pontuacao, setPontuacao] = useState(0);
  
  // Efeitos de animação
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };
  
  const buttonVariants = {
    initial: { 
      scale: 1,
      backgroundColor: "var(--primary)",
      color: "white"
    },
    hover: { 
      scale: 1.02,
      boxShadow: "0px 3px 10px rgba(0,0,0,0.1)",
      transition: {
        type: "spring", 
        stiffness: 400, 
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
      transition: {
        type: "spring", 
        stiffness: 500, 
        damping: 15
      }
    },
    selected: {
      backgroundColor: "var(--primary-light)",
      scale: 1.03,
      boxShadow: "0px 3px 10px rgba(0,0,0,0.15)"
    },
    correct: {
      backgroundColor: "var(--green-600)",
      scale: 1.03
    },
    incorrect: {
      backgroundColor: "var(--red-600)",
      scale: 0.98
    }
  };

  // Carregar questões
  useEffect(() => {
    async function carregarQuestoes() {
      setLoading(true);
      
      // Simular carregamento de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Inicializar o array de respostas com null para cada questão
      setQuestoes(questoesData);
      setRespostas(new Array(questoesData.length).fill(null));
      setLoading(false);
    }
    
    carregarQuestoes();
  }, []);

  // Verificar resposta
  const verificarResposta = () => {
    if (respostaSelecionada === null) return;
    
    // Atualizar o array de respostas
    const novasRespostas = [...respostas];
    novasRespostas[questaoAtual] = respostaSelecionada;
    setRespostas(novasRespostas);
    
    // Mostrar explicação
    setMostrarExplicacao(true);
    
    // Verificar se a resposta está correta
    const alternativaCorreta = questoes[questaoAtual].alternativas.find(alt => alt.correta);
    if (alternativaCorreta && respostaSelecionada === alternativaCorreta.id) {
      // Atualizar pontuação apenas se for a primeira vez respondendo esta questão ou se a resposta anterior estava errada
      if (respostas[questaoAtual] === null || respostas[questaoAtual] !== alternativaCorreta.id) {
        setPontuacao(prev => prev + 1);
      }
    }
  };

  // Navegar para próxima questão
  const proximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(prev => prev + 1);
      setRespostaSelecionada(respostas[questaoAtual + 1]);
      setMostrarExplicacao(respostas[questaoAtual + 1] !== null);
    } else {
      setQuizFinalizado(true);
    }
  };

  // Navegar para questão anterior
  const questaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(prev => prev - 1);
      setRespostaSelecionada(respostas[questaoAtual - 1]);
      setMostrarExplicacao(respostas[questaoAtual - 1] !== null);
    }
  };

  // Reiniciar quiz
  const reiniciarQuiz = () => {
    setQuestaoAtual(0);
    setRespostaSelecionada(null);
    setRespostas(new Array(questoes.length).fill(null));
    setMostrarExplicacao(false);
    setQuizFinalizado(false);
    setPontuacao(0);
  };
  
  // Selecionar alternativa
  const selecionarAlternativa = (id: string) => {
    // Se já respondeu, não permite alterar
    if (mostrarExplicacao) return;
    
    setRespostaSelecionada(id);
  };
  
  // Verificar se uma alternativa está correta
  const estaCorreta = (alternativa: Alternativa) => {
    return mostrarExplicacao && alternativa.correta;
  };
  
  // Verificar se uma alternativa foi selecionada incorretamente
  const estaIncorreta = (alternativa: Alternativa) => {
    return mostrarExplicacao && respostaSelecionada === alternativa.id && !alternativa.correta;
  };
  
  // Calcular porcentagem de questões respondidas
  const porcentagemRespondidas = respostas.filter(r => r !== null).length / respostas.length * 100;

  return (
    <>
      <Navigation />
      <main className="container mx-auto py-8 px-4 max-w-4xl">
        {loading ? (
          <LoadingContainer>
            <SpinnerLoading size="lg" />
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">Carregando questões...</p>
          </LoadingContainer>
        ) : !quizFinalizado ? (
          <div className="space-y-6">
            {/* Indicador de progresso */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Questão {questaoAtual + 1} de {questoes.length}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-500">
                  • {questoes[questaoAtual].dificuldade}
                </span>
              </div>
              
              <div className="w-full sm:w-64">
                <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: `${porcentagemRespondidas}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-neutral-500">
                  <span>{respostas.filter(r => r !== null).length} respondidas</span>
                  <span>{pontuacao} corretas</span>
                </div>
              </div>
            </div>
            
            {/* Card da questão */}
            <AnimatePresence mode="wait">
              <motion.div
                key={questaoAtual}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Card className="border border-neutral-200 dark:border-neutral-700 shadow-sm">
                  <CardHeader className="pb-2">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
                      {questoes[questaoAtual].titulo}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {questoes[questaoAtual].tipo}
                    </p>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-lg mb-6 text-neutral-800 dark:text-neutral-200">
                      {questoes[questaoAtual].conteudo}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      {questoes[questaoAtual].alternativas.map((alternativa) => (
                        <motion.div
                          key={alternativa.id}
                          onClick={() => selecionarAlternativa(alternativa.id)}
                          className={`relative p-4 border rounded-md cursor-pointer transition-all ${
                            respostaSelecionada === alternativa.id 
                              ? 'border-primary' 
                              : 'border-neutral-200 dark:border-neutral-700'
                          } ${
                            estaCorreta(alternativa)
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                              : estaIncorreta(alternativa)
                                ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                                : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                          }`}
                          initial="initial"
                          whileHover={mostrarExplicacao ? {} : "hover"}
                          whileTap={mostrarExplicacao ? {} : "tap"}
                          animate={
                            estaCorreta(alternativa) 
                              ? "correct" 
                              : estaIncorreta(alternativa) 
                                ? "incorrect" 
                                : respostaSelecionada === alternativa.id 
                                  ? "selected" 
                                  : "initial"
                          }
                        >
                          <div className="flex items-start gap-3">
                            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                              respostaSelecionada === alternativa.id 
                                ? 'border-primary bg-primary text-white' 
                                : 'border-neutral-300 dark:border-neutral-600'
                            } ${
                              estaCorreta(alternativa)
                                ? 'border-green-500 bg-green-500 text-white'
                                : estaIncorreta(alternativa)
                                  ? 'border-red-500 bg-red-500 text-white'
                                  : ''
                            }`}>
                              {alternativa.id}
                            </div>
                            
                            <div className="flex-1">
                              <p className="text-neutral-800 dark:text-neutral-200">
                                {alternativa.texto}
                              </p>
                            </div>
                            
                            {mostrarExplicacao && (
                              <div className="ml-2">
                                {alternativa.correta ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : respostaSelecionada === alternativa.id ? (
                                  <XCircle className="h-5 w-5 text-red-500" />
                                ) : null}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Explicação */}
                    <AnimatePresence>
                      {mostrarExplicacao && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md"
                        >
                          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">Explicação:</h3>
                          <p className="text-neutral-800 dark:text-neutral-200">
                            {questoes[questaoAtual].explicacao}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-2 flex-wrap gap-3">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={questaoAnterior}
                        disabled={questaoAtual === 0}
                        className="flex items-center gap-1"
                      >
                        <ArrowLeft className="h-4 w-4" /> Anterior
                      </Button>
                      
                      {!mostrarExplicacao ? (
                        <Button 
                          onClick={verificarResposta}
                          disabled={respostaSelecionada === null}
                          className="bg-primary hover:bg-primary/90"
                        >
                          Verificar
                        </Button>
                      ) : (
                        <Button 
                          onClick={proximaQuestao}
                          className="bg-primary hover:bg-primary/90 flex items-center gap-1"
                        >
                          {questaoAtual < questoes.length - 1 ? (
                            <>Próxima <ArrowRight className="h-4 w-4" /></>
                          ) : (
                            "Finalizar"
                          )}
                        </Button>
                      )}
                    </div>
                    
                    <Link href="/questoes">
                      <Button variant="ghost" className="text-neutral-600 hover:text-neutral-900">
                        Voltar para o Banco
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-10"
          >
            <Card className="border border-neutral-200 dark:border-neutral-700 max-w-2xl mx-auto">
              <CardHeader>
                <h2 className="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50 mb-2">
                  Resultados
                </h2>
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        className="text-neutral-200 dark:text-neutral-800 stroke-current" 
                        strokeWidth="10" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                      />
                      <motion.circle 
                        className="text-primary stroke-current" 
                        strokeWidth="10" 
                        fill="transparent" 
                        r="40" 
                        cx="50" 
                        cy="50" 
                        strokeDasharray={2 * Math.PI * 40}
                        strokeDashoffset={2 * Math.PI * 40 * (1 - pontuacao / questoes.length)}
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - pontuacao / questoes.length) }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-3xl font-bold text-primary">{pontuacao}</span>
                        <span className="text-sm text-neutral-500">/{questoes.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-lg text-neutral-700 dark:text-neutral-300">
                    {pontuacao === questoes.length 
                      ? "Parabéns! Você acertou todas as questões!" 
                      : pontuacao >= questoes.length * 0.7
                        ? "Muito bom! Você demonstra um bom conhecimento sobre o tema."
                        : pontuacao >= questoes.length * 0.5
                          ? "Bom trabalho! Continue estudando para melhorar."
                          : "Continue praticando para melhorar seu conhecimento."}
                  </p>
                  
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-md">
                    <h3 className="font-medium mb-2">Resumo:</h3>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Total de questões:</span>
                      <span>{questoes.length}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Questões respondidas:</span>
                      <span>{respostas.filter(r => r !== null).length}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Respostas corretas:</span>
                      <span className="text-green-600 dark:text-green-400">{pontuacao}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Precisão:</span>
                      <span className="font-medium">{Math.round((pontuacao / questoes.length) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={reiniciarQuiz} 
                  className="w-full sm:w-auto flex items-center gap-1"
                >
                  <RotateCcw className="h-4 w-4" /> Tentar Novamente
                </Button>
                <Link href="/questoes" className="w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-1"
                  >
                    <Home className="h-4 w-4" /> Voltar para o Banco
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </main>
    </>
  );
} 