document.querySelector('#back').addEventListener('click', function() {
    history.back();
});

document.querySelector('#home').addEventListener('click', function() {
    window.location.href = "/index.html";
});
