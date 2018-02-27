export default (containr) => {
  return (target, name, descriptor) => {
    console.log(`Found @Component on class ${target.name}`)
    containr.instances.push({ id: target.name, instance: new target() })
  }
}
