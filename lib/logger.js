let timestamp = () => new Date().toISOString()

let severity = {
  debug: { name: "debug", value: 1 },
  info: { name: "info", value: 2 },
  warn: { name: "warn", value: 3 },
  error: { name: "error", value: 4 }
}

let logger = {
  logs: [],
  observers: [],
  createLog,
  observe
}

function createLog(message, sev) {
  let log = { msg: message, sev, time: timestamp() }
  this.logs.push(log)
  this.observers.forEach(observer => {
    if (severity[log.sev].value >= severity[observer.sev].value) { observer.callback(log) }
  })
}

function observe(name, sev, f) {
  this.observers.push({ name, sev, callback: f })
}

module.exports = {
  debug: msg => logger.createLog(msg, severity.debug.name),
  info: msg => logger.createLog(msg, severity.info.name),
  warn: msg => logger.createLog(msg, severity.warn.name),
  error: msg => logger.createLog(msg, severity.error.name),
  logger,
  severity
}
