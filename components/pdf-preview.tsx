"use client"

import { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPdfPathForPalette, getPdfFilenameForPalette } from "@/lib/palette-data"

// Configurar worker do PDF.js - usando CDN confiável
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface PdfPreviewProps {
  cartela: string
  resumo?: string
  userName?: string
  onError?: () => void
}

export default function PdfPreview({ cartela, resumo, userName, onError }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar o PDF específico da paleta quando o componente montar
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
      setError("Não foi possível carregar a visualização do PDF. Tente novamente.")
      if (onError) onError()
    } finally {
      setIsLoading(false)
    }
  }

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const handleDocumentLoadError = (error: Error) => {
    console.error("Erro ao carregar o documento PDF:", error)
    setError("Não foi possível carregar a visualização do PDF.")
    if (onError) onError()
  }

  const handlePrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1))
  }

  const handleDownload = () => {
    if (pdfUrl) {
      // Criar um link para download
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = getPdfFilenameForPalette(cartela)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg min-h-[500px] flex items-center justify-center">
        {isLoading ? (
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
            <p>Carregando visualização do PDF...</p>
          </div>
        ) : error ? (
          <div className="text-center text-destructive">
            <p>{error}</p>
            <Button variant="outline" onClick={loadPaletteSpecificPdf} className="mt-2">
              Tentar Novamente
            </Button>
          </div>
        ) : pdfUrl ? (
          <div className="w-full max-w-full overflow-hidden">
            <Document
              file={pdfUrl}
              onLoadSuccess={handleDocumentLoadSuccess}
              onLoadError={handleDocumentLoadError}
              loading={<Loader2 className="h-8 w-8 animate-spin mx-auto" />}
              error={<p className="text-destructive">Não foi possível carregar o PDF.</p>}
              className="flex justify-center"
              options={{
                cMapUrl: "https://unpkg.com/pdfjs-dist@3.11.174/cmaps/",
                cMapPacked: true,
              }}
            >
              <Page
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={450}
                className="mx-auto"
              />
            </Document>
          </div>
        ) : (
          <p>Carregando visualização...</p>
        )}
      </div>

      {pdfUrl && numPages && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Página {pageNumber} de {numPages}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={pageNumber <= 1}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
            </Button>

            <Button variant="outline" size="sm" onClick={handleNextPage} disabled={pageNumber >= (numPages || 1)}>
              Próxima <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Button onClick={handleDownload} disabled={!pdfUrl} className="gap-2">
          <Download className="h-4 w-4" /> Baixar Relatório PDF
        </Button>
      </div>
    </div>
  )
}
