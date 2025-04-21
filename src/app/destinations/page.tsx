"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { getDB } from '@/lib/db';

// Composant de chargement
const Loading = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Composant principal enveloppé dans Suspense
const DestinationsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtres
  const [continent, setContinent] = useState(searchParams.get('continent') || '');
  const [theme, setTheme] = useState(searchParams.get('theme') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [budgetMin, setBudgetMin] = useState(searchParams.get('budget_min') || '');
  const [budgetMax, setBudgetMax] = useState(searchParams.get('budget_max') || '');
  const [duration, setDuration] = useState(searchParams.get('duration') || '');
  
  // Charger les destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const db = getDB();
        const filters = {
          continent: continent || undefined,
          theme: theme || undefined,
          search: searchQuery || undefined,
          budget_min: budgetMin ? parseInt(budgetMin) : undefined,
          budget_max: budgetMax ? parseInt(budgetMax) : undefined,
          duration: duration || undefined
        };
        
        const results = await db.getAllDestinations(filters);
        setDestinations(results);
        setError(null);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Une erreur est survenue lors du chargement des destinations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDestinations();
  }, [continent, theme, searchQuery, budgetMin, budgetMax, duration]);
  
  // Mettre à jour l'URL avec les filtres
  const updateFilters = (newFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.continent) params.set('continent', newFilters.continent);
    if (newFilters.theme) params.set('theme', newFilters.theme);
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.budget_min) params.set('budget_min', newFilters.budget_min);
    if (newFilters.budget_max) params.set('budget_max', newFilters.budget_max);
    if (newFilters.duration) params.set('duration', newFilters.duration);
    
    router.push(`/destinations?${params.toString()}`);
  };
  
  // Gérer la soumission du formulaire de recherche
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({
      continent,
      theme,
      search: searchQuery,
      budget_min: budgetMin,
      budget_max: budgetMax,
      duration
    });
  };
  
  // Réinitialiser les filtres
  const resetFilters = () => {
    setContinent('');
    setTheme('');
    setSearchQuery('');
    setBudgetMin('');
    setBudgetMax('');
    setDuration('');
    router.push('/destinations');
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar with filters */}
      <div className="lg:w-1/4">
        <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-4">
          <h2 className="text-xl font-semibold mb-4">Filtres</h2>
          
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recherche
              </label>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une destination..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Continent
              </label>
              <select
                value={continent}
                onChange={(e) => setContinent(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tous les continents</option>
                <option value="Europe">Europe</option>
                <option value="Asie">Asie</option>
                <option value="Afrique">Afrique</option>
                <option value="Amérique du Nord">Amérique du Nord</option>
                <option value="Amérique du Sud">Amérique du Sud</option>
                <option value="Océanie">Océanie</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thématique
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Toutes les thématiques</option>
                <option value="aventure">Aventure</option>
                <option value="culture">Culture</option>
                <option value="gastronomie">Gastronomie</option>
                <option value="nature">Nature</option>
                <option value="plage">Plage</option>
                <option value="famille">Famille</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget (€ par personne)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="Min"
                  min="0"
                />
                <Input
                  type="number"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Toutes les durées</option>
                <option value="court">Court séjour (1-7 jours)</option>
                <option value="moyen">Séjour moyen (8-14 jours)</option>
                <option value="long">Long séjour (15+ jours)</option>
              </select>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1">
                Appliquer
              </Button>
              <Button type="button" variant="outline" onClick={resetFilters} className="flex-1">
                Réinitialiser
              </Button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Main content with destinations */}
      <div className="lg:w-3/4">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Erreur</h2>
            <p>{error}</p>
          </div>
        ) : destinations.length === 0 ? (
          <div className="bg-yellow-100 text-yellow-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Aucun résultat</h2>
            <p>Aucune destination ne correspond à vos critères. Essayez de modifier vos filtres.</p>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">{destinations.length} destination(s) trouvée(s)</p>
              
              {/* Active filters */}
              {(continent || theme || searchQuery || budgetMin || budgetMax || duration) && (
                <div className="flex flex-wrap gap-2">
                  {continent && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {continent} ×
                    </span>
                  )}
                  {theme && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {theme} ×
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      "{searchQuery}" ×
                    </span>
                  )}
                  {(budgetMin || budgetMax) && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Budget: {budgetMin || '0'}€ - {budgetMax || '∞'}€ ×
                    </span>
                  )}
                  {duration && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {duration === 'court' ? 'Court séjour' : duration === 'moyen' ? 'Séjour moyen' : 'Long séjour'} ×
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={destination.image_url || '/images/placeholder-destination.jpg'}
                      alt={destination.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-1">{destination.name}</h2>
                    <p className="text-sm text-gray-500 mb-3">{destination.country}, {destination.continent}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{destination.description}</p>
                    <Link href={`/destinations/${destination.id}`}>
                      <Button className="w-full">Découvrir</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Page principale avec Suspense
const DestinationsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Destinations</h1>
      
      <Suspense fallback={<Loading />}>
        <DestinationsContent />
      </Suspense>
    </div>
  );
};

export default DestinationsPage;
