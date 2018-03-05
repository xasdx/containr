let timeStamp = () => new Date().toISOString()

let log = message => console.log(`[${timeStamp()}] ${message}`)

module.exports = {
  debug: log,
  info: log,
  warn: log,
  error: log
}
