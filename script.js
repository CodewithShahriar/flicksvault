const form = document.getElementById('movieForm');
const tableBody = document.querySelector('#movieTable tbody');

// Load movies from localStorage on page load
function loadMovies() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.forEach(addMovieToTable);
}

// Add a movie to the table
function addMovieToTable(movie) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${movie.date}</td>
        <td>${movie.name}</td>
        <td>${movie.genre}</td>
        <td>${movie.rating}</td>
    `;
    tableBody.appendChild(row);
}

// Save a new movie to localStorage
function saveMovie(movie) {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
}

// Form submit handler
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const movie = {
        date: document.getElementById('date').value,
        name: document.getElementById('movieName').value,
        genre: document.getElementById('genre').value,
        rating: document.getElementById('rating').value,
    };

    addMovieToTable(movie);
    saveMovie(movie);
    form.reset();
});

// Initialize the table on page load
loadMovies();
