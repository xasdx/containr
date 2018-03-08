import { Component, Wired } from "~"

@Component
class WiredComponent {

  @Wired
  componentA = null

  @Wired
  componentC = null
  
  hi() {
    return `${this.componentA.hello()} ${this.componentC.hey()}`
  }
}
