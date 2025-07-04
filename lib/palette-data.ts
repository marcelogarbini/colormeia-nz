// Mapeamento de cartelas para seus respectivos arquivos PDF
export const palettePdfMap: Record<string, string> = {
  "Inverno Escuro": "/api/pdf-generator?cartela=Inverno%20Escuro",
  "Inverno Brilhante": "/api/pdf-generator?cartela=Inverno%20Brilhante",
  "Inverno Frio": "/api/pdf-generator?cartela=Inverno%20Frio",
  "Outono Escuro": "/api/pdf-generator?cartela=Outono%20Escuro",
  "Outono Quente": "/api/pdf-generator?cartela=Outono%20Quente",
  "Outono Suave": "/api/pdf-generator?cartela=Outono%20Suave",
  "Primavera Brilhante": "/api/pdf-generator?cartela=Primavera%20Brilhante",
  "Verão Suave": "/api/pdf-generator?cartela=Verão%20Suave",
  // Adicione outras cartelas conforme necessário
}

// Função para obter o caminho do PDF com base na cartela
export function getPdfPathForPalette(cartela: string): string {
  // Verificar se a cartela existe no mapeamento
  if (palettePdfMap[cartela]) {
    return palettePdfMap[cartela]
  }

  // Se não existir, usar a API de geração de PDF
  return `/api/pdf-generator?cartela=${encodeURIComponent(cartela)}`
}

// Função para obter o nome do arquivo para download
export function getPdfFilenameForPalette(cartela: string): string {
  return `colorme-ia-${cartela.toLowerCase().replace(/\s+/g, "-")}.pdf`
}
