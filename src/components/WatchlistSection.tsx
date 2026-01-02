import { useState } from 'react';
import { ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Watchlist } from '@/types/watchlist';
import { MovieCard } from './MovieCard';

interface WatchlistSectionProps {
  watchlists: Watchlist[];
  allMovies: Movie[];
  getMoviesInWatchlist: (watchlistId: string) => string[];
  getMovieWatchlists: (movieId: string) => string[];
  onToggleWatched: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Omit<Movie, 'id' | 'createdAt'>>) => void;
  onToggleMovieInWatchlist: (movieId: string, watchlistId: string) => void;
}

export function WatchlistSection({
  watchlists,
  allMovies,
  getMoviesInWatchlist,
  getMovieWatchlists,
  onToggleWatched,
  onDelete,
  onEdit,
  onToggleMovieInWatchlist,
}: WatchlistSectionProps) {
  const [selectedWatchlist, setSelectedWatchlist] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const movieIds = selectedWatchlist ? getMoviesInWatchlist(selectedWatchlist) : [];
  const movies = allMovies.filter(m => movieIds.includes(m.id));

  return (
    <section className="space-y-6">
      <div
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <Bookmark className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-wider text-foreground">MY WATCHLISTS</h2>
        </div>
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Watchlist tabs */}
          <div className="flex flex-wrap gap-2">
            {watchlists.map(watchlist => {
              const count = getMoviesInWatchlist(watchlist.id).length;
              const isSelected = selectedWatchlist === watchlist.id;
              return (
                <button
                  key={watchlist.id}
                  onClick={() => setSelectedWatchlist(isSelected ? null : watchlist.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80 border border-border/30'
                  }`}
                >
                  {watchlist.name}
                  <span className={`ml-2 ${isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Movies in selected watchlist */}
          {selectedWatchlist && (
            <div className="space-y-4">
              {movies.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border/50 rounded-xl">
                  <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">No movies in this watchlist yet.</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Add movies using the bookmark icon on movie cards.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {movies.map(movie => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      onToggleWatched={onToggleWatched}
                      onDelete={onDelete}
                      onEdit={onEdit}
                      watchlists={watchlists}
                      movieWatchlists={getMovieWatchlists(movie.id)}
                      onToggleMovieInWatchlist={(watchlistId) => onToggleMovieInWatchlist(movie.id, watchlistId)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {!selectedWatchlist && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Select a watchlist above to see its movies.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
