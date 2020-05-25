'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        minSuffix: 'min',
        distName: 'msdv-thesis',
        meta: {
            version: '<%= pkg.version %>',
            banner: '/*! msdv-thesis.js - v<%= meta.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '* https://github.com/agaase/\n' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
                'agaase; Licensed MIT */\n',

        },
        clean: {
            files: ['dist']
        },
        concat: {
            templateDist: {
                options: {
                    banner: '<%= meta.banner %>',
                    stripBanners: true
                },
                files: {
                    'dist/<%= distName %>-<%= meta.version %>.<%= minSuffix %>.js': ['js/lib/ol.debug.js','js/lib/chroma.min.js','js/lib/d3.min.js','js/lib/slider.js','js/lib/turf.min.js','js/data-op.js','js/menu.js','js/map.js','js/main.js']
                }
            }
        },
        uglify: {
            target: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    'dist/<%= distName %>-<%= meta.version %>.<%= minSuffix %>.js': ['dist/<%= distName %>-<%= meta.version %>.<%= minSuffix %>.js'],
                }
            }
        },
        jshint: {
            beforeconcat: {
                options: {
                    curly: true,
                    eqeqeq: true,
                    immed: true,
                    latedef: true,
                    newcap: true,
                    noarg: true,
                    sub: true,
                    undef: true,
                    boss: true,
                    eqnull: true,
                    globals: {
                        window: true,
                        $: true,
                        d3: true,
                        console: true,
                        alert: true,
                        setTimeout: true,
                        clearTimeout: true,
                        setInterval: true,
                        clearInterval: true,
                        document: true,
                    }
                },
                src: ['js/*.js']
            }
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'uglify']);

};
