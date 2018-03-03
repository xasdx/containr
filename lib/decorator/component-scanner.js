import fs from "fs"
import path from "path"

import log from "~/logger"

let scanSyncRecursive = (dir, fileList) => {
  let files = fs.readdirSync(dir)
  fileList = fileList || []
  files.forEach(file => {
    let filePath = path.join(dir, file)
    if (isDirectory(filePath)) { scanSyncRecursive(filePath, fileList) }
                          else { fileList.push(filePath) }
  })
  return fileList
}

let isDirectory = (path) => fs.statSync(path).isDirectory()

export default (path) => {
  return (target, name, descriptor) => {
    log.info(`Scanning components on path ${path}`)
    scanSyncRecursive(path).forEach(p => require(p))
  }
}
