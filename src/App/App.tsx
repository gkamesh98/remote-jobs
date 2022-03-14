import React, { FC } from 'react'
import { SafeAreaView } from 'react-native'

import asyncHandler from './AsyncHandler'

import RemoteJobs from '../Screens/RemoteJobs'

import { AsycnhandlerProvider } from '../components/AsyncHandler'
import InternetInfo from '../components/InternetInfo'

const App: FC = () => {
  return (
    <SafeAreaView>
      <AsycnhandlerProvider handler={asyncHandler}>
        <InternetInfo>
          <React.Fragment />
          <RemoteJobs />
        </InternetInfo>
      </AsycnhandlerProvider>
    </SafeAreaView>
  )
}

export default App
