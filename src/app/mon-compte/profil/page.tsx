"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialiser le formulaire avec les données utilisateur
  useEffect(() => {
    if (user) {
      const [first_name, last_name] = user.name.split(' ');
      setFormData(prev => ({
        ...prev,
        first_name: first_name || '',
        last_name: last_name || '',
        phone: ''
      }));
    }
  }, [user]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setUpdateSuccess(false);
    setUpdateError(null);
    setIsSubmitting(true);
    
    // Simuler une mise à jour de profil
    try {
      // Validation des mots de passe si renseignés
      if (formData.new_password || formData.confirm_password) {
        if (!formData.current_password) {
          throw new Error('Veuillez saisir votre mot de passe actuel');
        }
        
        if (formData.new_password !== formData.confirm_password) {
          throw new Error('Les nouveaux mots de passe ne correspondent pas');
        }
        
        if (formData.new_password.length < 8) {
          throw new Error('Le nouveau mot de passe doit contenir au moins 8 caractères');
        }
      }
      
      // Simuler un délai de traitement
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Réinitialiser les champs de mot de passe
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }));
      
      setUpdateSuccess(true);
    } catch (err: any) {
      setUpdateError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Rediriger vers la page de connexion si non connecté
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [isLoading, user, router]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return null; // La redirection sera gérée par l'effet
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Mon profil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile summary */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4 bg-gray-100">
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-4xl font-semibold text-gray-400">
                      {formData.first_name.charAt(0)}{formData.last_name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-1">
                  {user.name}
                </h2>
                <p className="text-gray-500 mb-4">{user.email}</p>
                
                <div className="w-full text-sm text-gray-600">
                  <div className="flex justify-between py-2 border-b">
                    <span>Rôle</span>
                    <span className="font-medium capitalize">{user.role}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>ID utilisateur</span>
                    <span className="font-medium">{user.id}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Edit profile form */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Modifier mes informations</h2>
              
              {updateSuccess && (
                <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">
                  Votre profil a été mis à jour avec succès.
                </div>
              )}
              
              {updateError && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
                  {updateError}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <Input
                      id="last_name"
                      name="last_name"
                      type="text"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-medium mb-3">Changer de mot de passe</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-1">
                        Mot de passe actuel
                      </label>
                      <Input
                        id="current_password"
                        name="current_password"
                        type="password"
                        value={formData.current_password}
                        onChange={handleChange}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                          Nouveau mot de passe
                        </label>
                        <Input
                          id="new_password"
                          name="new_password"
                          type="password"
                          value={formData.new_password}
                          onChange={handleChange}
                          placeholder="••••••••"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          8 caractères minimum
                        </p>
                      </div>
                      
                      <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirmer le nouveau mot de passe
                        </label>
                        <Input
                          id="confirm_password"
                          name="confirm_password"
                          type="password"
                          value={formData.confirm_password}
                          onChange={handleChange}
                          placeholder="••••••••"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
