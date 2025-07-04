interface ColorPaletteProps {
  colors: { hex: string; name: string }[]
}

export default function ColorPalette({ colors }: ColorPaletteProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border shadow-sm mb-2" style={{ backgroundColor: color.hex }} />
            <span className="text-xs text-center">{color.name}</span>
          </div>
        ))}
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Sobre esta paleta</h4>
        <p className="text-sm text-gray-700">
          A paleta de Inverno Escuro é composta por cores frias e intensas, que refletem a profundidade e a elegância
          dessa estação. As tonalidades dessa coloração são escuras e contrastantes, perfeitas para realçar o contraste
          natural da sua aparência. Tons como preto, branco puro, bordô e azul marinho compõem essa paleta, criando uma
          combinação harmoniosa e sofisticada.
        </p>
      </div>
    </div>
  )
}
