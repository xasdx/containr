import fs from "fs"
import pathUtils from "path"

import log from "~/logger"

let scan = (path, excluded) => {
  
  let scanSyncRecursive = (dir, fileList) => {
    let files = fs.readdirSync(dir)
    fileList = fileList || []
    files.forEach(file => {
      let filePath = pathUtils.join(dir, file)
      if (excluded.includes(pathUtils.basename(file, ".js"))) { return }
      if (isDirectory(filePath)) { scanSyncRecursive(filePath, fileList) }
                            else { fileList.push(filePath) }
    })
    return fileList
  }
  
  return scanSyncRecursive(path)
}

let isDirectory = (path) => fs.statSync(path).isDirectory()

export default (path, excluded) => {
  return (target, name, descriptor) => {
    log.info(`Scanning components on path ${path}`)
    scan(path, excluded).forEach(p => require(p))
  }
}
