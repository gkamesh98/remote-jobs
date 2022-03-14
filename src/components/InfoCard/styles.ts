import { StyleSheet } from 'react-native'

export const imageStyles = StyleSheet.create({
  dimensions: {
    height: 70,
    width: 70,
    borderRadius: 8,
  },
})

export const textStyles = StyleSheet.create({
  companyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  secondaryInfo: {
    fontSize: 16,
    color: '#000000',
  },
})

export const flexStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 4,
  },
  detailsContainer: {
    // flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 16,
  },
})
