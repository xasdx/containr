import { expect } from "chai"
import { containr, initialize } from "~"

let importModule = name => {
  delete require.cache[require.resolve(name)]
  return require(name)
}

module.exports = {
  "beforeEach": () => {
    containr.instances = []
    containr.entryPoint = null
  },
  "EntryPoint decorator": {
    "registers an onAssembled callback": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      importModule("./component/component-entrypoint-a")()
      expect(containr.entryPoint.component).to.equal("ComponentEntryPoint")
      expect(containr.entryPoint.method).to.equal("main")
    },
    "EntryPoint is called on initialization": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      importModule("./component/component-entrypoint-a")(res => expect(res).to.equal("hey there"))
      initialize()
    },
    "rejects multiple EntryPoint definitions": () => {
      importModule("./component/component-entrypoint-a")()
      expect(() => importModule("./component/component-entrypoint-b")).to.throw("EntryPoint has already been defined")
    }
  }
}
