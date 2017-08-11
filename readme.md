# Vue Brunch

Adds support to Brunch for pre-compiling single file Vue components.

## Installation

For 2.x support, use the master branch...

```bash
npm install vue-brunch --save-dev
```

Once the plugin has been installed, you are all set.

## Usage

When ever you include a `.vue` file in your project, Brunch will automatically compile
and write the converted module into your applications script path.

### Extracting CSS

To extract the CSS into files, simply include to `extractCSS` option in your Brunch config like so...

```javascript
plugins: {
    vue: {
      extractCSS: true,
      out: '../public/styles/components.css'
    }
}
