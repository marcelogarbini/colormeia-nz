"use client"

import { useState, useEffect } from "react"
import { Download, Loader2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPdfPathForPalette } from "@/lib/palette-data"

interface SimplePdfViewerProps {
  cartela: string
}

export default function SimplePdfViewer({ cartela }: SimplePdfViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    loadPdf()
  }, [cartela])

  const loadPdf = async () => {
    try {
      setIsLoading(true)
      setError(null)
      setIframeLoaded(false)

      // Obter o caminho do PDF específico para a cartela
      const pdfPath = getPdfPathForPalette(cartela)
      setPdfUrl(pdfPath)
    } catch (err) {
      console.error("Erro ao carregar PDF:", err)
      setError("Não foi possível carregar o PDF.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleIframeLoad = () => {
    setIframeLoaded(true)
  }

  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank")
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg min-h-[500px] flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p>Carregando PDF...</p>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            <p>{error}</p>
            <Button variant="outline" onClick={loadPdf} className="mt-2">
              Tentar Novamente
            </Button>
          </div>
        ) : pdfUrl ? (
          <div className="w-full h-full flex flex-col items-center">
            <div className="mb-4 text-center">
              <h3 className="font-bold">Relatório da Cartela {cartela}</h3>
              <p className="text-sm text-gray-500">O PDF está pronto para visualização ou download</p>
            </div>
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <iframe
              src={`${pdfUrl}#toolbar=0&navpanes=0`}
              className="w-full h-[500px] border rounded"
              title={`Relatório ${cartela}`}
              onLoad={handleIframeLoad}
            />
          </div>
        ) : (
          <div className="text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p>Não foi possível carregar o PDF.</p>
          </div>
        )}
      </div>

      {pdfUrl && (
        <div className="flex justify-center">
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" /> Abrir PDF Completo
          </Button>
        </div>
      )}
    </div>
  )
}
