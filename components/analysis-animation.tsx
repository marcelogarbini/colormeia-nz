"use client"

import { useEffect, useRef } from "react"
import { Progress } from "@/components/ui/progress"

interface AnalysisAnimationProps {
  progress: number
}

export default function AnalysisAnimation({ progress }: AnalysisAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw face outline
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(canvas.width, canvas.height) * 0.35

    // Draw scanning effect
    const scanY = canvas.height * (1 - progress / 100)

    // Draw face
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw scanning line
    ctx.beginPath()
    ctx.moveTo(centerX - radius - 20, scanY)
    ctx.lineTo(centerX + radius + 20, scanY)
    ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw scanning glow
    const gradient = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10)
    gradient.addColorStop(0, "rgba(59, 130, 246, 0)")
    gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.5)")
    gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

    ctx.fillStyle = gradient
    ctx.fillRect(centerX - radius - 20, scanY - 10, (radius + 20) * 2, 20)

    // Draw facial features (simplified)
    if (progress > 30) {
      // Eyes
      ctx.beginPath()
      ctx.arc(centerX - radius * 0.3, centerY - radius * 0.15, radius * 0.1, 0, Math.PI * 2)
      ctx.arc(centerX + radius * 0.3, centerY - radius * 0.15, radius * 0.1, 0, Math.PI * 2)
      ctx.fillStyle = progress > 60 ? "#3b82f6" : "#ccc"
      ctx.fill()
    }

    if (progress > 50) {
      // Mouth
      ctx.beginPath()
      ctx.arc(centerX, centerY + radius * 0.25, radius * 0.2, 0.1 * Math.PI, 0.9 * Math.PI, false)
      ctx.strokeStyle = progress > 80 ? "#3b82f6" : "#ccc"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw data points around the face
    if (progress > 40) {
      const numPoints = 8
      const angleStep = (Math.PI * 2) / numPoints

      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep
        const x = centerX + (radius + 30) * Math.cos(angle)
        const y = centerY + (radius + 30) * Math.sin(angle)

        const isActive = progress > 40 + (i * 60) / numPoints

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? "#3b82f6" : "#ccc"
        ctx.fill()

        if (isActive) {
          ctx.beginPath()
          ctx.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
          ctx.lineTo(x, y)
          ctx.strokeStyle = "rgba(59, 130, 246, 0.6)"
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    // Draw color analysis points
    if (progress > 70) {
      const colorPoints = [
        { x: canvas.width * 0.15, y: canvas.height * 0.2, color: "#FFD700", label: "Pele" },
        { x: canvas.width * 0.15, y: canvas.height * 0.4, color: "#8B4513", label: "Cabelo" },
        { x: canvas.width * 0.15, y: canvas.height * 0.6, color: "#1E90FF", label: "Olhos" },
      ]

      colorPoints.forEach((point, index) => {
        const isActive = progress > 70 + index * 10

        if (isActive) {
          // Draw color circle
          ctx.beginPath()
          ctx.arc(point.x, point.y, 10, 0, Math.PI * 2)
          ctx.fillStyle = point.color
          ctx.fill()

          // Draw label
          ctx.font = "12px Arial"
          ctx.fillStyle = "#333"
          ctx.fillText(point.label, point.x + 15, point.y + 4)
        }
      })
    }
  }, [progress])

  return (
    <div className="space-y-4">
      <div className="relative w-full aspect-square max-w-md mx-auto border rounded-lg overflow-hidden bg-white">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
      <Progress value={progress} className="w-full h-2" />
      <p className="text-center text-sm text-gray-500">{progress}% concluído</p>
    </div>
  )
}
