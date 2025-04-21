'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Concept() {
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
      <section className="bg-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Le concept Voyageo</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Découvrez comment nous révolutionnons le voyage sur mesure en vous mettant directement en contact avec les meilleures agences locales.
          </p>
        </div>
      </section>

      {/* Main Concept */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Choisissons de voyager mieux</h2>
            <p className="text-lg mb-8">
              Chez Voyageo, nous croyons qu'un voyage réussi commence par une rencontre : celle entre vous et un expert local qui connaît sa destination comme personne. C'est pourquoi nous avons créé une plateforme qui vous met directement en relation avec des agences locales soigneusement sélectionnées.
            </p>
            <p className="text-lg mb-8">
              Notre mission est de vous permettre de vivre des expériences de voyage authentiques, sur mesure et responsables, tout en garantissant un prix juste pour tous les acteurs impliqués dans la réussite de votre voyage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-emerald-700">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Vous imaginez</h3>
              <p>Partagez vos envies, vos centres d'intérêt et vos contraintes avec nos agences locales.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-emerald-700">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Vous co-créez</h3>
              <p>Échangez directement avec l'agence locale pour construire ensemble votre voyage idéal.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-emerald-700">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Vous voyagez</h3>
              <p>Profitez d'un voyage unique, conçu sur mesure et accompagné par des experts locaux.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Les avantages Voyageo</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Expertise locale</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nos agences partenaires sont basées dans leur pays d'opération et connaissent parfaitement leur destination. Elles vous font découvrir des lieux authentiques, loin des sentiers battus, et vous partagent leur culture de l'intérieur.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>100% sur mesure</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Chaque voyage est unique, comme vous. Nos agences locales adaptent entièrement votre itinéraire selon vos envies, votre rythme et votre budget. Aucun voyage n'est identique à un autre.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Prix juste</CardTitle>
              </CardHeader>
              <CardContent>
                <p>En supprimant les intermédiaires superflus, nous garantissons un prix plus équitable pour vous et une meilleure rémunération pour les acteurs locaux qui contribuent à la réussite de votre voyage.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Garanties Voyageo</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Voyageo sécurise votre paiement, vérifie la qualité des prestations et vous accompagne avant, pendant et après votre voyage. Nous sommes là pour vous assurer une tranquillité d'esprit totale.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Selection Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Comment nous sélectionnons nos agences</h2>
          <p className="text-lg text-center max-w-3xl mx-auto mb-12">
            Nous appliquons un processus de sélection rigoureux pour vous garantir des partenaires de confiance et de qualité.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl text-white">1</span>
              </div>
              <h3 className="font-bold mb-2">Identification</h3>
              <p className="text-sm">Nous recherchons des agences locales reconnues pour leur expertise et leur engagement.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl text-white">2</span>
              </div>
              <h3 className="font-bold mb-2">Évaluation</h3>
              <p className="text-sm">Nous vérifions leurs références, leur expérience et leur connaissance du terrain.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl text-white">3</span>
              </div>
              <h3 className="font-bold mb-2">Formation</h3>
              <p className="text-sm">Nous les formons à nos standards de qualité et à notre approche du voyage responsable.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl text-white">4</span>
              </div>
              <h3 className="font-bold mb-2">Suivi continu</h3>
              <p className="text-sm">Nous évaluons régulièrement la satisfaction des voyageurs et la qualité des prestations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Ce qu'en disent nos voyageurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex text-amber-400 mb-4">
                  <span>★★★★★</span>
                </div>
                <p className="italic mb-4">"Une approche du voyage qui change tout ! J'ai adoré échanger directement avec mon agence locale qui a su créer un itinéraire parfaitement adapté à mes envies."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <p className="font-semibold">Sophie L.</p>
                    <p className="text-sm text-gray-600">Voyage au Japon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex text-amber-400 mb-4">
                  <span>★★★★★</span>
                </div>
                <p className="italic mb-4">"Grâce à Voyageo, nous avons découvert des lieux authentiques que nous n'aurions jamais trouvés par nous-mêmes. Une expérience inoubliable !"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <p className="font-semibold">Marc et Julie</p>
                    <p className="text-sm text-gray-600">Voyage en Thaïlande</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex text-amber-400 mb-4">
                  <span>★★★★★</span>
                </div>
                <p className="italic mb-4">"Le contact direct avec l'agence locale a fait toute la différence. Ils ont su s'adapter à nos besoins et nous proposer des expériences uniques."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                  <div>
                    <p className="font-semibold">Famille Dubois</p>
                    <p className="text-sm text-gray-600">Voyage au Costa Rica</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à vivre une expérience de voyage unique ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Commencez dès maintenant à imaginer votre prochain voyage sur mesure avec nos agences locales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-emerald-800 hover:bg-gray-100">
              Trouver une destination
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-emerald-700">
              Découvrir nos thématiques
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
