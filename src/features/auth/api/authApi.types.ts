import * as z from 'zod'
import { loginResponseSchema, type meResponseSchema } from '@/features/auth/model/authApi.schemas'

export type MeResponse = z.infer<typeof meResponseSchema>

export type LoginResponse = z.infer<typeof loginResponseSchema>

export type LoginArgs = {
  code: string
  redirectUri: string
  accessTokenTTL?: string
  rememberMe: boolean
}
