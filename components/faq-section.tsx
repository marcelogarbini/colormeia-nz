"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "O que é análise de coloração pessoal?",
    answer:
      "A análise de coloração pessoal é um método que identifica as cores que melhor harmonizam com suas características naturais, como tom de pele, olhos e cabelo. Essa análise ajuda a determinar quais cores de roupas, maquiagem e acessórios valorizam sua aparência natural.",
  },
  {
    question: "Como funciona a análise com inteligência artificial?",
    answer:
      "Nossa tecnologia de IA analisa sua foto para identificar seu tom de pele, subtom, cor dos olhos e cabelo. Com base nessas informações, o sistema determina sua cartela sazonal específica e fornece recomendações personalizadas de cores.",
  },
  {
    question: "Que tipo de foto devo enviar para obter os melhores resultados?",
    answer:
      "Para resultados precisos, envie uma foto em luz natural indireta, sem maquiagem, com o cabelo em seu estado natural e usando roupas de cores neutras. O rosto deve estar centralizado, com boa nitidez e sem filtros.",
  },
  {
    question: "Quanto tempo leva para receber minha análise?",
    answer:
      "O processamento da análise é rápido e você receberá os resultados em poucos minutos após o envio da foto. O relatório completo estará disponível para visualização online e download imediatamente após a conclusão da análise.",
  },
  {
    question: "Posso fazer mais de uma análise com fotos diferentes?",
    answer:
      "Sim, você pode realizar múltiplas análises com fotos diferentes. Isso pode ser útil para verificar a consistência dos resultados ou para analisar como diferentes condições de iluminação podem afetar a percepção das suas cores.",
  },
  {
    question: "O que inclui o relatório de análise?",
    answer:
      "O relatório inclui sua cartela de coloração pessoal identificada, um resumo das suas características físicas, uma paleta completa de cores recomendadas, sugestões de combinações, recomendações para roupas, maquiagem e acessórios, além de dicas personalizadas para valorizar sua beleza natural.",
  },
]

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns sobre nossa análise de coloração pessoal
          </p>
        </div>

        <div className="max-w-3xl mx-auto glassmorphism rounded-2xl p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
