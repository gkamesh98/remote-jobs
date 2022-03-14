import { Toast } from '@ant-design/react-native'

import { useAysnchandler } from '../../../components/AsyncHandler/AsycnhandlerProvider'
import { useInternetInfo } from '../../../components/InternetInfo'

import * as api from '../../../App/Api/remoteJobs'

import { argUseGetRemoteJobs, job, returnUseGetRemoteJobs } from '../type'
import { useMemo } from 'react'

export const useGetRemoteJobsCategories = () => {
  const { data, fetching } = useAysnchandler({
    request: api.getRemoteJobCategories(),
    key: 'remoteJobsCategories',
  })

  return { data, fetching }
}

export const useGetRemoteJobs = ({
  page,
  sort,
  pageSize,
}: argUseGetRemoteJobs) => {
  const { isInternetReachable } = useInternetInfo()
  const { data, fetching, aysncFunction } = useAysnchandler({
    request: api.getRemoteJobs(),
    key: 'remoteJobs',
    responsehandler: (successResponse: any) => {
      const {
        data: { ['job-count']: jobCount, jobs },
      } = successResponse

      return {
        jobCount,
        jobs: jobs.map((values: any) => ({
          title: values.title,
          companyName: values.company_name,
          companyLogo: values.company_logo,
          category: values.category,
          jobType: values.job_type,
          createdAt: values.publication_date,
          location: values.candidate_required_location,
          id: values.id,
        })),
      }
    },
    onError: () => {
      if (!isInternetReachable) {
        Toast.offline('Network connection failed')
      } else {
        Toast.fail('Unable fetch information')
      }
    },
  })

  const formatedData = useMemo(() => {
    if (data) {
      return {
        jobCount: data?.jobCount ?? 0,
        jobs: (() => {
          const jobs = [...(data?.jobs ?? [])]
          jobs.sort((first: job, second: job) => {
            const d1 = new Date(first.createdAt)
            const d2 = new Date(second.createdAt)
            if (d1 < d2) {
              return -1
            }
            if (d1 > d2) {
              return 1
            }
            return 0
          })
          if (sort === 'desc') {
            jobs.reverse()
          }
          return jobs.slice((page - 1) * pageSize, page * pageSize)
        })(),
      }
    }
  }, [data, sort, page, pageSize])

  return {
    data: formatedData,
    fetching,
    aysncFunction,
  } as returnUseGetRemoteJobs
}
