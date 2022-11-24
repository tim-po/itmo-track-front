export const makeEmptyList = (length: number) => {
  const list = []
  for (let i = 0; i < length; i++) {
    list.push(1)
  }
  return list
}

export enum LocalStorageInteraction {
  save,
  load
}

export const withLocalStorage = (objectToInteractWith: {[key: string]: any}, actionToDo: LocalStorageInteraction) => {
  let returnObject: {[key: string]: any} = {}
  switch (actionToDo) {
    case LocalStorageInteraction.save:
      Object.keys(objectToInteractWith).forEach(key => {
        localStorage.setItem(key, JSON.stringify(objectToInteractWith[key]))
      })
      break
    case LocalStorageInteraction.load:
      Object.keys(objectToInteractWith).forEach(key => {
        returnObject[key] = JSON.parse(localStorage.getItem(key) || '')
      })
      break
  }
  return returnObject
}