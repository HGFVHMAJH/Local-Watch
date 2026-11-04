// filters watchlist
let statusFilter = document.querySelector("#status_filter");

// Restore previously selected filter
statusFilter.value = sessionStorage.getItem("filter") || "watching";

statusFilter.addEventListener('change', function(event) {
    let filter = event.target.value;
    sessionStorage.setItem("filter", filter);
    window.location.reload();
});
