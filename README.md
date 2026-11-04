# Local Watch
#### Video Demo:  [Youtube](https://youtu.be/hcNa_64jS_Q)

### <ins> What is Local Watch ? </ins>
Local Watch is a movie and tv series tracking extension build using TMDB API and written in html and javascript you can add any media to your
watchlist and set it as plan to watch, watching, completed and build your own watchlist manually Local Watch will save it all on you device
locally.

### <ins> Structure </ins>
Local Watch has 3 html pages index.html which loads when you click on extension by default and shows all of you watchlist, search.html which
loads when any search is made through searchbox and displays search results fetched from TMDB, details.html loads when you click any media it
fetches details about that specific media and show it to you on details page.

### <ins> How to get you own API </ins>
Local Watch uses the TMDB API to retrieve media information. To use the extension, you need your own TMDB API Read Access Token.

1. Create an account on [TMDB](https://www.themoviedb.org/).
2. Visit the TMDB API [settings](https://www.themoviedb.org/settings/api) page.
3. Follow TMDB's instructions to request API access and obtain your API Read Access Token.
4. Open config.js and replace the placeholder token with your own token.
5. Save the file and reload the extension.

Important: Do not share your token or commit it to a public repository. Keep your token private.

### <ins> What each script does ?</ins>
#### 1. add.js
    This script adds functionality to add button in extension it uses event delegation to identify which button was exactly clicked and
    then fetches info about the media from the form and add it to your local watchlist.
#### 2. back_and_home.js
    This script adds functionality to back and home button at top left.
#### 3. close.js
    This script adds functionality to close button at top right corner
#### 4. config.js
    This script just stores your TMDB token so you dont have to manually enter it evrywhere.
#### 5. details.js
    This script fetches media's id and media's type from url and then fetch its details from TMDB and then build the details.html using
    the information it also checks if the media is in your watchlist or not and provides you option to remove or add it to your watchlist
    on details page only.
#### 6. displaywatchlist.js
    This script fetches your watchlist from storage and builds the index.html page based on filters selected from navbar.
#### 7. remove.js
    This script gives functionality to remove button on details.html so you can remove a media from your watchlist.
#### 8. search_result.js
    This script builds search.html using the information provided by searchbox.js.
#### 9. searchbox.js
    This script adds functionality to searchbox in extension it takes string as a input and fetches all matching media from TMDB and provide that data to search_result.js to display on search.html.
#### 10. statusfilter.js
    This is one of the filter script helps to filter out results based on status of media in your watchlist.
#### 11. tags.js
    This is the second filtering script which gives functionality to tags which helps in filtering media based on their type.
#### 12. updatestatus.js
    This script gives feature of updating the status of any media in your watchlist.

### <ins> Storing data </ins>
Local Watch uses 2 methods of storing diffrent data one session storage for temporary data such as result of searches, Local watch stores so when
you use back button it dont have to always fetch info from TMDB again and again second it chrome.storage.local for permanent data such as users
watchlist.

### <ins> Styling </ins>
styling is done mostly using bootstrap navbar and cards have been borrowed from bootstrap 3d buttons are borrowed from [joshwcomeau](https://www.joshwcomeau.com/animation/3d-button/) and chatgpt was also used for helping in setting up layout.
