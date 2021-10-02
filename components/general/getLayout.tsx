import React, { ComponentType, useContext, useEffect, useState } from "react"
import AuthenticatedWrapper from "@/layouts/AuthenticatedWrapper"
import LandingPageWrapper from "@/layouts/LandingPageWrapper"
import NotAuthenticatedWrapper from "@/layouts/NotAuthenticatedWrapper"
import NotAuthorized from "./NotAuthorized"
import { AuthContext } from "@/store/contexts/AuthContext"
import { login } from "@/utils/authentication/auth.utils"

type INeedsAuthentication = "NEEDS_AUTHENTICATION" | "DOES_NOT_NEED_AUTHENTICATION" | "LANDING_PAGE"

export function getLayout<P>(Inner : ComponentType<P>, needsAuthentication : INeedsAuthentication) {

  const Wrapped = (props: P) => {
    const { authState, authDispatch } = useContext(AuthContext)
    const [signedIn, setSignedIn] = useState(false)

    useEffect(() => {
      setSignedIn(authState.isLoggedIn)
    }, [authState.isLoggedIn])

    useEffect(() => {
      if (window.ethereum){
        login().then(({accountId,name}) => {
          authDispatch({ 
            type: "LOGIN",
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

    if (needsAuthentication === "LANDING_PAGE"){
      return (
        <LandingPageWrapper>
          <Inner {...props} />
        </LandingPageWrapper>
      )
      

    } else if (signedIn) {
      return (
        <AuthenticatedWrapper >
          <Inner {...props}/>
        </AuthenticatedWrapper>
      )
    } else if (
      signedIn == false &&
      needsAuthentication === 
      "DOES_NOT_NEED_AUTHENTICATION") {
      return (
        <NotAuthenticatedWrapper>
          <Inner {...props}/>
        </NotAuthenticatedWrapper>
      )
    } else if (
      signedIn == false &&
      needsAuthentication === 
      "NEEDS_AUTHENTICATION") {
      return (
        <NotAuthenticatedWrapper>
          <NotAuthorized />
        </NotAuthenticatedWrapper>
      )
    } else {
      return (
        <NotAuthenticatedWrapper>
          <NotAuthorized />
        </NotAuthenticatedWrapper>
      )
    }

  }
    
  return Wrapped
}

