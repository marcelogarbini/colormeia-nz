"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, Camera, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UploadFormProps {
  onUpload: (file: File) => void
}

export default function UploadForm({ onUpload }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create preview
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
      setSelectedFile(file)

      // Create preview
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
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Envie sua Foto</h2>
        <p className="text-gray-500">Faça o upload de uma foto seguindo as diretrizes para obter a melhor análise</p>
      </div>

      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center ${
            isDragging ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Arraste e solte sua foto aqui</h3>
              <p className="text-sm text-gray-500">Ou clique para selecionar um arquivo do seu dispositivo</p>
              <p className="text-xs text-gray-400">Formatos suportados: JPG, PNG (máx. 10MB)</p>
            </div>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Camera className="h-4 w-4" /> Selecionar Foto
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg, image/png"
              className="hidden"
            />
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Foto selecionada</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-1" /> Remover
            </Button>
          </div>
          <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-md">
            <Image src={preview || "/placeholder.svg"} alt="Preview da foto" fill className="object-cover" />
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            {selectedFile?.name} ({Math.round(selectedFile?.size / 1024)} KB)
          </p>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <Button onClick={handleSubmit} size="lg" disabled={!selectedFile} className="gap-2">
          Iniciar Análise <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
