const fs = require('fs')

const piData = fs.readFileSync('./pi.txt', 'utf-8')

const pi = piData.replace(/\W/g, '')

const module = `export default '${pi}'
`
fs.writeFileSync('./src/Pi.ts', module)
