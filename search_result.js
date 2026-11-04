// add result to page
function displayResults() {
    // retrive search results from browser
    chrome.storage.local.get("watchlist", function(result) {
        let watchlist = result.watchlist || [];
        let results = JSON.parse(sessionStorage.getItem("results")) || [];
        let media = sessionStorage.getItem("media");

        if (!media || media === "all") {
            media = ["movie", "tv"];
        } else {
            media = [media];
        }
        let html = '';
        for (let result of results) {
            if (media.includes(result["media_type"]) && result["media_type"] != "person") {
                let type = "title";
                if (result["media_type"] == "tv")
                    type = "name";
                let poster = result["poster_path"];
                if (poster == null)
                    poster = "/assets/noimage.png";
                else
                    poster = `https://image.tmdb.org/t/p/w500/${poster}`;

                let button_type;

                let watchlistItem = watchlist.find(item =>
                                        item.id === String(result["id"]) &&
                                        item.media_type === result["media_type"]
                                    );

                if (watchlistItem)
                {
                    button_type = `<select class="form-select" name="status">
                                        <option value="watching" ${watchlistItem.status === "watching" ? "selected" : ""}>
                                            Watching
                                        </option>
                                        <option value="plan to watch" ${watchlistItem.status === "plan to watch" ? "selected" : ""}>
                                            Plan to Watch
                                        </option>
                                        <option value="completed" ${watchlistItem.status === "completed" ? "selected" : ""}>
                                            Completed
                                        </option>
                                    </select>`;
                }
                else
                {
                    button_type = `<button type="submit" class="pushable">
                                        <span class="shadow"></span>
                                        <span class="edge"></span>
                                        <span class="front"> Add </span>
                                    </button>`;
                }

                html += `<div class="col-6">
                            <div class="card">
                                <a style="text-decoration: NONE; color: inherit" href="details.html?${result["media_type"]}=${result["id"]}"><img src=${poster} class="card-img-top" alt="poster"></a>
                                <div class="card-body">
                                    <h5 class="card-title"><a style="text-decoration: NONE; color: inherit" href="details.html?${result["media_type"]}=${result["id"]}">${result[type]}</a></h5>
                                    <form id="button_area">

                                        <input type="hidden" name="id" value="${result["id"]}">
                                        <input type="hidden" name="media_type" value="${result["media_type"]}">
                                        <input type="hidden" name="title" value="${result[type]}">
                                        <input type="hidden" name="poster_path" value="${result["poster_path"]}">

                                        ${button_type}
                                    </form>
                                </div>
                            </div>
                        </div>`;
            }
        }
        document.querySelector('#card_area').innerHTML = html;
    });
}

// call when page shown (to fix returning from back button case)
window.addEventListener('pageshow', function() {
    displayResults();
});

displayResults();
