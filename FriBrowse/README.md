This is FriBrowse, a minimalistic website for searching and storing bookmarks!

# Plans:
1. Add subfolders to bookmark manager.
2. Move off google api.
3. Remake the look while keeping the minimalistic theme.

# How to use with google search api. 
This program currently looks for a .env file in the same folder as the exported .exe file. Simply make a file with the name .env (nothing before the ".") and enter the following information: 
```.env
API_KEY = # your api key

SEARCH_ENGINE_ID = # your search engine id

PORT = # your desired port (To actually work with something other than 3000 you'll have to change the const at the top of bookmanager.js too)
```

Make a API_KEY and SEARCH_ENGINE_ID on https://console.cloud.google.com with google custom search api

Again, I plan to eliminate this step in the future, but other than google's confusing documentation it's actually quite simple.

# Can the website be used without a .exe or server?
Just replace the code calling the backend with localstorage. I have a backup of a version that does that so I can upload it if requested.  
