# Gulp Compiler
Gulpfile setup for Javascript ES6 compiling, SCSS and images handling.

## Installation

- [X] [Check Your have `Node JS` or not?](#check-node)
- [X] [If don't have First install `Node JS`](https://nodejs.org/en/download)
- [X] [Clone this Repository](#clone-repository)
- [X] [Run Command in terminal](#terminal-command)
- [X] [Configure Assets Paths in `gulpfile.js` ](#configure-assets-paths-of-gulpfile)
- [X] [Run Compiler](#run-compiler)

### Check Node

Check your **Node Js** version.

```cmd
node -v
```

### Clone Repository

Clone this **Gulp Compiler** repository using this command

```cmd
git clone https://github.com/rajubepary/gulp-compiler
```

### Terminal Command

- Install Gulp CLI Globaly

```cmd
npm install --global gulp-CLI
```

- Install Node Modules

```cmd
npm install
```

- Check Gulp Version

```cmd
gulp -v
```

### Configure Assets Paths of Gulpfile

```js
const paths = {
  server: {
    baseFolder: "./",
  },
  style: {
    srcFile: "src/scss/style.scss", //add scss source file url
    watch: "src/scss/**/*.scss", //add scss warch url
    destation: "./assets/css/", //add compiled css file destation url
    mapUrl: "./", //add compiled css file map destation url
  },
  js: {
    srcFile: "script.js", //add js source file url
    file: "script", //add js source file name without extention
    folder: "src/js/", //add js source folder url
    watch: "src/js/**/*.js", //add js warch url
    destation: "./assets/js/", //add compiled js file destation url
    mapUrl: "./", //add compiled js file map destation url
  },
  images: {
    srcFile: "src/images/**/*", //add images source folder url
    watch: "src/images/**/*.*", //add images warch url
    destation: "./assets/images/", //add compiled images file destation url
  },
};
```

### Run Compiler

- Run **`css`** Compiler

```cmd
gulp css
```

- Run **`JavaScript`** Compiler
```cmd
gulp js
```

- Run **`images`** Compiler

```cmd
gulp images
```

- Run **`Default Compiler`** (all compiler in paraller way)
```cmd
gulp
```

- Run **`Watch Compiler`** (all compiler in paraller way with **`browser_sync`**) **`(Recommended)`** First run the `default compiler` to create all files then stop compilling press ```ctrl+c``` then run `watch compiler` only for first time
```cmd
gulp

gulp watch
```
## **Enjoy Compilling!**
