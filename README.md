# BlackJack

### Description
Small BlackJack game that utilizes Python as its back-end and React for the front-end.  Communication between the browser and the back-end occurs through a Flask API.  

Currently not stateful, so the application only supports a single user/tab/browser at a time.

### Usage:

From within the root application folder, run `python3 app.py` to start the Python3 API and back-end.
Navigate to the "react_frontend" folder and run `npm start` to start React. 

Visit application on localhost:3000

### Misc. notes to self:

Next items to do:

- Stateful so that it can be run by multiple users/browsers at once
- Hosting
- dockerize
- generate requirements.txt
- npm production state

CSS heavily modified from here: https://github.com/rajshekhar26/cleanfolio-minimal