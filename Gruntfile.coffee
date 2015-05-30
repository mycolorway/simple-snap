module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    sass:
      styles:
        options:
          bundleExec: true
          style: 'expanded'
          sourcemap: 'none'
        files:
          'styles/snap.css': 'styles/snap.scss'

    coffee:
      src:
        options:
          bare: true
        files:
          'lib/snap.js': 'src/snap.coffee'
      spec:
        files:
          'spec/snap-spec.js': 'spec/snap-spec.coffee'

    watch:
      src:
        files: ['src/*.coffee','demo.html']
        tasks: ['coffee:src', 'umd']
      styles:
        files: ['styles/*.scss']
        tasks: ['sass']
      spec:
        files: ['spec/**/*.coffee']
        tasks: ['coffee:spec']
      jasmine:
        files: ['lib/**/*.js', 'specs/**/*.js']
        tasks: 'jasmine:test:build'

    umd:
      all:
        src: 'lib/snap.js'
        template: 'umd'
        amdModuleId: 'simple-snap'
        objectToExport: 'Snap'
        globalAlias: 'Snap'
        deps:
          'default': ['$', 'SimpleModule', 'simpleDragdrop']
          amd: ['jquery', 'simple-module', 'simple-dragdrop']
          cjs: ['jquery', 'simple-module', 'simple-dragdrop']
          global:
            items: ['jQuery', 'SimpleModule', 'simple.dragdrop']
            prefix: ''

    jasmine:
      test:
        src: ['lib/**/*.js']
        options:
          outfile: 'spec/index.html'
          specs: 'spec/snap-spec.js'
          vendor: [
            'vendor/bower/jquery/dist/jquery.min.js'
            'vendor/bower/simple-module/lib/module.js'
            'vendor/bower/simple-dragdrop/lib/dragdrop.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['sass', 'coffee', 'umd', 'jasmine:test:build', 'watch']
  grunt.registerTask 'test', ['coffee', 'umd', 'jasmine:test']