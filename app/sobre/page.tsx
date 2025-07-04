import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SobrePage() {
  return (
    <div className="container max-w-4xl py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Sobre o ColorMe-IA</h1>

      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">O que é Coloração Pessoal?</h2>
          <p className="text-gray-700">
            A análise de coloração pessoal é um método que identifica as cores que melhor harmonizam com as
            características naturais de uma pessoa, como tom de pele, olhos e cabelo. Essa análise ajuda a determinar
            quais cores de roupas, maquiagem e acessórios valorizam a aparência natural, trazendo mais luminosidade ao
            rosto e criando uma harmonia visual.
          </p>
          <p className="text-gray-700">
            O sistema de análise de coloração pessoal mais conhecido divide as pessoas em quatro estações principais:
            Primavera, Verão, Outono e Inverno. Cada estação possui subcategorias que refinam ainda mais a análise,
            resultando em 12 cartelas diferentes, cada uma com características específicas e uma paleta de cores
            recomendada.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Como Funciona o ColorMe-IA</h2>
          <p className="text-gray-700">
            O ColorMe-IA utiliza inteligência artificial avançada para analisar suas características físicas através de
            uma foto e determinar sua cartela de coloração pessoal. Nossa tecnologia examina detalhadamente:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Tom da pele (claro, médio, escuro)</li>
            <li>Subtom da pele (quente, neutro, frio)</li>
            <li>Cor e intensidade dos olhos</li>
            <li>Cor, tonalidade e textura do cabelo</li>
          </ul>
          <p className="text-gray-700">
            Com base nessa análise, o sistema identifica sua cartela sazonal específica e fornece um relatório detalhado
            com recomendações personalizadas de cores para roupas, maquiagem, cabelo e acessórios.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Benefícios da Análise de Coloração Pessoal</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Valorização da Beleza Natural</h3>
              <p className="text-gray-700">
                Ao usar cores que harmonizam com suas características naturais, você realça sua beleza sem precisar de
                muita maquiagem ou artifícios.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Economia de Tempo e Dinheiro</h3>
              <p className="text-gray-700">
                Conhecer sua cartela de cores ajuda a fazer escolhas mais assertivas ao comprar roupas e acessórios,
                evitando gastos desnecessários.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Guarda-Roupa Funcional</h3>
              <p className="text-gray-700">
                Com peças que combinam entre si e valorizam sua aparência, você cria um guarda-roupa mais versátil e
                funcional.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-bold mb-2">Autoconfiança</h3>
              <p className="text-gray-700">
                Usar cores que realçam sua beleza natural aumenta sua autoconfiança e bem-estar.
              </p>
            </div>
          </div>
        </section>

        <div className="flex justify-center mt-10">
          <Link href="/analise">
            <Button size="lg" className="gap-2">
              Iniciar Minha Análise <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
