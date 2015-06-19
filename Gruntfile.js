module.exports = function(grunt){
  grunt.initConfig({
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ext: 'js, html',
          watch: ['app.js', 'config/**/*.js', 'ap/**/*.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('default', ['env:dev', 'nodemon']);
};
