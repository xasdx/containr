import log from "~/logger"

export default (containr) => {
  return (target, name, descriptor) => {
    log.info(`Found @Component on class ${target.name}`)
    containr.instances.push({ id: target.name, instance: new target() })
  }
}
