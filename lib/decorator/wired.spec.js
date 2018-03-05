import { expect, importModule } from "../../test"
import { containr } from "~"

module.exports = {
  "beforeEach": () => containr.wiringTasks = [],
  "Wired decorator": {
    "registers fields to be injected": () => {
      importModule("./wired/wired-a")
      expect(containr.wiringTasks.length).to.equal(2)
      expect(containr.wiringTasks[0].name).to.equal("compA")
      expect(containr.wiringTasks[1].name).to.equal("compB")
    }
  }
}
