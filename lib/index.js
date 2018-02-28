import _ from "lodash"
import log from "~/logger"
import component from "~/decorator/component"

let main = module.parent

let containr = {
  instances: [],
  onAssembled: null,
  component: name => findInstance(name)
}

let findInstance = id => {
  let instanceEntry = _.find(containr.instances, ["id", id.toLowerCase()])
  if (!instanceEntry) { throw `Could not find matching instance for ${id}` }
  return instanceEntry.instance
}

let assembled = (callback) => { containr.onAssembled = callback }

setTimeout(() => {
  log.info(`Node modules have been loaded: ${main.loaded}`)
  if (containr.onAssembled) { containr.onAssembled(containr) }
}, 1)

let Component = component(containr)

export { Component, assembled, containr }
