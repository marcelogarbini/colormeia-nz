import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para mapear o nome da cartela para o arquivo PDF correspondente
export function getPdfUrlForPalette(cartela: string): string {
  const cartelaFormatada = cartela.toLowerCase().replace(/\s+/g, "-")
  return `/relatorios/${cartelaFormatada}.pdf`
}

// Função para obter as cores principais de uma cartela
export function getMainColorsForPalette(cartela: string): { hex: string; name: string }[] {
  // Mapeamento de cartelas para suas cores principais
  const paletteColors: Record<string, { hex: string; name: string }[]> = {
    "Inverno Escuro": [
      { hex: "#000000", name: "Preto" },
      { hex: "#FFFFFF", name: "Branco Puro" },
      { hex: "#0C0B1D", name: "Azul Marinho" },
      { hex: "#800020", name: "Bordô" },
      { hex: "#1B1B1B", name: "Cinza Escuro" },
      { hex: "#26428B", name: "Azul Royal" },
      { hex: "#3D0C02", name: "Marrom Escuro" },
      { hex: "#800080", name: "Roxo" },
      { hex: "#DC143C", name: "Vermelho Carmesim" },
      { hex: "#008080", name: "Verde Petróleo" },
      { hex: "#4B0082", name: "Índigo" },
      { hex: "#B22222", name: "Vermelho Tijolo" },
    ],
    "Verão Suave": [
      { hex: "#E6E6FA", name: "Lavanda" },
      { hex: "#D8BFD8", name: "Lilás" },
      { hex: "#DDA0DD", name: "Ameixa" },
      { hex: "#B0C4DE", name: "Azul Claro" },
      { hex: "#ADD8E6", name: "Azul Bebê" },
      { hex: "#E0FFFF", name: "Ciano Claro" },
      { hex: "#F0FFF0", name: "Verde Claro" },
      { hex: "#F5F5DC", name: "Bege" },
      { hex: "#FFF0F5", name: "Rosa Claro" },
      { hex: "#FFB6C1", name: "Rosa" },
      { hex: "#FFC0CB", name: "Rosa Médio" },
      { hex: "#D3D3D3", name: "Cinza Claro" },
    ],
    // Adicione outras cartelas conforme necessário
  }

  return paletteColors[cartela] || []
}
