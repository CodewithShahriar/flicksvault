import { Film, Eye, EyeOff } from 'lucide-react';

interface StatsBarProps {
  total: number;
  watched: number;
  unwatched: number;
}

export function StatsBar({ total, watched, unwatched }: StatsBarProps) {
  return (
    <div className="flex flex-wrap gap-6 justify-center md:justify-start">
      <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-secondary/50 border border-border/30">
        <Film className="w-5 h-5 text-primary" />
        <div>
          <p className="text-2xl font-bold text-foreground">{total}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Movies</p>
        </div>
      </div>
      <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-secondary/50 border border-border/30">
        <Eye className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-2xl font-bold text-foreground">{watched}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Watched</p>
        </div>
      </div>
      <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-secondary/50 border border-border/30">
        <EyeOff className="w-5 h-5 text-amber-500" />
        <div>
          <p className="text-2xl font-bold text-foreground">{unwatched}</p>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Watchlist</p>
        </div>
      </div>
    </div>
  );
}
