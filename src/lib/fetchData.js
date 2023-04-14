import { gql } from '@apollo/client'

const fetchData = () => {
  const res = gql`
    query ExampleQuery {
      launches(limit: 100) {
        mission_name
        rocket {
          rocket_name
          rocket_type
        }
        launch_date_local
      }
    }
  `

  return res
}

export default fetchData
