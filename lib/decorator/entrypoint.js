import log from "~/logger"

let isClass = target => typeof target === "function" && /.*_classCallCheck.*/.test(target.toString())

export default (containr) => {
  return (entryPointMethod) => {
    return (target, name, descriptor) => {
      log.info(`Defining entry point as ${target.name}::${entryPointMethod}`)
      
      if (!isClass(target)) {
        throw `Component decorator's target must be a class. "${target.name || name}" is not a class.`
      }
      
      if (!target.prototype[entryPointMethod]) { throw "EntryPoint targets a non-existing method" }
      
      if (containr.entryPoint !== null) { throw `EntryPoint has already been defined as ${containr.entryPoint.component}::${containr.entryPoint.method}` }
      
      containr.entryPoint = { component: target.name, method: entryPointMethod }
    }
  }
}
