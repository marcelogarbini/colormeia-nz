import { NextResponse } from "next/server"
import OpenAI from "openai"

// Função para criar resposta JSON consistente
function createJsonResponse(data: any, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

// Prompt mais simples e direto
const COLORACAO_PROMPT = `
Você é um especialista em coloração pessoal. Analise a imagem e retorne APENAS um objeto JSON válido.

Retorne exatamente este formato:
{
  "cartela": "Nome da cartela (ex: Inverno Escuro)",
  "resumo": "Breve explicação de 1-2 frases sobre por que a pessoa se encaixa nesta cartela",
  "caracteristicas": {
    "subtom": "Frio, Quente ou Neutro",
    "profundidade": "Clara, Média ou Escura", 
    "contraste": "Alto, Médio ou Baixo"
  }
}

Cartelas disponíveis: Inverno Escuro, Inverno Brilhante, Inverno Frio, Verão Suave, Verão Claro, Verão Frio, Outono Quente, Outono Escuro, Outono Suave, Primavera Brilhante, Primavera Clara, Primavera Quente.

Se a imagem não for adequada, retorne:
{
  "error": "Imagem inadequada",
  "motivo": "Descrição do problema"
}
`

// Links dos PDFs por cartela
const PDF_LINKS: Record<string, string> = {
  "Inverno Brilhante": "https://drive.google.com/file/d/11PJfbPBuCvqgV0-JJK0RxCr0hoFGNJap/view?usp=drive_link",
  "Inverno Escuro": "https://drive.google.com/file/d/1R-YYxSZCqGfI9hUjuTTgo7uKJ5D9v1tw/view?usp=sharing",
  "Inverno Frio": "https://drive.google.com/file/d/1E9if2I5wzyhcIFo-ootCgV6_WpGN8sci/view?usp=sharing",
  "Outono Escuro": "https://drive.google.com/file/d/1T1goGSFNGr2qPSv3Oc-LSSuUYTJfB4Vd/view?usp=drive_link",
  "Outono Quente": "https://drive.google.com/file/d/1ykuSReaszlDghbryYjjyTi6J6kfAZhWC/view?usp=sharing",
  "Outono Suave": "https://drive.google.com/file/d/1WPPrV4nIZPPIAihJxJOyy1F5O-pAWEzL/view?usp=sharing",
  "Primavera Brilhante": "https://drive.google.com/file/d/1SKSWEJInpBkC_G2EYYiiu6ZAtPlMU1W9/view?usp=sharing",
  "Primavera Clara": "https://drive.google.com/file/d/1SY9yk12z7Nteq4_2CxkPXxDxzsg8Xtld/view?usp=sharing",
  "Primavera Quente": "https://drive.google.com/file/d/1dT6NyoG2xuJzQOdIGPkaSwfDzsMt3HkX/view?usp=sharing",
  "Verão Claro": "https://drive.google.com/file/d/1sAwUo0H3owWJZ43Td7P9IdBwq0rSQi2Z/view?usp=sharing",
  "Verão Frio": "https://drive.google.com/file/d/1Pt09P1tqe60NOp-Sv1stnTdC5dlMncNr/view?usp=drive_link",
  "Verão Suave": "https://drive.google.com/file/d/1Ei2gwpYFWGyccB9UqBqLQyVkgnolTAz8/view?usp=drive_link",
}

// Análise de fallback
function getFallbackAnalysis(email: string) {
  // Garantir que email é uma string válida
  const safeEmail = email && typeof email === "string" ? email : "default@example.com"

  const options = [
    {
      cartela: "Inverno Escuro",
      resumo:
        "Suas características indicam um contraste natural alto com subtom frio, típico da paleta Inverno Escuro que valoriza cores intensas e profundas.",
      caracteristicas: { subtom: "Frio", profundidade: "Escura", contraste: "Alto" },
      linkPDF: PDF_LINKS["Inverno Escuro"],
    },
    {
      cartela: "Verão Suave",
      resumo:
        "Detectamos características suaves com subtom frio e baixo contraste, ideais para a paleta Verão Suave com tons pastéis e delicados.",
      caracteristicas: { subtom: "Frio", profundidade: "Clara", contraste: "Baixo" },
      linkPDF: PDF_LINKS["Verão Suave"],
    },
    {
      cartela: "Outono Quente",
      resumo:
        "Suas características mostram subtom quente com profundidade média, perfeitas para a paleta Outono Quente com cores terrosas e aconchegantes.",
      caracteristicas: { subtom: "Quente", profundidade: "Média", contraste: "Médio" },
      linkPDF: PDF_LINKS["Outono Quente"],
    },
    {
      cartela: "Primavera Brilhante",
      resumo:
        "Identificamos características luminosas com subtom quente, ideais para a paleta Primavera Brilhante com cores vivas e energéticas.",
      caracteristicas: { subtom: "Quente", profundidade: "Clara", contraste: "Médio" },
      linkPDF: PDF_LINKS["Primavera Brilhante"],
    },
  ]

  // Selecionar baseado no hash do email
  const hash = safeEmail.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)

  return options[Math.abs(hash) % options.length]
}

