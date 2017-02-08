const proc = require('child_process')
const NPM = process.env.NPM_PATH

module.exports = install

function install (dir) {
  console.log('INSTALL', dir)
  const npmInstall = proc.spawn(NPM, ['install'], {cwd: dir})
  npmInstall.stdout.on('data', function (data) {
    console.log(data.toString())
  })

  npmInstall.stderr.on('data', function (data) {
    console.log(data.toString())
  })

  npmInstall.stdout.on('exit', function () {
    console.log('exit')
  })
}
