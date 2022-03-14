import { ActivityIndicator } from '@ant-design/react-native'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import AsyncHandler from './Asynchandler'

// default assignment
const asyncHandler = new AsyncHandler()

const AsycnhandlerContext = createContext(asyncHandler)

type AsyncHandlerPropType = {
  handler: typeof asyncHandler
  children: React.ReactElement
}

const AsycnhandlerProvider: React.FC<AsyncHandlerPropType> = ({
  children,
  handler,
}) => {
  const [fetching, setFetching] = useState(true)
  useEffect(() => {
    handler.retrieveFromStorage().finally(() => {
      setFetching(false)
    })
  }, [handler])
  return (
    <AsycnhandlerContext.Provider value={handler}>
      {fetching ? <ActivityIndicator /> : children}
    </AsycnhandlerContext.Provider>
  )
}

export const useAysnchandler = ({
  request,
  key,
  onSuccuss,
  onError,
  callOnMount = true,
  responsehandler,
}: {
  request: any
  key?: string
  onSuccuss?: (successResponse?: any) => void
  onError?: (errorResponse?: any) => void
  callOnMount?: boolean
  responsehandler?: (successResponse: any) => Record<string, unknown>
}) => {
  const value = useContext(AsycnhandlerContext)
  const defaultKey = key ?? JSON.stringify(request)
  const requestData = value.getValue(defaultKey)
  const [data, setData] = useState<any>()
  const [error, setError] = useState<any>({})

  const [fetching, setFetching] = useState(value.getFetching(defaultKey))

  if (onError && typeof onError !== 'function') {
    Error('onError can only be function')
  }

  if (onSuccuss && typeof onSuccuss !== 'function') {
    Error('onSuccuss can only be function')
  }

  const aysncFunction = useCallback(
    (additional?: Record<string, unknown>) => {
      const alteredKey = (args => {
        if (args) {
          return JSON.stringify({ ...request, ...additional })
        }
        return defaultKey
      })(additional)
      return value
        .checkAndRequest(
          { ...request, ...additional },
          alteredKey,
          responsehandler,
        )
        .then((successResponse: any) => {
          setData(successResponse)
          if (typeof onSuccuss === 'function') {
            onSuccuss(successResponse)
          }
          return successResponse
        })
        .catch((errorResponse: any) => {
          setError(errorResponse)
          if (typeof onError === 'function') {
            onError(errorResponse)
          }
          throw errorResponse
        })
    },
    [defaultKey, onError, onSuccuss, request, value, responsehandler],
  )

  useEffect(() => {
    if (callOnMount && !requestData) {
      setFetching(true)
      aysncFunction().finally(() => {
        setFetching(false)
      })
    }
  }, [aysncFunction, callOnMount, defaultKey, requestData, value])

  return {
    aysncFunction,
    reset: value.reset,
    data: data ?? requestData ?? {},
    error: error ?? {},
    fetching,
  }
}

export default AsycnhandlerProvider
