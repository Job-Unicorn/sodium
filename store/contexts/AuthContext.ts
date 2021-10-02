import React from 'react'
import { IAuthAction } from '../reducers/AuthReducer'
import { IAuthState } from '../state/auth'


export interface AuthContextInterface {
    authState: IAuthState
    authDispatch: React.Dispatch<IAuthAction>
}

export const AuthContext = React.createContext<AuthContextInterface | null>(null)
