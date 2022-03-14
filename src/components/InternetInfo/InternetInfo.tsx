import React, { createContext, useContext, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import NetInfo, { NetInfoState } from '@react-native-community/netinfo'

import { viewStyles, textStyles } from './styles'
import AsyncHandler from '../../App/AsyncHandler'

const contextDefaultValues = {
  isOnline: true,
  isInternetReachable: true,
}

const InternetInfoContext = createContext(contextDefaultValues)

export const useInternetInfo = () => {
  return useContext(InternetInfoContext)
}

const InternetInfo: React.FC = ({ children }) => {
  const [online, setOnline] = useState<boolean>(true)
  const [internetReachable, setInternetReachable] = useState<boolean>(true)

  useEffect(() => {
    NetInfo.fetch().then(state => {
      setOnline(Boolean(state.isConnected))
      setInternetReachable(Boolean(state.isInternetReachable))
      if (state.isInternetReachable) {
        AsyncHandler.reset()
      }
    })
  }, [])

  useEffect(() => {
    const handleFirstConnectivityChange = (state: NetInfoState) => {
      setOnline(Boolean(state.isConnected))
    }
    const unsubscribeNetInfoConnect = NetInfo.addEventListener(
      handleFirstConnectivityChange,
    )
    return unsubscribeNetInfoConnect
  }, [])

  const contextValues = {
    isOnline: online,
    isInternetReachable: internetReachable,
  }

  return (
    <InternetInfoContext.Provider value={contextValues}>
      {!online ? (
        <View
          style={[
            viewStyles.common,
            online ? viewStyles.online : viewStyles.offline,
          ]}>
          <Text style={[textStyles.common]}>
            {online ? 'Online' : 'Offline'}
          </Text>
        </View>
      ) : null}
      {children}
    </InternetInfoContext.Provider>
  )
}

export default InternetInfo
