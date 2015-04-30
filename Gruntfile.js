module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dot: true,
        clean: {
            build: {
                src: ["build"]
            }
        },
        open : {
            dev : {
                path: 'http://localhost:8888/handlebars-grunt-example/build/',
                app: 'Google Chrome'
            }
        },
        watch: {
            build: {
                files: ["app/**"],
                tasks: ["compile"],
                options: { livereload: true }
            }
        },
        'compile-handlebars': {
            allStatic: {
            files: [{
              src: 'app/templates/template.handlebars',
              dest: 'build/index.html'
            }],
            preHTML: 'app/pre-dev.html',
            postHTML: 'app/post-dev.html',
            templateData: 'app/data/results-by-race.json'
          }
        }
    });

    //LOAD TASKS
    //Wipes the build folder clean of files - command: grunt clean
    grunt.loadNpmTasks("grunt-contrib-clean");

    //Watch files for changes - command: grunt watch
    grunt.loadNpmTasks("grunt-contrib-watch");

    //Open
    grunt.loadNpmTasks('grunt-open');

    //Handlebars compiler
    grunt.loadNpmTasks('grunt-compile-handlebars');

    //REGISTER TASKS

    grunt.registerTask(
        "compile",
        "",
        ["clean:build", "compile-handlebars"]
    );

    //Default - command: grunt default
    grunt.registerTask(
        "default",
        "Watches the project for changes, automatically builds them and runs a server.",
        ["compile", "open", "watch"]
    );
};