import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setItems } from './items'
import { API_URL, API_PATH } from '../../constants'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => API_PATH,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled
          dispatch(setItems(data.data))
        } catch (err) {
          console.error('Failed to fetch items:', err)
        }
      },
    }),
  }),
})

export const { useGetItemsQuery } = apiSlice
