'use strict';

var fs = require('fs');
var compiler = require('vueify').compiler;

/**
 * Vue Brunch
 * Adds support to Brunch for pre-compiling single file Vue components.
 *
 * @version 1.2.0
 * @author Nathaniel Blackburn <support@nblackburn.uk> (http://nblackburn.uk)
 */
class VueBrunch {

    constructor(config) {
        this.config = config && config.plugins && config.plugins.vue || {};
    }

    /**
     * Compile a component into a string.
     *
     * @param {object} file
     *
     * @return {promise}
     */
    compile(file) {

        this.styles = Object.create(null);

        if (this.config) {
            compiler.applyConfig(this.config);
        }

        compiler.on("style", (args) => {
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

    onCompile(files, assets) {
        if (this.config.extractCSS) {
            this.extractCSS();
        }
    }

    extractCSS() {
        var that = this;
        var outPath = this.config.out || this.config.o || 'bundle.css';
        var css = Object.keys(this.styles || [])
            .map(function (file) {
                return that.styles[file].replace(/(\/\*.*)stdin(.*\*\/)/g, "$1" + file + "$2")
            })
            .join('\n');

        if (typeof outPath === 'object' && outPath.write) {
            outPath.write(css);
            outPath.end();
        } else if (typeof outPath === 'string') {
            fs.writeFile(outPath, css);
        }
    }
}

VueBrunch.prototype.extension = 'vue';
VueBrunch.prototype.type = 'template';
VueBrunch.prototype.brunchPlugin = true;

module.exports = VueBrunch;
