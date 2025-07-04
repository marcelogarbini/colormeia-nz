import { type NextRequest, NextResponse } from "next/server"
import { jsPDF } from "jspdf"

export async function GET(request: NextRequest) {
  try {
    // Obter o nome da cartela da query
    const { searchParams } = new URL(request.url)
    const cartela = searchParams.get("cartela") || "Exemplo"

    // Criar um novo documento PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Adicionar título
    doc.setFontSize(24)
    doc.setTextColor(66, 133, 244) // Azul
    doc.text("ColorMe-IA", 105, 20, { align: "center" })

    doc.setFontSize(16)
    doc.text(`Cartela: ${cartela}`, 105, 30, { align: "center" })

    // Adicionar data
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    const formattedDate = new Date().toLocaleDateString("pt-BR")
    doc.text(`Data da análise: ${formattedDate}`, 105, 40, { align: "center" })

    // Adicionar conteúdo
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("Este é um exemplo de relatório PDF para a cartela " + cartela, 20, 60)
    doc.text("O relatório completo incluirá informações detalhadas sobre sua coloração pessoal.", 20, 70)

    // Retornar o PDF como resposta
    const pdfBuffer = doc.output("arraybuffer")

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="colorme-ia-${cartela.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Erro ao gerar PDF de exemplo:", error)
    return NextResponse.json({ error: "Erro ao gerar o PDF de exemplo" }, { status: 500 })
  }
}
