# menv-messageboard client 
 
 ## generating the vue project
**You can skip this part**, the "client" has already been created. Still, if you wanna know how that happened, read on!

 Get into your project folder and run the following command.
 ```
 npx @vue/cli create <project-name>
 ```
***in the presets menu, select the following for each step (hit spacebar to select mark stuff)***
* **Please pick a preset:** Manually select features.
* **Check the feature needed for your project:** Router, Linter / Formatter
* **Pick a linter / formatter config:** ESLint + Airbnb config
* **Pick additional lint features:** Lint on save, Lint and fix on commit   
* **Where do you prefer placing config for Babel, PostCSS,ESLint, etc.?** In package.json
* **Save this as a preset for future projects** y or n (up to you)

## project setup (run this once after pulling this project to install necessary dependencies)
```
npm install
```

### compiles and hot-reloads for development (run this during development)
```
npm run serve
```

### compiles and minifies for production
```
npm run build
```

### run your tests
```
npm run test
```

### lints and fixes files
```
npm run lint
```

### customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
