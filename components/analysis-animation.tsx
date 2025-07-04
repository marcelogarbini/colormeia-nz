"use client"

import { useEffect, useRef } from "react"

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
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(rect.width, rect.height) * 0.3

    // Draw main face circle with gradient
    const faceGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
    faceGradient.addColorStop(0, "rgba(59, 130, 246, 0.1)")
    faceGradient.addColorStop(1, "rgba(59, 130, 246, 0.3)")

    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.fillStyle = faceGradient
    ctx.fill()
    ctx.strokeStyle = "rgba(59, 130, 246, 0.6)"
    ctx.lineWidth = 2
    ctx.stroke()

    // Scanning effect
    const scanY = centerY - radius + (progress / 100) * (radius * 2)

    // Draw scanning line with glow effect
    ctx.save()
    ctx.shadowColor = "rgba(59, 130, 246, 0.8)"
    ctx.shadowBlur = 10
    ctx.beginPath()
    ctx.moveTo(centerX - radius - 20, scanY)
    ctx.lineTo(centerX + radius + 20, scanY)
    ctx.strokeStyle = "rgba(59, 130, 246, 0.9)"
    ctx.lineWidth = 3
    ctx.stroke()
    ctx.restore()

    // Draw scanning area gradient
    const scanGradient = ctx.createLinearGradient(0, scanY - 15, 0, scanY + 15)
    scanGradient.addColorStop(0, "rgba(59, 130, 246, 0)")
    scanGradient.addColorStop(0.5, "rgba(59, 130, 246, 0.3)")
    scanGradient.addColorStop(1, "rgba(59, 130, 246, 0)")

    ctx.fillStyle = scanGradient
    ctx.fillRect(centerX - radius - 20, scanY - 15, (radius + 20) * 2, 30)

    // Draw facial features with progressive reveal
    if (progress > 20) {
      // Eyes
      const eyeOpacity = Math.min((progress - 20) / 30, 1)
      ctx.globalAlpha = eyeOpacity

      // Left eye
      ctx.beginPath()
      ctx.arc(centerX - radius * 0.3, centerY - radius * 0.2, radius * 0.08, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(59, 130, 246, 0.8)"
      ctx.fill()

      // Right eye
      ctx.beginPath()
      ctx.arc(centerX + radius * 0.3, centerY - radius * 0.2, radius * 0.08, 0, Math.PI * 2)
      ctx.fill()

      ctx.globalAlpha = 1
    }

    if (progress > 40) {
      // Nose
      const noseOpacity = Math.min((progress - 40) / 20, 1)
      ctx.globalAlpha = noseOpacity
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - radius * 0.1)
      ctx.lineTo(centerX - radius * 0.05, centerY + radius * 0.05)
      ctx.lineTo(centerX + radius * 0.05, centerY + radius * 0.05)
      ctx.strokeStyle = "rgba(59, 130, 246, 0.6)"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    if (progress > 60) {
      // Mouth
      const mouthOpacity = Math.min((progress - 60) / 20, 1)
      ctx.globalAlpha = mouthOpacity
      ctx.beginPath()
      ctx.arc(centerX, centerY + radius * 0.3, radius * 0.15, 0.1 * Math.PI, 0.9 * Math.PI, false)
      ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.globalAlpha = 1
    }

    // Draw analysis points around the face
    if (progress > 30) {
      const numPoints = 12
      const angleStep = (Math.PI * 2) / numPoints

      for (let i = 0; i < numPoints; i++) {
        const angle = i * angleStep
        const pointRadius = radius + 40
        const x = centerX + pointRadius * Math.cos(angle)
        const y = centerY + pointRadius * Math.sin(angle)

        const pointProgress = Math.max(0, Math.min(1, (progress - 30 - i * 3) / 20))

        if (pointProgress > 0) {
          ctx.globalAlpha = pointProgress

          // Draw connection line
          ctx.beginPath()
          ctx.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle))
          ctx.lineTo(x, y)
          ctx.strokeStyle = "rgba(59, 130, 246, 0.4)"
          ctx.lineWidth = 1
          ctx.stroke()

          // Draw point
          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(59, 130, 246, 0.8)"
          ctx.fill()

          // Draw point glow
          ctx.save()
          ctx.shadowColor = "rgba(59, 130, 246, 0.6)"
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.fill()
          ctx.restore()

          ctx.globalAlpha = 1
        }
      }
    }

    // Draw color analysis indicators
    if (progress > 70) {
      const colorPoints = [
        { x: rect.width * 0.15, y: rect.height * 0.25, color: "#FFD700", label: "Pele", progress: progress - 70 },
        { x: rect.width * 0.15, y: rect.height * 0.45, color: "#8B4513", label: "Cabelo", progress: progress - 75 },
        { x: rect.width * 0.15, y: rect.height * 0.65, color: "#1E90FF", label: "Olhos", progress: progress - 80 },
      ]

      colorPoints.forEach((point) => {
        const pointOpacity = Math.max(0, Math.min(1, point.progress / 15))

        if (pointOpacity > 0) {
          ctx.globalAlpha = pointOpacity

          // Convert hex to RGB
          const r = Number.parseInt(point.color.slice(1, 3), 16)
          const g = Number.parseInt(point.color.slice(3, 5), 16)
          const b = Number.parseInt(point.color.slice(5, 7), 16)

          // Draw color circle with glow
          ctx.save()
          ctx.shadowColor = point.color
          ctx.shadowBlur = 15
          ctx.beginPath()
          ctx.arc(point.x, point.y, 12, 0, Math.PI * 2)
          ctx.fillStyle = point.color
          ctx.fill()
          ctx.restore()

          // Draw label
          ctx.font = "12px -apple-system, BlinkMacSystemFont, sans-serif"
          ctx.fillStyle = "rgba(75, 85, 99, 0.8)"
          ctx.fillText(point.label, point.x + 20, point.y + 4)

          ctx.globalAlpha = 1
        }
      })
    }

    // Draw progress ring
    const ringRadius = radius + 60
    const progressAngle = (progress / 100) * Math.PI * 2 - Math.PI / 2

    // Background ring
    ctx.beginPath()
    ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(229, 231, 235, 0.3)"
    ctx.lineWidth = 3
    ctx.stroke()

    // Progress ring
    ctx.beginPath()
    ctx.arc(centerX, centerY, ringRadius, -Math.PI / 2, progressAngle)
    ctx.strokeStyle = "rgba(59, 130, 246, 0.8)"
    ctx.lineWidth = 3
    ctx.stroke()
  }, [progress])

  return (
    <div className="space-y-6">
      <div className="relative w-full aspect-square max-w-lg mx-auto">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: "drop-shadow(0 10px 25px rgba(59, 130, 246, 0.1))" }}
        />
      </div>

      {/* Modern Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-medium">Progresso da Análise</span>
          <span className="text-blue-600 font-semibold">{Math.round(progress)}%</span>
        </div>
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div
            className="absolute top-0 h-2 w-8 bg-white/50 rounded-full animate-pulse"
            style={{
              left: `${Math.max(0, progress - 8)}%`,
              opacity: progress < 100 ? 1 : 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}
