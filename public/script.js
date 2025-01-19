const form = document.getElementById('movieForm');
const tableBody = document.querySelector('#movieTable tbody');
let editIndex = null;

function loadMovies() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.forEach((movie, index) => addMovieToTable(movie, index));
}

function addMovieToTable(movie, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${movie.picture}" alt="Movie Picture" class="movie-picture"></td>
        <td>${movie.date}</td>
        <td>${movie.name}</td>
        <td>${movie.genre}</td>
        <td>${movie.rating}</td>
        <td><button class="edit-btn" data-index="${index}">Edit</button></td>
    `;
    tableBody.appendChild(row);
}

function saveMovie(movie) {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    if (editIndex !== null) {
        movies[editIndex] = movie;
        editIndex = null;
    } else {
        movies.push(movie);
    }
    localStorage.setItem('movies', JSON.stringify(movies));
    reloadTable();
}

function reloadTable() {
    tableBody.innerHTML = '';
    loadMovies();
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const picture = document.getElementById('picture').files[0];
    const reader = new FileReader();
    reader.onload = function () {
        const movie = {
            date: document.getElementById('date').value,
            name: document.getElementById('movieName').value,
            genre: document.getElementById('genre').value,
            rating: document.getElementById('rating').value,
            picture: reader.result
        };
        saveMovie(movie);
        form.reset();
    };
    reader.readAsDataURL(picture);
});

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
        editIndex = index;
    }
});

loadMovies();



// script.js
document.getElementById("movieForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const movie = {
        date: document.getElementById("date").value,
        name: document.getElementById("movieName").value,
        genre: document.getElementById("genre").value,
        rating: document.getElementById("rating").value
    };

    const response = await fetch("/api/add-movie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    });

    const data = await response.json();
    alert(data.message);
});
