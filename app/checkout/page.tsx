"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, CheckCircle, ArrowLeft, Palette, Shield, Clock } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const result = sessionStorage.getItem("analysisResult")
    if (result) {
      setAnalysis(JSON.parse(result))
    } else {
      router.push("/upload")
    }
  }, [router])

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simular processamento do pagamento
    setTimeout(() => {
      // Marcar como pago
      sessionStorage.setItem("paymentCompleted", "true")
      router.push("/resultado")
    }, 3000)
  }

  if (!analysis) {
    return (
      <div className="container max-w-4xl py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-green-50/50">
      <div className="container max-w-6xl py-10">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/teaser">
            <Button variant="outline" size="icon" className="mr-4 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Finalizar Pedido</h1>
            <p className="text-gray-600">Complete seu pagamento para acessar o relatório completo</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de Pagamento */}
          <div className="space-y-6">
            <Card className="neomorphism border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Informações de Pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" placeholder="João" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" placeholder="Silva" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="joao@exemplo.com" />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(11) 99999-9999" />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="cardNumber">Número do Cartão</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Validade</Label>
                    <Input id="expiry" placeholder="MM/AA" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cardName">Nome no Cartão</Label>
                  <Input id="cardName" placeholder="João Silva" />
                </div>
              </CardContent>
            </Card>

            {/* Segurança */}
            <Card className="glassmorphism border-0">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Pagamento 100% seguro e criptografado</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <Card className="neomorphism border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Análise de Coloração Pessoal</span>
                  <span className="font-medium">R$ 197,00</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Desconto (76% OFF)</span>
                  <span>-R$ 150,00</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">R$ 47,00</span>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Sua Cartela Identificada:</h4>
                  <p className="text-primary font-bold text-lg">{analysis.cartela}</p>
                  <p className="text-sm text-gray-600 mt-1">{analysis.resumo.substring(0, 100)}...</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Você receberá:</h4>
                  <ul className="space-y-1 text-sm">
                    {[
                      "Relatório completo em PDF",
                      "Paleta de 50+ cores personalizadas",
                      "Recomendações de roupas e maquiagem",
                      "Acesso vitalício ao resultado",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full group relative px-8 py-4 text-lg font-medium bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105 disabled:opacity-50"
                >
                  <div className="relative flex items-center justify-center gap-3">
                    {isProcessing ? (
                      <>
                        <div className="loading-dots">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                        <span>Processando Pagamento...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>Finalizar Pagamento - R$ 47,00</span>
                      </>
                    )}
                  </div>
                </Button>

                <div className="text-center space-y-2 text-xs text-gray-500">
                  <p className="flex items-center justify-center gap-2">
                    <Clock className="h-3 w-3" />
                    Acesso imediato após confirmação
                  </p>
                  <p>Garantia de 7 dias ou seu dinheiro de volta</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
