export const loadState = () => {
  try { //localStorage.getItem puede fallar
    const serializedData = localStorage.getItem('state')
    if (serializedData === null){
      return undefined // si no existe 
    }
    return (JSON.parse(serializedData)) 
  } catch (error) {
    return 'error'; 
  }
}
export const saveState = (state) => {
  try {
    let serializedData = JSON.stringify(state.toJS())
    localStorage.setItem('state', serializedData)
  } catch (error) {
  }
}
