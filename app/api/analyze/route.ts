import { type NextRequest, NextResponse } from "next/server"
import { OpenAI } from "openai"

// Inicializar o cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    // Obter a imagem do corpo da requisição
    const formData = await request.formData()
    const imageFile = formData.get("image") as File

    if (!imageFile) {
      return NextResponse.json({ error: "Nenhuma imagem foi enviada" }, { status: 400 })
    }

    // Converter a imagem para base64
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")

    // Preparar a instrução para o modelo
    const instruction = `Você é um especialista em análise de coloração pessoal. Sua tarefa é analisar a imagem fornecida e determinar com precisão a cartela de coloração da pessoa com base nas seguintes etapas:
    1. Identifique:
    - Tom da pele
    - Subtom da pele
    - Cor e intensidade dos olhos
    - Cor, tonalidade e textura do cabelo
    2. Classifique o indivíduo em uma das seguintes cartelas sazonais: 
    Primavera Clara, Primavera Intensa, Primavera Pura,
    Verão Claro, Verão Suave, Verão Puro,
    Outono Suave, Outono Profundo, Outono Puro,
    Inverno Profundo, Inverno Intenso, Inverno Puro.
    3. Responda no seguinte formato:
    Cartela Identificada: [NOME DA CARTELA]
    Resumo da Análise: [parágrafo com até 4 frases, explicando com clareza as características físicas e justificando a escolha da cartela].
    Não adicione informações fora desse formato. Baseie-se exclusivamente na imagem enviada.`

    // Fazer a requisição para a API do OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: instruction },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 500,
    })

    // Extrair o resultado da análise
    const analysisText = response.choices[0].message.content || ""

    // Processar o texto para extrair a cartela e o resumo
    const cartelaMatch = analysisText.match(/Cartela Identificada: (.+)/)
    const resumoMatch = analysisText.match(/Resumo da Análise: (.+)/)

    const cartela = cartelaMatch ? cartelaMatch[1].trim() : "Não identificada"
    const resumo = resumoMatch ? resumoMatch[1].trim() : "Não foi possível gerar um resumo."

    // Retornar o resultado
    return NextResponse.json({ cartela, resumo })
  } catch (error) {
    console.error("Erro ao analisar a imagem:", error)
    return NextResponse.json({ error: "Erro ao processar a análise" }, { status: 500 })
  }
}
