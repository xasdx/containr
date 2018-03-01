import { Component, EntryPoint } from "~"

module.exports = f => {
  
  @Component
  @EntryPoint("main")
  class ComponentEntryPoint {
  
    main(containr) {
      f(containr.component("componentc").hey() + " there")
    }
  }
}
