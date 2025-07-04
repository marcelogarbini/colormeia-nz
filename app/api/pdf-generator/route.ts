import { type NextRequest, NextResponse } from "next/server"
import { generatePdfForPalette } from "@/lib/pdf-generator"

export async function GET(request: NextRequest) {
  try {
    // Obter o nome da cartela da query
    const { searchParams } = new URL(request.url)
    const cartela = searchParams.get("cartela") || "Exemplo"

    // Gerar o PDF para a cartela
    const pdfBlob = await generatePdfForPalette(cartela)

    // Converter o Blob para ArrayBuffer
    const arrayBuffer = await pdfBlob.arrayBuffer()

    // Retornar o PDF como resposta
    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="colorme-ia-${cartela.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Erro ao gerar PDF:", error)
    return NextResponse.json({ error: "Erro ao gerar o PDF" }, { status: 500 })
  }
}
