//================================search===============================
const searchInput = document.querySelector(".search_box input");

const searchButton = document.querySelector(".search_button");

let currentCategory = "movie";
let currentAPI = "movie";
let loadingCount=0;

const categoryButtons = document.querySelectorAll(".category");

const nowPlayingTitle =
document.getElementById("nowPlayingTitle");

const upcomingTitle =
document.getElementById("upcomingTitle");


const searchSection =
document.querySelector(".search-section");

const searchResultsContainer =
document.querySelector(".search-results-container");

const recommendedContainer =
document.querySelector(".recommended-container");
const backButton = document.getElementById("backButton");


const heroTitle =
document.querySelector(".hero-title");

const heroSubtitle =
document.querySelector(".hero-subtitle");

const searchBox =
document.getElementById("searchBox");


const noResults =
document.getElementById("noResults");

const suggestionList =
document.getElementById("suggestionList");

const detailsOverlay =
document.getElementById("detailsOverlay");

const popupTitle = document.getElementById("popup-title");

const popupInfo = document.getElementById("popup-info");

const popupGenre = document.getElementById("popup-genre");

const popupCast = document.getElementById("popup-cast");

const popupOverview = document.getElementById("popup-overview");

const popupPoster = document.getElementById("popup-poster");

const continueReading =
document.getElementById("continueReading");

const detailsHero =
document.getElementById("detailsHero");

const detailsPoster =
document.getElementById("detailsPoster");


const detailsTitle =
document.getElementById("detailsTitle");

const detailsInfo =
document.getElementById("detailsInfo");


const detailsGenres =
document.getElementById("detailsGenres");

const detailsLanguage =
document.getElementById("detailsLanguage");

const detailsRelease =
document.getElementById("detailsRelease");

const detailsStatus =
document.getElementById("detailsStatus");


const detailsOverview =
document.getElementById("detailsOverview");

const detailsCast =
document.getElementById("detailsCast");

const castCards =
document.getElementById("castCards");

const showAllCast =
document.getElementById("showAllCast");

const trailerContainer =
document.getElementById("trailerContainer");

const detailsTagline =
document.getElementById("detailsTagline");

const detailsBudget =
document.getElementById("detailsBudget");


const detailsRevenue =
document.getElementById("detailsRevenue");

const detailsCompanies =
document.getElementById("detailsCompanies");

const detailsCountries =
document.getElementById("detailsCountries");

const detailsBackButton =
document.getElementById("detailsBackButton");

const seasonContainer =
document.getElementById("seasonContainer");

const episodePopup =
document.getElementById("episodePopup");

const episodeStill =
document.getElementById("episodeStill");

const episodeTitle =
document.getElementById("episodeTitle");

const episodeInfo =
document.getElementById("episodeInfo");

const episodeOverview =
document.getElementById("episodeOverview");

const episodePlaceholder =
document.getElementById("episodePlaceholder");

const closeEpisodePopup =
document.getElementById("closeEpisodePopup");

const detailsSeasons =
document.getElementById("detailsSeasons");

const seasonDivider =
document.getElementById("seasonDivider");

const loadingBar =
document.getElementById("loadingBar");

const popupLoader =
document.getElementById("popupLoader");

const circle =
document.getElementById("loader-circle");
const globalLoader =
document.getElementById("globalLoader");

const homeLogo = document.getElementById("homeLogo");

const preloader =
document.getElementById("preloader");


const detailsCastHeading =
document.getElementById("detailsCastHeading");

const detailsCharacters =
document.getElementById("detailsCharacters");

const characterScroll =
document.getElementById("characterScroll");

const metaHeadings =
document.querySelectorAll(".meta strong");

const genresBtn =
document.getElementById("genresBtn");

const genrePage =
document.querySelector(".genre-section-page");

const genreGrid =
document.querySelector(".genre-grid");

const genreBackButton =
document.getElementById("genreBackButton");

const yearModal = document.getElementById("yearModal");

const yearInput =
document.getElementById("yearInput");

const applyYear = document.getElementById("applyYear");

const applyFilters =
document.getElementById("applyFilters");

const genreOverlay =
document.getElementById("genreOverlay");

const yearError=document.getElementById("yearError");

const selectedFilters =
document.querySelector(".selected-filters");

const languageModal =
document.getElementById("languageModal");

const languageOverlay =
document.getElementById("languageOverlay");

const languageList =
document.getElementById("languageList");

const closeLanguageModal =
document.getElementById("closeLanguageModal");

const ratingModal=
document.getElementById("ratingModal");

const ratingOverlay=
document.getElementById("ratingOverlay");

const ratingList=
document.getElementById("ratingList");

const closeRatingModal=
document.getElementById("closeRatingModal");


const platformModal=
document.getElementById("platformModal");

const platformOverlay=
document.getElementById("platformOverlay");

const platformList=
document.getElementById("platformList");

const closePlatformModal=
document.getElementById("closePlatformModal");

const aiOverviewBtn = document.getElementById("aiOverviewBtn");
const aiOverviewBox = document.getElementById("aiOverviewBox");

aiOverviewBtn.addEventListener("click", generateAIOverview);

const searchAutocomplete =
document.getElementById("searchAutocomplete");


const exploreBtn = document.getElementById("exploreBtn");

const exploreOverlay = document.getElementById("exploreOverlay");

const exploreModal = document.getElementById("exploreModal");

const closeExplore = document.getElementById("closeExplore");

const exploreInput = document.getElementById("exploreInput");

const exploreSearch = document.getElementById("exploreSearch");

const exploreResults = document.getElementById("exploreResults");

const watchlistBtn =
document.getElementById("watchlistBtn");

const aboutBtn =
document.getElementById("aboutBtn");

const watchlistOverlay =
document.getElementById("watchlistOverlay");

const watchlistModal =
document.getElementById("watchlistModal");

const closeWatchlist =
document.getElementById("closeWatchlist");

const aboutOverlay =
document.getElementById("aboutOverlay");

const aboutModal =
document.getElementById("aboutModal");

const closeAbout =
document.getElementById("closeAbout");

const watchlistDetailsBtn =
document.getElementById("watchlistDetailsBtn");

const watchlistContainer =
document.getElementById("watchlistContainer");

let watchlist =
JSON.parse(localStorage.getItem("watchlist")) || [];


let currentDetails = null;

let correctingSearch = false;

let searchDebounce;

let selectedYear="";

let yearButton;

let movieGenres=[];

let tvGenres=[];

let animeGenres=[];

let showAllGenres = false;

let selectedGenres = [];

let languages=[];

let selectedLanguage="";

let languageButton;

let selectedRating="";
let ratingButton;

let selectedPlatform="";
let platformButton;

let firstSuggestion = "";



function saveWatchlist(){

    localStorage.setItem(

        "watchlist",

        JSON.stringify(watchlist)

    );

}


watchlistDetailsBtn.addEventListener("click",function(){

    if(isInWatchlist()){

        watchlist=watchlist.filter(function(item){

            return !(

                item.id==currentView.movieId

                &&

                item.category==currentCategory

            );

        });

    }

    else{

        watchlist.push({

    id:currentView.movieId,

    title:

    currentDetails.title?.english

    ||

    currentDetails.title?.romaji

    ||

    currentDetails.title

    ||

    currentDetails.name,

    poster:

    currentDetails.poster_path

    ?

    "https://image.tmdb.org/t/p/w185"

    +

    currentDetails.poster_path

    :

    currentDetails.coverImage?.extraLarge

    ||

    "",

    year:

    currentDetails.release_date

    ?

    currentDetails.release_date.substring(0,4)

    :

    currentDetails.first_air_date

    ?

    currentDetails.first_air_date.substring(0,4)

    :

    currentDetails.seasonYear

    ||

    "Unknown",

    rating:

    currentDetails.vote_average

    ?

    currentDetails.vote_average.toFixed(1)

    :

    currentDetails.averageScore

    ?

    (currentDetails.averageScore/10).toFixed(1)

    :

    "N/A",

    category:currentCategory

});

    }

    saveWatchlist();

    renderWatchlist();

    updateWatchlistButton();

});





function renderWatchlist(){

    watchlistContainer.innerHTML="";

    if(watchlist.length==0){

        watchlistContainer.innerHTML=`

        <h2 style="text-align:center;opacity:.7">

            Your watchlist is empty.

        </h2>

        `;

        return;

    }

    watchlist.forEach(function(item,index){

        const row=document.createElement("div");

        row.className="watchlist-item";

        row.innerHTML=`

<div class="watchlist-left">

    <img

        class="watchlist-poster"

        src="${item.poster}"

    >

    <span class="watchlist-title">

        <div class="watchlist-info">

    <div class="watchlist-name">

        ${item.title}

    </div>

    <div>

        ${item.year}

        &nbsp; | &nbsp;

        ⭐ ${item.rating}

    </div>

</div>

    </span>

</div>

<span class="watchlist-remove">

    ✖

</span>

`;

        row.addEventListener("click",function(){

    if(item.category=="movie"){

        currentCategory="movie";
        currentAPI="movie";

        startPopupLoading();

        showMovie(item.id);

    }

    else if(item.category=="tv"){

        currentCategory="tv";
        currentAPI="tv";

        startPopupLoading();

        showMovie(item.id);

    }

    else{

        currentCategory="anime";

        startPopupLoading();

        showAnime(item.id);

    }

});

        row.querySelector(".watchlist-remove")

        .addEventListener("click",function(e){

            e.stopPropagation();

            watchlist.splice(index,1);

            saveWatchlist();

if(watchlistModal.style.display=="block"){

    renderWatchlist();

}

updateWatchlistButton();

        });

        watchlistContainer.appendChild(row);

    });

}


function isInWatchlist(){

    return watchlist.some(function(item){

        return (

            item.id == currentView.movieId

            &&

            item.category == currentCategory

        );

    });

}


function updateWatchlistButton(){

    if(isInWatchlist()){

        watchlistDetailsBtn.textContent=
        "🗑 Remove from Watchlist";

    }

    else{

        watchlistDetailsBtn.textContent=
        "❤️ Add to Watchlist";

    }

}


exploreBtn.addEventListener("click",function(e){

    e.preventDefault();

    exploreOverlay.style.display="block";

    document.body.style.overflow = "hidden";

    exploreModal.style.display="block";

});

exploreInput.addEventListener("keydown",function(e){

    if(e.key=="Enter" && !e.shiftKey){

        e.preventDefault();

        exploreSearch.click();

    }

});

exploreInput.addEventListener("input",function(){

    if(this.value.length>0){

        this.value=

        this.value.charAt(0).toUpperCase()

        +

        this.value.slice(1);

    }

});
exploreSearch.addEventListener("click", async function () {

    const prompt = exploreInput.value.trim();

    if(prompt==""){

        return;

    }

    exploreResults.innerHTML="Thinking...";

    const response = await fetch("https://moviefinder-j67d.onrender.com/explore",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            prompt:prompt,

            type:currentCategory

        })

    });

    const data=await response.json();

    if(!data.results || data.results.length==0){

    console.log(data);

    exploreResults.innerHTML = `
        <div class="exploreError">
            Sorry, we could not generate recommendations for "<b>${prompt}</b>".
            Please try again.
        </div>
    `;

    return;
}

    showExploreResults(data.results);

});

