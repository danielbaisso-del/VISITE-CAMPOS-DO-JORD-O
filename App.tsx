import React from 'react';
import { useNavigation } from './hooks';
import { PageType } from './config';

// Layout Components
import { Navbar, Footer, VirtualGuide } from './components/layout';

// Page Components
import { HomePage, EventosPage } from './components/pages';
import Passeios from './components/Passeios';
import Roteiros from './components/Roteiros';
import Gastronomia from './components/Gastronomia';
import Hospedagens from './components/Hospedagens';
import QuemSomos from './components/QuemSomos';

/**
 * Page Router Component
 * Renders the appropriate page based on current navigation state
 */
const PageRouter: React.FC<{ page: PageType }> = ({ page }) => {
  switch (page) {
    case 'home':
      return <HomePage />;
    case 'passeios':
      return <Passeios />;
    case 'roteiros':
      return <Roteiros />;
    case 'ondecomer':
      return <Gastronomia />;
    case 'hospedagens':
      return <Hospedagens />;
    case 'quemsomos':
      return <QuemSomos />;
    case 'eventos':
      return <EventosPage />;
    default:
      return <HomePage />;
  }
};

/**
 * Main Application Component
 */
export default function App() {
  const { page, setPage } = useNavigation('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar current={page} onNavigate={setPage} />
      
      <PageRouter page={page} />
      
      {page !== 'roteiros' && <Footer />}
      
      <VirtualGuide />
    </div>
  );
}