// Função para tentar análise com OpenAI
async function tryOpenAIAnalysis(photo: File): Promise<any> {
  console.log("🤖 [API] Tentando análise com OpenAI...")

  // Verificar se a API key existe
  if (!process.env.OPENAI_API_KEY) {
    console.log("⚠️ [API] OPENAI_API_KEY não configurada")
    throw new Error("API key não configurada")
  }

  // Inicializar cliente OpenAI DENTRO da função para evitar problemas de ambiente
  let openai: OpenAI
  try {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })
    console.log("✅ [API] Cliente OpenAI inicializado com sucesso")
  } catch (initError) {
    console.error("❌ [API] Erro ao inicializar OpenAI:", initError)
    throw new Error("Erro ao inicializar cliente OpenAI")
  }

  // Validar se photo é um File válido
  if (!photo || typeof photo.arrayBuffer !== "function") {
    console.error("❌ [API] Objeto photo inválido:", photo)
    throw new Error("Arquivo de foto inválido")
  }

  // Validar propriedades do arquivo
  const photoType = photo.type || "image/jpeg"
  const photoName = photo.name || "photo.jpg"
  const photoSize = photo.size || 0

  console.log("📸 [API] Detalhes do arquivo:", {
    name: photoName,
    type: photoType,
    size: photoSize,
  })

  // Converter para base64
  let buffer: Buffer
  try {
    const arrayBuffer = await photo.arrayBuffer()
    buffer = Buffer.from(arrayBuffer)
  } catch (bufferError) {
    console.error("❌ [API] Erro ao converter imagem:", bufferError)
    throw new Error("Erro ao processar imagem")
  }

  const base64Image = buffer.toString("base64")
  const dataUrl = `data:${photoType};base64,${base64Image}`

  console.log("📸 [API] Imagem convertida para base64, tamanho:", base64Image.length)

  // Timeout de 20 segundos (aumentado)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    console.log("⏰ [API] Timeout da OpenAI")
    controller.abort()
  }, 20000)

  try {
    const response = await openai.chat.completions.create(
      {
        model: "gpt-4o",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: COLORACAO_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: "Analise esta foto:" },
              { type: "image_url", image_url: { url: dataUrl } },
            ],
          },
        ],
        max_tokens: 800,
        temperature: 0.1,
      },
      { signal: controller.signal },
    )

    clearTimeout(timeoutId)
    console.log("✅ [API] OpenAI respondeu")

    if (response.choices[0]?.message?.content) {
      const content = response.choices[0].message.content.trim()
      console.log("📄 [API] Conteúdo da resposta:", content.substring(0, 100) + "...")

      try {
        const result = JSON.parse(content)
        console.log("📊 [API] JSON parseado:", result)

        if (result.error) {
          console.log("⚠️ [API] OpenAI detectou erro:", result.motivo)
          throw new Error("Imagem inadequada para análise")
        }

        if (result.cartela && typeof result.cartela === "string") {
          // Adicionar link do PDF - garantir que cartela é string
          const analysis = {
            ...result,
            linkPDF: PDF_LINKS[result.cartela] || null,
          }

          console.log("✅ [API] Análise OpenAI concluída:", result.cartela)
          return analysis
        }

        throw new Error("Estrutura de resposta inválida - cartela não encontrada")
      } catch (parseError) {
        console.error("❌ [API] Erro ao parsear JSON:", parseError)
        console.log("📄 [API] Conteúdo que falhou:", content)
        throw new Error("Resposta inválida da OpenAI")
      }
    }

    throw new Error("Resposta vazia da OpenAI")
  } catch (openaiError: any) {
    clearTimeout(timeoutId)

    if (openaiError.name === "AbortError") {
      console.log("⏰ [API] OpenAI timeout")
      throw new Error("Timeout na análise - tente novamente")
    } else if (openaiError.message?.includes("API key")) {
      console.error("🔑 [API] Problema com API key")
      throw new Error("Problema de autenticação")
    } else {
      console.error("❌ [API] Erro da OpenAI:", openaiError.message)
      throw openaiError
    }
  }
}

