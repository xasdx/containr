import { expect } from "chai"
import { containr } from "~"

let importModule = name => {
  delete require.cache[require.resolve(name)]
  require(name)
}

module.exports = {
  "beforeEach": () => containr.instances = [],
  "Component decorator": {
    "registers instances in the container": () => {
      importModule("./component/component-a")
      let res = containr.component("componenta").hello()
      expect(res).to.equal("hello")
    },
    "rejects components with duplicate names": () => {
      importModule("./component/component-a")
      expect(() => importModule("./component/component-b")).to.throw("already been registered")
    },
    "registers multiple instances": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      expect(containr.component("componenta").hello()).to.equal("hello")
      expect(containr.component("componentc").hey()).to.equal("hey")
    },
    "rejects decorating non-classes": () => {
      expect(() => importModule("./component/component-d")).to.throw("target must be a class")
    }
  }
}
