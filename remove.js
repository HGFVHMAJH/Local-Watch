document.querySelector('#card_area').addEventListener('click', function (event) {
    if (!event.target.closest('.remove-button')) return;
    let form = event.target.closest('form');

    let id = form.querySelector('input[name="id"]').value;
    let type = form.querySelector('input[name="media_type"]').value;

    chrome.storage.local.get("watchlist", function(result) {
        let watchlist = result.watchlist || [];
        // filter media out from watchlist
        watchlist = watchlist.filter(item =>
            !(item.id === id && item.media_type === type)
        );
        chrome.storage.local.set({ watchlist: watchlist }, function() {
            displayResults(data);
        });
    });
});
