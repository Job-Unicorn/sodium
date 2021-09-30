import React from 'react'
import { IJobsAction, IJobsState } from '@/store/reducers/JobsReducer'


export interface JobsContextInterface {
    jobsState: IJobsState
    jobsDispatch: React.Dispatch<IJobsAction>
}

export const JobsContext = React.createContext<JobsContextInterface | null>(null)
