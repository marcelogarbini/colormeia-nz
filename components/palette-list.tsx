import Link from "next/link"
import { palettePdfMap } from "@/lib/palette-data"
import { getMainColorsForPalette } from "@/lib/utils"

export default function PaletteList() {
  const palettes = Object.keys(palettePdfMap)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {palettes.map((palette) => {
        const colors = getMainColorsForPalette(palette)
        const firstFourColors = colors.slice(0, 4)

        return (
          <Link
            key={palette}
            href={`/analise/resultado?cartela=${encodeURIComponent(palette)}`}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-bold text-lg mb-3">{palette}</h3>
            <div className="flex space-x-2 mb-4">
              {firstFourColors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">Clique para ver o relatório completo</p>
          </Link>
        )
      })}
    </div>
  )
}
