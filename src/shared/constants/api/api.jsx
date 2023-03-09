import axios from 'axios'

export const apidata = async () => {
  const response = await axios.get(
    'https://63d8e86574f386d4efe04cc5.mockapi.io/users'
  )
  console.log(response, 'aaaaaa')
  return response.data
}
