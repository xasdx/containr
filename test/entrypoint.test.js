import { expect } from "chai"
import { containr } from "~"

let importModule = name => {
  delete require.cache[require.resolve(name)]
  require(name)
}

module.exports = {
  "beforeEach": () => containr.instances = [],
  "EntryPoint decorator": {
    "registers a callback that is invoked once the container is assembled": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      importModule("./component/component-entrypoint")
      expect(containr.entryPoint.component).to.equal("ComponentEntryPoint")
      expect(containr.entryPoint.method).to.equal("main")
    }
  }
}
