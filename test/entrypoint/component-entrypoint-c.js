import { Component, EntryPoint } from "~"

@Component
@EntryPoint("nonExistingMethod")
class ComponentOtherEntryPoint {

  method(containr) {}
}
