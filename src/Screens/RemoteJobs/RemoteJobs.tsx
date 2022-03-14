import React, { FC, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import {
  Flex,
  Pagination,
  SearchBar,
  WhiteSpace,
} from '@ant-design/react-native'
import { useGetRemoteJobs } from './hooks'
import JobList from './JobList'
import { paginationStyles, viewStyles } from './styles'

const pageSize = 5

const locale = {
  prevText: 'Previous',
  nextText: 'Next',
}

const RemoteJobs: FC = () => {
  const [page, setPage] = useState<number>(1)
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')
  const { data, fetching, aysncFunction } = useGetRemoteJobs({
    page,
    sort,
    pageSize,
  })

  const [search, setSearch] = useState<undefined | string>()
  const [companyName, setCompanyName] = useState<undefined | string>()

  const handlePagination = (value: number) => {
    console.log(value)
    setPage(value)
  }

  const handleSortPress = () => {
    setSort(value => {
      if (value === 'asc') {
        return 'desc'
      } else {
        return 'asc'
      }
    })
    handlePagination(1)
  }

  const handleSearchCancel = () => {
    setSearch(undefined)
    handleSubmit()
    handlePagination(1)
  }

  const handleCompanySearchCancel = () => {
    setCompanyName(undefined)
    handleSubmit()
    handlePagination(1)
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
  }
  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value)
  }

  const handleSubmit = () => {
    aysncFunction({
      params: {
        company_name: companyName,
        search,
      },
    })
    handlePagination(1)
  }

  const paginationTotal = (() => {
    const total = data.jobCount ?? 0
    const partition = Math.floor(total / pageSize)
    if (total % pageSize === 0) {
      return partition
    }
    return partition + 1
  })()

  return (
    <View style={viewStyles.container}>
      <SearchBar
        onCancel={handleSearchCancel}
        value={search}
        defaultValue=""
        placeholder="Search"
        cancelText="Cancel"
        onSubmit={handleSubmit}
        onChange={handleSearchChange}
      />
      <SearchBar
        defaultValue=""
        placeholder="Company name"
        cancelText="Cancel"
        value={companyName}
        onCancel={handleCompanySearchCancel}
        onSubmit={handleSubmit}
        onChange={handleCompanyNameChange}
      />

      {fetching ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Flex direction="row" justify="between">
            <Text>{data?.jobCount ?? 0} found</Text>
            <Text>
              Sort by create time{' '}
              <Pressable onPress={handleSortPress}>
                <Text>{sort}</Text>
              </Pressable>
            </Text>
          </Flex>
          <WhiteSpace />
          <View style={viewStyles.listContainer}>
            <JobList
              data={data?.jobs ?? []}
              total={paginationTotal}
              handlePagination={handlePagination}
              count={data?.jobCount ?? 0}
              sort={sort}
              handleSortPress={handleSortPress}
            />
          </View>
        </View>
      )}
      <Pagination
        total={paginationTotal}
        current={page}
        locale={locale}
        onChange={handlePagination}
        style={paginationStyles.container}
      />
    </View>
  )
}

export default RemoteJobs
