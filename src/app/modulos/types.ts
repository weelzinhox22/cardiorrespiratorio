// Definição dos tipos para os módulos
export interface Secao {
  titulo: string;
  conteudo: string;
}

export interface Modulo {
  titulo: string;
  descricao: string;
  seccoes: Secao[];
}

export interface ModulosData {
  [key: string]: Modulo;
} 