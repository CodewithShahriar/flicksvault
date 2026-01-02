import { Popcorn } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Watchlist } from '@/types/watchlist';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onToggleWatched: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Omit<Movie, 'id' | 'createdAt'>>) => void;
  watchlists?: Watchlist[];
  getMovieWatchlists?: (movieId: string) => string[];
  onToggleMovieInWatchlist?: (movieId: string, watchlistId: string) => void;
}

export function MovieGrid({ 
  movies, 
  onToggleWatched, 
  onDelete, 
  onEdit,
  watchlists = [],
  getMovieWatchlists,
  onToggleMovieInWatchlist,
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="rounded-lg bg-card border border-border/30 p-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <Popcorn className="w-16 h-16 text-muted-foreground/30" />
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2 tracking-wide">
              NO MOVIES YET
            </h3>
            <p className="text-muted-foreground text-sm">
              Start building your collection by adding your first movie
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          style={{ animationDelay: `${index * 30}ms` }}
          className="animate-fade-in"
        >
          <MovieCard
            movie={movie}
            onToggleWatched={onToggleWatched}
            onDelete={onDelete}
            onEdit={onEdit}
            watchlists={watchlists}
            movieWatchlists={getMovieWatchlists?.(movie.id) || []}
            onToggleMovieInWatchlist={
              onToggleMovieInWatchlist 
                ? (watchlistId) => onToggleMovieInWatchlist(movie.id, watchlistId) 
                : undefined
            }
          />
        </div>
      ))}
    </div>
  );
}
