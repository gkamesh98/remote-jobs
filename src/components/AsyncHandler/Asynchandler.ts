import { AxiosPromise } from 'axios'
import { axiosRequest } from '../../App/Api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

class AsyncHandler {
  private existingActions = new Map()
  private keyBasedValue: Record<string, any> = {}
  private fetching: Record<string, boolean> = {}
  private hydrate: boolean
  private storageKey = 'asyncHandlerData'

  constructor({ hydrate }: { hydrate?: boolean } = {}) {
    this.hydrate = hydrate ?? false
  }

  private handleKeyBasedValue(key?: string, successResponse?: any) {
    if (typeof key === 'string') {
      this.keyBasedValue = {
        ...this.keyBasedValue,
        [key]: successResponse,
      }
      this.saveInStorage()
    }
  }

  requestHandler(
    request: any,
    key?: string,
    responseHandler = (response: any) => response,
  ): AxiosPromise {
    if (typeof request === 'object') {
      const stringifiedRequest = JSON.stringify(request)
      const requestKey = key ?? stringifiedRequest
      const response = this.existingActions.get(stringifiedRequest)
      this.setFetching(requestKey, true)
      if (response) {
        return (response as AxiosPromise)
          .finally(() => {
            this.setFetching(requestKey, false)
          })
          .then(successResponse => {
            const responseFormated = responseHandler(successResponse)
            console.log(responseFormated)
            this.handleKeyBasedValue(requestKey, responseFormated)
            return responseFormated
          })
      } else {
        const asyncResponse = axiosRequest({
          ...request,
        }).finally(() => {
          this.setFetching(requestKey, false)
          this.existingActions.delete(stringifiedRequest)
        })

        this.existingActions.set(stringifiedRequest, asyncResponse)
        return asyncResponse.then(successResponse => {
          const responseFormated = responseHandler(successResponse)
          this.handleKeyBasedValue(requestKey, responseFormated)
          return responseFormated
        })
      }
    } else {
      throw new Error('Do not handle')
    }
  }

  checkAndRequest(
    request: any,
    key?: string,
    responseHandler?: (response: any) => Record<string, unknown>,
  ) {
    const requestKey = key ?? JSON.stringify(request)
    const keyResponse = this.getValue(requestKey)
    console.log(requestKey, keyResponse)
    if (keyResponse) {
      return Promise.resolve(keyResponse)
    } else {
      return this.requestHandler(request, key, responseHandler)
    }
  }

  getValue(key: string): any {
    const value = this.keyBasedValue[key]
    return value
  }

  reset() {
    try {
      this.existingActions.clear()
      this.keyBasedValue = {}
      AsyncStorage.clear()
    } catch (error) {
      throw error
    }
  }

  private setFetching(key: string, isFetching: boolean) {
    this.fetching = {
      ...this.fetching,
      [key]: isFetching,
    }
  }

  getFetching(key: string): boolean {
    return this.fetching[key] ?? false
  }

  saveInStorage() {
    if (this.hydrate) {
      try {
        const stringifiedData = JSON.stringify(this.keyBasedValue)
        AsyncStorage.setItem(this.storageKey, stringifiedData)
      } catch (error) {
        throw error
      }
    }
  }
  retrieveFromStorage() {
    if (this.hydrate) {
      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(this.storageKey)
          .then((data: any) => {
            return JSON.parse(data)
          })
          .then(data => {
            this.keyBasedValue = data ?? {}
            resolve({ completed: true })
            return { completed: true }
          })
          .catch(errorResponse => {
            reject(errorResponse)
          })
      })
    } else {
      return Promise.resolve({ completed: true })
    }
  }
}

export default AsyncHandler
