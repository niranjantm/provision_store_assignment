import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import { LoginContext } from './Context'

function Main() {
    const [user,setUser] = useState("")
  return (
    <LoginContext.Provider value={{user,setUser}}>
    <Outlet></Outlet>
  </LoginContext.Provider>
   

  )
}

export default Main