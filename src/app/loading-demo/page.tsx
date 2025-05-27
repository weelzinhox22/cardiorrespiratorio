"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

import { 
  SpinnerLoading, 
  ProgressLoading, 
  DotsLoading, 
  PulseLoading,
  LoadingContainer
} from "@/components/ui/motion-loading";

export default function LoadingDemo() {
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<string | null>(null);
  
  const startLoading = (type: string) => {
    setLoadingType(type);
    setLoading(true);
    
    // Simular um carregamento demorado
    setTimeout(() => {
      setLoading(false);
      setLoadingType(null);
    }, 3000);
  };

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
          <h1 className="text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">Demonstração de Carregamento</h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-300">
            Esta página demonstra os diversos indicadores de carregamento disponíveis no site.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-neutral-200 dark:border-neutral-700">
            <CardHeader>
              <CardTitle>Indicadores de Carregamento</CardTitle>
              <CardDescription>Exemplos de diferentes estilos de indicadores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Spinner */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Spinner</h3>
                <div className="flex items-center gap-4">
                  <SpinnerLoading size="sm" />
                  <SpinnerLoading />
                  <SpinnerLoading size="lg" />
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <SpinnerLoading color="accent" />
                  <SpinnerLoading color="secondary" />
                  <SpinnerLoading color="neutral" />
                </div>
                <Button 
                  onClick={() => startLoading('spinner')} 
                  variant="outline" 
                  className="mt-2 w-full md:w-auto"
                >
                  Simular Carregamento
                </Button>
              </div>
              
              {/* Progress */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Barra de Progresso</h3>
                <div className="space-y-3 w-full">
                  <ProgressLoading height="sm" />
                  <ProgressLoading />
                  <ProgressLoading height="lg" />
                </div>
                <div className="space-y-3 w-full mt-2">
                  <ProgressLoading color="accent" />
                  <ProgressLoading color="secondary" />
                  <ProgressLoading color="neutral" />
                </div>
                <Button 
                  onClick={() => startLoading('progress')} 
                  variant="outline" 
                  className="mt-2 w-full md:w-auto"
                >
                  Simular Carregamento
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-neutral-200 dark:border-neutral-700">
            <CardHeader>
              <CardTitle>Mais Indicadores</CardTitle>
              <CardDescription>Outras opções para feedback de carregamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Dots */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Pontos Pulsantes</h3>
                <div className="flex items-center gap-8">
                  <DotsLoading size="sm" />
                  <DotsLoading />
                  <DotsLoading size="lg" />
                </div>
                <div className="flex items-center gap-8 mt-2">
                  <DotsLoading color="accent" />
                  <DotsLoading color="secondary" />
                  <DotsLoading color="neutral" />
                </div>
                <Button 
                  onClick={() => startLoading('dots')} 
                  variant="outline" 
                  className="mt-2 w-full md:w-auto"
                >
                  Simular Carregamento
                </Button>
              </div>
              
              {/* Pulse */}
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-medium">Pulso</h3>
                <div className="flex items-center gap-8">
                  <PulseLoading size="sm" />
                  <PulseLoading />
                  <PulseLoading size="lg" />
                </div>
                <div className="flex items-center gap-8 mt-2">
                  <PulseLoading color="accent" />
                  <PulseLoading color="secondary" />
                  <PulseLoading color="neutral" />
                </div>
                <Button 
                  onClick={() => startLoading('pulse')} 
                  variant="outline" 
                  className="mt-2 w-full md:w-auto"
                >
                  Simular Carregamento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <Card className="border border-neutral-200 dark:border-neutral-700">
            <CardHeader>
              <CardTitle>Carregamento em Tela Cheia</CardTitle>
              <CardDescription>Demonstração de carregamento bloqueando a interface</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => startLoading('fullScreen')}>
                  Carregamento em Tela Cheia
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Loading Overlay */}
        {loading && loadingType === 'fullScreen' && (
          <LoadingContainer fullScreen>
            <PulseLoading size="lg" />
          </LoadingContainer>
        )}
        
        {/* Loading Indicators in place */}
        {loading && loadingType === 'spinner' && (
          <Card className="mt-6 border border-neutral-200 dark:border-neutral-700">
            <CardContent className="py-6">
              <LoadingContainer>
                <SpinnerLoading size="lg" />
              </LoadingContainer>
            </CardContent>
          </Card>
        )}
        
        {loading && loadingType === 'progress' && (
          <Card className="mt-6 border border-neutral-200 dark:border-neutral-700">
            <CardContent className="py-6">
              <LoadingContainer>
                <div className="w-full max-w-md">
                  <ProgressLoading height="lg" />
                </div>
              </LoadingContainer>
            </CardContent>
          </Card>
        )}
        
        {loading && loadingType === 'dots' && (
          <Card className="mt-6 border border-neutral-200 dark:border-neutral-700">
            <CardContent className="py-6">
              <LoadingContainer>
                <DotsLoading size="lg" />
              </LoadingContainer>
            </CardContent>
          </Card>
        )}
        
        {loading && loadingType === 'pulse' && (
          <Card className="mt-6 border border-neutral-200 dark:border-neutral-700">
            <CardContent className="py-6">
              <LoadingContainer>
                <PulseLoading size="lg" />
              </LoadingContainer>
            </CardContent>
          </Card>
        )}
      </main>
    </>
  );
} 