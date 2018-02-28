import log from "~/logger"

let isClass = target => typeof target === "function" && /.*_classCallCheck.*/.test(target.toString())

export default (containr) => {
  return (target, name, descriptor) => {
    log.info(`Found @Component on class ${target.name}`)
    
    if (!isClass(target)) {
      console.log(target.toString())
      throw new Error(`Component decorator's target must be a class. "${target.name || name}" is not a class.`)
    }
    
    if (containr.instances.filter(instance => target.name.toLowerCase() === instance.id.toLowerCase()).length > 0) {
      throw new Error(`Component with name ${target.name.toLowerCase()} has already been registered`)
    }
    
    containr.instances.push({ id: target.name, instance: new target() })
  }
}
