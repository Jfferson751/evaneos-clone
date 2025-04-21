"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

const ReservationsPage = () => {
  const { user, isLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simuler le chargement des réservations
  useEffect(() => {
    if (!user) return;
    
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Données de test
        const mockBookings = [
          {
            id: 'booking-1',
            destination_name: 'Japon',
            itinerary_title: 'Japon Essentiel',
            start_date: '2025-09-10',
            end_date: '2025-09-24',
            travelers_count: 4,
            total_price: 12800,
            status: 'confirmed',
            agency_name: 'Nihon Discovery',
            created_at: '2025-04-12T10:30:00Z'
          },
          {
            id: 'booking-2',
            destination_name: 'Maroc',
            itinerary_title: 'Villes Impériales et Désert',
            start_date: '2025-05-20',
            end_date: '2025-05-30',
            travelers_count: 2,
            total_price: 2900,
            status: 'pending_payment',
            agency_name: 'Maroc Authentique',
            created_at: '2025-04-08T14:45:00Z'
          }
        ];
        
        setBookings(mockBookings);
        setError(null);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Une erreur est survenue lors du chargement des réservations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
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
  
  // Formater le prix
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  
  // Traduire le statut
  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return { label: 'Confirmé', color: 'bg-green-100 text-green-800' };
      case 'pending_payment':
        return { label: 'Paiement en attente', color: 'bg-yellow-100 text-yellow-800' };
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
      <h1 className="text-3xl font-bold mb-8">Mes réservations</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Aucune réservation</h2>
          <p className="mb-4">Vous n'avez pas encore de réservation.</p>
          <Link href="/destinations">
            <Button>Explorer les destinations</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold mb-1">{booking.itinerary_title}</h2>
                    <p className="text-gray-500 mb-4">
                      {booking.destination_name} • Réservation du {formatDate(booking.created_at)}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Dates du voyage</p>
                        <p className="font-medium">
                          {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Voyageurs</p>
                        <p className="font-medium">{booking.travelers_count} personne(s)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Agence locale</p>
                        <p className="font-medium">{booking.agency_name}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3 flex flex-col items-end mt-4 md:mt-0">
                    <span className={`${getStatusLabel(booking.status).color} text-sm px-3 py-1 rounded-full mb-4`}>
                      {getStatusLabel(booking.status).label}
                    </span>
                    
                    <p className="text-lg font-bold text-blue-600 mb-4">
                      {formatPrice(booking.total_price)}€
                    </p>
                    
                    <div className="space-y-2">
                      <Button>Voir les détails</Button>
                      {booking.status === 'pending_payment' && (
                        <Button variant="outline">Finaliser le paiement</Button>
                      )}
                    </div>
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

export default ReservationsPage;
