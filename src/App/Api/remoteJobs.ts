export const getRemoteJobs = (params?: Record<string, unknown>) => {
  return {
    endpoint: '/remote-jobs',
    method: 'get',
    params,
  }
}

export const getRemoteJobCategories = () => {
  return {
    endpoint: '/remote-jobs/categories',
    method: 'get',
  }
}
