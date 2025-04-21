"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

const LogoutPage = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <h1 className="text-2xl font-bold mb-6 text-center">Déconnexion</h1>
          
          <p className="text-center mb-6">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </p>
          
          <div className="flex gap-4">
            <Button 
              onClick={handleLogout}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Se déconnecter
            </Button>
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
