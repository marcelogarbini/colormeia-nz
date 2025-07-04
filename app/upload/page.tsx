"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft, Sun, Smile, Camera, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import UploadForm from "@/components/upload-form"
import Link from "next/link"

export default function UploadPage() {
  const router = useRouter()

  const handleStartAnalysis = async (imageFile: File, email: string) => {
    // Salvar dados temporariamente
    sessionStorage.setItem("uploadData", JSON.stringify({ email, fileName: imageFile.name }))

    // Converter imagem para base64 para salvar temporariamente
    const reader = new FileReader()
    reader.onload = () => {
      sessionStorage.setItem("uploadImage", reader.result as string)
      // Redirecionar para tela de análise
      router.push("/analise")
    }
    reader.readAsDataURL(imageFile)
  }

  const guidelines = [
    {
      title: "Iluminação Ideal",
      description:
        "A foto deve ser tirada em luz natural indireta, preferencialmente próxima a uma janela em um dia nublado, no início da manhã ou fim da tarde.",
      alert:
        "A foto deve ser tirada em luz natural indireta para evitar distorções. Luz solar direta ou luz artificial pode alterar a percepção dos subtons da pele, dos olhos e do cabelo, comprometendo a análise.",
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Ausência de Maquiagem",
      description: "A pele deve estar totalmente limpa, sem base, batom, rímel ou qualquer outro produto.",
      alert:
        "A presença de maquiagem, mesmo mínima, pode interferir na análise precisa dos subtons da pele. Por favor, remova toda a maquiagem antes de tirar a foto.",
      icon: <Smile className="h-5 w-5 text-pink-500" />,
    },
    {
      title: "Cabelo em Estado Natural",
      description:
        "O cabelo deve estar solto, sem acessórios e em sua textura natural (liso, ondulado, cacheado ou crespo).",
      alert:
        "A cor do cabelo pode ser influenciada por acessórios ou penteados artificiais. Certifique-se de que o cabelo esteja solto e natural para uma análise precisa.",
      icon: <Camera className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Composição da Imagem",
      description:
        "A imagem deve ter alta resolução, com boa nitidez e sem desfoque. O rosto deve estar centralizado, com o usuário olhando diretamente para a câmera.",
      alert: "Imagens desfocadas, com baixa resolução ou iluminação inadequada podem comprometer a análise.",
      icon: <Camera className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Fundo Neutro e Vestimenta Adequada",
      description: "Fundo de cor branca, cinza ou bege. Roupas de cores neutras e suaves.",
      alert: "Cores vibrantes ou fundos coloridos podem refletir na pele e comprometer a precisão da coloração.",
      icon: <Camera className="h-5 w-5 text-green-500" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-green-50/50">
      <div className="container max-w-4xl py-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="outline" size="icon" className="mr-4 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Envie sua Foto</h1>
            <p className="text-gray-600">Siga as instruções para obter a melhor análise</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">Upload</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="ml-2 text-sm text-gray-500">Análise</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="ml-2 text-sm text-gray-500">Resultado</span>
            </div>
          </div>
        </div>

        {/* Diretrizes para Envio da Imagem */}
        <Card className="neomorphism border-0 mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Diretrizes para Envio da Imagem</h2>
              <p className="text-gray-500">
                Para obter os melhores resultados, siga estas orientações ao tirar sua foto
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {guidelines.map((guideline, index) => (
                <div key={index} className="glassmorphism rounded-xl p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {guideline.icon}
                    <h3 className="font-bold text-lg">{guideline.title}</h3>
                  </div>
                  <p className="mb-3 text-gray-700 text-sm">{guideline.description}</p>
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-amber-700 rounded">
                    <span className="font-bold">⚠️ Alerta:</span> {guideline.alert}
                  </div>
                </div>
              ))}
            </div>

            {/* Dicas Rápidas */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold mb-3 text-blue-800">✅ Dicas Rápidas para a Foto Perfeita:</h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Use luz natural, de frente para uma janela</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Rosto neutro, sem maquiagem ou óculos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Fundo de cor neutra (ex: parede branca)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Cabelo solto e em estado natural</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Upload */}
        <Card className="neomorphism border-0">
          <CardContent className="pt-6">
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertTitle className="text-amber-800">Importante para melhores resultados</AlertTitle>
              <AlertDescription className="text-amber-700">
                Certifique-se de que sua foto segue as diretrizes acima para obter uma análise precisa e personalizada.
              </AlertDescription>
            </Alert>

            <UploadForm onUpload={handleStartAnalysis} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
