import { expect, importModule } from "../../test"
import { containr, initialize } from "~"

module.exports = {
  "beforeEach": () => {
    containr.instances = []
    containr.entryPoint = null
  },
  "EntryPoint decorator": {
    "registers an onAssembled callback": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      importModule("./entrypoint/component-entrypoint-a")()
      expect(containr.entryPoint.component).to.equal("ComponentEntryPoint")
      expect(containr.entryPoint.method).to.equal("main")
    },
    "calls entry point method once initialization is complete": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      importModule("./entrypoint/component-entrypoint-a")(res => expect(res).to.equal("hey there"))
      initialize()
    },
    "rejects multiple entry point definitions": () => {
      importModule("./entrypoint/component-entrypoint-a")()
      expect(() => importModule("./entrypoint/component-entrypoint-b")).to.throw("EntryPoint has already been defined")
    },
    "rejects non-existing methods as target": () => {
      expect(() => importModule("./entrypoint/component-entrypoint-c")).to.throw("EntryPoint targets a non-existing method")
    },
    "rejects decorating non-classes": () => {
      expect(() => importModule("./entrypoint/component-entrypoint-d")).to.throw("target must be a class")
    },
    "rejects usage without method name argument": () => {
      expect(() => importModule("./entrypoint/component-entrypoint-e")).to.throw("EntryPoint must receive an argument, pointing to a method used as entry point")
    }
  }
}
