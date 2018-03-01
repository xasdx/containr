import { expect } from "chai"
import { containr, initialize } from "~"

let importModule = name => {
  delete require.cache[require.resolve(name)]
  return require(name)
}

module.exports = {
  "beforeEach": () => containr.instances = [],
  "EntryPoint decorator": {
    "registers an onAssembled callback": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      importModule("./component/component-entrypoint")()
      expect(containr.entryPoint.component).to.equal("ComponentEntryPoint")
      expect(containr.entryPoint.method).to.equal("main")
    },
    "entryPoint callbacks are called on initialization": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      importModule("./component/component-entrypoint")(res => expect(res).to.equal("hey there"))
      initialize()
    }
  }
}
