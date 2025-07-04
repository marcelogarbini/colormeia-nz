"use client"

import { Upload, Sparkles, Palette } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function HowItWorks() {
  const titleRef = useScrollReveal()
  const subtitleRef = useScrollReveal()
  const step1Ref = useScrollReveal()
  const step2Ref = useScrollReveal()
  const step3Ref = useScrollReveal()

  const steps = [
    {
      icon: <Upload className="h-10 w-10" />,
      title: "Envie sua foto",
      description: "Faça o upload de uma foto em luz natural, sem maquiagem e com cabelo em estado natural.",
      color: "from-blue-500 to-blue-600",
      ref: step1Ref,
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: "Análise com IA",
      description: "Nossa inteligência artificial analisa seu tom de pele, subtom, olhos e cabelo.",
      color: "from-purple-500 to-purple-600",
      ref: step2Ref,
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: "Descubra sua paleta",
      description: "Receba sua cartela de cores personalizada e recomendações para roupas, maquiagem e acessórios.",
      color: "from-green-500 to-green-600",
      ref: step3Ref,
    },
  ]

  return (
    <section id="como-funciona" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-green-50/50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-primary">Como Funciona</span>
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Descubra sua coloração pessoal em três passos simples com nossa tecnologia de inteligência artificial
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            return (
              <div key={index} ref={step.ref} className="relative group" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-0" />
                )}

                {/* Step Card */}
                <div className="neomorphism rounded-3xl p-8 text-center hover-lift group-hover:shadow-2xl transition-all duration-500 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`bg-gradient-to-br ${step.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">Mais de 10.000 análises realizadas com sucesso</span>
          </div>
        </div>
      </div>
    </section>
  )
}
