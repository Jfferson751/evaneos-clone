import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SearchBarProps {
  className?: string;
}

interface Destination {
  id: number;
  name: string;
  country: string;
  continent: string;
  slug: string;
}

interface Theme {
  id: number;
  name: string;
  slug: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [minBudget, setMinBudget] = useState<string>('');
  const [maxBudget, setMaxBudget] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  // Fetch destinations based on search query
  useEffect(() => {
    if (query.length > 2) {
      fetch(`/api/destinations?query=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setDestinations(data);
          setShowResults(true);
        })
        .catch(err => console.error('Error fetching destinations:', err));
    } else {
      setShowResults(false);
    }
  }, [query]);

  // Fetch themes for advanced search
  useEffect(() => {
    fetch('/api/themes')
      .then(res => res.json())
      .then(data => setThemes(data))
      .catch(err => console.error('Error fetching themes:', err));
  }, []);

  const handleSearch = () => {
    // Build search params
    const searchParams = new URLSearchParams();
    
    if (query) {
      searchParams.append('query', query);
    }
    
    if (selectedContinent) {
      searchParams.append('continent', selectedContinent);
    }
    
    if (selectedTheme) {
      searchParams.append('theme', selectedTheme);
    }
    
    if (minBudget) {
      searchParams.append('budget_min', minBudget);
    }
    
    if (maxBudget) {
      searchParams.append('budget_max', maxBudget);
    }
    
    if (duration) {
      searchParams.append('duration', duration);
    }
    
    // Navigate to search results page
    router.push(`/destinations?${searchParams.toString()}`);
  };

  const handleDestinationClick = (slug: string) => {
    router.push(`/destinations/${slug}`);
    setShowResults(false);
  };

  const continents = [
    { value: 'europe', label: 'Europe' },
    { value: 'asie', label: 'Asie' },
    { value: 'afrique', label: 'Afrique' },
    { value: 'amerique_nord', label: 'Amérique du Nord' },
    { value: 'amerique_sud', label: 'Amérique du Sud' },
    { value: 'oceanie', label: 'Océanie' }
  ];

  const durations = [
    { value: '1-7', label: '1 à 7 jours' },
    { value: '8-14', label: '8 à 14 jours' },
    { value: '15-21', label: '15 à 21 jours' },
    { value: '22+', label: '22 jours et plus' }
  ];

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            placeholder="Où souhaitez-vous partir ?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
            Rechercher
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
            className="text-sm text-blue-600 hover:underline"
          >
            {showAdvancedSearch ? 'Masquer les filtres avancés' : 'Afficher les filtres avancés'}
          </button>
        </div>
        
        {showAdvancedSearch && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Continent</label>
              <select
                value={selectedContinent || ''}
                onChange={(e) => setSelectedContinent(e.target.value || null)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Tous les continents</option>
                {continents.map((continent) => (
                  <option key={continent.value} value={continent.value}>
                    {continent.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Thématique</label>
              <select
                value={selectedTheme || ''}
                onChange={(e) => setSelectedTheme(e.target.value || null)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Toutes les thématiques</option>
                {themes.map((theme) => (
                  <option key={theme.slug} value={theme.slug}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Durée</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Toutes les durées</option>
                {durations.map((duration) => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget minimum</label>
              <Input
                type="number"
                placeholder="€"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget maximum</label>
              <Input
                type="number"
                placeholder="€"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
      
      {showResults && destinations.length > 0 && (
        <Card className="absolute z-10 w-full mt-2">
          <CardContent className="p-0">
            <ScrollArea className="h-64">
              <ul className="py-2">
                {destinations.map((destination) => (
                  <li
                    key={destination.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDestinationClick(destination.slug)}
                  >
                    <div className="font-medium">{destination.name}</div>
                    <div className="text-sm text-gray-500">{destination.country}, {destination.continent}</div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;
