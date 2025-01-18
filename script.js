const form = document.getElementById('movieForm');
const tableBody = document.querySelector('#movieTable tbody');
let editIndex = null; // Tracks the index of the movie being edited

// Load movies from localStorage on page load
function loadMovies() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.forEach((movie, index) => addMovieToTable(movie, index));
}

// Add a movie to the table
function addMovieToTable(movie, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${movie.date}</td>
        <td>${movie.name}</td>
        <td>${movie.genre}</td>
        <td>${movie.rating}</td>
        <td>
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
    `;
    tableBody.appendChild(row);
}

// Save a new or edited movie to localStorage
function saveMovie(movie) {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    if (editIndex !== null) {
        movies[editIndex] = movie; // Update existing movie
        editIndex = null; // Reset edit mode
    } else {
        movies.push(movie); // Add new movie
    }
    localStorage.setItem('movies', JSON.stringify(movies));
    reloadTable();
}

// Reload the table with updated data
function reloadTable() {
    tableBody.innerHTML = ''; // Clear the table
    loadMovies(); // Reload from localStorage
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

    saveMovie(movie);
    form.reset();
});

// Handle table actions (Edit and Delete)
tableBody.addEventListener('click', (event) => {
    const target = event.target;
    const index = target.getAttribute('data-index');
    const movies = JSON.parse(localStorage.getItem('movies')) || [];

    if (target.classList.contains('edit-btn')) {
        const movie = movies[index];
        document.getElementById('date').value = movie.date;
        document.getElementById('movieName').value = movie.name;
        document.getElementById('genre').value = movie.genre;
        document.getElementById('rating').value = movie.rating;
        editIndex = index; // Set edit mode
    }

    if (target.classList.contains('delete-btn')) {
        movies.splice(index, 1); // Remove movie from array
        localStorage.setItem('movies', JSON.stringify(movies));
        reloadTable();
    }
});

// Initialize the table on page load
loadMovies();