function showExploreResults(results){

    exploreResults.innerHTML="";

    let titles;

    try{

        titles=JSON.parse(results);

    }

    catch{

        exploreResults.innerHTML="Something went wrong.";

        return;

    }

    titles.forEach(function(title){

        const div=document.createElement("div");

        div.className="explore-item";

        div.textContent=title;
        div.addEventListener("click",function(){

    exploreMovie(title);

});

        exploreResults.appendChild(div);

    });

}







async function exploreMovie(title){

    if(currentCategory=="anime"){

        const query=`

        query($search:String){

        Media(

            type:ANIME,

            search:$search

        ){

            id

        }

        }

        `;

        fetch("https://graphql.anilist.co",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                query,

                variables:{

                    search:title

                }

            })

        })

        .then(function(response){

            return response.json();

        })

        .then(function(data){



            startPopupLoading();

            showAnime(data.data.Media.id);

        });

    }

    else{

        const API_KEY="f1f19a032c563adfb9d5bd034ace57e4";

        fetch(

`https://api.themoviedb.org/3/search/${currentCategory}?api_key=${API_KEY}&query=${encodeURIComponent(title)}`

        )

        .then(function(response){

            return response.json();

        })

        .then(function(data){

            if(data.results.length==0){

                return;

            }



            startPopupLoading();

            currentAPI=currentCategory;

            showMovie(data.results[0].id);

        });

    }

}

function closeExplorePopup(){

    exploreOverlay.style.display="none";

    document.body.style.overflow = "auto";

    exploreModal.style.display="none";

    exploreInput.value="";

exploreResults.innerHTML="";

}

closeExplore.addEventListener("click",closeExplorePopup);

exploreOverlay.addEventListener("click",closeExplorePopup);

searchInput.addEventListener("input", function () {

    clearTimeout(searchDebounce);

    searchDebounce = setTimeout(autoCompleteSearch, 300);

});

function autoCompleteSearch(){

    const query = searchInput.value.trim();

    console.log("autocomplete running");

    if(query.length < 3){


        firstSuggestion = "";
        suggestionList.innerHTML = "";
        suggestionList.style.display = "none";
        return;

    }

    if(currentCategory=="anime"){

        loadAnimeSuggestions(query);
        return;

    }

    loadTMDBSuggestions(query);

}


function loadTMDBSuggestions(query){

    const API_KEY="f1f19a032c563adfb9d5bd034ace57e4";

    const type =
    currentCategory=="movie"
    ?
    "movie"
    :
    "tv";

    fetch(
`https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    )

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        suggestionList.innerHTML="";

        const results=data.results.slice(0,5);

        firstSuggestion = "";

if(results.length>0){

    firstSuggestion = results[0].title || results[0].name;
    console.log(firstSuggestion);

}

        if(results.length==0){

            suggestionList.style.display="none";

            firstSuggestion = "";

            return;

        }

        results.forEach(function(item){

            const p=document.createElement("p");

            p.textContent=item.title||item.name;

            p.onclick=function(){

                searchInput.value=p.textContent;

                suggestionList.style.display="none";



                searchMovies();

            };

            suggestionList.appendChild(p);

        });

        suggestionList.style.display="block";

    });

}

function loadAnimeSuggestions(search){

const query=`

query($search:String){

Page(perPage:5){

media(

type:ANIME,

search:$search,

sort:SEARCH_MATCH

){

title{

english
romaji

}

}

}

}

`;

fetch("https://graphql.anilist.co",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

query,

variables:{

search

}

})

})

.then(function(response){

return response.json();

})

.then(function(data){

suggestionList.innerHTML="";

const results=data.data.Page.media;

firstSuggestion = "";

if(results.length>0){

    firstSuggestion =
        results[0].title.english
        ||
        results[0].title.romaji;

}

if(results.length==0){

suggestionList.style.display="none";

firstSuggestion = "";

return;

}

results.forEach(function(show){

const p=document.createElement("p");

p.textContent=

show.title.english

||

show.title.romaji;

p.onclick=function(){

searchInput.value=this.textContent;



searchMovies();

};

suggestionList.appendChild(p);

});

suggestionList.style.display="block";

});

}



function updateSelectedFilters(){

    selectedFilters.innerHTML="";

    // Selected Genres
    selectedGenres.forEach(function(id){

        let genres;

        if(currentCategory=="movie"){

            genres=movieGenres;

        }

        else if(currentCategory=="tv"){

            genres=tvGenres;

        }

        else{

            genres=animeGenres;

        }

        const genre=genres.find(function(g){

            return g.id==id;

        });

        if(!genre) return;



        const chip=document.createElement("button");

        chip.className="selected-filter-chip";

        chip.innerHTML=`${genre.name} ✕`;



        chip.onclick=function(){

            selectedGenres=selectedGenres.filter(function(g){

                return g!=id;

            });

            loadGenres();

            updateSelectedFilters();

            updateApplyButton();

            applyGenreFilters();

        };

        selectedFilters.appendChild(chip);

    });

    // Year
    if(selectedYear!=""){

        const chip=document.createElement("button");

        chip.className="selected-filter-chip";

        chip.innerHTML=` ${selectedYear} ✕`;

        chip.onclick=function(){

            selectedYear="";

            yearInput.value="";

            loadGenres();

            updateSelectedFilters();

            updateApplyButton();

            applyGenreFilters();

        };

        selectedFilters.appendChild(chip);

    }
    // Language
if(selectedLanguage!=""){


    const language=
    languages.find(function(lang){

        return lang.iso_639_1==
        selectedLanguage;

    });

    if(language){

        const chip=
        document.createElement("button");

        chip.className=
        "selected-filter-chip";

        chip.innerHTML=
        ` ${language.english_name} ✕`;

        chip.onclick=function(){

            selectedLanguage="";

            loadGenres();

            updateSelectedFilters();

            updateApplyButton();

            applyGenreFilters();

        };

        selectedFilters.appendChild(chip);

    }

}

// Rating
if(selectedRating!=""){

    const chip=document.createElement("button");

    chip.className="selected-filter-chip";

    chip.innerHTML=`⭐ ${selectedRating}+ ✕`;

    chip.onclick=function(){

        selectedRating="";

        loadGenres();

        updateSelectedFilters();

        updateApplyButton();

        applyGenreFilters();

    };

    selectedFilters.appendChild(chip);

}

// Platform
if(selectedPlatform!=""){

    const platform=
    platformList.querySelector(
        '[data-provider="'+selectedPlatform+'"]'
    );

    if(platform){

        const chip=document.createElement("button");

        chip.className="selected-filter-chip";

        chip.innerHTML=` ${platform.textContent} ✕`;

        chip.onclick=function(){

            selectedPlatform="";

            loadGenres();

            updateSelectedFilters();

            updateApplyButton();

            applyGenreFilters();

        };

        selectedFilters.appendChild(chip);

    }

}

}


function applyAnimeGenreFilters(page=1){

    const query=`

    query($page:Int,$genres:[String],$year:Int){

    Page(page:$page,perPage:20){

        pageInfo{

            lastPage

        }

        media(

    type:ANIME,

    sort:SCORE_DESC,

    genre_in:$genres,

    seasonYear:$year

){

                id

                title{

                    english
                    romaji

                }

                coverImage{

                    extraLarge

                }

                averageScore

                seasonYear

            }

        }

    }

    `;

    let variables={

    page:page,

    genres:selectedGenres,

    year:null

}

    if(/^\d{4}$/.test(selectedYear)){

        variables.year=parseInt(selectedYear);

    }
console.log(selectedGenres);
console.log(selectedRating);

    fetch("https://graphql.anilist.co",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            query:query,

            variables:variables

        })

    })

    .then(function(response){

        return response.json();

    })

    .then(function(data){

    currentView.totalPages =
data.data.Page.pageInfo.lastPage;

    console.log(data);
console.log(data.data.Page.media);

        let anime=data.data.Page.media.map(function(show){

    return{

        id:show.id,

        poster_path:show.coverImage.extraLarge,

        title:show.title.english ||

        show.title.romaji,

        vote_average:show.averageScore/10,

        release_date:
        (show.seasonYear || "Unknown").toString(),

        anilist:true

    };

});

console.table(
    anime.map(function(a){
        return {
            title: a.title,
            score: a.vote_average
        };
    })
);





        movieContainer.parentElement.style.display="none";

trendingContainer.parentElement.style.display="none";

topRatedContainer.parentElement.style.display="none";

nowPlayingContainer.parentElement.style.display="none";

upcomingContainer.parentElement.style.display="none";

heroTitle.style.display="none";

heroSubtitle.style.display="none";

searchResultsContainer.parentElement.style.display="block";

recommendedContainer.parentElement.style.display="none";

        searchSection.style.display="block";

        genreOverlay.style.display="none";

        document.body.style.overflow = "auto";

        genrePage.style.display="none";



        createMovieCards(anime,searchResultsContainer,page==1,"genres");

    });

}





function updateApplyButton(){

    if(

selectedGenres.length>0 ||

selectedYear!="" ||

selectedLanguage!="" ||

(currentCategory!="anime" && selectedRating!="") ||

selectedPlatform!=""

){

        applyFilters.style.display="block";
        applyFilters.style.opacity="1";

    }

    else{

        applyFilters.style.display="block";
        applyFilters.style.opacity="0";

    }

}



function loadMovieGenres(){

    const API_KEY="f1f19a032c563adfb9d5bd034ace57e4";

    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        movieGenres = data.genres;

    });

}

function loadLanguages(){

    const API_KEY="f1f19a032c563adfb9d5bd034ace57e4";

    fetch(
`https://api.themoviedb.org/3/configuration/languages?api_key=${API_KEY}`
    )

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        languages=data
        .sort(function(a,b){

            return a.english_name.localeCompare(
                b.english_name
            );

        });

    });

}

function loadLanguageModal(){

    languageList.innerHTML="";

    languages.forEach(function(language){

        const button=document.createElement("button");

        button.textContent=
        language.english_name;

        button.onclick=function(){

            selectedLanguage=
            language.iso_639_1;

            languageButton.textContent=
            language.english_name;

            languageButton.classList.add(
                "selected-genre"
            );

            updateSelectedFilters();

            updateApplyButton();

            languageModal.style.display="none";

            languageOverlay.style.display="none";

        };

        languageList.appendChild(button);

    });

}


