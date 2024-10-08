Foods - Learning Native JavaScript Project
==============================================

 The site covers essential JavaScript fundamentals, such as DOM manipulation, event handling, AJAX requests, and more.

Getting Started
---------------

To get started with the project, follow the steps below:

1.  Clone the repository:

bashCopy code

`git clone https://github.com/your-username/food-dist.git`

2.  Navigate to the project directory:

bashCopy code

`cd food-dist`

3.  Install the dependencies:

bashCopy code

`npm install`

Available Scripts
-----------------

In the project directory, you can run the following scripts defined in the `package.json` file:

### `json-server`

Runs the JSON server using the `db.json` file, which provides a mock API for the website's data.

bashCopy code

`npm run json-server`

### `start`

Watches the project files and starts the webpack development server.

bashCopy code

`npm start`

### `build`

Builds the project using webpack for production deployment.

bashCopy code

`npm run build`

Dependencies
------------

The project has the following dependencies:

*   **@babel/cli**: Babel command-line interface.
*   **@babel/core**: The core Babel compiler.
*   **@babel/preset-env**: Babel preset for compiling JavaScript to a compatible version based on specified environments.
*   **babel-loader**: Webpack loader for Babel.
*   **core-js**: Modular standard library for JavaScript.
*   **es6-promise**: A lightweight ES6 Promise polyfill.
*   **json-server**: Mock RESTful API server.
*   **nodelist-foreach-polyfill**: Polyfill for the `NodeList.forEach` method.
*   **webpack**: Module bundler.
*   **webpack-cli**: Command-line interface for Webpack.
