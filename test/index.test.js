let { expect } = require("chai")
let { onAssembled } = require("../lib")

require("./component/component-a")

module.exports = {
  "Component decorator": {
    "registers instances in container": done => {
      onAssembled(containr => {
        let res = containr.component("componenta").hello()
        expect(res).to.equal("hello")
        done()
      })
    }
  }
}
