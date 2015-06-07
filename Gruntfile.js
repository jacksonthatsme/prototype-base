module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      vendor: {
        src: ['vendor/**/*.min.js'],
        dest: 'dev/javascripts/library.js',
      },
      application: {
        src: ['app/javascript/application/*.js'],
        dest: 'dev/javascripts/application.js'
      }
    },

    // Takes your scss files and compiles them to css
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'dev/stylesheets/application.css': 'app/stylesheets/application/index.scss'
        }
      }
    },

    // Assembles your templates into HTML files
    assemble: {
      options: {
        layoutdir: 'app/views/layouts/',
        partials: ['app/views/partials/*.hbs'],
        flatten: true,
        expand: true
      },
      pages: {
        src: ['app/views/**/*.hbs','!app/views/layouts/*.hbs','!app/views/partials/*.hbs'],
        dest: 'dev/'
      }
    },

    // Copy files from the app folder to the development folder
    copy: {
      assets: {
        cwd: 'app/assets',
        src: '**/*',
        dest: 'dev/assets/',
        expand: true
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 8000,
        livereload: true,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: ['dev']
        }
      }
    },

    // Watches for file changes, runs the default task
    watch: {
      all: {
        options: { livereload: true },
        files: ['app/**/*'],
        tasks: ['default'],
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Register the tasks
  grunt.registerTask('default', ['sass','assemble', 'concat:application', 'copy:assets']);
  grunt.registerTask('server', ['connect','watch']);
};