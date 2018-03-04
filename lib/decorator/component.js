import _ from "lodash"
import log from "~/logger"

let isClass = target => typeof target === "function" && /.*_classCallCheck.*/.test(target.toString())

export default (containr) => {
  return (target, name, descriptor) => {
    log.info(`Found @Component on class ${target.name}`)
    
    if (!isClass(target)) {
      throw Error(`Component decorator's target must be a class: "${target.name || name}" is not a class`)
    }
    
    if (_.some(containr.instances, ["id", target.name.toLowerCase()])) {
      throw Error(`Component with name ${target.name.toLowerCase()} has already been registered`)
    }
    
    containr.instances.push({ id: target.name.toLowerCase(), instance: new target() })
  }
}
