const elResult = document.querySelector(".movie__result-num");
const elMovieList = document.querySelector(".moviesBody__list");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".form-select");

elResult.textContent = movies.length;

elSelect.innerHTML=null;

const renderGenres = function (filmsArr){

const uniqueGenres = [];

    filmsArr.map(film =>{
        film.genres.filter((genre)=>{
            if(!uniqueGenres.includes(genre)){
                uniqueGenres.push(genre)
            }
        })
    })

    const all = document.createElement("option")
    all.textContent = "All";

    elSelect.appendChild(all);

    uniqueGenres.forEach((genre) => {
        const uniqueGenresOption = document.createElement("option");
        elSelect.appendChild(uniqueGenresOption);

        uniqueGenresOption.textContent = genre;



    })


}

const renderMovies = function (moviesArr){

    moviesArr.forEach(function(film){

        ///CREATE ELEMENT

        const newListItem = document.createElement("li");
        const newImage = document.createElement("img");
        const newDiv = document.createElement("div");
        const newTitle = document.createElement("h5");
        const newText = document.createElement("p");
        const newBtn = document.createElement("button");
        const newLink = document.createElement("a");

        ///SET ATTRIBUTE

        newListItem.setAttribute("class", "card mb-5");
        newListItem.style.width = "20rem";
        newImage.classList.add("cardImage");
        newImage.setAttribute("src", film.poster);
        newDiv.classList.add("card-body","p-3", "bg-danger", "text-warning");
        newTitle.classList.add("movieTitle","text-light");
        newText.classList.add("cardText");
        newBtn.setAttribute("class", "btn btn-danger text-warning border border-warning");
        newLink.setAttribute("class","btn btn-danger text-warning border border-warning mx-2");

        newTitle.textContent = film.title;
        newText.textContent = film.overview;
        newBtn.textContent = "Bookmark";
        newLink.textContent = "Watch Trailer";

        ///SELECT GENRES

        const genresList = document.createElement("ul");

        film.genres.forEach((genre) =>{
            const genresItem = document.createElement("li");

            genresItem.textContent = genre;

            genresList.appendChild(genresItem);
        })

        ///APPEND

        elMovieList.appendChild(newListItem);
        newListItem.appendChild(newImage);
        newListItem.appendChild(newDiv);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newText);
        newDiv.appendChild(newBtn);
        newDiv.appendChild(newLink);
        newDiv.appendChild(genresList);


    })
}
renderGenres(movies, elMovieList);
renderMovies(movies);


elForm.addEventListener("submit", function (evt){
    evt.preventDefault();

    elMovieList.innerHTML = null;

    const selectValue = elSelect.value;
    console.log(selectValue);


    const selectedGenres = [];

    movies.forEach((film)=>{
        if(selectValue === "All" || film.genres.includes(selectValue)){
            selectedGenres.push(film)
        }
    })

    renderMovies(selectedGenres, elMovieList);

})