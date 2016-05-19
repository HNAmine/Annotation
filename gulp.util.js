var chalk = require('chalk');

module.exports = {
  successLog: function (msg) {
    if (typeof (msg) === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          console.log(chalk.green(msg[item]));
        }
      }
    } else {
      console.log(chalk.green(msg));
    }
  },

  errorLog: function (msg) {
    if (typeof (msg) === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          console.log(chalk.red(msg[item]));
        }
      }
    } else {
      console.log(chalk.red(msg));
    }
  },

  infoLog: function (msg) {
    if (typeof (msg) === 'object') {
      for (var item in msg) {
        if (msg.hasOwnProperty(item)) {
          console.log(chalk.blue(msg[item]));
        }
      }
    } else {
      console.log(chalk.blue(msg));
    }
  }

};
