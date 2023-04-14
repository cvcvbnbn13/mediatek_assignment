import React, { useMemo, useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { fetchData } from './lib'
import { LaunchesTable } from './components'

function App() {
  const res = fetchData()
  const { data, loading, error } = useQuery(res)
  const [tableData, setTableData] = useState([])

  console.log(tableData)

  let timer

  const handleSearch = e => {
    const newQuery = e.target.value.toLowerCase()
    const searchData = data.launches.filter(
      item =>
        item.mission_name.toLowerCase().includes(newQuery) ||
        item.rocket.rocket_name.toLowerCase().includes(newQuery) ||
        item.rocket.rocket_type.toLowerCase().includes(newQuery) ||
        item.launch_date_local.split('T')[0].includes(newQuery)
    )
    clearTimeout(timer)
    timer = setTimeout(() => {
      setTableData(searchData)
    }, 1000)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'SpaceX',
        columns: [
          {
            Header: 'Mission Name',
            accessor: 'mission_name',
          },
          {
            Header: 'Rocket Name',
            accessor: 'rocket.rocket_name',
          },
          {
            Header: 'Rocket Type',
            accessor: 'rocket.rocket_type',
          },
          {
            Header: 'Launch Date',
            accessor: 'launch_date_local',
          },
        ],
      },
    ],
    []
  )

  useEffect(() => {
    if (!loading) {
      setTableData([...data.launches])
    }
  }, [data, loading])

  return (
    <div className="App">
      {loading ? (
        <div className="loading">資料加載中...</div>
      ) : (
        <React.Fragment>
          <header className="App-header"></header>
          <LaunchesTable
            data={tableData}
            columns={columns}
            handleSearch={handleSearch}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default App
