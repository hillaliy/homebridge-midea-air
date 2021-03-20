'use strict'

const equalSign = Buffer.from('=')

module.exports = function (opts) {
  const binary = opts ? opts.binary : false
  const that = {}

  that.decodeBlocks = function (bufArray) {
    const data = {}

    bufArray.forEach(buf => {
      if (buf.length === 0) {
        return // ignore: most likely a single zero byte
      }

      const i = buf.indexOf(equalSign)

      if (i === -1) { // equal sign does not exist
        data[buf.toString().toLowerCase()] = true
      } else if (i > 0) { // we ignore zero key-length blocks
        const key = buf.slice(0, i).toString().toLowerCase()

        if (key in data) { // ignore: overwriting not allowed
          return
        }

        const valueBuf = buf.slice(i + 1)
        data[key] = binary ? valueBuf : valueBuf.toString()
      }
    })

    return data
  }

  return that
}
