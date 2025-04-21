"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getDB } from '@/lib/db';

const DestinationDetailPage = () => {
  const params = useParams();
  const id = params?.id;
  
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [quoteForm, setQuoteForm] = useState({
    departure_date: '',
    duration: '',
    travelers_count: '2',
    budget: '',
    accommodation_type: 'standard',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Fetch destination details
  useEffect(() => {
    if (!id) return;
    
    const fetchDestination = async () => {
      setLoading(true);
      try {
        const db = getDB();
        const data = await db.getDestinationById(id);
        
        if (!data) {
          throw new Error('Destination non trouvée');
        }
        
        setDestination(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching destination details:', err);
        setError(err.message || 'Erreur lors de la récupération des détails de la destination');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDestination();
  }, [id]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuoteForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmitQuoteRequest = async (e) => {
    e.preventDefault();
    
    if (!destination) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const db = getDB();
      await db.createQuoteRequest({
        destination_id: destination.id,
        destination_name: destination.name,
        ...quoteForm,
        travelers_count: parseInt(quoteForm.travelers_count),
        budget: quoteForm.budget ? parseFloat(quoteForm.budget) : undefined
      });
      
      setSubmitSuccess(true);
      setQuoteForm({
        departure_date: '',
        duration: '',
        travelers_count: '2',
        budget: '',
        accommodation_type: 'standard',
        message: ''
      });
    } catch (err) {
      setSubmitError(err.message || 'Erreur lors de la soumission de la demande de devis');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Format price with space as thousand separator
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  
  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error || !destination) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Erreur</h2>
          <p>{error || "Destination non trouvée"}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero section */}
      <div className="relative h-96 w-full mb-8 rounded-xl overflow-hidden">
        <Image
          src={destination.image_url || '/images/placeholder-destination.jpg'}
          alt={destination.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-4xl font-bold text-white mb-2">{destination.name}</h1>
          <p className="text-xl text-white">{destination.country}, {destination.continent}</p>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="lg:w-2/3">
          {/* Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">À propos de {destination.name}</h2>
            <div className="prose max-w-none">
              <p>{destination.long_description || destination.description}</p>
            </div>
          </section>
          
          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Points forts</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight) => (
                  <li key={highlight.id} className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>{highlight.highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          
          {/* Practical information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Informations pratiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destination.climate && (
                <div>
                  <h3 className="font-semibold mb-1">Climat</h3>
                  <p>{destination.climate}</p>
                </div>
              )}
              {destination.best_time_to_visit && (
                <div>
                  <h3 className="font-semibold mb-1">Meilleure période</h3>
                  <p>{destination.best_time_to_visit}</p>
                </div>
              )}
              {destination.languages && (
                <div>
                  <h3 className="font-semibold mb-1">Langues</h3>
                  <p>{destination.languages}</p>
                </div>
              )}
              {destination.currency && (
                <div>
                  <h3 className="font-semibold mb-1">Monnaie</h3>
                  <p>{destination.currency}</p>
                </div>
              )}
              {destination.recommended_duration && (
                <div>
                  <h3 className="font-semibold mb-1">Durée recommandée</h3>
                  <p>{destination.recommended_duration}</p>
                </div>
              )}
            </div>
          </section>
          
          {/* Local agencies */}
          {destination.agencies && destination.agencies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Nos agences locales à {destination.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {destination.agencies.map((agency) => (
                  <Card key={agency.id} className="overflow-hidden">
                    <div className="relative h-40 w-full">
                      <Image
                        src={agency.cover_image_url || '/images/placeholder-agency.jpg'}
                        alt={agency.name}
                        fill
                        className="object-cover"
                      />
                      {agency.logo_url && (
                        <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full overflow-hidden border-2 border-white bg-white">
                          <Image
                            src={agency.logo_url}
                            alt={`Logo ${agency.name}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{agency.name}</h3>
                        {agency.is_verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Vérifié</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{agency.location}</p>
                      <div className="flex items-center mb-3">
                        <div className="flex mr-2">
                          {renderRating(agency.rating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {agency.rating.toFixed(1)} ({agency.reviews_count} avis)
                        </span>
                      </div>
                      {agency.description && (
                        <p className="text-sm text-gray-700 mb-4 line-clamp-3">{agency.description}</p>
                      )}
                      <Button className="w-full">Contacter cette agence</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
          
          {/* Suggested itineraries */}
          {destination.itineraries && destination.itineraries.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Itinéraires suggérés</h2>
              <div className="grid grid-cols-1 gap-6">
                {destination.itineraries.map((itinerary) => (
                  <Card key={itinerary.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image
                          src={itinerary.image_url || '/images/placeholder-itinerary.jpg'}
                          alt={itinerary.title}
                          fill
                          className="object-cover"
                        />
                        {itinerary.is_featured && (
                          <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full">
                            Recommandé
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4 md:w-2/3">
                        <h3 className="text-xl font-semibold mb-2">{itinerary.title}</h3>
                        <div className="flex items-center mb-3">
                          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                            {itinerary.duration}
                          </span>
                          <span className="text-lg font-bold text-blue-600">
                            À partir de {formatPrice(itinerary.price_from)}€
                          </span>
                        </div>
                        {itinerary.description && (
                          <p className="text-gray-700 mb-4">{itinerary.description}</p>
                        )}
                        <Button className="w-full md:w-auto">Voir le détail</Button>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="sticky top-4">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Demander un devis gratuit</h2>
                
                {submitSuccess ? (
                  <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-1">Demande envoyée avec succès !</h3>
                    <p>Nos agences locales vous contacteront prochainement avec des propositions personnalisées.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitQuoteRequest}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Date de départ souhaitée
                        </label>
                        <Input
                          type="date"
                          name="departure_date"
                          value={quoteForm.departure_date}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Durée approximative
                        </label>
                        <select
                          name="duration"
                          value={quoteForm.duration}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Sélectionnez une durée</option>
                          <option value="1-7 jours">1 à 7 jours</option>
                          <option value="8-14 jours">8 à 14 jours</option>
                          <option value="15-21 jours">15 à 21 jours</option>
                          <option value="22+ jours">22 jours et plus</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre de voyageurs
                        </label>
                        <Input
                          type="number"
                          name="travelers_count"
                          min="1"
                          value={quoteForm.travelers_count}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Budget par personne (€)
                        </label>
                        <Input
                          type="number"
                          name="budget"
                          placeholder="Budget approximatif"
                          value={quoteForm.budget}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type d'hébergement
                        </label>
                        <select
                          name="accommodation_type"
                          value={quoteForm.accommodation_type}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="economique">Économique</option>
                          <option value="standard">Standard</option>
                          <option value="superieur">Supérieur</option>
                          <option value="luxe">Luxe</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Message (optionnel)
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Précisez vos attentes, centres d'intérêt..."
                          value={quoteForm.message}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        ></textarea>
                      </div>
                      
                      {submitError && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                          {submitError}
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Envoi en cours...' : 'Demander un devis gratuit'}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Pourquoi voyager avec nous ?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Voyage 100% personnalisé par des experts locaux</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Prix juste sans intermédiaires superflus</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Assistance 24/7 pendant votre voyage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Garantie des paiements et assurances</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">✓</span>
                    <span>Tourisme responsable et durable</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;
