// Données statiques pour les destinations
export const destinations = [
  {
    id: '1',
    name: 'France',
    slug: 'france',
    description: 'Découvrez la France, pays de l\'art de vivre, des paysages variés et d\'un patrimoine culturel exceptionnel.',
    long_description: 'La France offre une diversité de paysages et d\'expériences inégalée. Des plages de la Côte d\'Azur aux sommets des Alpes, en passant par les vignobles de Bourgogne et les châteaux de la Loire, chaque région possède son caractère unique. Berceau de la gastronomie mondiale, patrie des grands vins et terre d\'histoire, la France vous invite à un voyage inoubliable entre tradition et modernité.',
    continent: 'Europe',
    country: 'France',
    image_url: '/images/france.jpg',
    climate: 'Tempéré avec des variations régionales. Méditerranéen au sud, océanique à l\'ouest, continental à l\'est.',
    best_time_to_visit: 'Avril à octobre, avec un pic touristique en juillet-août.',
    languages: 'Français',
    currency: 'Euro (€)',
    recommended_duration: '7 à 14 jours',
    highlights: [
      { id: 1, highlight: 'Paris et ses monuments emblématiques' },
      { id: 2, highlight: 'Les châteaux de la Loire' },
      { id: 3, highlight: 'La Côte d\'Azur et ses plages' },
      { id: 4, highlight: 'Les villages pittoresques de Provence' },
      { id: 5, highlight: 'La gastronomie et les vins français' },
      { id: 6, highlight: 'Les Alpes et les Pyrénées pour les amateurs de montagne' }
    ],
    agencies: [
      {
        id: 1,
        name: 'France Authentique',
        description: 'Spécialiste des voyages hors des sentiers battus en France, nous vous proposons des expériences authentiques à la rencontre des terroirs et des traditions.',
        location: 'Paris, France',
        logo_url: '/images/agency-france.jpg',
        cover_image_url: '/images/agency-france-cover.jpg',
        rating: 4.8,
        reviews_count: 245,
        is_verified: true
      },
      {
        id: 2,
        name: 'Découverte Hexagonale',
        description: 'Notre agence vous fait découvrir la France sous toutes ses facettes, avec des circuits thématiques et des séjours personnalisés.',
        location: 'Lyon, France',
        logo_url: '/images/agency-france2.jpg',
        cover_image_url: '/images/agency-france2-cover.jpg',
        rating: 4.6,
        reviews_count: 189,
        is_verified: true
      }
    ],
    itineraries: [
      {
        id: 1,
        agency_id: 1,
        title: 'Tour de France Essentiel',
        description: 'Un circuit complet pour découvrir les incontournables de la France : Paris, la Loire, la Provence et la Côte d\'Azur.',
        duration: '12 jours',
        price_from: 2450,
        image_url: '/images/itinerary-france1.jpg',
        is_featured: true
      },
      {
        id: 2,
        agency_id: 2,
        title: 'Gastronomie et Vins de France',
        description: 'Un voyage sensoriel à travers les grandes régions viticoles et gastronomiques françaises.',
        duration: '10 jours',
        price_from: 2800,
        image_url: '/images/itinerary-france2.jpg',
        is_featured: false
      },
      {
        id: 3,
        agency_id: 1,
        title: 'La France Médiévale',
        description: 'Remontez le temps en visitant les plus beaux villages médiévaux, châteaux et abbayes de France.',
        duration: '8 jours',
        price_from: 1950,
        image_url: '/images/itinerary-france3.jpg',
        is_featured: false
      }
    ]
  },
  {
    id: '2',
    name: 'Japon',
    slug: 'japon',
    description: 'Explorez le Japon, pays où traditions millénaires et innovations futuristes coexistent harmonieusement.',
    long_description: 'Le Japon est un pays de contrastes fascinants, où les temples anciens côtoient les gratte-ciels ultramodernes. De Tokyo, mégalopole effervescente, aux paisibles jardins zen de Kyoto, en passant par les paysages volcaniques d\'Hokkaido, le Japon offre une mosaïque d\'expériences uniques. Imprégnez-vous de la culture japonaise à travers sa gastronomie raffinée, ses rituels traditionnels et son hospitalité légendaire.',
    continent: 'Asie',
    country: 'Japon',
    image_url: '/images/japon.jpg',
    climate: 'Tempéré avec quatre saisons distinctes. Variations importantes du nord au sud.',
    best_time_to_visit: 'Mars-avril (cerisiers en fleurs) et octobre-novembre (couleurs d\'automne).',
    languages: 'Japonais',
    currency: 'Yen (¥)',
    recommended_duration: '10 à 14 jours',
    highlights: [
      { id: 1, highlight: 'Tokyo et ses quartiers contrastés' },
      { id: 2, highlight: 'Kyoto et ses temples historiques' },
      { id: 3, highlight: 'Le Mont Fuji et ses environs' },
      { id: 4, highlight: 'Hiroshima et l\'île de Miyajima' },
      { id: 5, highlight: 'La gastronomie japonaise' },
      { id: 6, highlight: 'Les sources thermales (onsen)' }
    ],
    agencies: [
      {
        id: 3,
        name: 'Nihon Discovery',
        description: 'Notre équipe franco-japonaise vous fait découvrir le Japon authentique, loin des clichés touristiques.',
        location: 'Tokyo, Japon',
        logo_url: '/images/agency-japan.jpg',
        cover_image_url: '/images/agency-japan-cover.jpg',
        rating: 4.9,
        reviews_count: 312,
        is_verified: true
      }
    ],
    itineraries: [
      {
        id: 4,
        agency_id: 3,
        title: 'Japon Essentiel',
        description: 'Un circuit complet pour découvrir les sites incontournables du Japon : Tokyo, Kyoto, Osaka et Hiroshima.',
        duration: '14 jours',
        price_from: 3200,
        image_url: '/images/itinerary-japan1.jpg',
        is_featured: true
      },
      {
        id: 5,
        agency_id: 3,
        title: 'Traditions et Modernité',
        description: 'Un voyage contrasté entre le Japon traditionnel et le Japon futuriste.',
        duration: '12 jours',
        price_from: 2950,
        image_url: '/images/itinerary-japan2.jpg',
        is_featured: false
      }
    ]
  },
  {
    id: '3',
    name: 'Maroc',
    slug: 'maroc',
    description: 'Découvrez le Maroc, pays aux mille couleurs entre désert, montagnes et océan.',
    long_description: 'Le Maroc vous invite à un voyage sensoriel inoubliable. Des médinas labyrinthiques de Fès et Marrakech aux dunes dorées du Sahara, en passant par les sommets enneigés de l\'Atlas et les plages de l\'Atlantique, le Maroc offre une diversité de paysages exceptionnelle. Laissez-vous envoûter par les parfums d\'épices, les saveurs de la cuisine marocaine et l\'hospitalité légendaire de ses habitants.',
    continent: 'Afrique',
    country: 'Maroc',
    image_url: '/images/maroc.jpg',
    climate: 'Méditerranéen au nord, désertique au sud. Chaud en été, doux en hiver.',
    best_time_to_visit: 'Mars à mai et septembre à novembre.',
    languages: 'Arabe, Berbère, Français largement parlé',
    currency: 'Dirham marocain (MAD)',
    recommended_duration: '7 à 10 jours',
    highlights: [
      { id: 1, highlight: 'Marrakech et sa place Jemaa el-Fna' },
      { id: 2, highlight: 'La médina de Fès' },
      { id: 3, highlight: 'Le désert du Sahara et ses dunes' },
      { id: 4, highlight: 'Les montagnes de l\'Atlas' },
      { id: 5, highlight: 'Essaouira et la côte Atlantique' },
      { id: 6, highlight: 'La cuisine marocaine' }
    ],
    agencies: [
      {
        id: 4,
        name: 'Maroc Authentique',
        description: 'Notre agence locale vous propose des voyages sur mesure pour découvrir le vrai Maroc, loin du tourisme de masse.',
        location: 'Marrakech, Maroc',
        logo_url: '/images/agency-morocco.jpg',
        cover_image_url: '/images/agency-morocco-cover.jpg',
        rating: 4.7,
        reviews_count: 178,
        is_verified: true
      }
    ],
    itineraries: [
      {
        id: 6,
        agency_id: 4,
        title: 'Villes Impériales et Désert',
        description: 'Un circuit complet pour découvrir les villes impériales du Maroc et vivre l\'expérience du désert.',
        duration: '10 jours',
        price_from: 1450,
        image_url: '/images/itinerary-morocco1.jpg',
        is_featured: true
      },
      {
        id: 7,
        agency_id: 4,
        title: 'Montagnes et Océan',
        description: 'Un voyage entre les montagnes de l\'Atlas et les plages de l\'Atlantique.',
        duration: '8 jours',
        price_from: 1200,
        image_url: '/images/itinerary-morocco2.jpg',
        is_featured: false
      }
    ]
  }
];

