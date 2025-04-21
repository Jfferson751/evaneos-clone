'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-emerald-700">
            voyageo
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/destinations" className="text-gray-700 hover:text-emerald-600">
              Destinations
            </Link>
            <Link href="/thematiques" className="text-gray-700 hover:text-emerald-600">
              Où partir ?
            </Link>
            <Link href="/magazine" className="text-gray-700 hover:text-emerald-600">
              Magazine
            </Link>
            <Link href="/engagements" className="text-gray-700 hover:text-emerald-600">
              Nos engagements
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/aide" className="text-gray-700 hover:text-emerald-600">
              Centre d'aide
            </Link>
            <Link href="/compte" className="text-gray-700 hover:text-emerald-600">
              Mon espace personnel
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-emerald-800 to-emerald-600">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Un voyage sur mesure et plus responsable en direct avec les meilleures agences locales
          </h1>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl">
            <div className="flex">
              <Input 
                type="text" 
                placeholder="Où souhaitez-vous partir ?" 
                className="flex-grow"
              />
              <Button className="ml-2 bg-amber-500 hover:bg-amber-600">
                J'y vais
              </Button>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="text-emerald-700 border-emerald-700">
                Inspirez-moi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-emerald-800 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2">Notre vision du voyage ?</h2>
          <p className="text-xl">Plus local, plus responsable, entièrement sur-mesure</p>
        </div>
      </section>

      {/* Inspirations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Inspirations locales, été inoubliable</h2>
          <p className="text-center text-lg mb-12">Explorer, plonger, savourer, être à l'écoute... Cet été, vivez un voyage unique conçu sur-mesure avec nos experts locaux.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-lg overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Grèce</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Chine</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Réunion</h3>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="text-emerald-700 border-emerald-700">
              S'inspirer
            </Button>
          </div>
        </div>
      </section>

      {/* Better Travel Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Mieux voyager : où, quand, comment ?</h2>
          <p className="text-center text-lg mb-12">Vous recherchez un voyage plus authentique et responsable ? Découvrez les expériences insolites dénichées par nos experts et expertes locales, nos conseils et bonnes pratiques pour voyager plus en harmonie avec les cultures et les milieux naturels.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-lg overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Un été inoubliable</h3>
                <p className="text-white">4 façons de vous évader, 12 destinations</p>
                <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700">Découvrir</Button>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Cap sur l'hiver</h3>
                <p className="text-white">Réservez tôt, voyagez grand</p>
                <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700">Découvrir</Button>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-80 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">Index du surtourisme</h3>
                <p className="text-white">Comprendre pour mieux agir</p>
                <Button className="mt-2 bg-emerald-600 hover:bg-emerald-700">Découvrir</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Agencies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Voyagez autrement : co-créez un itinéraire personnalisé avec les meilleures agences locales</h2>
          <p className="text-center text-lg mb-12">Découvrez une nouvelle façon de préparer et de vivre votre voyage sur mesure. La clé : un dialogue en direct avec une sélection pointue d'agences locales.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">L'agence de Claire</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-amber-400">
                    <span>★★★★★</span>
                  </div>
                  <span className="ml-2 text-gray-600">163 avis</span>
                </div>
                <p className="text-gray-700">Spécialiste des voyages en autotour classiques en Australie</p>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">L'agence de Mohammad</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-amber-400">
                    <span>★★★★★</span>
                  </div>
                  <span className="ml-2 text-gray-600">2 589 avis</span>
                </div>
                <p className="text-gray-700">Spécialiste des voyages incontournables en Jordanie</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="text-emerald-700 border-emerald-700">
              Voir nos critères de sélection
            </Button>
          </div>
        </div>
      </section>

      {/* Thematic Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Osez découvrir le monde autrement en vivant des expériences uniques et insolites</h2>
          <p className="text-center text-lg mb-12">En couple ou en famille ? Pour un trekking ou un safari ? Plutôt culture ou aventure ? Découvrez plus de 8000 idées de voyage sélectionnées par nos agences locales spécialisées.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative rounded-lg overflow-hidden h-64 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">Famille</h3>
                <p className="text-white text-sm">L'aventure pour tous les âges</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-64 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">Roadtrip</h3>
                <p className="text-white text-sm">En toute liberté</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-64 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">Randonnée et trek</h3>
                <p className="text-white text-sm">Découvrir le monde à pied</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-64 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white">Plages paradisiaques</h3>
                <p className="text-white text-sm">Au soleil</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="text-emerald-700 border-emerald-700">
              Voir toutes nos thématiques
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Déjà 600 000 voyageurs et 97% de satisfaction</h2>
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-emerald-700">4.6/5</span>
              <div className="flex text-amber-400 ml-2">
                <span>★★★★★</span>
              </div>
              <span className="ml-2 text-gray-600">67153 avis de voyageurs</span>
            </div>
          </div>
          <p className="text-center text-lg mb-12">De la conception jusqu'à la réalisation, Voyageo humanise le voyage. Vous êtes plus de 800 000 à en avoir fait l'expérience aux quatre coins du monde, avec un taux de satisfaction de 97% !</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-amber-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">« Un séjour parfait »</h3>
              <p className="text-gray-700">Bérangère et Jacques au Monténégro, une agréable découverte</p>
            </div>
            <div className="bg-amber-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">« (Re)découvrir la France »</h3>
              <p className="text-gray-700">Sylvain, un voyage en famille magique près de chez soi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Pourquoi voyager avec Voyageo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-300">Expertise locale</h3>
              <p>Une sélection d'agences francophones qui connaissent leur destination mieux que quiconque.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-300">100% sur mesure</h3>
              <p>Un voyage entièrement modulable : étapes, hébergements, activités...</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-300">Prix juste</h3>
              <p>Pour vous et pour toutes les personnes qui contribuent à la réussite de votre voyage.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-300">Garanties Voyageo</h3>
              <p>Voyageo assure votre voyage, de la préparation jusqu'à votre retour.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-white text-emerald-800 hover:bg-gray-100">
              Le concept Voyageo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Destinations</h3>
              <ul className="space-y-2">
                <li><Link href="/destinations/europe" className="hover:text-emerald-400">Europe</Link></li>
                <li><Link href="/destinations/asie" className="hover:text-emerald-400">Asie</Link></li>
                <li><Link href="/destinations/afrique" className="hover:text-emerald-400">Afrique</Link></li>
                <li><Link href="/destinations/ameriques" className="hover:text-emerald-400">Amériques</Link></li>
                <li><Link href="/destinations/oceanie" className="hover:text-emerald-400">Océanie</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Thématiques</h3>
              <ul className="space-y-2">
                <li><Link href="/thematiques/famille" className="hover:text-emerald-400">Famille</Link></li>
                <li><Link href="/thematiques/roadtrip" className="hover:text-emerald-400">Roadtrip</Link></li>
                <li><Link href="/thematiques/randonnee" className="hover:text-emerald-400">Randonnée</Link></li>
                <li><Link href="/thematiques/plages" className="hover:text-emerald-400">Plages</Link></li>
                <li><Link href="/thematiques/safari" className="hover:text-emerald-400">Safari</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">À propos</h3>
              <ul className="space-y-2">
                <li><Link href="/concept" className="hover:text-emerald-400">Notre concept</Link></li>
                <li><Link href="/engagements" className="hover:text-emerald-400">Nos engagements</Link></li>
                <li><Link href="/agences" className="hover:text-emerald-400">Nos agences locales</Link></li>
                <li><Link href="/magazine" className="hover:text-emerald-400">Magazine</Link></li>
                <li><Link href="/faq" className="hover:text-emerald-400">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Légal</h3>
              <ul className="space-y-2">
                <li><Link href="/mentions-legales" className="hover:text-emerald-400">Mentions légales</Link></li>
                <li><Link href="/cgv" className="hover:text-emerald-400">CGV</Link></li>
                <li><Link href="/confidentialite" className="hover:text-emerald-400">Politique de confidentialité</Link></li>
                <li><Link href="/cookies" className="hover:text-emerald-400">Gestion des cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>© 2025 Voyageo. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
