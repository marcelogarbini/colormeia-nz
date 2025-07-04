"use client"

import { useState, useEffect } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPdfPathForPalette } from "@/lib/palette-data"

interface PdfFallbackProps {
  cartela: string
  resumo?: string
  userName?: string
}

export default function PdfFallback({ cartela, resumo, userName }: PdfFallbackProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadPaletteSpecificPdf()
  }, [cartela])

  const loadPaletteSpecificPdf = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Obter o caminho do PDF específico para a cartela
      const pdfPath = getPdfPathForPalette(cartela)

      // Verificar se o PDF existe fazendo uma requisição HEAD
      const response = await fetch(pdfPath, { method: "HEAD" })

      if (!response.ok) {
        throw new Error(`PDF não encontrado: ${pdfPath}`)
      }

      setPdfUrl(pdfPath)
    } catch (err) {
      console.error("Erro ao carregar PDF:", err)
      setError("Não foi possível carregar o PDF. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (pdfUrl) {
      // Criar um link para download
      window.open(pdfUrl, "_blank")
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-8 rounded-lg min-h-[400px] flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p>Carregando seu relatório personalizado...</p>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            <p className="mb-4">{error}</p>
            <Button variant="outline" onClick={loadPaletteSpecificPdf}>
              Tentar Novamente
            </Button>
          </div>
        ) : pdfUrl ? (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Seu relatório está pronto!</h3>
              <p className="text-gray-600 mb-6">
                Seu relatório personalizado da cartela {cartela} foi gerado com sucesso.
              </p>
            </div>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" /> Baixar Relatório PDF
            </Button>
          </div>
        ) : (
          <p>Preparando seu relatório...</p>
        )}
      </div>

      <div className="border rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Conteúdo do Relatório</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-primary/20 p-1 rounded-full mr-3 mt-0.5">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
            </div>
            <div>
              <span className="font-medium">Cartela Identificada:</span> {cartela}
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/20 p-1 rounded-full mr-3 mt-0.5">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
            </div>
            <div>
              <span className="font-medium">Análise Detalhada:</span> Resumo das suas características e explicação da
              cartela
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/20 p-1 rounded-full mr-3 mt-0.5">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
            </div>
            <div>
              <span className="font-medium">Paleta de Cores:</span> Visualização completa das cores recomendadas
            </div>
          </li>
          <li className="flex items-start">
            <div className="bg-primary/20 p-1 rounded-full mr-3 mt-0.5">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
            </div>
            <div>
              <span className="font-medium">Recomendações:</span> Dicas para roupas, maquiagem, cabelo e acessórios
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
