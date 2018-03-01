import { Component, EntryPoint } from "~"

@Component
@EntryPoint("main")
class ComponentEntryPoint {

  main(containr) {
    console.log(`${containr.component("component_c").hey()} there`)
  }
}
