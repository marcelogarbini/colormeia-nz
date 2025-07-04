"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ColorPalette from "@/components/color-palette"
import SimplePdfViewer from "@/components/simple-pdf-viewer"
import { getMainColorsForPalette } from "@/lib/utils"

export default function ResultadoPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("resumo")

  // Obter a cartela da URL ou usar um valor padrão
  const cartela = searchParams.get("cartela") || "Inverno Escuro"
  const resumo = searchParams.get("resumo") || "Análise não disponível."

  // Cores da paleta baseadas na cartela
  const paletteColors = getMainColorsForPalette(cartela)

  return (
    <div className="container max-w-5xl py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Resultado da Análise</h1>
        <p className="text-gray-500">Sua cartela de coloração pessoal foi identificada</p>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white rounded-lg p-8 mb-10 text-center">
        <h2 className="text-4xl font-bold mb-4">{cartela}</h2>
        <p className="text-lg max-w-3xl mx-auto">{resumo}</p>
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
                  <h3 className="text-2xl font-bold mb-2">Características da {cartela}</h3>
                  <p className="text-gray-500">Entenda as características que definem sua coloração pessoal</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Características Físicas</h4>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="pele">
                        <AccordionTrigger>Tom de Pele</AccordionTrigger>
                        <AccordionContent>
                          {cartela.includes("Inverno") ? (
                            <>
                              A pele é verde-oliva, neutra ou neutra-fria, o que significa que ouro e prata ficam bem
                              contra ela, mas o prata fica ainda melhor. Pode variar de claro a profundo.
                              Independentemente de sua cor, a pele de {cartela} sempre contrasta com os cabelos e os
                              olhos.
                            </>
                          ) : cartela.includes("Outono") ? (
                            <>
                              A pele tem um subtom quente, dourado ou amarelado. Pode variar de clara a escura, mas
                              sempre apresenta esse calor característico. Tons de ouro e bronze complementam bem essa
                              coloração.
                            </>
                          ) : cartela.includes("Primavera") ? (
                            <>
                              A pele tem um subtom quente e luminoso, com um brilho natural. Geralmente apresenta um tom
                              pêssego ou dourado claro. Pode ter sardas douradas e reage bem ao sol, bronzeando-se
                              facilmente.
                            </>
                          ) : (
                            <>
                              A pele tem um subtom rosado ou azulado, caracteristicamente frio. Pode variar de muito
                              clara a média, mas sempre mantém essa qualidade fria. Joias prateadas complementam bem
                              essa coloração.
                            </>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="olhos">
                        <AccordionTrigger>Olhos</AccordionTrigger>
                        <AccordionContent>
                          {cartela.includes("Inverno") ? (
                            <>
                              Os olhos de {cartela} são, é claro, escuros. Não é surpresa que as cores dos olhos mais
                              comuns sejam marrom escuro e preto. Um azul muito profundo e fresco também é possível.
                              Você pode notar uma borda que define a íris e os raios da íris, característicos dos olhos
                              de Inverno.
                            </>
                          ) : cartela.includes("Outono") ? (
                            <>
                              Os olhos geralmente apresentam tons quentes e terrosos, como âmbar, castanho dourado,
                              verde oliva ou avelã. Frequentemente têm manchas ou raios dourados que adicionam
                              profundidade e calor ao olhar.
                            </>
                          ) : cartela.includes("Primavera") ? (
                            <>
                              Os olhos são claros e brilhantes, podendo ser azuis, verdes claros, âmbar ou castanhos
                              claros. Geralmente apresentam manchas douradas ou um brilho especial que reflete a
                              luminosidade característica dessa estação.
                            </>
                          ) : (
                            <>
                              Os olhos têm tons frios e suaves, como azul acinzentado, verde-água ou castanho com tons
                              frios. A íris geralmente apresenta um padrão delicado e uma transição suave entre as
                              cores.
                            </>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="cabelo">
                        <AccordionTrigger>Cabelo</AccordionTrigger>
                        <AccordionContent>
                          {cartela.includes("Inverno") ? (
                            <>
                              O cabelo do {cartela} também é escuro, variando do marrom médio, marrom escuro ao preto. A
                              cor tende a ser neutra ou ligeiramente cinza. Geralmente, não possui highlights e também
                              não desenvolve nenhuma quando exposto à luz solar. Manter a raiz sempre escura e fazer
                              iluminado leve nas pontas caso deseje um visual mais leve e iluminado.
                            </>
                          ) : cartela.includes("Outono") ? (
                            <>
                              O cabelo apresenta tons quentes e terrosos, como castanho avermelhado, ruivo, cobre ou
                              castanho dourado. Frequentemente tem reflexos naturais que brilham ao sol, realçando a
                              riqueza e profundidade da cor.
                            </>
                          ) : cartela.includes("Primavera") ? (
                            <>
                              O cabelo tem tons dourados e luminosos, como loiro dourado, castanho claro com reflexos
                              dourados ou ruivo claro. Tende a clarear naturalmente com a exposição ao sol e possui um
                              brilho característico.
                            </>
                          ) : (
                            <>
                              O cabelo apresenta tons frios e suaves, como loiro acinzentado, castanho médio com
                              reflexos frios ou castanho claro sem dourados. A textura tende a ser fina e delicada,
                              complementando a suavidade geral da aparência.
                            </>
                          )}
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
                          {cartela.includes("Inverno") ? (
                            <>
                              A profundidade da paleta de cores do {cartela} é melhor destacada quando você usa suas
                              cores em combinações de alto contraste. Esse nível de contraste reflete o alto contraste
                              já presente na sua aparência natural, criando um visual harmonioso e poderoso. Para
                              alcançar esse efeito, você pode combinar um tom neutro com uma cor de destaque escura ou
                              misturar um neutro mais escuro com uma cor de destaque mais brilhante.
                            </>
                          ) : cartela.includes("Outono") ? (
                            <>
                              Para valorizar sua coloração natural, opte por cores terrosas e quentes como marrom, verde
                              oliva, mostarda, laranja queimado e bordô. Tecidos com textura e acabamentos matte
                              complementam bem essa paleta. Evite cores muito frias ou neon, que podem criar um
                              contraste desarmônico com sua aparência.
                            </>
                          ) : cartela.includes("Primavera") ? (
                            <>
                              Sua paleta de roupas ideal inclui cores vibrantes e luminosas como coral, amarelo claro,
                              verde-limão, turquesa e pêssego. Tecidos leves e com brilho natural realçam sua
                              luminosidade característica. Evite cores muito escuras ou opacas, que podem diminuir seu
                              brilho natural.
                            </>
                          ) : (
                            <>
                              Sua paleta de roupas ideal inclui tons suaves e frios como lavanda, azul-gelo, rosa claro
                              e cinza perolado. Tecidos fluidos e com acabamento suave complementam sua delicadeza
                              natural. Evite cores muito intensas ou quentes, que podem sobrecarregar sua aparência
                              suave.
                            </>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="maquiagem">
                        <AccordionTrigger>Maquiagem</AccordionTrigger>
                        <AccordionContent>
                          {cartela.includes("Inverno") ? (
                            <>
                              Batom é onde {cartela} se destaca! Esta estação pode sair com cores profundamente intensas
                              que fazem outras estações parecerem vampiros. Mas o {cartela} geralmente fica melhor
                              quando deixa seus lábios ocuparem o centro do palco em tons profundos, como ameixa e
                              bordô. Como seus olhos têm uma intensidade natural, um lábio brilhante pode equilibrar seu
                              rosto de maneira agradável.
                            </>
                          ) : cartela.includes("Outono") ? (
                            <>
                              Para maquiagem, escolha batons em tons de terracota, pêssego escuro, marrom avermelhado ou
                              vermelho tijolo. Sombras em tons de bronze, cobre, verde oliva ou marrom complementam bem
                              seus olhos. Blush em tons de pêssego ou terracota adiciona um calor natural ao seu rosto.
                            </>
                          ) : cartela.includes("Primavera") ? (
                            <>
                              Sua maquiagem ideal inclui batons em tons de coral, pêssego, vermelho-laranja ou rosa
                              quente. Sombras em tons de pêssego, dourado, verde-água ou coral claro iluminam seu olhar.
                              Blush em tons de pêssego ou coral adiciona um brilho saudável à sua pele.
                            </>
                          ) : (
                            <>
                              Para maquiagem, escolha batons em tons de rosa suave, ameixa claro ou framboesa. Sombras
                              em tons de lavanda, cinza perolado, azul claro ou rosa suave valorizam seus olhos. Blush
                              em tons de rosa frio ou lilás complementa perfeitamente seu subtom.
                            </>
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="acessorios">
                        <AccordionTrigger>Acessórios</AccordionTrigger>
                        <AccordionContent>
                          {cartela.includes("Inverno") ? (
                            <>
                              Para acessórios, opte por metais prateados ou brancos que complementam o subtom frio da
                              sua pele. Joias com pedras em cores intensas como rubi, safira e esmeralda são excelentes
                              escolhas. Evite ouro amarelo e metais com tons quentes, pois podem criar um contraste
                              desarmônico com sua coloração natural.
                            </>
                          ) : cartela.includes("Outono") ? (
                            <>
                              Para acessórios, escolha metais em tons de ouro, bronze ou cobre, que complementam o
                              subtom quente da sua pele. Joias com pedras em cores terrosas como âmbar, topázio, granada
                              ou jade são excelentes escolhas. Evite prata e metais muito frios.
                            </>
                          ) : cartela.includes("Primavera") ? (
                            <>
                              Seus acessórios ideais incluem metais em ouro amarelo ou rose gold, que complementam o
                              subtom quente da sua pele. Joias com pedras em cores vibrantes como turquesa, citrino,
                              peridoto ou coral são excelentes escolhas. Evite metais muito escuros ou oxidados.
                            </>
                          ) : (
                            <>
                              Para acessórios, opte por metais prateados ou brancos que complementam o subtom frio da
                              sua pele. Joias com pedras em cores suaves como água-marinha, ametista clara e quartzo
                              rosa são excelentes escolhas. Evite ouro amarelo e metais com tons muito quentes.
                            </>
                          )}
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
                    {cartela.includes("Inverno") ? (
                      <>
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
                                <div
                                  key={j}
                                  className="w-8 h-8 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <p className="text-sm font-medium">{combo.name}</p>
                          </div>
                        ))}
                      </>
                    ) : cartela.includes("Outono") ? (
                      <>
                        {[
                          { name: "Terrosos", colors: ["#8B4513", "#A0522D"] },
                          { name: "Naturais", colors: ["#556B2F", "#BDB76B"] },
                          { name: "Quentes", colors: ["#CD5C5C", "#B8860B"] },
                          { name: "Profundos", colors: ["#800000", "#2F4F4F"] },
                          { name: "Neutros", colors: ["#D2B48C", "#5F5F5F"] },
                          { name: "Aconchegantes", colors: ["#DAA520", "#8B0000"] },
                        ].map((combo, i) => (
                          <div key={i} className="border rounded-lg p-3">
                            <div className="flex space-x-2 mb-2">
                              {combo.colors.map((color, j) => (
                                <div
                                  key={j}
                                  className="w-8 h-8 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <p className="text-sm font-medium">{combo.name}</p>
                          </div>
                        ))}
                      </>
                    ) : cartela.includes("Primavera") ? (
                      <>
                        {[
                          { name: "Vibrantes", colors: ["#FF6347", "#FFD700"] },
                          { name: "Luminosos", colors: ["#00BFFF", "#7FFF00"] },
                          { name: "Alegres", colors: ["#FF69B4", "#FFFF00"] },
                          { name: "Frescos", colors: ["#40E0D0", "#FF8C00"] },
                          { name: "Claros", colors: ["#F0E68C", "#98FB98"] },
                          { name: "Energéticos", colors: ["#FF4500", "#00CED1"] },
                        ].map((combo, i) => (
                          <div key={i} className="border rounded-lg p-3">
                            <div className="flex space-x-2 mb-2">
                              {combo.colors.map((color, j) => (
                                <div
                                  key={j}
                                  className="w-8 h-8 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <p className="text-sm font-medium">{combo.name}</p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {[
                          { name: "Suaves", colors: ["#B0C4DE", "#D8BFD8"] },
                          { name: "Delicados", colors: ["#E6E6FA", "#F0F8FF"] },
                          { name: "Frios", colors: ["#ADD8E6", "#F0FFFF"] },
                          { name: "Pastéis", colors: ["#FFE4E1", "#E0FFFF"] },
                          { name: "Serenos", colors: ["#F5F5DC", "#E6E6FA"] },
                          { name: "Tranquilos", colors: ["#F0F8FF", "#E6E6FA"] },
                        ].map((combo, i) => (
                          <div key={i} className="border rounded-lg p-3">
                            <div className="flex space-x-2 mb-2">
                              {combo.colors.map((color, j) => (
                                <div
                                  key={j}
                                  className="w-8 h-8 rounded-full border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <p className="text-sm font-medium">{combo.name}</p>
                          </div>
                        ))}
                      </>
                    )}
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
                  <SimplePdfViewer cartela={cartela} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
