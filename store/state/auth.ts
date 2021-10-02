export interface IUser {
    name: string
    accountId: string
}

export interface IAuthState {
    isLoggedIn: boolean
    user: IUser | null
}

export const AuthInitialState : IAuthState = {
  isLoggedIn: false,
  user : null
}