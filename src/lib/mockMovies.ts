import { Movie } from '@/types/movie';

// Pre-seeded mock movies (will be used when localStorage is empty)
export const mockMovies: Movie[] = [
  {
    id: 'mock-1',
    title: 'Troy',
    genre: 'War',
    rating: 7,
    watched: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7, // 7 days ago
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Troy_03500296.png',
  },
  {
    id: 'mock-2',
    title: 'The Covenant',
    genre: 'War',
    rating: 10,
    watched: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
    posterUrl:
      'https://m.media-amazon.com/images/M/MV5BMTA0MTgwYWUtMTA5Ni00NTA1LTk5ZmUtYzQxMDU4MTgwMmM1XkEyXkFqcGc@._V1_.jpg',
  },
];

export default mockMovies;
