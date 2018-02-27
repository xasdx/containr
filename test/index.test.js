let { expect } = require("chai")

module.exports = {
  "Component decorator": {
    "registers instances in container": done => {
      
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
