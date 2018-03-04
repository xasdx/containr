import { Component, ComponentScanner } from "~"

class ScannerB {
  
  @ComponentScanner(__dirname)
  greeting = "hi"
}
