const axon = require('axon')
const sock = axon.socket('pull')

sock.connect(process.env.AXON_PORT || 8000)
sock.on('message', async function (message) {
  console.log(message.toString())
})

