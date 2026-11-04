// update the status of media in watchlist when dropdown is changed
document.querySelector('#card_area').addEventListener('change', function(event) {
    if (!event.target.matches('select[name="status"]')) return;
    let form = event.target.closest("form");
    if (!form) return;
    let status = event.target.value;
    let id = form.querySelector('input[name="id"]').value;
    let type = form.querySelector('input[name="media_type"]').value;

    chrome.storage.local.get("watchlist", function(result) {
        let watchlist = result.watchlist || [];
        let watchlistItem = watchlist.find(item =>
                                    item.id === id &&
                                    item.media_type === type
                                );
        if (watchlistItem) {
            watchlistItem.status = status;
            chrome.storage.local.set({ watchlist: watchlist }, function() {
            if (window.location.pathname.endsWith("details.html")) {
                displayResults(data);
            }
            else if (window.location.pathname.endsWith("search.html"))
            {
                displayResults();
            }
            else
            {
                displayWatchList();
            }

        });
        }
    });
});
