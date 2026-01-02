import { useState, useEffect, useCallback } from 'react';
import { Watchlist, DEFAULT_WATCHLISTS } from '@/types/watchlist';

const WATCHLISTS_KEY = 'movie-tracker-watchlists';
const MOVIE_WATCHLISTS_KEY = 'movie-tracker-movie-watchlists';

export function useWatchlists() {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [movieWatchlists, setMovieWatchlists] = useState<Record<string, string[]>>({});

  // Load watchlists from localStorage on mount
  useEffect(() => {
    const storedWatchlists = localStorage.getItem(WATCHLISTS_KEY);
    if (storedWatchlists) {
      try {
        setWatchlists(JSON.parse(storedWatchlists));
      } catch (e) {
        console.error('Failed to parse stored watchlists:', e);
        setWatchlists(DEFAULT_WATCHLISTS);
      }
    } else {
      setWatchlists(DEFAULT_WATCHLISTS);
    }

    const storedMovieWatchlists = localStorage.getItem(MOVIE_WATCHLISTS_KEY);
    if (storedMovieWatchlists) {
      try {
        setMovieWatchlists(JSON.parse(storedMovieWatchlists));
      } catch (e) {
        console.error('Failed to parse movie watchlists:', e);
      }
    }
  }, []);

  // Save to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(WATCHLISTS_KEY, JSON.stringify(watchlists));
  }, [watchlists]);

  useEffect(() => {
    localStorage.setItem(MOVIE_WATCHLISTS_KEY, JSON.stringify(movieWatchlists));
  }, [movieWatchlists]);

  const addWatchlist = useCallback((name: string) => {
    const newWatchlist: Watchlist = {
      id: crypto.randomUUID(),
      name: name.trim(),
      createdAt: Date.now(),
    };
    setWatchlists(prev => [...prev, newWatchlist]);
    return newWatchlist;
  }, []);

  const deleteWatchlist = useCallback((id: string) => {
    setWatchlists(prev => prev.filter(w => w.id !== id));
    // Also remove all movie associations with this watchlist
    setMovieWatchlists(prev => {
      const updated: Record<string, string[]> = {};
      for (const [movieId, lists] of Object.entries(prev)) {
        const filtered = lists.filter(listId => listId !== id);
        if (filtered.length > 0) {
          updated[movieId] = filtered;
        }
      }
      return updated;
    });
  }, []);

  const addMovieToWatchlist = useCallback((movieId: string, watchlistId: string) => {
    setMovieWatchlists(prev => {
      const current = prev[movieId] || [];
      if (current.includes(watchlistId)) return prev;
      return { ...prev, [movieId]: [...current, watchlistId] };
    });
  }, []);

  const removeMovieFromWatchlist = useCallback((movieId: string, watchlistId: string) => {
    setMovieWatchlists(prev => {
      const current = prev[movieId] || [];
      const filtered = current.filter(id => id !== watchlistId);
      if (filtered.length === 0) {
        const { [movieId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [movieId]: filtered };
    });
  }, []);

  const getMovieWatchlists = useCallback((movieId: string): string[] => {
    return movieWatchlists[movieId] || [];
  }, [movieWatchlists]);

  const getMoviesInWatchlist = useCallback((watchlistId: string): string[] => {
    return Object.entries(movieWatchlists)
      .filter(([_, lists]) => lists.includes(watchlistId))
      .map(([movieId]) => movieId);
  }, [movieWatchlists]);

  const toggleMovieInWatchlist = useCallback((movieId: string, watchlistId: string) => {
    const current = movieWatchlists[movieId] || [];
    if (current.includes(watchlistId)) {
      removeMovieFromWatchlist(movieId, watchlistId);
    } else {
      addMovieToWatchlist(movieId, watchlistId);
    }
  }, [movieWatchlists, addMovieToWatchlist, removeMovieFromWatchlist]);

  return {
    watchlists,
    addWatchlist,
    deleteWatchlist,
    addMovieToWatchlist,
    removeMovieFromWatchlist,
    getMovieWatchlists,
    getMoviesInWatchlist,
    toggleMovieInWatchlist,
  };
}
