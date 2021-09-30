import React from 'react'
import { JobsContext } from '@/store/contexts/JobsContext'
import { useJobsState } from '@/store/hooks/useJobsState'

const JobsProvider = ({children}) => {
  return (
    <JobsContext.Provider value={useJobsState()}>
      {children}
    </JobsContext.Provider>
  )
}

export default JobsProvider
