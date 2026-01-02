import { useState, useEffect, useCallback } from 'react';
import { Movie, FilterType, SortType, Genre } from '@/types/movie';
import mockMovies from '@/lib/mockMovies';

const STORAGE_KEY = 'movie-tracker-data';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [genre, setGenre] = useState<Genre | 'all'>('all');

  // Load movies from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Movie[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMovies(parsed);
        } else {
          // stored is an empty array or invalid shape — seed mock data
          setMovies(mockMovies);
        }
      } catch (e) {
        console.error('Failed to parse stored movies:', e);
        setMovies(mockMovies);
      }
    } else {
      // If no stored data, seed with mock movies for first-time use
      setMovies(mockMovies);
    }
  }, []);

  // Save movies to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  }, [movies]);

  const addMovie = useCallback((movieData: Omit<Movie, 'id' | 'createdAt'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setMovies(prev => [newMovie, ...prev]);
  }, []);

  const deleteMovie = useCallback((id: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
  }, []);

  const toggleWatched = useCallback((id: string) => {
    setMovies(prev =>
      prev.map(movie =>
        movie.id === id ? { ...movie, watched: !movie.watched } : movie
      )
    );
  }, []);

  const editMovie = useCallback((id: string, updates: Partial<Omit<Movie, 'id' | 'createdAt'>>) => {
    setMovies(prev =>
      prev.map(movie =>
        movie.id === id ? { ...movie, ...updates } : movie
      )
    );
  }, []);

  const filteredAndSortedMovies = movies
    .filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === 'all' ||
        (filter === 'watched' && movie.watched) ||
        (filter === 'unwatched' && !movie.watched) ||
        (filter === 'top-rated' && movie.rating >= 7);
      const matchesGenre = genre === 'all' || movie.genre === genre;
      return matchesSearch && matchesFilter && matchesGenre;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return b.createdAt - a.createdAt;
      }
    });

  const stats = {
    total: movies.length,
    watched: movies.filter(m => m.watched).length,
    unwatched: movies.filter(m => !m.watched).length,
  };

  const getWatchedMoviesByGenre = useCallback((genre: string) => {
    return movies.filter(movie => movie.watched && movie.genre === genre);
  }, [movies]);

  const watchedGenres = movies
    .filter(m => m.watched)
    .map(m => m.genre)
    .filter((genre, index, arr) => arr.indexOf(genre) === index);

  return {
    movies: filteredAndSortedMovies,
    allMovies: movies,
    stats,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    genre,
    setGenre,
    addMovie,
    deleteMovie,
    toggleWatched,
    editMovie,
    getWatchedMoviesByGenre,
    watchedGenres,
  };
}
