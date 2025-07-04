import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PaletteList from "@/components/palette-list"

export default function PalettesPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="flex items-center mb-8">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Cartelas de Coloração Pessoal</h1>
      </div>

      <p className="text-gray-600 mb-8">
        Explore todas as cartelas de coloração pessoal disponíveis. Clique em uma cartela para ver seu relatório
        completo, incluindo características, recomendações e paleta de cores.
      </p>

      <PaletteList />
    </div>
  )
}
