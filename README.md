# Custom CLI for my React projects!

> This CLI is made for a quick dive into project development.

As a programmer, I find it useful to write code that automates repetitive tasks, which led me to develop the idea for this project.

In most of my projects, I use some libs/dependencies that are not included in React's default package, and it was a bit boring and time-consuming having to adjust my preferred dependencies and erase the initial template of the default package.

## Solution

As I learned about Command-line interfaces (CLI), I understood how React project configuration works, so I created a CLI that builds the default package and adds my preferences to it.

### Features:
- Start from scratch (quick start the project, without the need to manually remove React's default template)
- Typescript support (files are already in tsx format instead of jsx)
- Tailwind (Tailwind, PostCSS configured and ready to use)
- Prettier
- ESLint
- Axios

## How it works

At the moment, I prefer to run this code locally (as I'm  still thinking about a cool command-line to publish as an npm package, haha).
So if you find it useful (like to use the same default stack as I), You can clone this repository and run it in your terminal like this:
```
$ cd my-react-cli
$ npm link
```
And then in your preferred project folder, run (it will create a new project folder, so don't worry about your code scattered in your main folder):
```
$ my-react-project project_name
```
And you're ready to develop your new project! 
