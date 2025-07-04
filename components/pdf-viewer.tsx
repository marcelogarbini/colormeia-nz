"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PdfViewerProps {
  cartela: string
}

export default function PdfViewer({ cartela }: PdfViewerProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5 // Simulando um PDF com 5 páginas

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  // Simulando páginas do PDF com imagens
  const getPageContent = () => {
    return (
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={`/placeholder.svg?height=800&width=600&text=Página ${currentPage} - ${cartela}`}
          alt={`Página ${currentPage} do relatório`}
          fill
          className="object-contain"
        />

        {/* Conteúdo simulado sobreposto à imagem */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          <h3 className="text-2xl font-bold mb-4">ColorMe-IA</h3>
          <h4 className="text-xl mb-6">Relatório de Coloração Pessoal - {cartela}</h4>

          {currentPage === 1 && (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium">Página de Introdução</p>
              <p>Este relatório contém sua análise completa de coloração pessoal e recomendações personalizadas.</p>
            </div>
          )}

          {currentPage === 2 && (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium">Características Físicas</p>
              <p>Detalhes sobre seu tom de pele, subtom, olhos e cabelo.</p>
            </div>
          )}

          {currentPage === 3 && (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium">Paleta de Cores</p>
              <p>Sua paleta completa com todas as cores recomendadas.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: [
                        "#000000",
                        "#FFFFFF",
                        "#0C0B1D",
                        "#800020",
                        "#1B1B1B",
                        "#26428B",
                        "#3D0C02",
                        "#800080",
                        "#DC143C",
                        "#008080",
                        "#4B0082",
                        "#B22222",
                      ][i],
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {currentPage === 4 && (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium">Recomendações de Vestuário</p>
              <p>Sugestões de combinações de roupas e estilos que valorizam sua coloração.</p>
            </div>
          )}

          {currentPage === 5 && (
            <div className="text-center space-y-4">
              <p className="text-lg font-medium">Maquiagem e Acessórios</p>
              <p>Dicas de cores para maquiagem, cabelo e acessórios.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">{getPageContent()}</div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Página {currentPage} de {totalPages}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
          </Button>

          <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Próxima <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