function loadTVGenres(){

    const API_KEY="f1f19a032c563adfb9d5bd034ace57e4";

    fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`)

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        tvGenres = data.genres;

    });

}

function loadAnimeGenres(){

    const query = `

    query{

        GenreCollection

    }

    `;

    fetch("https://graphql.anilist.co",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            query:query

        })

    })

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        animeGenres =

        data.data.GenreCollection.map(function(name){

            return{

                id:name,

                name:name

            };

        });

    });

}













genresBtn.addEventListener("click",function(e){

    e.preventDefault();



    applyFilters.style.display="block";
        applyFilters.style.opacity="0";

    searchSection.style.display="none";

    noResults.style.display="none";



    loadGenres();

    genreOverlay.style.display="block";

    document.body.style.overflow = "hidden";

genrePage.style.display="block";

});


genreBackButton.addEventListener("click",function(){

    genreOverlay.style.display="none";

    document.body.style.overflow = "auto";

    genrePage.style.display="none";

    movieContainer.parentElement.style.display="block";

    trendingContainer.parentElement.style.display="block";

    topRatedContainer.parentElement.style.display="block";

    nowPlayingContainer.parentElement.style.display="block";

    upcomingContainer.parentElement.style.display="block";

    selectedGenres=[];

    selectedFilters.innerHTML="";



    selectedYear="";

    selectedLanguage="";

    selectedRating = "";
selectedPlatform = "";


languageModal.scrollTop = 0;
ratingModal.scrollTop = 0;
platformModal.scrollTop = 0;

if(yearButton){

    yearButton.textContent="Year";

    yearButton.classList.remove("selected-genre");

}

if(ratingButton){

    ratingButton.textContent = "Rating";

    ratingButton.classList.remove("selected-genre");

}

if(platformButton){

    platformButton.textContent = "Platform";

    platformButton.classList.remove("selected-genre");

}
updateApplyButton();






});





function loadGenres(){

    genreGrid.innerHTML="";

    let genres;

    if(currentCategory=="movie"){

        genres = movieGenres;

    }

    else if(currentCategory=="tv"){

        genres = tvGenres;

    }

    else{

        genres = animeGenres;

    }

    let genresToShow;

    if(showAllGenres){

        genresToShow = genres;

    }

    else{

        genresToShow = genres;

    }

    genresToShow.forEach(function(genre){

        const button = document.createElement("button");

        button.className="genre-chip";

        button.textContent = genre.name;

        if(selectedGenres.includes(genre.id)){

    button.classList.add("selected-genre");

}

        button.addEventListener("click",function(){

    if(selectedGenres.includes(genre.id)){

        selectedGenres=selectedGenres.filter(function(id){

            return id!=genre.id;

        });

        button.classList.remove("selected-genre");

    }

    else{

        selectedGenres.push(genre.id);

        button.classList.add("selected-genre");

    }

    updateApplyButton();

    updateSelectedFilters();

});





        genreGrid.appendChild(button);

    });
    yearButton=document.createElement("button");

yearButton.className="genre-chip";

if(yearButton){

    yearButton.textContent="Year";

    if(selectedYear!=""){

    yearButton.textContent="📅 "+selectedYear;

    yearButton.classList.add("selected-genre");

}

}

yearButton.addEventListener("click",function(){

    if(selectedYear!=""){



        yearButton.classList.remove("selected-genre");





        return;

    }

    yearModal.style.display="block";

    yearOverlay.style.display="block";

});




genreGrid.appendChild(yearButton);





ratingList.querySelectorAll("button")
.forEach(function(button){

    button.addEventListener("click",function(){

        selectedRating=
        button.dataset.rating;

        ratingButton.textContent=
        "⭐ "+selectedRating+"+";

        ratingButton.classList.add(
            "selected-genre"
        );

        updateSelectedFilters();

        updateApplyButton();

        ratingModal.style.display="none";

        ratingOverlay.style.display="none";

    });

});


platformList.querySelectorAll("button").forEach(function(button){

    button.addEventListener("click",function(){

        selectedPlatform=button.dataset.provider;

        platformButton.textContent=button.textContent;

        platformButton.classList.add("selected-genre");

        updateSelectedFilters();

        updateApplyButton();

        platformModal.style.display="none";

        platformOverlay.style.display="none";

    });

});
if(currentCategory!="anime"){

    languageButton=document.createElement("button");

    languageButton.className="genre-chip";

    languageButton.textContent=" Language";

    ratingButton=document.createElement("button");

ratingButton.className="genre-chip";

ratingButton.textContent=" Rating";



ratingButton.addEventListener("click",function(){



    ratingModal.style.display="block";

    ratingOverlay.style.display="block";

});

genreGrid.appendChild(ratingButton);



    if(

currentCategory!="anime"

&&

selectedLanguage!=""

){

        const language=languages.find(function(lang){

            return lang.iso_639_1==selectedLanguage;

        });

        if(language){

            languageButton.textContent=
            language.english_name;

        }

        languageButton.classList.add("selected-genre");

    }

    languageButton.addEventListener("click",function(){

        if(selectedLanguage!=""){

            selectedLanguage="";

            languageButton.textContent=" Language";

            languageButton.classList.remove("selected-genre");

            updateSelectedFilters();

            updateApplyButton();

            return;

        }

        loadLanguageModal();

        languageModal.style.display="block";

        languageOverlay.style.display="block";

    });

    genreGrid.appendChild(languageButton);

    platformButton=document.createElement("button");

platformButton.className="genre-chip";

platformButton.textContent=" Platform";

if(selectedPlatform!=""){

    const selectedButton=
    platformList.querySelector(
        '[data-provider="'+selectedPlatform+'"]'
    );

    if(selectedButton){

        platformButton.textContent=
        selectedButton.textContent;

    }

    platformButton.classList.add("selected-genre");

}

platformButton.addEventListener("click",function(){

    if(selectedPlatform!=""){

        selectedPlatform="";

        platformButton.textContent=" Platform";

        platformButton.classList.remove("selected-genre");

        updateSelectedFilters();

        updateApplyButton();

        return;

    }

    platformModal.style.display="block";

    platformOverlay.style.display="block";

});

genreGrid.appendChild(platformButton);

}





}


function applyGenreFilters(page=1){

if(page==1){

    pages.genres=1;

}

    if(currentCategory=="anime"){

    applyAnimeGenreFilters(page);

    return;

}


    let endpoint;

    if(currentCategory==="movie"){

        endpoint="discover/movie";

    }

    else{

        endpoint="discover/tv";

    }

    const API_KEY =
    "f1f19a032c563adfb9d5bd034ace57e4";
    let url=`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&page=${page}`;

    // Genres
    if(selectedGenres.length>0){

        url+="&with_genres="+selectedGenres.join(",");

    }

    // Year Filters
    if(selectedYear!=""){

        if(/^\d{4}$/.test(selectedYear)){

    if(currentCategory=="movie"){

        url+="&primary_release_year="+selectedYear;

    }

    else{

        url+="&first_air_date_year="+selectedYear;

    }

}

        else if(/^\d{4}-\d{4}$/.test(selectedYear)){

            let years=selectedYear.split("-");

            if(currentCategory=="movie"){

    url+="&primary_release_date.gte="+years[0]+"-01-01";
    url+="&primary_release_date.lte="+years[1]+"-12-31";

}
else{

    url+="&first_air_date.gte="+years[0]+"-01-01";
    url+="&first_air_date.lte="+years[1]+"-12-31";

}

        }

        else if(/^\d{4}-$/.test(selectedYear)){

            let year=parseInt(selectedYear);

            if(currentCategory=="movie"){

            url+="&primary_release_date.gte="+year+"-01-01";

        }
        else{
        url+="&first_air_date.gte="+years+"-01-01";
        }
        }

        else if(/^-\d{4}$/.test(selectedYear)){

            let year=parseInt(selectedYear.substring(1));

            if(currentCategory=="movie"){

            url+="&primary_release_date.lte="+year+"-12-31";

        }

        else{
        url+="&first_air_date.lte="+years[1]+"-12-31";
        }
        }

    }

// Language
if(selectedLanguage!=""){

    url+="&with_original_language="+selectedLanguage;

}

// Rating
if(selectedRating!=""){

    url+="&vote_average.gte="+selectedRating;

}

// Platform
if(selectedPlatform!=""){

    url+="&watch_region=IN";

    url+="&with_watch_providers="+selectedPlatform;

}



    console.log(url);

    fetch(url)

    .then(function(response){

        return response.json();

    })

    .then(function(data){


currentView.totalPages=data.total_pages;
        console.log(data);

        movieContainer.parentElement.style.display="none";

trendingContainer.parentElement.style.display="none";

topRatedContainer.parentElement.style.display="none";

nowPlayingContainer.parentElement.style.display="none";

upcomingContainer.parentElement.style.display="none";

genreOverlay.style.display="none";

document.body.style.overflow = "auto";

genrePage.style.display="none";

searchSection.style.display="block";

heroTitle.style.display="none";

heroSubtitle.style.display="none";

searchResultsContainer.parentElement.style.display="block";

recommendedContainer.parentElement.style.display="none";

if(data.results.length==0){

    searchResultsContainer.innerHTML=`

        <div class="no-filter-results">

            <h2>😔 No Results Found</h2>

            <p>
                Try removing a genre or broadening the year filter.
            </p>

        </div>

    `;

    return;

}

createMovieCards(data.results,searchResultsContainer,page==1,"genres");

    })

    .catch(function(error){

        console.log(error);

    });

}

applyFilters.addEventListener("click",function(){

    applyGenreFilters();

});

applyYear.addEventListener("click", function () {

    const value = yearInput.value.trim();

    const currentYear = new Date().getFullYear();

    if(value==""){

        alert("Please enter a year.");

        return;

    }

    let valid = false;

    if(/^\d{4}$/.test(value)){

        const year = parseInt(value);

        valid = (year>=1900 && year<=currentYear);

    }

    else if(/^\d{4}-\d{4}$/.test(value)){

        let parts = value.split("-");

        let from = parseInt(parts[0]);
        let to = parseInt(parts[1]);

        valid = (
            from>=1900 &&
            to<=currentYear &&
            from<=to
        );

    }

    else if(/^\d{4}-$/.test(value)){

        let from = parseInt(value);

        valid = (
            from>=1900 &&
            from<=currentYear
        );

    }

    else if(/^-\d{4}$/.test(value)){

        let to = parseInt(value.substring(1));

        valid = (
            to>=1900 &&
            to<=currentYear
        );

    }

    if(!valid){

    yearInput.classList.add("invalid");

    yearError.style.display="block";

    yearError.textContent="Invalid year format.";

    return;

}

    selectedYear=value;

    yearInput.classList.remove("invalid");

yearError.style.display="none";

    selectedYear=value;

yearButton.textContent="📅 "+value;

yearButton.classList.add("selected-genre");

updateApplyButton();

yearModal.style.display="none";
yearOverlay.style.display="none";

    updateSelectedFilters();

});








let pages = {

    popular:1,

    trending:1,

    topRated:1,

    nowPlaying:1,

    upcoming:1,

    search:1,

    genres:1,

    recommendations:1

};

let currentView={
    mode:"",
    page:1,
    totalPages:1,
    query:"",
    movieId:null
};





yearInput.addEventListener("input",function(){

    yearInput.classList.remove("invalid");

    yearError.style.display="none";

});

yearInput.addEventListener("keydown",function(e){

    if(e.key=="Enter"){

        e.preventDefault();

        applyYear.click();

    }

});





aboutBtn.addEventListener("click",function(e){

    e.preventDefault();

    aboutOverlay.style.display="block";

    document.body.style.overflow = "hidden";

    aboutModal.style.display="block";

});

closeAbout.addEventListener("click",function(){

    aboutOverlay.style.display="none";

    document.body.style.overflow = "auto";

    aboutModal.style.display="none";

});

aboutOverlay.addEventListener("click",function(){

    aboutOverlay.style.display="none";

    document.body.style.overflow = "auto";

    aboutModal.style.display="none";

});

watchlistBtn.addEventListener("click",function(e){

    e.preventDefault();

    renderWatchlist();

    watchlistOverlay.style.display="block";

    document.body.style.overflow = "hidden";

    watchlistModal.style.display="block";

});

closeWatchlist.addEventListener("click",function(){

    watchlistOverlay.style.display="none";

    document.body.style.overflow = "auto";

    watchlistModal.style.display="none";

});

watchlistOverlay.addEventListener("click",function(){

    watchlistOverlay.style.display="none";

    document.body.style.overflow = "auto";

    watchlistModal.style.display="none";

});
















const closeYearModal =
document.getElementById("closeYearModal");

closeYearModal.addEventListener("click",function(){

    yearModal.style.display="none";

    yearOverlay.style.display="none";

});

closeRatingModal.addEventListener("click",function(){

    ratingModal.style.display="none";

    ratingOverlay.style.display="none";

});

closePlatformModal.addEventListener("click",function(){

    platformModal.style.display="none";

    platformOverlay.style.display="none";

});

closeLanguageModal.addEventListener("click",function(){

    languageModal.style.display="none";

    languageOverlay.style.display="none";

});

yearOverlay.addEventListener("click",function(){

    yearModal.style.display="none";
    yearOverlay.style.display="none";

});

languageOverlay.addEventListener("click",function(){

    languageModal.style.display="none";
    languageOverlay.style.display="none";

});

ratingOverlay.addEventListener("click",function(){

    ratingModal.style.display="none";
    ratingOverlay.style.display="none";

});

platformOverlay.addEventListener("click",function(){

    platformModal.style.display="none";
    platformOverlay.style.display="none";

});

window.addEventListener("offline", function(){

    alert("⚠️ No Internet Connection");

});

window.addEventListener("online", function(){

    alert("✅ Internet Connected");

});




window.addEventListener("load",function(){

    console.log("Window Loaded");
    yearModal.style.display = "none";
yearOverlay.style.display = "none";

languageModal.style.display="none";
    languageOverlay.style.display="none";

    ratingModal.style.display="none";
    ratingOverlay.style.display="none";

    platformModal.style.display="none";
    platformOverlay.style.display="none";

    watchlistOverlay.style.display="none";

    document.body.style.overflow = "auto";

watchlistModal.style.display="none";
aboutOverlay.style.display="none";

document.body.style.overflow = "auto";

aboutModal.style.display="none";
watchlistDetailsBtn.style.display="none";

});




if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

homeLogo.addEventListener("click", function(e){

    e.preventDefault();

    location.reload();

});








function openDetails(){

    detailsOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
    watchlistDetailsBtn.style.display="inline-block";

}

function closeDetails(){

    detailsOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    watchlistDetailsBtn.style.display="none";

}
function startLoading(){

    loadingBar.style.opacity="1";

    loadingBar.style.width="320px";

}

function stopLoading(){

    loadingBar.style.width="0";

    loadingBar.style.opacity="0";

}

function startPopupLoading(){

    globalLoader.style.display = "flex";

}

function stopPopupLoading(){

    globalLoader.style.display = "none";

}

function setLoading(state){

    const rows = document.querySelectorAll(".movie-container");

    rows.forEach(function(row){

        if(state){

            row.classList.add("loading");

        }

        else{

            row.classList.remove("loading");

        }

    });

}





function changeTheme(type){

    const root =
    document.documentElement;


    if(type == "movie"){

        root.style.setProperty(
        "--accent-color",
        "#E50914"
        );

        root.style.setProperty(
        "--accent-hover",
        "#FF3B30"
        );

        root.style.setProperty(
        "--accent-shadow",
        "rgba(229,9,20,.35)"
        );

        root.style.setProperty(
        "--accent-light",
        "rgba(229,9,20,.12)"
        );

        root.style.setProperty(
        "--accent-gradient",
        "linear-gradient(90deg,#E50914,#B20710)"
        );

        root.style.setProperty(
        "--accent-gradient-hover",
        "linear-gradient(90deg,#FF3B30,#C8102E)"
        );

    }

    else if(type == "tv"){

        root.style.setProperty(
        "--accent-color",
        "#9C6BFF"
        );

        root.style.setProperty(
        "--accent-hover",
        "#B388FF"
        );

        root.style.setProperty(
        "--accent-shadow",
        "rgba(156,107,255,.35)"
        );

        root.style.setProperty(
        "--accent-light",
        "rgba(156,107,255,.12)"
        );

        root.style.setProperty(
        "--accent-gradient",
        "linear-gradient(90deg,#9C6BFF,#6D4CFF)"
        );

        root.style.setProperty(
        "--accent-gradient-hover",
        "linear-gradient(90deg,#B388FF,#7C4DFF)"
        );

    }

    else if(type == "anime"){

        root.style.setProperty(
        "--accent-color",
        "#2979FF"
        );

        root.style.setProperty(
        "--accent-hover",
        "#4D9CFF"
        );

        root.style.setProperty(
        "--accent-shadow",
        "rgba(41,121,255,.35)"
        );

        root.style.setProperty(
        "--accent-light",
        "rgba(41,121,255,.12)"
        );

        root.style.setProperty(
        "--accent-gradient",
        "linear-gradient(90deg,#2979FF,#1565C0)"
        );

        root.style.setProperty(
        "--accent-gradient-hover",
        "linear-gradient(90deg,#4D9CFF,#1976D2)"
        );

    }

}






function loadSeasons(tvID, seasons){

    seasonContainer.innerHTML = "";

    seasons.forEach(function(seasonData){

        const season = document.createElement("div");

        season.className = "season";

        season.innerHTML = `

            <h3>
                ▶ Season ${seasonData.season_number}
                <span class="episode-count">
                    (${seasonData.episode_count} Episodes)
                </span>
            </h3>

            <div
                class="episode-list"
                id="season${seasonData.season_number}">
            </div>

        `;

        season.querySelector("h3").addEventListener("click", function(){

            const episodeList =
            document.getElementById(
            "season" + seasonData.season_number
            );

            if(openedSeason === seasonData.season_number){

                episodeList.innerHTML = "";

                openedSeason = null;

                episodePopup.style.display = "none";

                return;

            }

            if(openedSeason != null){

                document.getElementById(
                "season" + openedSeason
                ).innerHTML = "";

            }

            openedSeason = seasonData.season_number;

            episodePopup.style.display = "none";

            loadEpisodes(tvID, seasonData.season_number);

        });
        console.log("Creating season", seasonData.season_number);

        seasonContainer.appendChild(season);

    });

}

function loadEpisodes(tvID,seasonNumber){

    const API_KEY =
    "f1f19a032c563adfb9d5bd034ace57e4";

    const url =
`https://api.themoviedb.org/3/tv/${tvID}/season/${seasonNumber}?api_key=${API_KEY}`;

    fetch(url)

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        const episodeList =
document.getElementById("season"+seasonNumber);
episodeList.className = "episode-list";

        episodeList.innerHTML="";
        episodeList.scrollTop = 0;

        data.episodes.forEach(function(episode){

    const p = document.createElement("button");

    p.className = "episode-button";

    p.textContent =
    episode.episode_number +
    ". " +
    episode.name;

    p.addEventListener("click",function(){

        episodePopup.style.display = "block";
        episodePopup.scrollTop = 0;

        episodeTitle.textContent = episode.name;

        episodeInfo.textContent =
"⭐ " +
episode.vote_average.toFixed(1) +
" • " +
(episode.runtime || "?") +
" min";

        episodeOverview.textContent =
episode.overview && episode.overview.trim() !== ""
?
episode.overview
:
"No overview available.";

        episodePlaceholder.style.display = "none";

        if(episode.still_path){

            episodeStill.style.display = "block";

            episodeStill.src =
            "https://image.tmdb.org/t/p/w500" +
            episode.still_path;

        }

        else{

            episodeStill.style.display = "none";

        }

    });

    episodeList.appendChild(p);

});

    });

}

