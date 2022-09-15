let watchListArray = []
let movies = []
let moviesArray = []
let watchListId = []
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('search-btn')
const defaultContent = document.getElementById("default-content")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("watchListArray"))

function showMovies(){
    let html=""
    for(let movie of moviesArray){    
    html += `
           <div id="movieContainer">
               <img id="poster" src="${movie.Poster}"/>
           <div>
            <div id="line1">
               <h3 id="movieTitle">${movie.Title}</h3>
               <img id="star" src="./star.png" />
               <p>${movie.Ratings[0]==undefined ? " " : movie.Ratings[0].Value}</p>
            </div>
            <div id="line2">
            <p id="duration">${movie.Runtime}</p>
            <p id="genre">${movie.Genre}</p>
            <button class = "imgbtn" id="${movie.imdbID}" onclick="addToWatch(event)">+</button>
            <button class = "addtowatch"
              id="${movie.imdbID}" onclick="addToWatch(event)">Watchlist</button>
            </div>
            <p id="plot">${movie.Plot}</p>
           </div>
        </div>
        <hr />
        `
     }
     document.getElementById('main-content').innerHTML = html
}

function renderMovies(){
    moviesArray=[]
    defaultContent.style.display="none"
    for (let movie of movies){
        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=e668e570`)  
           .then(response => response.json())
           .then(data => {
               moviesArray.push(data)  
               showMovies()
           })
    }
}

if(searchBtn){
    searchBtn.addEventListener("click",searchMovies)
}

function searchMovies(event){
    event.preventDefault()
    fetch(`https://www.omdbapi.com/?s=${searchInput.value.trim()}&apikey=e668e570`)  
     .then(response => response.json())
     .then(data => {
         if(data.Search==undefined){
             defaultContent.style.display="inline"
         }
         else{
         movies= data.Search.slice(0,5)
         renderMovies()
         }
     })
}

if(leadsFromLocalStorage){
    watchListArray = leadsFromLocalStorage
}

function addToWatch(event){
   for(let movie of moviesArray){
       if(movie.imdbID == event.target.id && watchListId.includes(movie.imdbID)==false){
           watchListArray.unshift(movie)
           watchListId.unshift(movie.imdbID)
       }
       else{
           continue
       }
   }  
   localStorage.setItem("watchListArray",JSON.stringify(watchListArray))
}

     
     