import log from "~/logger"
import component from "~/decorator/component"
import entryPoint from "~/decorator/entrypoint"
import componentScanner from "~/decorator/component-scanner"
import wired from "~/decorator/wired"

let main = module.parent

let containr = {
  instances: [],
  onAssembled: null,
  entryPoint: null,
  wiringTasks: [],
  component: name => findInstance(name)
}

let findInstance = id => {
  let instanceEntry = findOne(containr.instances, "id", id.toLowerCase())
  if (!instanceEntry) { throw Error(`Could not find matching instance for ${id}`) }
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

let findOne = (collection, key, value) => collection.filter(e => e[key] === value)[0]

setTimeout(() => initialize, 1)

let Component = component(containr)
let EntryPoint = entryPoint(containr)
let Wired = wired(containr)

export { Component, EntryPoint, componentScanner as ComponentScanner, Wired, assembled, initialize, containr }
