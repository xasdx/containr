import bunyan from "bunyan"

let logger = bunyan.createLogger({ name: "containr", src: true })
logger.level("warn")

export default logger
