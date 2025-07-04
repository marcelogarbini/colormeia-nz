"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ana Silva",
    photo: "/placeholder.svg?height=80&width=80&text=AS",
    palette: "Verão Suave",
    quote:
      "Finalmente entendi por que algumas cores me deixam com aparência cansada! A análise foi precisa e as recomendações transformaram meu guarda-roupa.",
  },
  {
    name: "Carlos Mendes",
    photo: "/placeholder.svg?height=80&width=80&text=CM",
    palette: "Inverno Profundo",
    quote:
      "Sempre tive dificuldade em escolher roupas. Com o ColorMe-IA, descobri minha paleta e agora recebo elogios constantemente pelo meu visual.",
  },
  {
    name: "Juliana Costa",
    photo: "/placeholder.svg?height=80&width=80&text=JC",
    palette: "Outono Suave",
    quote:
      "A análise foi surpreendentemente precisa! As cores recomendadas realmente valorizam meu tom de pele e combinam perfeitamente com meu cabelo e olhos.",
  },
  {
    name: "Marcelo Santos",
    photo: "/placeholder.svg?height=80&width=80&text=MS",
    palette: "Primavera Clara",
    quote:
      "Incrível como as cores certas podem fazer tanta diferença. O relatório detalhado me ajudou a entender melhor minha coloração pessoal.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <section id="depoimentos" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Descubra como o ColorMe-IA tem ajudado pessoas a transformarem seu estilo e autoconfiança
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="glassmorphism rounded-2xl p-8 animate-float">
                    <div className="flex items-start mb-6">
                      <div className="mr-4 relative">
                        <Image
                          src={testimonial.photo || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={80}
                          height={80}
                          className="rounded-full"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1 rounded-full">
                          <Quote size={16} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{testimonial.name}</h3>
                        <p className="text-primary">{testimonial.palette}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Depoimento anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Próximo depoimento"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrentIndex(index)
                }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Ir para depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
