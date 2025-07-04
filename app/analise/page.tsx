"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UploadGuide from "@/components/upload-guide"
import UploadForm from "@/components/upload-form"

export default function AnalisePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("guia")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleStartAnalysis = (imageFile: File) => {
    // Normalmente aqui enviaríamos a imagem para processamento
    // Para fins de demonstração, vamos simular o processamento e redirecionar
    router.push("/analise/processando")
  }

  return (
    <div className="container max-w-5xl py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Análise de Coloração Pessoal</h1>

      <Tabs defaultValue="guia" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guia">Guia de Foto</TabsTrigger>
          <TabsTrigger value="upload">Enviar Foto</TabsTrigger>
        </TabsList>

        <TabsContent value="guia">
          <Card>
            <CardContent className="pt-6">
              <UploadGuide onContinue={() => setActiveTab("upload")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardContent className="pt-6">
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Importante</AlertTitle>
                <AlertDescription>
                  Certifique-se de que sua foto segue as diretrizes para obter os melhores resultados.
                </AlertDescription>
              </Alert>

              <UploadForm onUpload={handleStartAnalysis} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
