"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AnalysisAnimation from "@/components/analysis-animation"

export default function ProcessingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Redirecionar para a página de resultados após o processamento
          setTimeout(() => {
            router.push("/analise/resultado")
          }, 500)
          return 100
        }
        return prev + 2
      })
    }, 200)

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="container max-w-4xl py-16 flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold text-center mb-8">Analisando sua Coloração Pessoal</h1>

      <div className="w-full max-w-xl">
        <AnalysisAnimation progress={progress} />

        <div className="mt-8 text-center">
          <p className="text-lg mb-2">Estamos analisando sua coloração pessoal com inteligência artificial</p>
          <p className="text-gray-500">Isso pode levar alguns segundos...</p>
        </div>
      </div>
    </div>
  )
}
