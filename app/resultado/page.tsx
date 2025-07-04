"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, Palette, CheckCircle, Star, Share2 } from "lucide-react"
import { getMainColorsForPalette } from "@/lib/utils"

interface AnalysisResult {
  cartela: string
  resumo: string
  caracteristicas: {
    subtom: string
    profundidade: string
    contraste: string
  }
}

export default function ResultadoPage() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("resumo")
  const router = useRouter()

  useEffect(() => {
    // Verificar se o pagamento foi concluído
    const paymentCompleted = sessionStorage.getItem("paymentCompleted")
    if (!paymentCompleted) {
      router.push("/checkout")
      return
    }

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

  const handleDownloadPDF = () => {
    // Implementar download do PDF
    alert("Download do PDF será implementado em breve!")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Minha Cartela de Coloração: ${analysis?.cartela}`,
        text: "Descobri minha cartela de coloração pessoal com IA!",
        url: window.location.href,
      })
    } else {
      // Fallback para copiar link
      navigator.clipboard.writeText(window.location.href)
      alert("Link copiado para a área de transferência!")
    }
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Carregando seu resultado...</p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="container max-w-4xl py-20 text-center">
        <p>Nenhum resultado encontrado.</p>
        <Button onClick={() => router.push("/upload")} className="mt-4">
          Nova Análise
        </Button>
      </div>
    )
  }

  const paletteColors = getMainColorsForPalette(analysis.cartela)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-green-50/50">
      <div className="container max-w-5xl py-10">
        {/* Header de Sucesso */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4" />
            Pagamento Confirmado - Acesso Liberado!
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            Seu Relatório Completo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Parabéns! Agora você tem acesso completo à sua análise de coloração pessoal
          </p>
        </div>

        {/* Resultado Principal */}
        <div className="mb-12 animate-fade-in-scale">
          <Card className="neomorphism border-0 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Palette className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-gradient">
                {analysis.cartela}
              </CardTitle>
              <div className="flex items-center justify-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                ))}
                <span className="text-sm text-gray-600 ml-2">Análise Profissional</span>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
                {analysis.resumo}
              </p>

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

              {/* Ações */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleDownloadPDF}
                  size="lg"
                  className="group relative px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white border-0 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105"
                >
                  <div className="relative flex items-center gap-3">
                    <Download className="h-5 w-5" />
                    <span>Baixar PDF Completo</span>
                  </div>
                </Button>

                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="lg"
                  className="btn-apple px-8 py-4 text-lg font-medium rounded-2xl bg-transparent"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Detalhado */}
        <Tabs defaultValue="resumo" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="resumo">📋 Resumo</TabsTrigger>
            <TabsTrigger value="paleta">🎨 Paleta</TabsTrigger>
            <TabsTrigger value="relatorio">📄 Relatório</TabsTrigger>
          </TabsList>

          <TabsContent value="resumo">
            <Card className="neomorphism border-0">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold mb-2">Características da {analysis.cartela}</h3>
                    <p className="text-gray-500">Entenda as características que definem sua coloração pessoal</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Características Físicas</h4>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="pele">
                          <AccordionTrigger>Tom de Pele</AccordionTrigger>
                          <AccordionContent>
                            {analysis.cartela.includes("Inverno") ? (
                              <>
                                A pele é verde-oliva, neutra ou neutra-fria, o que significa que ouro e prata ficam bem
                                contra ela, mas o prata fica ainda melhor. Pode variar de claro a profundo.
                                Independentemente de sua cor, a pele de {analysis.cartela} sempre contrasta com os cabelos e os
                                olhos.
                              </>
                            ) : analysis.cartela
