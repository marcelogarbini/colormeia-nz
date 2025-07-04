"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Palette, ArrowRight, CheckCircle, Star, Lock, Clock, Download, ExternalLink } from "lucide-react"

interface AnalysisResult {
  cartela: string
  resumo: string
  caracteristicas: {
    subtom: string
    profundidade: string
    contraste: string
  }
  analiseCompleta?: any
  linkPDF?: string
}

export default function TeaserPage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutos
  const router = useRouter()

  useEffect(() => {
    const result = sessionStorage.getItem("analysisResult")
    if (result) {
      try {
        const parsedResult = JSON.parse(result)
        setAnalysis(parsedResult)
      } catch (error) {
        console.error("Erro ao parsear resultado:", error)
        router.push("/upload")
      }
    } else {
      router.push("/upload")
    }
    setIsLoading(false)
  }, [router])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handlePayment = () => {
    router.push("/checkout")
  }

  const handleViewPDF = () => {
    if (analysis?.linkPDF) {
      window.open(analysis.linkPDF, "_blank")
    }
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
        <Button onClick={() => router.push("/upload")} className="mt-4">
          Nova Análise
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-green-50/50">
      <div className="container max-w-4xl py-10">
        {/* Header com timer */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium mb-4">
            <Clock className="h-4 w-4" />
            Oferta expira em: {formatTime(timeLeft)}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">Sua Cartela Foi Identificada!</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descobrimos sua coloração pessoal! Veja uma prévia do que encontramos...
          </p>
        </div>

        {/* Preview do Resultado */}
        <div className="mb-8">
          <Card className="neomorphism border-0 shadow-2xl relative overflow-hidden">
            {/* Blur overlay */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center">
                <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-600 mb-2">Conteúdo Bloqueado</p>
                <p className="text-sm text-gray-500">Desbloqueie seu relatório completo</p>
              </div>
            </div>

            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Palette className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-gradient">{analysis.cartela}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8 blur-sm">{analysis.resumo}</p>

              {/* Características borradas */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 blur-sm">
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
            </CardContent>
          </Card>
        </div>

        {/* Oferta */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* O que você vai receber */}
          <Card className="glassmorphism border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Relatório Completo Inclui:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Sua cartela de coloração pessoal detalhada",
                  "Análise completa de pele, olhos e cabelo",
                  "Paleta completa com 50+ cores ideais",
                  "Recomendações para roupas e acessórios",
                  "Guia de maquiagem personalizado",
                  "Dicas de combinações de cores",
                  "Relatório em PDF para download",
                  "Acesso vitalício ao seu resultado",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Botão para ver PDF se disponível */}
              {analysis.linkPDF && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Prévia Disponível</span>
                  </div>
                  <p className="text-xs text-blue-700 mb-3">Veja uma prévia do seu relatório profissional</p>
                  <Button
                    onClick={handleViewPDF}
                    variant="outline"
                    size="sm"
                    className="w-full text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Prévia do PDF
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preço e CTA */}
          <Card className="glassmorphism border-0 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">OFERTA LIMITADA</div>
            </div>
            <CardHeader className="text-center pt-8">
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.9/5 - 2.847 avaliações)</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 line-through">De R$ 197,00</p>
                <p className="text-4xl font-bold text-primary">R$ 47,00</p>
                <p className="text-sm text-green-600 font-medium">Economia de R$ 150,00 (76% OFF)</p>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={handlePayment}
                size="lg"
                className="w-full group relative px-8 py-4 text-lg font-medium bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105 mb-4"
              >
                <div className="relative flex items-center justify-center gap-3">
                  <Lock className="h-5 w-5" />
                  <span>Desbloquear Resultado Completo</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Button>

              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Pagamento 100% seguro
                </p>
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Garantia de 7 dias
                </p>
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Acesso imediato
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Urgência */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full border border-red-200/50">
            <Clock className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">
              ⚡ Esta oferta expira em {formatTime(timeLeft)} - Não perca!
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
