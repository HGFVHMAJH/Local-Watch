function displayWatchList()
{

    chrome.storage.local.get("watchlist", function(result) {
        let html = '';
        let watchlist = result.watchlist || [];

        let media = sessionStorage.getItem("media");
        let filter = sessionStorage.getItem("filter");
        if(!filter)
            filter = "watching";

        if (!media || media === "all") {
            media = ["movie", "tv"];
        } else {
            media = [media];
        }

        for (let item of watchlist)
        {
            if (media.includes(item["media_type"]) && (filter === "all" || filter === item.status)){
                let poster = item["poster_path"];
                    if (poster == null)
                        poster = "/assets/noimage.png";
                    else
                        poster = `https://image.tmdb.org/t/p/w500/${poster}`;

                let button_type = `<select class="form-select" name="status">
                                            <option value="watching" ${item.status === "watching" ? "selected" : ""}>
                                                Watching
                                            </option>
                                            <option value="plan to watch" ${item.status === "plan to watch" ? "selected" : ""}>
                                                Plan to Watch
                                            </option>
                                            <option value="completed" ${item.status === "completed" ? "selected" : ""}>
                                                Completed
                                            </option>
                                        </select>`;

                html += `<div class="col-6">
                                <div class="card">
                                    <a style="text-decoration: NONE; color: inherit" href="details.html?${item["media_type"]}=${item["id"]}"><img src=${poster} class="card-img-top" alt="poster"></a>
                                    <div class="card-body">
                                        <h5 class="card-title"><a style="text-decoration: NONE; color: inherit" href="details.html?${item["media_type"]}=${item["id"]}">${item["title"]}</a></h5>
                                        <form id="button_area">

                                            <input type="hidden" name="id" value="${item["id"]}">
                                            <input type="hidden" name="media_type" value="${item["media_type"]}">

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

displayWatchList();
