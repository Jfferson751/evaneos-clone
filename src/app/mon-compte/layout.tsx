"use client";

import React from 'react';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MonCompteLayout = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 text-yellow-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Accès restreint</h2>
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <div className="mt-4">
            <Link href="/auth/login">
              <Button>Se connecter</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-4">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 text-xl font-bold mb-2">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            
            <nav className="space-y-1">
              <Link href="/mon-compte/profil" className="block py-2 px-4 rounded-md hover:bg-gray-100">
                Mon profil
              </Link>
              <Link href="/mon-compte/demandes-devis" className="block py-2 px-4 rounded-md hover:bg-gray-100">
                Mes demandes de devis
              </Link>
              <Link href="/mon-compte/reservations" className="block py-2 px-4 rounded-md hover:bg-gray-100">
                Mes réservations
              </Link>
              <Link href="/mon-compte/messages" className="block py-2 px-4 rounded-md hover:bg-gray-100">
                Mes messages
              </Link>
              <div className="pt-4 mt-4 border-t">
                <Link href="/auth/logout" className="block py-2 px-4 rounded-md text-red-600 hover:bg-red-50">
                  Déconnexion
                </Link>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:w-3/4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MonCompteLayout;
