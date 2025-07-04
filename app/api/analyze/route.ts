import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inicializa o cliente da OpenAI com a chave do arquivo .env.local
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// A função que lida com o envio do formulário
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const photo = formData.get('photo') as File;

    if (!photo) {
      return NextResponse.json({ error: 'Foto é obrigatória.' }, { status: 400 });
    }

    // Converte a imagem para Base64 para que possamos enviá-la para a IA
    const buffer = Buffer.from(await photo.arrayBuffer());
    const base64Image = buffer.toString('base64');
    const dataUrl = `data:${photo.type};base64,${base64Image}`;

    // Este é o prompt que instrui a IA. É a parte mais importante!
    const prompt = `
      Você é um especialista de renome mundial em análise de coloração pessoal, 
      com décadas de experiência em moda e visagismo. Sua tarefa é analisar a 
      foto de um rosto e determinar com precisão a paleta de cores sazonal 
      da pessoa (ex: Inverno Frio, Outono Quente, etc.).

      Analise os seguintes aspectos na imagem:
      1.  **Subtom de Pele:** Identifique se é quente (amarelado/dourado), frio (rosado/azulado) ou neutro.
      2.  **Profundidade:** Avalie se as cores gerais são claras, médias ou escuras.
      3.  **Contraste:** Observe o nível de contraste entre a cor da pele, do cabelo e dos olhos (baixo, médio ou alto).

      Com base na sua análise detalhada, retorne um objeto JSON estritamente no seguinte formato:
      {
        "cartela": "O nome da paleta sazonal principal",
        "resumo": "Um parágrafo curto e amigável explicando por que a pessoa se encaixa nessa cartela, mencionando o subtom e o contraste encontrados.",
        "caracteristicas": {
          "subtom": "Quente, Frio ou Neutro",
          "profundidade": "Clara, Média ou Escura",
          "contraste": "Baixo, Médio ou Alto"
        }
      }
    `;

    // Chamada para a API da OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // O modelo 'gpt-4o' é excelente para analisar imagens
      response_format: { type: 'json_object' }, // Garante que a resposta será um JSON válido
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Por favor, analise a pessoa nesta foto.' },
            {
              type: 'image_url',
              image_url: {
                url: dataUrl,
              },
            },
          ],
        },
      ],
    });

    // Extrai e retorna a resposta da IA para o frontend
    const analysisResult = JSON.parse(response.choices[0].message.content || '{}');

    return NextResponse.json({ success: true, analysis: analysisResult }, { status: 200 });

  } catch (error) {
    console.error('❌ ERRO NA API DA OPENAI:', error);
    return NextResponse.json({ error: 'Falha ao analisar a imagem.' }, { status: 500 });
  }
}