closeEpisodePopup.addEventListener("click",function(){

    episodePopup.style.display="none";


});





let showAllActors = false;

let allCast = [];

let openedSeason = null;

let animeHistory = [];

let currentAnimeId = null;

function createMovieCards(
    movies,
    container,
    clear=true,
    mode=""
){
    if(clear){

    container.innerHTML="";

}


movies.forEach(function(movie){
    const posterURL =
movie.poster_path
?
(
    movie.anilist
    ? movie.poster_path
    : "https://image.tmdb.org/t/p/w500" + movie.poster_path
)
:
"final.jpeg";

    const movieCard = document.createElement("div");
    movieCard.dataset.id = movie.id;
    movieCard.movieData = movie;

    movieCard.className = "movie-card";

    const year =
movie.release_date ||
movie.first_air_date ||
"Unknown";

    const title =
movie.title ||
movie.name ||
"Untitled";

    movieCard.innerHTML = `

        <img src="${posterURL}">

        <h3>${title}</h3>

        <p>

${year=="Unknown"?year:year.toString().substring(0,4)}

|

 ${movie.vote_average > 0
?
"⭐ " + movie.vote_average.toFixed(1)
:
"⭐ N/A"}

</p>

    `;

    container.appendChild(movieCard);


    movieCard.addEventListener("click",function(){


    if(movie.anilist){
    startPopupLoading();
console.log(movie);
console.log(movie.id);
showAnime(movie.id);

}

else{

startPopupLoading();

showMovie(movie.id);

}



});

});

const oldButton=container.querySelector(".load-more-card");

if(oldButton){

    oldButton.remove();

}

const loadMore=document.createElement("div");

loadMore.className="load-more-card";

loadMore.innerHTML=`
<div class="load-more-circle">

<span>❯</span>

</div>
`;

loadMore.onclick=function(){

    handleLoadMore(mode);

};

let page=1;

switch(mode){

    case "popular":
        page=pages.popular;
        break;

    case "trending":
        page=pages.trending;
        break;

    case "topRated":
        page=pages.topRated;
        break;

    case "nowPlaying":
        page=pages.nowPlaying;
        break;

    case "upcoming":
        page=pages.upcoming;
        break;

    case "search":
    page = pages.search;
    break;

case "genres":
    page = pages.genres;
    break;

case "recommendations":
    page = pages.recommendations;
    break;

}

if(page<currentView.totalPages){

    container.appendChild(loadMore);

}




}

