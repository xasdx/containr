import log from "~/logger"

export default (containr) => {
  return (target, name, descriptor) => {
    log.info(`Found @Wired on field ${name}`)
    containr.wiringTasks.push({ target: target, name: name })
  }
}
