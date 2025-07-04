"use client"

import { useState } from "react"
import { Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ColorPalette from "@/components/color-palette"
import PdfViewer from "@/components/pdf-viewer"

export default function ResultadoPage() {
  const [activeTab, setActiveTab] = useState("resumo")

  // Dados simulados do resultado da análise
  const analysisResult = {
    cartela: "Inverno Escuro",
    resumo:
      "Sua análise indica que você pertence à cartela Inverno Escuro. Sua pele possui subtom neutro-frio, com olhos escuros e intensos, e cabelo castanho escuro com tonalidade neutra. Estas características criam um alto contraste natural que é melhor realçado com cores frias, intensas e saturadas da paleta Inverno Escuro.",
  }

  // Cores da paleta Inverno Escuro
  const paletteColors = [
    { hex: "#000000", name: "Preto" },
    { hex: "#FFFFFF", name: "Branco Puro" },
    { hex: "#0C0B1D", name: "Azul Marinho" },
    { hex: "#800020", name: "Bordô" },
    { hex: "#1B1B1B", name: "Cinza Escuro" },
    { hex: "#26428B", name: "Azul Royal" },
    { hex: "#3D0C02", name: "Marrom Escuro" },
    { hex: "#800080", name: "Roxo" },
    { hex: "#DC143C", name: "Vermelho Carmesim" },
    { hex: "#008080", name: "Verde Petróleo" },
    { hex: "#4B0082", name: "Índigo" },
    { hex: "#B22222", name: "Vermelho Tijolo" },
  ]

  return (
    <div className="container max-w-5xl py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Resultado da Análise</h1>
        <p className="text-gray-500">Sua cartela de coloração pessoal foi identificada</p>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-lg p-8 mb-10 text-center">
        <h2 className="text-4xl font-bold mb-4">{analysisResult.cartela}</h2>
        <p className="text-lg max-w-3xl mx-auto">{analysisResult.resumo}</p>
      </div>

      <Tabs defaultValue="resumo" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="paleta">Paleta de Cores</TabsTrigger>
          <TabsTrigger value="relatorio">Relatório Completo</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-2">Características do Inverno Escuro</h3>
                  <p className="text-gray-500">Entenda as características que definem sua coloração pessoal</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Características Físicas</h4>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="pele">
                        <AccordionTrigger>Tom de Pele</AccordionTrigger>
                        <AccordionContent>
                          A pele é verde-oliva, neutra ou neutra-fria, o que significa que ouro e prata ficam bem contra
                          ela, mas o prata fica ainda melhor. Pode variar de claro a profundo. Independentemente de sua
                          cor, a pele de Inverno Escuro sempre contrasta com os cabelos e os olhos.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="olhos">
                        <AccordionTrigger>Olhos</AccordionTrigger>
                        <AccordionContent>
                          Os olhos de Inverno Escuro são, é claro, escuros. Não é surpresa que as cores dos olhos mais
                          comuns sejam marrom escuro e preto. Um azul muito profundo e fresco também é possível. Você
                          pode notar uma borda que define a íris e os raios da íris, característicos dos olhos de
                          Inverno.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="cabelo">
                        <AccordionTrigger>Cabelo</AccordionTrigger>
                        <AccordionContent>
                          O cabelo do Inverno Escuro também é escuro, variando do marrom médio, marrom escuro ao preto.
                          A cor tende a ser neutra ou ligeiramente cinza. Geralmente, não possui highlights e também não
                          desenvolve nenhuma quando exposto à luz solar. Manter a raiz sempre escura e fazer iluminado
                          leve nas pontas caso deseje um visual mais leve e iluminado.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Recomendações</h4>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="roupas">
                        <AccordionTrigger>Roupas</AccordionTrigger>
                        <AccordionContent>
                          A profundidade da paleta de cores do Inverno Escuro é melhor destacada quando você usa suas
                          cores em combinações de alto contraste. Esse nível de contraste reflete o alto contraste já
                          presente na sua aparência natural, criando um visual harmonioso e poderoso. Para alcançar esse
                          efeito, você pode combinar um tom neutro com uma cor de destaque escura ou misturar um neutro
                          mais escuro com uma cor de destaque mais brilhante.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="maquiagem">
                        <AccordionTrigger>Maquiagem</AccordionTrigger>
                        <AccordionContent>
                          Batom é onde Inverno Escuro se destaca! Esta estação pode sair com cores profundamente
                          intensas que fazem outras estações parecerem vampiros. Mas o Inverno Escuro geralmente fica
                          melhor quando deixa seus lábios ocuparem o centro do palco em tons profundos, como ameixa e
                          bordô. Como seus olhos têm uma intensidade natural, um lábio brilhante pode equilibrar seu
                          rosto de maneira agradável.
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="acessorios">
                        <AccordionTrigger>Acessórios</AccordionTrigger>
                        <AccordionContent>
                          Para acessórios, opte por metais prateados ou brancos que complementam o subtom frio da sua
                          pele. Joias com pedras em cores intensas como rubi, safira e esmeralda são excelentes
                          escolhas. Evite ouro amarelo e metais com tons quentes, pois podem criar um contraste
                          desarmônico com sua coloração natural.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button onClick={() => setActiveTab("paleta")} className="gap-2">
                    Ver Paleta de Cores <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paleta">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-2">Sua Paleta de Cores</h3>
                  <p className="text-gray-500">Cores que valorizam sua beleza natural</p>
                </div>

                <ColorPalette colors={paletteColors} />

                <div className="mt-8 space-y-6">
                  <h4 className="font-bold text-lg">Combinações Recomendadas</h4>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { name: "Neutro Claro + Escuro", colors: ["#FFFFFF", "#000000"] },
                      { name: "Total Escuro", colors: ["#0C0B1D", "#800020"] },
                      { name: "Neutro Escuro + Claro", colors: ["#1B1B1B", "#26428B"] },
                      { name: "Contraste Alto", colors: ["#FFFFFF", "#DC143C"] },
                      { name: "Tons Frios", colors: ["#008080", "#4B0082"] },
                      { name: "Elegância", colors: ["#000000", "#800080"] },
                    ].map((combo, i) => (
                      <div key={i} className="border rounded-lg p-3">
                        <div className="flex space-x-2 mb-2">
                          {combo.colors.map((color, j) => (
                            <div key={j} className="w-8 h-8 rounded-full border" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <p className="text-sm font-medium">{combo.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <Button onClick={() => setActiveTab("relatorio")} className="gap-2">
                    Ver Relatório Completo <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorio">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold mb-2">Relatório Completo</h3>
                  <p className="text-gray-500">Visualize e baixe seu relatório personalizado</p>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <PdfViewer cartela="Inverno Escuro" />
                </div>

                <div className="flex justify-center mt-6">
                  <Button className="gap-2">
                    <Download className="h-4 w-4" /> Baixar Relatório PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
