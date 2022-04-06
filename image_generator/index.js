const app = require('./app')
const service = require('./service')

const port = 8002
const { name, version } = service.about()

const serviceName = 'LOOPMINTER_IMAGE_SERVER'

app.listen(port, () =>
  console.log(`[${serviceName}] ${name} v${version} started on port ${port}`)
)
