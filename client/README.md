# menv-messageboard client (WIP) 
 
 ## generating the vue project
**You can skip this part**, the "*client*" has already been created. Still, if you wanna know how that happened, read on!

 To install a fresh instance of a vue project with the way we created it in the first place, get into your preferred project folder and run the following command.
 ```
 npx @vue/cli create <project-name>
 ```
*This is the vue-cli v3.0. (Check [here](https://cli.vuejs.org/guide/) for the most up to date vue-cli information.) In the presets menu, select the following for each step. Hit spacebar to select stuff.*
* **Please pick a preset:** Manually select features.
* **Check the feature needed for your project:** Router, Linter / Formatter
* **Pick a linter / formatter config:** ESLint + Airbnb config
* **Pick additional lint features:** Lint on save, Lint and fix on commit   
* **Where do you prefer placing config for Babel, PostCSS,ESLint, etc.?** In package.json
* **Save this as a preset for future projects** y or n (up to you)

## project setup (run this once to install necessary dependencies)
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
