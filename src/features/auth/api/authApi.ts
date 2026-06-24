import { baseApi } from '@/app/api/baseApi'
import { AUTH_KEYS } from '@/common/constants'
import { withZodCatch } from '@/common/utils'
import type { LoginArgs, LoginResponse, MeResponse } from '@/features/auth/api/authApi.types'
import { loginResponseSchema, meResponseSchema } from '@/features/auth/model/authApi.schemas'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => `auth/me`,
      ...withZodCatch(meResponseSchema),
      providesTags: ['Auth'],
    }),
    login: build.mutation<LoginResponse, LoginArgs>({
      query: (payload) => ({
        url: `auth/login`,
        method: 'post',
        body: { ...payload, accessTokenTTL: '30m' },
      }),
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled
        localStorage.setItem(AUTH_KEYS.accessToken, data.accessToken)
        localStorage.setItem(AUTH_KEYS.refreshToken, data.refreshToken)
        dispatch(authApi.util.invalidateTags(['Auth']))
      },
      ...withZodCatch(loginResponseSchema),
    }),
    logout: build.mutation<void, void>({
      query: () => {
        const refreshToken = localStorage.getItem(AUTH_KEYS.refreshToken)
        return {
          url: `auth/logout`,
          method: 'post',
          body: { refreshToken },
        }
      },
      onQueryStarted: async (_args, { dispatch, queryFulfilled }) => {
        await queryFulfilled
        localStorage.removeItem(AUTH_KEYS.accessToken)
        localStorage.removeItem(AUTH_KEYS.refreshToken)
        dispatch(baseApi.util.resetApiState())
      },
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
