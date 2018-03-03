import { expect } from "chai"

let importModule = name => {
  delete require.cache[require.resolve(name)]
  return require(name)
}

export { expect, importModule }
