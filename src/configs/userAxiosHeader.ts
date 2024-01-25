import auth from './auth'
import { AxiosRequestHeaders } from 'axios'

export const UserAxiosHeader = () => {
  const authorization = window.localStorage.getItem(auth.storageTokenKeyName)
  const acceptLanguge = window.localStorage.getItem('Accept-Language')

  const axiosRequestHeaders = {
    Authorization: authorization
  } as unknown as AxiosRequestHeaders

  return axiosRequestHeaders
}

export default UserAxiosHeader
