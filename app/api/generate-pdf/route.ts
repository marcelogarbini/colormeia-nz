import { type NextRequest, NextResponse } from "next/server"
import { generatePersonalizedPdf } from "@/lib/generate-pdf"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    if (!data.cartela) {
      return NextResponse.json({ error: "Cartela não especificada" }, { status: 400 })
    }

    const pdfBlob = await generatePersonalizedPdf({
      cartela: data.cartela,
      resumo: data.resumo || "Análise não disponível.",
      userName: data.userName,
      analysisDate: new Date(),
    })

    // Converter o Blob para ArrayBuffer
    const arrayBuffer = await pdfBlob.arrayBuffer()

    // Retornar o PDF como resposta
    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="colorme-ia-${data.cartela.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Erro ao gerar PDF:", error)
    return NextResponse.json({ error: "Erro ao gerar o PDF" }, { status: 500 })
  }
}
