'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const thematiques = [
  {
    id: 'famille',
    name: 'Famille',
    description: 'L\'aventure pour tous les âges',
    image: '/images/thematiques/famille.jpg',
  },
  {
    id: 'roadtrip',
    name: 'Roadtrip',
    description: 'En toute liberté',
    image: '/images/thematiques/roadtrip.jpg',
  },
  {
    id: 'randonnee',
    name: 'Randonnée et trek',
    description: 'Découvrir le monde à pied',
    image: '/images/thematiques/randonnee.jpg',
  },
  {
    id: 'plages',
    name: 'Plages paradisiaques',
    description: 'Au soleil',
    image: '/images/thematiques/plages.jpg',
  },
  {
    id: 'aurores-boreales',
    name: 'Aurores Boréales',
    description: 'Grands espaces',
    image: '/images/thematiques/aurores.jpg',
  },
  {
    id: 'train',
    name: 'Sur les rails',
    description: 'Partir en train en Europe',
    image: '/images/thematiques/train.jpg',
  },
  {
    id: 'safari',
    name: 'Safari',
    description: 'Rencontres inoubliables',
    image: '/images/thematiques/safari.jpg',
  },
  {
    id: 'culture',
    name: 'Culture et patrimoine',
    description: 'Immersion dans l\'histoire',
    image: '/images/thematiques/culture.jpg',
  },
  {
    id: 'gastronomie',
    name: 'Gastronomie',
    description: 'Saveurs du monde',
    image: '/images/thematiques/gastronomie.jpg',
  }
]

export default function Thematiques() {
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
            <Link href="/thematiques" className="text-emerald-700 font-medium">
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
      <section className="bg-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Osez découvrir le monde autrement</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            En couple ou en famille ? Pour un trekking ou un safari ? Plutôt culture ou aventure ? Découvrez plus de 8000 idées de voyage sélectionnées par nos agences locales spécialisées.
          </p>
        </div>
      </section>

      {/* Thematiques Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {thematiques.map((thematique) => (
              <Link href={`/thematiques/${thematique.id}`} key={thematique.id}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-64 bg-gray-200">
                    {/* Image placeholder - in a real app, use Next.js Image component */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white">{thematique.name}</h3>
                      <p className="text-white text-sm">{thematique.description}</p>
                    </div>
                  </div>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-emerald-700 border-emerald-700">
                      Découvrir
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Inspiration */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Inspirations saisonnières</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-80 bg-gray-200">
                {/* Image placeholder - in a real app, use Next.js Image component */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">Un été inoubliable</h3>
                  <p className="text-white">4 façons de vous évader, 12 destinations</p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Découvrir</Button>
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-80 bg-gray-200">
                {/* Image placeholder - in a real app, use Next.js Image component */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">Cap sur l'hiver</h3>
                  <p className="text-white">Réservez tôt, voyagez grand</p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Découvrir</Button>
                </div>
              </div>
            </Card>
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
