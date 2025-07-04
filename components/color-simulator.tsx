"use client"

import { useState, useRef, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ColorSimulatorProps {
  imageUrl: string
  paletteColors: { hex: string; name: string }[]
}

export default function ColorSimulator({ imageUrl, paletteColors }: ColorSimulatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [intensity, setIntensity] = useState(50)
  const [selectedColor, setSelectedColor] = useState(paletteColors[0]?.hex || "#000000")
  const [activeTab, setActiveTab] = useState("roupa")

  // Efeito para renderizar a imagem no canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // Definir dimensões do canvas
      canvas.width = img.width
      canvas.height = img.height

      // Desenhar imagem original
      ctx.drawImage(img, 0, 0)

      // Aplicar efeito de cor baseado na aba ativa
      applyColorEffect(ctx, canvas.width, canvas.height, selectedColor, intensity / 100, activeTab)
    }

    img.src = imageUrl
  }, [imageUrl, selectedColor, intensity, activeTab])

  // Função para aplicar efeito de cor
  function applyColorEffect(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string,
    intensity: number,
    type: string,
  ) {
    // Obter dados da imagem
    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data

    // Converter cor hex para RGB
    const r = Number.parseInt(color.slice(1, 3), 16)
    const g = Number.parseInt(color.slice(3, 5), 16)
    const b = Number.parseInt(color.slice(5, 7), 16)

    // Aplicar efeito baseado no tipo
    if (type === "roupa") {
      // Simular roupa na parte inferior da imagem (simplificado)
      const startY = Math.floor(height * 0.6) // Começar a 60% da altura

      for (let y = startY; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4

          // Misturar cor original com a cor selecionada
          data[i] = Math.round(data[i] * (1 - intensity) + r * intensity)
          data[i + 1] = Math.round(data[i + 1] * (1 - intensity) + g * intensity)
          data[i + 2] = Math.round(data[i + 2] * (1 - intensity) + b * intensity)
        }
      }
    } else if (type === "batom") {
      // Simular batom (simplificado - na prática você precisaria de detecção facial)
      const centerX = width / 2
      const centerY = height * 0.7 // Aproximadamente onde a boca estaria
      const lipRadius = width * 0.1

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Calcular distância do centro da "boca"
          const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))

          // Se estiver dentro da área do "batom"
          if (distance < lipRadius) {
            const i = (y * width + x) * 4

            // Aplicar cor do batom com intensidade
            data[i] = Math.round(data[i] * (1 - intensity) + r * intensity)
            data[i + 1] = Math.round(data[i + 1] * (1 - intensity) + g * intensity)
            data[i + 2] = Math.round(data[i + 2] * (1 - intensity) + b * intensity)
          }
        }
      }
    } else if (type === "cabelo") {
      // Simular coloração de cabelo (simplificado)
      const hairTop = height * 0.1
      const hairBottom = height * 0.4

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          // Verificar se está na região do "cabelo"
          if (y > hairTop && y < hairBottom) {
            const i = (y * width + x) * 4

            // Verificar se o pixel é escuro (provavelmente cabelo)
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
            if (brightness < 100) {
              // Threshold para identificar cabelo
              // Aplicar cor ao cabelo
              data[i] = Math.round(data[i] * (1 - intensity) + r * intensity)
              data[i + 1] = Math.round(data[i + 1] * (1 - intensity) + g * intensity)
              data[i + 2] = Math.round(data[i + 2] * (1 - intensity) + b * intensity)
            }
          }
        }
      }
    }

    // Atualizar imagem
    ctx.putImageData(imageData, 0, 0)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold">Simulador de Cores</h3>
        <p className="text-gray-500">Veja como você ficaria com diferentes cores</p>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="roupa">Roupas</TabsTrigger>
          <TabsTrigger value="batom">Batom</TabsTrigger>
          <TabsTrigger value="cabelo">Cabelo</TabsTrigger>
        </TabsList>

        <TabsContent value="roupa" className="space-y-4">
          <p className="text-sm text-gray-500">Simule como você ficaria com roupas nesta cor</p>
        </TabsContent>

        <TabsContent value="batom" className="space-y-4">
          <p className="text-sm text-gray-500">Experimente diferentes tons de batom</p>
        </TabsContent>

        <TabsContent value="cabelo" className="space-y-4">
          <p className="text-sm text-gray-500">Veja como ficaria seu cabelo nesta cor</p>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Intensidade</label>
          <Slider value={[intensity]} min={0} max={100} step={1} onValueChange={(values) => setIntensity(values[0])} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Selecione uma cor</label>
          <div className="grid grid-cols-6 gap-2">
            {paletteColors.map((color) => (
              <button
                key={color.hex}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.hex ? "border-primary" : "border-transparent"
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color.hex)}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button variant="outline">Salvar Simulação</Button>
      </div>
    </div>
  )
}
