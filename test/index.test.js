import { expect } from "chai"
import { onAssembled } from "../lib"

import "./components/component-a"

module.exports = {
  "Component decorator": {
    "registers instances in container": done => {
      onAssembled(containr => {
        let res = containr.component("componenta").hello()
        expect(res).to.equal("hello")
      })
    }
  }
}
