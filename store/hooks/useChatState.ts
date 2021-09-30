import React, { useReducer } from "react"
import { ChatInitialState } from "@/store/state/chat"
import { chatReducer } from "@/store/reducers/ChatReducer"

export const useChatState = () => {
  const [chatState, chatDispatch] = useReducer(chatReducer, ChatInitialState)
  return { chatState, chatDispatch }
}
