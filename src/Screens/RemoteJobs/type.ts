export type jobListProps = {
  data: Array<{
    companyName: string
    companyLogo: string
    category: string
    location: string
    title: string
    id: string
  }>
  total: number
  handlePagination: (num: number) => void
  count: number
  handleSortPress: () => void
  sort: string
}

export type argUseGetRemoteJobs = {
  sort: 'asc' | 'desc'
  page: number
  pageSize: number
}

export type returnUseGetRemoteJobs = {
  data: {
    jobCount: number
    jobs: Array<job>
  }
  fetching: boolean
  aysncFunction: (
    additional?: Record<string, unknown> | undefined,
  ) => Promise<any>
}

export type job = {
  companyName: string
  companyLogo: string
  category: string
  location: string
  title: string
  id: string
  createdAt: string
  jobType: string
}
