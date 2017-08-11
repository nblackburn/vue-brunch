'use strict';

const compiler = require('vueify').compiler;
const fs = require('fs');

class VueBrunch {

  constructor(config) {
    this.config = config && config.plugins && config.plugins.vue || {};
    this.styles = {};
  }

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
    var outPath = this.config.out || this.config.o || 'bundle.css';
    var css = Object.keys(this.styles || [])
      .map(file => this.styles[file])
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
