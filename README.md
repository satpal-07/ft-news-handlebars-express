# Financial website

A website made using handlebars (a server-side rendering technology). The website uses Financial Times developer API to search for articles and displaying teaser information as result.
## Tech Stack
*Node.js - JS Engine*

*Express.js - HTTP Server*

*Handlebars - template engine*


## Installation
Run following command
```
    npm install
```

## For running the server
NOTE: The server requires Financial Times developer API key to search for news, please acquire the developer API on https://developer.ft.com/

Once, API key is acquired, assign API key to "apiKey" variable in the config/default.json file or assign the API key to the "API_KEY" process environment variable when running the server

Run following command
```
    npm start
```

## Features completed
- Be responsive - TODO:
- Be accessible - No
- Have pagination - Yes
- Built using Javascript and node.js - Yes
- Not be reliant on client-side frameworks (i.e. Angular, React) or libraries like jQuery - Yes
- Uses Origami Components - No
- Progressively enhanced - No
- Deployed on Heroku - Yes
- Have a similar look and feel as ft.com - Yes
- Performs well over 3G networks - Yes
- Works offline - No