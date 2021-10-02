import { useReducer } from "react"
import { AuthContextInterface } from "../contexts/AuthContext"
import { AuthReducer } from "../reducers/AuthReducer"
import { AuthInitialState } from "../state/auth"


export const useAuthState = () : AuthContextInterface => {
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitialState)
  return { authState, authDispatch }
}
  