// select the card area and listen for submit
document.querySelector('#card_area').addEventListener('submit', function (event) {
    event.preventDefault();
    // select the exact add button
    let form = event.target;
    if (!form.querySelector('button[type="submit"]')) return;

    let id = form.querySelector('input[name="id"]').value;
    let type = form.querySelector('input[name="media_type"]').value;
    let title = form.querySelector('input[name="title"]').value;
    let poster_path = form.querySelector('input[name="poster_path"]').value;

    chrome.storage.local.get("watchlist", function(result) {
        let watchlist = result.watchlist || [];

        // add media to watchlist

        watchlist.push({
            id: id,
            media_type: type,
            title: title,
            poster_path: poster_path,
            status: 'plan to watch'
        });
        chrome.storage.local.set({ watchlist: watchlist }, function() {
            if (window.location.pathname.endsWith("details.html")) {
                displayResults(data);
            } else {
                displayResults();
            }
        });
    });
});
// call display watch list or search result or display details when a button clicked in other js file
// add remove from watch list button in details page
