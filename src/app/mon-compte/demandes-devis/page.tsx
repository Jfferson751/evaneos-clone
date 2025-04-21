"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DemandesDevisPage = () => {
  const { user, isLoading } = useAuth();
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simuler le chargement des demandes de devis
  useEffect(() => {
    if (!user) return;
    
    const fetchQuoteRequests = async () => {
      setLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Données de test
        const mockQuoteRequests = [
          {
            id: 'qr-1',
            destination_name: 'France',
            departure_date: '2025-06-15',
            duration: '8-14 jours',
            travelers_count: 2,
            status: 'pending',
            created_at: '2025-04-15T10:30:00Z',
            quotes_count: 0
          },
          {
            id: 'qr-2',
            destination_name: 'Japon',
            departure_date: '2025-09-10',
            duration: '15-21 jours',
            travelers_count: 4,
            status: 'quoted',
            created_at: '2025-04-10T14:45:00Z',
            quotes_count: 3
          },
          {
            id: 'qr-3',
            destination_name: 'Maroc',
            departure_date: '2025-05-20',
            duration: '1-7 jours',
            travelers_count: 2,
            status: 'confirmed',
            created_at: '2025-04-05T09:15:00Z',
            quotes_count: 2
          }
        ];
        
        setQuoteRequests(mockQuoteRequests);
        setError(null);
      } catch (err) {
        console.error('Error fetching quote requests:', err);
        setError('Une erreur est survenue lors du chargement des demandes de devis');
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuoteRequests();
  }, [user]);
  
  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };
  
  // Traduire le statut
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'En attente', color: 'bg-yellow-100 text-yellow-800' };
      case 'quoted':
        return { label: 'Devis reçus', color: 'bg-blue-100 text-blue-800' };
      case 'confirmed':
        return { label: 'Confirmé', color: 'bg-green-100 text-green-800' };
      case 'cancelled':
        return { label: 'Annulé', color: 'bg-red-100 text-red-800' };
      default:
        return { label: status, color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="bg-yellow-100 text-yellow-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Accès restreint</h2>
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <div className="mt-4">
          <Link href="/auth/login">
            <Button>Se connecter</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Erreur</h2>
        <p>{error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mes demandes de devis</h1>
      
      {quoteRequests.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Aucune demande de devis</h2>
          <p className="mb-4">Vous n'avez pas encore fait de demande de devis.</p>
          <Link href="/destinations">
            <Button>Explorer les destinations</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {quoteRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">{request.destination_name}</h2>
                    <p className="text-gray-500 mb-4">
                      Demande créée le {formatDate(request.created_at)}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Date de départ</p>
                        <p className="font-medium">{formatDate(request.departure_date)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Durée</p>
                        <p className="font-medium">{request.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Voyageurs</p>
                        <p className="font-medium">{request.travelers_count} personne(s)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end mt-4 md:mt-0">
                    <span className={`${getStatusLabel(request.status).color} text-sm px-3 py-1 rounded-full mb-4`}>
                      {getStatusLabel(request.status).label}
                    </span>
                    
                    {request.quotes_count > 0 && (
                      <p className="text-blue-600 font-medium mb-4">
                        {request.quotes_count} devis reçu(s)
                      </p>
                    )}
                    
                    <Button>Voir les détails</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemandesDevisPage;
