"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Link from "next/link"
import { ArrowLeft, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Analysis {
  id: string
  cartela: string
  resumo: string
  imageUrl?: string
  createdAt: string
}

export default function HistoricoPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnalyses() {
      try {
        const response = await fetch("/api/user/analyses")

        if (!response.ok) {
          throw new Error("Falha ao carregar o histórico")
        }

        const data = await response.json()
        setAnalyses(data.analyses || [])
      } catch (err) {
        setError("Não foi possível carregar seu histórico de análises")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyses()
  }, [])

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center mb-8">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Histórico de Análises</h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Carregando seu histórico...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
          <Link href="/analise">
            <Button className="mt-4">Fazer Nova Análise</Button>
          </Link>
        </div>
      ) : analyses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Você ainda não realizou nenhuma análise.</p>
          <Link href="/analise">
            <Button>Fazer Minha Primeira Análise</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {analyses.map((analysis) => (
            <Card key={analysis.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>{analysis.cartela}</CardTitle>
                  <span className="text-sm text-gray-500">{formatDate(analysis.createdAt)}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{analysis.resumo}</p>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/analise/resultado?id=${analysis.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Eye className="h-4 w-4" /> Ver Detalhes
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => window.open(`/api/generate-pdf?id=${analysis.id}`, "_blank")}
                  >
                    <Download className="h-4 w-4" /> Baixar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
