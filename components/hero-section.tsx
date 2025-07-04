"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Upload, Sparkles, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedBackground from "./animated-background"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [typingText, setTypingText] = useState("")
  const titleRef = useScrollReveal()
  const subtitleRef = useScrollReveal()
  const buttonRef = useScrollReveal()

  const fullText = "Descubra Sua Coloração Pessoal"

  useEffect(() => {
    setIsLoaded(true)

    // Typing animation
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypingText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social Proof */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span>Mais de 50.000 análises realizadas</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-current text-yellow-500" />
              ))}
            </div>
          </div>

          {/* Main Title with Typing Effect */}
          <div ref={titleRef} className="mb-6">
            <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-tight">
              <span className="text-gradient-primary">{typingText}</span>
              <span className="animate-pulse">|</span>
            </h1>
          </div>

          {/* Value Proposition */}
          <div ref={subtitleRef} className="mb-8">
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-6">
              Nossa <span className="text-gradient font-medium">inteligência artificial especializada</span> analisa
              suas características naturais e revela a paleta de cores que{" "}
              <span className="text-gradient font-medium">valoriza sua beleza única</span>
            </p>

            {/* Benefits List */}
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
              {[
                "Economize tempo e dinheiro em compras",
                "Aumente sua autoconfiança",
                "Crie looks harmoniosos sempre",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div ref={buttonRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/upload">
              <Button
                size="lg"
                className="group relative px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white border-0 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="relative flex items-center gap-3">
                  <Upload className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Começar Minha Análise</span>
                  <Sparkles className="h-4 w-4 group-hover:scale-125 transition-transform duration-300" />
                </div>
              </Button>
            </Link>

            <div className="text-sm text-gray-500 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Resultado em 30 segundos • 100% seguro</span>
            </div>
          </div>

          {/* Price Teaser */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200/50">
            <span className="text-sm font-medium text-gray-700">
              Análise completa por apenas <span className="text-primary font-bold">R$ 47</span> • Satisfação garantida
            </span>
          </div>

          {/* Features Preview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: "🎨", title: "IA Especializada", desc: "Análise precisa baseada em colorimetria profissional" },
              { icon: "📊", title: "Relatório Completo", desc: "PDF detalhado com paleta e recomendações" },
              { icon: "💎", title: "Resultado Profissional", desc: "Mesmo padrão de consultores especializados" },
            ].map((feature, index) => (
              <div
                key={index}
                className="glassmorphism rounded-2xl p-6 hover-lift hover-glow group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-float"
        style={{ animationDelay: "0s" }}
      />
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-green-500/10 rounded-full animate-float"
        style={{ animationDelay: "4s" }}
      />
    </section>
  )
}
