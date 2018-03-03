import { expect } from "chai"
import { containr } from "~"

let importModule = name => {
  delete require.cache[require.resolve(name)]
  require(name)
}

module.exports = {
  "beforeEach": () => containr.instances = [],
  "Component decorator": {
    "registers an instance in the container": () => {
      importModule("../../test/component/component-a")
      let res = containr.component("componenta").hello()
      expect(res).to.equal("hello")
    },
    "rejects components with duplicate names": () => {
      importModule("../../test/component/component-a")
      expect(() => importModule("../../test/component/component-b")).to.throw("already been registered")
    },
    "registers multiple instances": () => {
      importModule("../../test/component/component-a")
      importModule("../../test/component/component-c")
      expect(containr.component("componenta").hello()).to.equal("hello")
      expect(containr.component("componentc").hey()).to.equal("hey")
    },
    "rejects decorating non-classes": () => {
      expect(() => importModule("../../test/component/component-d")).to.throw("target must be a class")
    }
  }
}
