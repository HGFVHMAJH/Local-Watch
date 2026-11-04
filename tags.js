let medias = ['all', 'movie', 'tv'];
// filters search result
for (let type of medias)
{
    document.querySelector(`#${type}`).addEventListener('click', function() {
        sessionStorage.setItem("media", type);
        window.location.reload();
    });
}
