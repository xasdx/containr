import fs from "fs"
import pathUtils from "path"

import log from "~/logger"

let isClass = target => typeof target === "function" && /.*_classCallCheck.*/.test(target.toString())

let isDirectory = (path) => fs.statSync(path).isDirectory()

let scan = (path, excluded) => {
  return (function scanSyncRecursive(dir, fileList) {
    let files = fs.readdirSync(dir)
    fileList = fileList || []
    files.forEach(file => {
      let filePath = pathUtils.join(dir, file)
      if (excluded.includes(pathUtils.basename(file, ".js"))) { return }
      if (isDirectory(filePath)) { scanSyncRecursive(filePath, fileList) }
                            else { fileList.push(filePath) }
    })
    return fileList
  })(path)
}

export default (path, excluded) => {
  
  if (!path || typeof path !== "string") {
    throw Error("ComponentScanner must receive an argument, pointing to a directory to scan recursively for components")
  }
  
  return (target, name, descriptor) => {
    
    if (!isClass(target)) {
      throw Error(`ComponentScanner decorator's target must be a class: "${target.name || name}" is not a class`)
    }
    
    log.info(`Scanning components on path ${path}`)
    scan(path, excluded).forEach(p => require(p))
  }
}
