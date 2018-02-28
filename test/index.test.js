import { expect } from "chai"

let { containr } = require("~")

module.exports = {
  "beforeEach": () => containr.instances = [],
  "Component decorator": {
    "registers instances in the container": () => {
      require("./component/component-a")
      let res = containr.component("componenta").hello()
      expect(res).to.equal("hello")

    },
    "rejects components with duplicate names": () => {
      delete require.cache[require.resolve("./component/component-a")]
      delete require.cache[require.resolve("./component/component-b")]
      require("./component/component-a")
      expect(() => require("./component/component-b")).to.throw()
    }
  }
}
