import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.png"
                alt="ColorMe-IA"
                width={150}
                height={35}
                className="h-auto w-auto max-h-10"
              />
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              Descubra sua coloração pessoal com inteligência artificial e transforme seu estilo com as cores que mais
              valorizam sua beleza natural.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="mailto:contato@colorme-ia.com" className="text-gray-400 hover:text-primary transition-colors">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#como-funciona" className="text-gray-600 hover:text-primary transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="#depoimentos" className="text-gray-600 hover:text-primary transition-colors">
                  Depoimentos
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-gray-600 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/analise" className="text-gray-600 hover:text-primary transition-colors">
                  Iniciar Análise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">contato@colorme-ia.com</li>
              <li className="text-gray-600">+55 (11) 99999-9999</li>
              <li>
                <Link href="/termos" className="text-gray-600 hover:text-primary transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-600 hover:text-primary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ColorMe-IA. Todos os direitos reservados.</p>
          <p className="mt-2">
            As análises de coloração pessoal são realizadas por inteligência artificial e podem variar. Os resultados
            são apenas sugestões e não substituem a análise presencial com um consultor profissional.
          </p>
        </div>
      </div>
    </footer>
  )
}
