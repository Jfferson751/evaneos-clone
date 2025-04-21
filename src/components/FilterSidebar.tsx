import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

export interface FilterOptions {
  continent: string | null;
  theme: string | null;
  budget_min: string;
  budget_max: string;
  duration: string;
}

interface Theme {
  id: number;
  name: string;
  slug: string;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange, initialFilters = {} }) => {
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterOptions>({
    continent: initialFilters.continent || searchParams.get('continent'),
    theme: initialFilters.theme || searchParams.get('theme'),
    budget_min: initialFilters.budget_min || searchParams.get('budget_min') || '',
    budget_max: initialFilters.budget_max || searchParams.get('budget_max') || '',
    duration: initialFilters.duration || searchParams.get('duration') || '',
  });
  
  const [themes, setThemes] = useState<Theme[]>([]);
  
  // Fetch themes
  useEffect(() => {
    fetch('/api/themes')
      .then(res => res.json())
      .then(data => setThemes(data))
      .catch(err => console.error('Error fetching themes:', err));
  }, []);
  
  const handleFilterChange = (key: keyof FilterOptions, value: string | null) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };
  
  const applyFilters = () => {
    onFilterChange(filters);
  };
  
  const resetFilters = () => {
    const resetFilters = {
      continent: null,
      theme: null,
      budget_min: '',
      budget_max: '',
      duration: '',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
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
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Filtrer les résultats</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Continent</label>
            <select
              value={filters.continent || ''}
              onChange={(e) => handleFilterChange('continent', e.target.value || null)}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Thématique</label>
            <select
              value={filters.theme || ''}
              onChange={(e) => handleFilterChange('theme', e.target.value || null)}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
            <div className="flex gap-2 items-center">
              <Input
                type="number"
                placeholder="Min €"
                value={filters.budget_min}
                onChange={(e) => handleFilterChange('budget_min', e.target.value)}
                className="w-full"
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="Max €"
                value={filters.budget_max}
                onChange={(e) => handleFilterChange('budget_max', e.target.value)}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Durée</label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
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
          
          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={applyFilters} className="w-full bg-blue-600 hover:bg-blue-700">
              Appliquer les filtres
            </Button>
            <Button 
              onClick={resetFilters} 
              variant="outline" 
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
