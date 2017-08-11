'use strict';

const fs = require('fs');
const compiler = require('vueify').compiler;

class VueBrunch {

  constructor(config) {
    this.config = config && config.plugins && config.plugins.vue || {};
    this.styles = Object.create(null);
  }

  /**
   * Compile a component into a string.
   *
   * @param {object} file
   *
   * @return {promise}
   */
  compile(file) {

    if (this.config) {
      compiler.applyConfig(this.config);
    }

    compiler.on('style', args => {
      this.styles[args.file] = args.style;
    });

    return new Promise((resolve, reject) => {
      compiler.compile(file.data, file.path, (error, result) => {

        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  }

  onCompile() {
    if (this.config.extractCSS) {
      this.extractCSS();
    }
  }

  extractCSS() {
    const that = this;
    const outPath = this.config.out || this.config.o || 'bundle.css';
    const css = Object.keys(this.styles || [])
      .map(file => that.styles[file].replace(/(\/\*.*)stdin(.*\*\/)/g, `$1${file}$2`))
      .join('\n');

    if (typeof outPath === 'object' && outPath.write) {
      outPath.write(css);
      outPath.end();
    } else if (typeof outPath === 'string') {
      fs.writeFileSync(outPath, css);
    }
  }
}

VueBrunch.prototype.brunchPlugin = true;
VueBrunch.prototype.type = 'template';
VueBrunch.prototype.extension = 'vue';

module.exports = VueBrunch;
