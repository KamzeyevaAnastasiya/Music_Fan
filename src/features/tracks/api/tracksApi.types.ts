import { fetchTracksResponseSchema, trackDataSchema } from '@/features/tracks/tracksApi/tracksApi.schemas'
import * as z from 'zod'

export type TrackData = z.infer<typeof trackDataSchema>
export type FetchTracksResponse = z.infer<typeof fetchTracksResponseSchema>

// Arguments
export type FetchTracksArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: 'publishedAt' | 'likesCount'
  sortDirection?: 'asc' | 'desc'
  tagsIds?: string[]
  artistsIds?: string[]
  userId?: string
  includeDrafts?: boolean
  paginationType?: 'offset' | 'cursor'
  cursor?: string
}
