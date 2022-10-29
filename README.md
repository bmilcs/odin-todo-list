# Odin Project #11: Todo List

Welcome to Bryan Miller's Todo List Project, the [eleventh assignment](https://www.theodinproject.com/lessons/node-path-javascript-todo-list) within the Odin Project curriculum. The goal of this repo is to practice the following skill sets:

- SOLID Design Principles
- Vanilla JavaScript
  - Nested objects/arrays
  - Array methods: `.reduce`, `.map`, `.filter`, `.some`
  - `localStorage`
  - `Object.assign()`
  - ES6 Modules
- `npm` & `webpack`
  - `date-fns`
  - `production` & `development` configs
- SASS

## Summary

Completing this project was a great all-around experience and provided opportunities to practice skillsets that were touched upon in earlier Odin Project lessons but never put into practice. Here are some of the highlights and struggles that I overcame in developing this simple to do list:

### Objects & Arrays

Objects inside of arrays... inside of objects... inside of arrays! The data structure that I went with might've been overkill, but it really nailed home how powerful Objects & Array methods are, particularly `.reduce` & `.map`.

> The Data Structure

```js
Storage [] // master array, used to save/load data from localStorage (./modules/storage.js)
  Project {} // project objects instantiated with the Project constructor (./modules/project.js)
    name: "Project name"
    tasks: [] // tasks array that housed:
      Task {} // task objects instantiated with the Task constructor (./modules/task.js)
        description: "Complete todo list"
        dueDate: "2025-01-01"
        getDescription()
        ...
```

### What is `containerize`?

Containerize is a utility module that I came up with for quickly creating & filling `div` containers. As this project progressed, I baked in functionality to make it more robust. Here's how it works:

- **Returns** an assembled container element, ready to be appended to the DOM
- **1st Argument**: the container to be filled.
  - Accepts an existing element as the parent container element
  - Or a space-separated list of classes, that are used to create a `div` for the container element.
- **All other arguments**: child elements that are appended the above container
  - Accepts elements & arrays of elements
- **What it does**: Establishes what the container to be filled is & then loops through the rest of the arguments, appending it to that container.

```js
// create a new div container with classes "div-class1" & "wrapper"
// and appendChild(pElement) and appendChild(buttonElement)
const awesomeConainer = containerize(
  "div-class1 wrapper",
  pElement,
  buttonElement
);

// Outputs:
// <div class="div-class1 wrapper">
//   <p></p>
//   <button></button>
// </div>

const evenBetterContainer = containerize(
  existingButtonElement,
  h2Element
  arrayOfElements,
);
```

### Local Storage doesn't respect prototypes.

When setting and getting items from `localStorage`, you lose an object's constructor function and methods defined on it's prototype. In order to regain that functionality after retrieving from `localStore`, the following steps were used:

1.  `localStorage.getItem()` retrieves the master Storage array in JSON format
2.  `JSON.parse` then converts the JSON to regular JavaScript, void of any methods, constructors or prototype.
3.  Nested `.map` method calls were then used to dive into the data structure and convert it into a functional final product:

    1. `importedData` contains an array of project objects, which are mapped to `new Project()` objects using `Object.assign()`
    2. Before returning the restored `Project` objects, each `Task` in the `.tasks` array needed to be recreated using the `Task` constructor. A temporary variable `tasksWithPrototype` is then assigned to the new `Project.tasks` key.
    3. The grossly named final result, `reassembledArrayofProjectObjects`, is pushed to the Storage array for rendering.

### Date Filtering & SOLID Design to the Rescue

Date filtering using the npm library `date-fns`. This was a challenging task, because I needed to make sure my DOM prep & rendering functions would work with a new data set, separate from the master `Storage` array. SOLID design principles were a godsend, allowing me to reuse most of the existing code to render the filtered data. Within the `Storage` module, `getTasksFilteredByDate` does all of the dirty work:

1.  Similar to the `localStorage` strategy, I opted to recreate the original data structure using filtered tasks only. `reduce()` saved the day, allowing me to cherry pick and build a custom array as my output.
2.  Using `filter`, task date comparisons are made and only those passing the date restrictions are returned.
    - For projects that have no tasks within the date constraints, I simply returned the current iteration of `filteredData`, instead of adding an empty project object.
    - For projects with tasks that match the criteria, I instantiate a new object that resembled the same data structure used everywhere else. The spread operator came in handy for filling the `tasks` key with an array of `Task` objects.
    - The `filteredProject` is then passed to `filteredData` (otherwise known as `previousValue` or `Storage`) for the next iteration.

### Mistakes were Made

Instead of making life easy with a `dataset` attribute to link DOM elements to their corresponding `Project` and `Task` objects, I opted to practice with `Element` methods to try something new (`.closest`, `.firstChild`, `.children`, `.parentElement`, etc.) Project Names & task descriptions were used to find their corresponding indexes within the `Storage` array. In hindsight, it made things more time consuming and probably wasn't worth the effort.

SOLID design is challenging and my objects aren't as loosely coupled as I had hoped for. In the interest of saving time & moving forward, I opted to stop striving for 'perfection' with this todo list and take the lessons learned into my next project. All in all, this was an awesome learning experience. Thank you Odin Project!

## Links

- [Live Demo](https://bmilcs.github.io/odin-todo-list/)
- [My Odin Project Progress](https://github.com/bmilcs/odin-project)

## Screenshots

In progress...

## Deployment

```sh
# clone repo
git clone https://github.com/bmilcs/odin-todo-list.git

# install dev dependencies
cd odin-restaurant-page
npm install --save-dev webpack webpack-cli webpack-merge webpack-dev-server html-webpack-plugin style-loader css-loader sass-loader sass

# install production dependencies
npm install --save date-fns

# live preview
npm run start
```
