import axios, { AxiosError, AxiosResponse } from 'axios'

export interface ErrorResponse extends Error {
  code: string | number
  data: string | null
  name: string
  message: string
  status?: number
  statusText?: string
}

function getErrorResponse(error: AxiosError<ErrorResponse>): ErrorResponse {
  if (error.code === 'ERR_NETWORK') {
    return {
      name: 'The system could not be reached.',
      code: 'Network error',
      message: 'Please check network connection and try again.',
      data: null
    }
  }
  if (error.response) {
    return {
      status: error.response.status,
      name: error.name,
      code: error.status ?? 'Unexpected error',
      data: instanceOfValidationErrors(error.response.data)
        ? error.response.data
        : null,
      message: error.response.statusText
    }
  }

  return {
    name: 'An unexpected error! Please try again later. We are confused same like you as well :| .',
    code: error.code ? error.code : 'Unexpected error',
    message: error.code
      ? (error.response as unknown as { statusText: string }).statusText
      : `Unexpected Error: ${error}`,
    data: null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function instanceOfValidationErrors(object: any): object is string {
  return typeof object === 'object' && 'detail' in object
}

export function handleError(error: AxiosError<ErrorResponse>) {
  throw getErrorResponse(error)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleResponse(response: AxiosResponse): any {
  // avoiding the use of response.data everywhere and having AxiosResponse in the whole api file for proper type casting
  if (response.data) {
    return response.data
  }

  throw new Error('Expected response data!')
}

// if want to create our own axios instant and not have @/hey-api/axios-client middleware(as seen in main.ts file) in between
const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  //   if there is header authentication enabled
  headers: {
    [import.meta.env.VITE_AUTH_KEY]: import.meta.env.VITE_AUTH_VALUE
  }
})

client.interceptors.response.use(handleResponse, handleError)

export default client
