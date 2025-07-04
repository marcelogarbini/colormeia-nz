"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight

      setScrollProgress(progress)
      setIsScrolled(scrollTop > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "glassmorphism-strong py-2 shadow-lg" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image
                src="/images/logo.png"
                alt="ColorMe-IA"
                width={200}
                height={50}
                priority
                className="h-auto w-auto max-h-12 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { label: "Como Funciona", id: "como-funciona" },
              { label: "Depoimentos", id: "depoimentos" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-blue-600 transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}

            <Link href="/upload">
              <Button
                variant="outline"
                className="btn-apple rounded-full px-6 py-2 font-medium hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
              >
                Iniciar Análise
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <X
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glassmorphism-strong mx-4 mt-4 rounded-2xl p-6 space-y-4">
            {[
              { label: "Como Funciona", id: "como-funciona" },
              { label: "Depoimentos", id: "depoimentos" },
              { label: "FAQ", id: "faq" },
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-sm font-medium hover:text-blue-600 transition-colors duration-300 py-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </button>
            ))}

            <Link href="/upload" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full btn-apple rounded-xl mt-4 bg-transparent">
                Iniciar Análise
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
