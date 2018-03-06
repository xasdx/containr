import log from "~/logger"

export default (containr) => {
  return (target, name, descriptor) => {
    log.info(`Found @Wired on field ${name}`)
    if (!name) {
      throw Error(`Wired decorator's target must be a field: "${target.name || name}" is not a field`)
    }
    containr.wiringTasks.push({ target: target, name: name })
  }
}
