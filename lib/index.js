import _ from "lodash"
import log from "~/logger"
import component from "~/decorator/component"
import entrypoint from "~/decorator/entrypoint"

let main = module.parent

let containr = {
  instances: [],
  onAssembled: null,
  entryPoint: null,
  component: name => findInstance(name)
}

let findInstance = id => {
  let instanceEntry = _.find(containr.instances, ["id", id.toLowerCase()])
  if (!instanceEntry) { throw `Could not find matching instance for ${id}` }
  return instanceEntry.instance
}

let assembled = (callback) => { containr.onAssembled = callback }

let initialize = () => {
  log.info(`Node modules have been loaded: ${main.loaded}`)
  if (containr.onAssembled) { containr.onAssembled(containr) }
  else if (containr.entryPoint) {
    let entryPointComponent = findInstance(containr.entryPoint.component)
    entryPointComponent[containr.entryPoint.method](containr)
  } else { log.warn("No application entry point has been defined") }
}

setTimeout(() => initialize, 1)

let Component = component(containr)
let EntryPoint = entrypoint(containr)

export { Component, EntryPoint, assembled, initialize, containr }
