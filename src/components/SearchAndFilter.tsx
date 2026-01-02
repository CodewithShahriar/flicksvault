import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterType, SortType, GENRES } from '@/types/movie';
import { useMovies } from '@/hooks/useMovies';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
  sortBy: SortType;
  onSortChange: (value: SortType) => void;
  genre: string | 'all';
  onGenreChange: (value: string | 'all') => void;
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
}: SearchAndFilterProps) {
  const {
    movies,
    allMovies,
    stats,
    searchQuery: query,
    setSearchQuery,
    filter: movieFilter,
    setFilter,
    sortBy: movieSortBy,
    setSortBy,
    genre,
    setGenre,
  } = useMovies();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search titles..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-10 bg-secondary border-border/50 focus:border-primary h-10"
        />
      </div>
      <div className="flex gap-2">
        <Select value={filter} onValueChange={(v: FilterType) => onFilterChange(v)}>
          <SelectTrigger className="w-[130px] bg-secondary border-border/50 h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="watched">Watched</SelectItem>
            <SelectItem value="unwatched">Watchlist</SelectItem>
            <SelectItem value="top-rated">Rating 7+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v: SortType) => onSortChange(v)}>
          <SelectTrigger className="w-[120px] bg-secondary border-border/50 h-10">
            <SlidersHorizontal className="w-4 h-4 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Newest</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="title">A-Z</SelectItem>
          </SelectContent>
        </Select>

        <Select value={genre} onValueChange={(v: string) => onGenreChange(v)}>
          <SelectTrigger className="w-[140px] bg-secondary border-border/50 h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All genres</SelectItem>
            {GENRES.map(g => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
