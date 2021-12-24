

//set local storage
 export const setUserItem = (userState) => {
    const storage = localStorage
     storage.setItem("user", userState)
     
}
export const getUserItem = () => {
    const storage = localStorage
    return storage.getItem("user")
}
 
export const removeUserItem = () => {
    const storage = localStorage
    storage.removeItem("user")
}