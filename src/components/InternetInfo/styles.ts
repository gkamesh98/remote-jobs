import { StyleSheet } from 'react-native'

export const viewStyles = StyleSheet.create({
  common: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  online: {
    backgroundColor: 'green',
  },
  offline: {
    backgroundColor: 'red',
  },
})

export const textStyles = StyleSheet.create({
  common: {
    color: 'white',
  },
})