function handleLoadMore(mode){

    switch(mode){

        case "popular":

            pages.popular++;

            if(currentCategory=="movie"){

                loadMovies(pages.popular);

            }

            else if(currentCategory=="tv"){

                loadTV(pages.popular);

            }

            else{

                loadAnime(pages.popular);

            }

            break;



        case "trending":

            pages.trending++;

            loadTrending(pages.trending);

            break;



        case "topRated":

            pages.topRated++;

            loadTopRated(pages.topRated);

            break;



        case "nowPlaying":

            pages.nowPlaying++;

            loadNowPlaying(pages.nowPlaying);

            break;



        case "upcoming":

            pages.upcoming++;

            loadUpcoming(pages.upcoming);

            break;


        case "search":

            if(pages.search >= currentView.totalPages){

        return;


}

pages.search++;

searchMovies(pages.search);

            break;


        case "genres":

            pages.genres++;

            applyGenreFilters(pages.genres);

            break;


        case "recommendations":

            pages.recommendations++;

            loadRecommendations(currentView.movieId,pages.recommendations);

            break;

    }

}


function resetRowScrolls(){

    movieContainer.scrollLeft = 0;

    trendingContainer.scrollLeft = 0;

    topRatedContainer.scrollLeft = 0;

    nowPlayingContainer.scrollLeft = 0;

    upcomingContainer.scrollLeft = 0;

    searchResultsContainer.scrollLeft = 0;

    recommendedContainer.scrollLeft = 0;

}

continueReading.addEventListener("click",function(){


aiOverviewBox.style.display = "none";
    openDetails();

});

function formatMoney(amount){

    if(amount <= 0){

        return "Not Available";

    }

    if(amount >= 1000000000){

        return "$" +
        (amount / 1000000000).toFixed(2) +
        " Billion";

    }

    if(amount >= 1000000){

        return "$" +
        (amount / 1000000).toFixed(0) +
        " Million";

    }

    if(amount >= 1000){

        return "$" +
        (amount / 1000).toFixed(0) +
        " Thousand";

    }

    return "$" + amount;

}


//==============================popup=====================================

//const movieCards = document.querySelectorAll(".movie-card");

const movieContainer = document.querySelector(".movie-container");

const trendingContainer =document.querySelector(".trending-container");

const topRatedContainer =document.querySelector(".top-rated-container");

const nowPlayingContainer =document.querySelector(".now-playing-container");

const upcomingContainer =document.querySelector(".upcoming-container");

//========================================================================

const popup = document.querySelector(".popup-overlay");

const popupBox = document.querySelector(".popup");

const closeButton = document.getElementById("close-popup");
//=========================================================================


// =========================================
//          SHOW MOVIE IN POPUP
// =========================================


function updateCast(){

    let castToShow;

    if(showAllActors){

        castToShow = allCast.slice(4);

        showAllCast.textContent = "Show Less ↑";

    }

    else{

        castToShow = allCast.slice(4,10);
        if(allCast.length <= 10){

    showAllCast.style.display="none";

}

else{

    showAllCast.style.display="inline-block";

}

        showAllCast.textContent = "Show All →";

    }

    detailsCast.innerHTML =
    castToShow
    .map(function(actor){

        return actor.name;

    })
    .join(" • ");

}


function loadTrailer(movieID){

    const API_KEY =
    "f1f19a032c563adfb9d5bd034ace57e4";

    const url =
`https://api.themoviedb.org/3/${currentAPI}/${movieID}/videos?api_key=${API_KEY}`;

    fetch(url)

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        const trailer =
data.results.find(function(video){

    return video.site=="YouTube"
    &&
    video.type=="Trailer";

});
if(trailer){

    trailerContainer.innerHTML = `

    <iframe
    src="https://www.youtube.com/embed/${trailer.key}"
    allowfullscreen>

    </iframe>

    `;

}
else{

    trailerContainer.innerHTML =

    "<style>pre{font-size:20px;}</style><pre>No Trailer Available</pre>";

}
    });

}











function showMovie(movieID){

currentView.movieId = movieID;

popupCastHeading.textContent = "👥 Cast";

detailsCastHeading.textContent = "Cast";



detailsCharacters.style.display = "none";

castCards.parentElement.style.display = "block";

metaHeadings[1].textContent = "• Language:";
metaHeadings[4].textContent = "• Budget:";
metaHeadings[5].textContent = "• Revenue:";
metaHeadings[6].textContent = "• Companies:";
metaHeadings[7].textContent = "• Countries:";

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";
    const url =
    `https://api.themoviedb.org/3/${currentAPI}/${movieID}?api_key=${API_KEY}`;

    fetch(url)

.then(function(response){

    return response.json();

})




.then(function(movie){

    console.log(movie);
    currentDetails = movie;

    updateWatchlistButton();

    popupTitle.textContent =
movie.title || movie.name;

    const backdropURL =
"https://image.tmdb.org/t/p/original"
+
movie.backdrop_path;



popupBox.style.backgroundImage =
`linear-gradient(
rgba(0,0,0,0.55),
rgba(0,0,0,0.68)
),
url(${backdropURL})`;

detailsHero.style.backgroundImage =
`linear-gradient(
rgba(0,0,0,0.2),
rgba(11,11,11,1)
),
url(${backdropURL})`;

const creditsURL =
`https://api.themoviedb.org/3/${currentAPI}/${movieID}/credits?api_key=${API_KEY}`;
fetch(creditsURL)

.then(function(response){

    return response.json();

})

.then(function(data){

    if(data.cast.length > 0){

    castCards.innerHTML = "";

    data.cast
    .slice(0,4)
    .forEach(function(actor){

        const card =
        document.createElement("div");

        card.className = "cast-card";
        const image =
actor.profile_path
?
"https://image.tmdb.org/t/p/w185"+actor.profile_path
:
"casts.jpeg";

        card.innerHTML = `

        <img src="${image}">

        <p>${actor.name}</p>

        `;

        castCards.appendChild(card);

    });

    popupCast.textContent =
    data.cast
    .slice(0,3)
    .map(function(actor){

        return actor.name;

    })
    .join(" • ");


    showAllActors=false;
    allCast = data.cast;

updateCast();

}

else{

    popupCast.textContent = "Cast information not available";
    castCards.innerHTML = "";

    detailsCast.innerHTML = "Not Available";

    allCast = [];

    showAllCast.style.display = "none";


}

});

popupBox.style.backgroundSize = "cover";

popupBox.style.backgroundPosition = "center";

popupBox.style.backgroundRepeat = "no-repeat";

    const runtime =
movie.runtime ||
movie.episode_run_time?.[0] ||
0;

function updateCast(){

    let castToShow;


    if(showAllActors){

        castToShow = allCast.slice(4);



        showAllCast.textContent = "Show Less ↑";

    }

    else{

        castToShow = allCast.slice(4,10);
        if(allCast.length <= 10){

    showAllCast.style.display="none";

}

else{

    showAllCast.style.display="inline-block";

}

        showAllCast.textContent = "Show All →";

    }

    detailsCast.innerHTML =
    castToShow
    .map(function(actor){

        return actor.name;

    })
    .join(" • ");

}


















//=======================================================================











detailsTitle.textContent =
movie.title || movie.name;



detailsTagline.textContent =
movie.tagline || "";


if(currentAPI == "movie"){

    seasonContainer.innerHTML="";

    detailsSeasons.style.display = "none";
seasonDivider.style.display = "none";

    const hours = Math.floor(movie.runtime / 60);

    const minutes = movie.runtime % 60;

    popupPoster.src =
movie.poster_path
?
"https://image.tmdb.org/t/p/w500"+movie.poster_path
:
"final.jpeg";

    detailsPoster.src =
movie.poster_path
?
"https://image.tmdb.org/t/p/w500"+movie.poster_path
:
"final.jpeg";

    const year =
    movie.release_date ||
    movie.first_air_date ||
    "Unknown";

    popupInfo.textContent =
    year.substring(0,4)
    +
    " | "
    +
    hours
    +
    "h "
    +
    minutes
    +
    "m | ⭐ "
    +
    movie.vote_average.toFixed(1);

    detailsInfo.textContent =
    popupInfo.textContent;
    stopPopupLoading();
    detailsBudget.textContent =
formatMoney(movie.budget);





detailsRevenue.textContent =
formatMoney(movie.revenue);

detailsCompanies.textContent =

movie.production_companies.length > 0

?

movie.production_companies
.map(function(company){

    return company.name;

})
.join(" • ")

:

"Not Available";

detailsCountries.textContent =

movie.production_countries.length > 0

?

movie.production_countries
.map(function(country){

    return country.name;

})
.join(" • ")

:

"Not Available";

}


else{


    detailsSeasons.style.display = "block";

    seasonDivider.style.display = "block";
    openedSeason = null;

episodePopup.style.display = "none";

seasonContainer.innerHTML = "";
console.log("Loading seasons...");
console.log(movie.seasons);
    loadSeasons(movie.id,movie.seasons);

    popupPoster.src =
movie.poster_path
?
"https://image.tmdb.org/t/p/w500" + movie.poster_path
:
"final.jpeg";

detailsPoster.src =
movie.poster_path
?
"https://image.tmdb.org/t/p/w500" + movie.poster_path
:
"final.jpeg";


    const year =
    movie.release_date ||
    movie.first_air_date ||
    "Unknown";

    popupInfo.textContent =
    year.substring(0,4)
    +
    " | "
    +
    movie.number_of_seasons
    +
    (movie.number_of_seasons == 1 ? " Season" : " Seasons")
    +
    " | ⭐ "
    +
    movie.vote_average.toFixed(1);
    stopPopupLoading();

    detailsInfo.textContent =
    popupInfo.textContent;


    detailsBudget.textContent =
"Not Available";

    detailsRevenue.textContent =
"Not Available";




detailsCompanies.textContent =
movie.production_companies.length > 0

?

movie.production_companies

.map(function(company){

    return company.name;

})

.join(" • ")

:

"Not Available";

detailsCountries.textContent =
movie.origin_country.length > 0
?
movie.origin_country.join(" • ")
:
"Not Available";
}


//=================================================================================
    const genreNames = movie.genres.map(function(genre){

    return genre.name;

});

popupGenre.textContent = genreNames.join(" • ");
detailsGenres.textContent = genreNames.join(" • ");

detailsLanguage.textContent =
movie.spoken_languages

.map(function(language){

    return language.english_name;

})

.join(" • ");

detailsRelease.textContent =
movie.release_date ||
movie.first_air_date ||
"Unknown";

detailsStatus.textContent =
movie.status;


    popupOverview.textContent = movie.overview;
    detailsOverview.textContent = movie.overview;
pages.recommendations = 1;
    loadRecommendations(movieID);
    loadTrailer(movieID);
    document.body.style.overflow = "hidden";

    popup.style.display="flex";

setTimeout(function(){

    popupBox.classList.add("show");

},10);

});






}


