[![License](https://img.shields.io/npm/l/vue-github.svg?style=flat)](https://github.com/harps116/vue-github/blob/master/LICENSE.md)

## Installation

### NPM

`npm i vue-github`

### Yarn

`yarn add vue-github`

## Dependencies

Insert an octicons.css file in your html file to load the icons.

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.min.css"
/>
```

## Usage

Register the component globally in your main javascript file.

```javascript
import Vue from "vue";
import VueGithub from "vue-github";

Vue.use(VueGithub);
```

Check out the [demo](./demo/src/main.js) in this repo.

In your template you can now use html like this to render the activity feed:

```html
<vue-github username="harps116" />
```

Props:

| name     | type   | required |
| -------- | ------ | -------- |
| username | String | true     | // this is your github username |

## License

This project is licensed under MIT License - see the [LICENSE](./LICENSE.md) file for details
