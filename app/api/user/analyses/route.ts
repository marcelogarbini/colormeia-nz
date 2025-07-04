import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

// Simulação de um banco de dados em memória
// Em produção, você usaria um banco de dados real como Supabase, MongoDB, etc.
const analysisDatabase: Record<string, Analysis[]> = {}

interface Analysis {
  id: string
  userId: string
  cartela: string
  resumo: string
  imageUrl?: string
  createdAt: Date
}

// Função para obter ou criar um ID de usuário
function getUserId(req: NextRequest): string {
  const cookieStore = cookies()
  let userId = cookieStore.get("user_id")?.value

  if (!userId) {
    userId = uuidv4()
    // Em produção, você definiria um cookie mais seguro
    cookieStore.set("user_id", userId, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 ano
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  }

  return userId
}

// GET: Obter todas as análises do usuário
export async function GET(req: NextRequest) {
  const userId = getUserId(req)

  // Obter análises do usuário
  const userAnalyses = analysisDatabase[userId] || []

  return NextResponse.json({ analyses: userAnalyses })
}

// POST: Salvar uma nova análise
export async function POST(req: NextRequest) {
  try {
    const userId = getUserId(req)
    const data = await req.json()

    if (!data.cartela || !data.resumo) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Criar nova análise
    const newAnalysis: Analysis = {
      id: uuidv4(),
      userId,
      cartela: data.cartela,
      resumo: data.resumo,
      imageUrl: data.imageUrl,
      createdAt: new Date(),
    }

    // Inicializar array de análises do usuário se não existir
    if (!analysisDatabase[userId]) {
      analysisDatabase[userId] = []
    }

    // Adicionar nova análise
    analysisDatabase[userId].push(newAnalysis)

    return NextResponse.json({
      success: true,
      analysis: newAnalysis,
    })
  } catch (error) {
    console.error("Erro ao salvar análise:", error)
    return NextResponse.json({ error: "Erro ao processar a requisição" }, { status: 500 })
  }
}
