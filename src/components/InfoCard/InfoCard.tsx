import React from 'react'
import { Image, Text } from 'react-native'

import { Flex, WhiteSpace, WingBlank } from '@ant-design/react-native'

import { flexStyles, imageStyles, textStyles } from './styles'
import { infoCardProp } from './types'

const InfoCard: React.FC<infoCardProp> = ({
  companyName,
  companyLogo,
  category,
  location,
  title,
}) => {
  return (
    <Flex direction="row" style={flexStyles.container}>
      <Image
        style={imageStyles.dimensions}
        source={{
          uri: companyLogo,
        }}
      />
      <Flex direction="column" style={flexStyles.detailsContainer}>
        <Text style={textStyles.companyName}>{companyName}</Text>
        <WhiteSpace size="sm" />
        <Text style={textStyles.title}>{title}</Text>

        <WhiteSpace size="xs" />
        <Flex wrap="wrap">
          <Text style={textStyles.secondaryInfo}>{location}</Text>
          <WingBlank size="sm" />
          <Text style={textStyles.secondaryInfo}>{category}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default InfoCard
