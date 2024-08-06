
import { Navigate } from "react-router"

export const Protectedroute = ({children}) => {
    const user = JSON.parse(localStorage.getItem('users'))
    if (user?.status ) {
      return children
    }
    else {
      return <Navigate to={'/login'}/>
    }
}