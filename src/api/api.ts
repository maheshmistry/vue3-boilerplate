import { AxiosResponse } from 'axios'
import client from './client'

async function testApi(): Promise<AxiosResponse> {
  return client.get('/test/')
}

export default {
  testApi
}
