import { expect, importModule } from "../../test"
import { containr, initialize, assembled } from "~"

module.exports = {
  "beforeEach": () => containr.wiringTasks = [],
  "Wired decorator": {
    "registers fields to be injected": () => {
      importModule("./wired/wired-a")
      expect(containr.wiringTasks.length).to.equal(2)
      expect(containr.wiringTasks[0].name).to.equal("compA")
      expect(containr.wiringTasks[1].name).to.equal("compB")
    },
    "rejects decorating non-fields": () => {
      expect(() => importModule("./wired/wired-b")).to.throw("target must be a field")
    },
    "inject dependencies of a component": done => {
      importModule("./component/component-a")
      importModule("./component/component-c")
      importModule("./wired/wired-c")
      assembled(cont => {
        expect(cont.component("WiredComponent").hi()).to.equal("hello hey")
        done()
      })
      initialize()
    }
  }
}
