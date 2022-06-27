const elResult = document.querySelector(".movie__result-num");
const elMarkedResult = document.querySelector(".movie__result-number");
const elMovieList = document.querySelector(".moviesBody__list");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".form-select");
const elBookmarkList = document.querySelector(".bookmarkList");

const bookmark = [];


elResult.textContent = movies.length;

elSelect.innerHTML=null;



/////BOOKMARKED KINOLARNI DELETE QILISH

elBookmarkList.addEventListener("click", function (evt){
    if(evt.target.matches(".delete-bookmark")){
        elMarkedResult.textContent = bookmark.length - 1;
        const bookmarkBtnIdDelete = evt.target.dataset.deleteBookmarkBtnId;
        const foundBookmarkDeleteIndex = bookmark.findIndex(film=>film.id === bookmarkBtnIdDelete)

        bookmark.splice(foundBookmarkDeleteIndex, 1)

        elBookmarkList.innerHTML = null;

        renderBookmarks(bookmark, elBookmarkList);
    }

})


///////BOOKMARKED QISMIGA MARKED KINOLARNI CHIQARISH
const renderBookmarks = function (arr){
    arr.forEach((film) =>{

        ///ADD ELEMENT
        const bookmarkItem = document.createElement("li");
        const bookmarkItemImg = document.createElement("img");
        const bookmarkItemTitle = document.createElement("h5");
        const bookmarkItemBtn = document.createElement("button");

        /////SET ATTRIBUTE

        bookmarkItem.setAttribute("class","bg-danger text-warning card mb-2 border-0");
        bookmarkItem.style.width = "8rem";
        bookmarkItemImg.classList.add("cardImage");
        bookmarkItemImg.setAttribute("src", film.poster);
        bookmarkItemTitle.classList.add("movieTitle","text-light");
        bookmarkItemBtn.setAttribute("class", "delete-bookmark btn btn-danger text-warning border border-warning")

        ///TEXT CONTENT

        bookmarkItemTitle.textContent = film.title;
        bookmarkItemBtn.textContent = "Remove"
        bookmarkItemBtn.dataset.deleteBookmarkBtnId = film.id;

        ////APPEND CHILD
        elBookmarkList.appendChild(bookmarkItem);
        bookmarkItem.appendChild(bookmarkItemImg);
        bookmarkItem.appendChild(bookmarkItemTitle);
        bookmarkItem.appendChild(bookmarkItemBtn);

    })
}
renderBookmarks(bookmark, elBookmarkList);


////BOOKMARK BUTTON BOSILGANDA MARKED QISMIGA QO'SHISH

elMovieList.addEventListener("click", function (evt){
   if(evt.target.matches(".bookmark-btn")){
    elMarkedResult.textContent = bookmark.length + 1;
    const selectBookmarkId = evt.target.dataset.bookmarkBtnId;
    const foundBookmark = movies.find(film=> film.id === selectBookmarkId)

        if(!bookmark.includes(foundBookmark))
        bookmark.push(foundBookmark);

        elBookmarkList.innerHTML = null;

        renderBookmarks(bookmark, elBookmarkList);
   };

})


//////KINO GANIRLARNI CHIQARISH

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
////KINOLARNI CHIQARISH
const renderMovies = function (moviesArr){

    moviesArr.forEach(function(film){

        ///CREATE ELEMENT

        const newListItem = document.createElement("li");
        const newImage = document.createElement("img");
        const newDiv = document.createElement("div");
        const newTitle = document.createElement("h5");
        const newText = document.createElement("p");
        const bookmarkBtn = document.createElement("button");
        const newLink = document.createElement("a");

        ///SET ATTRIBUTE

        newListItem.setAttribute("class", "card mb-5 border-0");
        newListItem.style.width = "18rem";
        newImage.classList.add("cardImage");
        newImage.setAttribute("src", film.poster);
        newDiv.classList.add("card-body","p-3", "bg-danger", "text-warning");
        newTitle.classList.add("movieTitle","text-light");
        newText.classList.add("cardText");
        bookmarkBtn.setAttribute("class", "bookmark-btn btn btn-danger text-warning border border-warning");
        newLink.setAttribute("class","btn btn-danger text-warning border border-warning mx-2");

        newTitle.textContent = film.title;
        newText.textContent = film.overview;
        bookmarkBtn.textContent = "Bookmark";
        newLink.textContent = "Watch Trailer";


        ///DATA SET

        bookmarkBtn.dataset.bookmarkBtnId = film.id;
        ///SELECT GENRES
/*
        const genresList = document.createElement("ul");

        film.genres.forEach((genre) =>{
            const genresItem = document.createElement("li");

            genresItem.textContent = genre;

            genresList.appendChild(genresItem);
        })
*/
        ///APPEND

        elMovieList.appendChild(newListItem);
        newListItem.appendChild(newImage);
        newListItem.appendChild(newDiv);
        newDiv.appendChild(newTitle);
        newDiv.appendChild(newText);
        newDiv.appendChild(bookmarkBtn);
        newDiv.appendChild(newLink);
  //      newDiv.appendChild(genresList);


    })
}
renderGenres(movies, elMovieList);
renderMovies(movies);



////KINOLARNI SELECT ORQALI TANLAB CHIQARISH
elForm.addEventListener("submit", function (evt){
    evt.preventDefault();

    ///HTML dagi optionlarni o'chirish uchun
    elMovieList.innerHTML = null;

    const selectValue = elSelect.value;


    const selectedGenres = [];

    movies.forEach((film)=>{
        if(selectValue === "All" || film.genres.includes(selectValue)){
            selectedGenres.push(film)
        }

        elResult.textContent = selectedGenres.length;
    })

    renderMovies(selectedGenres, elMovieList);

})