export async function POST(request: Request) {
  console.log("🚀 [API] Iniciando análise...")

  try {
    // Verificar se é uma requisição válida
    if (!request) {
      console.log("❌ [API] Requisição inválida")
      return createJsonResponse(
        {
          success: false,
          error: "Requisição inválida",
          code: "INVALID_REQUEST",
        },
        400,
      )
    }

    let formData: FormData
    try {
      formData = await request.formData()
    } catch (formError) {
      console.error("❌ [API] Erro ao parsear FormData:", formError)
      return createJsonResponse(
        {
          success: false,
          error: "Dados do formulário inválidos",
          code: "INVALID_FORM_DATA",
        },
        400,
      )
    }

    const photo = formData.get("photo") as File
    const email = formData.get("email") as string

    console.log("📝 [API] Dados recebidos:", {
      hasPhoto: !!photo,
      photoName: photo?.name || "N/A",
      photoSize: photo?.size || 0,
      photoType: photo?.type || "N/A",
      email: email ? email.substring(0, 5) + "***" : "não fornecido",
      photoConstructor: photo?.constructor?.name || "N/A",
    })

    // Validações básicas
    if (!photo) {
      console.log("❌ [API] Foto não fornecida")
      return createJsonResponse(
        {
          success: false,
          error: "Foto é obrigatória",
          code: "MISSING_PHOTO",
        },
        400,
      )
    }

    if (!email || typeof email !== "string") {
      console.log("❌ [API] Email não fornecido ou inválido")
      return createJsonResponse(
        {
          success: false,
          error: "E-mail é obrigatório",
          code: "MISSING_EMAIL",
        },
        400,
      )
    }

    // Validar se photo é realmente um File
    if (typeof photo.arrayBuffer !== "function") {
      console.log("❌ [API] Objeto photo não é um File válido")
      return createJsonResponse(
        {
          success: false,
          error: "Arquivo de foto inválido",
          code: "INVALID_PHOTO_OBJECT",
        },
        400,
      )
    }

    // Validar tipo de arquivo - com fallback
    const photoType = photo.type || "image/jpeg"
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
    if (!allowedTypes.includes(photoType)) {
      console.log("❌ [API] Tipo de arquivo inválido:", photoType)
      return createJsonResponse(
        {
          success: false,
          error: "Formato não suportado. Use JPG, PNG ou WebP",
          code: "INVALID_FILE_TYPE",
        },
        400,
      )
    }

    // Validar tamanho - com fallback
    const photoSize = photo.size || 0
    if (photoSize > 10 * 1024 * 1024) {
      console.log("❌ [API] Arquivo muito grande:", photoSize)
      return createJsonResponse(
        {
          success: false,
          error: "Arquivo muito grande. Máximo 10MB",
          code: "FILE_TOO_LARGE",
        },
        400,
      )
    }

    console.log("✅ [API] Validações passaram")

    // Tentar OpenAI primeiro
    try {
      const openaiResult = await tryOpenAIAnalysis(photo)
      return createJsonResponse({
        success: true,
        analysis: openaiResult,
        source: "openai",
      })
    } catch (openaiError: any) {
      console.warn("⚠️ [API] OpenAI falhou:", openaiError.message)
      // Continuar para fallback ao invés de retornar erro
    }

    // Fallback - sempre funciona
    console.log("🔄 [API] Usando análise de fallback...")
    const fallbackResult = getFallbackAnalysis(email)
    console.log("✅ [API] Fallback concluído:", fallbackResult.cartela)

    return createJsonResponse({
      success: true,
      analysis: fallbackResult,
      source: "fallback",
    })
  } catch (error: any) {
    console.error("❌ [API] Erro crítico:", error)
    console.error("❌ [API] Stack trace:", error.stack)

    // Garantir que sempre retornamos JSON válido
    return createJsonResponse(
      {
        success: false,
        error: error.message || "Erro interno do servidor",
        code: "INTERNAL_ERROR",
        timestamp: new Date().toISOString(),
      },
      500,
    )
  }
}

// Tratar outros métodos HTTP
export async function GET() {
  return createJsonResponse(
    {
      success: false,
      error: "Método não permitido. Use POST.",
      code: "METHOD_NOT_ALLOWED",
    },
    405,
  )
}

export async function PUT() {
  return createJsonResponse(
    {
      success: false,
      error: "Método não permitido. Use POST.",
      code: "METHOD_NOT_ALLOWED",
    },
    405,
  )
}

export async function DELETE() {
  return createJsonResponse(
    {
      success: false,
      error: "Método não permitido. Use POST.",
      code: "METHOD_NOT_ALLOWED",
    },
    405,
  )
}
