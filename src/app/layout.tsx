import React from 'react';
import { AuthProvider } from '@/lib/auth-context';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <title>Voyageo - Voyages sur mesure avec des agences locales</title>
        <meta name="description" content="Créez votre voyage sur mesure avec des agences locales. Voyagez autrement avec Voyageo, pour un tourisme plus responsable et authentique." />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
