import { jsPDF } from "jspdf"
import { getMainColorsForPalette } from "./utils"

// Função para gerar PDFs para as cartelas que não têm arquivos físicos
export async function generatePdfForPalette(cartela: string): Promise<Blob> {
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

  doc.setFontSize(18)
  doc.text(`Cartela: ${cartela}`, 105, 30, { align: "center" })

  // Adicionar data
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  const formattedDate = new Date().toLocaleDateString("pt-BR")
  doc.text(`Data da análise: ${formattedDate}`, 105, 40, { align: "center" })

  // Adicionar descrição da cartela
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)

  let descricao = ""

  if (cartela.includes("Inverno")) {
    descricao =
      "A paleta de Inverno é composta por cores frias e intensas, que refletem a profundidade e a elegância dessa estação. As tonalidades dessa coloração são escuras e contrastantes, perfeitas para realçar o contraste natural da sua aparência."
  } else if (cartela.includes("Outono")) {
    descricao =
      "A paleta de Outono é composta por cores quentes e terrosas, que refletem a riqueza e a profundidade dessa estação. As tonalidades dessa coloração são quentes e aconchegantes, perfeitas para realçar o calor natural da sua aparência."
  } else if (cartela.includes("Primavera")) {
    descricao =
      "A paleta de Primavera é composta por cores vivas e luminosas, que refletem a energia e o frescor dessa estação. As tonalidades dessa coloração são claras e vibrantes, perfeitas para realçar a luminosidade natural da sua aparência."
  } else {
    descricao =
      "A paleta de Verão é composta por cores suaves e frias, que refletem a delicadeza e a serenidade dessa estação. As tonalidades dessa coloração são leves e sutis, perfeitas para realçar a suavidade natural da sua aparência."
  }

  // Quebrar o texto em linhas para caber na página
  const splitDescricao = doc.splitTextToSize(descricao, 170)
  doc.text(splitDescricao, 20, 60)

  // Adicionar paleta de cores
  doc.setFontSize(16)
  doc.setTextColor(66, 133, 244) // Azul do logo
  doc.text("Sua Paleta de Cores", 20, 90)

  // Obter cores da paleta
  const colors = getMainColorsForPalette(cartela)

  // Desenhar amostras de cores
  const startX = 20
  const startY = 100
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

  // Adicionar características
  const startCharacteristicsY = startY + Math.ceil(colors.length / colorsPerRow) * (colorSize + 20) + 20

  doc.setFontSize(16)
  doc.setTextColor(66, 133, 244) // Azul do logo
  doc.text("Características", 20, startCharacteristicsY)

  // Adicionar texto de características específicas para a cartela
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)

  let caracteristicas = ""

  if (cartela.includes("Inverno")) {
    caracteristicas =
      "Pele: A pele é verde-oliva, neutra ou neutra-fria, o que significa que ouro e prata ficam bem contra ela, mas o prata fica ainda melhor. Pode variar de claro a profundo.\n\nOlhos: Os olhos são escuros, geralmente marrom escuro ou preto. Um azul muito profundo e fresco também é possível.\n\nCabelo: O cabelo é escuro, variando do marrom médio, marrom escuro ao preto. A cor tende a ser neutra ou ligeiramente cinza."
  } else if (cartela.includes("Outono")) {
    caracteristicas =
      "Pele: A pele tem um subtom quente, dourado ou amarelado. Pode variar de clara a escura, mas sempre apresenta esse calor característico.\n\nOlhos: Os olhos geralmente apresentam tons quentes e terrosos, como âmbar, castanho dourado, verde oliva ou avelã.\n\nCabelo: O cabelo apresenta tons quentes e terrosos, como castanho avermelhado, ruivo, cobre ou castanho dourado."
  } else if (cartela.includes("Primavera")) {
    caracteristicas =
      "Pele: A pele tem um subtom quente e luminoso, com um brilho natural. Geralmente apresenta um tom pêssego ou dourado claro.\n\nOlhos: Os olhos são claros e brilhantes, podendo ser azuis, verdes claros, âmbar ou castanhos claros.\n\nCabelo: O cabelo tem tons dourados e luminosos, como loiro dourado, castanho claro com reflexos dourados ou ruivo claro."
  } else {
    caracteristicas =
      "Pele: A pele tem um subtom rosado ou azulado, caracteristicamente frio. Pode variar de muito clara a média, mas sempre mantém essa qualidade fria.\n\nOlhos: Os olhos têm tons frios e suaves, como azul acinzentado, verde-água ou castanho com tons frios.\n\nCabelo: O cabelo apresenta tons frios e suaves, como loiro acinzentado, castanho médio com reflexos frios ou castanho claro sem dourados."
  }

  // Quebrar o texto em linhas para caber na página
  const splitCaracteristicas = doc.splitTextToSize(caracteristicas, 170)
  doc.text(splitCaracteristicas, 20, startCharacteristicsY + 10)

  // Adicionar rodapé
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.text("© ColorMe-IA - Análise de Coloração Pessoal com Inteligência Artificial", 105, 285, { align: "center" })

  // Retornar o PDF como Blob
  return doc.output("blob")
}
