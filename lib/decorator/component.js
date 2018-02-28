import log from "~/logger"

export default (containr) => {
  return (target, name, descriptor) => {
    log.info(`Found @Component on class ${target.name}`)
    if (containr.instances.filter(instance => target.name.toLowerCase() === instance.id.toLowerCase()).length > 0) {
      throw new Error(`Component with name ${target.name.toLowerCase()} has already been registered`)
    }
    containr.instances.push({ id: target.name, instance: new target() })
  }
}
