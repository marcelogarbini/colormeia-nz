import { jsPDF } from "jspdf"
import { getMainColorsForPalette } from "./utils"

interface PdfGenerationData {
  cartela: string
  resumo: string
  userName?: string
  analysisDate: Date
}

export async function generatePersonalizedPdf(data: PdfGenerationData): Promise<Blob> {
  // Criar um novo documento PDF
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Adicionar título
  doc.setFontSize(24)
  doc.setTextColor(66, 133, 244) // Azul do logo
  doc.text("ColorMe-IA", 105, 20, { align: "center" })

  doc.setFontSize(16)
  doc.text("Análise de Coloração Pessoal", 105, 30, { align: "center" })

  // Adicionar data
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  const formattedDate = data.analysisDate.toLocaleDateString("pt-BR")
  doc.text(`Data da análise: ${formattedDate}`, 105, 40, { align: "center" })

  // Adicionar nome do usuário se disponível
  if (data.userName) {
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Análise para: ${data.userName}`, 20, 50)
  }

  // Adicionar cartela identificada
  doc.setFontSize(18)
  doc.setTextColor(66, 133, 244) // Azul do logo
  doc.text(`Cartela Identificada: ${data.cartela}`, 20, 65)

  // Adicionar resumo da análise
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)

  // Quebrar o texto em linhas para caber na página
  const splitResumo = doc.splitTextToSize(data.resumo, 170)
  doc.text(splitResumo, 20, 75)

  // Adicionar paleta de cores
  doc.setFontSize(16)
  doc.setTextColor(66, 133, 244) // Azul do logo
  doc.text("Sua Paleta de Cores", 20, 110)

  // Obter cores da paleta
  const colors = getMainColorsForPalette(data.cartela)

  // Desenhar amostras de cores
  const startX = 20
  const startY = 120
  const colorSize = 15
  const colorsPerRow = 4

  colors.forEach((color, index) => {
    const row = Math.floor(index / colorsPerRow)
    const col = index % colorsPerRow

    const x = startX + col * (colorSize + 25)
    const y = startY + row * (colorSize + 20)

    // Converter hex para RGB
    const r = Number.parseInt(color.hex.slice(1, 3), 16)
    const g = Number.parseInt(color.hex.slice(3, 5), 16)
    const b = Number.parseInt(color.hex.slice(5, 7), 16)

    // Desenhar círculo colorido
    doc.setFillColor(r, g, b)
    doc.circle(x + colorSize / 2, y + colorSize / 2, colorSize / 2, "F")

    // Adicionar nome da cor
    doc.setFontSize(8)
    doc.setTextColor(0, 0, 0)
    doc.text(color.name, x, y + colorSize + 10, { align: "left" })
  })

  // Adicionar recomendações
  const startRecommendationsY = startY + Math.ceil(colors.length / colorsPerRow) * (colorSize + 20) + 20

  doc.setFontSize(16)
  doc.setTextColor(66, 133, 244) // Azul do logo
  doc.text("Recomendações", 20, startRecommendationsY)

  // Adicionar texto de recomendações específicas para a cartela
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)

  const recommendations = getRecommendationsForPalette(data.cartela)
  let currentY = startRecommendationsY + 10

  Object.entries(recommendations).forEach(([category, text]) => {
    doc.setFontSize(12)
    doc.setTextColor(66, 133, 244) // Azul do logo
    doc.text(category, 20, currentY)
    currentY += 5

    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    const splitText = doc.splitTextToSize(text, 170)
    doc.text(splitText, 20, currentY)
    currentY += splitText.length * 5 + 10
  })

  // Adicionar rodapé
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text("© ColorMe-IA - Análise de Coloração Pessoal com Inteligência Artificial", 105, 285, { align: "center" })

  // Retornar o PDF como Blob
  return doc.output("blob")
}

function getRecommendationsForPalette(cartela: string): Record<string, string> {
  // Recomendações específicas para cada cartela
  const recommendations: Record<string, Record<string, string>> = {
    "Verão Suave": {
      Roupas:
        "A paleta Verão Suave é caracterizada por cores suaves e frias. Opte por tons pastéis como lavanda, azul bebê, rosa claro e verde menta. Evite cores muito vibrantes ou escuras, pois podem criar um contraste muito forte com sua aparência natural.",
      Maquiagem:
        "Para maquiagem, escolha tons suaves de rosa, malva e pêssego para os lábios. Sombras em tons de lavanda, cinza suave ou azul claro valorizam seus olhos. Blush em tons de rosa suave complementam perfeitamente seu subtom.",
      Acessórios:
        "Prefira joias em prata ou ouro branco, que harmonizam com o subtom frio da sua pele. Pérolas e pedras em tons suaves como água-marinha, ametista clara e quartzo rosa são excelentes escolhas.",
      Cabelo:
        "Para coloração de cabelo, opte por tons naturais com subtom frio, como castanho médio acinzentado, loiro cinza ou loiro platinado. Evite tons dourados ou acobreados, que podem criar dissonância com seu subtom.",
    },
    "Inverno Escuro": {
      Roupas:
        "A profundidade da paleta de cores do Inverno Escuro é melhor destacada quando você usa suas cores em combinações de alto contraste. Esse nível de contraste reflete o alto contraste já presente na sua aparência natural, criando um visual harmonioso e poderoso.",
      Maquiagem:
        "Batom é onde Inverno Escuro se destaca! Esta estação pode sair com cores profundamente intensas que fazem outras estações parecerem vampiros. Mas o Inverno Escuro geralmente fica melhor quando deixa seus lábios ocuparem o centro do palco em tons profundos, como ameixa e bordô.",
      Acessórios:
        "Para acessórios, opte por metais prateados ou brancos que complementam o subtom frio da sua pele. Joias com pedras em cores intensas como rubi, safira e esmeralda são excelentes escolhas.",
      Cabelo:
        "O cabelo do Inverno Escuro também é escuro, variando do marrom médio, marrom escuro ao preto. A cor tende a ser neutra ou ligeiramente cinza. Manter a raiz sempre escura e fazer iluminado leve nas pontas caso deseje um visual mais leve e iluminado.",
    },
    // Adicione outras cartelas conforme necessário
  }

  return (
    recommendations[cartela] || {
      Nota: "Recomendações detalhadas para esta cartela serão adicionadas em breve.",
    }
  )
}
