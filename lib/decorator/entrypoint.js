import log from "~/logger"

export default (containr) => {
  return (entryPointMethod) => {
    return (target, name, descriptor) => {
      log.info(`Defining entry point as ${target.name}::${entryPointMethod}`)
      containr.entryPoint = { component: target.name, method: entryPointMethod }
    }
  }
}
