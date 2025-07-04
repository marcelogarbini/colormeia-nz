"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface UploadGuideProps {
  onContinue: () => void
}

export default function UploadGuide({ onContinue }: UploadGuideProps) {
  const guidelines = [
    {
      title: "Iluminação Ideal",
      description:
        "A foto deve ser tirada em luz natural indireta, preferencialmente próxima a uma janela em um dia nublado, no início da manhã ou fim da tarde.",
      alert:
        "A foto deve ser tirada em luz natural indireta para evitar distorções. Luz solar direta ou luz artificial pode alterar a percepção dos subtons da pele, dos olhos e do cabelo, comprometendo a análise.",
    },
    {
      title: "Ausência de Maquiagem",
      description: "A pele deve estar totalmente limpa, sem base, batom, rímel ou qualquer outro produto.",
      alert:
        "A presença de maquiagem, mesmo mínima, pode interferir na análise precisa dos subtons da pele. Por favor, remova toda a maquiagem antes de tirar a foto.",
    },
    {
      title: "Cabelo em Estado Natural",
      description:
        "O cabelo deve estar solto, sem acessórios e em sua textura natural (liso, ondulado, cacheado ou crespo).",
      alert:
        "A cor do cabelo pode ser influenciada por acessórios ou penteados artificiais. Certifique-se de que o cabelo esteja solto e natural para uma análise precisa.",
    },
    {
      title: "Composição da Imagem",
      description:
        "A imagem deve ter alta resolução, com boa nitidez e sem desfoque. O rosto deve estar centralizado, com o usuário olhando diretamente para a câmera.",
      alert: "Imagens desfocadas, com baixa resolução ou iluminação inadequada podem comprometer a análise.",
    },
    {
      title: "Fundo Neutro e Vestimenta Adequada",
      description: "Fundo de cor branca, cinza ou bege. Roupas de cores neutras e suaves.",
      alert: "Cores vibrantes ou fundos coloridos podem refletir na pele e comprometer a precisão da coloração.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Diretrizes para Envio da Imagem</h2>
        <p className="text-gray-500">Para obter os melhores resultados, siga estas orientações ao tirar sua foto</p>
      </div>

      <div className="space-y-6">
        {guidelines.map((guideline, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">{guideline.title}</h3>
            <p className="mb-3 text-gray-700">{guideline.description}</p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 text-sm text-amber-700">
              <span className="font-bold">⚠️ Alerta:</span> {guideline.alert}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button onClick={onContinue} size="lg" className="gap-2">
          Continuar para Upload <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
