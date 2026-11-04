// select searchbox
let search = document.querySelector('form');


search.addEventListener('submit', function(event) {
    // stop refresh
    event.preventDefault();
    // get media name
    let media = search.querySelector('input').value
    // request server for raw data
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_TOKEN}`
        }
    };

    fetch(`https://api.themoviedb.org/3/search/multi?query=${media}&include_adult=false&language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => {
            let results = res["results"];
            console.log(results);
            // stores result in temporary browser storage
            sessionStorage.setItem("results", JSON.stringify(results));
            sessionStorage.setItem("media", "all");
            window.location.href = "/search.html";
        })
        .catch(err => console.error(err));
});
