import axios, { AxiosResponse } from 'axios'

export const postFetishism = (fetishism: string): Promise<AxiosResponse<any>> => {
  return axios.post('http://localhost:4000/dev/post-fetishism', {
    fetishism
  })
}
