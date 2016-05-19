module.exports = function () {
  var dest = './build/';
  var config = {

    nodemonfig: {
      script: dest + 'app.js',
      ext: 'ts',
      env: {
        PORT: 8000
      },
      ignore: ['./node_modules/**', './typings/**'],
      tasks: ['tsc']
    }

  };

  return config;
};
