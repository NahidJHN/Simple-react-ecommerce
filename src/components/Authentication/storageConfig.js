

//set local storage
 export const setUserItem = (userState) => {
    const storage = localStorage
     storage.setItem("email", userState)
     
}
export const getUserItem = () => {
    const storage = localStorage
    return storage.getItem("email")
}
 
export const removeUserItem = () => {
    const storage = localStorage
    storage.removeItem("email")
}