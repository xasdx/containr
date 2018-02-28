import { expect } from "chai"

module.exports = {
  "Component decorator": {
    "registers instances in the container": done => {
      
      let { assembled } = require("../lib")
      require("./component/component-a")
      
      assembled(containr => {
        let res = containr.component("componenta").hello()
        expect(res).to.equal("hello")
        done()
      })
    }
  }
}
