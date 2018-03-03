import { Component, ComponentScanner } from "~"

@Component
@ComponentScanner(__dirname)
class Application {
  
  greeting = "hi"
}
