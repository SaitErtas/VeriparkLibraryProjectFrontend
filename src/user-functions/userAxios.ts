import axios, { AxiosResponse } from 'axios'
import router from 'next/router'
import toast from 'react-hot-toast'
import auth from 'src/configs/auth'
import UserAxiosHeader from 'src/configs/userAxiosHeader'

async function put({ method, data }: { method: string; data: any }): Promise<AxiosResponse<any, any> | null> {
  try {
    const resultAxios = await axios.put(auth.apiRootUrl + method, data, {
      headers: UserAxiosHeader()
    })

    return resultAxios
  } catch (err) {
    const error = err as any
    if (error.response) {
      console.log('error1: ', error)
      if (error.response.data?.Errors) await toast.error(error.response.data.Errors + ' ' + error.message)
      else await toast.error(error.response.data + ' ' + error.message, { duration: 5000 })
    } else if (error.request) {
      console.log('error2: ', error)
    } else {
      console.log('error3: ', error)
    }
  }

  return null
}

async function post({ method, data }: { method: string; data: any }): Promise<AxiosResponse<any, any> | null> {
  try {
    const resultAxios = await axios.post(auth.apiRootUrl + method, data, {
      headers: UserAxiosHeader()
    })

    return resultAxios
  } catch (err) {
    const error = err as any
    if (error.response) {
      console.log('error1: ', error)
      if (error.response.data?.Errors) await toast.error(error.response.data.Errors + ' ' + error.message)
      else await toast.error(error.response.data + ' ' + error.message, { duration: 5000 })
    } else if (error.request) {
      console.log('error2: ', error)
    } else {
      console.log('error3: ', error)
    }
  }

  return null
}

async function get({ method }: { method: string }): Promise<AxiosResponse<any, any> | null> {
  try {
    const resultAxios = await axios.get(auth.apiRootUrl + method, {
      headers: UserAxiosHeader()
    })

    return resultAxios
  } catch (err) {
    const error = err as any
    if (error.response) {
      console.log('error1: ', error)
      if (error.response.data?.Errors) await toast.error(error.response.data.Errors + ' ' + error.message)
      else if (error.response.data?.code == 'ERR_NETWORK') {
        await toast.error(error.response.data.Errors + ' ' + error.message)

        return error
      } else await toast.error(error.response.data + ' ' + error.message, { duration: 5000 })
    } else if (error.request) {
      console.log('error2: ', error)
    } else {
      console.log('error3: ', error)
    }
  }

  return null
}

export default { put, post, get }
