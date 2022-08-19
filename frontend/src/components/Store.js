import React, { createContext, useReducer } from 'react'

const Store = createContext()


const getInfoLocalStorage = (itemName,defaultVal) => {
    const value = localStorage.getItem(itemName) ? JSON.parse(localStorage.getItem(itemName)) : defaultVal
    return value
}

const setInfoLocalStorage = (itemName, storeItem) => {
    localStorage.setItem(itemName,JSON.stringify(storeItem))
}

const initialVal = {
    adminInfo: getInfoLocalStorage('adminInfo', null),
    userEmail:getInfoLocalStorage("userEmail", null)
}



const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            const adminInfo = action.payload
            setInfoLocalStorage('adminInfo', adminInfo)
            return { ...state, adminInfo: adminInfo }
        case 'LOGOUT':
            setInfoLocalStorage('adminInfo', null)
            return { ...state, adminInfo: null }
        case 'SETUSEREMAIL':
            const userEmail = action.payload
            setInfoLocalStorage('userEmail', userEmail)
            return {...state, userEmail:userEmail}
        default:
            return state
    }
}


export function StoreProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialVal)
    const values = {state,dispatch}
    return (
      <Store.Provider value={values}>
          {children}
      </Store.Provider>
  )
}

export default Store