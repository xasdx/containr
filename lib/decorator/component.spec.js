import { expect, importModule } from "../../test"
import { containr } from "~"

module.exports = {
  "beforeEach": () => containr.instances = [],
  "Component decorator": {
    "registers an instance in the container": () => {
      importModule("./component/component-a")
      let res = containr.component("ComponentA").hello()
      expect(res).to.equal("hello")
    },
    "rejects components with duplicate names": () => {
      importModule("./component/component-a")
      expect(() => importModule("./component/component-b")).to.throw("already been registered")
    },
    "registers multiple instances": () => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      expect(containr.component("ComponentA").hello()).to.equal("hello")
      expect(containr.component("ComponentC").hey()).to.equal("hey")
    },
    "rejects decorating non-classes": () => {
      expect(() => importModule("./component/component-d")).to.throw("target must be a class")
    }
  }
}
