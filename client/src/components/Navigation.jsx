import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { NavigationPublic } from './NavigationPublic';
import { NavigationLogged } from './NavigationLogged';
import { EmptyNavigation } from './EmptyNavigation';

export function Navigation() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return <EmptyNavigation />;
  }

  return isAuthenticated ? <NavigationLogged /> : <NavigationPublic />;
}
