export interface Watchlist {
  id: string;
  name: string;
  createdAt: number;
}

export const DEFAULT_WATCHLISTS: Watchlist[] = [
  { id: 'favorites', name: 'Favorites', createdAt: 0 },
  { id: 'must-watch', name: 'Must Watch', createdAt: 0 },
  { id: 'classics', name: 'Classics', createdAt: 0 },
];
