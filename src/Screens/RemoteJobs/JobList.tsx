import React from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { WhiteSpace } from '@ant-design/react-native'
import InfoCard from '../../components/InfoCard'
import { jobListProps } from './type'

const JobList: React.FC<jobListProps> = ({ data }) => {
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <React.Fragment>
            {index ? <WhiteSpace size="sm" /> : null}
            <InfoCard {...item} />
          </React.Fragment>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

JobList.defaultProps = {
  data: [],
}

export default JobList
