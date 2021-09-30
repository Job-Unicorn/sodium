import React from 'react'
import { ChatContext } from '@/store/contexts/ChatContext'
import { useChatState } from '@/store/hooks/useChatState'

const ChatProvider = ({ children }) => {
  return (
    <ChatContext.Provider value={useChatState()} >{children}</ChatContext.Provider>
  )
}

export default ChatProvider
