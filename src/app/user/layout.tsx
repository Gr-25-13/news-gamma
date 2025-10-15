// user/layout.tsx är layouten för skyddade användarsidor. Hanterar auth-skydd och gemensam navigation.
// Viktigt: Om auth-skydd eller navigation ändras, måste denna layout och relaterade sidor uppdateras.

import React from 'react';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Here you can add a user-specific navbar or sidebar */}
      {children}
    </div>
  );
}