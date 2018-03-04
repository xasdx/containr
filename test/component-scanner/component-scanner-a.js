import { Component, ComponentScanner } from "~"

@Component
@ComponentScanner(__dirname, ["excluded", "component-scanner-excluded"])
class ScannerA {
  
  greeting = "hi"
}
