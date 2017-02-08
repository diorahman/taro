const gunzip = require('gunzip-maybe')
const github = require('octonode')
const request = require('request')
const mkdirp = require('mkdirp')
const tar = require('tar-fs')
const path = require('path')
const fs = require('fs')

const TOKEN = process.env.TOKEN

module.exports = download

function move (dir, callback) {
  fs.readdir(dir, function (err, list) {
    list = list.map((d) => { return path.resolve(path.join(dir, d)) })
    callback(err, list)
  })
}

function execute (dir, options, callback) {
  const client = github.client(TOKEN)
  const repo = client.repo(`${options.user}/${options.repo}`)
  repo.archive('tarball', options.ref || 'master', function (err, link) {
    if (err) {
      return callback(err)
    }
    const stream = request(link)
      .pipe(gunzip())
      .pipe(tar.extract(dir))

    stream.on('finish', () => {
      move(path.resolve(dir), callback)
    })
  })
}

function download (options, callback) {
  const dir = path.join('tmp', options.repo, options.ref)
  mkdirp(dir, options, function (err) {
    if (err) {
      return callback(err)
    }
    execute(dir, options, callback)
  })
}
