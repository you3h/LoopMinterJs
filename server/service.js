
const os = require('os')
const { name, version } = require('./package.json')

const service = {
  // Healthcheck
  about: () => ({
    name,
    version,
    time: new Date().toISOString(),
    platform: os.platform()
  })
}

module.exports = service
