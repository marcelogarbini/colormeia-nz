"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, Camera, ArrowRight, Sparkles, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UploadFormProps {
  onUpload: (file: File, email: string) => void
}

export default function UploadForm({ onUpload }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [emailError, setEmailError] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validar tamanho do arquivo (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Arquivo muito grande. Máximo 5MB.")
        return
      }

      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]

      if (file.size > 5 * 1024 * 1024) {
        alert("Arquivo muito grande. Máximo 5MB.")
        return
      }

      setSelectedFile(file)

      const reader = new FileReader()
      reader.onload = (event) => {
        setPreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = () => {
    // Validar email
    if (!email || !validateEmail(email)) {
      setEmailError("Por favor, insira um email válido")
      return
    }
    setEmailError("")

    // Validar arquivo
    if (!selectedFile) {
      alert("Por favor, selecione uma foto")
      return
    }

    setIsProcessing(true)

    // Simular processamento
    setTimeout(() => {
      onUpload(selectedFile, email)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gradient-primary">Agora Envie sua Foto</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Seguindo as diretrizes acima, faça o upload da sua foto para análise
        </p>
      </div>

      {/* Campo de Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Seu melhor e-mail *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="seuemail@exemplo.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setEmailError("")
            }}
            className={`pl-10 ${emailError ? "border-red-500" : ""}`}
          />
        </div>
        {emailError && <p className="text-sm text-red-500">{emailError}</p>}
        <p className="text-xs text-gray-500">Enviaremos o resultado para este e-mail</p>
      </div>

      {/* Upload Area */}
      {!preview ? (
        <div
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 ${
            isDragging
              ? "border-blue-400 bg-blue-50/50 scale-105"
              : "border-gray-300 hover:border-blue-300 hover:bg-blue-50/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
            {/* Animated Upload Icon */}
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-110 hover:rotate-3 transition-all duration-500">
                <Upload className="h-8 w-8" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-30 animate-pulse" />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Arraste e solte sua foto aqui</h3>
              <p className="text-gray-500">Ou clique para selecionar um arquivo do seu dispositivo</p>
              <p className="text-xs text-gray-400">Formatos suportados: JPG, PNG (máx. 5MB)</p>
            </div>

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="btn-apple gap-3 px-6 py-3 rounded-xl font-medium group"
            >
              <Camera className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              Selecionar Foto
              <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
            </Button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg, image/png, image/jpg"
              className="hidden"
            />
          </div>
        </div>
      ) : (
        <div className="neomorphism rounded-3xl p-6 animate-fade-in-scale">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">✅ Foto selecionada</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-300"
            >
              <X className="h-4 w-4 mr-2" /> Remover
            </Button>
          </div>

          <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl shadow-lg group">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Preview da foto"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              {selectedFile?.name} ({Math.round((selectedFile?.size || 0) / 1024)} KB)
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          size="lg"
          disabled={!selectedFile || !email || isProcessing}
          className="group relative px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 text-white border-0 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

          <div className="relative flex items-center gap-3">
            {isProcessing ? (
              <>
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                <span>Analisar Minha Foto</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </div>
        </Button>
      </div>

      {/* Garantia */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>🔒 Seus dados estão seguros • Garantia de satisfação</span>
        </div>
      </div>
    </div>
  )
}
