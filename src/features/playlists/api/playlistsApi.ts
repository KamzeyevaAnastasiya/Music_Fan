import { baseApi } from '@/app/api/baseApi'
import { imagesSchema } from '@/common/schemas'
import type { Images } from '@/common/types'
import { withZodCatch } from '@/common/utils'
import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistCreatedEvent,
  PlaylistData,
  PlaylistsResponse,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types'
import { playlistCreateResponseSchema, playlistsResponseSchema } from '@/features/playlists/model/playlists.schemas'
import { io } from 'socket.io-client'

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
      query: (params) => {
        return {
          method: 'get',
          url: `playlists`,
          params,
        }
      },
      ...withZodCatch(playlistsResponseSchema),
      keepUnusedDataFor: 0,
      onCacheEntryAdded: async (_arg, { cacheDataLoaded, updateCachedData, cacheEntryRemoved }) => {
        await cacheDataLoaded

        const socket = io('wss://musicfun.it-incubator.app', {
          path: '/api/1.0/ws',
          transports: ['websocket'],
        })

        socket.on('connect', () => {
          console.log('✅Connected to server')
        })

        socket.on('tracks.playlist-created', (message: PlaylistCreatedEvent) => {
          const newPlaylist = message.payload.data
          updateCachedData((state) => {
            state.data.pop()
            state.data.unshift(newPlaylist)
            state.meta.totalCount = state.meta.totalCount + 1
            state.meta.pagesCount = Math.ceil(state.meta.totalCount / state.meta.pageSize)
          })
        })

        await cacheEntryRemoved

        socket.on('disconnect', () => {
          console.log('❌Connected destroyed')
        })
      },
      providesTags: ['Playlist'],
    }),
    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: (body) => {
        return {
          method: 'post',
          url: `playlists`,
          body,
        }
      },
      ...withZodCatch(playlistCreateResponseSchema),
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => {
        return {
          method: 'delete',
          url: `playlists/${playlistId}`,
        }
      },
      invalidatesTags: ['Playlist'],
    }),
    updatePlaylist: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
      query: ({ playlistId, body }) => {
        console.log('4')
        return {
          method: 'put',
          url: `playlists/${playlistId}`,
          body,
        }
      },
      onQueryStarted: async ({ playlistId, body }, { queryFulfilled, dispatch, getState }) => {
        console.log('1')
        const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists')

        const patchResults: { undo: () => void }[] = []

        args.forEach((arg) => {
          patchResults.push(
            dispatch(
              playlistsApi.util.updateQueryData(
                'fetchPlaylists',
                { pageNumber: arg.pageNumber, pageSize: arg.pageSize, search: arg.search },
                (state) => {
                  console.log('2')
                  const index = state.data.findIndex((playlist) => playlist.id === playlistId)
                  if (index !== -1) {
                    state.data[index].attributes = { ...state.data[index].attributes, ...body.data.attributes }
                  }
                },
              ),
            ),
          )
        })

        try {
          console.log('3')
          await queryFulfilled
          console.log('5')
        } catch {
          patchResults.forEach((patchResult) => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: ['Playlist'],
    }),
    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      query: ({ playlistId, file }) => {
        const formData = new FormData()
        formData.append('file', file)

        return {
          method: 'post',
          url: `playlists/${playlistId}/images/main`,
          body: formData,
        }
      },
      ...withZodCatch(imagesSchema),
      invalidatesTags: ['Playlist'],
    }),
    deletePlaylistCover: build.mutation<void, string>({
      query: (playlistId) => {
        return {
          method: 'delete',
          url: `playlists/${playlistId}/images/main`,
        }
      },
      invalidatesTags: ['Playlist'],
    }),
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi
