/**
 * Navigation configuration
 * Centralizes all navigation-related constants and types
 */

export type PageType = 
  | 'home' 
  | 'passeios' 
  | 'roteiros' 
  | 'ondecomer' 
  | 'eventos' 
  | 'hospedagens' 
  | 'quemsomos' 
  | 'associe';

export interface NavItem {
  id: PageType;
  label: string;
  showInMenu: boolean;
  hasUnderline?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'A cidade', showInMenu: true },
  { id: 'roteiros', label: 'Mapa e roteiros', showInMenu: true, hasUnderline: true },
  { id: 'passeios', label: 'Passeios', showInMenu: true, hasUnderline: true },
  { id: 'ondecomer', label: 'Onde comer', showInMenu: true },
  { id: 'eventos', label: 'Eventos', showInMenu: true },
  { id: 'hospedagens', label: 'Onde ficar', showInMenu: true },
  { id: 'quemsomos', label: 'CJRC&VB', showInMenu: true },
];

export const NAV_MAP: Record<string, PageType> = {
  explore: 'home',
  passeios: 'passeios',
  roteiros: 'roteiros',
  ondecomer: 'ondecomer',
  hospedagens: 'hospedagens',
  quemsomos: 'quemsomos',
  eventos: 'eventos',
  associe: 'associe',
};

export const FILTER_CATEGORIES = ['Todos', 'Cultura', 'Natureza', 'Lazer', 'Gastronomia'] as const;

export type FilterCategory = typeof FILTER_CATEGORIES[number];

export const EXTERNAL_LINKS = {
  associe: 'https://www.visitecamposdojordão.org.br/associados/associe-se/',
} as const;
