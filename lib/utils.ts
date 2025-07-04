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
    "Inverno Brilhante": [
      { hex: "#FFFFFF", name: "Branco Puro" },
      { hex: "#000000", name: "Preto" },
      { hex: "#0000FF", name: "Azul Elétrico" },
      { hex: "#FF0000", name: "Vermelho Vivo" },
      { hex: "#FF00FF", name: "Magenta" },
      { hex: "#00FFFF", name: "Ciano" },
      { hex: "#800080", name: "Roxo" },
      { hex: "#008000", name: "Verde Brilhante" },
      { hex: "#FFD700", name: "Amarelo Ouro" },
      { hex: "#FF69B4", name: "Rosa Choque" },
      { hex: "#4B0082", name: "Índigo" },
      { hex: "#00CED1", name: "Turquesa Médio" },
    ],
    "Inverno Frio": [
      { hex: "#F0F8FF", name: "Branco Gelo" },
      { hex: "#000000", name: "Preto" },
      { hex: "#4682B4", name: "Azul Aço" },
      { hex: "#708090", name: "Cinza Ardósia" },
      { hex: "#C0C0C0", name: "Prata" },
      { hex: "#E6E6FA", name: "Lavanda" },
      { hex: "#B0C4DE", name: "Azul Claro" },
      { hex: "#D8BFD8", name: "Lilás" },
      { hex: "#DCDCDC", name: "Cinza Claro" },
      { hex: "#F5F5F5", name: "Branco Fumaça" },
      { hex: "#E0FFFF", name: "Ciano Claro" },
      { hex: "#F0FFF0", name: "Verde Claro" },
    ],
    "Outono Quente": [
      { hex: "#8B4513", name: "Marrom Sela" },
      { hex: "#A0522D", name: "Siena" },
      { hex: "#CD853F", name: "Peru" },
      { hex: "#D2691E", name: "Chocolate" },
      { hex: "#B8860B", name: "Dourado Escuro" },
      { hex: "#DAA520", name: "Goldenrod" },
      { hex: "#556B2F", name: "Verde Oliva Escuro" },
      { hex: "#6B8E23", name: "Verde Oliva" },
      { hex: "#8B0000", name: "Vermelho Escuro" },
      { hex: "#800000", name: "Maroon" },
      { hex: "#A52A2A", name: "Marrom" },
      { hex: "#BC8F8F", name: "Rosybrown" },
    ],
    "Outono Escuro": [
      { hex: "#3D0C02", name: "Marrom Escuro" },
      { hex: "#654321", name: "Marrom Profundo" },
      { hex: "#800000", name: "Maroon" },
      { hex: "#8B4513", name: "Marrom Sela" },
      { hex: "#556B2F", name: "Verde Oliva Escuro" },
      { hex: "#2F4F4F", name: "Verde Ardósia Escuro" },
      { hex: "#8B0000", name: "Vermelho Escuro" },
      { hex: "#A52A2A", name: "Marrom" },
      { hex: "#B22222", name: "Tijolo Refratário" },
      { hex: "#CD5C5C", name: "Vermelho Indiano" },
      { hex: "#B8860B", name: "Dourado Escuro" },
      { hex: "#BDB76B", name: "Caqui Escuro" },
    ],
    "Outono Suave": [
      { hex: "#D2B48C", name: "Tan" },
      { hex: "#DEB887", name: "Madeira Amarelada" },
      { hex: "#F5DEB3", name: "Trigo" },
      { hex: "#FFDEAD", name: "Navajo Branco" },
      { hex: "#F0E68C", name: "Caqui" },
      { hex: "#EEE8AA", name: "Goldenrod Pálido" },
      { hex: "#BDB76B", name: "Caqui Escuro" },
      { hex: "#E9967A", name: "Salmão Escuro" },
      { hex: "#CD5C5C", name: "Vermelho Indiano" },
      { hex: "#BC8F8F", name: "Rosybrown" },
      { hex: "#F4A460", name: "Areia Marrom" },
      { hex: "#DAA520", name: "Goldenrod" },
    ],
    "Primavera Brilhante": [
      { hex: "#FFD700", name: "Ouro" },
      { hex: "#FFFF00", name: "Amarelo" },
      { hex: "#FF4500", name: "Laranja Avermelhado" },
      { hex: "#FF6347", name: "Tomate" },
      { hex: "#FF69B4", name: "Rosa Choque" },
      { hex: "#FF1493", name: "Rosa Profundo" },
      { hex: "#00BFFF", name: "Azul Céu Profundo" },
      { hex: "#1E90FF", name: "Azul Dodger" },
      { hex: "#00FF7F", name: "Verde Primavera" },
      { hex: "#7FFF00", name: "Chartreuse" },
      { hex: "#40E0D0", name: "Turquesa" },
      { hex: "#FF8C00", name: "Laranja Escuro" },
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
  }

  return paletteColors[cartela] || []
}