// Données statiques pour les thématiques
export const themes = [
  {
    id: '1',
    name: 'Aventure',
    slug: 'aventure',
    description: 'Voyages d\'aventure pour les amateurs de sensations fortes et d\'activités en plein air.',
    image_url: '/images/theme-adventure.jpg'
  },
  {
    id: '2',
    name: 'Culture',
    slug: 'culture',
    description: 'Immersion culturelle à la découverte du patrimoine, de l\'histoire et des traditions locales.',
    image_url: '/images/theme-culture.jpg'
  },
  {
    id: '3',
    name: 'Gastronomie',
    slug: 'gastronomie',
    description: 'Voyages gourmands pour découvrir les saveurs et spécialités culinaires du monde entier.',
    image_url: '/images/theme-food.jpg'
  },
  {
    id: '4',
    name: 'Nature',
    slug: 'nature',
    description: 'Évasion en pleine nature pour admirer des paysages exceptionnels et observer la faune et la flore.',
    image_url: '/images/theme-nature.jpg'
  },
  {
    id: '5',
    name: 'Plage',
    slug: 'plage',
    description: 'Séjours balnéaires pour profiter du soleil, de la mer et des plus belles plages du monde.',
    image_url: '/images/theme-beach.jpg'
  },
  {
    id: '6',
    name: 'Famille',
    slug: 'famille',
    description: 'Voyages adaptés aux familles avec des activités pour petits et grands.',
    image_url: '/images/theme-family.jpg'
  }
];