function showAnime(id){

currentAnimeId = id;
currentView.movieId = id;

popupCastHeading.textContent = "👥 Characters";

detailsCastHeading.textContent = "Characters";



castCards.parentElement.style.display = "none";

detailsCharacters.style.display = "block";

metaHeadings[1].textContent = "• Source:";
metaHeadings[4].textContent = "• Popularity:";
metaHeadings[5].textContent = "• Favorites:";
metaHeadings[6].textContent = "• Studios:";
metaHeadings[7].textContent = "• Episodes:";

const query = `

query($id:Int){

Media(

id:$id,

type:ANIME

){

id

title{

english
romaji

}

description(asHtml:false)

coverImage{

extraLarge

}

bannerImage

averageScore

episodes

duration

status

seasonYear

genres

source

popularity

favourites
trailer{

    id

    site

}


studios{

nodes{

name

}


}

characters(sort:ROLE,page:1,perPage:100){

nodes{

name{

full

}

image{

large

}

}

}
relations{

edges{

relationType

node{

id

type

title{

english
romaji

}

coverImage{

large

}

averageScore

seasonYear

}

}

}

}

}

`;

fetch("https://graphql.anilist.co",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

query:query,

variables:{

id:id

}

})

})

.then(function(response){

return response.json();

})

.then(function(result){

const anime =
result.data.Media;

currentDetails = anime;

updateWatchlistButton();

console.log(anime);
console.log(anime.relations);

popupTitle.textContent =
anime.title.english
||
anime.title.romaji;

popupPoster.src =
anime.coverImage?.extraLarge
||
"final.jpeg";

popupBox.style.backgroundImage =

`linear-gradient(
rgba(0,0,0,.55),
rgba(0,0,0,.68)
),

url(${anime.bannerImage || anime.coverImage.extraLarge})`;

detailsHero.style.backgroundImage =

`linear-gradient(
rgba(0,0,0,.2),
rgba(11,11,11,1)
),

url(${anime.bannerImage || anime.coverImage.extraLarge})`;

popupInfo.textContent =

(anime.seasonYear || "Unknown")

+

" | "

+

(anime.duration || "?")

+

" min"

+

" | ⭐ "

+

(anime.averageScore/10).toFixed(1);

popupGenre.textContent =
anime.genres.join(" • ");

popupOverview.innerHTML =
anime.description || "No description.";

detailsPoster.src =
anime.coverImage?.extraLarge
||
"final.jpeg";

detailsTitle.textContent =
popupTitle.textContent;

detailsInfo.textContent =
popupInfo.textContent;

detailsGenres.textContent =
popupGenre.textContent;

detailsOverview.innerHTML =
popupOverview.innerHTML;

detailsLanguage.textContent =
anime.source || "Unknown";

detailsRelease.textContent =
anime.seasonYear || "Unknown";

detailsStatus.textContent =
anime.status;

detailsBudget.textContent =
anime.popularity.toLocaleString();

detailsRevenue.textContent =
anime.favourites.toLocaleString();

detailsCompanies.textContent =

anime.studios.nodes.length>0

?

anime.studios.nodes

.map(function(studio){

return studio.name;

})

.join(" • ")

:

"Not Available";

detailsCountries.textContent =
anime.episodes
?
anime.episodes
:
"Unknown";

popupCast.textContent =
anime.characters.nodes
.slice(0,3)
.map(function(character){

return character.name.full;

})
.join(" • ");

characterScroll.innerHTML = "";

anime.characters.nodes.forEach(function(character){

    const card =
    document.createElement("div");

    card.className = "character-card";

    card.innerHTML = `

        <img src="${character.image.large}">

        <p>${character.name.full}</p>

    `;

    characterScroll.appendChild(card);

});

detailsTagline.textContent="";

castCards.innerHTML="";

detailsCast.textContent="";

if (anime.trailer && anime.trailer.site === "youtube") {

    trailerContainer.innerHTML = `
        <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/${anime.trailer.id}?rel=0"
            title="Official Trailer"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
        </iframe>
    `;

} else {

    trailerContainer.innerHTML = `
        <pre style="font-size:20px;">No Trailer Available</pre>
    `;

}
console.log(anime.trailer);
seasonContainer.innerHTML="";

detailsSeasons.style.display="block";

seasonDivider.style.display="block";
console.log(anime.relations.edges);
anime.relations.edges.forEach(function(relation){

if(

relation.node.type!="ANIME"

||

!relation.node.coverImage

){

    return;

}

const card=document.createElement("div");

card.className="season-card";

card.innerHTML=`

<img src="${relation.node.coverImage.large}">

<div class="season-info">

<h3>

${relation.node.title.english || relation.node.title.romaji}

</h3>

<p>

⭐ ${(relation.node.averageScore/10).toFixed(1)}

•

${relation.node.seasonYear || "Unknown"}

</p>

</div>

`;

card.addEventListener("click",function(){

animeHistory.push(currentAnimeId);

    startPopupLoading();

    detailsOverlay.scrollTo({

        top:0,

        behavior:"smooth"

    });

    setTimeout(function(){

        characterScroll.scrollLeft = 0;

        seasonContainer.scrollLeft = 0;

        aiOverviewBtn.textContent= "✨  AI Insight →";
        aiOverviewBox.textContent="";
        aiOverviewBox.style.display = "none";

        showAnime(relation.node.id);

    },500);

});

seasonContainer.appendChild(card);

});



popup.style.display="flex";

document.body.style.overflow="hidden";

setTimeout(function(){

popupBox.classList.add("show");

},10);

stopPopupLoading();

});

}


// =========================================
//              MOVIE DATA
// =========================================
function loadAnimeRow(query,container,page=1){

fetch("https://graphql.anilist.co",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

    query:query,

    variables:{

        page:page

    }

})

})

.then(function(response){

return response.json();

})

.then(function(data){

const anime=

data.data.Page.media.map(function(show){

return{

id:show.id,

poster_path:show.coverImage.extraLarge,

title:show.title.english||show.title.romaji,

vote_average:show.averageScore/10,

release_date:
(show.seasonYear || "Unknown").toString(),

anilist:true

};

});

createMovieCards(anime,container,page==1,container.dataset.mode);
loadingCount++;

if(loadingCount >= 4){

    stopLoading();

    setLoading(false);

    preloader.style.opacity = "0";

    setTimeout(function(){

        preloader.style.display = "none";

    },600);

}

});

}



function loadMovies(page=1){
    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";
    const url =
`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

    fetch(url)

.then(function(response){

    return response.json();

})

.then(function(data){

    currentView.totalPages=data.total_pages;

    const movies = data.results;

    console.log(movies);

    createMovieCards(movies, movieContainer,page==1,"popular");
    loadingCount++;

if(loadingCount >= 4){

    stopLoading();

    setLoading(false);

    preloader.style.opacity = "0";

    setTimeout(function(){

        preloader.style.display = "none";

    },600);

}


});

}

function loadTrending(page=1){

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";


    let endpoint;

if(currentCategory == "movie"){

    endpoint = "trending/movie/day";

}

else if(currentCategory == "tv"){

    endpoint = "trending/tv/day";

}

else{

    const query=`

query($page:Int){

Page(page:$page,perPage:20){

media(

type:ANIME,

sort:TRENDING_DESC

){

id

title{

english
romaji

}

coverImage{

extraLarge

}

averageScore

seasonYear

}

}

}

`;
trendingContainer.dataset.mode="trending";

loadAnimeRow(query,trendingContainer,page);
return;
}

console.log(endpoint);


const separator =
endpoint.includes("?") ? "&" : "?";

const url =
`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&page=${page}`;


    fetch(url)


.then(function(response){

    return response.json();

})

.then(function(data){

    currentView.totalPages=data.total_pages;

    const movies = data.results;

    console.log(movies);

    createMovieCards(movies, trendingContainer,page==1,"trending");
    loadingCount++;
    if(loadingCount >= 4){

    stopLoading();

    setLoading(false);

    preloader.style.opacity = "0";

    setTimeout(function(){

        preloader.style.display = "none";

    },600);

}

});



}



function loadTopRated(page=1){

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";

    let endpoint;

if(currentCategory == "movie"){

    endpoint = "movie/top_rated";

}

else if(currentCategory == "tv"){

    endpoint = "discover/tv?sort_by=vote_average.desc&without_genres=16";

}

else{

    const query=`

query($page:Int){

Page(page:$page,perPage:20){

media(

type:ANIME,

sort:SCORE_DESC

){

id

title{

english
romaji

}

coverImage{

extraLarge

}

averageScore

seasonYear

}

}

}

`;

topRatedContainer.dataset.mode="topRated";

loadAnimeRow(query,topRatedContainer,page);
return;
}

const separator =
endpoint.includes("?") ? "&" : "?";

const url =
`https://api.themoviedb.org/3/${endpoint}${separator}api_key=${API_KEY}&page=${page}`;





    fetch(url)

.then(function(response){

    return response.json();

})

.then(function(data){

    currentView.totalPages=data.total_pages;

    const movies = data.results;

    console.log(movies);

    createMovieCards(movies, topRatedContainer,page==1,"topRated");
    loadingCount++;
    if(loadingCount >= 4){

    stopLoading();

    setLoading(false);

    preloader.style.opacity = "0";

    setTimeout(function(){

        preloader.style.display = "none";

    },600);

}

});

}


function loadNowPlaying(page=1){

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";

let endpoint;

if(currentCategory == "movie"){

    endpoint = "movie/now_playing";

}

else if(currentCategory == "tv"){

    endpoint = "tv/airing_today";

}

else{

    const query=`

query($page:Int){

Page(page:$page,perPage:20){

media(

type:ANIME,

status:RELEASING,

sort:POPULARITY_DESC

){

id

title{

english
romaji

}

coverImage{

extraLarge

}

averageScore

seasonYear

}

}

}

`;

nowPlayingContainer.dataset.mode="nowPlaying";

loadAnimeRow(query,nowPlayingContainer,page);
return;
}

const separator =
endpoint.includes("?") ? "&" : "?";

const url =
`https://api.themoviedb.org/3/${endpoint}${separator}api_key=${API_KEY}&page=${page}`;
    fetch(url)

.then(function(response){

    return response.json();

})

.then(function(data){

    currentView.totalPages=data.total_pages;

    const movies = data.results;

    console.log(movies);

    createMovieCards(movies, nowPlayingContainer,page==1,"nowPlaying");
    loadingCount++;
    if(loadingCount >= 4){

    stopLoading();

    setLoading(false);

    preloader.style.opacity = "0";

    setTimeout(function(){

        preloader.style.display = "none";

    },600);

}

});

}


