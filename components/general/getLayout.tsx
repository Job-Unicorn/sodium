import React, { ComponentType, useContext, useEffect, useState } from 'react'
import LandingPageWrapper from '@/layouts/LandingPageWrapper'
import NotAuthorized from './NotAuthorized'
import { AuthContext } from '@/store/contexts/AuthContext'
import { login } from '@/utils/authentication/auth.utils'
import DefaultWrapper from '@/layouts/DefaultWrapper'

type INeedsAuthentication = 'NEEDS_AUTHENTICATION' | 'DOES_NOT_NEED_AUTHENTICATION' | 'LANDING_PAGE'

export function getLayout<P>(Inner : ComponentType<P>, needsAuthentication : INeedsAuthentication) {

  const Wrapped = (props: P) => {
    const { authState, authDispatch } = useContext(AuthContext)
    const [signedIn, setSignedIn] = useState(false)

    useEffect(() => {
      setSignedIn(authState.isLoggedIn)
    }, [authState.isLoggedIn])

    useEffect(() => {
      if (window.ethereum){
        login().then(({ accountId, name}) => {
          
          authDispatch({ 
            type: 'LOGIN',
            payload: {
              user : {
                accountId,
                name
              }
            }
          })
        })
      }
    }, [])

    if (needsAuthentication === 'LANDING_PAGE'){
      return (
        <LandingPageWrapper>
          <Inner {...props} />
        </LandingPageWrapper>
      )
      

    } else if (signedIn) {
      return (
        <DefaultWrapper >
          <Inner {...props}/>
        </DefaultWrapper>
      )
    } else if (
      signedIn == false &&
      needsAuthentication === 
      'DOES_NOT_NEED_AUTHENTICATION') {
      return (
        <DefaultWrapper>
          <Inner {...props}/>
        </DefaultWrapper>
      )
    } else if (
      signedIn == false &&
      needsAuthentication === 
      'NEEDS_AUTHENTICATION') {
      return (
        <DefaultWrapper>
          <NotAuthorized />
        </DefaultWrapper>
      )
    } else {
      return (
        <DefaultWrapper>
          <NotAuthorized />
        </DefaultWrapper>
      )
    }

  }
    
  return Wrapped
}

