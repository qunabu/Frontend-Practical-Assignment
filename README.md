### Frontend Practical Assignment

#### Introduction

This repository is based on unejected [create-react-app](https://github.com/facebook/create-react-app)

#### Npm commands

##### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

<p align='center'>
<img src='https://cdn.rawgit.com/marionebl/create-react-app/9f62826/screencast-error.svg' width='600' alt='Build errors'>
</p>

##### `npm test` or `yarn test`

Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://facebook.github.io/create-react-app/docs/running-tests)

##### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

#### The task

We will ask you to prepare an application and use control version tool, preferably github
repository, to track the progress of steps you have took to finish this assignment.
Create a simple web user interface which connects with NBP web API ( http://api.nbp.pl/ )
Your application should contain:
* List of favourite currencies, which user wants to follow
* Possibility to add currency to the list
* Possibility to remove one or all currencies from the list
Deliverable solution should be build with:
* React components (using redux will be a plus)
* Use ES2015
* Tests in framework of your choice
* Setup instructions in README file

Example
User wants to follow euro and dollar exchange rates. User adds these 2 currencies to the
‘favourites’ list. Currencies appear on the list. User should be able to remove currencies from
the list (one or all).
NOTE: We assume, that fetched currency rate is up-to-date, for this assignment we do not
require any constant refreshing.