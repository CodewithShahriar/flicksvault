import { useState } from 'react';
import { ChevronDown, Film } from 'lucide-react';
import { Movie, GENRES } from '@/types/movie';
import { MovieCard } from './MovieCard';

interface GenreFilterProps {
  watchedGenres: string[];
  getWatchedMoviesByGenre: (genre: string) => Movie[];
  onToggleWatched: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Omit<Movie, 'id' | 'createdAt'>>) => void;
}

export function GenreFilter({
  watchedGenres,
  getWatchedMoviesByGenre,
  onToggleWatched,
  onDelete,
  onEdit,
}: GenreFilterProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const filteredMovies = selectedGenre ? getWatchedMoviesByGenre(selectedGenre) : [];

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl md:text-3xl font-bold tracking-wider text-foreground">
          BROWSE BY GENRE
        </h3>
        <p className="text-muted-foreground text-sm">
          Select a genre to see your watched movies
        </p>
      </div>

      {/* Genre buttons */}
      <div className="flex flex-wrap gap-2">
        {GENRES.map(genre => {
          const isActive = selectedGenre === genre;
          const hasMovies = watchedGenres.includes(genre);
          
          return (
            <button
              key={genre}
              onClick={() => setSelectedGenre(isActive ? null : genre)}
              disabled={!hasMovies}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-red-glow'
                  : hasMovies
                    ? 'bg-secondary text-foreground hover:bg-secondary/80 border border-border/50'
                    : 'bg-secondary/30 text-muted-foreground/50 cursor-not-allowed'
              }`}
            >
              {genre}
              {hasMovies && (
                <span className={`ml-2 ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  ({getWatchedMoviesByGenre(genre).length})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filtered movies display */}
      {selectedGenre && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2 text-lg">
            <Film className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">
              {selectedGenre} Movies You've Watched
            </span>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filteredMovies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onToggleWatched={onToggleWatched}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No watched {selectedGenre.toLowerCase()} movies yet.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
