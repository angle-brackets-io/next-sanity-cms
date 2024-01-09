const lodash = require('lodash')

module.exports = {
  helpers: {
    projectCase: (s) => lodash.kebabCase(s),
  },
}
