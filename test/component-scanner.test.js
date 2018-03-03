import { expect } from "chai"
import { containr, initialize } from "~"

let importModule = name => {
  delete require.cache[require.resolve(name)]
  return require(name)
}

module.exports = {
  "beforeEach": () => containr.instances = [],
  "ComponentScanner decorator": {
    "imports source files recursively": () => {
      importModule("./component-scanner/component-scanner")
      expect(containr.instances.length).to.equal(3)
      expect(containr.component("application").greeting).to.equal("hi")
      expect(containr.component("MyComponent").number).to.equal(42)
      expect(containr.component("OtherComponent").number).to.equal(420)
    }
  }
}