function loadUpcoming(page=1){

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";

let endpoint;

if(currentCategory == "movie"){

    endpoint = "movie/upcoming";

}

else if(currentCategory == "tv"){

    endpoint = "discover/tv?with_genres=10762";

}

else{

    const query=`

query($page:Int){

Page(page:$page,perPage:20){

media(

type:ANIME,

status:NOT_YET_RELEASED,

sort:POPULARITY_DESC

){

id

title{

english
romaji

}

coverImage{

extraLarge

}

averageScore

seasonYear

}

}

}

`;

upcomingContainer.dataset.mode="upcoming";

loadAnimeRow(query,upcomingContainer,page);
return;
}

const separator =
endpoint.includes("?") ? "&" : "?";

const url =
`https://api.themoviedb.org/3/${endpoint}${separator}api_key=${API_KEY}&page=${page}`;
    fetch(url)

.then(function(response){

    return response.json();

})

.then(function(data){

    currentView.totalPages=data.total_pages;

    const movies = data.results;

    console.log(movies);

    createMovieCards(movies, upcomingContainer,page==1,"upcoming");
    loadingCount++;
    if(loadingCount >= 4){

    stopLoading();

    setLoading(false);

    preloader.style.opacity = "0";

    setTimeout(function(){

        preloader.style.display = "none";

    },600);

}

});

}



function loadAnimeRecommendations(id,page=1){

const query=`

query($id:Int,$page:Int){

Media(

id:$id,

type:ANIME

){

recommendations(

sort:RATING_DESC,

page:$page,

perPage:20

){

pageInfo{

lastPage

}



nodes{

mediaRecommendation{

id

title{

english
romaji

}

coverImage{

extraLarge

}

averageScore

seasonYear

}

}

}

}

}

`;

fetch("https://graphql.anilist.co",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

query:query,

variables:{

id:id,
page:page

}

})

})

.then(function(response){

return response.json();

})

.then(function(data){

currentView.totalPages =
data.data.Media.recommendations.pageInfo.lastPage;

const recommendations=

data.data.Media.recommendations.nodes

.map(function(item){

return item.mediaRecommendation;

})

.filter(function(show){

return show!=null;

})

.map(function(show){

return{

id:show.id,

poster_path:show.coverImage.extraLarge,

title:

show.title.english

||

show.title.romaji,

vote_average:

show.averageScore/10,

release_date:

(show.seasonYear||"Unknown").toString(),

anilist:true

};

});

createMovieCards(

recommendations,

recommendedContainer,
page==1,
"recommendations"

);

});

}
function loadRecommendations(movieID,page=1){
if(currentCategory=="anime"){

        loadAnimeRecommendations(movieID,page);

        return;

    }

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";

    const url =
`https://api.themoviedb.org/3/${currentAPI}/${movieID}/recommendations?api_key=${API_KEY}&page=${page}`;

    fetch(url)

    .then(function(response){

        return response.json();

    })

    .then(function(data){

    currentView.totalPages = data.total_pages;

        createMovieCards(data.results, recommendedContainer,page==1,"recommendations");

    });

}


function loadSuggestions(){

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";

    let endpoint;

    if(currentCategory=="movie"){

    endpoint="trending/movie/day?page=2";

}

else if(currentCategory=="tv"){

    endpoint="trending/tv/day?page=2";

}

else{

    const query = `

query{

Page(page:1,perPage:5){

media(

type:ANIME,

sort:POPULARITY_DESC

){

title{

english
romaji

}

}

}

}

`;

fetch("https://graphql.anilist.co",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

query:query

})

})

.then(function(response){

return response.json();

})

.then(function(data){

suggestionList.innerHTML="";

data.data.Page.media.forEach(function(show){

const p=document.createElement("p");

p.textContent=

show.title.english

||

show.title.romaji;

p.addEventListener("click",function(){

searchInput.value=this.textContent;

suggestionList.style.display = "none";

searchMovies();

});

suggestionList.appendChild(p);

});

});

return;

}

    const url=
`https://api.themoviedb.org/3/${endpoint}&api_key=${API_KEY}`;

    fetch(url)

    .then(function(response){

        return response.json();

    })

    .then(function(data){

        suggestionList.innerHTML="";

        data.results.slice(0,5).forEach(function(movie){

            const p=document.createElement("p");

            p.textContent=movie.title || movie.name;
            p.addEventListener("click",function(){

    searchInput.value=this.textContent;

    suggestionList.style.display = "none";

    searchMovies();

});

            suggestionList.appendChild(p);

        });

    });

}






function loadAnime(page=1){

const query = `

query($page:Int){

Page(page:$page,perPage:20){

media(

type:ANIME,

sort:POPULARITY_DESC

){

id

title{

english
romaji

}

coverImage{

extraLarge

}

averageScore

seasonYear

}

}

}

`;

fetch("https://graphql.anilist.co",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

    query,

    variables:{

        page:page

    }

})

})

.then(function(response){

return response.json();

})

.then(function(data){

const anime =

data.data.Page.media.map(function(show){

return{

id:show.id,

poster_path:show.coverImage.extraLarge,

title:
show.title.english
||
show.title.romaji,

vote_average:
show.averageScore/10,

release_date:
(show.seasonYear || "Unknown").toString(),

anilist:true

};

});

createMovieCards(

    anime,

    movieContainer,

    page==1,"popular"

);

});

}



function loadTV(page=1){

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";
    const url =
`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&without_genres=16&page=${page}`;

    fetch(url)

.then(function(response){

    return response.json();

})

.then(function(data){

    const movies = data.results;

    console.log(movies);

    createMovieCards(movies, movieContainer,page==1,"popular");


});

}


function searchMovies(page=1){



    const searchText = searchInput.value;
    if(page==1){

    pages.search=1;
    searchResultsContainer.scrollLeft=0;

}
    if(searchText.trim() == ""){

    suggestionList.innerHTML="";
    movieContainer.parentElement.style.display = "block";
    trendingContainer.parentElement.style.display = "block";
    topRatedContainer.parentElement.style.display = "block";
    nowPlayingContainer.parentElement.style.display = "block";
    upcomingContainer.parentElement.style.display = "block";
    resetRowScrolls();

    searchSection.style.display = "none";

    loadCategory();

    return;

}

console.log(searchText);
if(currentCategory=="anime"){

const query=`

query($search:String,$page:Int){

Page(page:$page,perPage:20){

pageInfo{

lastPage

}
media(

type:ANIME,

search:$search,

sort:SEARCH_MATCH

){

id

title{

english
romaji

}

coverImage{

extraLarge

}

averageScore

seasonYear

}

}

}

`;

fetch("https://graphql.anilist.co",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

query:query,

variables:{

search:searchText,
page:page

}

})

})

.then(function(response){

return response.json();

})

.then(function(data){

currentView.totalPages=data.data.Page.pageInfo.lastPage;

const results=

data.data.Page.media.map(function(show){

return{

id:show.id,

poster_path:show.coverImage.extraLarge,

title:

show.title.english

||

show.title.romaji,

vote_average:

show.averageScore/10,

release_date:

(show.seasonYear||"Unknown").toString(),

anilist:true

};

});



movieContainer.parentElement.style.display="none";
trendingContainer.parentElement.style.display="none";
topRatedContainer.parentElement.style.display="none";
nowPlayingContainer.parentElement.style.display="none";
upcomingContainer.parentElement.style.display="none";

heroTitle.style.display="none";
heroSubtitle.style.display="none";

searchBox.classList.add("search-mode");

searchSection.style.display="block";

if(results.length>0){

noResults.style.display="none";

createMovieCards(results,searchResultsContainer,page==1,"search");



loadAnimeRecommendations(results[0].id);

searchResultsContainer.parentElement.style.display="block";

searchResultsContainer.scrollLeft = 0;

recommendedContainer.parentElement.style.display="block";

/* Recommendation comes next */

}
else{

    if(page==1){

        searchResultsContainer.innerHTML="";

        recommendedContainer.innerHTML="";

        noResults.style.display="block";

        searchResultsContainer.parentElement.style.display="none";

        recommendedContainer.parentElement.style.display="none";

        loadSuggestions();

    }
    else{

        const oldButton =
        searchResultsContainer.querySelector(".load-more-card");

        if(oldButton){

            oldButton.remove();

        }

    }


}


});



return;

}

    const API_KEY = "f1f19a032c563adfb9d5bd034ace57e4";

const searchType =
currentCategory == "movie" ? "movie" : "tv";

currentAPI = searchType;

const url =
`https://api.themoviedb.org/3/search/${searchType}?api_key=${API_KEY}&query=${searchText}&page=${page}`;

fetch(url)

.then(function(response){

    return response.json();

})

.then(function(data){

    console.log(data.results);
    currentView.totalPages=data.total_pages;

    let results = data.results;



movieContainer.parentElement.style.display = "none";
trendingContainer.parentElement.style.display = "none";
topRatedContainer.parentElement.style.display = "none";
nowPlayingContainer.parentElement.style.display = "none";
upcomingContainer.parentElement.style.display = "none";

heroTitle.style.display = "none";

heroSubtitle.style.display = "none";

searchBox.classList.add("search-mode");

searchSection.style.display = "block";





if(results.length>0){

    noResults.style.display="none";

    createMovieCards(results, searchResultsContainer,page==1,"search");

    loadRecommendations(results[0].id);
    searchResultsContainer.parentElement.style.display = "block";

recommendedContainer.parentElement.style.display = "block";

noResults.style.display = "none";

}

else{

    if(page==1){

        searchResultsContainer.innerHTML="";

        recommendedContainer.innerHTML="";

        noResults.style.display="block";

        searchResultsContainer.parentElement.style.display="none";

        recommendedContainer.parentElement.style.display="none";

        loadSuggestions();

    }
    else{

        const oldButton =
        searchResultsContainer.querySelector(".load-more-card");

        if(oldButton){

            oldButton.remove();

        }

    }


}

});

}

searchButton.addEventListener("click",function(){

    suggestionList.style.display="none";

    suggestionList.style.display = "none";

    if(firstSuggestion!=""){

    searchInput.value = firstSuggestion;

}



searchMovies();


});


function loadCategory(){

pages = {

    popular:1,

    trending:1,

    topRated:1,

    nowPlaying:1,

    upcoming:1






};

    if(currentCategory == "movie"){

        loadMovies();
        loadTrending();
        loadTopRated();
        loadNowPlaying();
        loadUpcoming();

    }

    else if(currentCategory == "tv"){

        loadTV();
        loadTrending();
        loadTopRated();
        loadNowPlaying();
        loadUpcoming();

    }

    else{

        loadAnime();
        loadTrending();
        loadTopRated();
        loadNowPlaying();
        loadUpcoming();

    }

}












