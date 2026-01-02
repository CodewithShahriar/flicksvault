import { Header } from '@/components/Header';
import { StatsBar } from '@/components/StatsBar';
import { AddMovieForm } from '@/components/AddMovieForm';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { MovieGrid } from '@/components/MovieGrid';
import { GenreFilter } from '@/components/GenreFilter';
import { WatchlistManager } from '@/components/WatchlistManager';
import { WatchlistSection } from '@/components/WatchlistSection';
import { useMovies } from '@/hooks/useMovies';
import { useWatchlists } from '@/hooks/useWatchlists';

const Index = () => {
  const {
    movies,
    allMovies,
    stats,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    addMovie,
    deleteMovie,
    toggleWatched,
    editMovie,
    getWatchedMoviesByGenre,
    watchedGenres,
  } = useMovies();

  const {
    watchlists,
    addWatchlist,
    deleteWatchlist,
    getMovieWatchlists,
    getMoviesInWatchlist,
    toggleMovieInWatchlist,
  } = useWatchlists();

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container pt-24 pb-12 px-4 md:px-8 space-y-8">
        {/* Hero section */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-bold tracking-wider text-foreground">
              𝙼𝚈 𝙲𝙾𝙻𝙻𝙴𝙲𝚃𝙸𝙾𝙽https://img.freepik.com/free-photo/assortment-cinema-elements-red-background-with-copy-space_23-2148457848.jpg?semt=ais_hybrid&w=740&q=80
            </h2>
            <p className="text-muted-foreground">
              Track every movie you watch. Build your ultimate film library.
            </p>
          </div>
          
          <StatsBar total={stats.total} watched={stats.watched} unwatched={stats.unwatched} />
        </div>
        
        {/* Add movie form */}
        <AddMovieForm onAdd={addMovie} />

        {/* Watchlist Manager */}
        <WatchlistManager
          watchlists={watchlists}
          onAdd={addWatchlist}
          onDelete={deleteWatchlist}
        />
        
        {/* Search and filters */}
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        
        {/* Movie grid */}
        <MovieGrid
          movies={movies}
          onToggleWatched={toggleWatched}
          onDelete={deleteMovie}
          onEdit={editMovie}
          watchlists={watchlists}
          getMovieWatchlists={getMovieWatchlists}
          onToggleMovieInWatchlist={toggleMovieInWatchlist}
        />

        {/* Watchlist Section */}
        <WatchlistSection
          watchlists={watchlists}
          allMovies={allMovies}
          getMoviesInWatchlist={getMoviesInWatchlist}
          getMovieWatchlists={getMovieWatchlists}
          onToggleWatched={toggleWatched}
          onDelete={deleteMovie}
          onEdit={editMovie}
          onToggleMovieInWatchlist={toggleMovieInWatchlist}
        />

        {/* Genre filter section */}
        <GenreFilter
          watchedGenres={watchedGenres}
          getWatchedMoviesByGenre={getWatchedMoviesByGenre}
          onToggleWatched={toggleWatched}
          onDelete={deleteMovie}
          onEdit={editMovie}
        />
      </main>
    </div>
  );
};

export default Index;
