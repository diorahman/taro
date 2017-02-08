const download = require('./lib/fetch')
const install = require('./lib/install')

download({
  user: 'hooqtv',
  repo: 'sanctuary',
  ref: 'develop'
}, function (err, result) {
  console.log(err || result)
  install(result.pop())
})
