
# Youtube Channel Bingo
Simple typescript react app to play bingo with random clips from a Youtube Channel. This project was created after watching a streamer create a bingo game using photoshop where we watched random 1 minute clips from his past streams. The bingo card was filled with actions that commonly happened during his streams like "Collab Stream", "He plays GTA5 with a mod he made", a "TTS message was totally irrelevant", or "Chat says Rigged". During the stream, I made this project to help automate the process.

Setup:
 - Add your YouTube Data API v3 key to the .env file (Get this from https://console.cloud.google.com/)
 - Open the project folder and run: `npm install`
 - Start the project with: `npm start`



## Things to know when playing

 - Game does not recognize when the player wins
 - This is not a multiplayer game
 - This is not properly coded/optimized (It was made only during his livestream and maybe an hour or two after)
 - If you receive an error when its fetching videos, you either didn't add your API key or you exceed YouTube's API quota (Quota can be found here: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas)

## Available Scripts

In the project directory, you can run: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see many lint errors in the console.