// Fonction utilitaire pour simuler une API
export const getDB = () => {
  return {
    // Destinations
    getAllDestinations: async (filters = {}) => {
      let results = [...destinations];
      
      // Filtrage par continent
      if (filters.continent) {
        results = results.filter(d => d.continent.toLowerCase() === filters.continent.toLowerCase());
      }
      
      // Filtrage par thème (simulé)
      if (filters.theme) {
        // Dans une vraie application, on aurait une relation entre destinations et thèmes
        // Ici on simule un filtrage aléatoire
        results = results.filter(() => Math.random() > 0.3);
      }
      
      // Filtrage par budget
      if (filters.budget_min || filters.budget_max) {
        results = results.filter(d => {
          // On utilise le prix minimum des itinéraires comme référence
          const minPrice = Math.min(...d.itineraries.map(i => i.price_from));
          
          if (filters.budget_min && minPrice < filters.budget_min) {
            return false;
          }
          
          if (filters.budget_max && minPrice > filters.budget_max) {
            return false;
          }
          
          return true;
        });
      }
      
      // Filtrage par durée
      if (filters.duration) {
        // Conversion de la durée en jours (format "X jours")
        const durationMap = {
          'court': [1, 7],
          'moyen': [8, 14],
          'long': [15, 100]
        };
        
        if (durationMap[filters.duration]) {
          const [min, max] = durationMap[filters.duration];
          
          results = results.filter(d => {
            // On extrait la durée minimale des itinéraires
            const durations = d.itineraries.map(i => {
              const days = parseInt(i.duration.split(' ')[0]);
              return days;
            });
            
            const minDuration = Math.min(...durations);
            return minDuration >= min && minDuration <= max;
          });
        }
      }
      
      // Recherche par texte
      if (filters.search) {
        const search = filters.search.toLowerCase();
        results = results.filter(d => 
          d.name.toLowerCase().includes(search) || 
          d.country.toLowerCase().includes(search) || 
          d.description.toLowerCase().includes(search)
        );
      }
      
      return results;
    },
    
    getDestinationById: async (id) => {
      return destinations.find(d => d.id === id || d.slug === id);
    },
    
    // Thèmes
    getAllThemes: async () => {
      return themes;
    },
    
    getThemeById: async (id) => {
      return themes.find(t => t.id === id || t.slug === id);
    },
    
    // Utilisateurs (simulé)
    getUserByEmail: async (email) => {
      // Simuler la recherche d'un utilisateur
      if (email === 'voyageur@example.com' || email === 'agence@example.com') {
        return { email };
      }
      return null;
    },
    
    createUser: async (userData) => {
      // Simuler la création d'un utilisateur
      console.log('Création d\'un utilisateur:', userData);
      return {
        id: 'new-user-' + Date.now(),
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        role: userData.role,
        created_at: new Date().toISOString()
      };
    },
    
    // Demandes de devis (simulé)
    createQuoteRequest: async (data) => {
      console.log('Création d\'une demande de devis:', data);
      return {
        id: 'quote-' + Date.now(),
        ...data,
        status: 'pending',
        created_at: new Date().toISOString()
      };
    },
    
    // Autres méthodes simulées pour les réservations, messages, etc.
  };
};
