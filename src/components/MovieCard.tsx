import { useState } from 'react';
import { Star, Play, Check, Trash2, Film, Pencil } from 'lucide-react';
import { Movie } from '@/types/movie';
import { Watchlist } from '@/types/watchlist';
import { EditMovieDialog } from './EditMovieDialog';
import { WatchlistDropdown } from './WatchlistDropdown';

interface MovieCardProps {
  movie: Movie;
  onToggleWatched: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Omit<Movie, 'id' | 'createdAt'>>) => void;
  watchlists?: Watchlist[];
  movieWatchlists?: string[];
  onToggleMovieInWatchlist?: (watchlistId: string) => void;
}

export function MovieCard({ 
  movie, 
  onToggleWatched, 
  onDelete, 
  onEdit,
  watchlists = [],
  movieWatchlists = [],
  onToggleMovieInWatchlist,
}: MovieCardProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <div className="group netflix-card">
        {/* Poster */}
        <div className="aspect-[2/3] relative overflow-hidden">
          {movie.posterUrl ? (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full poster-placeholder flex items-center justify-center">
              <Film className="w-12 h-12 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating badge */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-background/90 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            <span className="text-sm font-bold text-foreground">{movie.rating}</span>
          </div>

          {/* Watched badge */}
          {movie.watched && (
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/90 backdrop-blur-sm">
              <Check className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white">WATCHED</span>
            </div>
          )}

          {/* Hover overlay with actions */}
          <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-background via-background/60 to-transparent">
            <h3 className="font-bold text-lg text-foreground leading-tight mb-1 line-clamp-2">
              {movie.title}
            </h3>
            <span className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
              {movie.genre}
            </span>
            
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWatched(movie.id);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm font-medium transition-colors ${
                  movie.watched
                    ? 'bg-secondary text-foreground hover:bg-secondary/80'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {movie.watched ? (
                  <>
                    <Play className="w-4 h-4" />
                    Rewatch
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Watched
                  </>
                )}
              </button>
              {onToggleMovieInWatchlist && watchlists.length > 0 && (
                <WatchlistDropdown
                  watchlists={watchlists}
                  movieWatchlists={movieWatchlists}
                  onToggle={onToggleMovieInWatchlist}
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditOpen(true);
                }}
                className="p-2 rounded bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/20 transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(movie.id);
                }}
                className="p-2 rounded bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Title below card (visible when not hovering) */}
        <div className="p-2 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="font-medium text-sm text-foreground truncate">{movie.title}</h3>
          <p className="text-xs text-muted-foreground">{movie.genre}</p>
        </div>
      </div>

      <EditMovieDialog
        movie={movie}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={onEdit}
      />
    </>
  );
}
