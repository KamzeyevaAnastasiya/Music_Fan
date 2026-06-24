import { baseApi } from '@/app/api/baseApi'
import { withZodCatch } from '@/common/utils'
import type { FetchTracksResponse } from '@/features/tracks/api/tracksApi.types'
import { fetchTracksResponseSchema } from '@/features/tracks/tracksApi/tracksApi.schemas'

export const tracksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | undefined>({
      infiniteQueryOptions: {
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
          return lastPage.meta.nextCursor || undefined
        },
      },
      query: ({ pageParam }) => {
        return {
          url: 'playlists/tracks',
          params: { cursor: pageParam, pageSize: 5, paginationType: 'cursor' },
        }
      },
      ...withZodCatch(fetchTracksResponseSchema),
    }),
  }),
})
export const { useFetchTracksInfiniteQuery } = tracksApi
