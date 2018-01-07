# Marvel Super Search

## Technologies
* [TypeScript](https://www.typescriptlang.org/)
* [Angular v5](https://angular.io/)
* [Official Marvel API](https://developer.marvel.com/docs)
* [Bootstrap v4](https://getbootstrap.com/)

## The Brief

Build a simple web app that allows you to search for something and then select a result to view using Typeahead. On selection of a search result, navigate to a new page and display the details of the result.

## My Approach

I first considered which data set to use, and comtemplated developing a backend. In the end I decided against building a backend as it didn't seem necessary for such a simple app, and there are a multitude of awesome data sources and APIs out there. I finally settled on the Marvel API as it is quite comprehensive and offers the ability to search for a Marvel character by the start of the character's name, which is ideal for this project.

I work with Angular on a daily basis, so most of this was familiar territory for me, but I work specifically with Ionic, which has some differences from pure Angular, and this occassionally caused some issues. I resolved most of them, but in the interest of time I had to cut a few corners to get meet the specification. 

Given more time I would refactor the search box component so that it doesn't make the call to the router in order to navigate to the details page, I think this should be handled by the search page. Also, I would implement a proper CanActivate guard for the details page to ensure that the user cannot navigate to the page without having first searched for and selected a character. Instead I implemented a check once the page is activated and navigated back to the home page if there is no selected character, but this is a bit of a hacky implementation.

In hindsight, I would have left all of the styling until last and classed that as post-MVP. I feel I wasted too much time on styling the app, thinking that I would have enough time to finish everything anyway, and then got caught short at the end.

I would also liked to have followed TDD for the project, but again in the interest of time I decided against it. Given more time I would write to retrospective unit and end-to-end tests using Jasmine and Protractor.

## <a name="install">Installation</a>

```
$ git clone https://github.com/treborb/MarvelSuperSearch.git
$ cd MarvelSuperSearch
$ npm install
```

## <a name="usage">Usage</a>

```
$ ng serve
$ open http://localhost:4200
```

Begin entering a Marvel character's name into the search box to see a list of results.

Select a result to see details of your selected character
