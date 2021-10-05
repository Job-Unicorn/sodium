import { IAuthState, IUser } from '../state/auth'
import { AuthActionType } from '../types/Auth'

export interface IAuthAction {
    type: AuthActionType
    payload?: {
        user? : IUser
    }
}

export const AuthReducer = (state: IAuthState, action : IAuthAction) : IAuthState => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload.user,
    }

    
  case 'LOGOUT':
    return {
      ...state,
      isLoggedIn: false,
      user: null,
    }
    

  default:
    return state
  }
}