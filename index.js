const {json} = require('micro')
const axon = require('axon')

const sock = axon.socket('push')
sock.bind(process.env.AXON_PORT || 8000)

module.exports = async (req) => {
  const body = await json(req)
  sock.send(JSON.stringify(body))
  return {ok: 1}
}
