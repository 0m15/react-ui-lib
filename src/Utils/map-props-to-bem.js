// maps a list of keys and props as 
// BEM modifiers, more specifically in this format:
// $baseClass--$modifierClass

const defaultModifiersKeys = [
  "active",
  "disabled",
  "loading",
  "error",
  "size",
  "className"
]

const camelCaseToDash = (str) => {
  return str.replace(/([A-Z])/g, ($1) => "-"+$1.toLowerCase())
}

// the function takes three arguments:
// 1. a list of `modifiersKeys` (aka props names)
// 2. the list of `props`
// 3. the `baseClassName` that will be prepended to the modifier
const mapPropsToBem = (modifiersKeys=defaultModifiersKeys, props, baseClassName) => {
  
  const classNames = []

  modifiersKeys.forEach(modKey => {
    
    const prop = props[modKey]
    const isBool = (typeof prop === "boolean")

    if(prop) {
      
      if(isBool && prop ==  true || prop == 'true') {
        classNames.push(`${baseClassName}--${camelCaseToDash(modKey)}`)
      } else if(modKey !== 'className') {
        classNames.push(`${baseClassName}--${prop}`)
      }

      if(modKey == 'className') {
        classNames.push(`${prop}`)
      }
    }
  })
  
  // prepend the baseClassName
  classNames.unshift(baseClassName)


  return classNames.join(" ")
}

export default mapPropsToClassNames