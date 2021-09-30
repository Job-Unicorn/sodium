import { useReducer } from "react"
import { JobsContextInterface } from "@/store/contexts/JobsContext"
import { JobsReducer } from "@/store/reducers/JobsReducer"
import { JobsInitialState } from "@/store/state/jobs"

export const useJobsState = () : JobsContextInterface => {
  const [jobsState, jobsDispatch] = useReducer(JobsReducer, JobsInitialState)
  return { jobsState, jobsDispatch }
}
