import {compiler} from 'vueify';

/**
 * Vue Brunch
 * Adds support to Brunch for pre-compiling single file Vue components.
 * 
 * @version 1.1.0
 * @author Nathaniel Blackburn <support@nblackburn.uk> (http://nblackburn.uk)
 */

class VueBrunch {
    
    constructor(config) {
        this.config = config && config.plugins && config.plugins.vue || {};
    }
    
    compile(file) {
        
        if (this.config) {
            compiler.applyConfig(this.config);
        }
        
        return new Promise((resolve, reject) => {
            
            compiler.compile(file.data, file.path, function (error, result) {
                
                if (error) {
                    reject(error);
                }
                
                resolve(result);
            });
        });
    }
}

VueBrunch.prototype.extension = 'vue';
VueBrunch.prototype.type = 'javascript';
VueBrunch.prototype.brunchPlugin = true;

module.exports = VueBrunch;
