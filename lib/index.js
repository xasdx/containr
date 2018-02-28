import log from "./logger"
import component from "~/decorator/component"

let main = module.parent

let containr = {
  instances: [],
  onAssembled: null,
  component: name => findInstance(name, true)
}

let findInstance = (id, ignoreCase) => {
  let instanceEntry = containr.instances.filter(i => {
    if (ignoreCase) { return i.id.toLowerCase() === id.toLowerCase() }
               else { return i.id === id }
  })[0]
  if (!instanceEntry) { throw `Could not find matching instance for ${id}` }
  return instanceEntry.instance
}

let assembled = (callback) => { containr.onAssembled = callback }

setTimeout(() => {
  log.info(`Node modules have been loaded: ${main.loaded}`)
  if (containr.onAssembled) {
    containr.onAssembled(containr)
  }
}, 1)

let Component = component(containr)

export { Component, assembled, containr }
