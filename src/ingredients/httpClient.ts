import axios, { AxiosInstance } from 'axios'

export const getAxiosInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: 'https://raw.githubusercontent.com/daily-harvest/opportunities/master',
    timeout: 1000,
    headers: { 'Content-type': 'application/json' },
  })
}
