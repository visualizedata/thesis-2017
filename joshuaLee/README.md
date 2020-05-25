## Thesis App
This repository contains updates and notes for the visualiztion application

- [Prototype](https://thesis-app-neuralism.c9users.io/)
- [Hosted URL](http://joshua-tests.us-east-1.elasticbeanstalk.com/)
- [Presentation](https://github.com/neuralism/thesis-app/blob/master/presentation.pdf)

## Key Back End files

#### [parser.js](https://github.com/neuralism/thesis-app/blob/master/parser.js)
- Parses player log file based on specificed ruleset into JSON file
- Requests item names from [NotAion API](http://api.notaion.com/) (per 0.5s) as they are not in the log file
- Checks one-word names against list of monsters with one-word names

#### [monster.js](https://github.com/neuralism/thesis-app/blob/master/monster.js)
- Generates a [JSON file](https://raw.githubusercontent.com/neuralism/thesis-app/master/lists/single-name-monsters.json) containing a list of monsters with one-word names 
- Monster names in Aion typically contain more than one word
- Which allows the parser differentiate between player and non-player characters
- However, there are some monsters with one-word names
- Hence it's necessary for the parser to run through this list
- The JSON file is generated from a [list](https://github.com/neuralism/thesis-app/blob/master/lists/monster-list.txt) containing every monster's name
- The list contains 42,600 names manually scraped from [aiondatabase.net](http://aiondatabase.net)

#### [insert.js](https://github.com/neuralism/thesis-app/blob/master/insert.js)
- Inserts processed log file into Mongo database

#### [server.js](https://github.com/neuralism/thesis-app/blob/master/server.js)
- Listens for requests and queries database for a slice of the data
- Transforms requested data and sends it over to the client

## Key Front End Files

#### [app.js](https://github.com/neuralism/thesis-app/blob/master/client/js/app.js)
- Main JavaScript code for the visualization

#### [main.css](https://github.com/neuralism/thesis-app/blob/master/client/css/main.css)
- Main CSS file generated using Sass
 
#### [index.html](https://github.com/neuralism/thesis-app/blob/master/client/index.html)
- Main index file
