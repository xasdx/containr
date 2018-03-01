import log from "~/logger"

export default (containr) => {
  return (entryPointMethod) => {
    return (target, name, descriptor) => {
      log.info(`Defining entry point as ${target.name}::${entryPointMethod}`)
      if (containr.entryPoint !== null) { throw `EntryPoint has already been defined as ${containr.entryPoint.component}::${containr.entryPoint.method}` }
      containr.entryPoint = { component: target.name, method: entryPointMethod }
    }
  }
}
