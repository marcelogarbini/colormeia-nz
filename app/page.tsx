import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">ColorMe-IA</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/analise" className="text-sm font-medium">
              Iniciar Análise
            </Link>
            <Link href="/sobre" className="text-sm font-medium">
              Sobre
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Descubra sua Coloração Pessoal com Inteligência Artificial
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Faça o upload de uma foto e receba uma análise personalizada da sua cartela de cores ideal para
                    roupas, maquiagem e acessórios.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/analise">
                    <Button size="lg" className="gap-1">
                      Iniciar Análise <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/sobre">
                    <Button size="lg" variant="outline">
                      Saiba Mais
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2">
                  {["Primavera", "Verão", "Outono", "Inverno"].map((estacao, i) => (
                    <Card key={i} className={i === 3 ? "col-span-3" : "col-span-1"}>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <h3 className="font-medium">{estacao}</h3>
                          <div className="mt-2 flex justify-center gap-1">
                            {Array.from({ length: 3 }).map((_, j) => (
                              <div
                                key={j}
                                className="w-4 h-4 rounded-full"
                                style={{
                                  backgroundColor: getColorForSeason(estacao, j),
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Como Funciona</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Análise Personalizada em 3 Passos Simples
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nossa tecnologia de inteligência artificial analisa suas características naturais para determinar sua
                  cartela de cores ideal.
                </p>
              </div>
              <div className="grid gap-6">
                {[
                  {
                    title: "Faça o Upload da sua Foto",
                    description: "Envie uma foto em luz natural, sem maquiagem e com cabelo em estado natural.",
                  },
                  {
                    title: "Análise com IA",
                    description: "Nossa inteligência artificial analisa seu tom de pele, subtom, olhos e cabelo.",
                  },
                  {
                    title: "Receba sua Cartela Personalizada",
                    description: "Visualize e baixe um relatório completo com sua cartela de cores e recomendações.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      {i + 1}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ColorMe-IA. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/termos" className="text-sm text-gray-500">
              Termos
            </Link>
            <Link href="/privacidade" className="text-sm text-gray-500">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function getColorForSeason(season: string, index: number): string {
  const colors = {
    Primavera: ["#FFD700", "#FF6347", "#98FB98"],
    Verão: ["#ADD8E6", "#DDA0DD", "#F08080"],
    Outono: ["#CD853F", "#8B4513", "#DAA520"],
    Inverno: ["#4682B4", "#800080", "#DC143C"],
  }

  return colors[season as keyof typeof colors]?.[index] || "#CCCCCC"
}
