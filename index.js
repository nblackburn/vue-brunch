'use strict';

const compiler = require('vueify').compiler;

/**
 * Vue Brunch
 * Adds support to Brunch for pre-compiling single file Vue components.
 * 
 * @version 1.0.0
 * @author Nathaniel Blackburn <support@nblackburn.uk> (http://nblackburn.uk)
 */

class VueBrunch {
    
    constructor(config) {
        
        // Set the configuration.
        this.config = config && config.plugins && config.plugins.vue || {};
    }
    
    compile(file) {
        
        // Check we have a configuration.
        if (this.config) {
            
            // Apply the configuration to the compiler.
            compiler.applyConfig(this.config);
        }
        
        // Create a new promise.
        return new Promise((resolve, reject) => {
            
            // Compile the component.
            compiler.compile(file.data, file.path, function (error, result) {
                
                // Reject if any errors were thrown.
                if (error) {
                    return reject(error);
                }
                
                // Resolve if we are good.
                return resolve(result);
                
            });
            
        });
        
    }
    
}

VueBrunch.prototype.extension = 'vue';
VueBrunch.prototype.type = 'javascript';
VueBrunch.prototype.brunchPlugin = true;

module.exports = VueBrunch;