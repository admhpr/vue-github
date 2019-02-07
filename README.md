[![License](https://img.shields.io/npm/l/vue-github.svg?style=flat)](https://github.com/harps116/vue-github/blob/master/LICENSE.md)

## Installation

`npm install --save vue-github`

## Dependencies

Insert an octicons.css file in your html file to load the icons.

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.min.css"
/>
```

## Usage

The most common use case is to register all the components globally.

```javascript
import Vue from "vue";
import VueGithub from "vue-github";

Vue.use(VueGithub);
```

In your template you can now use html like this to render the activity feed:

```html
<vue-github username="harps116" />
```

## License

This project is licensed under MIT License - see the [LICENSE](./LICENSE.md) file for details
