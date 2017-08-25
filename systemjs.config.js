System.config({
    //baseURL: "/base",
    map: {
        'inversify': 'node_modules/inversify/lib',
        'reflect-metadata': 'node_modules/reflect-metadata',
        'systemjs': 'node_modules/systemjs/dist/system.js',
        'es6-module-loader': 'node_modules/es6-module-loader/dist/es6-module-loader.js'
    },
    packages: {
        'inversify': {
            main: 'inversify.js',
            defaultExtension: 'js'
        },
        'reflect-metadata': {
            main: 'Reflect.js',
            defaultExtension: 'js'
        },
        './src': {
            defaultExtension: 'js'
        },
        './base/src': { // Karma serves content from [host]:[port]/base instead of just [host]:[port]
            defaultExtension: 'js'
        },
        './test': {
            defaultExtension: 'js'
        },
        './base/test': { // Karma serves content from [host]:[port]/base instead of just [host]:[port]
            defaultExtension: 'js'
        }
    }
});