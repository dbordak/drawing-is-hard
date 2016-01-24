# Drawing is Hard
## Auto-Evolving Pictionary
## http://drawingishard.online:3000

_Drawing is Hard_ is a party game in which participants use mobile devices as controllers to a central monitor.
Each player is given a weird prompt to draw, then take turns trying to guess the subject. The real subject is mixed with the proposed subjects, and players must guess the original prompt.
Players score 10 points for finding the correct prompt, and 5 points for every player that mistakenly chooses their submission.

Players can thumb submissions up or down for humor. At the end of the game, the highest rated submissions are added to the database as new prompts, thus causing the selection of prompts to evolve over time.

![](https://raw.githubusercontent.com/dbordak/drawing-is-hard/master/screenshots/draw.png)

![](https://raw.githubusercontent.com/dbordak/drawing-is-hard/master/screenshots/what_is_horse.png)

![](https://raw.githubusercontent.com/dbordak/drawing-is-hard/master/screenshots/vote.png)

This app is built on `socket.io`, using `node.js` on the backend and `mithril.js` on the front.

## Installing
```
npm install
cat init.sql | sqlite3 db.sqlite
node index.js
```
