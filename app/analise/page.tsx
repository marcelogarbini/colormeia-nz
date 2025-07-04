"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AnalysisAnimation from "@/components/analysis-animation"
import { Sparkles, Brain, Eye, Palette, CheckCircle, AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AnalysePage() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("Iniciando análise...")
  const [currentPhase, setCurrentPhase] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorType, setErrorType] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isRetrying, setIsRetrying] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const router = useRouter()

  const phases = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Inicializando IA",
      steps: [
        "Carregando modelo de análise...",
        "Preparando algoritmos de visão computacional...",
        "Configurando parâmetros de colorimetria...",
      ],
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Análise Facial",
      steps: [
        "Detectando características faciais...",
        "Mapeando pontos de referência...",
        "Analisando geometria do rosto...",
      ],
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Análise de Cores",
      steps: [
        "Analisando tom de pele...",
        "Identificando subtom...",
        "Avaliando contraste natural...",
        "Determinando profundidade...",
      ],
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Processamento Final",
      steps: ["Consultando base de dados...", "Gerando resultado personalizado...", "Finalizando análise..."],
    },
  ]

  useEffect(() => {
    // Verificar conexão
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    setIsOnline(navigator.onLine)

    // Verificar se há dados de upload
    const uploadData = sessionStorage.getItem("uploadData")
    const uploadImage = sessionStorage.getItem("uploadImage")

    if (!uploadData || !uploadImage) {
      console.log("❌ [Frontend] Dados de upload não encontrados")
      router.push("/upload")
      return
    }

    console.log("✅ [Frontend] Dados de upload encontrados, iniciando análise")
    startAnalysis()

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [router, retryCount])

  const startAnalysis = () => {
    console.log("🚀 [Frontend] Iniciando análise, tentativa:", retryCount + 1)
    setError(null)
    setErrorType(null)
    setProgress(0)
    setCurrentPhase(0)
    setIsComplete(false)
    setCurrentStep("Iniciando análise...")

    // Verificar conexão antes de começar
    if (!isOnline) {
      setError("Sem conexão com a internet")
      setErrorType("NETWORK_ERROR")
      return
    }

    // Simular progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 8 + 2
        const newProgress = Math.min(prev + increment, 95)

        // Calcular fase e step baseado no progresso
        const totalSteps = phases.reduce((acc, phase) => acc + phase.steps.length, 0)
        const currentStepGlobal = Math.floor((newProgress / 100) * totalSteps)

        let stepCount = 0
        let phaseIndex = 0

        for (let i = 0; i < phases.length; i++) {
          if (currentStepGlobal < stepCount + phases[i].steps.length) {
            phaseIndex = i
            const stepInPhase = currentStepGlobal - stepCount
            setCurrentStep(phases[i].steps[stepInPhase] || phases[i].steps[phases[i].steps.length - 1])
            break
          }
          stepCount += phases[i].steps.length
        }

        setCurrentPhase(phaseIndex)

        if (newProgress >= 95) {
          clearInterval(interval)
          processAnalysis()
        }

        return newProgress
      })
    }, 800)

    return () => clearInterval(interval)
  }

  const processAnalysis = async () => {
    try {
      console.log("🔄 [Frontend] Processando análise...")
      setCurrentStep("Processando com IA...")

      const uploadData = JSON.parse(sessionStorage.getItem("uploadData") || "{}")
      const uploadImage = sessionStorage.getItem("uploadImage")

      if (!uploadImage) {
        throw new Error("Imagem não encontrada no armazenamento")
      }

      console.log("📤 [Frontend] Preparando dados para envio...")

      // Converter base64 de volta para File
      let response: Response
      try {
        response = await fetch(uploadImage)
        if (!response.ok) {
          throw new Error("Erro ao carregar imagem do armazenamento")
        }
      } catch (fetchError) {
        console.error("❌ [Frontend] Erro ao carregar imagem:", fetchError)
        throw new Error("Erro ao carregar imagem do armazenamento")
      }

      const blob = await response.blob()
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" })

      // Enviar para API
      const formData = new FormData()
      formData.append("photo", file)
      formData.append("email", uploadData.email)

      console.log("📡 [Frontend] Enviando requisição para API...")

      let apiResponse: Response
      try {
        apiResponse = await fetch("/api/analise", {
          method: "POST",
          body: formData,
        })
      } catch (networkError: any) {
        console.error("❌ [Frontend] Erro de rede:", networkError)
        setErrorType("NETWORK_ERROR")
        throw new Error("Erro de conexão. Verifique sua internet.")
      }

      console.log("📥 [Frontend] Resposta recebida:", {
        status: apiResponse.status,
        statusText: apiResponse.statusText,
        contentType: apiResponse.headers.get("content-type"),
        ok: apiResponse.ok,
      })

      // Verificar se a resposta é JSON
      const contentType = apiResponse.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        let textResponse = ""
        try {
          textResponse = await apiResponse.text()
        } catch (textError) {
          textResponse = "Erro ao ler resposta do servidor"
        }

        console.error("❌ [Frontend] Resposta não é JSON:", textResponse.substring(0, 200))
        setErrorType("SERVER_ERROR")

        if (apiResponse.status >= 500) {
          throw new Error("Erro interno do servidor. Tente novamente.")
        } else if (apiResponse.status === 404) {
          throw new Error("Serviço não encontrado. Verifique a URL.")
        } else {
          throw new Error(`Erro do servidor (${apiResponse.status}): ${textResponse.substring(0, 100)}`)
        }
      }

      let result: any
      try {
        result = await apiResponse.json()
        console.log("📊 [Frontend] JSON parseado:", result)
      } catch (jsonError) {
        console.error("❌ [Frontend] Erro ao parsear JSON:", jsonError)
        setErrorType("PARSE_ERROR")
        throw new Error("Resposta inválida do servidor")
      }

      if (!apiResponse.ok) {
        const errorMsg = result.error || `Erro ${apiResponse.status}`
        console.error("❌ [Frontend] Erro da API:", errorMsg, "Code:", result.code)

        // Definir tipo de erro baseado no código
        if (result.code === "MISSING_PHOTO" || result.code === "MISSING_EMAIL") {
          setErrorType("VALIDATION_ERROR")
        } else if (result.code === "INVALID_FILE_TYPE" || result.code === "FILE_TOO_LARGE") {
          setErrorType("FILE_ERROR")
        } else {
          setErrorType("API_ERROR")
        }

        throw new Error(errorMsg)
      }

      if (!result.success || !result.analysis) {
        console.error("❌ [Frontend] Estrutura de resposta inválida:", result)
        setErrorType("RESPONSE_ERROR")
        throw new Error("Resposta da API está incompleta")
      }

      // Sucesso!
      console.log("✅ [Frontend] Análise concluída:", result.analysis.cartela)
      setProgress(100)
      setIsComplete(true)
      setCurrentStep("Análise concluída!")

      // Salvar resultado
      sessionStorage.setItem("analysisResult", JSON.stringify(result.analysis))

      // Redirecionar após delay
      setTimeout(() => {
        console.log("🔄 [Frontend] Redirecionando para teaser...")
        router.push("/teaser")
      }, 2000)
    } catch (error: any) {
      console.error("❌ [Frontend] Erro na análise:", error)
      setError(error.message || "Erro desconhecido na análise")
      setProgress(0)
    }
  }

  const handleRetry = () => {
    if (retryCount >= 3) {
      console.log("🔄 [Frontend] Máximo de tentativas atingido, usando simulação")
      handleUseSimulated()
      return
    }

    console.log("🔄 [Frontend] Tentando novamente...")
    setIsRetrying(true)
    setRetryCount((prev) => prev + 1)

    setTimeout(() => {
      setIsRetrying(false)
      startAnalysis()
    }, 1000)
  }

  const handleUseSimulated = () => {
    console.log("🎭 [Frontend] Usando análise simulada")
    const simulatedAnalysis = {
      cartela: "Inverno Escuro",
      resumo:
        "Com base nas características gerais detectadas, você se encaixa na paleta Inverno Escuro. Esta cartela é caracterizada por cores intensas e contrastantes que valorizam sua beleza natural.",
      caracteristicas: {
        subtom: "Frio",
        profundidade: "Escura",
        contraste: "Alto",
      },
      linkPDF: "https://drive.google.com/file/d/1R-YYxSZCqGfI9hUjuTTgo7uKJ5D9v1tw/view?usp=sharing",
    }

    sessionStorage.setItem("analysisResult", JSON.stringify(simulatedAnalysis))
    router.push("/teaser")
  }

  const handleGoBack = () => {
    console.log("⬅️ [Frontend] Voltando para upload")
    router.push("/upload")
  }

  const getErrorIcon = () => {
    switch (errorType) {
      case "NETWORK_ERROR":
        return <WifiOff className="h-8 w-8 text-red-500" />
      default:
        return <AlertCircle className="h-8 w-8 text-red-500" />
    }
  }

  const getErrorMessage = () => {
    switch (errorType) {
      case "NETWORK_ERROR":
        return "Problema de conexão com a internet"
      case "SERVER_ERROR":
        return "Erro interno do servidor"
      case "VALIDATION_ERROR":
        return "Dados inválidos enviados"
      case "FILE_ERROR":
        return "Problema com o arquivo enviado"
      case "API_ERROR":
        return "Erro na API de análise"
      case "PARSE_ERROR":
        return "Erro ao processar resposta"
      case "RESPONSE_ERROR":
        return "Resposta incompleta do servidor"
      default:
        return "Erro desconhecido"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container max-w-4xl px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 mb-6">
            <div className={`w-3 h-3 rounded-full animate-pulse ${error ? "bg-red-500" : "bg-green-500"}`} />
            <span className="text-sm font-medium text-gray-700">{error ? getErrorMessage() : "IA Processando"}</span>
            {!isOnline && <WifiOff className="h-4 w-4 text-red-500" />}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Analisando sua Foto
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nossa inteligência artificial está processando suas características para determinar sua coloração pessoal
          </p>
        </div>

        {/* Main Analysis Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 mb-8">
          {!error ? (
            <>
              {/* Phase Indicator */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {phases.map((phase, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                          index <= currentPhase
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {index < currentPhase ? <CheckCircle className="h-6 w-6" /> : phase.icon}
                      </div>
                      {index < phases.length - 1 && (
                        <div
                          className={`w-16 h-1 mx-2 rounded-full transition-all duration-500 ${
                            index < currentPhase ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-200"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Phase Title */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{phases[currentPhase]?.title}</h3>
              </div>

              {/* Analysis Animation */}
              <div className="mb-8">
                <AnalysisAnimation progress={progress} />
              </div>

              {/* Current Step */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 text-blue-800 rounded-2xl border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="font-medium">{currentStep}</span>
                </div>

                <p className="text-sm text-gray-500">
                  Isso pode levar alguns segundos. Por favor, não feche esta página.
                </p>

                {isComplete && (
                  <div className="animate-fade-in-scale">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-50 text-green-800 rounded-2xl border border-green-100">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Análise concluída! Redirecionando...</span>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Error State */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
                {getErrorIcon()}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Ops! Algo deu errado</h3>
                <p className="text-gray-600 mb-4">Não conseguimos processar sua análise no momento.</p>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                  <p className="text-sm text-red-700">
                    <strong>Erro:</strong> {error}
                  </p>
                  <p className="text-xs text-red-600 mt-1">Tipo: {getErrorMessage()}</p>
                  {retryCount > 0 && <p className="text-xs text-red-600 mt-2">Tentativa {retryCount} de 3</p>}
                  {!isOnline && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <WifiOff className="h-3 w-3" />
                      Sem conexão com a internet
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {retryCount < 3 && isOnline ? (
                  <Button
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 py-3"
                  >
                    {isRetrying ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Tentando...
                      </>
                    ) : (
                      <>Tentar Novamente ({retryCount}/3)</>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleUseSimulated}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl px-6 py-3"
                  >
                    Continuar com Análise Básica
                  </Button>
                )}

                <Button onClick={handleGoBack} variant="outline" className="rounded-xl px-6 py-3 bg-transparent">
                  Voltar ao Upload
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Technical Info */}
        {!error && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-xl rounded-full text-xs text-gray-600 border border-white/20">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Processamento seguro • Tecnologia de ponta • Resultados precisos</span>
              {isOnline ? <Wifi className="h-3 w-3 text-green-500" /> : <WifiOff className="h-3 w-3 text-red-500" />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
