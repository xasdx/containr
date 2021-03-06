import { expect, importModule } from "../../test"
import { containr } from "~"

module.exports = {
  "beforeEach": () => containr.instances = [],
  "ComponentScanner decorator": {
    "imports source files recursively": () => {
      importModule("./component-scanner/component-scanner-a")
      expect(containr.instances.length).to.equal(3)
      expect(containr.component("ScannerA").greeting).to.equal("hi")
      expect(containr.component("MyComponent").number).to.equal(42)
      expect(containr.component("OtherComponent").number).to.equal(420)
    },
    "rejects decorating non-classes": () => {
      expect(() => importModule("./component-scanner/excluded/component-scanner-b/component-scanner-b")).to.throw("target must be a class")
    },
    "rejects usage without path parameter": () => {
      expect(() => importModule("./component-scanner/excluded/component-scanner-c/component-scanner-c")).to.throw("must receive an argument")
    }
  }
}
