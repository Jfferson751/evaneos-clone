"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const MessagesPage = () => {
  const { user, isLoading } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Simuler le chargement des conversations
  useEffect(() => {
    if (!user) return;
    
    const fetchConversations = async () => {
      setLoading(true);
      try {
        // Simuler un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Données de test
        const mockConversations = [
          {
            id: 'conv-1',
            agency_name: 'France Authentique',
            destination_name: 'France',
            last_message: 'Bonjour, nous avons bien reçu votre demande de devis pour la France. Nous sommes en train de préparer une proposition sur mesure pour vous.',
            last_message_date: '2025-04-18T14:30:00Z',
            unread_count: 2
          },
          {
            id: 'conv-2',
            agency_name: 'Nihon Discovery',
            destination_name: 'Japon',
            last_message: 'Merci pour votre intérêt pour notre circuit "Japon Essentiel". Avez-vous des questions spécifiques sur l\'itinéraire ou les activités proposées ?',
            last_message_date: '2025-04-15T09:45:00Z',
            unread_count: 0
          }
        ];
        
        setConversations(mockConversations);
        setError(null);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError('Une erreur est survenue lors du chargement des conversations');
      } finally {
        setLoading(false);
      }
    };
    
    fetchConversations();
  }, [user]);
  
  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return new Intl.DateTimeFormat('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long'
      }).format(date);
    } else {
      return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
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
      <h1 className="text-3xl font-bold mb-8">Mes messages</h1>
      
      {conversations.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">Aucune conversation</h2>
          <p className="mb-4">Vous n'avez pas encore de conversations avec des agences locales.</p>
          <Link href="/destinations">
            <Button>Explorer les destinations</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <Card key={conversation.id} className={conversation.unread_count > 0 ? 'border-blue-500' : ''}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-lg font-semibold">{conversation.agency_name}</h2>
                      <span className="text-sm text-gray-500 ml-2">
                        • {conversation.destination_name}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1 line-clamp-2">{conversation.last_message}</p>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500 mb-1">
                      {formatDate(conversation.last_message_date)}
                    </span>
                    
                    {conversation.unread_count > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                        {conversation.unread_count}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button>Voir la conversation</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