/*movieCards.forEach(function(card){

    card.addEventListener("click", function(){

        const index = card.dataset.index;

        showMovie(movies[index]);

        popup.style.display = "flex";

        setTimeout(function(){

            popupBox.classList.add("show");

        },10);

    });

});*/



closeButton.addEventListener("click", function(){

    popupBox.classList.remove("show");

    setTimeout(function(){

        popup.style.display = "none";
        document.body.style.overflow = "auto";

    },300);

});


backButton.addEventListener("click", function(){

    searchInput.value = "";
    suggestionList.innerHTML="";




    noResults.style.display="none";

    searchSection.style.display = "none";

    movieContainer.parentElement.style.display = "block";
    trendingContainer.parentElement.style.display = "block";
    topRatedContainer.parentElement.style.display = "block";
    nowPlayingContainer.parentElement.style.display = "block";
    upcomingContainer.parentElement.style.display = "block";
    resetRowScrolls();

    selectedGenres=[];

    selectedFilters.innerHTML="";



    selectedYear="";

    selectedLanguage="";

    selectedRating = "";
selectedPlatform = "";


languageModal.scrollTop = 0;
ratingModal.scrollTop = 0;
platformModal.scrollTop = 0;

if(yearButton){

    yearButton.textContent="Year";

    yearButton.classList.remove("selected-genre");

}

if(ratingButton){

    ratingButton.textContent = "Rating";

    ratingButton.classList.remove("selected-genre");

}

if(platformButton){

    platformButton.textContent = "Platform";

    platformButton.classList.remove("selected-genre");

}

    heroTitle.style.display = "block";

heroSubtitle.style.display = "block";

searchBox.classList.remove("search-mode");

    loadCategory();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});



searchInput.addEventListener("keydown",function(event){

    if(event.key == "Enter"){

    suggestionList.style.display = "none";

    if(firstSuggestion!=""){

    searchInput.value = firstSuggestion;

}



searchMovies();



    }

});

document.addEventListener("keydown",function(event){

    if(event.key == "Escape"){

        popupBox.classList.remove("show");

        setTimeout(function(){

            popup.style.display="none";
            document.body.style.overflow = "auto";

        },300);

    }

});



popup.addEventListener("click",function(event){

    if(event.target == popup){

        popupBox.classList.remove("show");

        setTimeout(function(){

            popup.style.display="none";
            document.body.style.overflow = "auto";

        },300);

    }

});

showAllCast.addEventListener("click",function(){

    showAllActors = !showAllActors;

    updateCast();

});


searchInput.addEventListener("input", function(){

    clearTimeout(searchDebounce);

    const text = searchInput.value.trim();

    if(text.length < 2){

        searchAutocomplete.style.display = "none";
        searchAutocomplete.innerHTML = "";

        return;

    }

    searchDebounce = setTimeout(function(){

        loadSearchSuggestions(text);

    },300);

});

function loadSearchSuggestions(query){

    if(currentCategory=="anime"){

        loadAnimeSearchSuggestions(query);

    }

    else{

        loadTMDBSearchSuggestions(query);

    }

}


async function loadTMDBSearchSuggestions(query){

const API_KEY="f1f19a032c563adfb9d5bd034ace57e4";

    const response = await fetch(

`https://api.themoviedb.org/3/search/${currentCategory}?api_key=${API_KEY}&query=${encodeURIComponent(query)}`

    );

    const data = await response.json();

    showAutocomplete(data.results.slice(0,5),query);


}

function showAutocomplete(results,query){

    searchAutocomplete.innerHTML = "";

    if(results.length==0){

    searchAutocomplete.style.display="none";

    if(!correctingSearch){

        correctingSearch=true;

        correctSearch(query);



    }

    return;

}

    results.forEach(function(item){

        const div=document.createElement("div");

        div.className="autocomplete-item";

        div.textContent=item.title || item.name;

        div.onclick=function(){

            searchInput.value=item.title || item.name;

            searchAutocomplete.style.display="none";

            suggestionList.style.display = "none";

            searchMovies();

        };

        searchAutocomplete.appendChild(div);

    });

    searchAutocomplete.style.display="block";

}

document.addEventListener("click",function(event){

    if(!searchBox.contains(event.target)){

        searchAutocomplete.style.display="none";

    }

});

async function loadAnimeSearchSuggestions(query){

    const response = await fetch(
        "https://graphql.anilist.co",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                query:`
                query($search:String){

                    Page(perPage:5){

                        media(

                            search:$search,

                            type:ANIME

                        ){

                            title{

                                romaji
                                english

                            }

                        }

                    }

                }
                `,

                variables:{
                    search:query
                }

            })

        }
    );

    const data=await response.json();

    const results=data.data.Page.media;

    searchAutocomplete.innerHTML="";

    if(results.length==0){

    searchAutocomplete.style.display="none";

    if(!correctingSearch){

        correctingSearch=true;

        correctSearch(query);





    }

    return;

}

    results.forEach(function(item){

        const title=item.title.english || item.title.romaji;

        const div=document.createElement("div");

        div.className="autocomplete-item";

        div.textContent=title;

        div.onclick=function(){

            searchInput.value=title;

            searchAutocomplete.style.display="none";

            suggestionList.style.display = "none";

            searchMovies();

        };

        searchAutocomplete.appendChild(div);

    });

    searchAutocomplete.style.display="block";

}


async function correctSearch(query){

    const response = await fetch("https://moviefinder-j67d.onrender.com/correct-search",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            query:query,
            category:currentCategory

        })

    });

    const data=await response.json();

    correctingSearch=false;

    if(data.title.toLowerCase()!=query.toLowerCase()){

        loadSearchSuggestions(data.title);





    }

}


categoryButtons.forEach(function(button){

    button.addEventListener("click",function(){



        categoryButtons.forEach(function(btn){

            btn.classList.remove("active");

        });

        button.classList.add("active");

        currentCategory = button.dataset.type;
        loadingCount = 0;
        startLoading();

        setLoading(true);
        showAllGenres=false;

        genrePage.style.display = "none";



yearModal.style.display = "none";

yearOverlay.style.display = "none";

selectedGenres=[];

selectedYear="";

selectedLanguage="";
selectedRating="";
selectedPlatform="";

selectedFilters.innerHTML="";

yearInput.value="";

yearError.style.display="none";

loadGenres();

        changeTheme(currentCategory);
        window.scrollTo({
    top: 0,
    behavior: "smooth"
});

if(currentCategory == "movie"){

    currentAPI = "movie";

    nowPlayingTitle.textContent = "Now Playing";
    upcomingTitle.textContent = "Upcoming";

}

else if(currentCategory == "tv"){

    currentAPI = "tv";

    nowPlayingTitle.textContent = "Airing Today";
    upcomingTitle.textContent = "Kids";

}

else{

    currentAPI = "anime";

    nowPlayingTitle.textContent = "Airing Today";
    upcomingTitle.textContent = "Upcoming";

}

searchInput.value="";
selectedRating="";

searchResultsContainer.scrollLeft = 0;
searchResultsContainer.innerHTML="";
recommendedContainer.innerHTML="";

searchSection.style.display="none";

suggestionList.innerHTML = "";

noResults.style.display = "none";

searchResultsContainer.innerHTML = "";

movieContainer.parentElement.style.display="block";
trendingContainer.parentElement.style.display="block";
topRatedContainer.parentElement.style.display="block";
nowPlayingContainer.parentElement.style.display="block";
upcomingContainer.parentElement.style.display="block";

heroTitle.style.display = "block";

heroSubtitle.style.display = "block";

searchBox.classList.remove("search-mode");

movieContainer.scrollLeft = 0;
trendingContainer.scrollLeft = 0;
topRatedContainer.scrollLeft = 0;
nowPlayingContainer.scrollLeft = 0;
upcomingContainer.scrollLeft = 0;


searchResultsContainer.scrollLeft = 0;
recommendedContainer.scrollLeft = 0;
loadingCount = 0;

loadCategory();

    });




});


detailsBackButton.addEventListener("click",function(){
trailerContainer.innerHTML = "";
aiOverviewBox.textContent ="";
aiOverviewBox.style.display = "none";
aiOverviewBtn.textContent ="✨  AI Insight →";
    detailsOverlay.scrollTop = 0;
    characterScroll.scrollLeft = 0;
if(currentCategory=="anime" && animeHistory.length>0){

    const previousAnime = animeHistory.pop();

    showAnime(previousAnime);

    return;

}

//seasonContainer.innerHTML = "";
if(openedSeason != null){

    const openedList = document.getElementById("season" + openedSeason);

    if(openedList){

        openedList.innerHTML = "";

    }

}

openedSeason = null;
episodePopup.style.display = "none";

    detailsOverlay.style.display = "none";

    document.body.style.overflow = "auto";

});

document.getElementById("popularMore").addEventListener("click",function(){

    pages.popular++;

    if(currentCategory=="movie"){

        loadMovies(pages.popular);

    }

    else if(currentCategory=="tv"){

        loadTV(pages.popular);

    }

    else{

        loadAnime(pages.popular);

    }

});

document.getElementById("trendingMore")

.addEventListener("click",function(){

    pages.trending++;

    loadTrending(pages.trending);

});

document.getElementById("topRatedMore")

.addEventListener("click",function(){

    pages.topRated++;

    loadTopRated(pages.topRated);

});

document.getElementById("nowPlayingMore")

.addEventListener("click",function(){

    pages.nowPlaying++;

    loadNowPlaying(pages.nowPlaying);

});

document.getElementById("upcomingMore")

.addEventListener("click",function(){

    pages.upcoming++;

    loadUpcoming(pages.upcoming);

});

async function generateAIOverview(){

    aiOverviewBtn.disabled = true;

    aiOverviewBtn.textContent = "Generating...";

    const response = await fetch("https://moviefinder-j67d.onrender.com/overview",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            title:
currentDetails.title ||
currentDetails.name ||
currentDetails.english ||
currentDetails.romaji,

            year:
(
currentDetails.release_date ||
currentDetails.first_air_date ||
currentDetails.seasonYear ||
""
).toString().substring(0,4),

            overview:
currentDetails.overview ||
currentDetails.description,

            genres: currentDetails.genres
.map(function(genre){

    return typeof genre === "string"
        ? genre
        : genre.name;

})
.join(" • ")



        })
    });

    const data = await response.json();

    aiOverviewBox.textContent = data.overview;

aiOverviewBox.style.opacity = "0";
aiOverviewBox.style.display = "block";

setTimeout(function(){

    aiOverviewBox.style.opacity = "1";

},10);



    aiOverviewBtn.textContent = "✨ AI Overview:";

    aiOverviewBtn.disabled = false;

}




loadMovieGenres();

loadTVGenres();

loadAnimeGenres();

loadLanguages();


changeTheme(currentCategory);
loadMovies();

loadTrending();

loadTopRated();

loadNowPlaying();

loadUpcoming();

