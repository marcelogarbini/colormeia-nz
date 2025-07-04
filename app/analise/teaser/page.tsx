"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Palette, ArrowRight, Download } from "lucide-react"

interface AnalysisResult {
  cartela: string
  resumo: string
  caracteristicas: {
    subtom: string
    profundidade: string
    contraste: string
  }
}

export default function TeaserPage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const result = sessionStorage.getItem("analysisResult")
    if (result) {
      try {
        const parsedResult = JSON.parse(result)
        setAnalysis(parsedResult)
      } catch (error) {
        console.error("Erro ao parsear resultado:", error)
        router.push("/analise")
      }
    } else {
      // Se não há resultado, redireciona para a análise
      router.push("/analise")
    }
    setIsLoading(false)
  }, [router])

  const handleViewFullReport = () => {
    // Redireciona para a página de resultado completo
    router.push(`/analise/resultado?cartela=${encodeURIComponent(analysis?.cartela || "")}`)
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Carregando resultado...</p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="container max-w-4xl py-20 text-center">
        <p>Nenhum resultado encontrado. Faça uma nova análise.</p>
        <Button onClick={() => router.push("/analise")} className="mt-4">
          Nova Análise
        </Button>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-10">
      {/* Header com animação */}
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
          <Sparkles className="h-4 w-4" />
          Análise Concluída com Sucesso!
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">Sua Cartela Foi Identificada!</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Nossa IA analisou suas características e determinou sua coloração pessoal ideal
        </p>
      </div>

      {/* Resultado Principal */}
      <div className="mb-12 animate-fade-in-scale">
        <Card className="neomorphism border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Palette className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-gradient">{analysis.cartela}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">{analysis.resumo}</p>

            {/* Características */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="glassmorphism rounded-xl p-4">
                <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Subtom</h3>
                <p className="text-xl font-bold text-primary">{analysis.caracteristicas.subtom}</p>
              </div>
              <div className="glassmorphism rounded-xl p-4">
                <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Profundidade</h3>
                <p className="text-xl font-bold text-secondary">{analysis.caracteristicas.profundidade}</p>
              </div>
              <div className="glassmorphism rounded-xl p-4">
                <h3 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">Contraste</h3>
                <p className="text-xl font-bold text-accent">{analysis.caracteristicas.contraste}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleViewFullReport}
                size="lg"
                className="group relative px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white border-0 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3">
                  <Palette className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Ver Relatório Completo</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="btn-apple px-8 py-4 text-lg font-medium rounded-2xl bg-transparent"
                onClick={() => {
                  // Aqui você pode implementar o download do PDF
                  alert("Funcionalidade de download será implementada em breve!")
                }}
              >
                <Download className="h-5 w-5 mr-2" />
                Baixar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Benefícios */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="glassmorphism border-0 hover-lift">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />O que você descobriu
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Sua cartela de coloração pessoal específica</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Análise detalhada das suas características naturais</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <span>Compreensão do seu subtom e contraste</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-0 hover-lift">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-secondary" />
              Próximos passos
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <span>Visualize sua paleta completa de cores</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <span>Receba recomendações personalizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <span>Baixe seu relatório completo em PDF</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Debug Info (remover em produção) */}
      <Card className="bg-gray-50 border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">🔧 Dados da Análise (Debug)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-white p-4 rounded border overflow-auto">{JSON.stringify(analysis, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
