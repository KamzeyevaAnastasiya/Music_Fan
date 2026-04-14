import { isErrorWithDetailArray, isErrorWithProperty, trimToMaxLength } from '@/common/utils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { toast } from 'react-toastify'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Playlist'],
  baseQuery: async (args, api, extraOptions) => {
    const res = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      headers: {
        'API-KEY': import.meta.env.VITE_API_KEY,
      },
      prepareHeaders: (headers) => {
        headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
        return headers
      },
    })(args, api, extraOptions)

    if (res.error) {
      switch (res.error.status) {
        case 400:
        case 403:
          if (isErrorWithDetailArray(res.error.data)) {
            toast(trimToMaxLength(res.error.data.errors[0].detail), { type: 'error', theme: 'colored' })
          } else {
            toast(JSON.stringify(res.error.data), { type: 'error', theme: 'colored' })
          }
          break
        case 404:
          if (isErrorWithProperty(res.error.data, 'error')) {
            toast(res.error.data.error, { type: 'error', theme: 'colored' })
          } else {
            toast(JSON.stringify(res.error.data), { type: 'error', theme: 'colored' })
          }
          break
        case 401:
        case 429:
          // ✅ 1. Type Assertions
          // toast((result.error.data as { message: string }).message, { type: 'error', theme: 'colored' })
          // ✅ 2. JSON.stringify
          // toast(JSON.stringify(result.error.data), { type: 'error', theme: 'colored' })
          // ✅ 3. Type Predicate
          if (isErrorWithProperty(res.error.data, 'message')) {
            toast(res.error.data.message, { type: 'error', theme: 'colored' })
          } else {
            toast(JSON.stringify(res.error.data), { type: 'error', theme: 'colored' })
          }
          break
        case 'FETCH_ERROR':
        case 'PARSING_ERROR':
        case 'CUSTOM_ERROR':
        case 'TIMEOUT_ERROR':
          toast(res.error.error, { type: 'error', theme: 'colored' })
          break
        default:
          if (res.error.status >= 500 && res.error.status < 600) {
            toast('Server error occurred. Please try again later.', { type: 'error', theme: 'colored' })
          } else {
            toast('Some error occurred', { type: 'error', theme: 'colored' })
          }
      }
    }

    return res
  },
  endpoints: () => ({}),
})
