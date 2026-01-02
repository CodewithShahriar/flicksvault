export interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: number;
  watched: boolean;
  createdAt: number;
  posterUrl?: string;
}

export type FilterType = 'all' | 'watched' | 'unwatched' | 'top-rated';
export type SortType = 'date' | 'rating' | 'title';

export const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Fantasy',
  'Horror',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Western',
] as const;

export type Genre = typeof GENRES[number];
