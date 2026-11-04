let params = new URLSearchParams(window.location.search);
let movie_id = params.get("movie");
let tv_id = params.get("tv");

let id = movie_id;
let type = "movie";
let type_title = "title";

let data;

if (tv_id)
{
  id = tv_id;
  type = "tv";
  type_title = "name";
}
console.log(id);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`
  }
};


fetch(`https://api.themoviedb.org/3/${type}/${id}?language=en-US`, options)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    data = res;
    displayResults(data);
        })
  .catch(err => console.error(err));

function displayResults(data) {
  chrome.storage.local.get("watchlist", function(result) {
      let watchlist = result.watchlist || [];
      let watchlistItem = watchlist.find(item =>
                          item.id === String(id) &&
                          item.media_type === type
                      );

      let button_type;

      if (watchlistItem)
      {
          button_type = ` <div class="d-flex align-items-center gap-2">
                              <select class="form-select" name="status">
                                  <option value="watching" ${watchlistItem.status === "watching" ? "selected" : ""}>
                                      Watching
                                  </option>
                                  <option value="plan to watch" ${watchlistItem.status === "plan to watch" ? "selected" : ""}>
                                      Plan to Watch
                                  </option>
                                  <option value="completed" ${watchlistItem.status === "completed" ? "selected" : ""}>
                                      Completed
                                  </option>
                              </select>
                              <button type="button" class="pushable flex-shrink-0 remove-button">
                                  <span class="shadow"></span>
                                  <span class="edge"></span>
                                  <span class="front"> Remove </span>
                              </button>
                            </div>`;
      }
      else
      {
          button_type = `<button type="submit" class="pushable">
                              <span class="shadow"></span>
                              <span class="edge"></span>
                              <span class="front"> Add </span>
                          </button>`;
      }
      let html = `<img alt="poster" src="https://image.tmdb.org/t/p/w500/${data["poster_path"]}">
              <h1>${data[type_title]}</h1>
              <h3>${data["overview"]}</h3>
              <form id="button_area">
                <input type="hidden" name="id" value="${data["id"]}">
                <input type="hidden" name="media_type" value="${type}">
                <input type="hidden" name="title" value="${data[type_title]}">
                <input type="hidden" name="poster_path" value="${data["poster_path"]}">

                ${button_type}
              </form>
            `;

  document.querySelector('#card_area').innerHTML = html;
  });
}



