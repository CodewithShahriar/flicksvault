import { Bookmark, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Watchlist } from '@/types/watchlist';

interface WatchlistDropdownProps {
  watchlists: Watchlist[];
  movieWatchlists: string[];
  onToggle: (watchlistId: string) => void;
}

export function WatchlistDropdown({ watchlists, movieWatchlists, onToggle }: WatchlistDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className={`p-2 rounded transition-colors ${
            movieWatchlists.length > 0
              ? 'bg-primary/20 text-primary hover:bg-primary/30'
              : 'bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/20'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${movieWatchlists.length > 0 ? 'fill-primary' : ''}`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-card border-border min-w-[160px]"
        onClick={(e) => e.stopPropagation()}
      >
        {watchlists.length === 0 ? (
          <DropdownMenuItem disabled className="text-muted-foreground text-sm">
            No watchlists yet
          </DropdownMenuItem>
        ) : (
          watchlists.map(watchlist => {
            const isInList = movieWatchlists.includes(watchlist.id);
            return (
              <DropdownMenuItem
                key={watchlist.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(watchlist.id);
                }}
                className="flex items-center justify-between cursor-pointer"
              >
                <span>{watchlist.name}</span>
                {isInList && <Check className="w-4 h-4 text-primary" />}
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
