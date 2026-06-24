import * as z from 'zod'
import {
  createPlaylistAttributesSchema,
  createPlaylistSchema,
  playlistAttributesSchema,
  playlistDataSchema,
  playlistMetaSchema,
  playlistsResponseSchema,
} from '@/features/playlists/model/playlists.schemas'

export type PlaylistsResponse = z.infer<typeof playlistsResponseSchema>
export type PlaylistData = z.infer<typeof playlistDataSchema>
export type PlaylistMeta = z.infer<typeof playlistMetaSchema>
export type PlaylistAttributes = z.infer<typeof playlistAttributesSchema>

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: 'addedAt' | 'likesCount'
  sortDirection?: 'asc' | 'desc'
  tagsIds?: string[]
  userId?: string
  trackId?: string
  onlyLikedByMe?: boolean
}

export type CreatePlaylistArgs = z.infer<typeof createPlaylistSchema>

export type CreatePlaylistAttributes = z.infer<typeof createPlaylistAttributesSchema>

export type UpdatePlaylistArgs = {
  data: UpdatePlaylistData
}

export type UpdatePlaylistData = {
  type: 'playlists'
  attributes: UpdatePlaylistAttributes
}

export type UpdatePlaylistAttributes = CreatePlaylistAttributes & {
  tagIds: string[]
}

// WebSocket Events
export type PlaylistCreatedEvent = {
  type: 'tracks.playlist-created'
  payload: {
    data: PlaylistData
  }
}

export type PlaylistUpdatedEvent = {
  type: 'tracks.playlist-updated'
  payload: {
    data: PlaylistData
  }
}
