import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientModuloContent } from "./client-components";

// Definição dos tipos
interface Secao {
  titulo: string;
  conteudo: string;
}

interface Modulo {
  titulo: string;
  descricao: string;
  seccoes: Secao[];
}

interface ModulosData {
  [key: string]: Modulo;
}

// Dados de exemplo para os módulos
const modulosData: ModulosData = {
  "anatomia-cardiaca": {
    titulo: "Anatomia Cardíaca",
    descricao: "Estudo da estrutura e organização do coração.",
    seccoes: [
      {
        titulo: "Localização e Estrutura Geral do Coração",
        conteudo: `
          <p>O coração é um órgão muscular oco localizado no mediastino médio, entre os pulmões, ligeiramente à esquerda do centro do tórax. É envolvido pelo pericárdio, uma membrana dupla que protege o coração e facilita seus movimentos.</p>
          
          <p>Estruturalmente, o coração é composto por três camadas principais:</p>
          <ul>
            <li><strong>Epicárdio (pericárdio visceral)</strong>: Camada externa que reveste o coração</li>
            <li><strong>Miocárdio</strong>: Camada média muscular, responsável pelas contrações cardíacas</li>
            <li><strong>Endocárdio</strong>: Camada interna que reveste as câmaras e válvulas cardíacas</li>
          </ul>
        `
      },
      {
        titulo: "Câmaras Cardíacas",
        conteudo: `
          <p>O coração é dividido em quatro câmaras:</p>
          
          <p><strong>Átrios (superior)</strong>:</p>
          <ul>
            <li><strong>Átrio direito</strong>: Recebe sangue venoso do corpo através das veias cavas superior e inferior</li>
            <li><strong>Átrio esquerdo</strong>: Recebe sangue oxigenado dos pulmões através das veias pulmonares</li>
          </ul>
          
          <p><strong>Ventrículos (inferior)</strong>:</p>
          <ul>
            <li><strong>Ventrículo direito</strong>: Bombeia sangue para os pulmões através da artéria pulmonar</li>
            <li><strong>Ventrículo esquerdo</strong>: Bombeia sangue para o corpo através da aorta</li>
          </ul>
          
          <p>Os átrios e ventrículos são separados por válvulas que garantem o fluxo unidirecional do sangue.</p>
        `
      },
      {
        titulo: "Válvulas Cardíacas",
        conteudo: `
          <p>As válvulas cardíacas são estruturas que controlam o fluxo sanguíneo unidirecional através do coração:</p>
          
          <p><strong>Válvulas Atrioventriculares</strong>:</p>
          <ul>
            <li><strong>Válvula Tricúspide</strong>: Localizada entre o átrio direito e o ventrículo direito</li>
            <li><strong>Válvula Mitral (Bicúspide)</strong>: Localizada entre o átrio esquerdo e o ventrículo esquerdo</li>
          </ul>
          
          <p><strong>Válvulas Semilunares</strong>:</p>
          <ul>
            <li><strong>Válvula Pulmonar</strong>: Controla o fluxo entre o ventrículo direito e a artéria pulmonar</li>
            <li><strong>Válvula Aórtica</strong>: Controla o fluxo entre o ventrículo esquerdo e a aorta</li>
          </ul>
        `
      },
      {
        titulo: "Sistema de Condução",
        conteudo: `
          <p>O sistema de condução cardíaco é responsável pela geração e transmissão dos impulsos elétricos que garantem a contração coordenada do coração:</p>
          
          <ul>
            <li><strong>Nódulo Sinusal (Nó SA)</strong>: Marcapasso natural do coração, localizado na parede do átrio direito</li>
            <li><strong>Nódulo Atrioventricular (Nó AV)</strong>: Localizado no assoalho do átrio direito, recebe o impulso do nó SA</li>
            <li><strong>Feixe de His</strong>: Conduz o impulso do nó AV para os ventrículos</li>
            <li><strong>Ramos do Feixe de His</strong>: Divididos em ramo direito e esquerdo, distribuem o impulso pelos ventrículos</li>
            <li><strong>Fibras de Purkinje</strong>: Terminações que transmitem o impulso às células miocárdicas ventriculares</li>
          </ul>
        `
      },
      {
        titulo: "Circulação Coronária",
        conteudo: `
          <p>A circulação coronária é responsável pelo suprimento sanguíneo do próprio músculo cardíaco:</p>
          
          <p><strong>Artérias Coronárias</strong>:</p>
          <ul>
            <li><strong>Artéria Coronária Direita</strong>: Irriga principalmente o átrio direito, ventrículo direito e parte do ventrículo esquerdo</li>
            <li><strong>Artéria Coronária Esquerda</strong>: Divide-se em ramo descendente anterior (irriga a maior parte do ventrículo esquerdo) e ramo circunflexo</li>
          </ul>
          
          <p><strong>Veias Cardíacas</strong>:</p>
          <ul>
            <li>O sangue venoso do coração é coletado pelo <strong>seio coronário</strong> e veias cardíacas, que desembocam no átrio direito</li>
          </ul>
        `
      }
    ]
  },
  "fisiologia-respiratoria": {
    titulo: "Fisiologia Respiratória",
    descricao: "Estudo dos mecanismos de respiração e troca gasosa.",
    seccoes: [
      {
        titulo: "Mecânica Respiratória",
        conteudo: `
          <p>A mecânica respiratória envolve os processos de inspiração e expiração:</p>
          
          <p><strong>Inspiração</strong>:</p>
          <ul>
            <li>Processo ativo que requer contração muscular</li>
            <li>O diafragma e os músculos intercostais externos se contraem</li>
            <li>O volume da cavidade torácica aumenta</li>
            <li>A pressão intrapleural diminui (torna-se mais negativa)</li>
            <li>O ar flui para dentro dos pulmões devido ao gradiente de pressão</li>
          </ul>
          
          <p><strong>Expiração</strong>:</p>
          <ul>
            <li>Geralmente um processo passivo durante a respiração tranquila</li>
            <li>Os músculos inspiratórios relaxam</li>
            <li>As propriedades elásticas do pulmão fazem com que ele retorne ao seu tamanho original</li>
            <li>O volume torácico diminui e a pressão aumenta</li>
            <li>O ar é expelido dos pulmões</li>
          </ul>
        `
      },
      {
        titulo: "Volumes e Capacidades Pulmonares",
        conteudo: `
          <p><strong>Volumes Pulmonares</strong>:</p>
          <ul>
            <li><strong>Volume Corrente (VC)</strong>: Volume de ar inspirado ou expirado durante uma respiração normal (±500ml)</li>
            <li><strong>Volume de Reserva Inspiratória (VRI)</strong>: Volume adicional que pode ser inspirado além do volume corrente</li>
            <li><strong>Volume de Reserva Expiratória (VRE)</strong>: Volume adicional que pode ser expirado além do volume corrente</li>
            <li><strong>Volume Residual (VR)</strong>: Volume que permanece nos pulmões após uma expiração forçada</li>
          </ul>
          
          <p><strong>Capacidades Pulmonares</strong> (combinações de volumes):</p>
          <ul>
            <li><strong>Capacidade Inspiratória (CI)</strong>: VC + VRI</li>
            <li><strong>Capacidade Residual Funcional (CRF)</strong>: VRE + VR</li>
            <li><strong>Capacidade Vital (CV)</strong>: VRI + VC + VRE</li>
            <li><strong>Capacidade Pulmonar Total (CPT)</strong>: VRI + VC + VRE + VR</li>
          </ul>
        `
      }
    ]
  }
};

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ModuloPage({ params }: PageProps) {
  const modulo = modulosData[params.slug];

  // Se o módulo não for encontrado, redireciona para a página 404
  if (!modulo) {
    notFound();
  }

  return (
    <main className="container mx-auto py-10 px-4 max-w-4xl">
      <Link href="/modulos">
        <Button variant="ghost" className="mb-6">
          ← Voltar para Módulos
        </Button>
      </Link>
      
      <ClientModuloContent modulo={modulo} />
    </main>
  );
} 